// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const resourceType = (formData.get("resourceType") as string) || "auto"; // image, video, auto

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary credentials not configured" }, { status: 500 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Math.floor(Date.now() / 1000);

    // Generate signature for signed upload
    const signatureString = `timestamp=${timestamp}&upload_preset=portfolio_preset${apiSecret}`;
    // Or simpler: signature using just timestamp and api_secret
    const stringToSign = `timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", new Blob([buffer]), file.name);
    cloudinaryFormData.append("api_key", apiKey);
    cloudinaryFormData.append("timestamp", timestamp.toString());
    cloudinaryFormData.append("signature", signature);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: cloudinaryFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "Upload failed" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      resourceType: data.resource_type,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
