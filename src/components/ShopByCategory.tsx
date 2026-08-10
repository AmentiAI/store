import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";

export function ShopByCategory() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <h2 className="mb-8 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Shop By Category
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative flex min-h-[200px] overflow-hidden bg-neutral-100 transition-transform hover:-translate-y-0.5"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="relative w-[55%] sm:w-1/2">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center px-5 sm:px-7">
              <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-tight sm:text-[1.75rem]">
                {category.name}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-700 transition-colors group-hover:text-black">
                Shop Now
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
