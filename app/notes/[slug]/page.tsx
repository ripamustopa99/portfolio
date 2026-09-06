// app/notes/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { formatDate, getReadingTime } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectTableOfContents from "@/components/ui/ProjectTableOfContents";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const notes = await getAllNotes("en");
  if (notes.length === 0) {
    return [{ slug: "sample-note" }];
  }
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang();
  const note = await getNoteBySlug(slug, lang);
  if (!note) return { title: "Not Found" };

  return {
    title: `${note.title} — Notes`,
    description: note.description,
    openGraph: {
      title: `${note.title} — Notes`,
      description: note.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} — Notes`,
      description: note.description,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].notesPage;
  const note = await getNoteBySlug(slug, lang);

  if (!note) {
    notFound();
  }

  const h2Count = (note.content.match(/<h2/g) || []).length;
  const hasToc = h2Count >= 2;
  const readingTime = getReadingTime(note.content, lang);

  return (
    <article className="pt-32 pb-24">
      <div className="container-custom">
        <div className={`mx-auto ${hasToc ? "max-w-[1040px]" : "max-w-[720px]"}`}>
          <ScrollReveal>
            <Link
              href="/notes/"
              className="inline-flex items-center text-sm text-foreground-muted hover:text-foreground mb-12 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t.backToNotes}
            </Link>
          </ScrollReveal>

          {hasToc ? (
            <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12 items-start relative">
              {/* Left: Floating TOC */}
              <aside className="hidden lg:block sticky top-32">
                <ProjectTableOfContents title={lang === "en" ? "On This Page" : "Daftar Isi"} minHeadings={2} />
              </aside>

              {/* Right: Main Content */}
              <div className="max-w-[720px]">
                <ScrollReveal>
                  <header className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {note.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                      {note.title}
                    </h1>

                    <div className="flex items-center gap-4 text-sm text-foreground-subtle font-mono">
                      <time>{formatDate(note.date)}</time>
                      <span>•</span>
                      <span>{readingTime}</span>
                    </div>
                  </header>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div
                    className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-headings:font-sans prose-p:text-foreground-muted prose-a:text-accent hover:prose-a:text-foreground prose-strong:text-foreground prose-code:text-accent prose-code:bg-background-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-background-elevated prose-pre:border prose-pre:border-border prose-blockquote:border-l-accent prose-blockquote:text-foreground-muted"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </ScrollReveal>
              </div>
            </div>
          ) : (
            <div className="max-w-[720px] mx-auto">
              <ScrollReveal>
                <header className="mb-12">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {note.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                    {note.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-foreground-subtle font-mono">
                    <time>{formatDate(note.date)}</time>
                    <span>•</span>
                    <span>{readingTime}</span>
                  </div>
                </header>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div
                  className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-headings:font-sans prose-p:text-foreground-muted prose-a:text-accent hover:prose-a:text-foreground prose-strong:text-foreground prose-code:text-accent prose-code:bg-background-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-background-elevated prose-pre:border prose-pre:border-border prose-blockquote:border-l-accent prose-blockquote:text-foreground-muted"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
