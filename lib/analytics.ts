// lib/analytics.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const PORTFOLIO_OWNER_COOKIE = "portfolio_owner";
export const VISITOR_COOKIE_NAME = "visitor_id";

export async function isOwner(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(PORTFOLIO_OWNER_COOKIE)?.value === "true";
  } catch {
    return false;
  }
}

export async function getAnalyticsStats() {
  try {
    const [
      totalPageViews,
      uniqueVisitorsResult,
      resumeDownloads,
      projectViews,
      projectDemoClicks,
      projectGithubClicks,
      contactClicks,
      recentEvents,
    ] = await Promise.all([
      // Total Page Views
      prisma.analyticsEvent.count({
        where: { eventType: "page_view" },
      }),
      // Unique Visitors (distinct visitorId count)
      prisma.analyticsEvent.findMany({
        select: { visitorId: true },
        distinct: ["visitorId"],
        where: { visitorId: { not: null } },
      }),
      // Resume Downloads
      prisma.analyticsEvent.count({
        where: { eventType: "resume_download" },
      }),
      // Project Details Views
      prisma.analyticsEvent.groupBy({
        by: ["target"],
        where: { eventType: "project_view", target: { not: null } },
        _count: { _all: true },
      }),
      // Project Demo Clicks
      prisma.analyticsEvent.groupBy({
        by: ["target"],
        where: { eventType: "project_demo_click", target: { not: null } },
        _count: { _all: true },
      }),
      // Project GitHub Clicks
      prisma.analyticsEvent.groupBy({
        by: ["target"],
        where: { eventType: "project_github_click", target: { not: null } },
        _count: { _all: true },
      }),
      // Contact Clicks
      prisma.analyticsEvent.groupBy({
        by: ["target"],
        where: { eventType: "contact_click", target: { not: null } },
        _count: { _all: true },
      }),
      // Recent events
      prisma.analyticsEvent.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    return {
      totalPageViews,
      uniqueVisitors: uniqueVisitorsResult.length,
      resumeDownloads,
      projectViews,
      projectDemoClicks,
      projectGithubClicks,
      contactClicks,
      recentEvents,
    };
  } catch {
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      resumeDownloads: 0,
      projectViews: [],
      projectDemoClicks: [],
      projectGithubClicks: [],
      contactClicks: [],
      recentEvents: [],
    };
  }
}
