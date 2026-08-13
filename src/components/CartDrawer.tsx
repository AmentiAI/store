"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-surface shadow-[0_0_40px_rgba(43,176,255,0.12)] animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-sm font-semibold tracking-[0.14em] uppercase">
            Cart ({itemCount})
          </h2>
          <button type="button" aria-label="Close cart" onClick={closeCart}>
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
                className="mt-4 bg-accent px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-background"
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
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden border border-line bg-background">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.1em] uppercase">
                          {item.product.brand}
                        </p>
                        <p className="text-sm text-muted">
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
                        onClick={() =>
                          removeItem(item.product.id, item.size)
                        }
                        className="text-muted hover:text-accent"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="p-1.5"
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
                          className="p-1.5"
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
          <div className="border-t border-line px-5 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="tracking-[0.08em] uppercase text-muted">
                Subtotal
              </span>
              <span className="font-semibold text-accent">{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-muted">
              Shipping & taxes calculated at checkout.
            </p>
            <button
              type="button"
              className="w-full bg-accent py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-background transition-opacity hover:bg-accent-bright"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
