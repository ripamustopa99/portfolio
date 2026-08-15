// components/sections/WhatIBuild.tsx
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Code2, Server, Cpu } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Full-Stack Web Applications",
    description: "End-to-end web products engineered with Next.js, React, and TypeScript, focusing on lightning-fast performance, SSR/SSG, and impeccable user experience.",
  },
  {
    icon: Server,
    title: "Backend & Scalable APIs",
    description: "Scalable distributed backends, robust relational/NoSQL databases, and high-concurrency microservices designed for low latency and reliability.",
  },
  {
    icon: Cpu,
    title: "DevOps & System Architecture",
    description: "Automated CI/CD pipelines, containerized infrastructure with Docker, cloud deployments, and clean, maintainable code architectures.",
  },
];

export default function WhatIBuild() {
  return (
    <section className="section-padding min-h-[75vh] flex items-center relative overflow-hidden border-t border-border/40">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[300px] bg-accent/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10 w-full">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm text-accent mb-3 tracking-wide">
              ENGINEERING SCOPE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What I Build
            </h2>
            <p className="text-foreground-muted">
              Specialized domains and architectural focus areas I bring to every software engineering project.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={index * 0.1}>
                <div className="h-full p-8 rounded-2xl bg-background-elevated border border-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
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
