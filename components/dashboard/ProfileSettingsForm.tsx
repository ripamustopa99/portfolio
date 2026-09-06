// components/dashboard/ProfileSettingsForm.tsx
"use client";

import { useState } from "react";
import { User, Save, RefreshCw } from "lucide-react";
import Toast from "@/components/ui/Toast";

interface ProfileSettingsFormProps {
  initialProfileUrl: string;
}

export default function ProfileSettingsForm({ initialProfileUrl }: ProfileSettingsFormProps) {
  const [profileUrl, setProfileUrl] = useState(initialProfileUrl);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "profileImageUrl", value: profileUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Profile photo URL updated successfully!");
      } else {
        alert("Failed to update: " + data.error);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      alert("Error: " + msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-surface/30 border border-border p-6 space-y-6">
      <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />

      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
          <User size={16} className="text-accent" />
          <span>Profile Photo Settings</span>
        </h3>
        <span className="text-[10px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5">
          Server-Side Rendered & Cached
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Left: Larger Square Preview Photo */}
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 bg-background border border-border overflow-hidden shrink-0 shadow-lg mx-auto md:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileUrl || "/images/profile.jpg"}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono bg-black/75 text-white py-1">
              Preview Photo
            </span>
          </div>

          {/* Right: Input URL, Tip, and Save Button */}
          <div className="flex-1 space-y-4 w-full">
            <div>
              <label className="block text-xs font-mono uppercase text-foreground-muted mb-1.5">
                Profile Photo URL
              </label>
              <input
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/.../profile.jpg"
                className="w-full bg-background border border-border px-3.5 py-2.5 text-xs font-mono text-foreground focus:border-accent outline-none"
                required
              />
              <p className="text-[11px] font-mono text-foreground-muted mt-2">
                Tip: Enter a direct image URL for your profile photo (e.g. Cloudinary, Imgur, or external public link).
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-accent text-background text-xs font-mono font-bold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                <span>{saving ? "Saving..." : "Save Profile Photo"}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
