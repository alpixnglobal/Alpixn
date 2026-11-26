import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Reusable conversion band. Copy is passed per page so CTAs stay specific and honest. */
export default function CtaBand({
  eyebrow = "Work with ALPIXN",
  title,
  description,
  primary = { label: "Request a consultation", href: "/contact-us" },
  secondary,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="dark relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-line bg-[radial-gradient(120%_120%_at_0%_0%,#0a3466_0%,#071a33_45%,#040d1c_100%)] px-6 py-12 text-fg shadow-[var(--shadow-card)] sm:px-12 sm:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-tech/30 blur-[100px]" />
        <Image src="/brand/alpixn-emblem.webp" alt="" width={260} height={260} aria-hidden className="pointer-events-none absolute -bottom-10 right-6 hidden w-56 opacity-[0.12] md:block" />
        <div className="relative max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-fg sm:text-[2rem]">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primary.href} className="btn-brand">
              {primary.label}
              <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
            </Link>
            {secondary ? (
              <Link href={secondary.href} className="btn-ghost-brand">
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
