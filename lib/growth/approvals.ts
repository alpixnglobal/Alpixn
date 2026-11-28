import { connectToDatabase } from "@/lib/db";
import { audit } from "./audit";
import { ApprovalModel } from "./models";

export type ApprovalType =
  | "message" // an AI-written message waiting to be sent
  | "proposal" // proposal / quotation send
  | "discount"
  | "deal_won"
  | "campaign_create"
  | "campaign_budget"
  | "campaign_status"
  | "campaign_objective"
  | "recommendation" // suggestion only — approving records the decision
  | "prompt_version"
  | "other";

export type ApprovalRecord = {
  _id: string;
  type: ApprovalType;
  title: string;
  summary: string;
  payload: Record<string, unknown>;
  status: string;
  requestedBy: string;
  decidedBy: string;
  decidedAt?: Date | null;
  reason: string;
  result: string;
  leadId: string;
  priority: string;
  createdAt?: Date;
};

/**
 * Executors run the approved action. Each returns a short result string or throws.
 * Loaded lazily to avoid import cycles (executors import the modules that create approvals).
 */
async function executorFor(type: string) {
  const { EXECUTORS } = await import("./executors");
  return EXECUTORS[type as ApprovalType];
}

/** Creates a pending approval. `dedupeKey` prevents the same request being queued twice. */
export async function requestApproval(input: {
  type: ApprovalType;
  title: string;
  summary?: string;
  payload?: Record<string, unknown>;
  leadId?: string;
  priority?: "normal" | "high";
  requestedBy: string;
  dedupeKey?: string;
}) {
  await connectToDatabase();
  if (input.dedupeKey) {
    const existing = await ApprovalModel.findOne({ status: "pending", "payload.dedupeKey": input.dedupeKey }).select("_id").lean();
    if (existing) return String((existing as { _id: unknown })._id);
  }
  const doc = await ApprovalModel.create({
    type: input.type,
    title: input.title.slice(0, 200),
    summary: (input.summary ?? "").slice(0, 4000),
    payload: { ...(input.payload ?? {}), ...(input.dedupeKey ? { dedupeKey: input.dedupeKey } : {}) },
    leadId: input.leadId ?? "",
    priority: input.priority ?? "normal",
    requestedBy: input.requestedBy,
  });
  await audit(input.requestedBy, "approval.requested", String(doc._id), { type: input.type, title: input.title });
  return String(doc._id);
}

/**
 * Approve (optionally with edited payload = override) or reject. Approving runs the executor; the
 * approval ends as executed or failed with the result recorded. Only pending items can be decided,
 * and the status flip is atomic so a double click never executes twice.
 */
export async function decideApproval(id: string, decision: "approve" | "reject", actor: string, opts: { reason?: string; payloadPatch?: Record<string, unknown> } = {}) {
  await connectToDatabase();
  const status = decision === "approve" ? "approved" : "rejected";
  const doc = (await ApprovalModel.findOneAndUpdate(
    { _id: id, status: "pending" },
    { $set: { status, decidedBy: actor, decidedAt: new Date(), reason: (opts.reason ?? "").slice(0, 1000) } },
    { new: true }
  ).lean()) as ApprovalRecord | null;
  if (!doc) return { ok: false, message: "This item was already decided." };

  const payload = { ...(doc.payload ?? {}), ...(opts.payloadPatch ?? {}) };
  if (opts.payloadPatch) await ApprovalModel.updateOne({ _id: id }, { $set: { payload } });
  await audit(actor, `approval.${status}`, id, { type: doc.type, title: doc.title, overridden: Boolean(opts.payloadPatch), reason: opts.reason ?? "" });

  const executor = await executorFor(doc.type);
  if (decision === "reject") {
    if (executor?.onReject) await executor.onReject(payload, { id, actor }).catch(() => undefined);
    return { ok: true, message: "Rejected." };
  }
  if (!executor) {
    await ApprovalModel.updateOne({ _id: id }, { $set: { status: "executed", result: "Recorded (no automatic action)." } });
    return { ok: true, message: "Approved." };
  }
  try {
    const result = await executor.run(payload, { id, actor });
    await ApprovalModel.updateOne({ _id: id }, { $set: { status: "executed", result: (result || "Done").slice(0, 1000) } });
    await audit(actor, "approval.executed", id, { type: doc.type, result });
    return { ok: true, message: result || "Approved and done." };
  } catch (e) {
    const msg = e instanceof Error ? e.message.slice(0, 500) : "Failed";
    await ApprovalModel.updateOne({ _id: id }, { $set: { status: "failed", result: msg } });
    await audit(actor, "approval.failed", id, { type: doc.type, error: msg });
    return { ok: false, message: `Approved, but the action failed: ${msg}` };
  }
}

/** Retry a failed approval's action. */
export async function retryApproval(id: string, actor: string) {
  await connectToDatabase();
  const doc = (await ApprovalModel.findOneAndUpdate({ _id: id, status: "failed" }, { $set: { status: "pending" } }, { new: true }).lean()) as ApprovalRecord | null;
  if (!doc) return { ok: false, message: "Only failed items can be retried." };
  return decideApproval(id, "approve", actor);
}

export async function pendingApprovalCount() {
  try {
    await connectToDatabase();
    return await ApprovalModel.countDocuments({ status: "pending" });
  } catch {
    return 0;
  }
}
