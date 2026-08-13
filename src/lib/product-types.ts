export type Category = "clothing" | "shoes" | "accessories";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  images: string[];
  isNew?: boolean;
  onSale?: boolean;
  description: string;
  sizes?: string[];
};

export const MAX_PRODUCT_IMAGES = 8;

export function productGallery(product: {
  image: string;
  images?: string[];
}): string[] {
  if (product.images && product.images.length > 0) {
    return product.images;
  }
  return product.image ? [product.image] : [];
}

export function isLocalUpload(src: string) {
  return src.startsWith("/uploads/");
}

export const categories: {
  id: Category;
  name: string;
  image: string;
  href: string;
}[] = [
  {
    id: "clothing",
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80",
    href: "/shop/clothing",
  },
  {
    id: "shoes",
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=900&q=80",
    href: "/shop/shoes",
  },
  {
    id: "accessories",
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80",
    href: "/shop/accessories",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
