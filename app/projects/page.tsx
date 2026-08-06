// app/projects/page.tsx
import { getAllProjects } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata = {
  title: "Projects — Your Name",
  description: "Selected software engineering projects with case studies.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-sm text-accent mb-3">PORTFOLIO</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Projects
            </h1>
            <p className="text-foreground-muted max-w-xl text-lg">
              Deep dives into architecture decisions, technical challenges, and
              outcomes.
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
