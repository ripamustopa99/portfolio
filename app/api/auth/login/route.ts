// app/api/auth/login/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, SESSION_COOKIE_NAME } from "@/lib/auth";
import { checkRateLimit, recordFailedAttempt, clearRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() || "127.0.0.1" : "127.0.0.1";
    const rateKey = `login_ip_${ip}`;
    
    // Check if IP is currently blocked due to too many failed attempts
    const rateLimit = await checkRateLimit(rateKey, 5, 15 * 60 * 1000);
    if (rateLimit.blocked) {
      return NextResponse.json(
        { error: "Too many failed login attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Find admin user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      await recordFailedAttempt(rateKey, 5, 15 * 60 * 1000);
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      await recordFailedAttempt(rateKey, 5, 15 * 60 * 1000);
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Login successful: clear any previous failed attempt records for this IP
    await clearRateLimit(rateKey);

    // Get user agent & IP for session tracking
    const userAgent = request.headers.get("user-agent") || undefined;
    
    // Create session
    const { rawToken, expiresAt } = await createSession(user.id, userAgent, ip);

    // Set HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return NextResponse.json(
      { success: true, message: "Login successful." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
