export type Category = "clothing" | "shoes" | "accessories";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  isNew?: boolean;
  description: string;
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: "1",
    slug: "gallery-dept-logo-hoodie-black",
    brand: "Gallery Dept.",
    name: "Logo Hoodie Black",
    price: 275,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    isNew: true,
    description:
      "Authentic pre-owned Gallery Dept. logo hoodie in black. Soft fleece interior, classic fit. Carefully inspected and verified.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    slug: "air-jordan-1-retro-high-og",
    brand: "Nike",
    name: "Air Jordan 1 Retro High OG",
    price: 320,
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
    isNew: true,
    description:
      "Iconic Air Jordan 1 Retro High OG. Clean condition, verified authenticity. A staple of premium streetwear.",
    sizes: ["8", "8.5", "9", "9.5", "10", "11"],
  },
  {
    id: "3",
    slug: "bape-shark-full-zip-hoodie",
    brand: "BAPE",
    name: "Shark Full Zip Hoodie",
    price: 450,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    isNew: true,
    description:
      "BAPE Shark Full Zip Hoodie — the cult classic. Pre-owned, authenticated, and ready to wear.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "4",
    slug: "saint-mxxxxxx-logo-tee",
    brand: "Saint Mxxxxxx",
    name: "Logo Tee",
    price: 180,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    isNew: true,
    description:
      "Saint Mxxxxxx logo tee in washed black. Soft cotton, relaxed cut. Authenticity guaranteed.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5",
    slug: "louis-vuitton-keepall-bandouliere",
    brand: "Louis Vuitton",
    name: "Keepall Bandoulière",
    price: 2850,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    isNew: true,
    description:
      "Louis Vuitton Keepall Bandoulière duffle. Timeless travel piece in excellent pre-owned condition.",
  },
  {
    id: "6",
    slug: "stone-island-soft-shell-jacket",
    brand: "Stone Island",
    name: "Soft Shell Jacket",
    price: 595,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    isNew: true,
    description:
      "Stone Island soft shell jacket with signature compass badge. Technical outerwear, thoroughly inspected.",
    sizes: ["M", "L", "XL"],
  },
  {
    id: "7",
    slug: "supreme-box-logo-hoodie",
    brand: "Supreme",
    name: "Box Logo Hoodie",
    price: 680,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    isNew: false,
    description:
      "Supreme Box Logo Hoodie — grail status. Authenticated and quality checked before listing.",
    sizes: ["M", "L"],
  },
  {
    id: "8",
    slug: "yeezy-boost-350-v2",
    brand: "Adidas",
    name: "Yeezy Boost 350 V2",
    price: 290,
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    isNew: false,
    description:
      "Yeezy Boost 350 V2 in a sought-after colorway. Clean uppers, verified pair.",
    sizes: ["8", "9", "10", "11", "12"],
  },
  {
    id: "9",
    slug: "chrome-hearts-cross-cap",
    brand: "Chrome Hearts",
    name: "Cross Baseball Cap",
    price: 420,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    isNew: false,
    description:
      "Chrome Hearts cross baseball cap. Silver hardware, leather strap. Authenticity guaranteed.",
  },
  {
    id: "10",
    slug: "the-north-face-nuptse",
    brand: "The North Face",
    name: "1996 Retro Nuptse",
    price: 310,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd62818?w=800&q=80",
    isNew: false,
    description:
      "The North Face 1996 Retro Nuptse puffer. Warm, iconic silhouette. Pre-owned and inspected.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "11",
    slug: "stussy-basic-hoodie",
    brand: "Stüssy",
    name: "Basic Logo Hoodie",
    price: 165,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    isNew: false,
    description:
      "Stüssy basic logo hoodie. Everyday staple with clean branding. Verified authentic.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "12",
    slug: "nike-dunk-low-panda",
    brand: "Nike",
    name: "Dunk Low Panda",
    price: 145,
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    isNew: true,
    description:
      "Nike Dunk Low in the classic Panda colorway. Lightly worn, fully authenticated.",
    sizes: ["7", "8", "9", "10", "11"],
  },
];

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

export const brands = [
  "Supreme",
  "Nike",
  "BAPE",
  "Gallery Dept.",
  "Stone Island",
  "Louis Vuitton",
  "Chrome Hearts",
  "Stüssy",
  "The North Face",
  "Saint Mxxxxxx",
  "Adidas",
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category) {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals() {
  return products.filter((p) => p.isNew).slice(0, 6);
}
