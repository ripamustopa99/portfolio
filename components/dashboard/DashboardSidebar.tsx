// components/dashboard/DashboardSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, BarChart3, FolderKanban, FileText, ArrowLeft, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

interface DashboardSidebarProps {
  userEmail: string;
}

export default function DashboardSidebar({ userEmail }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Load collapse state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("dashboard_sidebar_collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("dashboard_sidebar_collapsed", String(next));
  };

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: BarChart3 },
    { href: "/dashboard/projects", label: "Manage Projects", icon: FolderKanban },
    { href: "/dashboard/notes", label: "Manage Notes", icon: FileText },
  ];

  return (
    <>
      {/* Mobile Top Header bar with Toggle on the Left */}
      <div className="md:hidden bg-[#09090b] border-b border-border p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-none bg-surface border border-border text-foreground hover:text-accent hover:border-accent transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Shield size={16} />
            </div>
            <div>
              <div className="text-[10px] font-mono text-accent uppercase tracking-wider">Admin Panel</div>
              <div className="text-xs font-bold text-foreground">Dashboard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop Overlay (Click outside to close) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar: Slide-over drawer on mobile (w-72), sticky sidebar on desktop (balanced width md:w-84) */}
      <aside
        className={`bg-[#09090b] md:bg-surface border-r border-border p-4 sm:p-6 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out md:h-screen md:sticky md:top-0 z-50 ${
          isCollapsed ? "md:w-20 md:p-3" : "md:w-84"
        } w-72 md:w-auto fixed md:relative inset-y-0 left-0 ${
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Top Header */}
          <div className={`flex items-center justify-between pb-6 border-b border-border overflow-hidden`}>
            <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "md:justify-center md:w-full" : ""}`}>
              <div className="w-10 h-10 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <Shield size={20} />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                  isCollapsed ? "md:opacity-0 md:w-0" : "md:opacity-100 md:w-auto"
                }`}
              >
                <div className="text-xs font-mono text-accent uppercase tracking-wider">Admin Panel</div>
                <div className="text-sm font-bold text-foreground">Dashboard</div>
              </div>
            </div>

            {/* Mobile Close Button inside drawer */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 rounded-none bg-surface border border-border text-foreground-muted hover:text-foreground"
              aria-label="Close Menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  title={item.label}
                  className={`relative flex items-center gap-3 py-3 px-4 rounded-none text-xs font-mono transition-all duration-200 ${
                    isCollapsed
                      ? "md:w-full md:mx-0 md:px-0 md:justify-center"
                      : "w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] -mx-4 sm:-mx-6 pl-6 sm:pl-8 pr-4 sm:pr-6"
                  } ${
                    isActive
                      ? "text-blue-400 font-semibold bg-blue-500/10 shadow-xs"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface/30"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 inset-y-0 w-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-30" />
                  )}
                  <Icon size={18} className={`shrink-0 ${isActive ? "text-blue-400" : "text-foreground-muted"}`} />
                  <span
                    className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                      isCollapsed ? "md:opacity-0 md:w-0" : "md:opacity-100 md:w-auto"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Footer Actions (Collapse Toggle, View Website & Logout) */}
        <div className="pt-6 border-t border-border space-y-3">
          {/* Desktop Collapse Button */}
          <button
            onClick={toggleCollapse}
            className={`hidden md:flex items-center gap-2 w-full px-3 py-2.5 rounded-none text-xs font-mono text-foreground-muted hover:text-accent hover:border-accent transition-colors border border-border bg-surface/30 overflow-hidden ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span
              className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                isCollapsed ? "md:opacity-0 md:w-0" : "md:opacity-100 md:w-auto"
              }`}
            >
              Collapse
            </span>
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            title="View Website"
            className={`relative flex items-center gap-2 py-2.5 rounded-none text-xs font-mono text-foreground-muted hover:text-foreground transition-colors border border-border bg-background/50 overflow-hidden ${
              isCollapsed
                ? "md:w-full md:mx-0 md:px-0 md:justify-center"
                : "w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] -mx-4 sm:-mx-6 pl-6 sm:pl-8 pr-4 sm:pr-6"
            }`}
          >
            <ArrowLeft size={16} className="shrink-0" />
            <span
              className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
                isCollapsed ? "md:opacity-0 md:w-0" : "md:opacity-100 md:w-auto"
              }`}
            >
              View Website
            </span>
          </Link>
          <div className="w-full">
            <LogoutButton isCollapsed={isCollapsed} />
          </div>
        </div>
      </aside>
    </>
  );
}
