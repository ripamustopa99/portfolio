// components/sections/RecentNotes.tsx
import { getRecentNotes } from "@/lib/notes";
import ScrollReveal from "@/components/ui/ScrollReveal";
import NoteCard from "@/components/ui/NoteCard";
import GlowButton from "@/components/ui/GlowButton";
import { getLang } from "@/lib/get-lang";
import { translations } from "@/lib/translations";

export default async function RecentNotes() {
  const lang = await getLang();
  const t = translations[lang as "en" | "id"].recentNotes;
  const notes = await getRecentNotes(3, lang);

  return (
    <section className="section-padding border-t border-border">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-sm text-accent mb-3">
                {t.badge}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.title}
              </h2>
            </div>
            <GlowButton
              href="/notes/"
              variant="secondary"
              className="hidden md:inline-flex"
            >
              {t.viewAll}
            </GlowButton>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-border border-t border-border">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <GlowButton href="/notes/" variant="secondary" className="w-full">
            {t.viewAll}
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
