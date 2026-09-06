// app/api/auth/set-owner/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PORTFOLIO_OWNER_COOKIE, VISITOR_COOKIE_NAME } from "@/lib/analytics";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Get visitor ID before setting owner cookie
    const visitorId = cookieStore.get(VISITOR_COOKIE_NAME)?.value;

    if (visitorId) {
      // Delete any previous events tracked for this visitor/owner device
      await prisma.analyticsEvent.deleteMany({
        where: { visitorId },
      }).catch(() => {});
    }

    cookieStore.set(PORTFOLIO_OWNER_COOKIE, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Owner status activated and previous visitor events cleaned up." });
  } catch (error) {
    console.error("Set owner error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
