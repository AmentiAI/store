import { Hero } from "@/components/Hero";
import { NewArrivals } from "@/components/NewArrivals";
import { ShopByCategory } from "@/components/ShopByCategory";
import { TrustBar } from "@/components/TrustBar";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ShopByCategory />
      <NewArrivals />
    </>
  );
}
