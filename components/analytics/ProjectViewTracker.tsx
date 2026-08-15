// components/analytics/ProjectViewTracker.tsx
"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track-client";

export default function ProjectViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent("project_view", slug);
  }, [slug]);

  return null;
}
