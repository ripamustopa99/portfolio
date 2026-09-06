// app/about/page.tsx
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxSection from "@/components/ui/ParallaxSection";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";
import { getProfileImageUrl } from "@/lib/settings";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: lang === "en" ? "About — Ripa Mustopa A" : "Tentang — Ripa Mustopa A",
    description: lang === "en"
      ? "Computer science student and aspiring web developer focused on full-stack web applications and learning modern technologies."
      : "Mahasiswa ilmu komputer dan calon web developer yang berfokus pada aplikasi web full-stack dan mempelajari teknologi modern.",
  };
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].aboutPage;
  const sectionT = translations[lang as "en" | "id"].aboutSection;
  const profileUrl = await getProfileImageUrl();

  const experiences = lang === "en" ? [
    {
      period: "2023 — Present",
      role: "Computer Science Student",
      company: "University / College",
      description:
        "Studying core computer science concepts, data structures, algorithms, and software engineering principles.",
    },
    {
      period: "2023 — Present",
      role: "Full-Stack Web Developer (Side Projects)",
      company: "Personal & Academic Projects",
      description:
        "Building full-stack web applications using React, Next.js, TypeScript, Node.js, and Tailwind CSS.",
    },
    {
      period: "2022 — 2023",
      role: "Programming Journey & Self-Taught",
      company: "Self-Learning",
      description:
        "Started learning HTML, CSS, JavaScript fundamentals, and building small interactive web pages.",
    },
  ] : [
    {
      period: "2023 — Sekarang",
      role: "Mahasiswa Ilmu Komputer",
      company: "Universitas / Perguruan Tinggi",
      description:
        "Mempelajari konsep inti ilmu komputer, struktur data, algoritma, dan prinsip rekayasa perangkat lunak.",
    },
    {
      period: "2023 — Sekarang",
      role: "Full-Stack Web Developer (Proyek Sampingan)",
      company: "Proyek Pribadi & Akademik",
      description:
        "Membuat aplikasi web full-stack menggunakan React, Next.js, TypeScript, Node.js, dan Tailwind CSS.",
    },
    {
      period: "2022 — 2023",
      role: "Perjalanan Pemrograman & Otodidak",
      company: "Belajar Mandiri",
      description:
        "Mulai mempelajari dasar-dasar HTML, CSS, JavaScript, serta membuat halaman web interaktif sederhana.",
    },
  ];

  const focusAreas = lang === "en" ? [
    "Full-Stack Web Engineering (React & Next.js)",
    "Frontend UI & Responsive Design",
    "Backend Development & REST APIs",
    "Computer Science Fundamentals",
  ] : [
    "Rekayasa Web Full-Stack (React & Next.js)",
    "Frontend UI & Desain Responsif",
    "Pengembangan Backend & REST API",
    "Dasar-Dasar Ilmu Komputer",
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-sm text-accent mb-3">{sectionT.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t.title}
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Photo & Focus Areas */}
          <ParallaxSection offset={20} className="space-y-6">
            <ScrollReveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-none border border-border bg-background-elevated shadow-xl">
                <Image
                  src={profileUrl}
                  alt="Ripa Mustopa A"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-bold text-lg">Ripa Mustopa A</div>
                  <div className="text-xs font-mono text-accent">CS Student & Web Developer</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-none bg-background-elevated border border-border space-y-4">
                <h2 className="text-sm font-mono text-accent mb-2 tracking-wider">
                  {sectionT.focusAreas}
                </h2>
                <ul className="space-y-3">
                  {focusAreas.map((area) => (
                    <li key={area} className="text-foreground-muted text-sm flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-none bg-accent shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-none bg-background-elevated border border-border space-y-3">
                <h2 className="text-sm font-mono text-accent mb-2 tracking-wider">{sectionT.contact}</h2>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground-muted font-mono">ripamustopa99@gmail.com</p>
                  <p className="text-foreground-muted">
                    {sectionT.basedIn}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </ParallaxSection>

          {/* Right Column: Bio & Experience */}
          <div className="space-y-12">
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
                 <p className="text-foreground-muted leading-relaxed">
                   {lang === "en"
                     ? "When not in college classes or coding side projects, I enjoy exploring new tech tools, reading technical notes, and sharpening my problem-solving skills."
                     : "Ketika tidak sedang mengikuti kuliah atau membuat proyek sampingan, saya menikmati eksplorasi alat teknologi baru, membaca catatan teknis, dan mengasah kemampuan memecahkan masalah."}
                 </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="text-sm font-mono text-accent mb-6 tracking-wider">
                  {sectionT.workExperience}
                </h2>
                <div className="space-y-8 border-l border-border pl-6 ml-2">
                  {experiences.map((exp) => (
                    <div key={`${exp.role}-${exp.period}`} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-none bg-background border-2 border-accent" />
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                        <h3 className="text-foreground font-semibold text-lg">
                          {exp.role}
                        </h3>
                        <span className="text-sm text-foreground-subtle font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-accent font-mono mb-2">
                        {exp.company}
                      </p>
                      <p className="text-sm text-foreground-muted leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
