import { AccountAuth } from "@/components/AccountAuth";
import { getCurrentUser } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/product-types";
import Link from "next/link";

export const metadata = { title: "Account" };
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ next?: string; mode?: string }>;

function safeNextPath(value: string | undefined) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    value.startsWith("/admin")
  ) {
    return "/account";
  }
  return value;
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();
  const redirectTo = safeNextPath(params.next);
  const initialMode = params.mode === "signup" ? "signup" : "login";
  const fromCheckout = redirectTo.startsWith("/checkout");
  const orders = user
    ? await prisma.order.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: { items: true },
        take: 20,
      })
    : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Account
      </h1>
      <p className="mt-3 text-sm text-muted">
        {user
          ? "Track orders, save wishlist items, and get early access to drops."
          : fromCheckout
            ? "Sign in with your own email, or create a new account. Guest checkout stays on the checkout page — no shared store login."
            : "Create your own account to track orders and save wishlist items. Prefer not to? You can also checkout as a guest."}
      </p>
      {!user && (
        <p className="mt-2 text-sm text-muted">
          {fromCheckout ? (
            <Link href="/checkout" className="text-accent underline">
              Back to guest checkout
            </Link>
          ) : (
            <>
              Checking out?{" "}
              <Link href="/checkout" className="text-accent underline">
                Continue as guest
              </Link>
              .
            </>
          )}
        </p>
      )}
      <AccountAuth
        user={user}
        redirectTo={redirectTo}
        initialMode={initialMode}
      />

      {user && (
        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
            Orders
          </h2>
          {orders.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No orders yet.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="border-2 border-accent bg-white p-5 text-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-accent">
                        {order.status}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {order.createdAt.toLocaleString()}
                      </p>
                    </div>
                    <p className="font-semibold">{formatPrice(order.total)}</p>
                  </div>
                  <ul className="mt-3 space-y-1 text-muted">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.brand} {item.name}
                        {item.size ? ` · ${item.size}` : ""} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
