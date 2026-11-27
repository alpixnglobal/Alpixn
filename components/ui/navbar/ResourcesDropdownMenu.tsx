"use client";

import MegaMenu from "./MegaMenu";

const ITEMS = [
  { label: "Blog & Articles", href: "/resources/blogs", description: "Guides on AI, robotics and software" },
  { label: "Portfolio", href: "/resources/portfolio", description: "Projects and interactive demos" },
  { label: "Careers", href: "/resources/careers", description: "Open roles at ALPIXN" },
  { label: "Our Team", href: "/resources/our-team", description: "The people behind the work" },
  { label: "Internship Alumni", href: "/resources/interns-alumni", description: "Our internship programme" },
];

type ResourcesMenuCopy = { title: string; description: string; descriptionSecondary: string; buttonLabel: string; buttonHref: string; imageData: string };

// CMS menu copy is accepted for compatibility; the panel uses fixed, accurate descriptions.
export default function ResourcesDropdownMenu(props: { menu?: ResourcesMenuCopy }) {
  void props;
  return (
    <MegaMenu
      columns={2}
      categories={[{ key: "resources", label: "Resources", heading: "Learn and explore", items: ITEMS }]}
      promo={{ eyebrow: "From the blog", title: "Field notes on AI, robotics and software", text: "Practical articles from the ALPIXN Editorial Team.", href: "/resources/blogs", cta: "Read the blog" }}
    />
  );
}
