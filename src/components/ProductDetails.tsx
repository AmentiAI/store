"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type Product } from "@/lib/product-types";

export function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes?.[0] ?? "");

  return (
    <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        {product.isNew && (
          <span className="absolute left-3 top-3 z-10 bg-black px-2 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-white">
            New
          </span>
        )}
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          priority
          unoptimized={product.image.startsWith("/uploads/")}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-500">
          {product.category}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          {product.brand}
        </h1>
        <p className="mt-1 text-lg text-neutral-600">{product.name}</p>
        <p className="mt-5 text-2xl font-semibold">
          {formatPrice(product.price)}
        </p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-600">
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
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 hover:border-black"
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
          className="mt-8 w-full max-w-md bg-black py-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Add to Cart
        </button>

        <ul className="mt-8 space-y-2 text-sm text-neutral-600">
          <li>✓ Authenticity verified</li>
          <li>✓ Quality inspected</li>
          <li>✓ Free shipping on orders $150+</li>
          <li>✓ 14-day hassle-free returns</li>
        </ul>
      </div>
    </div>
  );
}
