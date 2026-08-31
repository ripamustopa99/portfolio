// app/about/page.tsx
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxSection from "@/components/ui/ParallaxSection";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: lang === "en" ? "About — Ripa Mustopa A" : "Tentang — Ripa Mustopa A",
    description: lang === "en"
      ? "Software developer and architect focused on scalable systems, backend architecture, and high-performance web applications."
      : "Software developer dan architect yang berfokus pada sistem berskala, arsitektur backend, dan aplikasi web berkinerja tinggi.",
  };
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].aboutPage;
  const sectionT = translations[lang as "en" | "id"].aboutSection;

  const experiences = lang === "en" ? [
    {
      period: "2024 — Present",
      role: "Senior Software Developer",
      company: "Tech Enterprise",
      description:
        "Leading core backend architecture and distributed systems, scaling applications to handle high concurrency with optimized PostgreSQL and microservices.",
    },
    {
      period: "2022 — 2024",
      role: "Full-Stack Developer",
      company: "Digital Product Studio",
      description:
        "Developed high-performance web applications using Next.js, TypeScript, and Go. Implemented robust design systems and optimized CI/CD pipelines.",
    },
    {
      period: "2020 — 2022",
      role: "Software Developer",
      company: "Tech Startup",
      description:
        "Built and maintained RESTful APIs, real-time analytics dashboards, and cloud infrastructure on AWS.",
    },
  ] : [
    {
      period: "2024 — Sekarang",
      role: "Senior Software Developer",
      company: "Tech Enterprise",
      description:
        "Memimpin arsitektur inti backend dan sistem terdistribusi, menskalakan aplikasi untuk menangani konkurensi tinggi dengan PostgreSQL teroptimasi dan mikroservis.",
    },
    {
      period: "2022 — 2024",
      role: "Full-Stack Developer",
      company: "Digital Product Studio",
      description:
        "Mengembangkan aplikasi web berkinerja tinggi menggunakan Next.js, TypeScript, dan Go. Menerapkan sistem desain yang tangguh dan mengoptimalkan pipeline CI/CD.",
    },
    {
      period: "2020 — 2022",
      role: "Software Developer",
      company: "Tech Startup",
      description:
        "Membangun dan memelihara RESTful API, dashboard analitik real-time, serta infrastruktur cloud di AWS.",
    },
  ];

  const focusAreas = lang === "en" ? [
    "Backend Architecture & Distributed Systems",
    "Full-Stack Web Engineering (Next.js & React)",
    "Database Performance & Optimization",
    "DevOps, Docker & Cloud Infrastructure",
  ] : [
    "Arsitektur Backend & Sistem Terdistribusi",
    "Rekayasa Web Full-Stack (Next.js & React)",
    "Performa & Optimasi Database",
    "DevOps, Docker & Infrastruktur Cloud",
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
                  src="/images/profile.jpg"
                  alt="Ripa Mustopa A"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-bold text-lg">Ripa Mustopa A</div>
                  <div className="text-xs font-mono text-accent">Software Developer & Architect</div>
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
                     ? "Hi, I'm Ripa Mustopa A — a software developer and system architect with a deep passion for building robust web applications and high-scale backend architectures."
                     : "Halo, saya Ripa Mustopa A — seorang software developer dan system architect dengan kecintaan mendalam dalam membangun aplikasi web yang tangguh dan arsitektur backend berskala tinggi."}
                 </p>
                 <p className="text-foreground-muted leading-relaxed">
                   {lang === "en"
                     ? "My work spans full-stack engineering, distributed systems, and database optimization. I care deeply about clean code architecture, developer experience, and delivering measurable business impact."
                     : "Pekerjaan saya mencakup rekayasa full-stack, sistem terdistribusi, dan optimasi database. Saya sangat peduli pada arsitektur kode yang bersih, pengalaman pengembang (developer experience), serta memberikan dampak bisnis yang terukur."}
                 </p>
                 <p className="text-foreground-muted leading-relaxed">
                   {lang === "en"
                     ? "When not writing code or designing cloud systems, I explore new technologies, write technical notes, and refine high-performance web products."
                     : "Saat tidak sedang menulis kode atau merancang sistem cloud, saya mengeksplorasi teknologi baru, menulis catatan teknis, dan menyempurnakan produk web berkinerja tinggi."}
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
                    <div key={exp.period} className="relative group">
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
