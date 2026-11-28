import { connectToDatabase } from "@/lib/db";
import { SalesLeadModel } from "@/lib/models";
import type { ApprovalType } from "./approvals";

type Ctx = { id: string; actor: string };
export type Executor = {
  run: (payload: Record<string, unknown>, ctx: Ctx) => Promise<string>;
  onReject?: (payload: Record<string, unknown>, ctx: Ctx) => Promise<void>;
};

const str = (v: unknown) => (typeof v === "string" ? v : "");

/**
 * What happens when an approval is approved, per type. Later phases add their executors here
 * (messages, proposals, ad changes). A type without an executor is simply recorded as approved.
 */
export const EXECUTORS: Partial<Record<ApprovalType, Executor>> = {
  /** A deal is marked won only by a human, with the confirmation recorded. */
  deal_won: {
    async run(payload, { actor }) {
      await connectToDatabase();
      const leadId = str(payload.leadId);
      const amount = Number(payload.amount) || 0;
      const lead = await SalesLeadModel.findById(leadId);
      if (!lead) throw new Error("Lead not found");
      lead.set("stage", "won");
      lead.set("deal", { ...(lead.get("deal") ?? {}), status: "won", amount, wonAt: new Date(), confirmedBy: actor, evidence: str(payload.evidence) });
      if (amount) lead.set("value", amount);
      lead.set("sequence.status", "stopped");
      (lead.get("timeline") as { push: (x: unknown) => void }).push({ at: new Date(), type: "won", text: `Deal confirmed won by ${actor}${amount ? ` (₹${amount.toLocaleString("en-IN")})` : ""}`, by: actor });
      await lead.save();
      const { startOnboarding } = await import("./onboarding").catch(() => ({ startOnboarding: null }));
      if (startOnboarding) await startOnboarding(leadId, actor).catch(() => undefined);
      return "Deal marked won";
    },
  },
};
