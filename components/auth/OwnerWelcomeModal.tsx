// components/auth/OwnerWelcomeModal.tsx
"use client";

import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OwnerWelcomeModal({ isOpen }: { isOpen: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleChoice = async (isOwner: boolean) => {
    setIsLoading(true);
    if (isOwner) {
      try {
        await fetch("/api/auth/set-owner", { method: "POST" });
      } catch {
        // ignore
      }
    }
    setOpen(false);
    // Remove query params from url cleanly
    router.replace("/dashboard");
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-none p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6">
        <div className="w-14 h-14 rounded-none bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto">
          <ShieldCheck size={32} />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-foreground">Welcome to Dashboard!</h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Apakah Anda ingin menjadikan perangkat ini sebagai <strong className="text-accent">Owner</strong>? Perangkat ini tidak akan tercatat sebagai visitor dalam statistik analitik portofolio Anda.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => handleChoice(true)}
            disabled={isLoading}
            className="w-full py-3 rounded-none bg-accent text-background font-semibold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            <span>Jadikan Owner (Direkomendasikan)</span>
          </button>
          <button
            onClick={() => handleChoice(false)}
            disabled={isLoading}
            className="w-full py-2.5 rounded-none bg-surface border border-border text-xs font-medium text-foreground-muted hover:text-foreground hover:border-accent transition-colors"
          >
            Lewati
          </button>
        </div>
      </div>
    </div>
  );
}
