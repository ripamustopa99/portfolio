// app/notes/page.tsx
import { getAllNotes } from "@/lib/notes";
import ScrollReveal from "@/components/ui/ScrollReveal";
import NoteCard from "@/components/ui/NoteCard";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: lang === "en" ? "Notes — Ripa Mustopa A" : "Catatan — Ripa Mustopa A",
    description: lang === "en" ? "Engineering notes, decision logs, and technical learnings." : "Catatan teknik, log keputusan, dan pembelajaran teknis.",
  };
}

export default async function NotesPage() {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].notesPage;
  const notes = await getAllNotes(lang);

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom max-w-[900px]">
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

        <div className="divide-y divide-border border-t border-border">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}
