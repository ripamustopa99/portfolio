// app/about/page.tsx
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxSection from "@/components/ui/ParallaxSection";

export const metadata = {
  title: "About — Your Name",
  description:
    "Software engineer focused on frontend systems and developer experience.",
};

const experiences = [
  {
    period: "2022 — Present",
    role: "Senior Frontend Engineer",
    company: "Tech Company",
    description:
      "Leading frontend architecture for core product. Reduced bundle size by 60% through code splitting and lazy loading strategies.",
  },
  {
    period: "2020 — 2022",
    role: "Software Engineer",
    company: "Startup Name",
    description:
      "Built design system from scratch used across 4 products. Mentored 3 junior engineers.",
  },
  {
    period: "2018 — 2020",
    role: "Frontend Developer",
    company: "Agency Name",
    description:
      "Delivered 20+ client projects with focus on performance and accessibility.",
  },
];

const focusAreas = [
  "Frontend Architecture & Design Systems",
  "Developer Experience & Tooling",
  "Performance Optimization",
  "TypeScript & Static Analysis",
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-custom max-w-[900px]">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-sm text-accent mb-3">PROFILE</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16">
          <ParallaxSection offset={30} className="space-y-8">
            <ScrollReveal>
              <div>
                <h2 className="text-sm font-mono text-accent mb-4">
                  FOCUS AREAS
                </h2>
                <ul className="space-y-3">
                  {focusAreas.map((area) => (
                    <li key={area} className="text-foreground-muted text-sm">
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="text-sm font-mono text-accent mb-4">CONTACT</h2>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground-muted">hello@example.com</p>
                  <p className="text-foreground-muted">
                    Based in Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </ParallaxSection>

          <div className="space-y-12">
            <ScrollReveal>
              <div className="prose prose-invert">
                <p className="text-lg text-foreground-muted leading-relaxed">
                  I am a software engineer with 6+ years of experience building
                  web applications and design systems. My work sits at the
                  intersection of engineering and product — I care deeply about
                  code quality, user experience, and business outcomes.
                </p>
                <p className="text-foreground-muted leading-relaxed">
                  Currently, I focus on frontend architecture and developer
                  experience, helping teams ship faster without sacrificing
                  quality. I believe the best code is the code that never needs
                  to be written twice.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h2 className="text-sm font-mono text-accent mb-6">
                  EXPERIENCE
                </h2>
                <div className="space-y-8">
                  {experiences.map((exp) => (
                    <div key={exp.period} className="group">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                        <h3 className="text-foreground font-medium">
                          {exp.role}
                        </h3>
                        <span className="text-sm text-foreground-subtle font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted mb-2">
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
