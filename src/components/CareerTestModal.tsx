import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, BookOpen, Check, Sparkles, X } from 'lucide-react';
import type { Course, Job, JobCategory } from '../types';

type CareerFocus = Exclude<JobCategory, 'Semua Kategori'>;

interface CareerQuestion {
  prompt: string;
  options: { label: string; focus: CareerFocus }[];
}

const questions: CareerQuestion[] = [
  {
    prompt: 'Aktivitas kerja mana yang paling membuat Anda tertarik?',
    options: [
      { label: 'Membantu pelanggan dan menjawab pertanyaan', focus: 'Customer Service' },
      { label: 'Merapikan angka, tabel, dan informasi', focus: 'Entri Data & Riset' },
      { label: 'Membuat desain dan materi visual', focus: 'Desain & Kreatif' },
      { label: 'Menulis konten atau menyusun kata-kata', focus: 'Penulisan & Konten' }
    ]
  },
  {
    prompt: 'Saat mendapat tugas baru, Anda lebih suka untuk...',
    options: [
      { label: 'Mengikuti alur kerja yang jelas dan teratur', focus: 'Admin & Operasional' },
      { label: 'Berkomunikasi dan berkolaborasi dengan orang lain', focus: 'Customer Service' },
      { label: 'Mencari ide segar dan cara penyampaian yang menarik', focus: 'Pemasaran Digital' },
      { label: 'Memeriksa detail agar hasilnya tepat', focus: 'Entri Data & Riset' }
    ]
  },
  {
    prompt: 'Pekerjaan seperti apa yang paling ingin Anda pelajari?',
    options: [
      { label: 'Mengelola chat, pesanan, dan kebutuhan pelanggan', focus: 'Customer Service' },
      { label: 'Mengelola stok, dokumen, atau spreadsheet', focus: 'Entri Data & Riset' },
      { label: 'Mendesain promosi untuk media sosial', focus: 'Desain & Kreatif' },
      { label: 'Menulis caption, artikel, atau deskripsi produk', focus: 'Penulisan & Konten' }
    ]
  },
  {
    prompt: 'Apa kekuatan yang paling menggambarkan diri Anda?',
    options: [
      { label: 'Ramah, sabar, dan senang membantu', focus: 'Customer Service' },
      { label: 'Teliti, teratur, dan suka bekerja dengan data', focus: 'Entri Data & Riset' },
      { label: 'Kreatif dan peka terhadap tampilan visual', focus: 'Desain & Kreatif' },
      { label: 'Komunikatif dan suka menyampaikan ide', focus: 'Pemasaran Digital' }
    ]
  },
  {
    prompt: 'Hasil kerja yang paling ingin Anda bangun adalah...',
    options: [
      { label: 'Layanan pelanggan yang cepat dan memuaskan', focus: 'Customer Service' },
      { label: 'Data dan proses kerja yang rapi', focus: 'Admin & Operasional' },
      { label: 'Konten promosi yang menarik perhatian', focus: 'Pemasaran Digital' },
      { label: 'Portofolio tulisan yang informatif', focus: 'Penulisan & Konten' }
    ]
  }
];

const courseFocus: Record<string, CareerFocus[]> = {
  'course-1': ['Customer Service', 'Admin & Operasional'],
  'course-2': ['Customer Service', 'Admin & Operasional', 'Pemasaran Digital'],
  'course-3': ['Admin & Operasional'],
  'course-4': ['Desain & Kreatif', 'Pemasaran Digital', 'Penulisan & Konten'],
  'course-5': ['Entri Data & Riset', 'Admin & Operasional']
};

interface CareerTestModalProps {
  jobs: Job[];
  courses: Course[];
  onClose: () => void;
  onSelectJob: (job: Job) => void;
  onSelectCourse: (course: Course) => void;
}

