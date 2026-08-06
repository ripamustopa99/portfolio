// app/notes/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { formatDate } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const notes = await getAllNotes();
  if (notes.length === 0) {
    return [{ slug: "sample-note" }];
  }
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) return { title: "Not Found" };

  return {
    title: `${note.title} — Notes`,
    description: note.description,
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24">
      <div className="container-custom max-w-[720px]">
        <ScrollReveal>
          <Link
            href="/notes/"
            className="inline-flex items-center text-sm text-foreground-muted hover:text-foreground mb-12 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Notes
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {note.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {note.title}
            </h1>

            <time className="text-sm text-foreground-subtle font-mono">
              {formatDate(note.date)}
            </time>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-headings:font-sans prose-p:text-foreground-muted prose-a:text-accent hover:prose-a:text-foreground prose-strong:text-foreground prose-code:text-accent prose-code:bg-background-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-background-elevated prose-pre:border prose-pre:border-border prose-blockquote:border-l-accent prose-blockquote:text-foreground-muted"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </ScrollReveal>
      </div>
    </article>
  );
}
