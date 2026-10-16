import React from 'react';
import { Job, JobCategory, JobType } from '../types';
import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Clock,
  FileText,
  Filter,
  Headset,
  Megaphone,
  Palette,
  Radio,
  Table2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  selectedCategory: JobCategory;
  setSelectedCategory: (cat: JobCategory) => void;
  selectedJobType: JobType;
  setSelectedJobType: (type: JobType) => void;
  onClearFilters: () => void;
}

const illustrationByCategory = {
  'Admin & Operasional': { Icon: BriefcaseBusiness, label: 'Operasional' },
  'Customer Service': { Icon: Headset, label: 'Layanan pelanggan' },
  'Desain & Kreatif': { Icon: Palette, label: 'Desain kreatif' },
  'Penulisan & Konten': { Icon: FileText, label: 'Penulisan konten' },
  'Pemasaran Digital': { Icon: Megaphone, label: 'Pemasaran digital' },
  'Entri Data & Riset': { Icon: Table2, label: 'Entri data' }
} satisfies Record<Job['category'], { Icon: LucideIcon; label: string }>;

const illustrationByJobId: Record<string, { Icon: LucideIcon; label: string }> = {
  'job-1': { Icon: Headset, label: 'Layanan pelanggan' },
  'job-2': { Icon: Palette, label: 'Desain kreatif' },
  'job-3': { Icon: Table2, label: 'Entri data' },
  'job-4': { Icon: FileText, label: 'Penulisan konten' },
  'job-5': { Icon: Radio, label: 'Host komunitas' },
  'job-6': { Icon: Megaphone, label: 'Pemasaran digital' }
};

const JobIllustration: React.FC<{ job: Job }> = ({ job }) => {
  const { Icon, label } = illustrationByJobId[job.id] ?? illustrationByCategory[job.category];

  return (
    <div
      role="img"
      aria-label={`Ilustrasi ${label} untuk lowongan ${job.title}`}
      className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100"
    >
      <div className="absolute -left-5 -top-8 h-28 w-28 rounded-full bg-white/70" />
      <div className="absolute -bottom-12 right-5 h-32 w-32 rounded-full bg-sky-200/60" />
      <div className="absolute right-1/4 top-5 h-3 w-3 rounded-full bg-amber-300" />
      <div className="absolute bottom-7 left-1/4 h-2.5 w-2.5 rounded-full bg-teal-300" />
      <div className="relative flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-3xl border border-white/80 bg-white/85 text-sky-700 shadow-lg shadow-sky-900/10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3">
        <Icon className="h-10 w-10" strokeWidth={1.7} />
      </div>
      <div className="absolute bottom-3 left-3 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-sky-800 shadow-sm">
        {label}
      </div>
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-xl bg-white/80 text-sky-600 shadow-sm">
        <span className="text-sm font-bold" aria-hidden="true">+</span>
      </div>
    </div>
  );
};

export const JobList: React.FC<JobListProps> = ({
  jobs,
  onSelectJob,
  selectedCategory,
  setSelectedCategory,
  selectedJobType,
  setSelectedJobType,
  onClearFilters
}) => {
  const categories: JobCategory[] = [
    'Semua Kategori',
    'Customer Service',
    'Admin & Operasional',
    'Desain & Kreatif',
    'Penulisan & Konten',
    'Pemasaran Digital',
    'Entri Data & Riset'
  ];

  const jobTypes: JobType[] = [
    'Semua Tipe',
    'Fleksibel',
    'Paruh Waktu',
    'Penuh Waktu',
    'Proyek / Freelance'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">
            Daftar Lowongan Kerja Remote
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Menampilkan <span className="font-semibold text-neutral-800">{jobs.length}</span> peluang kerja aktif
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as JobCategory)}
              className="text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:border-sky-500 appearance-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400 text-xs">
              ▼
            </div>
          </div>

          {/* Job Type Filter */}
          <div className="relative">
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value as JobType)}
              className="text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:border-sky-500 appearance-none cursor-pointer"
            >
              {jobTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400 text-xs">
              ▼
            </div>
          </div>

          {(selectedCategory !== 'Semua Kategori' || selectedJobType !== 'Semua Tipe') && (
            <button
              onClick={onClearFilters}
              className="text-xs text-sky-600 hover:text-sky-800 underline px-2 py-1 cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Job Cards Grid */}
      {jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-neutral-200 mt-6 p-8">
          <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mx-auto mb-3">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-semibold text-neutral-800">Tidak ada lowongan yang sesuai</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci atau reset filter untuk melihat semua lowongan.
          </p>
          <button
            onClick={onClearFilters}
            className="mt-3 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors cursor-pointer"
          >
            Tampilkan Semua Lowongan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {jobs.map((job) => (
            <article
              key={job.id}
              onClick={() => onSelectJob(job)}
              className="group overflow-hidden bg-white rounded-xl border border-neutral-200 hover:border-sky-400 transition-all shadow-xs hover:shadow-sm cursor-pointer flex flex-col justify-between"
            >
              <JobIllustration job={job} />
              <div>
                {/* Header: Company Avatar & Basic Details */}
                <div className="flex items-start gap-3 px-5 pt-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-sm shrink-0 border border-sky-200">
                    {job.companyInitial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-neutral-500 truncate">
                      {job.companyName}
                    </p>
                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                      {job.title}
                    </h3>
                  </div>
                </div>

                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 px-5">
                  <span>{job.jobType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{job.companyCity}</span>
                </div>

                {/* Salary & Flexibility Highlights */}
                <div className="space-y-1.5 py-2.5 px-3 mx-5 bg-sky-50/50 rounded-lg border border-sky-100 text-xs mb-3.5">
                  <div className="flex items-center gap-1.5 font-medium text-sky-900">
                    <Banknote className="w-3.5 h-3.5 shrink-0 text-sky-600" />
                    <span className="truncate">{job.salaryRange}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-600">
                    <Clock className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                    <span className="truncate">{job.workHoursDetail}</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed px-5">
                  {job.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 px-5 pb-4 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
                <div className="flex flex-wrap gap-1 text-[11px] text-neutral-500">
                  {job.targetAudience.slice(0, 2).map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
