"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/product-types";

const navLinks = [
  { href: "/shop?filter=new", label: "New Arrivals" },
  { href: "/shop/clothing", label: "Clothing" },
  { href: "/shop/shoes", label: "Shoes" },
  { href: "/shop/accessories", label: "Accessories" },
  { href: "/shop/brands", label: "Brands" },
  { href: "/shop?filter=sale", label: "Sale" },
];

export function Header() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = (await response.json()) as Product[];
        setResults(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setResults([]);
        }
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <button
          type="button"
          className="lg:hidden p-1"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <Link href="/" className="shrink-0 leading-none group">
          <span className="block font-[family-name:var(--font-display)] text-[2rem] font-bold tracking-tight text-black transition-opacity group-hover:opacity-80 sm:text-[2.15rem]">
            REUP
          </span>
          <span className="mt-[-2px] block text-[10px] font-semibold tracking-[0.42em] text-black">
            RESALE
          </span>
        </Link>

        <nav className="hidden lg:flex flex-1 items-center justify-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-800 transition-colors hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Search"
            className="p-1 transition-opacity hover:opacity-60"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden sm:block p-1 transition-opacity hover:opacity-60"
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden sm:block p-1 transition-opacity hover:opacity-60"
          >
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Open cart"
            className="relative p-1 transition-opacity hover:opacity-60"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[80%] max-w-xs flex-col bg-white p-6 shadow-xl animate-slide-in">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold">
                REUP
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold tracking-[0.14em] uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close search"
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
              setResults([]);
            }}
          />
          <div className="relative mx-auto mt-16 w-full max-w-xl px-4 animate-fade-up">
            <div className="overflow-hidden rounded-sm bg-white shadow-2xl">
              <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3">
                <Search className="h-5 w-5 text-neutral-400" strokeWidth={1.5} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search brands, products..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {results.length > 0 && (
                <ul className="max-h-80 overflow-auto py-2">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                          setResults([]);
                        }}
                        className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-neutral-50"
                      >
                        <span>
                          <span className="font-semibold">{product.brand}</span>
                          <span className="text-neutral-500">
                            {" "}
                            — {product.name}
                          </span>
                        </span>
                        <span className="font-medium">
                          ${product.price.toFixed(2)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
