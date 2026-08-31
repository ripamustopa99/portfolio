// lib/projects.ts
import { prisma } from "@/lib/prisma";
import { Project } from "@/types";
import { remark } from "remark";
import html from "remark-html";

export async function getAllProjects(language: string = "en"): Promise<Project[]> {
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
}

export async function getProjectBySlug(slug: string, language: string = "en"): Promise<Project | null> {
  try {
    let p = await prisma.project.findUnique({
      where: { slug_language: { slug, language } },
    });

    if (!p) {
      p = await prisma.project.findUnique({
        where: { slug_language: { slug, language: "en" } },
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
}

export async function getFeaturedProjects(language: string = "en"): Promise<Project[]> {
  const projects = await getAllProjects(language);
  return projects.filter((p) => p.featured).slice(0, 3);
}
