// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAnalyticsStats, getVisitorActivityLogs, isOwner } from "@/lib/analytics";
import OwnerWelcomeModal from "@/components/auth/OwnerWelcomeModal";
import Link from "next/link";
import { Terminal, BarChart3, Users, Eye, Download, ExternalLink, Code2, ArrowRight, Zap } from "lucide-react";
import { VisitorActivityCard } from "@/components/ui/VisitorActivityCard";

export const metadata = {
  title: "Admin Dashboard — Portfolio",
  description: "Secure administrator dashboard and visitor analytics.",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const [stats, ownerStatus, visitorLogs] = await Promise.all([
    getAnalyticsStats(),
    isOwner(),
    getVisitorActivityLogs(),
  ]);

  const showWelcomeModal = params.welcome === "true" && !ownerStatus;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <OwnerWelcomeModal isOpen={showWelcomeModal} />

      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Secure Session Active</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-xs font-mono text-foreground-muted mt-1">
            Welcome back, {user.email}. Monitor real-time visitor metrics, project engagement, and real-user Web Vitals performance.
          </p>
        </div>
      </div>

        {/* Analytics Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface/40 border border-border rounded-none p-4 sm:p-5 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-foreground-muted">
              <span className="text-xs font-mono uppercase tracking-wider">Unique Visitors</span>
              <Users size={18} className="text-accent" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono">{stats.uniqueVisitors}</div>
            <p className="text-[11px] text-foreground-subtle">Distinct visitors tracked</p>
          </div>

          <div className="bg-surface/40 border border-border rounded-none p-4 sm:p-5 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-foreground-muted">
              <span className="text-xs font-mono uppercase tracking-wider">Page Views</span>
              <Eye size={18} className="text-accent" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono">{stats.totalPageViews}</div>
            <p className="text-[11px] text-foreground-subtle">Total public page visits</p>
          </div>

          <div className="bg-surface/40 border border-border rounded-none p-4 sm:p-5 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-foreground-muted">
              <span className="text-xs font-mono uppercase tracking-wider">Resume Downloads</span>
              <Download size={18} className="text-accent" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono">{stats.resumeDownloads}</div>
            <p className="text-[11px] text-foreground-subtle">CV download events</p>
          </div>

          <div className="bg-surface/40 border border-border rounded-none p-4 sm:p-5 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-foreground-muted">
              <span className="text-xs font-mono uppercase tracking-wider">Total Interactions</span>
              <BarChart3 size={18} className="text-accent" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
              {stats.projectViews.reduce((acc: number, p: { _count: { _all: number } }) => acc + p._count._all, 0) +
                stats.projectDemoClicks.reduce((acc: number, p: { _count: { _all: number } }) => acc + p._count._all, 0) +
                stats.projectGithubClicks.reduce((acc: number, p: { _count: { _all: number } }) => acc + p._count._all, 0) +
                stats.contactClicks.reduce((acc: number, c: { _count: { _all: number } }) => acc + c._count._all, 0)}
            </div>
            <p className="text-[11px] text-foreground-subtle">Clicks, views & actions</p>
          </div>
        </div>

        {/* Real-User Web Vitals Performance Section */}
        <div className="bg-surface/30 border border-border rounded-none p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <Zap size={16} className="text-accent shrink-0" />
              <span>Real-User Core Web Vitals (Performance Monitoring)</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 shrink-0">Live RUM Active</span>
          </div>

          {stats.webVitalsSummary.length === 0 ? (
            <p className="text-xs text-foreground-subtle py-6 text-center">
              No Web Vitals metrics recorded yet. Visit public pages to generate real-user performance data.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.webVitalsSummary.map((vital) => (
                <div key={vital.name} className="bg-background/50 border border-border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-foreground">{vital.name}</span>
                    <span className="font-mono text-xs text-accent">
                      {vital.name === "CLS" ? (vital.average / 1000).toFixed(3) : `${vital.average}ms`}
                    </span>
                  </div>
                  <div className="text-[11px] text-foreground-muted flex justify-between">
                    <span>Samples: {vital.count}</span>
                    <span className="text-emerald-400 font-mono">Good: {vital.ratings.good || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Breakdown & Contact Clicks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Project Stats */}
          <div className="bg-surface/30 border border-border rounded-none p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <Code2 size={16} className="text-accent" />
              <span>Project Engagement</span>
            </h3>
            {stats.projectViews.length === 0 && stats.projectDemoClicks.length === 0 ? (
              <p className="text-xs text-foreground-subtle py-6 text-center">No project interactions recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.projectViews.map((p: { target: string | null; _count: { _all: number } }) => (
                  <div key={p.target} className="flex items-center justify-between p-3 rounded-none bg-background/50 border border-border text-xs">
                    <span className="font-mono font-medium text-foreground truncate mr-2">{p.target}</span>
                    <div className="flex items-center gap-4 text-foreground-muted shrink-0">
                      <span>{p._count._all} views</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact & Action Clicks */}
          <div className="bg-surface/30 border border-border rounded-none p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <ExternalLink size={16} className="text-accent" />
              <span>Contact & Social Clicks</span>
            </h3>
            {stats.contactClicks.length === 0 ? (
              <p className="text-xs text-foreground-subtle py-6 text-center">No contact clicks recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.contactClicks.map((c: { target: string | null; _count: { _all: number } }) => (
                  <div key={c.target} className="flex items-center justify-between p-3 rounded-none bg-background/50 border border-border text-xs">
                    <span className="font-mono font-medium text-foreground truncate mr-2">{c.target}</span>
                    <span className="text-accent font-mono shrink-0">{c._count._all} clicks</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Visitor Activity Timeline Preview */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <Users size={16} className="text-accent shrink-0" />
              <span>Visitor Activity & Action Timeline (Recent)</span>
            </h3>
            <Link
              href="/dashboard/visitors"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline shrink-0"
            >
              <span>View All Visitors</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          {visitorLogs.length === 0 ? (
            <div className="bg-surface/30 border border-border p-8 text-center text-xs font-mono text-foreground-muted">
              No visitor activity recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {visitorLogs.slice(0, 3).map((visitor, idx) => (
                <VisitorActivityCard
                  key={visitor.visitorId}
                  visitor={visitor}
                  visitorNumber={idx + 1}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick info footer */}
        <div className="p-3 sm:p-4 rounded-none bg-surface/20 border border-border flex items-center gap-3 text-xs text-foreground-muted font-mono">
          <Terminal size={16} className="text-accent shrink-0" />
          <span>Analytics engine active. Owner visits are automatically filtered out.</span>
        </div>
      </div>
  );
}
