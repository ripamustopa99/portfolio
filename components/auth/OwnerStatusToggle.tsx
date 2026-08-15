// components/auth/OwnerStatusToggle.tsx
"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";

export default function OwnerStatusToggle({ initialIsOwner }: { initialIsOwner: boolean }) {
  const [isOwner, setIsOwner] = useState(initialIsOwner);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOwner = async () => {
    setIsLoading(true);
    try {
      const endpoint = isOwner ? "/api/auth/revoke-owner" : "/api/auth/set-owner";
      const res = await fetch(endpoint, { method: "POST" });
      if (res.ok) {
        setIsOwner(!isOwner);
      }
    } catch {
      alert("Failed to update owner status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface/30 border border-border rounded-xl p-6 space-y-4">
      <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted flex items-center gap-2">
        {isOwner ? <ShieldCheck size={16} className="text-emerald-400" /> : <ShieldAlert size={16} className="text-amber-400" />}
        <span>Owner Tracking Status</span>
      </h3>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-foreground">
            {isOwner ? "This device is recognized as Owner" : "This device is treated as Visitor"}
          </div>
          <div className="text-xs text-foreground-muted mt-0.5">
            {isOwner
              ? "Your visits and interactions are excluded from analytics."
              : "Your visits are currently being counted in visitor stats."}
          </div>
        </div>
        <button
          onClick={toggleOwner}
          disabled={isLoading}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            isOwner
              ? "bg-amber-500/10 border border-amber-500/25 text-amber-400 hover:bg-amber-500/20"
              : "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20"
          } disabled:opacity-50`}
        >
          {isLoading && <Loader2 size={14} className="animate-spin" />}
          <span>{isOwner ? "Revoke Owner" : "Set as Owner"}</span>
        </button>
      </div>
    </div>
  );
}
