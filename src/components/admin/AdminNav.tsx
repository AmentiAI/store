import Link from "next/link";
import { logoutAdmin } from "@/app/actions/auth";
import { getSession } from "@/lib/session";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add product" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/settings", label: "Settings" },
];

export async function AdminNav() {
  const session = await getSession();

  return (
    <header className="border-b border-neutral-800 bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href="/admin"
              className="font-[family-name:var(--font-display)] text-xl tracking-wide sm:text-2xl"
            >
              Thrift Sharks Admin
            </Link>
            {session && (
              <p className="mt-0.5 truncate text-xs text-neutral-400">
                Signed in as {session.name}
              </p>
            )}
          </div>
          <form action={logoutAdmin} className="shrink-0">
            <button
              type="submit"
              className="min-h-10 px-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500 transition-colors hover:text-white"
            >
              Log out
            </button>
          </form>
        </div>
        <nav className="-mx-4 flex items-center gap-4 overflow-x-auto px-4 pb-1 text-[11px] font-semibold tracking-[0.14em] uppercase [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 py-2 text-neutral-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/" className="shrink-0 py-2 text-neutral-500 hover:text-white">
            Store
          </Link>
        </nav>
      </div>
    </header>
  );
}
