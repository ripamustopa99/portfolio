// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Tag from "@/components/ui/Tag";
import GlowButton from "@/components/ui/GlowButton";
import { ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  if (projects.length === 0) {
    return [{ slug: "sample-project" }];
  }
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <div className="container-custom">
        <div className="max-w-[720px] mx-auto">
          <ScrollReveal>
            <header className="mb-16">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="text-xl text-foreground-muted mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-subtle font-mono">
                <span>{formatDate(project.date)}</span>

                {project.links.live && (
                  <GlowButton
                    href={project.links.live}
                    external
                    variant="secondary"
                    className="text-xs"
                  >
                    <ExternalLink size={14} className="mr-2" />
                    Live Demo
                  </GlowButton>
                )}

                {project.links.github && (
                  <GlowButton
                    href={project.links.github}
                    external
                    variant="secondary"
                    className="text-xs"
                  >
                    {/* <Github size={14} className="mr-2" /> */}@ Source Code
                  </GlowButton>
                )}
              </div>
            </header>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-16 p-6 bg-background-elevated border border-border rounded-lg">
              <h2 className="text-sm font-mono text-accent mb-4">TECH STACK</h2>
              <div className="space-y-4">
                {project.techStack.map((stack) => (
                  <div
                    key={stack.category}
                    className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8"
                  >
                    <span className="text-sm text-foreground-muted font-mono w-32 shrink-0">
                      {stack.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {stack.items.map((item) => (
                        <span key={item} className="text-sm text-foreground">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div
              className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-headings:font-sans prose-p:text-foreground-muted prose-a:text-accent hover:prose-a:text-foreground prose-strong:text-foreground prose-code:text-accent prose-code:bg-background-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-background-elevated prose-pre:border prose-pre:border-border prose-blockquote:border-l-accent prose-blockquote:text-foreground-muted"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </ScrollReveal>
        </div>
      </div>
    </article>
  );
}
