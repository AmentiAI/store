import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-1">
          <Link href="/" className="inline-block leading-none">
            <span className="block font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
              REUP
            </span>
            <span className="mt-[-2px] block text-[10px] font-semibold tracking-[0.42em]">
              RESALE
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
            Premium pre-owned streetwear. Authenticated, curated, and ready for
            the next chapter.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.16em] uppercase">
            Shop
          </h3>
          <ul className="space-y-2.5 text-sm text-neutral-600">
            <li>
              <Link href="/shop?filter=new" className="hover:text-black">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/shop/clothing" className="hover:text-black">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/shop/shoes" className="hover:text-black">
                Shoes
              </Link>
            </li>
            <li>
              <Link href="/shop/accessories" className="hover:text-black">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.16em] uppercase">
            Help
          </h3>
          <ul className="space-y-2.5 text-sm text-neutral-600">
            <li>
              <Link href="/shipping" className="hover:text-black">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-black">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/authenticity" className="hover:text-black">
                Authenticity
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.16em] uppercase">
            Stay Updated
          </h3>
          <p className="mb-3 text-sm text-neutral-600">
            Drop alerts and exclusive drops — no spam.
          </p>
          <NewsletterForm />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-black"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            @reupresale
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>© {new Date().getFullYear()} REUP Resale. All rights reserved.</p>
          <p className="tracking-[0.12em] uppercase">
            Authentic. Curated. Timeless.
          </p>
        </div>
      </div>
    </footer>
  );
}
