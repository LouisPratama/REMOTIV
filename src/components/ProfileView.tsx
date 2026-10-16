import React, { useState } from 'react';
import { UserProfile, JobApplication } from '../types';
import { MapPin, Clock, Phone, Briefcase, X, CheckCircle, Save } from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  applications: JobApplication[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  applications
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [newSkill, setNewSkill] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (!formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove)
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-sky-100 p-6 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-sky-100 text-sky-800 font-bold text-xl flex items-center justify-center mb-3 border border-sky-200">
              {formData.name.charAt(0)}
            </div>

            <h2 className="text-lg font-bold text-neutral-900">{formData.name}</h2>
            <p className="text-xs text-sky-700 font-medium">{formData.persona}</p>
            <p className="text-xs text-neutral-600 mt-2">{formData.headline}</p>

            <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{formData.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{formData.availableHoursPerDay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{formData.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                ● {formData.readinessStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Applications & Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applications History Section */}
          <section className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Riwayat Lamaran Saya</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Pantau perkembangan lamaran Anda ke UMKM mitra
                </p>
              </div>
              <span className="text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                {applications.length} Terkirim
              </span>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-6 bg-neutral-50 rounded-lg border border-dashed border-neutral-200">
                <Briefcase className="w-6 h-6 text-neutral-400 mx-auto mb-1.5" />
                <p className="text-xs text-neutral-600 font-medium">Belum ada lamaran yang diajukan</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Buka tab Lowongan untuk mencari pekerjaan remote fleksibel.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {applications.map((app) => (
                  <div key={app.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900">{app.jobTitle}</h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                        <span className="font-medium text-neutral-700">{app.companyName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{app.appliedAt}</span>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-md shrink-0 ${
                        app.status === 'Wawancara'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'Diterima'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-sky-50 text-sky-800 border border-sky-200'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Edit Profile Form */}
          <section className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Kelola Data Profil</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Lengkapi data untuk memudahkan pemilik UMKM menghubungi Anda
                </p>
              </div>

              {isSaved && (
                <div className="inline-flex items-center gap-1.5 text-xs text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg font-semibold border border-sky-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Tersimpan!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Kategori</label>
                  <select
                    value={formData.persona}
                    onChange={(e) => setFormData({ ...formData, persona: e.target.value as any })}
                    className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                  >
                    <option value="Ibu Rumah Tangga">Ibu Rumah Tangga</option>
                    <option value="Pencari Kerja Pemula">Pencari Kerja Pemula</option>
                    <option value="Freelancer Pemula">Freelancer Pemula</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Headline Keterampilan
                </label>
                <input
                  type="text"
                  required
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Tentang Saya
                </label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">No. WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Kota / Domisili</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Kesiapan Kerja</label>
                  <select
                    value={formData.readinessStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, readinessStatus: e.target.value as any })
                    }
                    className="w-full p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                  >
                    <option value="Siap Kerja Segera">Siap Kerja Segera</option>
                    <option value="Terbuka Part-Time">Terbuka Part-Time</option>
                    <option value="Sedang Belajar/Upskilling">Sedang Belajar/Upskilling</option>
                  </select>
                </div>
              </div>

              {/* Skills Tag Editor */}
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Keterampilan
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-100 px-2 py-0.5 rounded text-xs"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-neutral-400 hover:text-rose-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tambah keahlian (contoh: Canva, Excel)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 p-2 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
                  >
                    Tambah
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Profil</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
