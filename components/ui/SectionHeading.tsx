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
      <h2 id={id} className="heading-gradient max-w-[860px] text-[1.6rem] font-semibold !leading-[1.18] sm:text-[1.9rem] lg:text-[2.15rem]">
        {title}
      </h2>
      {subtitle ? <p className={`max-w-[760px] text-base leading-relaxed text-fg-muted sm:text-lg ${centered ? "sm:mx-auto" : ""}`}>{subtitle}</p> : null}
      {children}
    </div>
  );
}
