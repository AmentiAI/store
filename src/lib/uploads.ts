import "server-only";

import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = 8 * 1024 * 1024;

function extensionFor(type: string) {
  switch (type) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "jpg";
  }
}

function assertValidImage(file: File) {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Use a JPG, PNG, WEBP, or GIF image.");
  }
  if (file.size <= 0) {
    throw new Error("Image file is empty.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 8MB or smaller.");
  }
}

function getBlobToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim().replace(/^["']|["']$/g, "");
  if (!token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is missing. Add it in .env locally and in Vercel → Settings → Environment Variables.",
    );
  }
  return token;
}

export async function saveProductImage(file: File): Promise<string> {
  assertValidImage(file);
  const token = getBlobToken();

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${extensionFor(file.type)}`;

  const blob = await put(`products/${filename}`, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
    token,
  });

  return blob.url;
}

export async function resolveProductImage(
  formData: FormData,
  existingImage?: string,
): Promise<string> {
  const file = formData.get("imageFile");
  if (file instanceof File && file.size > 0) {
    return saveProductImage(file);
  }

  const imageUrl = String(formData.get("image") ?? "").trim();
  if (imageUrl) return imageUrl;
  if (existingImage) return existingImage;

  throw new Error("Upload a product image or paste an image URL.");
}
