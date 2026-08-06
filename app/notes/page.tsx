// app/notes/page.tsx
import { getAllNotes } from "@/lib/notes";
import ScrollReveal from "@/components/ui/ScrollReveal";
import NoteCard from "@/components/ui/NoteCard";

export const metadata = {
  title: "Notes — Your Name",
  description: "Engineering notes, decision logs, and technical learnings.",
};

export default async function NotesPage() {
  const notes = await getAllNotes();

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom max-w-[900px]">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-mono text-sm text-accent mb-3">LEARNING LOG</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Notes
            </h1>
            <p className="text-foreground-muted max-w-xl text-lg">
              Raw technical notes from building software. No fluff, just
              decisions and outcomes.
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
