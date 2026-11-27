"use client";

import MegaMenu from "./MegaMenu";

type OffshoreItem = { label: string; href: string; slug?: string };
type OffshoreCategory = { key: string; label: string; menuHeading: string; items: OffshoreItem[] };

export function OffshoreDeveloperDropdownMenu({ categories }: { categories: OffshoreCategory[] }) {
  return (
    <MegaMenu
      columns={3}
      categories={categories.map((c) => ({ key: c.key, label: c.label, heading: c.menuHeading, items: c.items }))}
      promo={{ eyebrow: "Dedicated teams", title: "Build your remote engineering team", text: "Developers who work in your tools and overlap with your working hours.", href: "/contact-us", cta: "Hire developers" }}
    />
  );
}
