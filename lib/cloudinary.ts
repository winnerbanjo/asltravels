import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
export const hasCloudinaryConfig = Boolean(cloudName && apiKey && apiSecret);

if (!hasCloudinaryConfig) {
  console.warn("Cloudinary environment variables are missing.");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export function uploadToCloudinary(file: string, folderSuffix: string) {
  if (!hasCloudinaryConfig) {
    throw new Error("Cloudinary is not configured.");
  }

  return cloudinary.uploader.upload(file, {
    folder: `${process.env.CLOUDINARY_UPLOAD_FOLDER || "ai-studio"}/${folderSuffix}`,
    resource_type: "image",
  });
}
