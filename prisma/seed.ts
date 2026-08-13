import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, type Category } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

type SeedProduct = {
  slug: string;
  brand: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  isNew: boolean;
  onSale: boolean;
  description: string;
  sizes: string[];
  stock: number;
};

const extraShots: Record<Category, string[]> = {
  clothing: [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
  ],
  shoes: [
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    "https://images.unsplash.com/photo-1590874104431-f6d3ac0ba7d1?w=800&q=80",
  ],
};

const products: SeedProduct[] = [
  {
    slug: "gallery-dept-logo-hoodie-black",
    brand: "Gallery Dept.",
    name: "Logo Hoodie Black",
    price: 275,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    isNew: true,
    onSale: true,
    description:
      "Authentic pre-owned Gallery Dept. logo hoodie in black. Soft fleece interior, classic fit. Carefully inspected and verified.",
    sizes: ["S", "M", "L", "XL"],
    stock: 3,
  },
  {
    slug: "air-jordan-1-retro-high-og",
    brand: "Nike",
    name: "Air Jordan 1 Retro High OG",
    price: 320,
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
    isNew: true,
    onSale: true,
    description:
      "Iconic Air Jordan 1 Retro High OG. Clean condition, verified authenticity. A staple of premium streetwear.",
    sizes: ["8", "8.5", "9", "9.5", "10", "11"],
    stock: 2,
  },
  {
    slug: "bape-shark-full-zip-hoodie",
    brand: "BAPE",
    name: "Shark Full Zip Hoodie",
    price: 450,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    isNew: true,
    onSale: true,
    description:
      "BAPE Shark Full Zip Hoodie — the cult classic. Pre-owned, authenticated, and ready to wear.",
    sizes: ["S", "M", "L", "XL"],
    stock: 1,
  },
  {
    slug: "saint-mxxxxxx-logo-tee",
    brand: "Saint Mxxxxxx",
    name: "Logo Tee",
    price: 180,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    isNew: true,
    onSale: true,
    description:
      "Saint Mxxxxxx logo tee in washed black. Soft cotton, relaxed cut. Authenticity guaranteed.",
    sizes: ["S", "M", "L", "XL"],
    stock: 4,
  },
  {
    slug: "louis-vuitton-keepall-bandouliere",
    brand: "Louis Vuitton",
    name: "Keepall Bandoulière",
    price: 2850,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    isNew: true,
    onSale: false,
    description:
      "Louis Vuitton Keepall Bandoulière duffle. Timeless travel piece in excellent pre-owned condition.",
    sizes: [],
    stock: 1,
  },
  {
    slug: "stone-island-soft-shell-jacket",
    brand: "Stone Island",
    name: "Soft Shell Jacket",
    price: 595,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    isNew: true,
    onSale: false,
    description:
      "Stone Island soft shell jacket with signature compass badge. Technical outerwear, thoroughly inspected.",
    sizes: ["M", "L", "XL"],
    stock: 2,
  },
  {
    slug: "supreme-box-logo-hoodie",
    brand: "Supreme",
    name: "Box Logo Hoodie",
    price: 680,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    isNew: false,
    onSale: false,
    description:
      "Supreme Box Logo Hoodie — grail status. Authenticated and quality checked before listing.",
    sizes: ["M", "L"],
    stock: 1,
  },
  {
    slug: "yeezy-boost-350-v2",
    brand: "Adidas",
    name: "Yeezy Boost 350 V2",
    price: 290,
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    isNew: false,
    onSale: false,
    description:
      "Yeezy Boost 350 V2 in a sought-after colorway. Clean uppers, verified pair.",
    sizes: ["8", "9", "10", "11", "12"],
    stock: 3,
  },
  {
    slug: "chrome-hearts-cross-cap",
    brand: "Chrome Hearts",
    name: "Cross Baseball Cap",
    price: 420,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    isNew: false,
    onSale: false,
    description:
      "Chrome Hearts cross baseball cap. Silver hardware, leather strap. Authenticity guaranteed.",
    sizes: [],
    stock: 2,
  },
  {
    slug: "the-north-face-nuptse",
    brand: "The North Face",
    name: "1996 Retro Nuptse",
    price: 310,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1544923246-77307dd62818?w=800&q=80",
    isNew: false,
    onSale: false,
    description:
      "The North Face 1996 Retro Nuptse puffer. Warm, iconic silhouette. Pre-owned and inspected.",
    sizes: ["S", "M", "L", "XL"],
    stock: 2,
  },
  {
    slug: "stussy-basic-hoodie",
    brand: "Stüssy",
    name: "Basic Logo Hoodie",
    price: 165,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    isNew: false,
    onSale: false,
    description:
      "Stüssy basic logo hoodie. Everyday staple with clean branding. Verified authentic.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 5,
  },
  {
    slug: "nike-dunk-low-panda",
    brand: "Nike",
    name: "Dunk Low Panda",
    price: 145,
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    isNew: true,
    onSale: false,
    description:
      "Nike Dunk Low in the classic Panda colorway. Lightly worn, fully authenticated.",
    sizes: ["7", "8", "9", "10", "11"],
    stock: 4,
  },
];

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL ?? "noe@reup.store").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "ReupNoe2026!";
  const name = process.env.ADMIN_NAME ?? "Mr. Noe";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: "ADMIN",
    },
    create: {
      email,
      name,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Admin ready: ${name} <${email}>`);
}

async function main() {
  await seedAdmin();

  for (const product of products) {
    const images = [product.image, ...extraShots[product.category]];
    const data = { ...product, images };
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: data,
      create: data,
    });
  }

  const missingGallery = await prisma.product.findMany({
    where: { images: { isEmpty: true } },
  });
  for (const product of missingGallery) {
    await prisma.product.update({
      where: { id: product.id },
      data: { images: [product.image] },
    });
  }

  const count = await prisma.product.count();
  console.log(`Seeded ${count} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
