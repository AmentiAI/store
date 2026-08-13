function InfoLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
        {title}
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}

export const metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <InfoLayout title="Shipping">
      <p>Orders ship within 1–2 business days after payment clears.</p>
      <p>
        Free standard shipping on orders $150+. Express options available at
        checkout.
      </p>
      <p>
        You&apos;ll receive tracking as soon as your package leaves our
        warehouse.
      </p>
    </InfoLayout>
  );
}
