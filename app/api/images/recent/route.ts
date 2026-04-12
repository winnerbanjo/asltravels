import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { ImageModel } from "@/models/Image";

export async function GET() {
  const user = await getSession();

  if (!user) {
    return NextResponse.json({ images: [] });
  }

  await connectToDatabase();
  const images = await ImageModel.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return NextResponse.json({
    images: images.map((image) => ({
      id: String(image._id),
      originalUrl: image.originalUrl,
      generatedUrl: image.generatedUrl,
      action: image.action,
      option: image.option,
      createdAt: image.createdAt,
    })),
  });
}
