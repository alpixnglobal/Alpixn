"use client";

import MegaMenu from "./MegaMenu";

type ProductNavItem = { label: string; href: string };
type ProductMenuCopy = { title: string; description: string; descriptionSecondary: string; buttonLabel: string; buttonHref: string; imageData: string };

export default function ProducstsDropdownMenu({ items, menu }: { items: ProductNavItem[]; menu: ProductMenuCopy }) {
  const list = items.length ? items : [{ label: "All products", href: "/products" }];
  return (
    <MegaMenu
      columns={2}
      categories={[{ key: "products", label: "Products", heading: "Our products", items: list }]}
      promo={{ eyebrow: "Products", title: menu.title || "Ready-to-use software", text: menu.description, href: menu.buttonHref || "/products", cta: menu.buttonLabel && !/let.?s talk/i.test(menu.buttonLabel) ? menu.buttonLabel : "View all products" }}
    />
  );
}
