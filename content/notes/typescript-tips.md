---
title: "Pola TypeScript yang Saya Gunakan Setiap Hari"
description: "Pola TypeScript praktis untuk kode yang lebih aman dan mudah dipelihara."
date: "2024-01-05"
tags: ["TypeScript", "DX"]
---

## Mode Ketat Tanpa Kompromi

`strict: true` di dalam tsconfig.json mendeteksi 40% bug pada saat waktu kompilasi.

## Discriminated Unions

```typescript
type Result =
  | { status: "success"; data: User }
  | { status: "error"; error: string };
```
