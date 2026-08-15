// lib/rate-limit.ts
import { prisma } from "@/lib/prisma";

export async function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000
): Promise<{ blocked: boolean; resetInMs: number }> {
  const now = new Date();
  const nowMs = now.getTime();
  void windowMs;

  // Clean up expired records
  try {
    await prisma.rateLimit.deleteMany({
      where: { resetTime: { lt: now } },
    });
  } catch {
    // Ignore cleanup errors
  }

  const existing = await prisma.rateLimit.findUnique({
    where: { key },
  });

  if (!existing || existing.resetTime.getTime() < nowMs) {
    return { blocked: false, resetInMs: 0 };
  }

  if (existing.count >= limit) {
    return {
      blocked: true,
      resetInMs: existing.resetTime.getTime() - nowMs,
    };
  }

  return { blocked: false, resetInMs: 0 };
}

export async function recordFailedAttempt(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000
): Promise<void> {
  const now = new Date();
  const nowMs = now.getTime();
  const resetTime = new Date(nowMs + windowMs);
  void limit;

  const existing = await prisma.rateLimit.findUnique({
    where: { key },
  });

  if (!existing || existing.resetTime.getTime() < nowMs) {
    await prisma.rateLimit.upsert({
      where: { key },
      update: { count: 1, resetTime },
      create: { key, count: 1, resetTime },
    });
  } else {
    await prisma.rateLimit.update({
      where: { key },
      data: { count: { increment: 1 } },
    });
  }
}

export async function clearRateLimit(key: string): Promise<void> {
  try {
    await prisma.rateLimit.delete({
      where: { key },
    });
  } catch {
    // Record might not exist
  }
}
