import "server-only";

import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { MAX_PRODUCT_IMAGES } from "@/lib/product-types";

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

export async function resolveProductImages(formData: FormData): Promise<string[]> {
  const order = String(formData.get("galleryOrder") ?? "")
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
  const urls = formData
    .getAll("existingImages")
    .map((value) => String(value).trim())
    .filter(Boolean);
  const files = formData
    .getAll("imageFiles")
    .filter((value): value is File => value instanceof File && value.size > 0);

  const images: string[] = [];
  let urlIndex = 0;
  let fileIndex = 0;

  const tokens = order.length > 0 ? order : [
    ...urls.map(() => "u"),
    ...files.map(() => "f"),
  ];

  for (const token of tokens) {
    if (images.length >= MAX_PRODUCT_IMAGES) break;
    if (token === "u") {
      const url = urls[urlIndex++];
      if (url) images.push(url);
      continue;
    }
    if (token === "f") {
      const file = files[fileIndex++];
      if (file) images.push(await saveProductImage(file));
    }
  }

  if (images.length === 0) {
    throw new Error("Add at least one product image.");
  }

  return images;
}
