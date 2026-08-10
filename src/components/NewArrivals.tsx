import Link from "next/link";
import { getNewArrivals } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function NewArrivals() {
  const items = getNewArrivals();

  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
          New Arrivals
        </h2>
        <Link
          href="/shop?filter=new"
          className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-700 transition-colors hover:text-black"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
