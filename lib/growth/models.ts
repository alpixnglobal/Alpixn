import mongoose, { Schema } from "mongoose";

/**
 * Data models for the autonomous sales, marketing and advertising system.
 * Kept separate from lib/models.ts (website content) — same database, new collections only.
 */
type GenericModel = mongoose.Model<Record<string, unknown>>;
const model = (name: string, schema: Schema) => (mongoose.models[name] as GenericModel) || (mongoose.model(name, schema) as unknown as GenericModel);

/** One thread with a lead on one channel (web chat session, WhatsApp number, Instagram user, email thread…). */
const conversationSchema = new Schema(
  {
    leadId: { type: String, default: "", index: true },
    channel: { type: String, required: true, index: true }, // web_chat | email | whatsapp | instagram | messenger | lead_ad
    externalThreadId: { type: String, default: "" }, // e.g. WhatsApp wa_id, Instagram PSID, chat session id
    status: { type: String, default: "open" }, // open | closed
    aiPaused: { type: Boolean, default: false },
    unread: { type: Number, default: 0 },
    lastMessageAt: { type: Date, default: null, index: true },
    lastInboundAt: { type: Date, default: null },
    lastPreview: { type: String, default: "" },
    attribution: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);
conversationSchema.index({ channel: 1, externalThreadId: 1 }, { unique: true, partialFilterExpression: { externalThreadId: { $type: "string", $gt: "" } } });

const messageSchema = new Schema(
  {
    conversationId: { type: String, required: true, index: true },
    leadId: { type: String, default: "", index: true },
    channel: { type: String, required: true },
    direction: { type: String, required: true }, // in | out
    author: { type: String, default: "lead" }, // lead | ai | human:<email> | system
    text: { type: String, default: "" },
    /** Provider message id — unique, so the same webhook delivered twice is stored once. */
    externalId: { type: String, default: undefined },
    status: { type: String, default: "received" }, // received | queued | pending_approval | sent | delivered | read | failed | rejected
    error: { type: String, default: "" },
    meta: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);
messageSchema.index({ externalId: 1 }, { unique: true, sparse: true });

/** Anything an agent wants to do that needs a human decision. */
const approvalSchema = new Schema(
  {
    type: { type: String, required: true, index: true }, // message | proposal | discount | campaign_create | campaign_budget | campaign_objective | deal_won | other
    title: { type: String, default: "" },
    summary: { type: String, default: "" },
    payload: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, default: "pending", index: true }, // pending | approved | rejected | executed | failed | expired
    requestedBy: { type: String, default: "" },
    decidedBy: { type: String, default: "" },
    decidedAt: { type: Date, default: null },
    reason: { type: String, default: "" },
    result: { type: String, default: "" },
    leadId: { type: String, default: "", index: true },
    priority: { type: String, default: "normal" }, // normal | high
  },
  { timestamps: true }
);

const auditLogSchema = new Schema(
  {
    at: { type: Date, default: Date.now, index: true },
    actor: { type: String, required: true }, // user email | agent:<name> | system | webhook:meta
    action: { type: String, required: true, index: true },
    target: { type: String, default: "" },
    details: { type: Schema.Types.Mixed, default: {} },
    ip: { type: String, default: "" },
  },
  { versionKey: false }
);
auditLogSchema.index({ at: -1 });

/** Background job with retries, backoff, locking and de-duplication. */
const jobSchema = new Schema(
  {
    type: { type: String, required: true, index: true },
    payload: { type: Schema.Types.Mixed, default: {} },
    runAt: { type: Date, default: Date.now, index: true },
    status: { type: String, default: "queued", index: true }, // queued | running | done | failed | cancelled
    attempts: { type: Number, default: 0 },
    maxAttempts: { type: Number, default: 5 },
    lastError: { type: String, default: "" },
    lockedUntil: { type: Date, default: null },
    dedupeKey: { type: String, default: undefined },
    finishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
jobSchema.index({ dedupeKey: 1 }, { unique: true, sparse: true });
jobSchema.index({ status: 1, runAt: 1 });

const meetingSchema = new Schema(
  {
    leadId: { type: String, required: true, index: true },
    start: { type: Date, required: true, index: true },
    end: { type: Date, required: true },
    timezone: { type: String, default: "Asia/Kolkata" },
    title: { type: String, default: "" },
    location: { type: String, default: "" }, // meeting link or phone
    status: { type: String, default: "scheduled" }, // proposed | scheduled | cancelled | completed | no_show
    notes: { type: String, default: "" },
    remindersSent: { type: [String], default: [] }, // "24h", "1h"
    createdBy: { type: String, default: "" },
  },
  { timestamps: true }
);

const proposalSchema = new Schema(
  {
    leadId: { type: String, required: true, index: true },
    number: { type: String, required: true, unique: true },
    title: { type: String, default: "" },
    summary: { type: String, default: "" },
    scope: { type: String, default: "" }, // markdown
    items: { type: [{ description: String, packageId: String, quantity: Number, unitPrice: Number, billing: String }], default: [] },
    discountPercent: { type: Number, default: 0 },
    taxPercent: { type: Number, default: 18 },
    currency: { type: String, default: "INR" },
    timeline: { type: String, default: "" },
    validUntil: { type: Date, default: null },
    status: { type: String, default: "draft", index: true }, // draft | pending_approval | approved | sent | viewed | accepted | declined | expired
    token: { type: String, required: true, unique: true },
    aiGenerated: { type: Boolean, default: false },
    approvalId: { type: String, default: "" },
    sentAt: { type: Date, default: null },
    viewedAt: { type: Date, default: null },
    respondedAt: { type: Date, default: null },
    clientComment: { type: String, default: "" },
  },
  { timestamps: true }
);

/** Connected external accounts (Meta). Tokens are stored encrypted. */
const integrationSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

const settingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

/** Team members who can sign in to the admin, with a role. The owner from ADMIN_EMAIL is always allowed. */
const adminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, default: "" },
    role: { type: String, default: "viewer" }, // owner | manager | sales | marketing | editor | viewer
    passwordHash: { type: String, required: true },
    totpSecretEnc: { type: String, default: "" },
    active: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
    passwordChangedAt: { type: Date, default: null },
    pendingTotpEnc: { type: String, default: undefined },
    pendingTotpAt: { type: Date, default: undefined },
  },
  { timestamps: true }
);

