---
title: "Why I Switched to React Server Components"
description: "Lessons learned while migrating a Next.js Pages Router application to App Router with RSC architecture."
date: "2024-02-10"
tags: ["React", "Next.js", "Architecture"]
---

After six months using the Next.js App Router, here are my concrete findings regarding React Server Components.

## Decision Context

Our dashboard suffered from hydration bottlenecks. Initial bundle size reached 340KB.

## Improvements

- First Contentful Paint: 1.2s → 0.4s
- JavaScript Bundle: 340KB → 85KB
- Time to Interactive: 2.8s → 1.1s

## What Became Complex

- Client component boundaries require discipline
- Third-party library compatibility is still evolving
- Debugging server/client boundaries requires better tooling

## Conclusion

Well worth it for content-heavy applications. Avoid for highly interactive SPAs without clear server/client separation.
