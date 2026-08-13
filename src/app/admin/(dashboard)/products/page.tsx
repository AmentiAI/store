import Image from "next/image";
import Link from "next/link";
import { deleteProduct } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/product-types";

export const metadata = { title: "Admin Products" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Upload images, edit prices and descriptions — {products.length}{" "}
            listed
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-black px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white"
        >
          Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
          <p className="text-sm text-neutral-600">No products yet.</p>
          <Link
            href="/admin/products/new"
            className="mt-4 inline-block bg-black px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden border border-neutral-200 bg-white"
            >
              <div className="relative aspect-[4/5] bg-neutral-100">
                <Image
                  src={product.image}
                  alt={`${product.brand} ${product.name}`}
                  fill
                  unoptimized={product.image.startsWith("/uploads/")}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {(product.images.length || 1) > 1 && (
                  <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-white">
                    {product.images.length || 1} photos
                  </span>
                )}
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
                    {product.brand}
                  </p>
                  <h2 className="mt-1 font-medium leading-snug">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <p className="font-semibold">{formatPrice(product.price)}</p>
                  <p className="text-neutral-500">
                    Stock {product.stock} · {product.category}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="min-h-11 flex-1 bg-black px-3 py-2.5 text-center text-[11px] font-semibold tracking-[0.12em] uppercase text-white"
                  >
                    Edit
                  </Link>
                  <form action={deleteProduct} className="shrink-0">
                    <input type="hidden" name="id" value={product.id} />
                    <button
                      type="submit"
                      className="min-h-11 border border-neutral-300 px-3 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-red-600 hover:border-red-600"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
