import { Job, Course, CommunityPost, UserProfile } from '../types';
import { PREMIUM_COURSES } from './premiumCourses';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Admin Chat & Customer Support Toko Online',
    companyName: 'Batik Lestari Nusantara',
    companyInitial: 'BL',
    companyCity: 'Solo (Remote)',
    category: 'Customer Service',
    jobType: 'Fleksibel',
    salaryRange: 'Rp 2.400.000 - Rp 3.200.000 / bulan',
    targetAudience: ['Ibu Rumah Tangga', 'Pemula / Tanpa Pengalaman'],
    workHoursDetail: 'Shift fleksibel (4 jam/hari), bisa dikerjakan di sela waktu rumah tangga',
    description: 'Kami mencari admin ramah untuk membalas pesan calon pembeli di WhatsApp Business, Shopee, dan Tokopedia dengan template yang sudah disediakan. Cocok untuk ibu rumah tangga atau yang ingin kerja sampingan dari rumah.',
    responsibilities: [
      'Menjawab pesan masuk dari pelanggan dengan sopan dan informatif',
      'Membuat rekap pesanan harian di Google Spreadsheet sederhana',
      'Meneruskan komplain atau kendala pengiriman ke tim logistik',
      'Memastikan respons chat rata-rata di bawah 15 menit pada jam shift'
    ],
    requirements: [
      'Memiliki smartphone atau laptop yang terkoneksi internet stabil',
      'Mampu mengetik dengan rapi dan berbahasa Indonesia yang sopan',
      'Teliti dan sabar menghadapi pertanyaan pembeli',
      'Tidak diwajibkan pengalaman kerja sebelumnya (ada pelatihan 2 hari)'
    ],
    benefits: [
      'Waktu kerja sangat fleksibel',
      'Insentif bonus jika mencapai target respon cepat',
      'Bimbingan langsung dari pemilik usaha'
    ],
    equipmentNeeded: ['Smartphone / Laptop', 'Koneksi WhatsApp'],
    postedDate: 'Hari ini',
    employerId: 'emp-1'
  },
  {
    id: 'job-2',
    title: 'Asisten Konten Media Sosial & Desain Canva',
    companyName: 'Kopi Kenari Artisan',
    companyInitial: 'KK',
    companyCity: 'Bandung (Remote)',
    category: 'Desain & Kreatif',
    jobType: 'Paruh Waktu',
    salaryRange: 'Rp 2.000.000 - Rp 3.000.000 / bulan',
    targetAudience: ['Freelancer Pemula', 'Fresh Graduate'],
    workHoursDetail: '20 jam/minggu (bebas atur jadwal asalkan konten terbit tepat waktu)',
    description: 'Membantu pembuatan materi promosi visual sederhana menggunakan template Canva untuk feed Instagram dan status TikTok UMKM kopi lokal.',
    responsibilities: [
      'Membuat 3-4 materi visual per minggu menggunakan Canva (template disediakan)',
      'Menulis caption singkat dan memilih tagar yang relevan',
      'Menjadwalkan posting konten melalui Meta Business Suite',
      'Riset tren tren konten produk kuliner dan UMKM'
    ],
    requirements: [
      'Bisa mengoperasikan Canva secara mandiri',
      'Kreatif dan memahami estetika visual dasar',
      'Punya portofolio sederhana (boleh karya pribadi atau tugas)',
      'Komunikatif saat evaluasi mingguan via Zoom/Google Meet'
    ],
    benefits: [
      'Dapat akun Canva Pro selama bekerja',
      'Paket sample kopi bulanan dikirim ke rumah',
      'Sertifikat rekomendasi kerja untuk portofolio'
    ],
    equipmentNeeded: ['Laptop / Tablet', 'Koneksi Internet'],
    postedDate: 'Kemarin',
    employerId: 'emp-2'
  },
  {
    id: 'job-3',
    title: 'Petugas Entri Data Produk & Stok Marketplace',
    companyName: 'Gudang Hijau Organik',
    companyInitial: 'GH',
    companyCity: 'Yogyakarta (Remote)',
    category: 'Entri Data & Riset',
    jobType: 'Fleksibel',
    salaryRange: 'Rp 2.200.000 - Rp 2.800.000 / bulan',
    targetAudience: ['Pemula / Tanpa Pengalaman', 'Ibu Rumah Tangga'],
    workHoursDetail: 'Berdasarkan target kuota entri harian, bisa dikerjakan malam atau siang',
    description: 'Pekerjaan memasukkan data deskripsi produk organik, harga, berat paket, dan foto ke dashboard Tokopedia, Shopee, dan TikTok Shop.',
    responsibilities: [
      'Input data spesifikasi produk sesuai formulir standar',
      'Cek kesesuaian stok antara data fisik gudang dan toko online',
      'Membersihkan data duplikat pada file master Excel/Spreadsheet'
    ],
    requirements: [
      'Menguasai rumus dasar Microsoft Excel / Google Sheets (SUM, Filter, Sort)',
      'Tingkat ketelitian tinggi terhadap angka dan kode SKU barang',
      'Memiliki PC atau Laptop pribadi'
    ],
    benefits: [
      'Pelatihan awal gratis mengenai sistem marketplace',
      'Bekerja mandiri tanpa pengawasan micro-management',
      'Bonus ketepatan dan kelengkapan data bulanan'
    ],
    equipmentNeeded: ['Laptop / Komputer', 'Google Chrome'],
    postedDate: '3 hari yang lalu',
    employerId: 'emp-3'
  },
  {
    id: 'job-4',
    title: 'Penulis Artikel Blog & Review Produk UMKM',
    companyName: 'Media Kreasi Lokal',
    companyInitial: 'MK',
    companyCity: 'Surabaya (Remote)',
    category: 'Penulisan & Konten',
    jobType: 'Proyek / Freelance',
    salaryRange: 'Rp 80.000 - Rp 120.000 / artikel (Estimasi Rp 2.5jt+/bln)',
    targetAudience: ['Freelancer Pemula', 'Ibu Rumah Tangga'],
    workHoursDetail: 'Per proyek / target 4-5 artikel per minggu',
    description: 'Menulis artikel santai dan informatif seputar tips gaya hidup, panduan rumah tangga, dan ulasan produk UMKM lokal dengan gaya bahasa ramah.',
    responsibilities: [
      'Menulis artikel 600 - 800 kata berbahasa Indonesia yang enak dibaca',
      'Mencantumkan kata kunci SEO dasar yang telah disediakan editor',
      'Mencari 2 foto ilustrasi bebas royalti (Unsplash / Pixabay)'
    ],
    requirements: [
      'Menyukai dunia tulis-menulis dan membaca',
      'Tata bahasa Indonesia yang baik, tidak asal copy-paste',
      'Disiplin terhadap tenggat waktu (deadline)',
      'Kirimkan 1 contoh tulisan bebas saat melamar'
    ],
    benefits: [
      'Pembayaran per artikel cair dua mingguan tanpa potongan',
      'Feedback konstruktif dari editor senior untuk meningkatkan skill'
    ],
    equipmentNeeded: ['Laptop / Smartphone', 'Google Docs'],
    postedDate: '4 hari yang lalu',
    employerId: 'emp-4'
  },
  {
    id: 'job-5',
    title: 'Moderator Komunitas & Live Host Pemula',
    companyName: 'Dapur Bunda Hebat',
    companyInitial: 'DB',
    companyCity: 'Semarang (Remote)',
    category: 'Admin & Operasional',
    jobType: 'Paruh Waktu',
    salaryRange: 'Rp 2.800.000 - Rp 3.800.000 / bulan',
    targetAudience: ['Ibu Rumah Tangga', 'Fresh Graduate'],
    workHoursDetail: 'Jadwal terjadwal 2 jam per sesi live (3x seminggu)',
    description: 'Membantu menyapa audiens saat sesi live TikTok/Shopee resep masakan, memoderasi komentar spam, dan menyematkan keranjang kuning.',
    responsibilities: [
      'Menjaga suasana kolom komentar tetap kondusif dan ramah',
      'Menjawab pertanyaan seputar bahan makanan dan harga promo',
      'Bekerjasama dengan host utama untuk meningkatkan penjualan'
    ],
    requirements: [
      'Kepribadian ceria, ramah, dan percaya diri',
      'Paham navigasi fitur live di TikTok dan Shopee',
      'Koneksi internet cepat dan stabil'
    ],
    benefits: [
      'Komisi penjualan tambahan dari keranjang live',
      'Jam kerja singkat dan suasana kerja menyenangkan'
    ],
    equipmentNeeded: ['Smartphone Android/iOS bagus', 'Headset'],
    postedDate: '5 hari yang lalu',
    employerId: 'emp-5'
  },
  {
    id: 'job-6',
    title: 'Spesialis Pemasaran WhatsApp & CRM Pelanggan',
    companyName: 'Herbal Alami Nusantara',
    companyInitial: 'HA',
    companyCity: 'Malang (Remote)',
    category: 'Pemasaran Digital',
    jobType: 'Penuh Waktu',
    salaryRange: 'Rp 3.500.000 - Rp 4.500.000 / bulan',
    targetAudience: ['Fresh Graduate', 'Freelancer Pemula'],
    workHoursDetail: 'Senin - Jumat (08.30 - 17.00 WIB)',
    description: 'Mengelola database pelanggan lama untuk program loyalty, repeat order, dan penawaran promo berkala dengan pendekatan humanis tanpa spam.',
    responsibilities: [
      'Menyapa pelanggan yang sudah pernah membeli untuk follow-up kepuasan',
      'Mengirimkan informasi diskon ulang tahun dan promo bulanan',
      'Mencatat riwayat interaksi di aplikasi kontak pelanggan'
    ],
    requirements: [
      'Punya empati tinggi dan senang berkomunikasi',
      'Bisa bekerja mandiri dari rumah dengan target harian yang jelas',
      'Pengalaman di bidang penjualan/CS menjadi nilai tambah'
    ],
    benefits: [
      'Gaji pokok + bonus pencapaian repeat order',
      'Tunjangan paket internet bulanan',
      'Kultur kerja santai dan saling mendukung'
    ],
    equipmentNeeded: ['Laptop', 'Smartphone khusus kerja (disediakan)'],
    postedDate: '1 minggu lalu',
    employerId: 'emp-6'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Dasar Admin Marketplace & CS Chat Ramah Pelanggan',
    category: 'Operasional & CS',
    level: 'Pemula (0 Pengalaman)',
    duration: '1,5 Jam Video',
    targetAudience: 'Ibu Rumah Tangga & Pemula',
    description: 'Pelatihan langkah-demi-langkah mengoperasikan chat Tokopedia, Shopee, WhatsApp Business, dan teknik meredakan komplain pembeli.',
    instructorName: 'Ratna Sulistyo',
    instructorTitle: 'Praktisi E-Commerce & Mantan Lead CS Marketplace',
    enrolledCount: 1420,
    rating: 4.9,
    isFree: true,
    lessons: [
      {
        id: 'c1-l1',
        title: 'Mengenal Etika Chat & Gaya Bahasa Menghadapi Pembeli',
        duration: '25 menit',
        summary: 'Cara menjawab salam, menggunakan sapaan ramah tanpa terdengar kaku, dan membuat pembeli merasa dihargai.',
        practicalTip: 'Gunakan nama pelanggan dan hindari kalimat penolakan langsung seperti "Barang habis". Ubah menjadi "Mohon maaf saat ini stok sedang kami perbarui".'
      },
      {
        id: 'c1-l2',
        title: 'Manajemen Template Pesan Cepat di WhatsApp Business',
        duration: '35 menit',
        summary: 'Membuat shortcut / quick replies untuk daftar harga, ongkos kirim, panduan rekening, dan no resi.',
        practicalTip: 'Simpan kode /ongkir, /rekening, dan /promo agar waktu membalas kurang dari 30 detik.'
      },
      {
        id: 'c1-l3',
        title: 'Pencatatan Pesanan Harian dengan Google Spreadsheet',
        duration: '40 menit',
        summary: 'Membuat tabel sederhana: Tanggal, Nama, No HP, Alamat, Pesanan, Ekspedisi, dan Status Pembayaran.',
        practicalTip: 'Gunakan fitur Dropdown Data Validation agar status pesanan seragam (Lunas, Dikemas, Dikirim).'
      },
      {
        id: 'c1-l4',
        title: 'Teknik Menghadapi Komplain Pengiriman Lambat / Rusak',
        duration: '30 menit',
        summary: 'Rumus 3A: Acknowledge (Akui), Apologize (Minta maaf), Action (Solusi nyata).',
        practicalTip: 'Dengarkan pembeli terlebih dahulu sampai selesai sebelum memberikan solusi penggantian atau kompensasi.'
      }
    ]
  },
  {
    id: 'course-2',
    title: PREMIUM_COURSES['course-2'].title,
    category: 'Program Premium Berlisertifikat',
    level: 'Pemula (0 Pengalaman)',
    duration: '3 Jam Video + Template',
    targetAudience: 'Pemula & Freelancer',
    description: 'Program akselerasi premium dengan materi teks dan video, template kerja, sertifikat, serta satu sesi tutor privat melalui Zoom. Jadwal dipilih sebelum pembayaran.',
    instructorName: 'Anita Wulandari, S.Psi',
    instructorTitle: 'Head of Remote Talent Empowerment & Mentor Karir',
    enrolledCount: 1260,
    rating: 4.9,
    isFree: false,
    price: PREMIUM_COURSES['course-2'].price,
    lessons: [
      {
        id: 'c2-l1',
        title: 'Membuat SOP Chat WhatsApp untuk Client Berulang',
        duration: '25 menit',
        summary: 'Mengenal alur kerja virtual assistant mulai dari penerimaan order, konfirmasi, sampai follow-up after sales.',
        practicalTip: 'Simpan template respons untuk 5 skenario umum: pertanyaan produk, stok, pengiriman, pembayaran, dan komplain.'
      },
      {
        id: 'c2-l2',
        title: 'Teknik Menjual via Chat Tanpa Terasa Agresif',
        duration: '35 menit',
        summary: 'Belajar membangun trust, mengidentifikasi kebutuhan pelanggan, dan menutup penjualan secara halus.',
        practicalTip: 'Gunakan pendekatan “pahami kebutuhan dulu” sebelum tawarkan produk. Ini membuat calon pembeli lebih nyaman.'
      },
      {
        id: 'c2-l3',
        title: 'Template Laporan Kerja & Pelanggan Harian',
        duration: '30 menit',
        summary: 'Mengatur jadwal kerja, mencatat komunikasi, dan membuat laporan mingguan yang rapi.',
        practicalTip: 'buat spreadsheet dengan kolom nama, status, tanggal follow-up, dan catatan hasil chat supaya mudah diaudit.'
      },
      {
        id: 'c2-l4',
        title: 'Sertifikasi & Portofolio Profesional',
        duration: '20 menit',
        summary: 'Panduan menyusun portofolio kerja dasar dan meningkatkan peluang diterima klien.',
        practicalTip: 'Sertakan 3 contoh tugas kecil yang sudah dikerjakan, lengkap dengan hasil dan cara kerja Anda.'
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Manajemen Waktu Kerja Remote untuk Ibu Rumah Tangga',
    category: 'Produktivitas & Mindset',
    level: 'Pemula (0 Pengalaman)',
    duration: '1.5 Jam Video',
    targetAudience: 'Ibu Rumah Tangga',
    description: 'Panduan realistis membagi waktu antara urusan domestik, anak, dan tugas kerja remote tanpa rasa bersalah atau burnout.',
    instructorName: 'Dra. Maya Anggraeni',
    instructorTitle: 'Konselor Keluarga & Remote Freelancer 7 Tahun',
    enrolledCount: 980,
    rating: 4.8,
    isFree: true,
    lessons: [
      {
        id: 'c3-l1',
        title: 'Memetakan Jam Emas (Golden Hours) di Rumah',
        duration: '20 menit',
        summary: 'Mengidentifikasi jam tenang saat anak sekolah atau tidur siang untuk mengerjakan tugas yang butuh konsentrasi tinggi.',
        practicalTip: 'Bagi pekerjaan menjadi 2 kategori: butuh fokus penuh (pagi/malam) dan tugas repetitif yang bisa disambi (siang).'
      },
      {
        id: 'c3-l2',
        title: 'Komunikasi Terbuka dengan Pasangan & Keluarga',
        duration: '30 menit',
        summary: 'Membangun kesepakatan bahwa jam kerja remote tetaplah jam kerja profesional meski berada di rumah.',
        practicalTip: 'Buat tanda visual sederhana (misal pintu tertutup atau headset terpasang) sebagai penanda tidak bisa diganggu mendadak.'
      },
      {
        id: 'c3-l3',
        title: 'Mengatasi Rasa Bersalah (Mom Guilt) & Mencegah Kelelahan',
        duration: '35 menit',
        summary: 'Menyadari bahwa bekerja adalah ikhtiar membantu perekonomian keluarga, bukan mengabaikan rumah tangga.',
        practicalTip: 'Luangkan waktu 15 menit tanpa gadget sama sekali begitu jam kerja selesai untuk re-koneksi dengan anak.'
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Desain Promosi UMKM Menggunakan Canva dari Nol',
    category: 'Kreatif & Desain',
    level: 'Pemula (0 Pengalaman)',
    duration: '1 Jam Video',
    targetAudience: 'Freelancer Pemula & UMKM',
    description: 'Belajar membuat banner promosi diskon, feed Instagram, dan poster produk lokal tanpa perlu keahlian Photoshop.',
    instructorName: 'Dimas Ardiansyah',
    instructorTitle: 'Graphic Designer & Mentor Digital Creative',
    enrolledCount: 2150,
    rating: 4.9,
    isFree: true,
    lessons: [
      {
        id: 'c4-l1',
        title: 'Prinsip Hierarki Visual: Tulisan Mana yang Dilihat Dulu',
        duration: '30 menit',
        summary: 'Menentukan Headline (Nama Promo), Sub-headline (Detail), dan Call-to-action (Beli Sekarang).',
        practicalTip: 'Jangan gunakan lebih dari 2 jenis huruf (font) dalam satu poster agar tidak membingungkan mata.'
      },
      {
        id: 'c4-l2',
        title: 'Kombinasi Warna yang Terasa Terpercaya & Menarik',
        duration: '40 menit',
        summary: 'Memilih palet warna sesuai jenis bisnis (makanan, fashion, atau jasa profesional).',
        practicalTip: 'Aturan 60-30-10: 60% warna dasar putih/krem, 30% warna identitas brand, 10% warna aksen tombol aksi.'
      },
      {
        id: 'c4-l3',
        title: 'Membuat Template Feed & Story yang Konsisten',
        duration: '45 menit',
        summary: 'Membuat sistem template siap pakai sehingga postingan harian bisa selesai hanya dalam 5 menit.',
        practicalTip: 'Simpan aset logo berlatar transparan (.PNG) di folder cepat Canva.'
      },
      {
        id: 'c4-l4',
        title: 'Menyusun Portofolio Sederhana untuk Melamar Klien UMKM',
        duration: '35 menit',
        summary: 'Mengumpulkan 5 karya terbaik ke dalam Google Drive atau Canva Website gratis sebagai portofolio lamaran.',
        practicalTip: 'Sertakan penjelasan singkat: Masalah apa yang diselesaikan desain ini untuk bisnis terkait.'
      }
    ]
  },
  {
    id: 'course-5',
    title: PREMIUM_COURSES['course-5'].title,
    category: 'Program Premium Berlisertifikat',
    level: 'Menengah',
    duration: '2.5 Jam Video + Template',
    targetAudience: 'UMKM & Admin Data',
    description: 'Kuasai formula pencarian data, pembersihan data, dan otomasi Google Spreadsheet melalui materi teks dan video, dengan satu sesi tutor privat melalui Zoom. Jadwal dipilih sebelum pembayaran.',
    instructorName: 'Fajar Pratama, S.Kom',
    instructorTitle: 'Senior Data Operations Specialist',
    enrolledCount: 1120,
    rating: 4.9,
    isFree: false,
    price: PREMIUM_COURSES['course-5'].price,
    lessons: [
      {
        id: 'c5-l1',
        title: 'Membuat Dashboard Stok & Penjualan Sederhana',
        duration: '30 menit',
        summary: 'Rumusan dasar laporan stok, pembelian, dan penjualan yang mudah dibaca oleh owner usaha.',
        practicalTip: 'Gunakan warna yang konsisten untuk setiap status: stok aman, stok menipis, serta stok habis.'
      },
      {
        id: 'c5-l2',
        title: 'Formula Otomatis: SUMIF, VLOOKUP, dan Filter',
        duration: '40 menit',
        summary: 'Menyusun formula otomatis untuk kinerja data dan menghasilkan laporan yang lebih akurat.',
        practicalTip: 'Simpan file template pada satu folder agar data tidak tercecer saat dikerjakan berulang.'
      },
      {
        id: 'c5-l3',
        title: 'Integrasi Google Sheets & Canva untuk Pelaporan',
        duration: '45 menit',
        summary: 'Menggunakan Google Sheets untuk rekap data lalu menyalin hasilnya ke template presentasi.',
        practicalTip: 'Fungsikan fitur “Protected Range” agar data penting tidak berubah karena kesalahan editing.'
      },
      {
        id: 'c5-l4',
        title: 'Portofolio & Sertifikat',
        duration: '25 menit',
        summary: 'Cara mengelola hasil kerja menjadi portofolio yang siap dipresentasikan ke klien atau tim.',
        practicalTip: 'Sertakan screenshot proses kerja dan hasil laporan agar terlihat profesional dan mudah dipahami.'
      }
    ]
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Siti Nurhaliza',
    authorPersona: 'Ibu 2 Anak · Admin Chat Toko Pakaian',
    category: 'Cerita Berhasil',
    title: 'Pengalaman saya dapat kerja remote pertama setelah 4 tahun vakum kerja kantoran',
    content: 'Awalnya saya sempat minder karena umur sudah 32 tahun dan ada gap kerja sejak melahirkan anak kedua. Tapi lewat lowongan ramah pemula di Remotiv, saya berani daftar jadi admin chat toko baju muslim. Pemilik tokonya sangat mengerti kondisi saya yang harus antar anak sekolah pagi hari. Kuncinya saat melamar adalah jujur dengan jam ketersediaan kita dan tunjukkan kemauan belajar!',
    likes: 38,
    isLiked: false,
    createdAt: '2 jam yang lalu',
    comments: [
      {
        id: 'com-1',
        authorName: 'Rini Anggraini',
        authorPersona: 'Pencari Kerja Baru',
        content: 'MasyaAllah inspiratif sekali Mbak Siti! Boleh tanya, tes waktu melamar dulu apakah ada tes mengetik atau bikin tabel?',
        createdAt: '1 jam yang lalu'
      },
      {
        id: 'com-2',
        authorName: 'Siti Nurhaliza',
        authorPersona: 'Ibu 2 Anak · Admin Chat Toko Pakaian',
        content: 'Halo Mbak Rini, cuma diminta tes coba balas 3 skenario pesan komplain dari pelanggan dan rekap di Google Sheet contoh kok. Tenang aja, ikuti materi pelatihan di sini sudah sangat cukup!',
        createdAt: '45 menit yang lalu'
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Budi Hartono',
    authorPersona: 'Pemilik UMKM Kripik Singkong Juara',
    category: 'Peluang & Kolaborasi',
    title: 'Mengapa UMKM kami memilih tenaga kerja remote ibu rumah tangga daripada agensi besar',
    content: 'Bagi kami pelaku UMKM makanan ringan, ketulusan dan keramahan dalam membalas chat pelanggan lokal itu nomor satu. Kami mempekerjakan 2 ibu rumah tangga untuk admin WhatsApp, dan kepuasan pelanggan naik pesat. Yang kami butuhkan bukan bahasa korporat yang rumit, tapi ketelitian dan rasa empati. Jangan ragu melamar di UMKM ya rekan-rekan!',
    likes: 54,
    isLiked: true,
    createdAt: 'Kemarin',
    comments: [
      {
        id: 'com-3',
        authorName: 'Ahmad Fauzi',
        authorPersona: 'Freelancer Data Entry',
        content: 'Setuju sekali Pak Budi. Pendekatan humanis dan kekeluargaan UMKM sangat cocok untuk iklim kerja remote di Indonesia.',
        createdAt: '18 jam yang lalu'
      }
    ]
  },
  {
    id: 'post-3',
    authorName: 'Fani Oktaviani',
    authorPersona: 'Freelancer Pemula',
    category: 'Tanya Komunitas',
    title: 'Bagaimana cara menjelaskan ke keluarga bahwa kita kerja beneran meski cuma di depan HP/Laptop?',
    content: 'Seringkali orang tua atau tetangga mengira kita menganggur karena seharian di rumah, padahal ada target pekerjaan yang harus diselesaikan. Ada yang punya tips cara mengkomunikasikannya dengan baik tanpa tersinggung?',
    likes: 29,
    isLiked: false,
    createdAt: '2 hari yang lalu',
    comments: [
      {
        id: 'com-4',
        authorName: 'Kartika Dewi',
        authorPersona: 'Desainer Grafis Remote',
        content: 'Biasanya saya jelaskan sederhana: "Saya bantu toko online di Jakarta untuk catat pesanan, gajinya ditransfer bulanan seperti kantor biasa". Lama-lama kalau sudah lihat hasilnya, mereka bakal paham sendiri kok Mbak.',
        createdAt: '1 hari yang lalu'
      }
    ]
  }
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user-default-1',
  name: 'Dewi Kartikasari',
  email: 'dewi.kartika@example.com',
  phone: '0812-3456-7890',
  city: 'Sleman, D.I. Yogyakarta',
  persona: 'Ibu Rumah Tangga',
  headline: 'Siap Kerja Admin Chat, Entri Data, & Layanan Pelanggan Remote',
  bio: 'Ibu rumah tangga dengan ketelitian tinggi, terbiasa mengelola komunikasi WhatsApp Business dan rekap spreadsheet. Mencari kesempatan kerja remote paruh waktu atau fleksibel untuk mendukung ekonomi keluarga.',
  readinessStatus: 'Siap Kerja Segera',
  skills: ['Komunikasi WhatsApp', 'Google Spreadsheet', 'Customer Service Ramah', 'Canva Dasar', 'Ketik Cepat'],
  availableHoursPerDay: '4 - 5 jam / hari (Fleksibel Pagi & Malam)',
  preferredJobTypes: ['Paruh Waktu', 'Fleksibel', 'Proyek / Freelance'],
  portfolioLink: 'https://drive.google.com/contoh-portofolio-dewi',
  cvUploaded: true
};
