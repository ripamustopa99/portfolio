---
title: "Sistem Manajemen & Absensi Sekolah Digital"
description: "Platform manajemen akademik dan pencatatan kehadiran real-time untuk guru dan siswa, dilengkapi manajemen jadwal, rekapitulasi kehadiran, serta ekspor laporan."
date: "2024-02-10"
thumbnail: "/images/project-dashboard.png"
tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"]
techStack:
  - category: "Frontend"
    items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS"]
  - category: "Backend & Database"
    items: ["Next.js API Routes", "PostgreSQL", "Prisma ORM"]
  - category: "Manajemen & UI"
    items: ["Lucide React", "Chart.js / Analytics Charts"]
links:
  live: "https://absensi-sekolah-demo.vercel.app"
  github: "https://github.com/username/absensi-sekolah"
featured: true
---

## Ikhtisar

Platform manajemen akademik dan pencatatan kehadiran digital yang dirancang untuk instansi sekolah (tingkat MTs/MA dan sederajat). Sistem ini mengintegrasikan absensi harian siswa dan guru, pengelolaan jadwal pelajaran, manajemen data siswa (kenaikan kelas dan kelulusan), serta analitik rekapitulasi kehadiran secara real-time.

## Latar Belakang

Pencatatan absensi konvensional menggunakan kertas atau spreadsheet sering kali memakan waktu, rentan terhadap manipulasi, dan menyulitkan rekapitulasi bulanan bagi pihak sekolah dan wali kelas. Pihak manajemen sekolah membutuhkan sistem terpusat yang aman, cepat, dan mudah diakses oleh guru maupun administrator.

## Masalah

- Bagaimana mendigitalkan proses pencatatan kehadiran siswa dan guru secara real-time di setiap jam pelajaran tanpa membebani tenaga pengajar?
- Bagaimana mengelola siklus akademik siswa (kenaikan kelas, kelulusan, mutasi, dan impor data massal) dengan akurat?
- Bagaimana menyajikan laporan rekapitulasi dan analitik kehadiran yang transparan bagi admin sekolah?

## Solusi

Mengembangkan aplikasi web berbasis Next.js App Router dengan PostgreSQL dan Prisma ORM. Fitur utama mencakup:
- **Manajemen Multi-Role (Admin & Guru)**: Hak akses bertingkat untuk konfigurasi sistem oleh Admin dan pencatatan absensi harian oleh Guru.
- **Absensi Siswa & Guru Real-Time**: Pencatatan kehadiran berdasarkan jadwal mengajar dengan status (Hadir, Sakit, Izin, Alpa, Telat) per mata pelajaran.
- **Manajemen Akademik & Siswa**: Fitur impor data siswa, manajemen kenaikan kelas otomatis, kelulusan, dan mutasi siswa.
- **Penjadwalan & Mata Pelajaran**: Pengaturan jadwal mengajar guru utama dan pengganti, serta manajemen mata pelajaran per tingkat.
- **Analitik & Rekapitulasi Laporan**: Grafik tren kehadiran, performa kedisiplinan kelas, serta fitur ekspor laporan rekapitulasi.
- **Pengumuman & Notifikasi**: Pusat informasi pengumuman internal sekolah dan sistem notifikasi bagi pengguna.

## Arsitektur

Aplikasi menggunakan arsitektur modular berbasis Next.js App Router dengan pemisahan layer antara Server Actions / API Routes, Prisma Client, dan komponen antarmuka yang responsif (`Admin`, `Guru`, `Shared` components).

## Pelajaran yang Dipetik

- Penggunaan Prisma ORM dengan PostgreSQL sangat mempercepat pemodelan relasi kompleks (seperti relasi siswa, jadwal, guru, dan rekapitulasi absensi).
- Validasi data ketat pada sisi server mencegah inkonsistensi status absensi ganda pada jadwal yang sama.
- Desain antarmuka modular mempercepat pengembangan fitur-fitur administratif yang padat data.
