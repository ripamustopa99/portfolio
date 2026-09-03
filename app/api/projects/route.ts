// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") || "en";
    const slug = searchParams.get("slug");
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search") || "";

    if (slug) {
      const project = await prisma.project.findUnique({
        where: { slug_language: { slug, language } },
      });
      return NextResponse.json(project);
    }

    const where: Record<string, unknown> = { language };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const [totalCount, dbProjects] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const projects = dbProjects.map((p) => {
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
        id: p.id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        language: p.language,
        date: p.date.toISOString().split("T")[0],
        thumbnail: p.thumbnail || "",
        animationVideoUrl: p.animationVideoUrl || undefined,
        tags: p.tags,
        techStack,
        links,
        featured: p.featured,
        content: p.content,
      };
    });

    return NextResponse.json({
      projects,
      totalCount,
      totalPages,
      currentPage: page,
      pageSize,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, title, description, language, date, thumbnail, animationVideoUrl, tags, techStack, links, featured, content } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and title are required" }, { status: 400 });
    }

    const project = await prisma.project.upsert({
      where: { slug_language: { slug, language: language || "en" } },
      update: {
        title,
        description,
        date: date ? new Date(date) : new Date(),
        thumbnail,
        animationVideoUrl,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((s: string) => s.trim()) : []),
        techStack: typeof techStack === "string" ? techStack : JSON.stringify(techStack || []),
        links: typeof links === "string" ? links : JSON.stringify(links || {}),
        featured: Boolean(featured),
        content,
      },
      create: {
        slug,
        title,
        description: description || "",
        language: language || "en",
        date: date ? new Date(date) : new Date(),
        thumbnail: thumbnail || "",
        animationVideoUrl: animationVideoUrl || null,
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((s: string) => s.trim()) : []),
        techStack: typeof techStack === "string" ? techStack : JSON.stringify(techStack || []),
        links: typeof links === "string" ? links : JSON.stringify(links || {}),
        featured: Boolean(featured),
        content: content || "",
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const language = searchParams.get("language") || "en";

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await prisma.project.delete({
      where: { slug_language: { slug, language } },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
