import { Truck } from "lucide-react";
import { getAnnouncementText } from "@/lib/announcement";

export async function AnnouncementBar() {
  const message = await getAnnouncementText();

  return (
    <div className="bg-accent text-white text-[10px] tracking-[0.12em] uppercase sm:text-[11px] sm:tracking-[0.18em]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-2 px-3 py-2 sm:justify-between sm:px-6 sm:py-2.5 lg:px-10">
        <p className="hidden flex-1 font-semibold sm:block">
          Clothing • Shoes • Accessories
        </p>
        <p className="max-w-full text-center font-semibold leading-snug sm:flex-1">
          {message}
        </p>
        <p className="hidden flex-1 items-center justify-end gap-2 font-semibold sm:flex">
          <Truck className="h-3.5 w-3.5" strokeWidth={1.75} />
          Free shipping on orders $150+
        </p>
      </div>
    </div>
  );
}
