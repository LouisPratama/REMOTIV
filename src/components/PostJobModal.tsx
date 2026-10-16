import React, { useState } from 'react';
import { Job, JobCategory, JobType, TargetAudience } from '../types';
import { X, PlusCircle } from 'lucide-react';

interface PostJobModalProps {
  onClose: () => void;
  onJobCreated: (newJob: Job) => void;
  employerId: string;
  initialCompanyName: string;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  onClose,
  onJobCreated,
  employerId,
  initialCompanyName
}) => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [companyCity, setCompanyCity] = useState('Solo (Remote)');
  const [category, setCategory] = useState<Exclude<JobCategory, 'Semua Kategori'>>('Admin & Operasional');
  const [jobType, setJobType] = useState<Exclude<JobType, 'Semua Tipe'>>('Fleksibel');
  const [salaryRange, setSalaryRange] = useState('Rp 2.500.000 - Rp 3.500.000 / bulan');
  const [workHoursDetail, setWorkHoursDetail] = useState('3-4 jam per hari, bebas atur jadwal');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('Menjawab chat pelanggan dengan ramah\nMembuat rekap pesanan harian di Spreadsheet\nMembantu pengecekan resi paket');
  const [requirementsText, setRequirementsText] = useState('Memiliki smartphone atau laptop dengan internet lancar\nTeliti dan komunikatif\nSiap mengikuti panduan kerja');
  const [selectedAudiences, setSelectedAudiences] = useState<TargetAudience[]>([
    'Ibu Rumah Tangga',
    'Pemula / Tanpa Pengalaman'
  ]);

  const allAudiences: TargetAudience[] = [
    'Ibu Rumah Tangga',
    'Pemula / Tanpa Pengalaman',
    'Fresh Graduate',
    'Freelancer Pemula'
  ];

  const handleAudienceToggle = (target: TargetAudience) => {
    if (selectedAudiences.includes(target)) {
      if (selectedAudiences.length > 1) {
        setSelectedAudiences(selectedAudiences.filter((t) => t !== target));
      }
    } else {
      setSelectedAudiences([...selectedAudiences, target]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const initial = companyName
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('') || 'UM';

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title,
      companyName,
      companyInitial: initial,
      companyCity,
      category,
      jobType,
      salaryRange,
      targetAudience: selectedAudiences,
      workHoursDetail,
      description,
      responsibilities: responsibilitiesText.split('\n').filter((l) => l.trim().length > 0),
      requirements: requirementsText.split('\n').filter((l) => l.trim().length > 0),
      benefits: ['Waktu kerja fleksibel', 'Bimbingan kerja langsung', 'Pembayaran tepat waktu'],
      equipmentNeeded: ['Smartphone / Laptop', 'WhatsApp'],
      postedDate: 'Baru saja',
      employerId
    };

    onJobCreated(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-sky-100 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-sky-100 flex items-start justify-between bg-sky-600 text-white">
          <div>
            <h2 className="text-base font-bold">Publikasikan Lowongan Kerja UMKM</h2>
            <p className="text-xs text-sky-100 mt-0.5">
              Jangkau talenta lokal, ibu rumah tangga, dan freelancer untuk usaha Anda.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-sky-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                Judul Lowongan *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Admin WhatsApp & Tokopedia"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                Nama Usaha / Toko *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-neutral-800 mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
              >
                <option value="Customer Service">Customer Service</option>
                <option value="Admin & Operasional">Admin & Operasional</option>
                <option value="Desain & Kreatif">Desain & Kreatif</option>
                <option value="Penulisan & Konten">Penulisan & Konten</option>
                <option value="Pemasaran Digital">Pemasaran Digital</option>
                <option value="Entri Data & Riset">Entri Data & Riset</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">Tipe Kerja</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as any)}
                className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
              >
                <option value="Fleksibel">Fleksibel</option>
                <option value="Paruh Waktu">Paruh Waktu</option>
                <option value="Penuh Waktu">Penuh Waktu</option>
                <option value="Proyek / Freelance">Proyek / Freelance</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">Kota Asal</label>
              <input
                type="text"
                value={companyCity}
                onChange={(e) => setCompanyCity(e.target.value)}
                className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                Kompensasi / Gaji *
              </label>
              <input
                type="text"
                required
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full p-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-800 mb-1">
                Ketentuan Jam Kerja
              </label>
              <input
                type="text"
                value={workHoursDetail}
                onChange={(e) => setWorkHoursDetail(e.target.value)}
                className="w-full p-2.5 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Target Audience selection */}
          <div>
            <label className="block font-semibold text-neutral-800 mb-1">
              Fokus Sasaran Pelamar:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allAudiences.map((aud) => {
                const isSelected = selectedAudiences.includes(aud);
                return (
                  <button
                    type="button"
                    key={aud}
                    onClick={() => handleAudienceToggle(aud)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 text-sky-800'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {aud}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-800 mb-1">
              Ringkasan Deskripsi Pekerjaan *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Jelaskan kebutuhan usaha Anda secara ringkas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-800 mb-1">
              Tanggung Jawab Harian (1 baris per poin)
            </label>
            <textarea
              rows={2}
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-800 mb-1">
              Kualifikasi (1 baris per poin)
            </label>
            <textarea
              rows={2}
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tayangkan Lowongan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
