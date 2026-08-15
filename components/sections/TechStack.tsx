// components/sections/TechStack.tsx
import { techStackData } from "@/lib/tech-stack";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TechStack() {
  return (
    <section className="section-padding border-t border-border/40">
      <div className="container-custom">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm text-accent mb-3 tracking-wide">
              EXPERTISE & TOOLING
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tech Stack
            </h2>
            <p className="text-foreground-muted">
              Core technologies, frameworks, and tools I use to architect and build robust digital products.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStackData.map((category, catIndex) => (
            <ScrollReveal key={category.title} delay={catIndex * 0.1}>
              <div className="h-full p-8 rounded-2xl bg-background-elevated border border-border hover:border-border-hover transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-foreground-muted mb-6">
                    {category.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-3.5 rounded-xl bg-background border border-border/80 hover:border-accent/40 transition-colors"
                      >
                        <div className="font-mono text-sm font-semibold text-foreground mb-1">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-xs text-foreground-subtle leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
