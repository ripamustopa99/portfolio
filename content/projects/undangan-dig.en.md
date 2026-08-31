---
title: "Interactive Digital Wedding Invitation"
description: "Modern web-based digital wedding invitation platform featuring background music, personalized guest greeting via URL parameters, RSVP confirmation, real-time guest book, and Admin Dashboard."
date: "2023-07-15"
thumbnail: "/images/project-dashboard.png"
tags: ["React", "Vite", "Tailwind CSS", "Firebase"]
techStack:
  - category: "Frontend"
    items: ["React.js", "Vite", "TypeScript", "Tailwind CSS"]
  - category: "Icons & UI"
    items: ["Lucide React", "CSS Animations", "React Hot Toast"]
  - category: "Backend & Database"
    items: ["Firebase Firestore"]
links:
  live: "https://undangan-dig-demo.vercel.app"
  github: "https://github.com/username/undangan-dig"
featured: true
---

## Overview

An interactive digital wedding invitation platform tailored for modern couples. Built as a responsive single-page application (SPA) with a vertical layout, aesthetic design, and rich multimedia features to deliver special moments to guests elegantly and personally, complete with a comprehensive **Admin Dashboard** for the couple to manage guests and RSVPs in real-time.

## Background

Conventional paper invitations have limitations in reach, duplication costs, and interactivity. The couple needed a digital solution that can be instantly shared via links, display detailed event information, and centrally collect guest prayers, RSVP confirmations, and guest list management.

## The Challenge

- How to present complex wedding information (akad, reception, location maps, gallery, and love story) in a fast, lightweight mobile-first single page?
- How to provide a personalized touch to every guest without creating separate designs or texts for each person?
- How can the couple monitor attendance confirmations (RSVP), manage guest lists, and moderate wishes easily without requiring a complex external admin panel?

## Solution

Developed a React.js and Vite application styled with Tailwind CSS optimized for mobile devices. Key features include:
- **Personalized Guest Routing**: URL parameters (`?to=GuestName`) to automatically greet guests on the welcome screen.
- **Background Audio**: Romantic background music playback controllable via a floating corner button.
- **Comprehensive Interactive Sections**: Welcome cover, holy verse (QS. Ar-Rum: 21), couple profiles, akad & reception event schedules with direct Google Maps links.
- **Love Story Timeline & Moment Gallery**: Documentation of the journey from first meeting to engagement proposals via interactive timelines and pre-wedding photo grids.
- **Cashless Wedding Gift**: Bank account and e-wallet information complete with copy-to-clipboard buttons.
- **Wishes & RSVP (Firebase Firestore)**: Real-time cloud database integration for guests to submit wishes, prayers, and attendance status.
- **Admin Dashboard & Management Panel**: A dedicated couple management panel protected by a secret key (`?key=...`), featuring:
  - **Guest Management**: Add guest names and instantly generate personalized sharing links with quick copy.
  - **RSVP & Attendance Tracker**: Monitor attendance confirmation statuses (Attending / Not Attending) with filters and total statistics calculation.
  - **Guest Book Moderation**: Review and delete incoming wishes and prayers from guests.
  - **Interactive Table (`AdminTable`)**: Equipped with real-time search, 10 items per page pagination, and mobile responsive card views with skeleton loading.

## Architecture

The application is structured into modular components (`Cover`, `Navbar`, `HeaderQuran`, `Couple`, `Event`, `Story`, `Gallery`, `Gift`, `WishesRSVP`, `Admin`, `AdminTable`) using local React state management and Firebase SDK integration for real-time interactive data storage.

## Lessons Learned

- Handling mobile browser autoplay audio restrictions requires explicit user interaction via an "Open Invitation" button.
- Tailwind CSS significantly accelerates mobile-first component styling with smooth animation transitions.
- Firebase Firestore provides seamless synchronization of guest wishes and RSVP data without requiring custom server maintenance.
- Implementing a custom admin table with search and pagination significantly improved the invitation manager's experience in tracking thousands of guest records.
