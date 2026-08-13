import Image from "next/image";

type LogoSize = "header" | "footer" | "hero" | "mark";

const sizes: Record<
  LogoSize,
  { width: number; height: number; className: string }
> = {
  header: {
    width: 220,
    height: 220,
    className: "h-14 w-auto sm:h-[4.25rem]",
  },
  footer: {
    width: 280,
    height: 280,
    className: "h-24 w-auto",
  },
  hero: {
    width: 900,
    height: 900,
    className: "h-auto w-full max-w-[540px]",
  },
  mark: {
    width: 64,
    height: 64,
    className: "h-10 w-10",
  },
};

export function BrandLogo({
  size = "header",
  priority = false,
  className = "",
}: {
  size?: LogoSize;
  priority?: boolean;
  className?: string;
}) {
  const dims = sizes[size];

  return (
    <Image
      src="/thrift-sharks-logo.png"
      alt="Thrift Sharks"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={`object-contain ${dims.className} ${className}`}
    />
  );
}
