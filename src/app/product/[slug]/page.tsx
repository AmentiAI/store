import { ProductDetails } from "@/components/ProductDetails";
import { getProductBySlug, products } from "@/lib/products";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.brand} ${product.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetails product={product} />;
}
