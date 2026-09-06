// lib/projects.ts
import { prisma } from "@/lib/prisma";
import { Project } from "@/types";
import { remark } from "remark";
import html from "remark-html";
import { unstable_cache } from "next/cache";

export const getAllProjects = unstable_cache(
  async (language: string = "en"): Promise<Project[]> => {
    try {
      const dbProjects = await prisma.project.findMany({
        where: { language },
        orderBy: { date: "desc" },
      });

      if (dbProjects.length === 0 && language !== "en") {
        return getAllProjects("en");
      }

      return dbProjects.map((p) => {
        let techStack = [];
        try {
          techStack = p.techStack ? JSON.parse(p.techStack) : [];
        } catch {
          techStack = [];
        }

        let links = {};
        try {
          links = p.links ? JSON.parse(p.links) : {};
        } catch {
          links = {};
        }

        return {
          slug: p.slug,
          title: p.title,
          description: p.description,
          date: p.date.toISOString().split("T")[0],
          thumbnail: p.thumbnail || "",
          animationVideoUrl: p.animationVideoUrl || undefined,
          tags: p.tags,
          techStack,
          links,
          featured: p.featured,
          content: p.content,
        } as Project;
      });
    } catch {
      return [];
    }
  },
  ["all-projects"],
  { tags: ["projects"] }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string, language: string = "en"): Promise<Project | null> => {
    try {
      let p = await prisma.project.findUnique({
        where: { slug_language: { slug, language } },
      });

      if (!p) {
        p = await prisma.project.findUnique({
          where: { slug_language: { slug, language: "en" } },
        });
      }

      if (!p) {
        p = await prisma.project.findFirst({
          where: { slug },
        });
      }

      if (!p) return null;

      let techStack = [];
      try {
        techStack = p.techStack ? JSON.parse(p.techStack) : [];
      } catch {
        techStack = [];
      }

      let links = {};
      try {
        links = p.links ? JSON.parse(p.links) : {};
      } catch {
        links = {};
      }

      let processedHtml = p.content;
      if (!p.content.includes("<p>") && !p.content.includes("<h2>")) {
        const processed = await remark().use(html).process(p.content);
        processedHtml = processed.toString();
      }

      return {
        slug: p.slug,
        title: p.title,
        description: p.description,
        date: p.date.toISOString().split("T")[0],
        thumbnail: p.thumbnail || "",
        animationVideoUrl: p.animationVideoUrl || undefined,
        tags: p.tags,
        techStack,
        links,
        featured: p.featured,
        content: processedHtml,
      } as Project;
    } catch {
      return null;
    }
  },
  ["project-by-slug"],
  { tags: ["projects"] }
);

export async function getFeaturedProjects(language: string = "en"): Promise<Project[]> {
  const projects = await getAllProjects(language);
  return projects.filter((p) => p.featured).slice(0, 3);
}

export async function getPaginatedProjects(
  language: string = "en",
  page: number = 1,
  pageSize: number = 10
): Promise<{ projects: Project[]; totalCount: number; totalPages: number }> {
  const allProjects = await getAllProjects(language);
  const totalCount = allProjects.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));
  const projects = allProjects.slice((validPage - 1) * pageSize, validPage * pageSize);
  return { projects, totalCount, totalPages };
}
