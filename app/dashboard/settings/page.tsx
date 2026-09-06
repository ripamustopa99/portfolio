// app/dashboard/settings/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isOwner } from "@/lib/analytics";
import OwnerStatusToggle from "@/components/auth/OwnerStatusToggle";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import ProfileSettingsForm from "@/components/dashboard/ProfileSettingsForm";
import { getProfileImageUrl } from "@/lib/settings";
import { User, Clock } from "lucide-react";

export const metadata = {
  title: "Settings — Admin Dashboard",
  description:
    "Manage admin account settings, security, and owner tracking preferences.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const ownerStatus = await isOwner();
  const initialProfileUrl = await getProfileImageUrl();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Settings & Security
          </h1>
          <p className="text-xs font-mono text-foreground-muted mt-1">
            Configure owner device analytics exclusion, manage account details,
            and update your administrator password.
          </p>
        </div>
      </div>

      {/* Owner Tracking Status Toggle */}
      <div>
        <OwnerStatusToggle initialIsOwner={ownerStatus} />
      </div>

      {/* Profile Photo Settings */}
      <div>
        <ProfileSettingsForm initialProfileUrl={initialProfileUrl} />
      </div>

      {/* Change Password Form */}
      <div>
        <ChangePasswordForm />
      </div>

      {/* Account Info & Security Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface/30 border border-border rounded-none p-5 space-y-4">
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

        <div className="bg-surface/30 border border-border rounded-none p-5 space-y-4">
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
    </div>
  );
}