/** Cached Meta campaign data + insights for the dashboard and ROI. */
const adCampaignSchema = new Schema(
  {
    campaignId: { type: String, required: true, unique: true },
    accountId: { type: String, default: "", index: true },
    name: { type: String, default: "" },
    objective: { type: String, default: "" },
    status: { type: String, default: "" },
    dailyBudget: { type: Number, default: 0 },
    lifetimeBudget: { type: Number, default: 0 },
    insights: { type: Schema.Types.Mixed, default: {} },
    createdByAlpixn: { type: Boolean, default: false },
    syncedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

/** A/B experiments and prompt/template versions used by the learning system. */
const experimentSchema = new Schema(
  {
    name: { type: String, required: true },
    agent: { type: String, required: true }, // followup | reply | ads
    metric: { type: String, default: "reply_rate" },
    status: { type: String, default: "running" }, // draft | running | stopped | promoted
    variants: { type: [{ id: String, label: String, instruction: String, weight: Number, sent: Number, successes: Number }], default: [] },
    winner: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

const promptVersionSchema = new Schema(
  {
    agent: { type: String, required: true, index: true },
    version: { type: Number, required: true },
    text: { type: String, required: true },
    active: { type: Boolean, default: false },
    createdBy: { type: String, default: "" },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);
promptVersionSchema.index({ agent: 1, version: 1 }, { unique: true });

export const ConversationModel = model("Conversation", conversationSchema);
export const MessageModel = model("Message", messageSchema);
export const ApprovalModel = model("Approval", approvalSchema);
export const AuditLogModel = model("AuditLog", auditLogSchema);
export const JobModel = model("Job", jobSchema);
export const MeetingModel = model("Meeting", meetingSchema);
export const ProposalModel = model("Proposal", proposalSchema);
export const IntegrationModel = model("Integration", integrationSchema);
export const GrowthSettingsModel = model("GrowthSettings", settingsSchema);
export const AdminUserModel = model("AdminUser", adminUserSchema);
export const AdCampaignModel = model("AdCampaign", adCampaignSchema);
export const ExperimentModel = model("Experiment", experimentSchema);
export const PromptVersionModel = model("PromptVersion", promptVersionSchema);
