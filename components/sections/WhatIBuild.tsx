// components/sections/WhatIBuild.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { Code2, Server, Cpu } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function WhatIBuild() {
  const { language } = useLanguage();
  const t = translations[language].whatIBuild;

  const pillars = [
    {
      icon: Code2,
      title: t.p2Title,
      description: t.p2Desc,
    },
    {
      icon: Server,
      title: t.p1Title,
      description: t.p1Desc,
    },
    {
      icon: Cpu,
      title: t.p3Title,
      description: t.p3Desc,
    },
  ];

  return (
    <section className="section-padding min-h-[75vh] flex items-center relative overflow-hidden border-t border-border/40">
      <div className="container-custom relative z-10 w-full">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm text-accent mb-3 tracking-wide">
              {t.badge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={index * 0.1}>
                <div className="h-full p-8 rounded-none bg-background-elevated border border-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-none bg-surface border border-border flex items-center justify-center text-accent mb-6 group-hover:scale-105 transition-transform duration-300">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-foreground-muted leading-relaxed text-sm">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
