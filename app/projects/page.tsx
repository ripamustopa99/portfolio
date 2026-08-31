// app/projects/page.tsx
import { getAllProjects } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: lang === "en" ? "Projects — Ripa Mustopa A" : "Proyek — Ripa Mustopa A",
    description: lang === "en" ? "Selected software engineering projects with case studies." : "Pilihan proyek rekayasa perangkat lunak beserta studi kasus.",
  };
}

export default async function ProjectsPage() {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].projectsPage;
  const projects = await getAllProjects(lang);

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-sm text-accent mb-3">{t.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-foreground-muted max-w-xl text-base">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
