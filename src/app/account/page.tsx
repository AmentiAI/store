export const metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Account
      </h1>
      <p className="mt-3 text-sm text-neutral-600">
        Sign in to track orders, save wishlist items, and get early access to
        drops.
      </p>
      <form className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
        />
        <button
          type="button"
          className="w-full bg-black py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
