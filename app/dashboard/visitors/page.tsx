// app/dashboard/visitors/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getPaginatedVisitorLogs } from "@/lib/analytics";
import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { VisitorActivityCard } from "@/components/ui/VisitorActivityCard";
import VisitorFilterBar from "@/components/dashboard/VisitorFilterBar";

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

      {/* Search & Auto Filter Bar */}
      <VisitorFilterBar initialSearch={search} initialEventType={eventType} />

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
