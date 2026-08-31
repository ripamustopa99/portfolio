---
title: "Undangan Pernikahan Digital Interaktif"
description: "Platform undangan digital pernikahan modern berbasis SPA dengan fitur musik latar, sapaan tamu personal via URL parameter, konfirmasi kehadiran (RSVP), buku tamu real-time, dan Admin Dashboard."
date: "2023-07-15"
thumbnail: "/images/project-dashboard.png"
tags: ["React", "Vite", "Tailwind CSS", "Firebase"]
techStack:
  - category: "Frontend"
    items: ["React.js", "Vite", "TypeScript", "Tailwind CSS"]
  - category: "Ikon & UI"
    items: ["Lucide React", "CSS Animations", "React Hot Toast"]
  - category: "Backend & Database"
    items: ["Firebase Firestore"]
links:
  live: "https://undangan-dig-demo.vercel.app"
  github: "https://github.com/username/undangan-dig"
featured: true
---

## Ikhtisar

Platform undangan pernikahan digital interaktif yang dirancang khusus untuk pasangan pengantin modern. Mengusung konsep *single-page application* (SPA) dengan tata letak vertikal yang responsif, estetis, dan kaya fitur multimedia untuk menyampaikan momen spesial kepada para tamu undangan, serta dilengkapi **Admin Dashboard** komprehensif bagi mempelai untuk mengelola tamu dan RSVP secara real-time.

## Latar Belakang

Undangan cetak konvensional memiliki keterbatasan dalam hal jangkauan, biaya duplikasi, dan interaktivitas. Mempelai memerlukan solusi digital yang dapat disebarkan secara instan melalui tautan, menampilkan informasi acara secara mendetail, serta menampung doa, konfirmasi kehadiran (RSVP), dan manajemen data tamu secara terpusat.

## Masalah

- Bagaimana menyampaikan informasi pernikahan yang kompleks (akad, resepsi, peta lokasi, galeri, dan cerita cinta) dalam satu halaman seluler yang cepat dan ringan?
- Bagaimana memberikan sentuhan personal kepada setiap tamu undangan tanpa harus membuat desain atau teks terpisah untuk masing-masing orang?
- Bagaimana mempelai dapat memantau konfirmasi kehadiran (RSVP), mengelola daftar tamu, dan memoderasi ucapan doa dengan mudah tanpa memerlukan panel admin eksternal yang rumit?

## Solusi

Mengembangkan aplikasi berbasis React.js dan Vite dengan styling Tailwind CSS yang dioptimalkan untuk perangkat seluler. Fitur utama mencakup:
- **Personalized Guest Routing**: Parameter URL (`?to=NamaTamu`) untuk menyapa tamu secara otomatis pada halaman utama.
- **Background Audio**: Pemutaran musik latar romantis yang dapat dikontrol melalui tombol melayang di sudut layar.
- **Section Lengkap & Interaktif**: Cover sambutan, ayat suci (QS. Ar-Rum: 21), profil mempelai, jadwal acara akad & resepsi dengan tautan Google Maps langsung.
- **Timeline Cerita Cinta & Galeri Momen**: Dokumentasi perjalanan dari perkenalan hingga proses lamaran dalam bentuk timeline interaktif dan grid foto pre-wedding.
- **Wedding Gift (Cashless)**: Informasi rekening bank dan e-wallet lengkap dengan tombol salin otomatis (*copy to clipboard*).
- **Wishes & RSVP (Firebase Firestore)**: Integrasi database cloud real-time bagi tamu untuk mengirimkan ucapan doa dan status kehadiran.
- **Admin Dashboard & Management Panel**: Panel khusus mempelai yang dilindungi kunci rahasia (`?key=...`), mencakup:
  - **Manajemen Tamu**: Menambah nama tamu dan menghasilkan tautan personal instan dengan fitur salin cepat.
  - **RSVP & Kehadiran Tracker**: Memantau status konfirmasi (Hadir / Tidak Hadir) lengkap dengan filter dan penghitungan statistik total.
  - **Moderasi Buku Tamu**: Meninjau dan menghapus ucapan atau doa yang masuk dari tamu.
  - **Tabel Interaktif (`AdminTable`)**: Dilengkapi pencarian real-time (*search*), paginasi 10 item per halaman, dan tampilan kartu responsif mobile dengan *skeleton loading*.

## Arsitektur

Aplikasi terbagi menjadi komponen modular (`Cover`, `Navbar`, `HeaderQuran`, `Couple`, `Event`, `Story`, `Gallery`, `Gift`, `WishesRSVP`, `Admin`, `AdminTable`) dengan state management lokal React dan integrasi SDK Firebase untuk penyimpanan data interaktif secara real-time.

## Pelajaran yang Dipetik

- Penanganan kebijakan *autoplay audio* pada browser seluler memerlukan interaksi pengguna eksplisit melalui tombol "Open Invitation".
- Penggunaan Tailwind CSS mempercepat proses styling komponen mobile-first dengan transisi animasi yang mulus.
- Firebase Firestore memberikan kemudahan sinkronisasi data ucapan dan RSVP tanpa memerlukan manajemen server tambahan.
- Implementasi tabel admin kustom dengan pencarian dan paginasi meningkatkan pengalaman pengelola undangan dalam memantau ribuan data tamu.
