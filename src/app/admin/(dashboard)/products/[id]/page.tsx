import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return { title: product ? `Edit ${product.name}` : "Edit Product" };
}

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500 hover:text-black"
      >
        ← Products
      </Link>
      <h1 className="mt-3 mb-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Edit product
      </h1>
      <p className="mb-6 text-sm text-neutral-600">
        Update the image, price, description, or listing details.
      </p>
      <ProductForm product={product} />
    </div>
  );
}
