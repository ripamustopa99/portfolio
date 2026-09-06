// lib/track-client.ts
export function trackEvent(eventType: string, target?: string) {
  try {
    const data = JSON.stringify({ eventType, target });
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
}
