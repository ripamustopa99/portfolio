// components/sections/CallToAction.tsx
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowButton from "@/components/ui/GlowButton";

export default function CallToAction() {
  return (
    <section className="section-padding min-h-[50vh] flex items-center justify-center relative overflow-hidden border-t border-border/40">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-elevated/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10 w-full text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              LET&apos;S BUILD SOMETHING AMAZING
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Have a project in mind or want to collaborate?
            </h2>
            <p className="text-foreground-muted text-base sm:text-lg max-w-xl mx-auto">
              I&apos;m always open to discussing new engineering challenges, product ideas, or partnership opportunities.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <GlowButton href="/contact/" variant="primary">
                Get in Touch
              </GlowButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
