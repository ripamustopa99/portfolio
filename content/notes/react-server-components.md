---
title: "Why I Migrated to React Server Components"
description: "Lessons learned from migrating a Next.js Pages Router app to App Router with RSC architecture."
date: "2024-02-10"
tags: ["React", "Next.js", "Architecture"]
---

After six months with Next.js App Router, here are my concrete findings on React Server Components.

## The Decision Context

Our dashboard was experiencing hydration bottlenecks. Initial bundle size was 340KB.

## What Improved

- First Contentful Paint: 1.2s → 0.4s
- JavaScript bundle: 340KB → 85KB
- Time to Interactive: 2.8s → 1.1s

## What Complicated

- Client component boundaries require discipline
- Third-party library compatibility is still evolving
- Debugging server/client boundaries needs better tooling

## Verdict

Worth it for content-heavy applications. Avoid for highly interactive SPAs without clear server/client separation.
