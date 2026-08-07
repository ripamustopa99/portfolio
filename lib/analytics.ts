// lib/analytics.ts
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>
) {
  try {
    if (typeof window !== "undefined" && (window as any).cfBeacon) {
      // Cloudflare Web Analytics custom event tracking
      (window as any).cfBeacon.track(name, properties);
    }
  } catch (error) {
    console.error("Analytics error:", error);
  }
}
