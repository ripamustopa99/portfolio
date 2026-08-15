// app/api/auth/logout/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { invalidateSession, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    await invalidateSession(rawToken);

    cookieStore.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
