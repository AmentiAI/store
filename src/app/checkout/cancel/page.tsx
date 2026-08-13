import Link from "next/link";

export const metadata = { title: "Checkout canceled" };

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
        Payment canceled
      </h1>
      <p className="mt-4 text-sm text-muted">
        No charge was made. Your cart is still here if you want to try again.
      </p>
      <Link
        href="/checkout"
        className="mt-8 inline-block bg-accent px-5 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-white"
      >
        Return to checkout
      </Link>
    </div>
  );
}
