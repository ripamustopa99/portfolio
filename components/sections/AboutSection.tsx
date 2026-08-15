// components/sections/AboutSection.tsx
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowButton from "@/components/ui/GlowButton";

export default function AboutSection() {
  return (
    <section className="section-padding border-t border-border/40 relative overflow-hidden">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-sm text-accent mb-3 tracking-wide">
              ABOUT ME
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Engineering with Purpose
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-center">
          {/* Left: Profile Photo Card */}
          <ScrollReveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-xl">
              <Image
                src="/images/profile.jpg"
                alt="Ripa Mustopa A"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-bold text-xl">Ripa Mustopa A</div>
                <div className="text-xs font-mono text-accent">Software Engineer & Architect</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Bio and Action */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="prose prose-invert space-y-6">
                <p className="text-xl text-foreground leading-relaxed font-medium">
                  Hi, I&apos;m Ripa Mustopa A — a software engineer and system architect with a passion for building robust web applications and scalable backend architectures.
                </p>
                <p className="text-foreground-muted leading-relaxed">
                  My work spans across full-stack engineering, distributed systems, and database optimization. I care deeply about clean code architecture, developer experience, and delivering measurable business outcomes.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="pt-2">
                <GlowButton href="/about/" variant="secondary">
                  Read Full Bio & Experience
                </GlowButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
