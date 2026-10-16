import React, { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Course, Lesson } from '../types';
import {
  BookOpen,
  CalendarClock,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  Play,
  Star,
  Users,
  Video,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CoursesViewProps {
  courses: Course[];
  completedLessons: string[];
  onToggleLesson: (lessonId: string) => void;
  onAuthChange: (user: User | null) => void;
  initialCourseId: string | null;
  onInitialCourseHandled: () => void;
}

const formatPrice = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;
const tutorTimes = ['10:00', '13:00', '16:00', '19:00'];

const getTutorDates = () =>
  Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    const value = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-');
    return {
      value,
      label: new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      }).format(date)
    };
  });

const formatTutorSchedule = (schedule: string) => {
  const [date, time] = schedule.split('|');
  const [year, month, day] = date.split('-').map(Number);
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(year, month - 1, day));
  return `${formattedDate}, pukul ${time} WIB`;
};

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  completedLessons,
  onToggleLesson,
  onAuthChange,
  initialCourseId,
  onInitialCourseHandled
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeStudyMode, setActiveStudyMode] = useState<'video' | 'article' | 'tutor'>('article');
  const [pendingPaymentCourse, setPendingPaymentCourse] = useState<Course | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  const [notice, setNotice] = useState('');
  const [tutorScheduleByCourse, setTutorScheduleByCourse] = useState<Record<string, string>>({});
  const [selectedTutorDate, setSelectedTutorDate] = useState('');
  const [selectedTutorTime, setSelectedTutorTime] = useState('');
  const paymentReturnHandled = useRef(false);

  const refreshEntitlements = async (accessToken: string) => {
    const response = await fetch('/api/courses/entitlements', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const result = (await response.json()) as {
      tutorSessions?: Array<{ courseId: string; scheduledAt: string }>;
      error?: string;
    };
    if (!response.ok) throw new Error(result.error ?? 'Gagal memuat akses pelatihan.');
    setTutorScheduleByCourse(
      Object.fromEntries((result.tutorSessions ?? []).map((session) => [session.courseId, session.scheduledAt]))
    );
  };

  const verifyPaymentReturn = async (accessToken: string, sessionId: string) => {
    const response = await fetch('/api/stripe/verify-session', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId })
    });
    const result = (await response.json()) as {
      courseId?: string;
      tutorSchedule?: string;
      error?: string;
    };
    if (!response.ok || !result.courseId) {
      throw new Error(result.error ?? 'Pembayaran belum dapat diverifikasi.');
    }

    if (result.tutorSchedule) {
      setTutorScheduleByCourse((current) => ({
        ...current,
        [result.courseId!]: result.tutorSchedule!
      }));
    }
    const paidCourse = courses.find((course) => course.id === result.courseId);
    if (paidCourse) {
      setPendingPaymentCourse(null);
      setSelectedCourse(paidCourse);
      setActiveLesson(paidCourse.lessons[0]);
    }
    setNotice('Pembayaran berhasil. Pelatihan premium sekarang sudah bisa diakses.');
  };

  useEffect(() => {
    if (!supabase) {
      setAuthError('Login belum tersedia. Konfigurasikan Supabase pada environment aplikasi.');
      return;
    }

    const applySession = async (user: User | null, accessToken?: string) => {
      setAuthUser(user);
      onAuthChange(user);
      if (!user) {
        setTutorScheduleByCourse({});
        return;
      }
      if (!accessToken) return;

      try {
        await refreshEntitlements(accessToken);
        const params = new URLSearchParams(window.location.search);
        const checkoutSessionId = params.get('session_id');
        if (params.get('payment') === 'success' && checkoutSessionId && !paymentReturnHandled.current) {
          paymentReturnHandled.current = true;
          await verifyPaymentReturn(accessToken, checkoutSessionId);
          window.history.replaceState({}, '', window.location.pathname);
        }
      } catch (error) {
        setNotice(error instanceof Error ? error.message : 'Gagal memuat akses pelatihan.');
        if (paymentReturnHandled.current) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        void applySession(null);
      } else if (session) {
        void applySession(session.user, session.access_token);
      }
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setAuthError(error.message);
        return;
      }

      const session = data.session;
      void applySession(session?.user ?? null, session?.access_token);

      const params = new URLSearchParams(window.location.search);
      const paymentState = params.get('payment');
      if (paymentState === 'cancel') {
        setNotice('Pembayaran dibatalkan. Anda bisa mencoba lagi kapan saja.');
        window.history.replaceState({}, '', window.location.pathname);
      } else if (paymentState === 'success' && !session) {
        setNotice('Masuk dengan akun yang digunakan saat checkout untuk memverifikasi pembayaran.');
        setPendingPaymentCourse(
          courses.find((course) => course.id === params.get('course_id')) ?? null
        );
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, [courses, onAuthChange]);

  const getCourseProgress = (course: Course) => {
    const total = course.lessons.length;
    if (total === 0) return 0;
    const completed = course.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
    return Math.round((completed / total) * 100);
  };

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveLesson(course.lessons[0]);
    setActiveStudyMode('article');
    setSelectedTutorDate('');
    setSelectedTutorTime('');
  };

  const openTutorCheckout = (course: Course) => {
    if (!selectedTutorDate || !selectedTutorTime) return;
    setAuthError('');
    setPendingPaymentCourse(course);
    setSelectedCourse(null);
  };

  useEffect(() => {
    if (!initialCourseId) return;
    const course = courses.find((item) => item.id === initialCourseId);
    if (course) openCourse(course);
    onInitialCourseHandled();
  }, [initialCourseId, courses, onInitialCourseHandled]);

  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError('');
    if (!supabase) {
      setAuthError('Login belum tersedia. Konfigurasikan Supabase pada environment aplikasi.');
      return;
    }

    setIsProcessingPayment(true);
    try {
      const result =
        authMode === 'login'
          ? await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword })
          : await supabase.auth.signUp({
              email: authEmail,
              password: authPassword,
              options: {
                data: { full_name: authName.trim() },
                emailRedirectTo: window.location.origin
              }
            });
      if (result.error) throw result.error;
      if (!result.data.session) {
        setAuthError('Akun berhasil dibuat. Konfirmasi email Anda, lalu masuk untuk melanjutkan.');
        setAuthMode('login');
        return;
      }

      setAuthUser(result.data.user);
      onAuthChange(result.data.user);
      await refreshEntitlements(result.data.session.access_token);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login gagal. Silakan coba lagi.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleStartCheckout = async () => {
    if (!pendingPaymentCourse || !supabase) {
      setAuthError('Login belum tersedia. Konfigurasikan Supabase pada environment aplikasi.');
      return;
    }
    if (selectedTutorDate && !selectedTutorTime) {
      setAuthError('Pilih jam sesi tutor atau kosongkan tanggal untuk melanjutkan tanpa tutor.');
      return;
    }
    setAuthError('');
    setIsProcessingPayment(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const accessToken = data.session?.access_token;
      if (!accessToken) {
        setAuthError('Silakan masuk terlebih dahulu untuk melanjutkan pembayaran.');
        return;
      }

      const response = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId: pendingPaymentCourse.id,
          tutorSchedule: selectedTutorDate && selectedTutorTime
            ? `${selectedTutorDate}|${selectedTutorTime}`
            : undefined
        })
      });
      const result = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error ?? 'Tidak dapat memulai pembayaran.');
      }

      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Tidak dapat memulai pembayaran.');
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
      <div className="mb-7 max-w-2xl">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded border border-sky-100 bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-800">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Katalog Pelatihan Siap Kerja</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          Tingkatkan Keterampilan Kerja Digital
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
          Pilih kelas yang paling sesuai dengan kebutuhan Anda, mulai dari materi gratis hingga premium yang siap membantu Anda kerja lebih siap.
        </p>
      </div>

      {notice && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            aria-label="Tutup pemberitahuan"
            className="shrink-0 rounded p-1 hover:bg-sky-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const progress = getCourseProgress(course);
          const completedCount = course.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
          const premiumPrice = course.price ?? 0;
          const initials = course.instructorName
            .split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

          return (
            <div
              key={course.id}
              className={`flex min-h-[362px] flex-col justify-between rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
                course.isFree ? 'border-neutral-200' : 'border-sky-300'
              }`}
            >
              <div>
                <div className="mb-2 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-slate-500">{course.category}</span>
                  <span
                    className={`inline-flex items-center rounded px-2 py-0.5 font-semibold ${
                      course.isFree
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {course.isFree ? '100% Gratis' : `Premium · ${formatPrice(premiumPrice)}`}
                  </span>
                </div>

                <h3 className="mb-2 text-sm font-bold leading-snug text-neutral-900">
                  {course.title}
                </h3>

                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-neutral-600">{course.description}</p>
                <p className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-sky-50 px-2 py-1 text-[10px] font-semibold text-sky-800">
                  <BookOpen className="h-3 w-3" />
                  {course.isFree
                    ? 'Video + materi teks'
                    : <>Video + materi teks + tutor <Video className="h-3 w-3" /></>}
                </p>

                <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 px-2 py-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 px-2 py-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.enrolledCount}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 px-2 py-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Mentor</span>
                    <span>{course.isFree ? 'Akses terbuka' : 'Premium · akses demo terbuka'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-100 bg-sky-100 text-[11px] font-bold text-sky-700">
                      {initials}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">{course.instructorName}</div>
                      <div className="text-[10px] text-slate-500">{course.instructorTitle}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Progres Belajar</span>
                    <span className="font-semibold text-slate-700">
                      {completedCount}/{course.lessons.length} ({progress}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openCourse(course)}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                    course.isFree
                      ? 'border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <span>{course.isFree
                    ? progress > 0 ? 'Lanjutkan Belajar' : 'Buka Modul & Materi'
                    : progress > 0 ? 'Lanjutkan Premium' : 'Buka Materi Premium'}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {pendingPaymentCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Pembayaran</p>
                <h3 className="mt-2 text-xl font-bold text-neutral-900">Akses premium</h3>
              </div>
              <button
                type="button"
                onClick={() => setPendingPaymentCourse(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Kelas</span>
                <span className="font-semibold text-neutral-900">{pendingPaymentCourse.title}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Biaya</span>
                <span className="font-semibold text-blue-700">
                  {formatPrice(pendingPaymentCourse.price ?? 0)}
                </span>
              </div>
            </div>

            <section className="mt-4 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Sesi tutor Zoom (opsional)</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    Jadwal hanya diperlukan jika Anda ingin sesi pribadi dengan mentor. Semua waktu dalam WIB.
                  </p>
                </div>
              </div>
              <label className="mt-3 block text-xs font-medium text-slate-700">
                Tanggal sesi (opsional)
                <select
                  value={selectedTutorDate}
                  onChange={(event) => {
                    setSelectedTutorDate(event.target.value);
                    setSelectedTutorTime('');
                    setAuthError('');
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="">Pilih tanggal</option>
                  {getTutorDates().map((date) => (
                    <option key={date.value} value={date.value}>{date.label}</option>
                  ))}
                </select>
              </label>
              <fieldset className="mt-3">
                <legend className="text-xs font-medium text-slate-700">Jam sesi (opsional)</legend>
                <div className="mt-1.5 grid grid-cols-4 gap-2">
                  {tutorTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      disabled={!selectedTutorDate}
                      onClick={() => {
                        setSelectedTutorTime(time);
                        setAuthError('');
                      }}
                      className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                        selectedTutorTime === time
                          ? 'border-sky-600 bg-sky-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 disabled:cursor-not-allowed disabled:opacity-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </fieldset>
              <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-500">
                <Video className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Tautan Zoom dibagikan mentor setelah jadwal sesi dikonfirmasi.
              </p>
            </section>

            {authUser ? (
              <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-800">
                Masuk sebagai <strong>{authUser.email}</strong>. Pembelian akan dikaitkan dengan akun ini.
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} className="mt-4 space-y-3">
                {authMode === 'signup' && (
                  <label className="block text-xs font-medium text-slate-700">
                    Nama lengkap
                    <input
                      autoComplete="name"
                      required
                      value={authName}
                      onChange={(event) => setAuthName(event.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                )}
                <label className="block text-xs font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={authEmail}
                    onChange={(event) => setAuthEmail(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </label>
                <label className="block text-xs font-medium text-slate-700">
                  Kata sandi
                  <input
                    type="password"
                    autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                    minLength={8}
                    required
                    value={authPassword}
                    onChange={(event) => setAuthPassword(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                  <span className="mt-1 block text-[10px] text-slate-500">Minimal 8 karakter.</span>
                </label>
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  {isProcessingPayment ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
                  {authMode === 'login' ? 'Masuk' : 'Buat akun'}
                </button>
                <p className="text-center text-xs text-slate-500">
                  {authMode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === 'login' ? 'signup' : 'login');
                      setAuthError('');
                    }}
                    className="font-semibold text-sky-700 hover:underline"
                  >
                    {authMode === 'login' ? 'Daftar' : 'Masuk'}
                  </button>
                </p>
              </form>
            )}

            {authError && (
              <p role="alert" className="mt-3 rounded-lg border border-rose-100 bg-rose-50 p-3 text-xs text-rose-700">
                {authError}
              </p>
            )}

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
              <CreditCard className="h-4 w-4" />
              <span>Pembayaran diproses aman melalui Stripe. Jadwal tutor hanya dibuat jika Anda memilih tanggal dan jam.</span>
            </div>

            <button
              type="button"
              disabled={isProcessingPayment || !authUser || Boolean(selectedTutorDate && !selectedTutorTime)}
              onClick={() => void handleStartCheckout()}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isProcessingPayment ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Menghubungkan ke Stripe...
                </>
              ) : (
                <>
                  <LockKeyhole className="h-4 w-4" />
                  Lanjutkan {formatPrice(pendingPaymentCourse.price ?? 0)} dengan Stripe
                </>
              )}
            </button>
            {!authUser && (
              <p className="mt-2 text-center text-[11px] text-slate-500">
                Jadwal tutor opsional. Masuk atau buat akun untuk melanjutkan.
              </p>
            )}
          </div>
        </div>
      )}

      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="my-6 w-full max-w-3xl overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 bg-sky-50/80 p-5">
              <div>
                <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-1 text-[11px] font-semibold text-sky-700">
                  {selectedCourse.isFree
                    ? `${selectedCourse.category} · ${selectedCourse.level}`
                    : `PREMIUM · ${selectedCourse.category}`}
                </span>
                <h3 className="mt-2 text-xl font-bold text-neutral-900">{selectedCourse.title}</h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Instruktur: <span className="font-semibold text-neutral-700">{selectedCourse.instructorName}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <section className="border-b border-slate-200 bg-slate-50/70 px-5 py-4">
              <h4 className="mb-2.5 text-xs font-semibold text-slate-700">Pilih model belajar</h4>
              <div className={`grid gap-2 ${selectedCourse.isFree ? 'grid-cols-2' : 'grid-cols-3'}`}>
                <button
                  type="button"
                  onClick={() => setActiveStudyMode('video')}
                  className={`flex min-h-20 items-center gap-2 rounded-xl border p-3 text-left transition ${
                    activeStudyMode === 'video'
                      ? 'border-sky-500 bg-sky-50 text-sky-900 ring-1 ring-sky-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'
                  }`}
                >
                  <Play className="h-5 w-5 shrink-0 text-sky-600" />
                  <span>
                    <span className="block text-xs font-semibold">Video</span>
                    <span className="mt-0.5 block text-[10px] text-slate-500">Pratinjau</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStudyMode('article')}
                  className={`flex min-h-20 items-center gap-2 rounded-xl border p-3 text-left transition ${
                    activeStudyMode === 'article'
                      ? 'border-sky-500 bg-sky-50 text-sky-900 ring-1 ring-sky-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'
                  }`}
                >
                  <BookOpen className="h-5 w-5 shrink-0 text-sky-600" />
                  <span>
                    <span className="block text-xs font-semibold">Materi teks</span>
                    <span className="mt-0.5 block text-[10px] text-slate-500">Artikel belajar</span>
                  </span>
                </button>
                {!selectedCourse.isFree && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStudyMode('tutor');
                      setSelectedTutorDate('');
                      setSelectedTutorTime('');
                    }}
                    className={`flex min-h-20 items-center gap-2 rounded-xl border p-3 text-left transition ${
                      activeStudyMode === 'tutor'
                        ? 'border-blue-500 bg-blue-50 text-blue-900 ring-1 ring-blue-200'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <CalendarClock className="h-5 w-5 shrink-0 text-blue-600" />
                    <span>
                      <span className="block text-xs font-semibold">Sesi tutor</span>
                      <span className="mt-0.5 block text-[10px] text-slate-500">Pilih tanggal dan jam</span>
                    </span>
                  </button>
                )}
              </div>
              <p className="mt-2 text-[10px] text-slate-500">
                Pilihan model belajar saat ini berupa tampilan pratinjau.
              </p>
            </section>

            <div className="grid gap-5 p-5 md:grid-cols-5">
              <div className="space-y-2 border-slate-200 pr-0 md:col-span-2 md:border-r md:pr-4">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Daftar Materi ({selectedCourse.lessons.length})
                </h4>

                {selectedCourse.lessons.map((lesson, index) => {
                  const isDone = completedLessons.includes(lesson.id);
                  const isCurrent = activeLesson?.id === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => {
                        setActiveLesson(lesson);
                        setActiveStudyMode('article');
                      }}
                      className={`w-full rounded-xl border p-2.5 text-left text-xs transition-all ${
                        isCurrent
                          ? 'border-sky-500 bg-sky-50 text-sky-950'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold">Modul {index + 1}</span>
                        {isDone ? (
                          <CheckCircle className="h-4 w-4 text-sky-600" />
                        ) : (
                          <span className="text-[10px] text-slate-400">{lesson.duration}</span>
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 leading-snug text-slate-600">{lesson.title}</p>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3.5 text-xs md:col-span-3">
                {activeStudyMode === 'tutor' && !selectedCourse.isFree ? (
                  <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <CalendarClock className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                      Pendampingan premium
                    </p>
                    <h4 className="mt-1 text-lg font-bold text-slate-900">Belajar bersama tutor</h4>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600">
                      Pilih tanggal dan waktu sesi bersama tutor. Semua jadwal ditampilkan dalam WIB.
                    </p>
                    <div className="mt-4 rounded-xl border border-white bg-white/80 p-3">
                      <p className="text-xs font-semibold text-slate-900">{selectedCourse.instructorName}</p>
                      <p className="mt-1 text-xs text-slate-500">{selectedCourse.instructorTitle}</p>
                    </div>
                    {tutorScheduleByCourse[selectedCourse.id] ? (
                      <p className="mt-3 rounded-lg bg-blue-100/70 p-3 text-xs font-medium text-blue-900">
                        Jadwal sesi terpilih: {formatTutorSchedule(tutorScheduleByCourse[selectedCourse.id])}
                      </p>
                    ) : (
                      <>
                        <label className="mt-4 block text-xs font-medium text-slate-700">
                          Pilih tanggal sesi
                          <select
                            value={selectedTutorDate}
                            onChange={(event) => {
                              setSelectedTutorDate(event.target.value);
                              setSelectedTutorTime('');
                              setAuthError('');
                            }}
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                          >
                            <option value="">Pilih tanggal</option>
                            {getTutorDates().map((date) => (
                              <option key={date.value} value={date.value}>{date.label}</option>
                            ))}
                          </select>
                        </label>
                        <fieldset className="mt-3">
                          <legend className="text-xs font-medium text-slate-700">Pilih jam (WIB)</legend>
                          <div className="mt-1.5 grid grid-cols-4 gap-2">
                            {tutorTimes.map((time) => (
                              <button
                                key={time}
                                type="button"
                                disabled={!selectedTutorDate}
                                onClick={() => {
                                  setSelectedTutorTime(time);
                                  setAuthError('');
                                }}
                                className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                                  selectedTutorTime === time
                                    ? 'border-sky-600 bg-sky-600 text-white'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 disabled:cursor-not-allowed disabled:opacity-50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                        <p className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-500">
                          <Video className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          Tautan Zoom dibagikan mentor setelah jadwal sesi dikonfirmasi.
                        </p>
                        <button
                          type="button"
                          disabled={!selectedTutorDate || !selectedTutorTime}
                          onClick={() => openTutorCheckout(selectedCourse)}
                          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                          <CalendarDays className="h-3.5 w-3.5" />
                          Lanjutkan pemesanan sesi
                        </button>
                      </>
                    )}
                  </section>
                ) : activeLesson ? (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {activeLesson.duration}
                      </span>

                      <button
                        type="button"
                        onClick={() => onToggleLesson(activeLesson.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium ${
                          completedLessons.includes(activeLesson.id)
                            ? 'bg-sky-600 text-white'
                            : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        {completedLessons.includes(activeLesson.id) ? 'Selesai Dipelajari' : 'Tandai Selesai'}
                      </button>
                    </div>

                    <h4 className="text-lg font-bold text-neutral-900">{activeLesson.title}</h4>

                    {activeStudyMode === 'article' ? (
                      <article className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
                        <h5 className="mb-2 flex items-center gap-2 text-sm font-bold text-neutral-900">
                          <BookOpen className="h-4 w-4 text-sky-600" />
                          Materi pembelajaran
                        </h5>
                        <p className="text-sm leading-7">{activeLesson.summary}</p>
                        <div className="mt-4 rounded-lg bg-sky-50 p-3 text-sky-900">
                          <h6 className="mb-1 text-xs font-semibold">Tips praktis</h6>
                          <p className="text-xs leading-relaxed">{activeLesson.practicalTip}</p>
                        </div>
                      </article>
                    ) : (
                      <section aria-label="Pratinjau video pembelajaran" className="overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900">
                        <div className="flex aspect-video flex-col items-center justify-center px-5 text-center text-white">
                          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sky-300">
                            <Play className="h-5 w-5 fill-current" />
                          </span>
                          <h5 className="text-sm font-semibold">Pratinjau video pembelajaran</h5>
                          <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-300">
                            Tampilan video untuk modul {activeLesson.title}. Video lengkap akan tersedia nanti.
                          </p>
                        </div>
                      </section>
                    )}

                  </>
                ) : (
                  <p className="text-slate-400">Pilih modul di sebelah kiri untuk membaca materi.</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end border-t border-slate-200 bg-slate-50 p-3.5">
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="rounded-lg px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Tutup Pelatihan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
