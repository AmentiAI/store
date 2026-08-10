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
    <section className="bg-black text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-8 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-10 lg:py-9">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-3 sm:items-center sm:justify-center sm:gap-3.5"
          >
            <feature.icon
              className="mt-0.5 h-5 w-5 shrink-0 text-white sm:mt-0"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase">
                {feature.title}
              </p>
              <p className="mt-1 text-xs text-white/65">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
