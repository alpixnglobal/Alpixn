import { connectToDatabase } from "@/lib/db";
import { SalesLeadModel } from "@/lib/models";
import { MessageModel } from "./models";
import { AGENTS, getGrowthSettings, isWithinWorkingHours, nextWorkingTime, type AgentKey, type ChannelKey, type GrowthSettings } from "./settings";

/**
 * Actions that ALWAYS need a human, whatever the autonomy level (hard rules, not configurable):
 * pricing outside the catalog, discounts, contracts, payment terms, marking a deal won, sending a
 * proposal, and any new ad campaign / budget increase / objective change.
 */
export const ALWAYS_APPROVE = ["discount", "custom_price", "contract", "payment_terms", "deal_won", "proposal_send", "campaign_create", "campaign_budget_increase", "campaign_objective"] as const;

export type ActionKind =
  | "reply" // answering an inbound message (conversation agent)
  | "followup" // proactive message (sequences, nudges)
  | "meeting" // booking / reminders
  | "qualify" // internal scoring, no outbound effect
  | "report" // internal summaries
  | "recommend" // ads / marketing / learning suggestions
  | "campaign_pause" // pausing a campaign (reduces spend)
  | "campaign_budget_decrease"
  | (typeof ALWAYS_APPROVE)[number];

export type Decision =
  | { mode: "auto"; reason: string }
  | { mode: "approve"; reason: string; suggestOnly: boolean }
  | { mode: "defer"; reason: string; until: Date }
  | { mode: "blocked"; reason: string };

/** Outbound messages the AI sent today on a channel (for daily sending limits). */
export async function sentToday(channel: ChannelKey, timezone: string) {
  await connectToDatabase();
  const now = new Date();
  const local = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
  const startOfDay = new Date(now.getTime() - (local.getHours() * 3600 + local.getMinutes() * 60 + local.getSeconds()) * 1000);
  return MessageModel.countDocuments({ channel, direction: "out", author: { $regex: "^ai" }, status: { $in: ["sent", "delivered", "read", "queued"] }, createdAt: { $gte: startOfDay } });
}

type DecideInput = {
  agent: AgentKey;
  kind: ActionKind;
  channel?: ChannelKey;
  leadId?: string;
  settings?: GrowthSettings;
  at?: Date;
};

/**
 * The single place that decides whether an agent may act now, needs approval, should wait for working
 * hours, or must not act at all. Every agent calls this before any outbound or spending action.
 */
export async function decide(input: DecideInput): Promise<Decision> {
  const s = input.settings ?? (await getGrowthSettings());
  const at = input.at ?? new Date();
  const agent = s.agents[input.agent];

  if (s.globalPaused) return { mode: "blocked", reason: "All AI agents are paused" };
  if (!agent?.enabled || agent.autonomy === "off") return { mode: "blocked", reason: `${AGENTS[input.agent].label} is off` };

  // Communication preferences: opted-out / do-not-contact leads are never messaged.
  if (input.leadId && (input.kind === "reply" || input.kind === "followup" || input.kind === "meeting")) {
    await connectToDatabase();
    const lead = (await SalesLeadModel.findById(input.leadId).select("unsubscribed consent").lean().catch(() => null)) as {
      unsubscribed?: boolean;
      consent?: Record<string, { status?: string }>;
    } | null;
    if (lead?.unsubscribed && input.channel !== "web_chat") return { mode: "blocked", reason: "Lead unsubscribed" };
    if (input.channel && lead?.consent?.[input.channel]?.status === "opted_out") return { mode: "blocked", reason: `Lead opted out of ${input.channel}` };
  }

  if (input.channel) {
    const ch = s.channels[input.channel];
    if (!ch?.enabled) return { mode: "blocked", reason: `${input.channel} channel is off` };
    if (input.kind === "reply" || input.kind === "followup" || input.kind === "meeting") {
      const count = await sentToday(input.channel, s.workingHours.timezone);
      if (count >= ch.dailyLimit) return { mode: "blocked", reason: `Daily ${input.channel} limit reached (${ch.dailyLimit})` };
    }
  }

  if ((ALWAYS_APPROVE as readonly string[]).includes(input.kind)) return { mode: "approve", reason: "Needs human approval (hard rule)", suggestOnly: false };

  // Proactive messages wait for working hours; replies to people who just wrote may go any time if allowed.
  const outbound = input.kind === "followup" || input.kind === "meeting" || (input.kind === "reply" && !s.workingHours.instantRepliesAnyTime);
  if (outbound && !isWithinWorkingHours(s, at)) {
    return { mode: "defer", reason: "Outside working hours", until: nextWorkingTime(s, at) };
  }

  if (agent.autonomy === "suggest") return { mode: "approve", reason: "Agent is in suggest mode", suggestOnly: true };
  if (agent.autonomy === "approve") return { mode: "approve", reason: "Agent requires approval", suggestOnly: false };
  return { mode: "auto", reason: "Autonomous" };
}
