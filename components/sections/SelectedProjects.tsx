// components/sections/SelectedProjects.tsx
import { getFeaturedProjects } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import GlowButton from "@/components/ui/GlowButton";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

export default async function SelectedProjects() {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].selectedProjects;
  const projects = await getFeaturedProjects(lang);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="font-mono text-sm text-accent mb-3">
                {t.badge}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.title}
              </h2>
            </div>
            <GlowButton
              href="/projects/"
              variant="secondary"
              className="hidden md:inline-flex"
            >
              {t.viewAll}
            </GlowButton>
          </div>
        </ScrollReveal>

        {projects.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-2xl bg-surface/50">
            <p className="text-foreground-muted text-base">{t.emptyMessage}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 md:hidden">
          <GlowButton href="/projects/" variant="secondary" className="w-full">
            {t.viewAll}
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
