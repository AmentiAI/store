"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/product-types";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-2 border-accent bg-white pt-[env(safe-area-inset-top)] shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between border-b-2 border-accent px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="text-sm font-semibold tracking-[0.14em] uppercase">
            Cart ({itemCount})
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            className="inline-flex h-11 w-11 items-center justify-center"
            onClick={closeCart}
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm text-muted">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-4 bg-accent px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size ?? "os"}`}
                  className="flex gap-3"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden border-2 border-accent bg-white">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-bold tracking-[0.1em] uppercase">
                          {item.product.brand}
                        </p>
                        <p className="line-clamp-2 text-sm text-muted">
                          {item.product.name}
                        </p>
                        {item.size && (
                          <p className="mt-0.5 text-xs text-muted">
                            Size: {item.size}
                          </p>
                        )}
                      </div>
                        <button
                          type="button"
                          aria-label="Remove item"
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-muted hover:text-accent"
                          onClick={() =>
                            removeItem(item.product.id, item.size)
                          }
                        >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border-2 border-accent">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="inline-flex h-10 w-10 items-center justify-center"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.size,
                            )
                          }
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="inline-flex h-10 w-10 items-center justify-center"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.size,
                            )
                          }
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-accent">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t-2 border-accent px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="tracking-[0.08em] uppercase text-muted">
                Subtotal
              </span>
              <span className="font-semibold text-accent">{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-muted">
              Shipping & taxes calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block min-h-12 w-full bg-accent py-3.5 text-center text-[11px] font-semibold tracking-[0.16em] uppercase text-white transition-opacity hover:bg-accent-bright"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
