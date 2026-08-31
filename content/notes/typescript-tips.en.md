---
title: "TypeScript Patterns I Use Every Day"
description: "Practical TypeScript patterns for safer, more maintainable code."
date: "2024-01-05"
tags: ["TypeScript", "DX"]
---

## Uncompromising Strict Mode

`strict: true` inside tsconfig.json catches 40% of bugs at compile time.

## Discriminated Unions

```typescript
type Result =
  | { status: "success"; data: User }
  | { status: "error"; error: string };
```
