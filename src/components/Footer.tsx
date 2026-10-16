import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-white border-t border-sky-100 mt-16 text-neutral-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Logo Remotiv"
                width="28"
                height="28"
                className="h-7 w-7 rounded-lg object-contain"
              />
              <span className="font-bold text-base text-neutral-900">Remotiv</span>
            </div>
            <p className="text-neutral-500 max-w-sm leading-relaxed">
              Platform kerja remote inklusif berbahasa Indonesia untuk ibu rumah tangga, talenta pemula, dan UMKM lokal.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-2 uppercase tracking-wider text-[11px]">
              Menu Utama
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('lowongan')}
                  className="hover:text-sky-600 transition-colors cursor-pointer"
                >
                  Lowongan Kerja Fleksibel
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pelatihan')}
                  className="hover:text-sky-600 transition-colors cursor-pointer"
                >
                  Katalog Pelatihan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('komunitas')}
                  className="hover:text-sky-600 transition-colors cursor-pointer"
                >
                  Diskusi Komunitas
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-2 uppercase tracking-wider text-[11px]">
              Keamanan & Dukungan
            </h4>
            <ul className="space-y-1.5 text-neutral-500">
              <li>100% Bebas Biaya Pendaftaran</li>
              <li>Peluang Terverifikasi & Ramah Pemula</li>
              <li>Bantuan: halo@remotiv.id</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-400 text-[11px]">
          <p>© {new Date().getFullYear()} Remotiv Indonesia. Platform Kerja Remote Berkelanjutan.</p>
        </div>
      </div>
    </footer>
  );
};
