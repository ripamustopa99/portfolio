// components/sections/WhatIBuild.tsx
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Code2, Server, Cpu } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Aplikasi Web Full-Stack",
    description: "Produk web ujung-ke-ujung (end-to-end) yang dikembangkan dengan Next.js, React, dan TypeScript, berfokus pada performa kilat, SSR/SSG, serta pengalaman pengguna yang prima.",
  },
  {
    icon: Server,
    title: "Backend & API Berskala Tinggi",
    description: "Backend terdistribusi yang dapat diskala, database relasional/NoSQL yang tangguh, serta mikroservis berkonkurensi tinggi yang dirancang untuk latensi rendah dan keandalan.",
  },
  {
    icon: Cpu,
    title: "DevOps & Arsitektur Sistem",
    description: "Pipeline CI/CD otomatis, infrastruktur tercontainerisasi dengan Docker, deployment cloud, serta arsitektur kode yang bersih dan mudah dipelihara.",
  },
];

export default function WhatIBuild() {
  return (
    <section className="section-padding min-h-[75vh] flex items-center relative overflow-hidden border-t border-border/40">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[300px] bg-accent/[0.04] rounded-none blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10 w-full">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm text-accent mb-3 tracking-wide">
              RUANG LINGKUP REKAYASA
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Yang Saya Bangun
            </h2>
            <p className="text-foreground-muted">
              Domain khusus dan fokus arsitektur yang saya hadirkan dalam setiap proyek rekayasa perangkat lunak.
            </p>
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
