// components/sections/AboutSection.tsx
import { Suspense } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlowButton from "@/components/ui/GlowButton";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";
import { getProfileImageUrl } from "@/lib/settings";
import { ProfileSkeleton } from "@/components/ui/ProfileSkeleton";

async function ProfileImageAsync() {
  const profileUrl = await getProfileImageUrl();

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none border border-border bg-background-elevated shadow-xl">
      <Image
        src={profileUrl}
        alt="Ripa Mustopa A"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 500px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <div className="font-bold text-xl">Ripa Mustopa A</div>
        <div className="text-xs font-mono text-accent">CS Student & Web Developer</div>
      </div>
    </div>
  );
}

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
          {/* Left: Profile Photo Card with Suspense */}
          <ScrollReveal>
            <Suspense fallback={<ProfileSkeleton />}>
              <ProfileImageAsync />
            </Suspense>
          </ScrollReveal>

          {/* Right: Bio and Action */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="prose prose-invert space-y-6">
                <p className="text-xl text-foreground leading-relaxed font-medium">
                  {lang === "en"
                    ? "Hi, I'm Ripa Mustopa A — a computer science student and aspiring web developer passionate about learning modern web technologies and building practical applications."
                    : "Halo, saya Ripa Mustopa A — mahasiswa ilmu komputer dan calon web developer yang antusias mempelajari teknologi web modern dan membangun aplikasi praktis."}
                </p>
                <p className="text-foreground-muted leading-relaxed">
                  {lang === "en"
                    ? "My journey focuses on full-stack web development, frontend engineering, and backend basics. I enjoy turning ideas into functional web apps and continuously improving my coding skills."
                    : "Perjalanan saya berfokus pada pengembangan web full-stack, rekayasa frontend, dan dasar-dasar backend. Saya menikmati mengubah ide menjadi aplikasi web fungsional dan terus mengasah kemampuan ngoding."}
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
