---
title: "Platform API E-Commerce"
description: "REST API berkinerja tinggi yang menangani 10K+ RPM untuk inventaris, pesanan, dan pemrosesan pembayaran."
date: "2024-01-20"
thumbnail: "/images/project-api.png"
tags: ["API", "Backend", "E-Commerce"]
techStack:
  - category: "Runtime"
    items: ["Node.js", "Express"]
  - category: "Database"
    items: ["PostgreSQL", "Redis"]
  - category: "Infrastruktur"
    items: ["Docker", "AWS ECS"]
links:
  github: "https://github.com"
featured: true
---

## Ikhtisar

Platform API e-commerce yang dapat diskala, dirancang untuk menangani manajemen inventaris dan pesanan dengan throughput tinggi.

## Latar Belakang

Sistem lama sering mengalami timeout selama periode penjualan puncak (peak sales).

## Masalah

Monolit yang ada tidak dapat diskala secara horizontal dan memiliki jendela deployment selama 15 menit.

## Solusi

Beralih ke arsitektur berorientasi layanan dengan pola database per layanan.

## Pelajaran yang Dipetik

- Koneksi database pooling sangat krusial di bawah beban berat
- Caching Redis mengurangi waktu respons hingga 70%
- Strategi versioning API mencegah perubahan yang merusak (*breaking changes*)
