// lib/track-client.ts
export async function trackEvent(eventType: string, target?: string) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType, target }),
    });
  } catch {
    // Ignore tracking errors
  }
}
