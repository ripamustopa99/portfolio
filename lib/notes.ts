// lib/notes.ts
import { prisma } from "@/lib/prisma";
import { Note } from "@/types";
import { remark } from "remark";
import html from "remark-html";

export async function getAllNotes(language: string = "en"): Promise<Note[]> {
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
}

export async function getNoteBySlug(slug: string, language: string = "en"): Promise<Note | null> {
  try {
    let n = await prisma.note.findUnique({
      where: { slug_language: { slug, language } },
    });

    if (!n) {
      n = await prisma.note.findUnique({
        where: { slug_language: { slug, language: "en" } },
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
}

export async function getRecentNotes(limit: number = 3, language: string = "en"): Promise<Note[]> {
  const notes = await getAllNotes(language);
  return notes.slice(0, limit);
}
