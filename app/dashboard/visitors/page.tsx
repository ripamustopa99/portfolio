// app/dashboard/visitors/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getPaginatedVisitorLogs } from "@/lib/analytics";
import Link from "next/link";
import { Users, Search, Filter, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Visitor Activity — Admin Dashboard",
  description: "Detailed chronological visitor activity logs and analytics timeline.",
};

export default async function VisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; eventType?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";
  const eventType = params.eventType || "";

  const { visitors, totalCount, totalPages, currentPage } = await getPaginatedVisitorLogs({
    page,
    pageSize: 10,
    search,
    eventType,
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground-muted hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Overview</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Visitor Activity Management</h1>
          <p className="text-xs font-mono text-foreground-muted mt-1">
            Complete chronological audit trail of visitor engagement, project views, downloads, and contact actions. ({totalCount} total visitors tracked)
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <form method="GET" className="bg-surface/30 border border-border p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by Visitor ID or IP Address..."
            className="w-full pl-9 pr-4 py-2 rounded-none bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div className="relative w-full sm:w-64">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
          <select
            name="eventType"
            defaultValue={eventType}
            aria-label="Filter by Action Type"
            className="w-full pl-9 pr-8 py-2 rounded-none bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none transition-colors cursor-pointer appearance-none"
          >
            <option value="">All Action Types</option>
            <option value="page_view">Page View</option>
            <option value="project_view">Project View</option>
            <option value="project_demo_click">Project Demo Click</option>
            <option value="project_github_click">Project GitHub Click</option>
            <option value="resume_download">Resume Download</option>
            <option value="contact_click">Contact Click</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-muted text-[10px]">▼</div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="submit"
            className="px-4 py-2 rounded-none bg-accent text-accent-foreground font-mono text-xs font-bold hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
          >
            Filter
          </button>
          {(search || eventType) && (
            <Link
              href="/dashboard/visitors"
              className="px-3 py-2 rounded-none bg-surface border border-border text-foreground-muted hover:text-foreground font-mono text-xs transition-colors text-center"
            >
              Reset
            </Link>
          )}
        </div>
      </form>

      {/* Visitors List */}
      <div className="bg-surface/30 border border-border rounded-none p-4 sm:p-6 space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
          <Users size={16} className="text-accent" />
          <span>Visitor Logs & Timelines (Page {currentPage} of {totalPages || 1})</span>
        </h3>

        {visitors.length === 0 ? (
          <p className="text-xs text-foreground-subtle py-12 text-center font-mono">No visitor activity found matching your criteria.</p>
        ) : (
          <div className="space-y-4">
            {visitors.map((visitor, idx) => {
              const visitorNumber = (currentPage - 1) * 10 + idx + 1;
              return (
                <div key={visitor.visitorId} className="p-4 rounded-none bg-background/50 border border-border space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent font-bold">
                        Visitor #{visitorNumber}
                      </span>
                      <span className="text-foreground-muted text-[11px] truncate max-w-[200px]">
                        ID: {visitor.visitorId}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground-muted text-[11px]">
                      <span>IP: {visitor.ipAddress || "Unknown"}</span>
                      <span>Last active: {new Date(visitor.lastActive).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted">Actions Timeline:</div>
                    <div className="space-y-1.5">
                      {visitor.events.map((ev) => (
                        <div key={ev.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-none bg-surface/40 border border-border text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span className="text-foreground font-medium uppercase text-[11px]">
                              {ev.eventType.replace(/_/g, " ")}
                            </span>
                            {ev.target && (
                              <span className="text-foreground-muted truncate max-w-[280px]">
                                → {ev.target}
                              </span>
                            )}
                          </div>
                          <span className="text-foreground-subtle text-[11px] shrink-0">
                            {new Date(ev.createdAt).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SERVER-SIDE PAGINATION: Only show when totalPages > 1 (i.e. more than 10 items) */}
        {totalPages > 1 && (
          <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-mono">
            <div className="text-foreground-muted">
              Showing page {currentPage} of {totalPages} ({totalCount} total visitors)
            </div>
            <div className="flex items-center gap-2">
              {currentPage > 1 ? (
                <Link
                  href={`/dashboard/visitors?page=${currentPage - 1}${search ? `&search=${encodeURIComponent(search)}` : ""}${eventType ? `&eventType=${eventType}` : ""}`}
                  className="px-3 py-1.5 rounded-none bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </Link>
              ) : (
                <span className="px-3 py-1.5 rounded-none bg-surface/50 border border-border/50 text-foreground-muted cursor-not-allowed flex items-center gap-1">
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </span>
              )}

              {currentPage < totalPages ? (
                <Link
                  href={`/dashboard/visitors?page=${currentPage + 1}${search ? `&search=${encodeURIComponent(search)}` : ""}${eventType ? `&eventType=${eventType}` : ""}`}
                  className="px-3 py-1.5 rounded-none bg-surface border border-border text-foreground hover:border-accent transition-colors flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </Link>
              ) : (
                <span className="px-3 py-1.5 rounded-none bg-surface/50 border border-border/50 text-foreground-muted cursor-not-allowed flex items-center gap-1">
                  <span>Next</span>
                  <ChevronRight size={14} />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
