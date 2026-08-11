import Link from "next/link";
import type { ReactNode } from "react";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500">
        Legal
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-neutral-500">Last updated: {updated}</p>
      <div className="mt-10 space-y-8 text-sm leading-relaxed text-neutral-700">
        {children}
      </div>
      <p className="mt-12 text-sm text-neutral-500">
        Questions?{" "}
        <Link href="/contact" className="underline hover:text-black">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}
