export const metadata = { title: "Authenticity" };

export default function AuthenticityPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
        Authenticity
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          Every item is screened by our team before it ships. We review
          construction, materials, labeling, and known telltale details based on
          the information available to us at the time.
        </p>
        <p>
          Secondary-market authentication is a good-faith process, not an
          absolute guarantee. Counterfeits evolve, and even careful review can
          miss a sophisticated replica.
        </p>
        <p>
          If you believe an item is not genuine, contact us promptly with your
          order number and photos. Where a claim is validated under our{" "}
          <a href="/terms" className="underline hover:text-accent">
            Terms of Service
          </a>
          , we will refund or replace as described there — that is your
          exclusive remedy for authenticity issues to the fullest extent the law
          allows.
        </p>
      </div>
    </div>
  );
}
