// components/dashboard/DashboardTopbar.tsx
"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Shield, Menu, X } from "lucide-react";
import { useDashboard } from "./DashboardContext";

interface DashboardTopbarProps {
  userEmail: string;
}

export default function DashboardTopbar({ userEmail }: DashboardTopbarProps) {
  const pathname = usePathname();
  const { isMobileOpen, setIsMobileOpen } = useDashboard();

  const getBreadcrumbTitle = () => {
    if (!pathname) return "Overview";
    if (pathname.startsWith("/dashboard/projects")) return "Manage Projects";
    if (pathname.startsWith("/dashboard/notes")) return "Manage Notes";
    return "Overview";
  };

  const pageTitle = getBreadcrumbTitle();

  return (
    <header className="bg-surface/80 md:bg-surface/50 backdrop-blur-md border-b border-border px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
      {/* Left side: Mobile Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 rounded-none bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Breadcrumb / Active Path */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-foreground-muted hidden sm:inline">Dashboard</span>
          <ChevronRight size={12} className="text-foreground-muted hidden sm:inline" />
          <span className="text-foreground font-bold">{pageTitle}</span>
        </div>
      </div>

      {/* Right side: User email badge */}
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-none bg-background/50 border border-border text-xs font-mono">
        <Shield size={13} className="text-accent" />
        <span className="text-foreground-muted truncate max-w-[150px] sm:max-w-[200px]">{userEmail}</span>
      </div>
    </header>
  );
}
