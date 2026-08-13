"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import {
  formatPrice,
  isLocalUpload,
  productGallery,
  type Product,
} from "@/lib/product-types";

export function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes?.[0] ?? "");
  const images = productGallery(product);
  const [active, setActive] = useState(0);
  const current = images[active] ?? product.image;

  function showPrevious() {
    setActive((index) => (index - 1 + images.length) % images.length);
  }

  function showNext() {
    setActive((index) => (index + 1) % images.length);
  }

  return (
    <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
      <div className="space-y-3">
        <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
          {product.isNew && (
            <span className="absolute left-3 top-3 z-10 bg-accent px-2 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-background">
              New
            </span>
          )}
          <Image
            src={current}
            alt={`${product.brand} ${product.name}`}
            fill
            priority
            unoptimized={isLocalUpload(current)}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/85 p-2 text-foreground transition-colors hover:bg-accent hover:text-background"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={showNext}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/85 p-2 text-foreground transition-colors hover:bg-accent hover:text-background"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                aria-label={`View image ${index + 1}`}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={`relative h-20 w-16 shrink-0 overflow-hidden bg-surface ${
                  index === active
                    ? "ring-2 ring-accent"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  unoptimized={isLocalUpload(src)}
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-accent">
          {product.category}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          {product.brand}
        </h1>
        <p className="mt-1 text-lg text-muted">{product.name}</p>
        <p className="mt-5 text-2xl font-semibold text-accent">
          {formatPrice(product.price)}
        </p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          {product.description}
        </p>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] uppercase">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  className={`min-w-12 border px-3 py-2.5 text-sm transition-colors ${
                    size === option
                      ? "border-accent bg-accent text-background"
                      : "border-line hover:border-accent"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => addItem(product, size || undefined)}
          className="mt-8 w-full max-w-md bg-accent py-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-background transition-transform hover:scale-[1.01] hover:bg-accent-bright active:scale-[0.99]"
        >
          Add to Cart
        </button>

        <ul className="mt-8 space-y-2 text-sm text-muted">
          <li>✓ Authenticity verified</li>
          <li>✓ Quality inspected</li>
          <li>✓ Free shipping on orders $150+</li>
          <li>✓ 14-day hassle-free returns</li>
        </ul>
      </div>
    </div>
  );
}
