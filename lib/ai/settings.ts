import { connectToDatabase } from "@/lib/db";
import { AiSettingsModel } from "@/lib/models";
import { decryptSecret, maskSecret } from "./crypto";

export type ProviderType = "anthropic" | "openai" | "gemini" | "openai-compatible";

export type AiProvider = {
  id: string;
  type: ProviderType;
  label: string;
  model: string;
  /** Only for "openai-compatible" providers (e.g. a self-hosted model or another vendor). */
  baseUrl: string;
  /** Encrypted with lib/ai/crypto. Empty means "use the environment variable". */
  apiKeyEnc: string;
  enabled: boolean;
};

export type AutopilotSettings = {
  enabled: boolean;
  /** "draft": saved unpublished for review. "publish": goes live automatically. */
  publishMode: "draft" | "publish";
  /** 0 = Sunday … 6 = Saturday (India time). */
  dayOfWeek: number;
  providerId: string;
  /** Topics written in order; when empty the AI proposes a new topic itself. */
  topics: string[];
  /** Extra guidance added to every brief (audience, tone, focus). */
  brief: string;
  minWords: number;
};

export type AiRunLog = { at: string; status: "ok" | "error" | "skipped"; message: string; slug?: string; provider?: string; trigger: "cron" | "manual" | "api" };

export type AiSettings = {
  providers: AiProvider[];
  defaultProviderId: string;
  autopilot: AutopilotSettings;
  log: AiRunLog[];
};

export const PROVIDER_ENV: Record<ProviderType, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  gemini: "GEMINI_API_KEY",
  "openai-compatible": "",
};

export const DEFAULT_AI_SETTINGS: AiSettings = {
  providers: [
    { id: "claude", type: "anthropic", label: "Claude (Anthropic)", model: "claude-opus-5-5", baseUrl: "", apiKeyEnc: "", enabled: true },
    { id: "chatgpt", type: "openai", label: "ChatGPT (OpenAI)", model: "gpt-5", baseUrl: "", apiKeyEnc: "", enabled: false },
    { id: "gemini", type: "gemini", label: "Gemini (Google)", model: "gemini-2.5-pro", baseUrl: "", apiKeyEnc: "", enabled: false },
  ],
  defaultProviderId: "claude",
  autopilot: {
    enabled: false,
    publishMode: "draft",
    dayOfWeek: 1,
    providerId: "claude",
    topics: [],
    brief: "Write for founders, CTOs and operations leaders at small and mid-sized businesses evaluating AI, automation and custom software. Practical, plain English, no hype.",
    minWords: 1200,
  },
  log: [],
};

export async function getAiSettings(): Promise<AiSettings> {
  if (!process.env.MONGODB_URI) return DEFAULT_AI_SETTINGS;
  try {
    await connectToDatabase();
  } catch {
    return DEFAULT_AI_SETTINGS;
  }
  const doc = (await AiSettingsModel.findOne({ key: "ai" }).lean()) as { data?: Partial<AiSettings> } | null;
  const data = doc?.data ?? {};
  return {
    ...DEFAULT_AI_SETTINGS,
    ...data,
    providers: data.providers?.length ? data.providers : DEFAULT_AI_SETTINGS.providers,
    autopilot: { ...DEFAULT_AI_SETTINGS.autopilot, ...(data.autopilot ?? {}) },
    log: data.log ?? [],
  };
}

export async function saveAiSettings(next: AiSettings) {
  await connectToDatabase();
  await AiSettingsModel.updateOne({ key: "ai" }, { $set: { key: "ai", data: { ...next, log: next.log.slice(0, 50) } } }, { upsert: true });
}

export async function appendAiLog(entry: AiRunLog) {
  const s = await getAiSettings();
  await saveAiSettings({ ...s, log: [entry, ...s.log].slice(0, 50) });
}

/** The provider's API key: the encrypted key saved in the admin, else the environment variable. */
export function resolveApiKey(p: AiProvider) {
  return decryptSecret(p.apiKeyEnc) || (PROVIDER_ENV[p.type] ? process.env[PROVIDER_ENV[p.type]] ?? "" : "");
}

/** Safe view for the admin UI: never includes the key itself. */
export function providerKeyStatus(p: AiProvider) {
  const saved = decryptSecret(p.apiKeyEnc);
  if (saved) return { source: "admin" as const, hint: maskSecret(saved) };
  const env = PROVIDER_ENV[p.type] && process.env[PROVIDER_ENV[p.type]];
  if (env) return { source: "env" as const, hint: `${PROVIDER_ENV[p.type]} (Vercel)` };
  return { source: "none" as const, hint: "" };
}
