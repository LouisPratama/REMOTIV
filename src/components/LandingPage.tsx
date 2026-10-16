import React from 'react';
import { ArrowRight, BookOpen, BriefcaseBusiness, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { Course, Job } from '../types';

interface LandingPageProps {
  jobs: Job[];
  courses: Course[];
  onBrowseJobs: () => void;
  onBrowseCourses: () => void;
  onRegister: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  jobs,
  courses,
  onBrowseJobs,
  onBrowseCourses,
  onRegister
}) => (
  <div className="overflow-hidden">
    <section className="relative isolate bg-gradient-to-br from-pink-50 via-sky-50 to-sky-100">
      <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-pink-100/80 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 -z-10 h-64 w-64 rounded-full bg-sky-200/70 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-sky-800 shadow-sm">
            <Sparkles className="h-4 w-4 text-sky-600" />
            Peluang kerja remote yang lebih inklusif
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
            Karier fleksibel, dimulai dari rumah.
          </h1>
          <p className="mt-2 font-handwriting text-2xl font-bold text-sky-700 sm:text-3xl">
            Bekerja dari Mana Saja, Tumbuh Bersama
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Temukan lowongan remote ramah pemula, pelajari keterampilan baru, dan tumbuh bersama komunitas Remotiv.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onBrowseJobs}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:-translate-y-0.5 hover:bg-sky-700"
            >
              Jelajahi Lowongan <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:bg-sky-50"
            >
              Buat Akun Gratis
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Tanpa biaya pendaftaran</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Ramah untuk pemula</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
          <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sky-200/80 via-white/60 to-pink-200/70 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/90 p-2 shadow-xl shadow-sky-900/10 ring-1 ring-sky-200/70">
            <img
              src="/remote-work-story.jpg"
              alt="Ilustrasi dari materi Remotiv: perempuan bekerja dengan laptop dan berkolaborasi"
              className="aspect-[12/5] w-full rounded-[1.5rem] object-cover"
            />
            <div className="flex flex-col gap-2 px-2 pb-1 pt-3 sm:flex-row sm:items-center sm:justify-between sm:px-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <BriefcaseBusiness className="h-4 w-4" />
                </span>
                <span>Lowongan aktif</span>
                <span className="font-bold text-slate-900">{jobs.length} peluang fleksibel</span>
              </div>
              <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-800 sm:self-auto">
                <ShieldCheck className="h-3.5 w-3.5" />
                Belajar dan berkembang
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8" aria-labelledby="flexible-work-title">
      <div className="overflow-hidden rounded-3xl border border-sky-300 bg-gradient-to-br from-sky-100 via-white to-pink-50 shadow-lg shadow-sky-900/10">
        <div className="grid items-center lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative flex items-center p-4 sm:p-5 lg:p-6">
            <div aria-hidden="true" className="absolute inset-8 rounded-full bg-sky-100/70 blur-2xl" />
            <img
              src="/family-work-illustration.png"
              alt="Ilustrasi dari materi Remotiv tentang keluarga beraktivitas bersama di rumah"
              className="relative aspect-[5/2] w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="px-6 pb-7 pt-5 sm:px-8 sm:py-8 lg:px-9 lg:py-9">
            <span className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-sky-800">
              Kerja fleksibel, tumbuh bersama
            </span>
            <h2 id="flexible-work-title" className="mt-4 text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Raih mimpi tanpa harus jauh dari keluarga.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Setiap orang berhak mengembangkan potensi. Temukan peluang kerja fleksibel, pelajari keterampilan baru, dan tumbuh bersama komunitas Remotiv—dari rumah maupun di mana saja.
            </p>
            <button
              type="button"
              onClick={onBrowseJobs}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
            >
              Temukan peluang fleksibel <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Mulai dari sini</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Satu platform, banyak kesempatan</h2>
        </div>
        <button onClick={onBrowseCourses} className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900">
          Lihat pelatihan <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="relative isolate overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-white via-white to-sky-100/80 p-5 shadow-sm">
          <div aria-hidden="true" className="absolute -right-8 -top-10 -z-10 h-32 w-32 rounded-full bg-sky-200/60 blur-2xl" />
          <div className="flex items-start justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 ring-1 ring-sky-200">
              <BriefcaseBusiness aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="text-4xl font-extrabold leading-none text-sky-200/80">01</span>
          </div>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700">Peluang kerja</p>
          <h3 className="mt-1 font-bold text-slate-900">Cari pekerjaan fleksibel</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Jelajahi posisi remote dari UMKM, lengkap dengan kisaran gaji dan detail pekerjaan.</p>
          <div aria-hidden="true" className="mt-5 h-1.5 w-14 rounded-full bg-sky-400" />
        </article>
        <article className="relative isolate overflow-hidden rounded-2xl border border-pink-200 bg-gradient-to-br from-white via-white to-pink-50 p-5 shadow-sm">
          <div aria-hidden="true" className="absolute -right-8 -top-10 -z-10 h-32 w-32 rounded-full bg-pink-200/70 blur-2xl" />
          <div className="flex items-start justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-sky-800 ring-1 ring-pink-200">
              <BookOpen aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="text-4xl font-extrabold leading-none text-pink-200/90">02</span>
          </div>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700">Belajar & berkembang</p>
          <h3 className="mt-1 font-bold text-slate-900">Belajar keterampilan baru</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{courses.length} pelatihan berisi materi teks dan video, dengan pilihan pendampingan mentor.</p>
          <div aria-hidden="true" className="mt-5 h-1.5 w-14 rounded-full bg-pink-300" />
        </article>
        <article className="relative isolate overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-white via-white to-pink-50/80 p-5 shadow-sm">
          <div aria-hidden="true" className="absolute -right-8 -top-10 -z-10 h-32 w-32 rounded-full bg-sky-200/60 blur-2xl" />
          <div className="flex items-start justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-sky-800 ring-1 ring-pink-200">
              <HeartHandshake aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="text-4xl font-extrabold leading-none text-sky-200/80">03</span>
          </div>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700">Saling mendukung</p>
          <h3 className="mt-1 font-bold text-slate-900">Tumbuh bersama komunitas</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Bagikan pengalaman, bertanya, dan saling menyemangati dalam perjalanan karier.</p>
          <div aria-hidden="true" className="mt-5 h-1.5 w-14 rounded-full bg-sky-400" />
        </article>
      </div>
    </section>
  </div>
);
