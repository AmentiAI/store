import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight">
        404
      </h1>
      <p className="mt-3 text-muted">This piece isn&apos;t in the vault.</p>
      <Link
        href="/shop"
        className="mt-8 bg-accent px-6 py-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-background hover:bg-accent-bright"
      >
        Back to Shop
      </Link>
    </div>
  );
}
