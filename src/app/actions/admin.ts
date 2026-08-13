"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { resolveProductImages } from "@/lib/uploads";
import {
  ANNOUNCEMENT_KEY,
  clampAnnouncement,
} from "@/lib/site-settings";
import type { Category, OrderStatus } from "@/generated/prisma/client";

export type AdminState = {
  error?: string;
  success?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseSizes(value: string) {
  return value
    .split(",")
    .map((size) => size.trim())
    .filter(Boolean);
}

function revalidateCatalog(opts?: {
  productId?: string;
  slug?: string;
}) {
  revalidatePath("/", "layout");
  revalidatePath("/shop", "layout");
  revalidatePath("/shop/clothing");
  revalidatePath("/shop/shoes");
  revalidatePath("/shop/accessories");
  revalidatePath("/shop/brands");
  revalidatePath("/admin", "layout");
  if (opts?.slug) {
    revalidatePath(`/product/${opts.slug}`);
  }
  if (opts?.productId) {
    revalidatePath(`/admin/products/${opts.productId}`);
  }
}

export async function createProduct(
  _prev: AdminState,
  formData: FormData,
): Promise<AdminState> {
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized." };

  const brand = String(formData.get("brand") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = String(formData.get("category") ?? "") as Category;
  const description = String(formData.get("description") ?? "").trim();
  const sizes = parseSizes(String(formData.get("sizes") ?? ""));
  const stock = Number(formData.get("stock") ?? 1);
  const isNew = formData.get("isNew") === "on";
  const onSale = formData.get("onSale") === "on";
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput || slugify(`${brand}-${name}`);

  if (!brand || !name || !description || !Number.isFinite(price) || price < 0) {
    return { error: "Brand, name, price, and description are required." };
  }

  if (!["clothing", "shoes", "accessories"].includes(category)) {
    return { error: "Pick a valid category." };
  }

  let images: string[];
  try {
    images = await resolveProductImages(formData);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Image upload failed.",
    };
  }

  const cover = images[0];
  if (!cover) return { error: "Add at least one product image." };

  try {
    await prisma.product.create({
      data: {
        slug,
        brand,
        name,
        price,
        category,
        image: cover,
        images,
        description,
        sizes,
        stock: Number.isFinite(stock) ? stock : 1,
        isNew,
        onSale,
      },
    });
  } catch {
    return { error: "Could not create product. Slug may already exist." };
  }

  revalidateCatalog({ slug });
  redirect("/admin/products");
}

export async function updateProduct(
  _prev: AdminState,
  formData: FormData,
): Promise<AdminState> {
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized." };

  const id = String(formData.get("id") ?? "");
  const brand = String(formData.get("brand") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = String(formData.get("category") ?? "") as Category;
  const description = String(formData.get("description") ?? "").trim();
  const sizes = parseSizes(String(formData.get("sizes") ?? ""));
  const stock = Number(formData.get("stock") ?? 1);
  const isNew = formData.get("isNew") === "on";
  const onSale = formData.get("onSale") === "on";
  const slug = String(formData.get("slug") ?? "").trim();

  if (
    !id ||
    !brand ||
    !name ||
    !slug ||
    !description ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return { error: "Fill in brand, name, slug, price, and description." };
  }

  let images: string[];
  try {
    images = await resolveProductImages(formData);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Image upload failed.",
    };
  }

  const cover = images[0];
  if (!cover) return { error: "Add at least one product image." };

  try {
    await prisma.product.update({
      where: { id },
      data: {
        slug,
        brand,
        name,
        price,
        category,
        image: cover,
        images,
        description,
        sizes,
        stock: Number.isFinite(stock) ? stock : 1,
        isNew,
        onSale,
      },
    });
  } catch {
    return { error: "Could not update product." };
  }

  revalidateCatalog({ productId: id, slug });
  return { success: "Product saved." };
}

export async function deleteProduct(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const existing = await prisma.product.findUnique({
    where: { id },
    select: { slug: true },
  });
  if (!existing) {
    redirect("/admin/products");
  }

  await prisma.product.delete({ where: { id } });
  revalidateCatalog({ productId: id, slug: existing.slug });
  redirect("/admin/products");
}

export async function updateOrderStatus(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as OrderStatus;
  const valid: OrderStatus[] = [
    "PENDING",
    "PAID",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];
  if (!id || !valid.includes(status)) return;

  await prisma.order.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}

export async function updateAnnouncement(
  _prev: AdminState,
  formData: FormData,
): Promise<AdminState> {
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized." };

  const announcement = clampAnnouncement(
    String(formData.get("announcement") ?? ""),
  );
  if (!announcement) {
    return { error: "Enter announcement text, or keep the current copy." };
  }

  await prisma.siteSetting.upsert({
    where: { key: ANNOUNCEMENT_KEY },
    update: { value: announcement },
    create: { key: ANNOUNCEMENT_KEY, value: announcement },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { success: "Announcement saved." };
}
