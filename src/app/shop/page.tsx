import { ProductCard } from "@/components/ProductCard";
import {
  getBrands,
  getNewArrivals,
  getProducts,
  getSaleProducts,
} from "@/lib/products";
import Link from "next/link";

type SearchParams = Promise<{ filter?: string }>;

export const metadata = {
  title: "Shop All",
};

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filter = params.filter;

  let items = await getProducts();
  let title = "Shop All";

  if (filter === "new") {
    items = await getNewArrivals(100);
    title = "New Arrivals";
  } else if (filter === "sale") {
    items = await getSaleProducts();
    title = "Sale";
  }

  const brands = await getBrands();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
            Catalog
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {items.length} piece{items.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          <Link
            href="/shop"
            className={`shrink-0 border-2 px-3 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase ${
              !filter
                ? "border-accent bg-accent text-white"
                : "border-accent hover:bg-accent hover:text-white"
            }`}
          >
            All
          </Link>
          <Link
            href="/shop?filter=new"
            className={`shrink-0 border-2 px-3 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase ${
              filter === "new"
                ? "border-accent bg-accent text-white"
                : "border-accent hover:bg-accent hover:text-white"
            }`}
          >
            New
          </Link>
          {["clothing", "shoes", "accessories"].map((cat) => (
            <Link
              key={cat}
              href={`/shop/${cat}`}
              className="shrink-0 border-2 border-accent px-3 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-accent hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {filter === "sale" && (
        <p className="mb-8 max-w-xl text-sm text-muted">
          Select pieces marked down while they last. Authenticity still
          guaranteed.
        </p>
      )}

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <section className="mt-16 border-t-2 border-accent pt-10">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-2xl tracking-tight">
          Featured Brands
        </h2>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <Link
              key={brand}
              href="/shop/brands"
              className="shrink-0 border-2 border-accent px-3 py-2 text-xs font-medium hover:bg-accent hover:text-white"
            >
              {brand}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
