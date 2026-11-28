"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { BILLING_LABEL, DEFAULT_CATALOG, type Billing, type PricingCatalog } from "@/lib/pricing/catalog";
import { savePricingData, type AssistantSettings } from "@/lib/pricing/store";

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const BILLINGS = Object.keys(BILLING_LABEL) as Billing[];
const str = (v: unknown, n = 300) => String(v ?? "").trim().slice(0, n);
const num = (v: unknown) => Math.max(0, Math.min(1e9, Math.round(Number(v) || 0)));
const id = (v: unknown, fallback: string) => (str(v, 80).replace(/[^a-z0-9-]/gi, "") || fallback).toLowerCase();
const billing = (v: unknown): Billing => (BILLINGS.includes(v as Billing) ? (v as Billing) : "one-time");

function refresh() {
  revalidateTag("pricing", { expire: 0 });
  revalidatePath("/pricing");
  revalidatePath("/", "layout");
}

async function save(data: Parameters<typeof savePricingData>[0], back: string) {
  try {
    await savePricingData(data);
  } catch {
    redirect(`${back}&error=${encodeURIComponent("Database unavailable. Check MongoDB connection.")}`);
  }
}

/** Validates the catalog posted by the admin editor. */
function cleanCatalog(raw: unknown): PricingCatalog {
  const c = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const cats = Array.isArray(c.categories) ? c.categories : [];
  return {
    currency: "INR",
    gstNote: str(c.gstNote, 400),
    disclaimer: str(c.disclaimer, 800),
    categories: cats.slice(0, 40).map((rawCat, ci) => {
      const cat = rawCat as Record<string, unknown>;
      const catId = id(cat.id, `service-${ci + 1}`);
      return {
        id: catId,
        name: str(cat.name, 80) || `Service ${ci + 1}`,
        short: str(cat.short, 160),
        description: str(cat.description, 400),
        notes: (Array.isArray(cat.notes) ? cat.notes : []).map((n) => str(n, 300)).filter(Boolean).slice(0, 10),
        packages: (Array.isArray(cat.packages) ? cat.packages : []).slice(0, 12).map((rawP, pi) => {
          const p = rawP as Record<string, unknown>;
          return {
            id: id(p.id, `${catId}-${pi + 1}`),
            name: str(p.name, 80) || `Package ${pi + 1}`,
            priceFrom: num(p.priceFrom),
            priceTo: num(p.priceTo),
            billing: billing(p.billing),
            timeline: str(p.timeline, 80),
            bestFor: str(p.bestFor, 200),
            includes: (Array.isArray(p.includes) ? p.includes : []).map((x) => str(x, 160)).filter(Boolean).slice(0, 15),
            ...(str(p.recurring, 160) ? { recurring: str(p.recurring, 160) } : {}),
            ...(str(p.priceNote, 80) ? { priceNote: str(p.priceNote, 80) } : {}),
          };
        }),
        addOns: (Array.isArray(cat.addOns) ? cat.addOns : []).slice(0, 20).map((rawA, ai) => {
          const a = rawA as Record<string, unknown>;
          return { id: id(a.id, `${catId}-addon-${ai + 1}`), name: str(a.name, 120) || `Add-on ${ai + 1}`, price: num(a.price), billing: billing(a.billing) };
        }),
      };
    }),
  };
}

export async function saveCatalogAction(formData: FormData) {
  await requireAdminSession();
  const back = "/admin/pricing?tab=prices";
  let parsed: unknown;
  try {
    parsed = JSON.parse(text(formData, "catalog") || "{}");
  } catch {
    redirect(`${back}&error=${encodeURIComponent("Could not read the price list.")}`);
  }
  const catalog = cleanCatalog(parsed);
  if (!catalog.categories.length) redirect(`${back}&error=${encodeURIComponent("Add at least one service.")}`);
  await save({ catalog }, back);
  refresh();
  redirect(`${back}&status=saved`);
}

export async function resetCatalogAction() {
  await requireAdminSession();
  await save({ catalog: DEFAULT_CATALOG }, "/admin/pricing?tab=prices");
  refresh();
  redirect("/admin/pricing?tab=prices&status=saved");
}

export async function saveAssistantSettingsAction(formData: FormData) {
  await requireAdminSession();
  const back = "/admin/pricing?tab=assistant";
  const mode = text(formData, "mode");
  const assistant: AssistantSettings = {
    enabled: formData.get("enabled") === "on",
    name: text(formData, "name").slice(0, 60) || "ALPIXN Assistant",
    greeting: text(formData, "greeting").slice(0, 400) || "Hi! How can I help with your project?",
    mode: mode === "guided" || mode === "ai" ? mode : "auto",
    providerId: text(formData, "providerId").slice(0, 80),
    showOnHome: formData.get("showOnHome") === "on",
  };
  await save({ assistant }, back);
  refresh();
  redirect(`${back}&status=saved`);
}
