"use client";

import MegaMenu from "./MegaMenu";

type ExpertiseItem = { label: string; href: string; slug?: string };
type ExpertiseCategory = { key: string; label: string; description: string; menuHeading: string; items: ExpertiseItem[] };

export function OurExpertiseDropdownMenu({ categories }: { categories: ExpertiseCategory[] }) {
  return (
    <MegaMenu
      categories={categories.map((c) => ({ key: c.key, label: c.label, description: c.description, heading: c.menuHeading, items: c.items }))}
      promo={{ eyebrow: "Not sure where to start?", title: "Get a clear plan for your idea", text: "Share your goals and we will suggest the right service, scope and first release.", href: "/contact-us", cta: "Talk to an expert" }}
    />
  );
}
