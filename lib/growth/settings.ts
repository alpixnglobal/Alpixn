import { connectToDatabase } from "@/lib/db";
import { GrowthSettingsModel } from "./models";

export type Autonomy = "off" | "suggest" | "approve" | "auto";

export const AGENTS = {
  qualification: { label: "Lead qualification & scoring", description: "Reads every enquiry and conversation, extracts requirements, budget and timeline, scores intent and segments leads." },
  conversation: { label: "Conversation agent", description: "Replies to enquiries on website chat, WhatsApp, Instagram, Messenger and email, answers service questions and handles objections." },
  followup: { label: "Follow-up agent", description: "Sends personalised follow-ups (email sequences, WhatsApp templates) until the lead replies, books, buys or opts out." },
  meetings: { label: "Meeting scheduler", description: "Offers a booking link, confirms meetings and sends reminders." },
  proposals: { label: "Proposal & quotation agent", description: "Drafts proposals priced only from your price catalog. Always reviewed by a human before sending." },
  ads: { label: "Ads agent (Meta)", description: "Monitors campaigns, flags underperformers, recommends budgets and creatives, and can optimise within your limits." },
  marketing: { label: "Marketing strategist", description: "Researches segments, plans campaigns and writes ad copy, headlines and landing-page content." },
  analytics: { label: "Analytics & reporting", description: "Sales forecasting, campaign ROI and the daily briefing." },
  learning: { label: "Learning agent", description: "Runs A/B experiments and proposes better prompts and timing from measured results. Changes need approval." },
} as const;

export type AgentKey = keyof typeof AGENTS;
export type ChannelKey = "email" | "whatsapp" | "instagram" | "messenger" | "web_chat";

export type GrowthSettings = {
  globalPaused: boolean;
  agents: Record<AgentKey, { enabled: boolean; autonomy: Autonomy }>;
  channels: Record<ChannelKey, { enabled: boolean; dailyLimit: number }>;
  workingHours: { timezone: string; days: number[]; start: string; end: string; instantRepliesAnyTime: boolean };
  escalation: { notifyEmail: string; scoreThreshold: number; keywords: string[] };
  ads: { dailyLimit: number; monthlyLimit: number; maxCpl: number; allowedCountries: string[]; maxBudgetChangePercent: number };
  meetings: { durationMin: number; days: number[]; start: string; end: string; bufferMin: number; location: string; reminderHours: number[]; minNoticeHours: number };
  proposals: { validityDays: number; taxPercent: number };
};

export const DEFAULT_GROWTH_SETTINGS: GrowthSettings = {
  globalPaused: false,
  agents: {
    qualification: { enabled: true, autonomy: "auto" },
    conversation: { enabled: true, autonomy: "auto" },
    followup: { enabled: true, autonomy: "approve" },
    meetings: { enabled: true, autonomy: "auto" },
    proposals: { enabled: true, autonomy: "approve" },
    ads: { enabled: true, autonomy: "suggest" },
    marketing: { enabled: true, autonomy: "suggest" },
    analytics: { enabled: true, autonomy: "auto" },
    learning: { enabled: true, autonomy: "suggest" },
  },
  channels: {
    web_chat: { enabled: true, dailyLimit: 2000 },
    email: { enabled: true, dailyLimit: 30 },
    whatsapp: { enabled: true, dailyLimit: 200 },
    instagram: { enabled: true, dailyLimit: 200 },
    messenger: { enabled: true, dailyLimit: 200 },
  },
  workingHours: { timezone: "Asia/Kolkata", days: [1, 2, 3, 4, 5, 6], start: "09:00", end: "19:00", instantRepliesAnyTime: true },
  escalation: { notifyEmail: "info@alpixn.com", scoreThreshold: 70, keywords: ["discount", "contract", "negotiate", "call me", "urgent", "budget approved", "ready to start", "sign", "invoice", "payment"] },
  ads: { dailyLimit: 0, monthlyLimit: 0, maxCpl: 0, allowedCountries: ["IN"], maxBudgetChangePercent: 20 },
  meetings: { durationMin: 30, days: [1, 2, 3, 4, 5], start: "10:00", end: "18:00", bufferMin: 15, location: "Google Meet / Zoom link will be shared by email", reminderHours: [24, 1], minNoticeHours: 4 },
  proposals: { validityDays: 15, taxPercent: 18 },
};

function merge(data: Partial<GrowthSettings>): GrowthSettings {
  const d = DEFAULT_GROWTH_SETTINGS;
  return {
    ...d,
    ...data,
    agents: Object.fromEntries((Object.keys(d.agents) as AgentKey[]).map((k) => [k, { ...d.agents[k], ...(data.agents?.[k] ?? {}) }])) as GrowthSettings["agents"],
    channels: Object.fromEntries((Object.keys(d.channels) as ChannelKey[]).map((k) => [k, { ...d.channels[k], ...(data.channels?.[k] ?? {}) }])) as GrowthSettings["channels"],
    workingHours: { ...d.workingHours, ...(data.workingHours ?? {}) },
    escalation: { ...d.escalation, ...(data.escalation ?? {}) },
    ads: { ...d.ads, ...(data.ads ?? {}) },
    meetings: { ...d.meetings, ...(data.meetings ?? {}) },
    proposals: { ...d.proposals, ...(data.proposals ?? {}) },
  };
}

export async function getGrowthSettings(): Promise<GrowthSettings> {
  if (!process.env.MONGODB_URI) return DEFAULT_GROWTH_SETTINGS;
  try {
    await connectToDatabase();
    const doc = (await GrowthSettingsModel.findOne({ key: "growth" }).lean()) as { data?: Partial<GrowthSettings> } | null;
    return merge(doc?.data ?? {});
  } catch {
    return DEFAULT_GROWTH_SETTINGS;
  }
}

export async function saveGrowthSettings(patch: Partial<GrowthSettings>) {
  await connectToDatabase();
  const current = await getGrowthSettings();
  const next = merge({ ...current, ...patch });
  await GrowthSettingsModel.updateOne({ key: "growth" }, { $set: { key: "growth", data: next } }, { upsert: true });
  return next;
}

/** Minutes since midnight for "HH:MM". */
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

/** Day of week (0 = Sunday) and minutes in a time zone. */
export function zonedNow(timezone: string, at = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) % 24 * 60 + Number(get("minute")) };
}

export function isWithinWorkingHours(s: GrowthSettings, at = new Date()) {
  const { day, minutes } = zonedNow(s.workingHours.timezone, at);
  return s.workingHours.days.includes(day) && minutes >= toMin(s.workingHours.start) && minutes < toMin(s.workingHours.end);
}

/** Next moment working hours start (checks the next 8 days in 15-minute steps). */
export function nextWorkingTime(s: GrowthSettings, from = new Date()) {
  for (let i = 0; i < 8 * 96; i++) {
    const t = new Date(from.getTime() + i * 15 * 60000);
    if (isWithinWorkingHours(s, t)) return t;
  }
  return from;
}
