// lib/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof document !== "undefined") {
      const match = document.cookie.match(new RegExp("(^| )portfolio_lang=([^;]+)"));
      const cookieLang = match ? match[2] : null;
      if (cookieLang === "en" || cookieLang === "id") {
        return cookieLang as Language;
      }
    }
    return initialLanguage;
  });

  const setLanguage = (newLang: Language) => {
    if (newLang === language) return;

    setLanguageState(newLang);
    localStorage.setItem("portfolio_lang", newLang);
    document.cookie = `portfolio_lang=${newLang}; path=/; max-age=31536000`;

    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
