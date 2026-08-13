import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/product-types";

export const metadata = { title: "Order confirmed" };
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ order?: string }>;

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { order: orderId } = await searchParams;
  const order = orderId
    ? await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      })
    : null;
  const paid = order?.status === "PAID" || order?.status === "SHIPPED" || order?.status === "DELIVERED";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
        Thank you
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-5xl">
        Order confirmed
      </h1>
      <p className="mt-4 text-sm text-muted">
        Payment went through. We&apos;ll email shipping updates when your order
        goes out.
      </p>

      {paid && order && (
        <div className="mt-8 border-2 border-accent bg-white p-5 text-sm">
          <p className="break-all text-xs text-muted">Order {order.id}</p>
          <p className="mt-1 font-medium">{order.email}</p>
          <ul className="mt-4 space-y-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="min-w-0">
                  {item.brand} {item.name}
                  {item.size ? ` · ${item.size}` : ""} × {item.quantity}
                </span>
                <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t-2 border-accent pt-3 font-semibold">
            <span>Total</span>
            <span className="text-accent">{formatPrice(order.total)}</span>
          </p>
        </div>
      )}

      <Link
        href="/shop"
        className="mt-8 inline-block bg-accent px-5 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-white"
      >
        Keep shopping
      </Link>
    </div>
  );
}
