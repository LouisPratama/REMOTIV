import React, { useState } from 'react';
import { UserAccount } from '../types';
import { User, Building2, ArrowRight, X } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onRegister: (account: UserAccount) => void;
  onContinueAsGuest: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onRegister,
  onContinueAsGuest
}) => {
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subRole, setSubRole] = useState('Ibu Rumah Tangga');
  const [companyName, setCompanyName] = useState('');
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    if (role === 'employer' && !companyName.trim()) return;

    onRegister({
      id: `acc-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      role,
      subRole: role === 'employer' ? 'Pemilik UMKM' : subRole,
      companyName: role === 'employer' ? companyName.trim() : undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-sky-100 overflow-hidden my-6">
        {/* Brand Banner */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 p-6 text-white text-center relative">
          <img
            src="/logo.png"
            alt="Logo Remotiv"
            className="w-12 h-12 object-contain rounded-xl mx-auto shadow-sm mb-3"
          />
          <h2 className="text-xl font-bold">Selamat Datang di Remotiv</h2>
          <p className="text-xs text-sky-100 mt-1 max-w-sm mx-auto">
            Platform kerja remote inklusif berbahasa Indonesia untuk ibu rumah tangga, talenta pemula, dan UMKM.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-6">
          <label className="block text-xs font-semibold text-neutral-700 mb-2">
            Pilih Peran Anda untuk Memulai:
          </label>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('seeker')}
              className={`p-3 rounded-xl border text-left transition-all ${
                role === 'seeker'
                  ? 'border-sky-500 bg-sky-50/70 text-sky-950 ring-2 ring-sky-200'
                  : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <User className={`w-4 h-4 ${role === 'seeker' ? 'text-sky-600' : 'text-neutral-400'}`} />
                <span className="text-xs font-bold">Pencari Kerja</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Ibu rumah tangga, pemula, atau freelancer yang mencari kerja fleksibel.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole('employer')}
              className={`p-3 rounded-xl border text-left transition-all ${
                role === 'employer'
                  ? 'border-sky-500 bg-sky-50/70 text-sky-950 ring-2 ring-sky-200'
                  : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Building2 className={`w-4 h-4 ${role === 'employer' ? 'text-sky-600' : 'text-neutral-400'}`} />
                <span className="text-xs font-bold">UMKM / Usaha</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-tight">
                Pelaku usaha yang membutuhkan admin, CS, atau bantuan kerja remote.
              </p>
            </button>
          </div>

          {/* Simple Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                {role === 'seeker' ? 'Nama Lengkap Anda' : 'Nama Pemilik / Penanggung Jawab'} *
              </label>
              <input
                type="text"
                required
                placeholder={role === 'seeker' ? 'Contoh: Siti Rahmawati' : 'Contoh: Budi Santoso'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
              />
            </div>

            {role === 'employer' ? (
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Nama UMKM / Usaha *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Toko Kopi Senja / Dapur Berkah"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                />
              </div>
            ) : (
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Kategori Utama Anda
                </label>
                <select
                  value={subRole}
                  onChange={(e) => setSubRole(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                >
                  <option value="Ibu Rumah Tangga">Ibu Rumah Tangga (Mencari Waktu Fleksibel)</option>
                  <option value="Pemula / Tanpa Pengalaman">Pemula / Tanpa Pengalaman Kantor</option>
                  <option value="Freelancer Pemula">Freelancer Pemula</option>
                  <option value="Fresh Graduate">Fresh Graduate / Baru Lulus</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Daftar & Mulai Gunakan Remotiv</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center mt-5">
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="text-[11px] text-neutral-500 hover:text-neutral-800 underline"
            >
              Jelajah dulu sebagai Tamu (tanpa daftar sekarang)
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
