import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/product-types";

export default async function AdminDashboardPage() {
  const [productCount, orderCount, customerCount, revenue, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "CANCELLED" } },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
    ]);

  const stats = [
    { label: "Products", value: String(productCount) },
    { label: "Orders", value: String(orderCount) },
    { label: "Customers", value: String(customerCount) },
    {
      label: "Revenue",
      value: formatPrice(revenue._sum.total ?? 0),
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500">
            Dashboard
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-4xl tracking-tight">
            Welcome, Mr. Noe
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-black px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white"
        >
          Add product
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-neutral-200 bg-white p-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
              {stat.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-10 border border-neutral-200 bg-white">
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
            Recent orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-600 hover:text-black"
          >
            View all
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="px-5 py-8 text-sm text-neutral-600">
            No orders yet. Tables are ready when checkout goes live.
          </p>
        ) : (
          <ul className="divide-y divide-neutral-200">
            {recentOrders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm hover:bg-neutral-50"
                >
                  <div>
                    <p className="font-medium">{order.email}</p>
                    <p className="text-neutral-500">
                      {order.items.length} item
                      {order.items.length === 1 ? "" : "s"} · {order.status}
                    </p>
                  </div>
                  <p className="font-semibold">{formatPrice(order.total)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
