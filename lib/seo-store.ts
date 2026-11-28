import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { SeoPageModel, SeoSettingsModel } from "@/lib/models";
import { absoluteUrl } from "@/lib/seo";

/* ---------------- types & defaults ---------------- */

export type SeoSettings = {
  /** Default description used when a page has none. */
  defaultDescription: string;
  /** Default social share image (absolute URL or site path). */
  defaultOgImage: string;
  twitterHandle: string;
  /** Turn off to keep the whole site out of search engines (e.g. a staging copy). */
  indexSite: boolean;
  /** Extra paths blocked in robots.txt, e.g. /demos. */
  disallowPaths: string[];
  /* analytics */
  ga4Id: string;
  gtmId: string;
  clarityId: string;
  metaPixelId: string;
  /* webmaster tools verification codes */
  googleVerification: string;
  bingVerification: string;
  yandexVerification: string;
  pinterestVerification: string;
  facebookVerification: string;
  /* organization schema */
  organizationSameAs: string[];
};

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  defaultDescription:
    "ALPIXN is an AI, robotics and software technology company delivering custom software, AI-powered solutions, intelligent automation, and web and mobile apps.",
  defaultOgImage: "/opengraph-image.jpg",
  twitterHandle: "@Alpixn",
  indexSite: true,
  disallowPaths: [],
  ga4Id: "",
  gtmId: "",
  clarityId: "",
  metaPixelId: "",
  googleVerification: "",
  bingVerification: "",
  yandexVerification: "",
  pinterestVerification: "",
  facebookVerification: "",
  organizationSameAs: [
    "https://www.linkedin.com/company/alpixn",
    "https://www.instagram.com/Alpixnglobal",
    "https://www.facebook.com/Alpixn",
    "https://x.com/Alpixn",
    "https://youtube.com/@Alpixnglobal",
  ],
};

export type SeoPageOverride = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage: string;
  noindex: boolean;
  excludeFromSitemap: boolean;
  updatedAt?: string;
};

/** Validation patterns for IDs pasted in the admin (prevents arbitrary script injection). */
export const SEO_ID_PATTERNS: Partial<Record<keyof SeoSettings, RegExp>> = {
  ga4Id: /^G-[A-Z0-9]{4,15}$/,
  gtmId: /^GTM-[A-Z0-9]{4,12}$/,
  clarityId: /^[a-z0-9]{6,20}$/,
  metaPixelId: /^\d{6,20}$/,
};

/** Accepts either the bare code or the full <meta ... content="..."> tag and returns the code. */
export function extractVerificationCode(value: string) {
  const v = value.trim();
  const match = v.match(/content\s*=\s*["']([^"']+)["']/i);
  const code = (match ? match[1] : v).trim();
  return /^[A-Za-z0-9_\-=.:+/]{4,200}$/.test(code) ? code : "";
}

/** Normalises a site path: leading slash, no trailing slash (except "/"), no query/hash. */
export function normalizePath(input: string) {
  let p = input.trim();
  try {
    if (/^https?:\/\//i.test(p)) p = new URL(p).pathname;
  } catch {
    /* keep as-is */
  }
  p = p.split(/[?#]/)[0] || "/";
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p;
}

/* ---------------- reads ---------------- */

async function connected() {
  if (!process.env.MONGODB_URI) return false;
  try {
    await connectToDatabase();
    return true;
  } catch {
    return false;
  }
}

export async function getSeoSettings(): Promise<SeoSettings> {
  if (!(await connected())) return DEFAULT_SEO_SETTINGS;
  const doc = (await SeoSettingsModel.findOne({ key: "seo" }).lean()) as { data?: Partial<SeoSettings> } | null;
  return { ...DEFAULT_SEO_SETTINGS, ...(doc?.data ?? {}) };
}

export async function getSeoPageOverrides(): Promise<SeoPageOverride[]> {
  if (!(await connected())) return [];
  const docs = (await SeoPageModel.find().sort({ path: 1 }).lean()) as unknown as (SeoPageOverride & { updatedAt?: Date })[];
  return docs.map((d) => ({
    path: d.path,
    title: d.title ?? "",
    description: d.description ?? "",
    keywords: d.keywords ?? [],
    canonical: d.canonical ?? "",
    ogImage: d.ogImage ?? "",
    noindex: Boolean(d.noindex),
    excludeFromSitemap: Boolean(d.excludeFromSitemap),
    updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : undefined,
  }));
}

export const getCachedSeoSettings = unstable_cache(getSeoSettings, ["seo-settings"], { tags: ["seo"], revalidate: 3600 });
export const getCachedSeoPageOverrides = unstable_cache(getSeoPageOverrides, ["seo-pages"], { tags: ["seo"], revalidate: 3600 });

/* ---------------- metadata merge ---------------- */

const imageUrl = (src: string) => (src ? absoluteUrl(src) : "");

/**
 * Applies admin-managed SEO (per-page overrides + site-wide indexing switch) on top of a page's
 * built-in metadata. Every public page passes its own path here from generateMetadata.
 */
export async function withSeo(path: string, base: Metadata): Promise<Metadata> {
  const [settings, overrides] = await Promise.all([getCachedSeoSettings(), getCachedSeoPageOverrides()]);
  const o = overrides.find((item) => item.path === normalizePath(path));
  const meta: Metadata = { ...base };

  if (o?.title) meta.title = { absolute: o.title };
  if (o?.description) meta.description = o.description;
  if (o?.keywords?.length) meta.keywords = o.keywords;
  if (o?.canonical) meta.alternates = { ...(base.alternates ?? {}), canonical: o.canonical };
  else if (!base.alternates?.canonical) meta.alternates = { ...(base.alternates ?? {}), canonical: normalizePath(path) };

  const ogImage = imageUrl(o?.ogImage || "");
  if (o?.title || o?.description || ogImage) {
    meta.openGraph = {
      ...(base.openGraph ?? {}),
      ...(o?.title ? { title: o.title } : {}),
      ...(o?.description ? { description: o.description } : {}),
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    };
    meta.twitter = {
      ...(base.twitter ?? {}),
      ...(o?.title ? { title: o.title } : {}),
      ...(o?.description ? { description: o.description } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    };
  }

  if (!settings.indexSite || o?.noindex) meta.robots = { index: false, follow: !o?.noindex || settings.indexSite };
  return meta;
}
