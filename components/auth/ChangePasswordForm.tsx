// components/auth/ChangePasswordForm.tsx
"use client";

import { useState } from "react";
import { KeyRound, Lock, Save, Loader2 } from "lucide-react";
import Toast from "@/components/ui/Toast";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(data.error || "Failed to change password.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface/30 border border-border rounded-none p-6 space-y-6">
      <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
        <KeyRound size={16} className="text-accent" />
        <span>Change Administrator Password</span>
      </h3>

      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />

      {errorMessage && (
        <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-mono">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">
            Current Password
          </label>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-4 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">
            New Password
          </label>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full pl-9 pr-4 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full pl-9 pr-4 py-2 bg-background border border-border text-xs font-mono text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-background text-xs font-mono font-bold hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          <span>{loading ? "Updating..." : "Update Password"}</span>
        </button>
      </form>
    </div>
  );
}
