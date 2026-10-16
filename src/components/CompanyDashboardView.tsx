import React from 'react';
import { Job, JobApplication } from '../types';
import { Building2, PlusCircle, Users, Phone, ExternalLink } from 'lucide-react';

interface CompanyDashboardViewProps {
  jobs: Job[];
  applications: JobApplication[];
  onOpenPostJob: () => void;
  onUpdateAppStatus: (appId: string, newStatus: JobApplication['status']) => void;
}

export const CompanyDashboardView: React.FC<CompanyDashboardViewProps> = ({
  jobs,
  applications,
  onOpenPostJob,
  onUpdateAppStatus
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-100/80 px-2.5 py-1 rounded mb-2">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Dashboard Rekrutmen UMKM</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            Kelola Lowongan & Pelamar
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            Tinjau berkas kandidat yang masuk dan hubungi langsung melalui WhatsApp.
          </p>
        </div>

        <button
          onClick={onOpenPostJob}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Pasang Lowongan Baru</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-xs text-neutral-500 font-medium">Lowongan Aktif</p>
          <p className="text-xl font-bold text-neutral-900 mt-1">{jobs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-xs text-neutral-500 font-medium">Berkas Pelamar</p>
          <p className="text-xl font-bold text-neutral-900 mt-1">{applications.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
          <p className="text-xs text-neutral-500 font-medium">Wawancara / Diterima</p>
          <p className="text-xl font-bold text-sky-600 mt-1">
            {applications.filter((a) => a.status === 'Wawancara' || a.status === 'Diterima').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Posted Jobs List */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between">
            <span>Lowongan Usaha Anda</span>
            <span className="text-xs text-neutral-500 font-normal">({jobs.length})</span>
          </h3>

          <div className="space-y-2.5">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-neutral-900 leading-snug">{job.title}</h4>
                  <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    Aktif
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  {job.category} · {job.jobType}
                </p>
                <p className="text-xs text-neutral-800 font-medium mt-1.5">{job.salaryRange}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Applicant Pipeline */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between">
            <span>Berkas Pelamar Masuk</span>
            <span className="text-xs text-neutral-500 font-normal">
              {applications.length} Kandidat
            </span>
          </h3>

          {applications.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl border border-neutral-200">
              <Users className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-neutral-700">Belum ada pelamar baru</h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Pelamar akan muncul di sini saat seseorang melamar lowongan Anda.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-neutral-900">{app.applicantName}</h4>
                        <span className="text-xs text-neutral-500">({app.applicantPersona})</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Posisi: <strong className="text-neutral-800">{app.jobTitle}</strong>
                      </p>
                    </div>

                    {/* Status Selector */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-neutral-400">Status:</span>
                      <select
                        value={app.status}
                        onChange={(e) =>
                          onUpdateAppStatus(app.id, e.target.value as JobApplication['status'])
                        }
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          app.status === 'Wawancara'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : app.status === 'Diterima'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-sky-50 text-sky-800 border-sky-200'
                        }`}
                      >
                        <option value="Terkirim">Terkirim</option>
                        <option value="Ditinjau">Ditinjau</option>
                        <option value="Wawancara">Wawancara</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Belum Sesuai">Belum Sesuai</option>
                      </select>
                    </div>
                  </div>

                  {/* Cover Note */}
                  <div className="p-2.5 bg-neutral-50 rounded-lg text-xs text-neutral-700 leading-relaxed italic">
                    "{app.coverNote}"
                  </div>

                  {/* Contact & Links Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-neutral-100 text-xs">
                    <a
                      href={`https://wa.me/${app.applicantPhone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sky-700 font-semibold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp ({app.applicantPhone})</span>
                    </a>

                    {app.portfolioUrl && (
                      <a
                        href={app.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Lihat Portofolio</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
