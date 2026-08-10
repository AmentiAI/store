import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-[#1a1a1a] text-white lg:min-h-[78vh]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=80"
          alt="Curated streetwear collection"
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[72vh] max-w-[1400px] items-center px-4 py-20 sm:px-6 lg:min-h-[78vh] lg:px-10">
        <div className="max-w-xl animate-fade-up">
          <p className="mb-4 text-[11px] font-medium tracking-[0.28em] uppercase text-white/75">
            Clothing. Shoes. Accessories.
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[2.75rem] leading-[0.95] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Premium Pre-Owned Streetwear
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
            Carefully curated authentic pieces from the most sought-after
            brands.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop?filter=new"
              className="inline-flex items-center justify-center bg-white px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Shop New Arrivals
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border border-white/80 px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white transition-colors hover:bg-white hover:text-black"
            >
              Shop All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
