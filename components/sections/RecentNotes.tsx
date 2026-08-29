// components/sections/RecentNotes.tsx
import { getRecentNotes } from "@/lib/notes";
import ScrollReveal from "@/components/ui/ScrollReveal";
import NoteCard from "@/components/ui/NoteCard";
import GlowButton from "@/components/ui/GlowButton";

export default async function RecentNotes() {
  const notes = await getRecentNotes(3);

  return (
    <section className="section-padding border-t border-border">
      <div className="container-custom">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-sm text-accent mb-3">
                CATATAN TEKNIS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Catatan Terbaru
              </h2>
            </div>
            <GlowButton
              href="/notes/"
              variant="secondary"
              className="hidden md:inline-flex"
            >
              All Notes
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
            All Notes
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
