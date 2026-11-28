import { connectToDatabase } from "@/lib/db";
import { SalesLeadModel } from "@/lib/models";
import { audit } from "./audit";

/** Default checklist when a deal is confirmed won. The team ticks items in the lead's page. */
export const ONBOARDING_CHECKLIST = [
  "Send welcome email with next steps",
  "Share and sign the agreement / statement of work",
  "Raise the first invoice (advance)",
  "Kick-off call: goals, scope and success metrics",
  "Collect access (domain, hosting, brand assets, accounts)",
  "Create the project channel and introduce the team",
  "Share the project timeline and first milestone",
];

export async function startOnboarding(leadId: string, actor: string) {
  await connectToDatabase();
  const lead = await SalesLeadModel.findById(leadId);
  if (!lead) return;
  const current = (lead.get("onboarding") ?? {}) as { startedAt?: Date };
  if (current.startedAt) return;
  lead.set("onboarding", { startedAt: new Date(), checklist: ONBOARDING_CHECKLIST.map((item) => ({ item, done: false })) });
  await lead.save();
  await audit(actor, "onboarding.started", leadId);
}
