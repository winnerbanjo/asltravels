import { NextResponse } from "next/server";
import { hasCloudinaryConfig, uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "A file is required." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = file.type || "image/jpeg";
    const dataUri = `data:${mimeType};base64,${base64}`;

    if (!hasCloudinaryConfig) {
      console.warn("Upload falling back to inline storage: Cloudinary not configured.");
      return NextResponse.json({ url: dataUri, storage: "inline" });
    }

    try {
      const upload = await uploadToCloudinary(dataUri, "originals");

      return NextResponse.json({ url: upload.secure_url, storage: "cloudinary" });
    } catch (cloudinaryError) {
      console.error("Cloudinary upload failed, using inline fallback:", cloudinaryError);

      return NextResponse.json({
        url: dataUri,
        storage: "inline-fallback",
      });
    }
  } catch (error) {
    console.error("Upload error", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
