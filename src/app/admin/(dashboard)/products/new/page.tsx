import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";

export const metadata = { title: "New Product" };

export default function NewProductPage() {
  return (
    <div>
      <Link
        href="/admin/products"
        className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500 hover:text-black"
      >
        ← Products
      </Link>
      <h1 className="mt-3 mb-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Add product
      </h1>
      <p className="mb-6 max-w-2xl text-sm text-neutral-600">
        Upload a product photo, then set the price, description, sizes, and
        stock. It will show up in the shop after you publish.
      </p>
      <ProductForm />
    </div>
  );
}
