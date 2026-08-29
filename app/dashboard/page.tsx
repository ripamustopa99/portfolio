// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAnalyticsStats, isOwner } from "@/lib/analytics";
import LogoutButton from "@/components/auth/LogoutButton";
import OwnerStatusToggle from "@/components/auth/OwnerStatusToggle";
import OwnerWelcomeModal from "@/components/auth/OwnerWelcomeModal";
import { Shield, User, Clock, Terminal, ArrowLeft, BarChart3, Users, Eye, Download, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";

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
  const [stats, ownerStatus] = await Promise.all([
    getAnalyticsStats(),
    isOwner(),
  ]);

  const showWelcomeModal = params.welcome === "true" && !ownerStatus;

  return (
    <div className="min-h-screen bg-background py-16 px-4 relative">
      <OwnerWelcomeModal isOpen={showWelcomeModal} />

      <div className="container-custom max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted hover:text-accent transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>VIEW PORTFOLIO</span>
          </Link>
          <LogoutButton />
        </div>

        {/* Dashboard Header */}
        <div className="bg-surface/50 border border-border rounded-none p-8 backdrop-blur-md shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-sm">
              <Shield size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Secure Session Active</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin & Analytics Dashboard</h1>
            </div>
          </div>

          <p className="text-sm text-foreground-muted leading-relaxed">
            Welcome back, {user.email}. Monitor real-time visitor metrics, project engagement, and owner device exclusion settings.
          </p>
        </div>

        {/* Analytics Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface/40 border border-border rounded-none p-6 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-foreground-muted">
              <span className="text-xs font-mono uppercase tracking-wider">Unique Visitors</span>
              <Users size={18} className="text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground font-mono">{stats.uniqueVisitors}</div>
            <p className="text-[11px] text-foreground-subtle">Distinct visitors tracked</p>
          </div>

          <div className="bg-surface/40 border border-border rounded-none p-6 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-foreground-muted">
              <span className="text-xs font-mono uppercase tracking-wider">Page Views</span>
              <Eye size={18} className="text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground font-mono">{stats.totalPageViews}</div>
            <p className="text-[11px] text-foreground-subtle">Total public page visits</p>
          </div>

          <div className="bg-surface/40 border border-border rounded-none p-6 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-foreground-muted">
              <span className="text-xs font-mono uppercase tracking-wider">Resume Downloads</span>
              <Download size={18} className="text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground font-mono">{stats.resumeDownloads}</div>
            <p className="text-[11px] text-foreground-subtle">CV download events</p>
          </div>

          <div className="bg-surface/40 border border-border rounded-none p-6 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between text-foreground-muted">
              <span className="text-xs font-mono uppercase tracking-wider">Total Interactions</span>
              <BarChart3 size={18} className="text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground font-mono">
              {stats.projectViews.reduce((acc: number, p: { _count: { _all: number } }) => acc + p._count._all, 0) +
                stats.projectDemoClicks.reduce((acc: number, p: { _count: { _all: number } }) => acc + p._count._all, 0) +
                stats.projectGithubClicks.reduce((acc: number, p: { _count: { _all: number } }) => acc + p._count._all, 0) +
                stats.contactClicks.reduce((acc: number, c: { _count: { _all: number } }) => acc + c._count._all, 0)}
            </div>
            <p className="text-[11px] text-foreground-subtle">Clicks, views & actions</p>
          </div>
        </div>

        {/* Project Breakdown & Contact Clicks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Project Stats */}
          <div className="bg-surface/30 border border-border rounded-none p-6 space-y-4">
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
                    <span className="font-mono font-medium text-foreground">{p.target}</span>
                    <div className="flex items-center gap-4 text-foreground-muted">
                      <span>{p._count._all} views</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact & Action Clicks */}
          <div className="bg-surface/30 border border-border rounded-none p-6 space-y-4">
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
                    <span className="font-mono font-medium text-foreground">{c.target}</span>
                    <span className="text-accent font-mono">{c._count._all} clicks</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Owner Status Toggle Card */}
        <div className="mb-8">
          <OwnerStatusToggle initialIsOwner={ownerStatus} />
        </div>

        {/* User Info & Security Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface/30 border border-border rounded-none p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
              <User size={16} className="text-accent" />
              <span>Account Information</span>
            </h3>
            <div className="space-y-2">
              <div className="text-xs text-foreground-muted">Email Address</div>
              <div className="text-sm font-medium text-foreground font-mono bg-background/50 p-3 rounded-none border border-border">
                {user.email}
              </div>
            </div>
          </div>

          <div className="bg-surface/30 border border-border rounded-none p-6 space-y-4">
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
        <div className="mt-8 p-4 rounded-none bg-surface/20 border border-border flex items-center gap-3 text-xs text-foreground-muted font-mono">
          <Terminal size={16} className="text-accent shrink-0" />
          <span>Analytics engine active. Owner visits are automatically filtered out.</span>
        </div>
      </div>
    </div>
  );
}
