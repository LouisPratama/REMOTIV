export type JobCategory =
  | 'Semua Kategori'
  | 'Admin & Operasional'
  | 'Customer Service'
  | 'Desain & Kreatif'
  | 'Penulisan & Konten'
  | 'Pemasaran Digital'
  | 'Entri Data & Riset';

export type JobType = 'Semua Tipe' | 'Penuh Waktu' | 'Paruh Waktu' | 'Proyek / Freelance' | 'Fleksibel';

export type TargetAudience =
  | 'Ibu Rumah Tangga'
  | 'Pemula / Tanpa Pengalaman'
  | 'Fresh Graduate'
  | 'Freelancer Pemula';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyInitial: string;
  companyCity: string;
  category: Exclude<JobCategory, 'Semua Kategori'>;
  jobType: Exclude<JobType, 'Semua Tipe'>;
  salaryRange: string;
  targetAudience: TargetAudience[];
  workHoursDetail: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  equipmentNeeded: string[];
  postedDate: string;
  employerId: string;
  deadline?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantPersona: string;
  coverNote: string;
  portfolioUrl?: string;
  status: 'Terkirim' | 'Ditinjau' | 'Wawancara' | 'Diterima' | 'Belum Sesuai';
  appliedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  practicalTip: string;
  videoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Pemula (0 Pengalaman)' | 'Menengah';
  duration: string;
  targetAudience: string;
  description: string;
  instructorName: string;
  instructorTitle: string;
  enrolledCount: number;
  rating: number;
  isFree: boolean;
  price?: number;
  lessons: Lesson[];
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorPersona: string;
  content: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorPersona: string;
  category: 'Tips & Manajemen Waktu' | 'Tanya Komunitas' | 'Cerita Berhasil' | 'Peluang & Kolaborasi';
  title: string;
  content: string;
  likes: number;
  isLiked?: boolean;
  comments: CommunityComment[];
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  persona: 'Ibu Rumah Tangga' | 'Pencari Kerja Pemula' | 'Freelancer Pemula';
  headline: string;
  bio: string;
  readinessStatus: 'Siap Kerja Segera' | 'Terbuka Part-Time' | 'Sedang Belajar/Upskilling';
  skills: string[];
  availableHoursPerDay: string;
  preferredJobTypes: string[];
  portfolioLink: string;
  cvUploaded: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'seeker' | 'employer';
  subRole?: string; // e.g. 'Ibu Rumah Tangga', 'Pemula', 'Pemilik UMKM'
  companyName?: string;
}

export type ActiveRole = 'seeker' | 'employer' | 'guest';
export type ActiveTab = 'beranda' | 'lowongan' | 'pelatihan' | 'komunitas' | 'profil' | 'kelola-lowongan';
