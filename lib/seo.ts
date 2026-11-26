import type { Metadata } from "next";

/** Canonical origin. Override with NEXT_PUBLIC_SITE_URL (e.g. for a staging domain). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://alpixn.com").replace(/\/$/, "");
export const SITE_NAME = "ALPIXN";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  /** Set false for pages that should not be indexed (e.g. thin utility pages). */
  index?: boolean;
  /** Use the title verbatim (skip the "| ALPIXN" template). */
  absoluteTitle?: boolean;
};

/** Consistent per-page metadata: unique title/description, canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, image, type = "website", publishedTime, modifiedTime, tags, index = true, absoluteTitle }: PageMetaInput): Metadata {
  const ogImage = image ? [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }] : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      ...(ogImage ? { images: ogImage } : {}),
      ...(type === "article" ? { publishedTime, modifiedTime, tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    },
  };
}

/** Trim text to a meta-description-friendly length on a word boundary. */
export function toDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/* ---------------- structured data builders (only describe visible content) ---------------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/brand/alpixn-logo-horizontal.png"),
    description: "ALPIXN is an AI, robotics and software engineering company building custom software, AI solutions and intelligent automation.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

export function serviceJsonLd({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceType ?? name,
    provider: { "@id": `${SITE_URL}/#organization` },
  };
}

export function articleJsonLd(a: { title: string; description: string; path: string; image?: string; publishedAt?: string; modifiedAt?: string; author: string; tags?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absoluteUrl(a.path),
    ...(a.image ? { image: [absoluteUrl(a.image)] } : {}),
    ...(a.publishedAt ? { datePublished: a.publishedAt } : {}),
    ...(a.modifiedAt || a.publishedAt ? { dateModified: a.modifiedAt || a.publishedAt } : {}),
    author: { "@type": "Organization", name: a.author, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(a.tags?.length ? { keywords: a.tags.join(", ") } : {}),
  };
}
