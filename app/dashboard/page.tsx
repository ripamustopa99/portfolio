// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAnalyticsStats, getVisitorActivityLogs, isOwner } from "@/lib/analytics";
import OwnerStatusToggle from "@/components/auth/OwnerStatusToggle";
import OwnerWelcomeModal from "@/components/auth/OwnerWelcomeModal";
import Link from "next/link";
import { User, Clock, Terminal, BarChart3, Users, Eye, Download, ExternalLink, Code2, ArrowRight } from "lucide-react";

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
            Welcome back, {user.email}. Monitor real-time visitor metrics, project engagement, and owner device exclusion settings.
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
        <div className="bg-surface/30 border border-border rounded-none p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <Users size={16} className="text-accent" />
              <span>Visitor Activity & Action Timeline (Recent)</span>
            </h3>
            <Link
              href="/dashboard/visitors"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline"
            >
              <span>View All Visitors</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          {visitorLogs.length === 0 ? (
            <p className="text-xs text-foreground-subtle py-8 text-center font-mono">No visitor activity recorded yet.</p>
          ) : (
            <div className="space-y-4 pr-2">
              {visitorLogs.slice(0, 3).map((visitor: { visitorId: string; ipAddress: string | null; lastActive: Date; events: Array<{ id: string; eventType: string; target: string | null; createdAt: Date }> }, idx: number) => (
                <div key={visitor.visitorId} className="p-4 rounded-none bg-background/50 border border-border space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent font-bold">
                        Visitor #{idx + 1}
                      </span>
                      <span className="text-foreground-muted text-[11px] truncate max-w-[180px]">
                        ID: {visitor.visitorId.slice(0, 12)}...
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
                      {visitor.events.slice(0, 3).map((ev) => (
                        <div key={ev.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-none bg-surface/40 border border-border text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            <span className="text-foreground font-medium uppercase text-[11px]">
                              {ev.eventType.replace(/_/g, " ")}
                            </span>
                            {ev.target && (
                              <span className="text-foreground-muted truncate max-w-[250px]">
                                → {ev.target}
                              </span>
                            )}
                          </div>
                          <span className="text-foreground-subtle text-[11px] shrink-0">
                            {new Date(ev.createdAt).toLocaleTimeString()} ({new Date(ev.createdAt).toLocaleDateString()})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Owner Status Toggle Card */}
        <div>
          <OwnerStatusToggle initialIsOwner={ownerStatus} />
        </div>

        {/* User Info & Security Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface/30 border border-border rounded-none p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <User size={16} className="text-accent" />
              <span>Account Information</span>
            </h3>
            <div className="space-y-2">
              <div className="text-xs text-foreground-muted">Email Address</div>
              <div className="text-sm font-medium text-foreground font-mono bg-background/50 p-3 rounded-none border border-border truncate">
                {user.email}
              </div>
            </div>
          </div>

          <div className="bg-surface/30 border border-border rounded-none p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <span>Security Metadata</span>
            </h3>
            <div className="space-y-2">
              <div className="text-xs text-foreground-muted">Account Created</div>
              <div className="text-xs font-mono text-foreground bg-background/50 p-3 rounded-none border border-border">
                {new Date(user.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Quick info footer */}
        <div className="p-3 sm:p-4 rounded-none bg-surface/20 border border-border flex items-center gap-3 text-xs text-foreground-muted font-mono">
          <Terminal size={16} className="text-accent shrink-0" />
          <span>Analytics engine active. Owner visits are automatically filtered out.</span>
        </div>
      </div>
  );
}
