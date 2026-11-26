import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

/** Visible breadcrumb trail + matching BreadcrumbList structured data. */
export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-fg-subtle">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="line-clamp-1 text-fg-muted">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="transition-colors hover:text-gold">
                    {item.name}
                  </Link>
                )}
                {!last ? <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" /> : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
