// lib/notes.ts
import { prisma } from "@/lib/prisma";
import { Note } from "@/types";
import { remark } from "remark";
import html from "remark-html";
import { unstable_cache } from "next/cache";

export const getAllNotes = unstable_cache(
  async (language: string = "en"): Promise<Note[]> => {
    try {
      const dbNotes = await prisma.note.findMany({
        where: { language },
        orderBy: { date: "desc" },
      });

      if (dbNotes.length === 0 && language !== "en") {
        return getAllNotes("en");
      }

      return dbNotes.map((n) => ({
        slug: n.slug,
        title: n.title,
        description: n.description,
        date: n.date.toISOString().split("T")[0],
        tags: n.tags,
        content: n.content,
      } as Note));
    } catch {
      return [];
    }
  },
  ["all-notes"],
  { tags: ["notes"] }
);

export const getNoteBySlug = unstable_cache(
  async (slug: string, language: string = "en"): Promise<Note | null> => {
    try {
      let n = await prisma.note.findUnique({
        where: { slug_language: { slug, language } },
      });

      if (!n) {
        n = await prisma.note.findUnique({
          where: { slug_language: { slug, language: "en" } },
        });
      }

      if (!n) {
        n = await prisma.note.findFirst({
          where: { slug },
        });
      }

      if (!n) return null;

      let processedHtml = n.content;
      if (!n.content.includes("<p>") && !n.content.includes("<h2>")) {
        const processed = await remark().use(html).process(n.content);
        processedHtml = processed.toString();
      }

      return {
        slug: n.slug,
        title: n.title,
        description: n.description,
        date: n.date.toISOString().split("T")[0],
        tags: n.tags,
        content: processedHtml,
      } as Note;
    } catch {
      return null;
    }
  },
  ["note-by-slug"],
  { tags: ["notes"] }
);

export async function getRecentNotes(limit: number = 3, language: string = "en"): Promise<Note[]> {
  const notes = await getAllNotes(language);
  return notes.slice(0, limit);
}

export async function getPaginatedNotes(
  language: string = "en",
  page: number = 1,
  pageSize: number = 10
): Promise<{ notes: Note[]; totalCount: number; totalPages: number }> {
  const allNotes = await getAllNotes(language);
  const totalCount = allNotes.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));
  const notes = allNotes.slice((validPage - 1) * pageSize, validPage * pageSize);
  return { notes, totalCount, totalPages };
}
