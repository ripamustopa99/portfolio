// app/api/notes/route.ts
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
      const note = await prisma.note.findUnique({
        where: { slug_language: { slug, language } },
      });
      return NextResponse.json(note);
    }

    const where: Record<string, unknown> = { language };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ];
    }

    const [totalCount, dbNotes] = await Promise.all([
      prisma.note.count({ where }),
      prisma.note.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const notes = dbNotes.map((n) => ({
      slug: n.slug,
      title: n.title,
      description: n.description,
      date: n.date.toISOString().split("T")[0],
      tags: n.tags,
      content: n.content,
    }));

    return NextResponse.json({
      notes,
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
    const { slug, title, description, language, date, tags, content } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: "Slug and title are required" }, { status: 400 });
    }

    const note = await prisma.note.upsert({
      where: { slug_language: { slug, language: language || "en" } },
      update: {
        title,
        description,
        date: date ? new Date(date) : new Date(),
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((s: string) => s.trim()) : []),
        content,
      },
      create: {
        slug,
        title,
        description: description || "",
        language: language || "en",
        date: date ? new Date(date) : new Date(),
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((s: string) => s.trim()) : []),
        content: content || "",
      },
    });

    return NextResponse.json({ success: true, note });
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

    await prisma.note.delete({
      where: { slug_language: { slug, language } },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
