"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import {
  formatPrice,
  isLocalUpload,
  productGallery,
  type Product,
} from "@/lib/product-types";

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const images = productGallery(product);
  const cover = images[0] ?? product.image;
  const hover = images[1];

  return (
    <article className="group">
      <div className="relative mb-3 aspect-[4/5] overflow-hidden bg-neutral-100">
        {product.isNew && (
          <span className="absolute left-2.5 top-2.5 z-10 bg-black px-2 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-white">
            New
          </span>
        )}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setLiked((v) => !v)}
          className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 p-1.5 transition-colors hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 ${liked ? "fill-black text-black" : "text-neutral-700"}`}
            strokeWidth={1.5}
          />
        </button>
        <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
          <Image
            src={cover}
            alt={`${product.brand} ${product.name}`}
            fill
            unoptimized={isLocalUpload(cover)}
            className={`object-cover transition duration-500 ${
              hover
                ? "group-hover:scale-105 group-hover:opacity-0"
                : "group-hover:scale-105"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          {hover && (
            <Image
              src={hover}
              alt=""
              fill
              unoptimized={isLocalUpload(hover)}
              className="object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
          )}
        </Link>
      </div>
      <Link href={`/product/${product.slug}`} className="block">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase">
          {product.brand}
        </p>
        <p className="mt-1 text-sm text-neutral-600">{product.name}</p>
        <p className="mt-1.5 text-sm font-semibold">{formatPrice(product.price)}</p>
      </Link>
    </article>
  );
}
