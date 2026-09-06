// components/analytics/WebVitalsReporter.tsx
"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    try {
      const data = JSON.stringify({
        eventType: "web_vital",
        target: JSON.stringify({
          name: metric.name,
          value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
        }),
      });

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
      // Ignore web vitals reporting errors
    }
  });

  return null;
}
