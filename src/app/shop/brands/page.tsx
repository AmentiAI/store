import { getBrands, getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-5xl">
        Brands
      </h1>
      <p className="mt-2 max-w-lg text-sm text-muted">
        Sought-after labels, carefully curated and authenticity verified.
      </p>

      <div className="mt-10 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <span
            key={brand}
            className="shrink-0 border-2 border-accent px-4 py-2.5 text-sm font-medium"
          >
            {brand}
          </span>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
