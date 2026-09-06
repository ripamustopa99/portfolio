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
      webVitalsEvents,
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
      // Web Vitals events
      prisma.analyticsEvent.findMany({
        where: { eventType: "web_vital" },
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
    ]);

    // Process Web Vitals averages
    const vitalsMap: Record<string, { total: number; count: number; ratings: Record<string, number> }> = {};
    for (const ev of webVitalsEvents) {
      if (!ev.target) continue;
      try {
        const parsed = JSON.parse(ev.target);
        const { name, value, rating } = parsed;
        if (!name) continue;
        if (!vitalsMap[name]) {
          vitalsMap[name] = { total: 0, count: 0, ratings: { good: 0, "needs-improvement": 0, poor: 0 } };
        }
        vitalsMap[name].total += Number(value) || 0;
        vitalsMap[name].count += 1;
        if (rating && vitalsMap[name].ratings[rating] !== undefined) {
          vitalsMap[name].ratings[rating] += 1;
        }
      } catch {
        // ignore parse error
      }
    }

    const webVitalsSummary = Object.entries(vitalsMap).map(([name, data]) => ({
      name,
      average: Math.round(data.total / data.count),
      count: data.count,
      ratings: data.ratings,
    }));

    return {
      totalPageViews,
      uniqueVisitors: uniqueVisitorsResult.length,
      resumeDownloads,
      projectViews,
      projectDemoClicks,
      projectGithubClicks,
      contactClicks,
      recentEvents,
      webVitalsSummary,
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
      webVitalsSummary: [],
    };
  }
}

export async function getVisitorActivityLogs() {
  try {
    const events = await prisma.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const visitorMap = new Map<
      string,
      {
        visitorId: string;
        ipAddress: string | null;
        lastActive: Date;
        events: typeof events;
      }
    >();

    for (const ev of events) {
      const vId = ev.visitorId || "unknown";
      if (!visitorMap.has(vId)) {
        visitorMap.set(vId, {
          visitorId: vId,
          ipAddress: ev.ipAddress,
          lastActive: ev.createdAt,
          events: [],
        });
      }
      visitorMap.get(vId)!.events.push(ev);
    }

    return Array.from(visitorMap.values());
  } catch {
    return [];
  }
}

export async function getPaginatedVisitorLogs({
  page = 1,
  pageSize = 10,
  search = "",
  eventType = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  eventType?: string;
}) {
  try {
    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { visitorId: { contains: search, mode: "insensitive" } },
        { ipAddress: { contains: search, mode: "insensitive" } },
      ];
    }
    if (eventType) {
      where.eventType = eventType;
    }

    const events = await prisma.analyticsEvent.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const visitorMap = new Map<
      string,
      {
        visitorId: string;
        ipAddress: string | null;
        lastActive: Date;
        events: typeof events;
      }
    >();

    for (const ev of events) {
      const vId = ev.visitorId || "unknown";
      if (!visitorMap.has(vId)) {
        visitorMap.set(vId, {
          visitorId: vId,
          ipAddress: ev.ipAddress,
          lastActive: ev.createdAt,
          events: [],
        });
      }
      visitorMap.get(vId)!.events.push(ev);
    }

    const allVisitors = Array.from(visitorMap.values());
    const totalVisitors = allVisitors.length;
    const totalPages = Math.ceil(totalVisitors / pageSize);
    const paginatedVisitors = allVisitors.slice((page - 1) * pageSize, page * pageSize);

    return {
      visitors: paginatedVisitors,
      totalCount: totalVisitors,
      totalPages,
      currentPage: page,
      pageSize,
    };
  } catch {
    return {
      visitors: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize,
    };
  }
}
