// app/error.tsx
"use client";

import { useEffect } from "react";
import GlowButton from "@/components/ui/GlowButton";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();
  const t = translations[language].errorPage;

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="pt-32 pb-24 min-h-[85vh] flex items-center justify-center">
      <div className="container-custom text-center max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto bg-surface border border-border flex items-center justify-center text-accent">
          <AlertTriangle size={32} />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-xs text-accent uppercase tracking-widest">{`// ${t.badge}`}</p>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-foreground-muted text-sm leading-relaxed">
            {t.desc}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-none bg-white text-background text-xs font-semibold hover:bg-white/90 transition-all duration-200 shadow-sm cursor-pointer"
          >
            {t.tryAgain}
          </button>
          <GlowButton href="/" variant="secondary" className="w-full sm:w-auto justify-center">
            {t.returnHome}
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
