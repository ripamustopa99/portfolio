// components/analytics/AnalyticsTracker.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking for admin dashboard or login pages
    if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/login")) {
      return;
    }

    const trackPageView = () => {
      try {
        const data = JSON.stringify({ eventType: "page_view", target: pathname });
        if (typeof navigator !== "undefined" && navigator.sendBeacon) {
          const blob = new Blob([data], { type: "application/json" });
          navigator.sendBeacon("/api/analytics/track", blob);
        } else {
          fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        // Ignore tracking errors
      }
    };

    // Defer tracking until browser is idle or after initial animations settle
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => trackPageView(), { timeout: 2000 });
      } else {
        const timer = setTimeout(trackPageView, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  return null;
}
