import Link from "next/link";
import { logoutAdmin } from "@/app/actions/auth";
import { getSession } from "@/lib/session";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add product" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
];

export async function AdminNav() {
  const session = await getSession();

  return (
    <header className="border-b border-neutral-800 bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <Link
            href="/admin"
            className="font-[family-name:var(--font-display)] text-2xl tracking-wide"
          >
            REUP Admin
          </Link>
          {session && (
            <p className="mt-0.5 text-xs text-neutral-400">
              Signed in as {session.name}
            </p>
          )}
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-[11px] font-semibold tracking-[0.14em] uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/" className="text-neutral-500 hover:text-white">
            Store
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="text-neutral-500 transition-colors hover:text-white"
            >
              Log out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
