export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
        Contact
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>Questions about a piece, sizing, or an order? We&apos;re here.</p>
        <p>Email: support@thriftsharks.com</p>
        <p>Hours: Mon–Fri, 10am–6pm ET</p>
      </div>
    </div>
  );
}
