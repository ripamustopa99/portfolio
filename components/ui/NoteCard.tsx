// components/ui/NoteCard.tsx
import Link from "next/link";
import { Note } from "@/types";
import { formatDate } from "@/lib/utils";
import Tag from "./Tag";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="group">
      <Link
        href={`/notes/${note.slug}/`}
        className="block py-6 border-b border-border"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">
              {note.title}
            </h3>
            <p className="text-foreground-muted text-sm line-clamp-2 max-w-2xl">
              {note.description}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex gap-2">
              {note.tags?.slice(0, 2).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <time className="text-foreground-subtle text-sm font-mono">
              {formatDate(note.date)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
