---
title: "Mengapa Saya Beralih ke React Server Components"
description: "Pelajaran yang dipetik saat memigrasikan aplikasi Next.js Pages Router ke App Router dengan arsitektur RSC."
date: "2024-02-10"
tags: ["React", "Next.js", "Arsitektur"]
---

Setelah enam bulan menggunakan Next.js App Router, berikut adalah temuan konkret saya mengenai React Server Components.

## Konteks Keputusan

Dashboard kami mengalami hambatan hidrasi (hydration bottlenecks). Ukuran bundle awal mencapai 340KB.

## Hal yang Meningkat

- First Contentful Paint: 1.2s → 0.4s
- Bundle JavaScript: 340KB → 85KB
- Time to Interactive: 2.8s → 1.1s

## Hal yang Menjadi Kompleks

- Batasan komponen klien (client component boundaries) memerlukan kedisiplinan
- Kompatibilitas pustaka pihak ketiga masih terus berkembang
- Debugging batasan server/klien memerlukan perangkat yang lebih baik

## Kesimpulan

Sangat layak untuk aplikasi yang padat konten. Hindari untuk SPA yang sangat interaktif tanpa pemisahan server/klien yang jelas.
