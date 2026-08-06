// lib/notes.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Note } from "@/types";

const notesDirectory = path.join(process.cwd(), "content/notes");

export async function getAllNotes(): Promise<Note[]> {
  try {
    if (!fs.existsSync(notesDirectory)) {
      return [];
    }
    const fileNames = fs.readdirSync(notesDirectory);

    const notes = await Promise.all(
      fileNames
        .filter((name) => name.endsWith(".md"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, "");
          const fullPath = path.join(notesDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          const processedContent = await remark().use(html).process(content);
          const contentHtml = processedContent.toString();

          return {
            slug,
            content: contentHtml,
            ...(data as Omit<Note, "slug" | "content">),
          } as Note;
        }),
    );

    return notes.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch {
    return [];
  }
}

export async function getNoteBySlug(slug: string): Promise<Note | null> {
  try {
    const fullPath = path.join(notesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      ...(data as Omit<Note, "slug" | "content">),
    } as Note;
  } catch {
    return null;
  }
}

export async function getRecentNotes(limit: number = 3): Promise<Note[]> {
  const notes = await getAllNotes();
  return notes.slice(0, limit);
}
