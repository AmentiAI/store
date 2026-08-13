"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./product-types";

export type CartItem = {
  product: Product;
  size?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  ready: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const STORAGE_KEY = "thriftsharks_cart";
const CartContext = createContext<CartContextValue | null>(null);

function itemKey(productId: string, size?: string) {
  return `${productId}::${size ?? "os"}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore bad storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, size?: string) => {
      setItems((prev) => {
        const key = itemKey(product.id, size);
        const existing = prev.find(
          (item) => itemKey(item.product.id, item.size) === key,
        );
        if (existing) {
          return prev.map((item) =>
            itemKey(item.product.id, item.size) === key
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...prev, { product, size, quantity: 1 }];
      });
      setIsOpen(true);
    };

    const removeItem = (productId: string, size?: string) => {
      const key = itemKey(productId, size);
      setItems((prev) =>
        prev.filter((item) => itemKey(item.product.id, item.size) !== key),
      );
    };

    const updateQuantity = (
      productId: string,
      quantity: number,
      size?: string,
    ) => {
      if (quantity <= 0) {
        removeItem(productId, size);
        return;
      }
      const key = itemKey(productId, size);
      setItems((prev) =>
        prev.map((item) =>
          itemKey(item.product.id, item.size) === key
            ? { ...item, quantity }
            : item,
        ),
      );
    };

    return {
      items,
      isOpen,
      ready,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((open) => !open),
      addItem,
      removeItem,
      updateQuantity,
      clearCart: () => setItems([]),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    };
  }, [items, isOpen, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
