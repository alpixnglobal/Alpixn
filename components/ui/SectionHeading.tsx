import Accent from "@/components/ui/Accent";
import type { ReactNode } from "react";

/** Shared homepage section heading: gold eyebrow, Sora title, muted lead. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  id,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
  id?: string;
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-start sm:items-center sm:text-center" : "items-start text-left"} ${className}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 id={id} className="max-w-[860px] font-display text-[clamp(1.35rem,1.9vw,1.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-fg">
        <Accent text={title} />
      </h2>
      {subtitle ? <p className={`max-w-[760px] text-base leading-relaxed text-fg-muted sm:text-lg ${centered ? "sm:mx-auto" : ""}`}>{subtitle}</p> : null}
      {children}
    </div>
  );
}
