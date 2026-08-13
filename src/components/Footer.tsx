import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-1">
          <Link href="/" className="inline-block" aria-label="Thrift Sharks home">
            <BrandLogo size="footer" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Buy. Sell. Resell. Authenticated streetwear, sneakers, and
            accessories — ready for the next chapter.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
            Shop
          </h3>
          <ul className="space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/shop?filter=new" className="hover:text-accent">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/shop/clothing" className="hover:text-accent">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/shop/shoes" className="hover:text-accent">
                Shoes
              </Link>
            </li>
            <li>
              <Link href="/shop/accessories" className="hover:text-accent">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
            Help
          </h3>
          <ul className="space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/shipping" className="hover:text-accent">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-accent">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/authenticity" className="hover:text-accent">
                Authenticity
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-accent">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-accent">
            Stay Updated
          </h3>
          <p className="mb-3 text-sm text-muted">
            Drop alerts and exclusive drops — no spam.
          </p>
          <NewsletterForm />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
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
            @thriftsharks
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>© {new Date().getFullYear()} Thrift Sharks. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="hover:text-accent">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/authenticity" className="hover:text-accent">
              Authenticity
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
