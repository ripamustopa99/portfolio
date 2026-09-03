// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";
import ParallaxSection from "@/components/ui/ParallaxSection";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 sm:pt-40 md:pt-48 pb-24 overflow-hidden">
      <div className="container-custom relative z-10 w-full">
        <motion.div
          key={language}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl space-y-8 text-left"
        >
          <ParallaxSection offset={20}>
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent block py-1">
                {`// ${t.role.toUpperCase()}`}
              </span>
            </div>
          </ParallaxSection>

          <ParallaxSection offset={15}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
              {language === "en" ? "Building high-performance" : "Membangun sistem"}
              <span className="block text-gradient mt-3">
                {language === "en" ? "scalable systems." : "berkinerja tinggi."}
              </span>
            </h1>
          </ParallaxSection>

          <ParallaxSection offset={10}>
            <p className="text-base sm:text-lg text-foreground-muted max-w-2xl leading-relaxed">
              {t.tagline}
            </p>
          </ParallaxSection>

          <div className="flex flex-wrap items-center justify-start gap-4 pt-4">
            <GlowButton href="/projects/" variant="primary">
              {t.exploreProjects}
            </GlowButton>
            <GlowButton href="/contact/" variant="secondary">
              {t.getInTouch}
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
