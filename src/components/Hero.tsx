import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function Hero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-background text-foreground lg:min-h-[86vh]">
      <div className="hero-glow absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,7,12,0.55)_100%)]" />

      <div className="relative mx-auto grid min-h-[78vh] max-w-[1400px] items-center gap-10 px-4 py-16 sm:px-6 lg:min-h-[86vh] lg:grid-cols-2 lg:gap-6 lg:px-10 lg:py-10">
        <div className="max-w-xl animate-fade-up">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.32em] uppercase text-accent">
            Buy • Sell • Resell
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[2.85rem] leading-[0.92] tracking-tight sm:text-6xl lg:text-[4.4rem]">
            Streetwear.
            <br />
            <span className="text-accent">Authenticated.</span>
            <br />
            Ready to hunt.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Clothing, shoes, accessories & more — curated grails from the
            brands that actually matter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop?filter=new"
              className="inline-flex items-center justify-center bg-accent px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-background transition-transform hover:scale-[1.02] hover:bg-accent-bright active:scale-[0.98]"
            >
              Shop New Arrivals
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border border-accent/70 px-7 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-accent transition-colors hover:bg-accent hover:text-background"
            >
              Shop All
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="glow-blue">
            <BrandLogo size="hero" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
