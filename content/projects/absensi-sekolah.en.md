---
title: "Digital School Attendance & Management System"
description: "Academic management and real-time attendance recording platform for teachers and students, featuring schedule management, attendance recapitulation, and report exporting."
date: "2024-02-10"
thumbnail: "/images/project-dashboard.png"
tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"]
techStack:
  - category: "Frontend"
    items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS"]
  - category: "Backend & Database"
    items: ["Next.js API Routes", "PostgreSQL", "Prisma ORM"]
  - category: "Management & UI"
    items: ["Lucide React", "Chart.js / Analytics Charts"]
links:
  live: "https://absensi-sekolah-demo.vercel.app"
  github: "https://github.com/username/absensi-sekolah"
featured: true
---

## Overview

An academic management and digital attendance platform designed for educational institutions. This system integrates student and teacher daily attendance, class schedule management, student lifecycle management (grade promotion and graduation), and real-time attendance analytics.

## Background

Conventional paper or spreadsheet-based attendance recording is often time-consuming, prone to tampering, and complicates monthly recapitulation for school staff and head teachers. School management needed a centralized system that is secure, fast, and easily accessible by teachers and administrators.

## The Challenge

- How to digitize student and teacher attendance recording in real-time per class session without burdening teaching staff?
- How to accurately manage student academic lifecycles (grade promotion, graduation, student transfer, and bulk data import)?
- How to provide transparent attendance recapitulation and analytics reports for school administrators?

## Solution

Developed a web application using Next.js App Router with PostgreSQL and Prisma ORM. Key features include:
- **Multi-Role Management (Admin & Teacher)**: Hierarchical access control for system configuration by Admins and daily attendance recording by Teachers.
- **Real-Time Student & Teacher Attendance**: Attendance recording based on teaching schedules with statuses (Present, Sick, Permitted, Absent, Late) per subject.
- **Academic & Student Management**: Student data import features, automated grade promotion management, graduation, and transfers.
- **Scheduling & Subjects**: Configuration of main and substitute teacher schedules, and subject management per grade level.
- **Analytics & Report Recapitulation**: Attendance trend charts, class discipline performance, and report export features.
- **Announcements & Notifications**: Internal school announcement center and notification system for users.

## Architecture

The application uses a modular architecture built on Next.js App Router with a clear separation of layers between Server Actions / API Routes, Prisma Client, and responsive UI components (`Admin`, `Guru`, `Shared` components).

## Lessons Learned

- Using Prisma ORM with PostgreSQL significantly accelerated complex relational modeling (such as relationships between students, schedules, teachers, and attendance summaries).
- Strict server-side data validation prevented duplicate attendance status inconsistencies on the same schedule.
- Modular UI design accelerated the development of data-dense administrative features.
