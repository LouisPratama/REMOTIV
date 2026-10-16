import React from 'react';
import { ActiveRole, ActiveTab, UserAccount } from '../types';
import { Home, Briefcase, BookOpen, MessageSquare, User, Building2, PlusCircle, LogOut, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeRole: ActiveRole;
  currentAccount: UserAccount | null;
  onOpenRegister: () => void;
  onOpenPostJob: () => void;
  onLogout: () => void;
  onOpenCareerTest: () => void;
  applicationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  currentAccount,
  onOpenRegister,
  onOpenPostJob,
  onLogout,
  onOpenCareerTest,
  applicationCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100">
      {/* Light Blue Notification / Account Bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-sky-100 bg-sky-50 px-3 py-1.5 text-xs text-sky-900 sm:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500"></span>
          {currentAccount ? (
            <span className="truncate">
              Sedang masuk sebagai: <strong className="font-semibold text-sky-950">{currentAccount.name}</strong>{' '}
              <span className="text-sky-700">({currentAccount.subRole || (currentAccount.role === 'seeker' ? 'Pencari Kerja' : 'UMKM')})</span>
            </span>
          ) : (
            <span className="text-sky-800">Mode Tamu (Jelajah Tanpa Akun)</span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {currentAccount ? (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1 text-[11px] text-sky-700 hover:text-sky-950 hover:underline cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Ganti Akun / Keluar</span>
            </button>
          ) : (
            <button
              onClick={onOpenRegister}
              className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 bg-white border border-sky-200 px-2.5 py-0.5 rounded shadow-xs"
            >
              Daftar / Masuk Akun
            </button>
          )}
        </div>
      </div>

      {/* Main Nav (Top Bar Contract: 3 zones in light blue tone) */}
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2 lg:h-16 lg:flex-nowrap lg:gap-4 lg:py-0">
          {/* Zone 1: Brand Title */}
          <div className="order-1 flex min-w-0 shrink-0 items-center gap-3">
            <button
              onClick={() => setActiveTab('beranda')}
              className="group flex shrink-0 cursor-pointer items-center gap-2 text-left"
            >
              <img
                src="/logo.png"
                alt="Logo Remotiv"
                width="44"
                height="44"
                className="h-10 w-10 flex-none rounded-lg object-contain sm:h-11 sm:w-11"
              />
              <div className="whitespace-nowrap">
                <span className="text-lg font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-sky-600 sm:text-xl">
                  Remotiv
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-sky-600 font-normal">
                  Kerja Remote Ramah Pemula
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean & Simple) */}
          <nav className="order-3 -mx-3 flex w-[calc(100%+1.5rem)] shrink-0 items-center gap-1 overflow-x-auto border-t border-slate-100 px-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-2 lg:mx-0 lg:w-auto lg:flex-1 lg:justify-center lg:gap-2 lg:overflow-visible lg:border-0 lg:px-0 lg:pt-0">
            <button
              onClick={() => setActiveTab('beranda')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'beranda'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="whitespace-nowrap">Beranda</span>
            </button>

            <button
              onClick={() => setActiveTab('lowongan')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'lowongan'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="whitespace-nowrap">Lowongan</span>
            </button>

            <button
              onClick={() => setActiveTab('pelatihan')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'pelatihan'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="whitespace-nowrap">Pelatihan</span>
            </button>

            <button
              onClick={() => setActiveTab('komunitas')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'komunitas'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="whitespace-nowrap">Komunitas</span>
            </button>

            {activeRole === 'employer' && (
              <button
                onClick={() => setActiveTab('kelola-lowongan')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'kelola-lowongan'
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="whitespace-nowrap">Dashboard UMKM</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="order-2 flex shrink-0 items-center gap-2 lg:order-3">
            <button
              type="button"
              onClick={onOpenCareerTest}
              aria-label="Mulai tes minat karier"
              title="Tes minat karier"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white text-sky-600 transition-colors hover:border-sky-300 hover:bg-sky-50 sm:h-10 sm:w-10"
            >
              <Sparkles className="h-5 w-5" />
            </button>
            {activeRole === 'employer' ? (
              <button
                onClick={onOpenPostJob}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-sky-600 px-2.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-sky-700 sm:px-3.5 sm:text-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Pasang Lowongan</span>
              </button>
            ) : activeRole === 'seeker' ? (
              <button
                onClick={() => setActiveTab('profil')}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                  activeTab === 'profil'
                    ? 'border-sky-500 bg-sky-50 text-sky-800'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <User className="w-4 h-4 text-sky-600" />
                <span className="hidden sm:inline">Profil Saya</span>
                {applicationCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-sky-800 bg-sky-100 rounded-full">
                    {applicationCount}
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-2 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-100 sm:px-3.5 sm:text-sm"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Registrasi / Masuk</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
