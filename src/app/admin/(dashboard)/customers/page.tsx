import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin Customers" };

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orders: true, wishlistItems: true } },
    },
  });

  return (
    <div>
      <h1 className="mb-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Customers
      </h1>
      <p className="mb-8 text-sm text-neutral-600">
        {customers.length} customer{customers.length === 1 ? "" : "s"}
      </p>

      {customers.length === 0 ? (
        <div className="border border-neutral-200 bg-white px-5 py-10 text-sm text-neutral-600">
          No customer accounts yet. Signups from /account will show here.
        </div>
      ) : (
        <div className="overflow-x-auto border border-neutral-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-semibold tracking-[0.12em] uppercase text-neutral-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Wishlist</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-4 py-3 font-medium">{customer.name}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer._count.orders}</td>
                  <td className="px-4 py-3">{customer._count.wishlistItems}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {customer.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
