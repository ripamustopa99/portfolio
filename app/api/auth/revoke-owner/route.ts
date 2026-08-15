// app/api/auth/revoke-owner/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PORTFOLIO_OWNER_COOKIE } from "@/lib/analytics";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set(PORTFOLIO_OWNER_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Owner status revoked." });
  } catch (error) {
    console.error("Revoke owner error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
