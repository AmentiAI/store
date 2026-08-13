import { getBrands, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "Brands",
};

export default async function BrandsPage() {
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <Link
        href="/shop"
        className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted hover:text-accent"
      >
        ← Shop All
      </Link>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
        Brands
      </h1>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Sought-after labels, carefully curated and authenticity verified.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {brands.map((brand) => (
          <span
            key={brand}
            className="border border-line px-4 py-2.5 text-sm font-medium"
          >
            {brand}
          </span>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
