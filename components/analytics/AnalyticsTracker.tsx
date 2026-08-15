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

    const trackPageView = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventType: "page_view", target: pathname }),
        });
      } catch {
        // Ignore tracking errors
      }
    };

    trackPageView();
  }, [pathname]);

  return null;
}
