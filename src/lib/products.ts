import "server-only";

import { prisma } from "@/lib/prisma";
import type {
  Category as PrismaCategory,
  Product as PrismaProduct,
} from "@/generated/prisma/client";
import type { Category, Product } from "@/lib/product-types";

export type { Category, Product } from "@/lib/product-types";
export { categories, formatPrice } from "@/lib/product-types";

function toProduct(product: PrismaProduct): Product {
  return {
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    images: product.images.length > 0 ? product.images : [product.image],
    isNew: product.isNew,
    onSale: product.onSale,
    description: product.description,
    sizes: product.sizes.length > 0 ? product.sizes : undefined,
  };
}

export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });
  return products.map(toProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? toProduct(product) : null;
}

export async function getProductsByCategory(category: Category) {
  const products = await prisma.product.findMany({
    where: { category: category as PrismaCategory },
    orderBy: { createdAt: "asc" },
  });
  return products.map(toProduct);
}

export async function getNewArrivals(limit = 6) {
  const products = await prisma.product.findMany({
    where: { isNew: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return products.map(toProduct);
}

export async function getSaleProducts() {
  const products = await prisma.product.findMany({
    where: { onSale: true },
    orderBy: { createdAt: "asc" },
  });
  return products.map(toProduct);
}

export async function getBrands() {
  const rows = await prisma.product.findMany({
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  return rows.map((row) => row.brand);
}

export async function searchProducts(query: string, limit = 6) {
  const q = query.trim();
  if (q.length < 2) return [];

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { brand: { contains: q, mode: "insensitive" } },
      ],
    },
    take: limit,
    orderBy: { name: "asc" },
  });

  return products.map(toProduct);
}
