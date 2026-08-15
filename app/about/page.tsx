// app/about/page.tsx
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxSection from "@/components/ui/ParallaxSection";

export const metadata = {
  title: "About — Ripa Mustopa A",
  description:
    "Software engineer and architect focused on scalable systems, backend architecture, and high-performance web applications.",
};

const experiences = [
  {
    period: "2024 — Present",
    role: "Senior Software Engineer",
    company: "Tech Enterprise",
    description:
      "Leading core backend architecture and distributed systems, scaling applications to handle high concurrency with optimized PostgreSQL and microservices.",
  },
  {
    period: "2022 — 2024",
    role: "Full-Stack Developer",
    company: "Digital Product Studio",
    description:
      "Engineered high-performance web applications using Next.js, TypeScript, and Go. Implemented robust design systems and optimized CI/CD pipelines.",
  },
  {
    period: "2020 — 2022",
    role: "Software Engineer",
    company: "Tech Startup",
    description:
      "Built and maintained RESTful APIs, real-time analytics dashboards, and cloud infrastructure on AWS.",
  },
];

const focusAreas = [
  "Backend Architecture & Distributed Systems",
  "Full-Stack Web Engineering (Next.js & React)",
  "Database Performance & Optimization",
  "DevOps, Docker & Cloud Infrastructure",
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-sm text-accent mb-3">PROFILE</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Me
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Photo & Focus Areas */}
          <ParallaxSection offset={20} className="space-y-8">
            <ScrollReveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-xl">
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
                  <div className="text-xs font-mono text-accent">Software Engineer & Architect</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-background-elevated border border-border">
                <h2 className="text-sm font-mono text-accent mb-4">
                  FOCUS AREAS
                </h2>
                <ul className="space-y-3">
                  {focusAreas.map((area) => (
                    <li key={area} className="text-foreground-muted text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-2xl bg-background-elevated border border-border">
                <h2 className="text-sm font-mono text-accent mb-4">CONNECT</h2>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground-muted">ripamustopa99@gmail.com</p>
                  <p className="text-foreground-muted">
                    Based in West Java, Indonesia
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
                  Hi, I'm Ripa Mustopa A — a software engineer and system architect with a passion for building robust web applications and scalable backend architectures.
                </p>
                <p className="text-foreground-muted leading-relaxed">
                  My work spans across full-stack engineering, distributed systems, and database optimization. I care deeply about clean code architecture, developer experience, and delivering measurable business outcomes.
                </p>
                <p className="text-foreground-muted leading-relaxed">
                  When I'm not writing code or architecting cloud systems, I explore new technologies, write technical notes, and refine high-performance web products.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="text-sm font-mono text-accent mb-6">
                  EXPERIENCE
                </h2>
                <div className="space-y-8 border-l border-border pl-6 ml-2">
                  {experiences.map((exp) => (
                    <div key={exp.period} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-background border-2 border-accent" />
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
