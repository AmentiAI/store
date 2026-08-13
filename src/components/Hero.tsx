import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <div className="hero-glow absolute inset-0" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:min-h-[80vh] lg:grid-cols-2 lg:gap-6 lg:px-10 lg:py-10">
        <div className="max-w-xl animate-fade-up">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] uppercase text-accent sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
            Clothing • Shoes • Accessories
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[2.35rem] leading-[0.92] tracking-tight sm:text-6xl lg:text-[4.4rem]">
            Streetwear.
            <br />
            <span className="text-accent">Authenticated.</span>
            <br />
            Shop the drop.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:mt-5 sm:text-lg">
            Clothing, shoes, accessories & more — curated grails from the
            brands that actually matter.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link
              href="/shop?filter=new"
              className="inline-flex min-h-12 items-center justify-center bg-accent px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white transition-transform hover:scale-[1.02] hover:bg-accent-bright active:scale-[0.98]"
            >
              Shop New Arrivals
            </Link>
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center border-2 border-accent px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-accent transition-colors hover:bg-accent hover:text-white"
            >
              Shop All
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="glow-blue overflow-hidden border-2 border-accent">
            <BrandLogo size="hero" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
