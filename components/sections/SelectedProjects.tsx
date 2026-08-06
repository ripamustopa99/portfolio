// components/sections/SelectedProjects.tsx
import { getFeaturedProjects } from "@/lib/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import GlowButton from "@/components/ui/GlowButton";

export default async function SelectedProjects() {
  const projects = await getFeaturedProjects();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="font-mono text-sm text-accent mb-3">
                SELECTED WORK
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Featured Projects
              </h2>
            </div>
            <GlowButton
              href="/projects/"
              variant="secondary"
              className="hidden md:inline-flex"
            >
              View All Projects
            </GlowButton>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <GlowButton href="/projects/" variant="secondary" className="w-full">
            View All Projects
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
