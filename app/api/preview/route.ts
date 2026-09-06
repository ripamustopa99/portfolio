// app/api/preview/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { remark } from "remark";
import html from "remark-html";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ html: "" });
    }

    const processed = await remark().use(html).process(content);
    const processedHtml = processed.toString();

    return NextResponse.json({ success: true, html: processedHtml });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
