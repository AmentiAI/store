import { Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-black text-white text-[11px] tracking-[0.18em] uppercase">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2.5 sm:px-6 lg:px-10">
        <p className="hidden sm:block flex-1" />
        <p className="flex-1 text-center font-medium">
          Authentic. Curated. Timeless.
        </p>
        <p className="hidden sm:flex flex-1 items-center justify-end gap-2 font-medium">
          <Truck className="h-3.5 w-3.5" strokeWidth={1.75} />
          Free shipping on orders $150+
        </p>
      </div>
    </div>
  );
}
