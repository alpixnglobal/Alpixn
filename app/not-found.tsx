import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-canvas px-4 py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-ambient" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]" />
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Image src="/brand/alpixn-emblem.webp" alt="" width={96} height={96} className="animate-float drop-shadow-[0_12px_30px_rgba(217,154,25,0.35)]" />
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="heading-gradient mt-4 font-semibold text-[clamp(1.55rem,2.5vw,2.2rem)]">This page could not be found</h1>
        <p className="mt-4 text-base leading-relaxed text-fg-muted">The link may be broken or the page may have moved. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-brand">
            Back to home
            <ArrowRight aria-hidden className="btn-arrow h-4 w-4" />
          </Link>
          <Link href="/contact-us" className="btn-ghost-brand">
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
