import { ProductCard } from "@/components/ProductCard";
import {
  getProductsByCategory,
  type Category,
} from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";

const validCategories: Category[] = ["clothing", "shoes", "accessories"];

export const dynamic = "force-dynamic";

const titles: Record<Category, string> = {
  clothing: "Clothing",
  shoes: "Shoes",
  accessories: "Accessories",
};

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  if (!validCategories.includes(category as Category)) {
    return { title: "Not Found" };
  }
  return { title: titles[category as Category] };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  if (!validCategories.includes(category as Category)) {
    notFound();
  }

  const cat = category as Category;
  const items = await getProductsByCategory(cat);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mb-8">
        <Link
          href="/shop"
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted hover:text-accent"
        >
          ← Shop All
        </Link>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-5xl">
          {titles[cat]}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {items.length} piece{items.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
