// components/sections/TechStack.tsx
"use client";

import { techStackData } from "@/lib/tech-stack";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function TechStack() {
  const { language } = useLanguage();
  const t = translations[language].techStack;
  const categories = techStackData[language];

  return (
    <section className="section-padding border-t border-border/40 relative overflow-hidden">
      <div className="container-custom relative z-10" key={language}>
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-3">
              {`// ${t.badge}`}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.title}
            </h2>
            <p className="text-foreground-muted">
              {t.desc}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {categories.map((category, catIndex) => {
            const catNumber = `0${catIndex + 1}`;
            return (
              <ScrollReveal key={category.title} delay={catIndex * 0.1}>
                <div className="h-full p-8 rounded-none bg-surface/30 border border-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-accent">
                          {`// ${catNumber}`}
                        </span>
                        <h3 className="text-xl font-bold text-foreground font-mono">
                          {category.title}
                        </h3>
                      </div>
                      <span className="w-2 h-2 rounded-none bg-accent/40 group-hover:bg-accent transition-colors" />
                    </div>

                    <p className="text-sm text-foreground-muted mb-8 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Linear / Raycast Style Tech Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.items.map((item) => (
                        <div
                          key={item.name}
                          className="p-4 rounded-none bg-background border border-border hover:border-accent hover:bg-surface/50 transition-all duration-200 flex flex-col justify-between group/item"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono text-sm font-bold text-foreground group-hover/item:text-accent transition-colors">
                                {item.name}
                              </span>
                              <span className="text-[10px] font-mono text-foreground-subtle group-hover/item:text-accent">
                                active
                              </span>
                            </div>
                            {item.description && (
                              <p className="text-xs text-foreground-muted leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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
