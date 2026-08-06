// lib/projects.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Project } from "@/types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<Project[]> {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return [];
    }
    const fileNames = fs.readdirSync(projectsDirectory);

    const projects = await Promise.all(
      fileNames
        .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx?$/, "");
          const fullPath = path.join(projectsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          const processedContent = await remark().use(html).process(content);
          const contentHtml = processedContent.toString();

          return {
            slug,
            content: contentHtml,
            ...(data as Omit<Project, "slug" | "content">),
          } as Project;
        }),
    );

    return projects.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      ...(data as Omit<Project, "slug" | "content">),
    } as Project;
  } catch {
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured).slice(0, 3);
}
