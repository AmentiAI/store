import Link from "next/link";
import { notFound } from "next/navigation";
import { updateOrderStatus } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/product-types";

type Params = Promise<{ id: string }>;

const statuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, user: true },
  });
  if (!order) notFound();

  return (
    <div>
      <Link
        href="/admin/orders"
        className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500 hover:text-black"
      >
        ← Orders
      </Link>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Order
      </h1>
      <p className="mt-1 text-sm text-neutral-600">{order.id}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-neutral-200 bg-white p-5 text-sm">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            Customer
          </h2>
          <p className="mt-3">{order.email}</p>
          {order.user && <p className="text-neutral-600">{order.user.name}</p>}
          {(order.shippingName || order.shippingLine1) && (
            <div className="mt-4 text-neutral-600">
              <p>{order.shippingName}</p>
              <p>{order.shippingLine1}</p>
              {order.shippingLine2 && <p>{order.shippingLine2}</p>}
              <p>
                {[order.shippingCity, order.shippingState, order.shippingZip]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p>{order.shippingCountry}</p>
            </div>
          )}
        </div>

        <div className="border border-neutral-200 bg-white p-5 text-sm">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            Status
          </h2>
          <form action={updateOrderStatus} className="mt-4 flex min-w-0 flex-wrap gap-2">
            <input type="hidden" name="id" value={order.id} />
            <select
              name="status"
              defaultValue={order.status}
              className="min-h-11 min-w-0 flex-1 border border-neutral-300 px-3 py-2 pr-10"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="shrink-0 bg-black px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-white"
            >
              Update
            </button>
          </form>
          <dl className="mt-6 space-y-2">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Subtotal</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Shipping</dt>
              <dd>{formatPrice(order.shipping)}</dd>
            </div>
            <div className="flex justify-between font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
          </dl>
          {(order.paypalOrderId || order.paypalCaptureId) && (
            <dl className="mt-6 space-y-1 border-t border-neutral-200 pt-4 text-xs text-neutral-500">
              {order.paypalOrderId && (
                <div>
                  <dt className="uppercase tracking-[0.12em]">PayPal order</dt>
                  <dd className="mt-0.5 break-all font-mono">{order.paypalOrderId}</dd>
                </div>
              )}
              {order.paypalCaptureId && (
                <div className="mt-2">
                  <dt className="uppercase tracking-[0.12em]">PayPal capture</dt>
                  <dd className="mt-0.5 break-all font-mono">{order.paypalCaptureId}</dd>
                </div>
              )}
            </dl>
          )}
        </div>
      </div>

      <div className="mt-6 border border-neutral-200 bg-white">
        <h2 className="border-b border-neutral-200 px-5 py-4 font-[family-name:var(--font-display)] text-2xl">
          Items
        </h2>
        <ul className="divide-y divide-neutral-200">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm"
            >
              <div>
                <p className="font-medium">
                  {item.brand} {item.name}
                </p>
                <p className="text-neutral-500">
                  Qty {item.quantity}
                  {item.size ? ` · Size ${item.size}` : ""}
                </p>
              </div>
              <p>{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
