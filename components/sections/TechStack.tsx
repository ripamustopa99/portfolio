// components/sections/TechStack.tsx
"use client";

import { techStackData } from "@/lib/tech-stack";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { 
  Code2, 
  FileCode, 
  Palette, 
  Globe, 
  Server, 
  Database, 
  Layers, 
  GitBranch, 
  Terminal, 
  Cloud, 
  Cpu, 
  Boxes,
  LucideIcon
} from "lucide-react";

const getTechIcon = (name: string): LucideIcon => {
  const lower = name.toLowerCase();
  if (lower.includes("react") || lower.includes("next")) return Code2;
  if (lower.includes("javascript") || lower.includes("typescript")) return FileCode;
  if (lower.includes("tailwind")) return Palette;
  if (lower.includes("html") || lower.includes("css")) return Globe;
  if (lower.includes("node") || lower.includes("express")) return Server;
  if (lower.includes("postgres") || lower.includes("mysql") || lower.includes("database")) return Database;
  if (lower.includes("mongo")) return Database;
  if (lower.includes("prisma")) return Layers;
  if (lower.includes("git")) return GitBranch;
  if (lower.includes("vscode") || lower.includes("vs code")) return Terminal;
  if (lower.includes("postman")) return Cpu;
  if (lower.includes("vercel")) return Cloud;
  return Boxes;
};

export default function TechStack() {
  const { language } = useLanguage();
  const t = translations[language].techStack;
  const categories = techStackData[language];

  return (
    <section className="section-padding border-t border-border/40 relative overflow-hidden">
      <div className="container-custom relative z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => {
            const catNumber = `0${catIndex + 1}`;
            return (
              <ScrollReveal key={category.title} delay={catIndex * 0.1}>
                <div className="h-full p-6 rounded-none bg-surface/20 border border-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-accent">
                          {`// ${catNumber}`}
                        </span>
                        <h3 className="text-base font-bold text-foreground font-mono">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-foreground-muted mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Compact Icon Badges Grid */}
                    <div className="flex flex-wrap gap-2.5">
                      {category.items.map((item) => {
                        const IconComponent = getTechIcon(item.name);
                        return (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 px-3 py-2 rounded-none bg-background border border-border hover:border-accent hover:bg-surface/50 transition-all duration-200 group/item cursor-default"
                            title={item.description}
                          >
                            <IconComponent size={14} className="text-accent shrink-0 group-hover/item:scale-110 transition-transform" />
                            <span className="font-mono text-xs font-medium text-foreground group-hover/item:text-accent transition-colors">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
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
