// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Tag from "@/components/ui/Tag";
import ProjectActionLinks from "@/components/ui/ProjectActionLinks";
import ProjectViewTracker from "@/components/analytics/ProjectViewTracker";
import ProjectTableOfContents from "@/components/ui/ProjectTableOfContents";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects("en");
  if (projects.length === 0) {
    return [{ slug: "sample-project" }];
  }
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang();
  const project = await getProjectBySlug(slug, lang);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description: project.description,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].projectsPage;
  const project = await getProjectBySlug(slug, lang);

  if (!project) {
    notFound();
  }

  const h2Count = (project.content.match(/<h2/g) || []).length;
  const hasToc = h2Count >= 2;

  return (
    <article className="pt-32 pb-24">
      <ProjectViewTracker slug={slug} />
      <div className="container-custom">
        <div className={`mx-auto ${hasToc ? "max-w-[1040px]" : "max-w-[720px]"}`}>
          <ScrollReveal>
            <Link
              href="/projects/"
              className="inline-flex items-center text-sm text-foreground-muted hover:text-foreground mb-12 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t.backToProjects}
            </Link>
          </ScrollReveal>

          {hasToc ? (
            <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 items-start relative">
              {/* Left: Floating TOC (Desktop only) */}
              <aside className="hidden lg:block sticky top-32">
                <ProjectTableOfContents title={lang === "en" ? "On This Page" : "Daftar Isi"} minHeadings={2} />
              </aside>

              {/* Right: Main Content */}
              <div className="max-w-[720px]">
                <ScrollReveal>
                  <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                      {project.title}
                    </h1>

                    <p className="text-sm text-foreground-muted mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-subtle font-mono">
                      <span>{formatDate(project.date)}</span>
                      <ProjectActionLinks slug={project.slug} links={project.links} />
                    </div>
                  </header>
                </ScrollReveal>

                {/* Project Thumbnail / Animation Video Banner */}
                {project.animationVideoUrl ? (
                  <ScrollReveal delay={0.05}>
                    <div className="relative aspect-[16/9] mb-16 overflow-hidden rounded-none border border-border bg-background-elevated shadow-xl">
                      <video
                        src={project.animationVideoUrl}
                        poster={project.thumbnail || undefined}
                        controls
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </ScrollReveal>
                ) : project.thumbnail ? (
                  <ScrollReveal delay={0.05}>
                    <div className="relative aspect-[16/9] mb-16 overflow-hidden rounded-none border border-border bg-background-elevated shadow-xl">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </ScrollReveal>
                ) : null}

                <ScrollReveal delay={0.1}>
                  <div className="mb-16 p-6 bg-background-elevated border border-border rounded-none">
                    <h2 className="text-sm font-mono text-accent mb-4">{t.techStack}</h2>
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
                    className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-headings:font-sans prose-p:text-foreground-muted prose-a:text-accent hover:prose-a:text-foreground prose-strong:text-foreground prose-code:text-accent prose-code:bg-background-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none prose-code:text-sm prose-pre:bg-background-elevated prose-pre:border prose-pre:border-border prose-blockquote:border-l-accent prose-blockquote:text-foreground-muted"
                    dangerouslySetInnerHTML={{ __html: project.content }}
                  />
                </ScrollReveal>
              </div>
            </div>
          ) : (
            <div className="max-w-[720px] mx-auto">
              <ScrollReveal>
                <header className="mb-12">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                    {project.title}
                  </h1>

                  <p className="text-sm text-foreground-muted mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-foreground-subtle font-mono">
                    <span>{formatDate(project.date)}</span>
                    <ProjectActionLinks slug={project.slug} links={project.links} />
                  </div>
                </header>
              </ScrollReveal>

              {/* Project Thumbnail / Animation Video Banner */}
              {project.animationVideoUrl ? (
                <ScrollReveal delay={0.05}>
                  <div className="relative aspect-[16/9] mb-16 overflow-hidden rounded-none border border-border bg-background-elevated shadow-xl">
                    <video
                      src={project.animationVideoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </ScrollReveal>
              ) : project.thumbnail ? (
                <ScrollReveal delay={0.05}>
                  <div className="relative aspect-[16/9] mb-16 overflow-hidden rounded-none border border-border bg-background-elevated shadow-xl">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </ScrollReveal>
              ) : null}

              <ScrollReveal delay={0.1}>
                <div className="mb-16 p-6 bg-background-elevated border border-border rounded-none">
                  <h2 className="text-sm font-mono text-accent mb-4">{t.techStack}</h2>
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
                  className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-headings:font-sans prose-p:text-foreground-muted prose-a:text-accent hover:prose-a:text-foreground prose-strong:text-foreground prose-code:text-accent prose-code:bg-background-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none prose-code:text-sm prose-pre:bg-background-elevated prose-pre:border prose-pre:border-border prose-blockquote:border-l-accent prose-blockquote:text-foreground-muted"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
