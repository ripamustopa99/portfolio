// app/api/analytics/track/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PORTFOLIO_OWNER_COOKIE, VISITOR_COOKIE_NAME } from "@/lib/analytics";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    // STRICT ZERO TRACKING FOR OWNER
    const isOwner = cookieStore.get(PORTFOLIO_OWNER_COOKIE)?.value === "true";
    if (isOwner) {
      return NextResponse.json({ success: true, tracked: false, reason: "owner" });
    }

    const body = await request.json();
    const { eventType, target } = body;

    if (!eventType) {
      return NextResponse.json({ error: "Event type is required." }, { status: 400 });
    }

    // Manage visitor ID cookie
    let visitorId = cookieStore.get(VISITOR_COOKIE_NAME)?.value;
    if (!visitorId) {
      visitorId = crypto.randomBytes(16).toString("hex");
      cookieStore.set(VISITOR_COOKIE_NAME, visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60, // 1 year
        path: "/",
      });
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0]?.trim() || "127.0.0.1" : "127.0.0.1";

    // Deduplication standard for page views per visitor per calendar day
    if (eventType === "page_view") {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const existingToday = await prisma.analyticsEvent.findFirst({
        where: {
          eventType: "page_view",
          visitorId,
          createdAt: { gte: todayStart },
        },
      });

      if (existingToday) {
        return NextResponse.json({ success: true, tracked: false, reason: "deduplicated" });
      }
    }

    // Save analytics event
    await prisma.analyticsEvent.create({
      data: {
        eventType,
        target: target || null,
        visitorId,
        ipAddress,
      },
    });

    return NextResponse.json({ success: true, tracked: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
