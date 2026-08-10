export const metadata = { title: "Authenticity" };

export default function AuthenticityPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
        Authenticity
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-700">
        <p>
          Every item is verified by our authentication team before it ships.
        </p>
        <p>
          We check construction, materials, labeling, and known telltale
          details.
        </p>
        <p>
          If an item ever fails verification after purchase, we&apos;ll make it
          right.
        </p>
      </div>
    </div>
  );
}