export const CareerTestModal: React.FC<CareerTestModalProps> = ({
  jobs,
  courses,
  onClose,
  onSelectJob,
  onSelectCourse
}) => {
  const [answers, setAnswers] = useState<(CareerFocus | null)[]>(Array(questions.length).fill(null));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const chooseAnswer = (focus: CareerFocus) => {
    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = focus;
    setAnswers(nextAnswers);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((current) => current + 1);
    } else {
      setShowResults(true);
    }
  };

  const scores = answers.reduce<Partial<Record<CareerFocus, number>>>((result, focus) => {
    if (focus) result[focus] = (result[focus] ?? 0) + 1;
    return result;
  }, {});
  const rankedFocus = (Object.entries(scores) as [CareerFocus, number][])
    .sort((a, b) => b[1] - a[1])
    .map(([focus]) => focus)
    .slice(0, 2);
  const matchingJobs = jobs.filter((job) => rankedFocus.includes(job.category)).slice(0, 4);
  const matchingCourses = courses
    .filter((course) => (courseFocus[course.id] ?? []).some((focus) => rankedFocus.includes(focus)))
    .slice(0, 4);
  const restart = () => {
    setAnswers(Array(questions.length).fill(null));
    setQuestionIndex(0);
    setShowResults(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-test-title"
        className="my-6 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-sky-100 bg-white shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-sky-100 bg-white/95 p-5 backdrop-blur">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
              <Sparkles className="h-3.5 w-3.5" />
              Tes Minat Karier
            </div>
            <h2 id="career-test-title" className="text-lg font-bold text-neutral-900">
              {showResults ? 'Rekomendasi untuk Anda' : 'Kenali arah kerja yang cocok'}
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              {showResults
                ? 'Hasil ini berdasarkan minat dan preferensi Anda.'
                : 'Jawab 5 pertanyaan singkat untuk melihat rekomendasi.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tes minat karier"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {!showResults ? (
          <div className="p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between text-xs text-neutral-500">
              <span>Pertanyaan {questionIndex + 1} dari {questions.length}</span>
              <span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="mb-7 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-500 transition-all"
                style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <h3 className="mb-5 text-base font-bold leading-relaxed text-neutral-900">
              {questions[questionIndex].prompt}
            </h3>
            <div className="space-y-2.5">
              {questions[questionIndex].options.map((option) => {
                const isSelected = answers[questionIndex] === option.focus;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => chooseAnswer(option.focus)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm transition ${
                      isSelected
                        ? 'border-sky-400 bg-sky-50 text-sky-900'
                        : 'border-neutral-200 text-neutral-700 hover:border-sky-300 hover:bg-sky-50/50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="h-4 w-4 shrink-0 text-sky-600" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex justify-between">
              <button
                type="button"
                disabled={questionIndex === 0}
                onClick={() => setQuestionIndex((current) => Math.max(0, current - 1))}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:invisible"
              >
                <ArrowLeft className="h-4 w-4" />
                Sebelumnya
              </button>
              {answers[questionIndex] && (
                <button
                  type="button"
                  onClick={() => {
                    if (questionIndex === questions.length - 1) setShowResults(true);
                    else setQuestionIndex((current) => current + 1);
                  }}
                  className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700"
                >
                  Selanjutnya
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="mt-5 border-t border-slate-100 pt-4 text-[11px] leading-relaxed text-slate-400">
              Tes ini adalah panduan minat karier, bukan diagnosis psikologis atau penentu kemampuan.
            </p>
          </div>
        ) : (
          <div className="p-5 sm:p-7">
            <div className="mb-6 rounded-xl border border-sky-100 bg-sky-50 p-4">
              <p className="text-xs font-semibold text-sky-700">Bidang yang paling sesuai dengan jawaban Anda</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {rankedFocus.map((focus) => (
                  <span key={focus} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-sky-900 shadow-sm">
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <BriefcaseBusiness className="h-4 w-4 text-sky-600" />
                  Lowongan yang direkomendasikan
                </h3>
                <div className="space-y-2">
                  {matchingJobs.length ? matchingJobs.map((job) => (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => onSelectJob(job)}
                      className="w-full rounded-xl border border-neutral-200 p-3 text-left hover:border-sky-300 hover:bg-sky-50/50"
                    >
                      <span className="block text-xs font-semibold text-neutral-900">{job.title}</span>
                      <span className="mt-1 block text-[11px] text-slate-500">{job.category} · {job.companyName}</span>
                    </button>
                  )) : <p className="text-xs text-slate-500">Belum ada lowongan yang cocok untuk bidang ini.</p>}
                </div>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <BookOpen className="h-4 w-4 text-sky-600" />
                  Modul pelatihan terkait
                </h3>
                <div className="space-y-2">
                  {matchingCourses.length ? matchingCourses.map((course) => (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => onSelectCourse(course)}
                      className="w-full rounded-xl border border-neutral-200 p-3 text-left hover:border-sky-300 hover:bg-sky-50/50"
                    >
                      <span className="block text-xs font-semibold text-neutral-900">{course.title}</span>
                      <span className="mt-1 block text-[11px] text-slate-500">
                        {course.lessons.length} modul · {course.isFree ? 'Gratis' : `Premium · Rp ${course.price?.toLocaleString('id-ID')}`}
                      </span>
                    </button>
                  )) : <p className="text-xs text-slate-500">Belum ada modul pelatihan yang cocok.</p>}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={restart}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ulangi Tes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700"
              >
                Selesai
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
              Rekomendasi ini bersifat informatif berdasarkan minat yang dipilih, bukan tes psikologis klinis.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
