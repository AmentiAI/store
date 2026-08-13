"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
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

const iconBtn =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center text-foreground transition-colors hover:text-accent";

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

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen, searchOpen]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-accent bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-2 py-1.5 sm:gap-3 sm:px-6 sm:py-3 lg:px-10">
        <button
          type="button"
          className={`${iconBtn} lg:hidden`}
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <Link
          href="/"
          className="flex min-w-0 flex-1 justify-center lg:flex-none lg:justify-start"
          aria-label="Thrift Sharks home"
        >
          <BrandLogo size="header" priority />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 overflow-x-auto lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="shrink-0 text-[11px] font-semibold tracking-[0.16em] uppercase text-foreground/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center">
          <button
            type="button"
            aria-label="Search"
            className={iconBtn}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className={`${iconBtn} hidden sm:inline-flex`}
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label="Open cart"
            className={`relative ${iconBtn}`}
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(86%,20rem)] flex-col border-r-2 border-accent bg-white pt-[env(safe-area-inset-top)] shadow-xl animate-slide-in">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <BrandLogo size="mark" />
              <button
                type="button"
                aria-label="Close menu"
                className={iconBtn}
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto px-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-12 items-center border-b border-accent/30 px-3 text-sm font-semibold tracking-[0.14em] uppercase hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-12 items-center px-3 text-sm font-semibold tracking-[0.14em] uppercase hover:text-accent"
              >
                Account
              </Link>
            </nav>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close search"
            onClick={closeSearch}
          />
          <div className="relative mx-auto mt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] w-full max-w-xl px-3 sm:px-4 animate-fade-up">
            <div className="overflow-hidden border-2 border-accent bg-white shadow-2xl">
              <div className="flex items-center gap-2 border-b-2 border-accent px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
                <Search className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search brands, products..."
                  className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted sm:text-sm"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  className={iconBtn}
                  onClick={closeSearch}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {results.length > 0 && (
                <ul className="max-h-[min(22rem,55dvh)] overflow-auto py-1">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-start justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-accent/10"
                      >
                        <span className="min-w-0">
                          <span className="block font-semibold">{product.brand}</span>
                          <span className="block text-muted">{product.name}</span>
                        </span>
                        <span className="shrink-0 font-medium text-accent">
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
