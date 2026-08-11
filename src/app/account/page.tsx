import { AccountAuth } from "@/components/AccountAuth";
import { getCurrentUser } from "@/app/actions/auth";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Account
      </h1>
      <p className="mt-3 text-sm text-neutral-600">
        Sign in to track orders, save wishlist items, and get early access to
        drops.
      </p>
      <AccountAuth user={user} />
    </div>
  );
}
