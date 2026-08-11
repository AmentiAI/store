import Link from "next/link";
import { updateOrderStatus } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/product-types";

export const metadata = { title: "Admin Orders" };

const statuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, user: true },
  });

  return (
    <div>
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Orders
      </h1>
      <p className="mb-8 text-sm text-neutral-600">
        {orders.length} order{orders.length === 1 ? "" : "s"}
      </p>

      {orders.length === 0 ? (
        <div className="border border-neutral-200 bg-white px-5 py-10 text-sm text-neutral-600">
          No orders yet. `Order` and `OrderItem` tables are ready for checkout.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-neutral-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium hover:underline"
                  >
                    {order.email}
                  </Link>
                  <p className="mt-1 text-xs text-neutral-500">
                    {order.createdAt.toLocaleString()} ·{" "}
                    {order.items.length} item
                    {order.items.length === 1 ? "" : "s"}
                  </p>
                </div>
                <p className="font-semibold">{formatPrice(order.total)}</p>
              </div>
              <form action={updateOrderStatus} className="mt-4 flex gap-2">
                <input type="hidden" name="id" value={order.id} />
                <select
                  name="status"
                  defaultValue={order.status}
                  className="border border-neutral-300 px-3 py-2 text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-black px-3 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-white"
                >
                  Update
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
