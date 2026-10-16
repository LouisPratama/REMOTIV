import React from 'react';
import { Search, HeartHandshake, ShieldCheck, Clock } from 'lucide-react';
import { JobCategory } from '../types';

interface HeroSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: JobCategory;
  setSelectedCategory: (category: JobCategory) => void;
  selectedAudience: string;
  setSelectedAudience: (aud: string) => void;
  totalJobs: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchTerm,
  setSearchTerm,
  selectedAudience,
  setSelectedAudience,
  totalJobs
}) => {
  const quickAudiences = [
    { label: 'Semua Lowongan', value: 'all' },
    { label: 'Ibu Rumah Tangga', value: 'Ibu Rumah Tangga' },
    { label: 'Ramah Pemula', value: 'Pemula / Tanpa Pengalaman' },
    { label: 'Freelancer Pemula', value: 'Freelancer Pemula' }
  ];

  return (
    <section className="bg-gradient-to-b from-sky-50/70 via-sky-50/20 to-neutral-50/30 pt-8 pb-10 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-100/80 px-2.5 py-1 rounded-md mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-sky-600" />
            <span>Peluang Kerja Fleksibel & Ramah Pemula</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-3">
            Temukan Peluang Kerja Remote yang Menghargai Waktu Anda
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
            Dihubungkan langsung dengan UMKM terpercaya di Indonesia. Waktu kerja fleksibel untuk ibu rumah tangga dan pemula.
          </p>

          {/* Search Box */}
          <div className="bg-white p-2 rounded-xl border border-sky-200 shadow-xs flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari lowongan (contoh: Admin Chat, Canva, Entri Data)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Audience Filter Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Filter Cepat:</span>
            {quickAudiences.map((aud) => (
              <button
                key={aud.value}
                onClick={() => setSelectedAudience(aud.value)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedAudience === aud.value
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-neutral-700 border border-sky-200/80 hover:bg-sky-50'
                }`}
              >
                {aud.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Simpler Value Props */}
        <div className="mt-8 pt-6 border-t border-sky-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-semibold text-neutral-900">Jam Kerja Terukur</h2>
              <p className="text-neutral-500 mt-0.5">Bisa disesuaikan dengan aktivitas rumah tangga.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-semibold text-neutral-900">UMKM Terverifikasi</h2>
              <p className="text-neutral-500 mt-0.5">Bebas biaya pendaftaran dan skema penipuan.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-semibold text-neutral-900">Dukungan Komunitas</h2>
              <p className="text-neutral-500 mt-0.5">Saling bantu dan belajar keterampilan dari nol.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
