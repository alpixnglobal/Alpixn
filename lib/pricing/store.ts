import { unstable_cache } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { PricingSettingsModel } from "@/lib/models";
import { DEFAULT_CATALOG, type PricingCatalog } from "./catalog";

export type AssistantSettings = {
  enabled: boolean;
  name: string;
  greeting: string;
  /** "auto": AI when a provider key is set, otherwise guided questions. */
  mode: "auto" | "guided" | "ai";
  providerId: string;
  showOnHome: boolean;
};

export const DEFAULT_ASSISTANT: AssistantSettings = {
  enabled: true,
  name: "ALPIXN Assistant",
  greeting:
    "Hi! I'm the ALPIXN assistant 🤖 I can help you plan your project and give you an estimated budget. What would you like to build?",
  mode: "auto",
  providerId: "",
  showOnHome: true,
};

export type PricingData = { catalog: PricingCatalog; assistant: AssistantSettings };

export async function getPricingData(): Promise<PricingData> {
  if (!process.env.MONGODB_URI) return { catalog: DEFAULT_CATALOG, assistant: DEFAULT_ASSISTANT };
  try {
    await connectToDatabase();
  } catch {
    return { catalog: DEFAULT_CATALOG, assistant: DEFAULT_ASSISTANT };
  }
  const doc = (await PricingSettingsModel.findOne({ key: "pricing" }).lean()) as { data?: Partial<PricingData> } | null;
  return {
    catalog: doc?.data?.catalog?.categories?.length ? doc.data.catalog : DEFAULT_CATALOG,
    assistant: { ...DEFAULT_ASSISTANT, ...(doc?.data?.assistant ?? {}) },
  };
}

export async function savePricingData(next: Partial<PricingData>) {
  await connectToDatabase();
  const current = await getPricingData();
  await PricingSettingsModel.updateOne({ key: "pricing" }, { $set: { key: "pricing", data: { ...current, ...next } } }, { upsert: true });
}

export const getCachedPricingData = unstable_cache(getPricingData, ["pricing-data-v2"], { tags: ["pricing"], revalidate: 3600 });

/** Whether the chat robot can use an AI provider right now (cached for 5 minutes). */
export const getCachedAssistantAiReady = unstable_cache(
  async () => {
    const { assistant } = await getPricingData();
    if (assistant.mode === "guided") return false;
    const { pickAssistantProvider } = await import("@/lib/assistant/engine");
    return Boolean(await pickAssistantProvider(assistant).catch(() => null));
  },
  ["assistant-ai-ready"],
  { tags: ["pricing", "ai"], revalidate: 300 }
);
