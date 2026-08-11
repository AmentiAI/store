"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { resolveProductImage } from "@/lib/uploads";
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

function revalidateCatalog(productId?: string) {
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/shop/brands");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  if (productId) {
    revalidatePath(`/admin/products/${productId}`);
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

  let image: string;
  try {
    image = await resolveProductImage(formData);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Image upload failed.",
    };
  }

  try {
    await prisma.product.create({
      data: {
        slug,
        brand,
        name,
        price,
        category,
        image,
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

  revalidateCatalog();
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
  const existingImage = String(formData.get("existingImage") ?? "").trim();

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

  let image: string;
  try {
    image = await resolveProductImage(formData, existingImage);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Image upload failed.",
    };
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        slug,
        brand,
        name,
        price,
        category,
        image,
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

  revalidateCatalog(id);
  return { success: "Product saved." };
}

export async function deleteProduct(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.product.delete({ where: { id } });
  revalidateCatalog();
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
