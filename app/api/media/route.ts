// app/api/media/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import crypto from "crypto";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 12;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { filename: { contains: search, mode: "insensitive" } },
        { url: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category && category !== "all") {
      where.category = category;
    }

    const [totalCount, media] = await Promise.all([
      prisma.media.count({ where }),
      prisma.media.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      media,
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

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: "Media asset not found in database" }, { status: 404 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret && media.publicId) {
      try {
        const timestamp = Math.floor(Date.now() / 1000);
        const stringToSign = `public_id=${media.publicId}&timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("public_id", media.publicId);
        cloudinaryFormData.append("api_key", apiKey);
        cloudinaryFormData.append("timestamp", timestamp.toString());
        cloudinaryFormData.append("signature", signature);

        const destroyUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${media.resourceType || "image"}/destroy`;
        const clouRes = await fetch(destroyUrl, {
          method: "POST",
          body: cloudinaryFormData,
        });
        const clouData = await clouRes.json();

        if (!clouRes.ok) {
          return NextResponse.json(
            { error: `Cloudinary API error: ${clouData.error?.message || "Failed to delete from cloud"}` },
            { status: 400 }
          );
        }

        if (clouData.result !== "ok" && clouData.result !== "not found") {
          return NextResponse.json(
            { error: `Cloudinary deletion failed with result: ${clouData.result}` },
            { status: 400 }
          );
        }
      } catch (netErr: unknown) {
        const msg = netErr instanceof Error ? netErr.message : "Network error";
        return NextResponse.json(
          { error: `Network connection error while contacting Cloudinary: ${msg}. Deletion aborted.` },
          { status: 503 }
        );
      }
    }

    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
