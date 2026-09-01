// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") || "en";
    const slug = searchParams.get("slug");

    if (slug) {
      const project = await prisma.project.findUnique({
        where: { slug_language: { slug, language } },
      });
      return NextResponse.json(project);
    }

    const projects = await prisma.project.findMany({
      where: { language },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(projects);
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
