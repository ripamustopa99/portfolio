// app/dashboard/visitors/loading.tsx
import { Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { VisitorSkeleton } from "@/components/ui/VisitorSkeleton";

export default function VisitorsLoading() {
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
            Complete chronological audit trail of visitor engagement, project views, downloads, and contact actions.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="bg-surface/30 border border-border p-4 flex flex-col sm:flex-row items-center gap-3 animate-pulse">
        <div className="flex-1 w-full h-9 bg-surface/50 rounded-none" />
        <div className="w-full sm:w-64 h-9 bg-surface/50 rounded-none" />
        <div className="w-full sm:w-20 h-9 bg-surface/60 rounded-none" />
      </div>

      {/* Visitors List Skeleton */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
          <Users size={16} className="text-accent" />
          <span>Visitor Logs & Timelines</span>
        </h3>

        <VisitorSkeleton count={5} />
      </div>
    </div>
  );
}
