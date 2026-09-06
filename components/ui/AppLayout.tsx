// components/ui/AppLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import WebVitalsReporter from "@/components/analytics/WebVitalsReporter";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExcludedPage = 
    pathname === "/login" || 
    pathname?.startsWith("/login/") || 
    pathname === "/dashboard" || 
    pathname?.startsWith("/dashboard/");

  return (
    <>
      <AnalyticsTracker />
      <WebVitalsReporter />
      {!isExcludedPage && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isExcludedPage && <Footer />}
    </>
  );
}
