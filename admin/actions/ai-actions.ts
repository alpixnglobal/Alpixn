"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import { canRunInBackground, generateBlogPost, startBlogPostInBackground } from "@/lib/ai/blog-writer";
import { canEncrypt, encryptSecret } from "@/lib/ai/crypto";
import { testProvider } from "@/lib/ai/providers";
import { getAiSettings, saveAiSettings, type AiProvider } from "@/lib/ai/settings";
import { API_SCOPES, createApiToken, type ApiScope } from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { ApiTokenModel } from "@/lib/models";

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const back = (tab: string, query = "") => `/admin/ai?tab=${tab}${query}`;
const err = (tab: string, message: string) => redirect(back(tab, `&error=${encodeURIComponent(message)}`));

async function db(tab: string) {
  try {
    await connectToDatabase();
  } catch {
    err(tab, "Database unavailable. Check MongoDB connection.");
  }
}

export async function saveProviderAction(formData: FormData) {
  await requireAdminSession();
  await db("providers");
  const id = text(formData, "id");
  const settings = await getAiSettings();
  const apiKey = text(formData, "apiKey");
  if (apiKey && !canEncrypt()) err("providers", "Set AUTH_SECRET (or AI_ENCRYPTION_KEY) before saving keys in the admin.");
  const baseUrl = text(formData, "baseUrl");
  if (baseUrl && !baseUrl.startsWith("https://")) err("providers", "Base URL must start with https://");

  const providers = settings.providers.map((p): AiProvider =>
    p.id !== id
      ? p
      : {
          ...p,
          label: text(formData, "label") || p.label,
          model: text(formData, "model") || p.model,
          baseUrl: p.type === "openai-compatible" ? baseUrl : "",
          enabled: formData.get("enabled") === "on",
          apiKeyEnc: formData.get("clearKey") === "on" ? "" : apiKey ? encryptSecret(apiKey) : p.apiKeyEnc,
        }
  );
  const defaultProviderId = formData.get("makeDefault") === "on" ? id : settings.defaultProviderId;
  await saveAiSettings({ ...settings, providers, defaultProviderId });
  revalidatePath("/admin/ai");
  redirect(back("providers", "&status=saved"));
}

export async function addProviderAction(formData: FormData) {
  await requireAdminSession();
  await db("providers");
  const settings = await getAiSettings();
  const label = text(formData, "label");
  const model = text(formData, "model");
  const baseUrl = text(formData, "baseUrl");
  const apiKey = text(formData, "apiKey");
  const type = text(formData, "type") as AiProvider["type"];
  if (!label || !model) err("providers", "Name and model are required.");
  if (!["anthropic", "openai", "gemini", "openai-compatible"].includes(type)) err("providers", "Choose a provider type.");
  if (type === "openai-compatible" && !baseUrl.startsWith("https://")) err("providers", "Base URL must start with https://");
  if (apiKey && !canEncrypt()) err("providers", "Set AUTH_SECRET (or AI_ENCRYPTION_KEY) before saving keys in the admin.");
  const id = `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "provider"}-${Date.now().toString(36)}`;
  await saveAiSettings({
    ...settings,
    providers: [...settings.providers, { id, type, label, model, baseUrl: type === "openai-compatible" ? baseUrl : "", apiKeyEnc: apiKey ? encryptSecret(apiKey) : "", enabled: true }],
  });
  revalidatePath("/admin/ai");
  redirect(back("providers", "&status=saved"));
}

export async function removeProviderAction(formData: FormData) {
  await requireAdminSession();
  await db("providers");
  const id = text(formData, "id");
  const settings = await getAiSettings();
  if (["claude", "chatgpt", "gemini"].includes(id)) err("providers", "Built-in providers can be switched off but not removed.");
  await saveAiSettings({ ...settings, providers: settings.providers.filter((p) => p.id !== id) });
  redirect(back("providers", "&status=saved"));
}

export async function testProviderAction(formData: FormData) {
  await requireAdminSession();
  await db("providers");
  const settings = await getAiSettings();
  const provider = settings.providers.find((p) => p.id === text(formData, "id"));
  if (!provider) err("providers", "Provider not found.");
  try {
    await testProvider(provider!);
  } catch (e) {
    err("providers", `${provider!.label}: ${e instanceof Error ? e.message : "test failed"}`);
  }
  redirect(back("providers", `&status=${encodeURIComponent(`${provider!.label} is connected and working.`)}`));
}

export async function saveAutopilotAction(formData: FormData) {
  await requireAdminSession();
  await db("autopilot");
  const settings = await getAiSettings();
  const day = Number(text(formData, "dayOfWeek"));
  const minWords = Number(text(formData, "minWords"));
  await saveAiSettings({
    ...settings,
    autopilot: {
      enabled: formData.get("enabled") === "on",
      publishMode: text(formData, "publishMode") === "publish" ? "publish" : "draft",
      dayOfWeek: Number.isInteger(day) && day >= 0 && day <= 6 ? day : 1,
      providerId: text(formData, "providerId") || settings.defaultProviderId,
      topics: text(formData, "topics")
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 100),
      brief: text(formData, "brief").slice(0, 1500),
      minWords: Number.isFinite(minWords) ? Math.min(3000, Math.max(600, minWords)) : 1200,
    },
  });
  revalidatePath("/admin/ai");
  redirect(back("autopilot", "&status=saved"));
}

export async function generateNowAction(formData: FormData) {
  await requireAdminSession();
  await db("autopilot");
  const opts = {
    trigger: "manual" as const,
    topic: text(formData, "topic") || undefined,
    publish: text(formData, "publish") === "publish" ? true : text(formData, "publish") === "draft" ? false : undefined,
  };
  if (canRunInBackground()) {
    // AWS/PM2: write in the background so Nginx's request timeout can't cut it off.
    const started = await startBlogPostInBackground(opts);
    if (!started.started) err("autopilot", started.reason);
    redirect(back("autopilot", `&status=${encodeURIComponent("Writing started. The article appears under Recent activity in 1–3 minutes — refresh this page.")}`));
  }
  const result = await generateBlogPost(opts);
  if (!result.ok) err("autopilot", result.error);
  revalidatePath("/admin/blogs");
  redirect(back("autopilot", `&status=${encodeURIComponent(`${result.ok && result.published ? "Published" : "Draft saved"}: ${result.ok ? result.title : ""}`)}`));
}

export async function createApiTokenAction(formData: FormData) {
  await requireAdminSession();
  await db("api");
  const name = text(formData, "name").slice(0, 60);
  const allowed = new Set(API_SCOPES.map((s) => s.key));
  const scopes = formData.getAll("scopes").map(String).filter((s): s is ApiScope => allowed.has(s as ApiScope));
  if (!name) err("api", "Give the token a name, e.g. “ChatGPT blog writer”.");
  if (!scopes.length) err("api", "Choose at least one permission.");
  const token = await createApiToken(name, scopes);
  // Shown once on the next page load, then gone. Never stored in plain text.
  (await cookies()).set("alpx_new_token", token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 30, path: "/admin/ai" });
  redirect(back("api", "&status=created"));
}

export async function revokeApiTokenAction(formData: FormData) {
  await requireAdminSession();
  await db("api");
  await ApiTokenModel.updateOne({ _id: text(formData, "id") }, { $set: { revoked: true } });
  redirect(back("api", "&status=saved"));
}
