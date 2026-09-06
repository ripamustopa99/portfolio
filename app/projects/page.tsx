// app/projects/page.tsx
import { getPaginatedProjects } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { Pagination } from "@/components/ui/Pagination";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: lang === "en" ? "Projects — Ripa Mustopa A" : "Proyek — Ripa Mustopa A",
    description: lang === "en" ? "Selected software engineering projects with case studies." : "Pilihan proyek rekayasa perangkat lunak beserta studi kasus.",
  };
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].projectsPage;
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const pageSize = 10;

  const { projects, totalCount, totalPages } = await getPaginatedProjects(lang, page, pageSize);

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

        {projects.length === 0 ? (
          <div className="text-center py-20 border border-border bg-surface/50">
            <p className="text-foreground-muted text-base">{t.emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalCount={totalCount}
              itemName={lang === "en" ? "projects" : "proyek"}
              buildHref={(p) => `/projects/?page=${p}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
