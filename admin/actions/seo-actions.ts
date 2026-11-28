"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { SeoPageModel, SeoSettingsModel } from "@/lib/models";
import { DEFAULT_SEO_SETTINGS, SEO_ID_PATTERNS, extractVerificationCode, getSeoSettings, normalizePath, type SeoSettings } from "@/lib/seo-store";

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const list = (value: string) =>
  value
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

/** Only http(s) URLs or site-relative paths are accepted for canonical / image fields. */
function safeUrl(value: string) {
  if (!value) return "";
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : "";
  } catch {
    return "";
  }
}

async function db(back: string) {
  try {
    await connectToDatabase();
  } catch {
    redirect(`${back}${back.includes("?") ? "&" : "?"}error=${encodeURIComponent("Database unavailable. Check MongoDB connection.")}`);
  }
}

function refresh(path?: string) {
  revalidateTag("seo", { expire: 0 });
  if (path) revalidatePath(path);
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
}

export async function saveSeoPageAction(formData: FormData) {
  await requireAdminSession("seo");
  const path = normalizePath(text(formData, "path"));
  const back = `/admin/seo?path=${encodeURIComponent(path)}`;
  await db(back);
  const payload = {
    path,
    title: text(formData, "title").slice(0, 200),
    description: text(formData, "description").slice(0, 400),
    keywords: list(text(formData, "keywords")).slice(0, 30),
    canonical: safeUrl(text(formData, "canonical")),
    ogImage: safeUrl(text(formData, "ogImage")),
    noindex: formData.get("noindex") === "on",
    excludeFromSitemap: formData.get("excludeFromSitemap") === "on",
  };
  await SeoPageModel.updateOne({ path }, { $set: payload }, { upsert: true });
  refresh(path);
  redirect(`${back}&status=saved`);
}

export async function resetSeoPageAction(formData: FormData) {
  await requireAdminSession("seo");
  const path = normalizePath(text(formData, "path"));
  const back = `/admin/seo?path=${encodeURIComponent(path)}`;
  await db(back);
  await SeoPageModel.deleteOne({ path });
  refresh(path);
  redirect(`${back}&status=saved`);
}

export async function saveSeoSettingsAction(formData: FormData) {
  await requireAdminSession("seo");
  const back = "/admin/seo?tab=settings";
  await db(back);

  const errors: string[] = [];
  const id = (key: "ga4Id" | "gtmId" | "clarityId" | "metaPixelId", label: string) => {
    const v = text(formData, key);
    if (v && !SEO_ID_PATTERNS[key]?.test(v)) errors.push(`${label} looks invalid`);
    return v && SEO_ID_PATTERNS[key]?.test(v) ? v : "";
  };
  const verify = (key: keyof SeoSettings, label: string) => {
    const raw = text(formData, key);
    const code = raw ? extractVerificationCode(raw) : "";
    if (raw && !code) errors.push(`${label} code looks invalid`);
    return code;
  };

  const current = await getSeoSettings();
  const data: SeoSettings = {
    ...DEFAULT_SEO_SETTINGS,
    ...current,
    defaultDescription: text(formData, "defaultDescription").slice(0, 300) || DEFAULT_SEO_SETTINGS.defaultDescription,
    defaultOgImage: safeUrl(text(formData, "defaultOgImage")) || DEFAULT_SEO_SETTINGS.defaultOgImage,
    twitterHandle: text(formData, "twitterHandle").slice(0, 40),
    indexSite: formData.get("indexSite") === "on",
    disallowPaths: list(text(formData, "disallowPaths")).map(normalizePath).filter((p) => p !== "/").slice(0, 50),
    ga4Id: id("ga4Id", "Google Analytics ID"),
    gtmId: id("gtmId", "Tag Manager ID"),
    clarityId: id("clarityId", "Microsoft Clarity ID"),
    metaPixelId: id("metaPixelId", "Meta Pixel ID"),
    googleVerification: verify("googleVerification", "Google Search Console"),
    bingVerification: verify("bingVerification", "Bing Webmaster"),
    yandexVerification: verify("yandexVerification", "Yandex"),
    pinterestVerification: verify("pinterestVerification", "Pinterest"),
    facebookVerification: verify("facebookVerification", "Facebook"),
    organizationSameAs: list(text(formData, "organizationSameAs")).map(safeUrl).filter(Boolean).slice(0, 20),
  };

  await SeoSettingsModel.updateOne({ key: "seo" }, { $set: { key: "seo", data } }, { upsert: true });
  refresh();
  revalidatePath("/", "layout");
  redirect(`${back}&status=saved${errors.length ? `&error=${encodeURIComponent(`${errors.join("; ")} — those fields were left empty.`)}` : ""}`);
}
