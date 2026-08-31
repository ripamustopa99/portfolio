// components/sections/AboutSection.tsx
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowButton from "@/components/ui/GlowButton";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

export default async function AboutSection() {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].aboutSection;

  return (
    <section className="section-padding border-t border-border/40 relative overflow-hidden">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-sm text-accent mb-3 tracking-wide">
              {t.badge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-center">
          {/* Left: Profile Photo Card */}
          <ScrollReveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none border border-border bg-background-elevated shadow-xl">
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
                <div className="text-xs font-mono text-accent">Software Developer & Architect</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Bio and Action */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="prose prose-invert space-y-6">
                <p className="text-xl text-foreground leading-relaxed font-medium">
                  {lang === "en"
                    ? "Hi, I'm Ripa Mustopa A — a software developer and system architect with a deep passion for building robust web applications and high-scale backend architectures."
                    : "Halo, saya Ripa Mustopa A — seorang software developer dan system architect dengan kecintaan mendalam dalam membangun aplikasi web yang tangguh dan arsitektur backend berskala tinggi."}
                </p>
                <p className="text-foreground-muted leading-relaxed">
                  {lang === "en"
                    ? "My work spans full-stack engineering, distributed systems, and database optimization. I care deeply about clean code architecture, developer experience, and delivering measurable business impact."
                    : "Pekerjaan saya mencakup rekayasa full-stack, sistem terdistribusi, dan optimasi database. Saya sangat peduli pada arsitektur kode yang bersih, pengalaman pengembang (developer experience), serta memberikan dampak bisnis yang terukur."}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="pt-2">
                <GlowButton href="/about/" variant="secondary">
                  {t.readFullBio}
                </GlowButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
