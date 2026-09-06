// app/sitemap.ts
import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ripamustopa.dev";

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/notes",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  let noteRoutes: MetadataRoute.Sitemap = [];

  try {
    const projects = await prisma.project.findMany({ select: { slug: true, date: true } });
    projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB might not be seeded or accessible during build
  }

  try {
    const notes = await prisma.note.findMany({ select: { slug: true, date: true } });
    noteRoutes = notes.map((n) => ({
      url: `${baseUrl}/notes/${n.slug}`,
      lastModified: n.date ? new Date(n.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB might not be seeded or accessible during build
  }

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}
