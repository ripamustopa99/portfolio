// app/api/auth/set-owner/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PORTFOLIO_OWNER_COOKIE } from "@/lib/analytics";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(PORTFOLIO_OWNER_COOKIE, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Owner status activated." });
  } catch (error) {
    console.error("Set owner error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
