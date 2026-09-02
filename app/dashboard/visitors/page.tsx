// app/dashboard/visitors/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getPaginatedVisitorLogs } from "@/lib/analytics";
import Link from "next/link";
import { Users, Search, Filter, ArrowLeft } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { VisitorActivityCard } from "@/components/ui/VisitorActivityCard";

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
    <div className="max-w-5xl mx-auto space-y-6">
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
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
          <Users size={16} className="text-accent" />
          <span>Visitor Logs & Timelines (Page {currentPage} of {totalPages || 1})</span>
        </h3>

        {visitors.length === 0 ? (
          <div className="bg-surface/30 border border-border p-8 text-center text-xs font-mono text-foreground-muted">
            No visitor activity found matching your criteria.
          </div>
        ) : (
          <div className="space-y-3">
            {visitors.map((visitor, idx) => {
              const visitorNumber = (currentPage - 1) * 10 + idx + 1;
              return (
                <VisitorActivityCard
                  key={visitor.visitorId}
                  visitor={visitor}
                  visitorNumber={visitorNumber}
                />
              );
            })}
          </div>
        )}

        {/* SERVER-SIDE PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          itemName="visitors"
          buildHref={(targetPage) => `/dashboard/visitors?page=${targetPage}${search ? `&search=${encodeURIComponent(search)}` : ""}${eventType ? `&eventType=${eventType}` : ""}`}
        />
      </div>
    </div>
  );
}
