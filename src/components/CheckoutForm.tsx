"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { finishPaypalCheckout, startPaypalCheckout } from "@/app/actions/checkout";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/product-types";
import {
  FREE_SHIPPING_THRESHOLD,
  shippingForSubtotal,
} from "@/lib/shipping";

const inputClass =
  "w-full min-w-0 border-2 border-accent bg-white px-3 py-3 text-base outline-none focus:border-accent-bright sm:text-sm";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

type PaypalButtons = {
  close?: () => void;
  render: (selector: string) => Promise<void>;
};

type PaypalNamespace = {
  Buttons: (options: {
    style?: Record<string, string>;
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onError?: (error: unknown) => void;
    onCancel?: () => void;
  }) => PaypalButtons;
};

declare global {
  interface Window {
    paypal?: PaypalNamespace;
  }
}

export function CheckoutForm({
  clientId,
  paypalLive,
  defaultEmail,
  defaultName,
}: {
  clientId: string;
  paypalLive: boolean;
  defaultEmail?: string;
  defaultName?: string;
}) {
  const router = useRouter();
  const { items, subtotal, ready, clearCart } = useCart();
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [shippingName, setShippingName] = useState(defaultName ?? "");
  const [shippingLine1, setShippingLine1] = useState("");
  const [shippingLine2, setShippingLine2] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const buttonsRef = useRef<PaypalButtons | null>(null);

  const shipping = shippingForSubtotal(subtotal);
  const total = subtotal + shipping;
  const address = useMemo(
    () => ({
      email,
      shippingName,
      shippingLine1,
      shippingLine2,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry: "US",
      notes,
    }),
    [
      email,
      notes,
      shippingCity,
      shippingLine1,
      shippingLine2,
      shippingName,
      shippingState,
      shippingZip,
    ],
  );
  const addressRef = useRef(address);
  const itemsRef = useRef(items);
  addressRef.current = address;
  itemsRef.current = items;

  useEffect(() => {
    if (!ready || items.length === 0 || !clientId) return;

    let cancelled = false;
    const scriptId = "paypal-sdk";
    const sdkHost = paypalLive
      ? "www.paypal.com"
      : "www.sandbox.paypal.com";
    const sdkSrc = `https://${sdkHost}/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&components=buttons`;

    function renderButtons() {
      if (!window.paypal || cancelled) return;
      buttonsRef.current?.close?.();
      const host = document.getElementById("paypal-buttons");
      if (host) host.innerHTML = "";

      const buttons = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
        },
        createOrder: async () => {
          setError("");
          setPending(true);
          const result = await startPaypalCheckout(
            itemsRef.current.map((item) => ({
              productId: item.product.id,
              size: item.size,
              quantity: item.quantity,
            })),
            addressRef.current,
          );
          if (result.error || !result.paypalOrderId) {
            setPending(false);
            setError(result.error ?? "Could not start PayPal checkout.");
            throw new Error(result.error ?? "PayPal create failed");
          }
          return result.paypalOrderId;
        },
        onApprove: async (data) => {
          const result = await finishPaypalCheckout(data.orderID);
          if (result.error || !result.orderId) {
            setPending(false);
            setError(result.error ?? "Payment could not be completed.");
            return;
          }
          clearCart();
          router.push(`/checkout/success?order=${result.orderId}`);
        },
        onCancel: () => {
          setPending(false);
        },
        onError: () => {
          setPending(false);
          setError("PayPal ran into a problem. Try again.");
        },
      });

      buttonsRef.current = buttons;
      void buttons.render("#paypal-buttons");
    }

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (window.paypal) {
      renderButtons();
      return () => {
        cancelled = true;
        buttonsRef.current?.close?.();
      };
    }

    const script =
      existing ??
      Object.assign(document.createElement("script"), {
        id: scriptId,
        src: sdkSrc,
        async: true,
      });

    script.addEventListener("load", renderButtons);
    if (!existing) document.body.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener("load", renderButtons);
      buttonsRef.current?.close?.();
    };
  }, [clearCart, clientId, items.length, paypalLive, ready, router]);

  if (!ready) {
    return <p className="text-sm text-muted">Loading checkout…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="border-2 border-accent bg-white px-6 py-16 text-center">
        <p className="text-sm text-muted">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-4 inline-block bg-accent px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
      <section className="min-w-0 border-2 border-accent bg-white p-4 sm:p-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
          Checkout
        </h1>
        {defaultEmail ? (
          <p className="mt-2 text-sm text-muted">
            Signed in as {defaultEmail}. Enter shipping details, then pay with
            PayPal.
          </p>
        ) : (
          <div className="mt-3 space-y-2 text-sm text-muted">
            <p>
              Checkout as a guest — no account needed. Fill in your email and
              shipping, then pay with PayPal.
            </p>
            <p>
              Want to track this order later?{" "}
              <Link
                href="/account?next=/checkout"
                className="text-accent underline"
              >
                Sign in
              </Link>{" "}
              or{" "}
              <Link
                href="/account?mode=signup&next=/checkout"
                className="text-accent underline"
              >
                create your own account
              </Link>
              .
            </p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
              Full name
            </label>
            <input
              required
              autoComplete="name"
              value={shippingName}
              onChange={(e) => setShippingName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
              Address
            </label>
            <input
              required
              autoComplete="street-address"
              value={shippingLine1}
              onChange={(e) => setShippingLine1(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
              Apt, suite (optional)
            </label>
            <input
              autoComplete="address-line2"
              value={shippingLine2}
              onChange={(e) => setShippingLine2(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                City
              </label>
              <input
                required
                autoComplete="address-level2"
                value={shippingCity}
                onChange={(e) => setShippingCity(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                State
              </label>
              <select
                required
                autoComplete="address-level1"
                value={shippingState}
                onChange={(e) => setShippingState(e.target.value)}
                className={`${inputClass} pr-10`}
              >
                <option value="">Select</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
                ZIP
              </label>
              <input
                required
                autoComplete="postal-code"
                value={shippingZip}
                onChange={(e) => setShippingZip(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">
              Order notes (optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] uppercase">
            Payment
          </p>
          {!clientId ? (
            <p className="text-sm text-muted">
              PayPal is not configured on this server yet.
            </p>
          ) : (
            <div id="paypal-buttons" className={`max-w-full overflow-x-hidden ${pending ? "pointer-events-none opacity-60" : ""}`} />
          )}
        </div>
      </section>

      <aside className="h-fit border-2 border-accent bg-white p-5">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
          Order summary
        </h2>
        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <li
              key={`${item.product.id}-${item.size ?? "os"}`}
              className="flex gap-3"
            >
              <div className="relative h-20 w-16 shrink-0 overflow-hidden border-2 border-accent">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold tracking-[0.1em] uppercase">
                  {item.product.brand}
                </p>
                <p className="line-clamp-2 text-sm text-muted">{item.product.name}</p>
                <p className="mt-1 text-xs text-muted">
                  Qty {item.quantity}
                  {item.size ? ` · Size ${item.size}` : ""}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t-2 border-accent pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <dt>Total</dt>
            <dd className="text-accent">{formatPrice(total)}</dd>
          </div>
        </dl>
        {shipping > 0 && (
          <p className="mt-3 text-xs text-muted">
            Free shipping on orders {formatPrice(FREE_SHIPPING_THRESHOLD)}+.
          </p>
        )}
      </aside>
    </div>
  );
}
