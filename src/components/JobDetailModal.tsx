import React, { useState } from 'react';
import { Job, UserProfile, ActiveRole } from '../types';
import { X, CheckCircle2, Clock, Banknote, Laptop, Send, User } from 'lucide-react';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
  currentUser: UserProfile;
  activeRole: ActiveRole;
  onApply: (jobId: string, applicationData: { coverNote: string; phone: string; portfolioUrl: string }) => void;
  hasApplied: boolean;
  onTriggerRegister: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  currentUser,
  activeRole,
  onApply,
  hasApplied,
  onTriggerRegister
}) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [coverNote, setCoverNote] = useState(
    `Halo tim ${job.companyName}, saya tertarik melamar untuk posisi ${job.title}. Saya memiliki waktu fleksibel dan siap belajar sesuai instruksi kerja.`
  );
  const [phone, setPhone] = useState(currentUser.phone);
  const [portfolioUrl, setPortfolioUrl] = useState(currentUser.portfolioLink || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onApply(job.id, {
        coverNote,
        phone,
        portfolioUrl
      });
      setIsSubmitting(false);
      setApplySuccess(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-sky-100 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-200 flex items-start justify-between bg-sky-50/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
              {job.companyInitial}
            </div>
            <div>
              <span className="text-xs font-medium text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                {job.category}
              </span>
              <h2 className="text-lg font-bold text-neutral-900 mt-1">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mt-0.5">
                <span className="font-semibold text-neutral-700">{job.companyName}</span>
                <span aria-hidden="true">·</span>
                <span>{job.companyCity}</span>
                <span aria-hidden="true">·</span>
                <span>{job.postedDate}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-neutral-700">
          {/* Status Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-sky-50/50 rounded-xl border border-sky-100">
            <div className="flex items-center gap-2.5">
              <Banknote className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <p className="text-[11px] text-neutral-500">Estimasi Kompensasi</p>
                <p className="font-semibold text-neutral-900 text-xs">{job.salaryRange}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-sky-600 shrink-0" />
              <div>
                <p className="text-[11px] text-neutral-500">Tipe & Jam Kerja</p>
                <p className="font-semibold text-neutral-900 text-xs">{job.jobType} · {job.workHoursDetail}</p>
              </div>
            </div>
          </div>

          {/* Suitable for */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1.5">
              Kesesuaian Pelamar
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {job.targetAudience.map((target, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-100 text-neutral-800 text-xs px-2.5 py-0.5 rounded-md font-medium"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1">
              Deskripsi Pekerjaan
            </h4>
            <p className="leading-relaxed text-neutral-600">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1.5">
              Tanggung Jawab Harian
            </h4>
            <ul className="space-y-1 list-disc list-inside text-neutral-600">
              {job.responsibilities.map((r, idx) => (
                <li key={idx} className="leading-relaxed">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1.5">
              Kualifikasi
            </h4>
            <ul className="space-y-1 list-disc list-inside text-neutral-600">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="leading-relaxed">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1">
              Perangkat Kerja
            </h4>
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-neutral-600">{job.equipmentNeeded.join(', ')}</span>
            </div>
          </div>

          {/* Guest Notice if trying to apply */}
          {activeRole === 'guest' && !showApplyForm && !hasApplied && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-neutral-700 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-amber-900">Akun Diperlukan untuk Melamar</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Daftarkan diri secara gratis agar profil dan nomor kontak Anda terhubung ke UMKM.
                </p>
              </div>
              <button
                type="button"
                onClick={onTriggerRegister}
                className="px-3 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors shrink-0 cursor-pointer"
              >
                Daftar Sekarang
              </button>
            </div>
          )}

          {/* Application Form Drawer */}
          {showApplyForm && !hasApplied && !applySuccess && (
            <div className="mt-4 p-4 bg-sky-50/50 rounded-xl border border-sky-200">
              <h4 className="font-bold text-neutral-900 text-sm mb-1">
                Kirim Lamaran ke {job.companyName}
              </h4>
              <p className="text-[11px] text-neutral-500 mb-3">
                Informasi profil Anda akan dilampirkan secara otomatis ke UMKM.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Nama Pelamar
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.name}
                    className="w-full text-xs p-2 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full text-xs p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Pesan Pengantar Singkat
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Tautan Contoh Portofolio / CV (Opsional)
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full text-xs p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowApplyForm(false)}
                    className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Mengirim...' : 'Kirim Lamaran'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Success Application Banner */}
          {(hasApplied || applySuccess) && (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-center space-y-1.5">
              <CheckCircle2 className="w-7 h-7 text-sky-600 mx-auto" />
              <h4 className="font-bold text-sky-950 text-sm">Lamaran Berhasil Terkirim!</h4>
              <p className="text-xs text-sky-800 leading-relaxed">
                Pemberi kerja ({job.companyName}) telah menerima lamaran Anda. Anda dapat melihat status lamaran di menu <strong>Profil Saya</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            Tutup
          </button>

          {!hasApplied && !applySuccess && !showApplyForm && (
            <button
              onClick={() => {
                if (activeRole === 'guest') {
                  onTriggerRegister();
                  return;
                }
                setShowApplyForm(true);
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Lamar Pekerjaan Ini</span>
            </button>
          )}

          {(hasApplied || applySuccess) && (
            <span className="text-xs font-medium text-sky-700 bg-sky-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sudah Dilamar</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
