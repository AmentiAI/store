import { BadgeCheck, Clock3, RefreshCw, Sparkles } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Authentic Guarantee",
    description: "Every item is verified for authenticity",
  },
  {
    icon: Sparkles,
    title: "Quality Checked",
    description: "Thoroughly inspected before shipping",
  },
  {
    icon: Clock3,
    title: "Fast Shipping",
    description: "Quick & secure delivery",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "14-day hassle free returns",
  },
];

export function TrustBar() {
  return (
    <section className="border-y-2 border-accent bg-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-5 px-4 py-7 sm:grid-cols-2 sm:gap-y-8 sm:px-6 lg:grid-cols-4 lg:px-10 lg:py-9">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-3 sm:items-center sm:justify-center sm:gap-3.5"
          >
            <feature.icon
              className="mt-0.5 h-5 w-5 shrink-0 text-accent sm:mt-0"
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.1em] uppercase sm:text-[11px] sm:tracking-[0.14em]">
                {feature.title}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
