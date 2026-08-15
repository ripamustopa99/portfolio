// lib/auth.ts
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const SESSION_COOKIE_NAME = "session_token";
const SESSION_DURATION_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate secure random session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Hash session token for secure DB storage
export function hashSessionToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string, userAgent?: string, ipAddress?: string) {
  const rawToken = generateSessionToken();
  const tokenHash = hashSessionToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      id: tokenHash,
      userId,
      expiresAt,
      userAgent: userAgent || null,
      ipAddress: ipAddress || null,
    },
  });

  return { rawToken, expiresAt };
}

export async function invalidateSession(rawToken?: string) {
  if (!rawToken) {
    const cookieStore = await cookies();
    rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  }

  if (rawToken) {
    const tokenHash = hashSessionToken(rawToken);
    try {
      await prisma.session.delete({
        where: { id: tokenHash },
      });
    } catch {
      // Session might already be deleted
    }
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!rawToken) return null;

    const tokenHash = hashSessionToken(rawToken);

    const session = await prisma.session.findUnique({
      where: { id: tokenHash },
      include: { user: true },
    });

    if (!session) return null;

    // Check if session has expired
    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { id: tokenHash } }).catch(() => {});
      return null;
    }

    // Check if password was changed after session was created
    if (session.user.passwordChangedAt && session.createdAt < session.user.passwordChangedAt) {
      await prisma.session.delete({ where: { id: tokenHash } }).catch(() => {});
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}
