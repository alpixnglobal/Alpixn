import assert from "node:assert/strict";
import { after, before, beforeEach, describe, test } from "node:test";

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

/**
 * Foundation of the AI sales system: roles, settings, the autonomy rules, the job queue and the
 * Approval Center. Uses MONGODB_URI when given (a throwaway local database), otherwise an in-memory one.
 */
let mongoServer: MongoMemoryServer | null = null;

type Mods = {
  rbac: typeof import("../lib/rbac");
  settings: typeof import("../lib/growth/settings");
  jobs: typeof import("../lib/growth/jobs");
  autonomy: typeof import("../lib/growth/autonomy");
  approvals: typeof import("../lib/growth/approvals");
  models: typeof import("../lib/growth/models");
  core: typeof import("../lib/models");
};
let m: Mods;

before(async () => {
  if (!process.env.MONGODB_URI) {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri("alpixn-growth-test");
  } else {
    process.env.MONGODB_URI = process.env.MONGODB_URI.replace(/\/[^/?]*(\?|$)/, "/alpixn-growth-test$1");
  }
  m = {
    rbac: await import("../lib/rbac"),
    settings: await import("../lib/growth/settings"),
    jobs: await import("../lib/growth/jobs"),
    autonomy: await import("../lib/growth/autonomy"),
    approvals: await import("../lib/growth/approvals"),
    models: await import("../lib/growth/models"),
    core: await import("../lib/models"),
  };
  const { connectToDatabase } = await import("../lib/db");
  await connectToDatabase();
  await Promise.all([m.models.JobModel.init(), m.models.ApprovalModel.init()]);
});

beforeEach(async () => {
  await mongoose.connection.db!.dropDatabase();
  await Promise.all([m.models.JobModel.createIndexes(), m.models.MessageModel.createIndexes(), m.models.ApprovalModel.createIndexes()]);
});

after(async () => {
  await mongoose.connection.db?.dropDatabase().catch(() => undefined);
  await mongoose.disconnect();
  await mongoServer?.stop();
});

describe("roles", () => {
  test("owner can do everything, others only their area", () => {
    const { can, canView, pathPermission } = m.rbac;
    assert.equal(can("owner", "security"), true);
    assert.equal(can("manager", "security"), false);
    assert.equal(can("manager", "agents"), true);
    assert.equal(can("sales", "approvals"), true);
    assert.equal(can("sales", "ads"), false);
    assert.equal(can("editor", "inbox"), false);
    assert.equal(can("viewer", "sales"), false);
    assert.equal(canView("viewer", "sales"), true);
    assert.equal(pathPermission("/admin/growth/approvals"), "approvals");
    assert.equal(pathPermission("/admin/growth"), "agents");
    assert.equal(pathPermission("/admin/blogs"), "content");
    assert.equal(pathPermission("/admin"), "dashboard");
    assert.equal(pathPermission("/admin/users"), "users");
  });
});

describe("settings", () => {
  test("defaults are conservative and saved values merge with defaults", async () => {
    const s = await m.settings.getGrowthSettings();
    assert.equal(s.ads.dailyLimit, 0, "no ad spend allowed by default");
    assert.equal(s.agents.proposals.autonomy, "approve");
    await m.settings.saveGrowthSettings({ globalPaused: true });
    const after = await m.settings.getGrowthSettings();
    assert.equal(after.globalPaused, true);
    assert.equal(after.channels.email.dailyLimit, s.channels.email.dailyLimit);
  });

  test("working hours use the configured time zone", () => {
    const s = m.settings.DEFAULT_GROWTH_SETTINGS;
    // Monday 2026-11-30 10:00 IST = 04:30 UTC
    assert.equal(m.settings.isWithinWorkingHours(s, new Date("2026-11-30T04:30:00Z")), true);
    // Monday 22:00 IST
    assert.equal(m.settings.isWithinWorkingHours(s, new Date("2026-11-30T16:30:00Z")), false);
    // Sunday 11:00 IST (Sunday not a working day)
    assert.equal(m.settings.isWithinWorkingHours(s, new Date("2026-11-29T05:30:00Z")), false);
    const next = m.settings.nextWorkingTime(s, new Date("2026-11-30T16:30:00Z"));
    assert.equal(m.settings.isWithinWorkingHours(s, next), true);
    assert.ok(next.getTime() > new Date("2026-11-30T16:30:00Z").getTime());
  });
});

describe("job queue", () => {
  test("dedupe key prevents duplicate jobs", async () => {
    const a = await m.jobs.enqueue("t.ok", { n: 1 }, { dedupeKey: "same" });
    const b = await m.jobs.enqueue("t.ok", { n: 2 }, { dedupeKey: "same" });
    assert.ok(a);
    assert.equal(b, null);
    assert.equal(await m.models.JobModel.countDocuments(), 1);
  });

  test("runs due jobs, retries failures with backoff and stops after maxAttempts", async () => {
    let calls = 0;
    await m.jobs.enqueue("t.ok", {});
    await m.jobs.enqueue("t.fail", {}, { maxAttempts: 2 });
    await m.jobs.enqueue("t.ok", {}, { runAt: new Date(Date.now() + 3600e3) }); // not due
    const handlers = {
      "t.ok": async () => void calls++,
      "t.fail": async () => {
        throw new Error("boom");
      },
    };
    const r1 = await m.jobs.runDueJobs(handlers);
    assert.equal(calls, 1);
    assert.equal(r1.failed.length, 1);
    const failing = await m.models.JobModel.findOne({ type: "t.fail" }).lean();
    assert.equal(failing!.status, "queued");
    assert.ok(new Date(failing!.runAt as Date).getTime() > Date.now() + 30e3, "retry is delayed");
    // Make it due again; second failure is final.
    await m.models.JobModel.updateOne({ type: "t.fail" }, { $set: { runAt: new Date() } });
    await m.jobs.runDueJobs(handlers);
    const final = await m.models.JobModel.findOne({ type: "t.fail" }).lean();
    assert.equal(final!.status, "failed");
    assert.equal(final!.attempts, 2);
    assert.equal(final!.lastError, "boom");
  });

  test("two workers never run the same job", async () => {
    for (let i = 0; i < 10; i++) await m.jobs.enqueue("t.count", { i });
    const seen: number[] = [];
    const handlers = {
      "t.count": async (p: Record<string, unknown>) => {
        seen.push(Number(p.i));
        await new Promise((r) => setTimeout(r, 5));
      },
    };
    await Promise.all([m.jobs.runDueJobs(handlers), m.jobs.runDueJobs(handlers), m.jobs.runDueJobs(handlers)]);
    assert.equal(seen.length, 10);
    assert.equal(new Set(seen).size, 10);
  });

  test("backoff grows and is capped", () => {
    assert.equal(m.jobs.backoffMs(1), 60e3);
    assert.equal(m.jobs.backoffMs(3), 240e3);
    assert.equal(m.jobs.backoffMs(50), 6 * 3600e3);
  });
});

describe("autonomy rules", () => {
  const monday10 = new Date("2026-11-30T04:30:00Z");
  const monday22 = new Date("2026-11-30T16:30:00Z");

  test("global pause and agent off block everything", async () => {
    const s = structuredClone(m.settings.DEFAULT_GROWTH_SETTINGS);
    s.globalPaused = true;
    assert.equal((await m.autonomy.decide({ agent: "conversation", kind: "reply", settings: s, at: monday10 })).mode, "blocked");
    s.globalPaused = false;
    s.agents.followup.autonomy = "off";
    assert.equal((await m.autonomy.decide({ agent: "followup", kind: "followup", settings: s, at: monday10 })).mode, "blocked");
  });

  test("hard rules always need approval, even in auto mode", async () => {
    const s = structuredClone(m.settings.DEFAULT_GROWTH_SETTINGS);
    s.agents.conversation.autonomy = "auto";
    for (const kind of ["discount", "custom_price", "contract", "payment_terms", "deal_won", "proposal_send", "campaign_create", "campaign_budget_increase"] as const) {
      const d = await m.autonomy.decide({ agent: "conversation", kind, settings: s, at: monday10 });
      assert.equal(d.mode, "approve", kind);
    }
  });

  test("follow-ups wait for working hours; instant replies may go any time", async () => {
    const s = structuredClone(m.settings.DEFAULT_GROWTH_SETTINGS);
    s.agents.followup.autonomy = "auto";
    const d = await m.autonomy.decide({ agent: "followup", kind: "followup", channel: "email", settings: s, at: monday22 });
    assert.equal(d.mode, "defer");
    const r = await m.autonomy.decide({ agent: "conversation", kind: "reply", channel: "web_chat", settings: s, at: monday22 });
    assert.equal(r.mode, "auto");
    s.workingHours.instantRepliesAnyTime = false;
    assert.equal((await m.autonomy.decide({ agent: "conversation", kind: "reply", channel: "web_chat", settings: s, at: monday22 })).mode, "defer");
  });

  test("approve / suggest levels and channel limits", async () => {
    const s = structuredClone(m.settings.DEFAULT_GROWTH_SETTINGS);
    s.agents.followup.autonomy = "approve";
    const a = await m.autonomy.decide({ agent: "followup", kind: "followup", channel: "email", settings: s, at: monday10 });
    assert.deepEqual([a.mode, a.mode === "approve" && a.suggestOnly], ["approve", false]);
    s.agents.ads.autonomy = "suggest";
    const b = await m.autonomy.decide({ agent: "ads", kind: "recommend", settings: s, at: monday10 });
    assert.deepEqual([b.mode, b.mode === "approve" && b.suggestOnly], ["approve", true]);

    s.channels.email.dailyLimit = 1;
    await m.models.MessageModel.create({ conversationId: "c", channel: "email", direction: "out", author: "ai:followup", status: "sent", text: "x" });
    const c = await m.autonomy.decide({ agent: "followup", kind: "followup", channel: "email", settings: s, at: new Date() });
    assert.equal(c.mode, "blocked");
    s.channels.whatsapp.enabled = false;
    assert.equal((await m.autonomy.decide({ agent: "conversation", kind: "reply", channel: "whatsapp", settings: s, at: monday10 })).mode, "blocked");
  });

  test("opted-out leads are never messaged", async () => {
    const s = structuredClone(m.settings.DEFAULT_GROWTH_SETTINGS);
    const lead = await m.core.SalesLeadModel.create({ name: "Test Lead", email: "lead@example.com", consent: { whatsapp: { status: "opted_out" } } });
    const id = String(lead._id);
    assert.equal((await m.autonomy.decide({ agent: "conversation", kind: "reply", channel: "whatsapp", leadId: id, settings: s, at: monday10 })).mode, "blocked");
    assert.equal((await m.autonomy.decide({ agent: "conversation", kind: "reply", channel: "web_chat", leadId: id, settings: s, at: monday10 })).mode, "auto");
    await m.core.SalesLeadModel.updateOne({ _id: id }, { $set: { unsubscribed: true } });
    assert.equal((await m.autonomy.decide({ agent: "followup", kind: "followup", channel: "email", leadId: id, settings: s, at: monday10 })).mode, "blocked");
  });
});

describe("approval center", () => {
  test("deduplicates pending requests and executes exactly once", async () => {
    const lead = await m.core.SalesLeadModel.create({ name: "Won Co", email: "won@example.com", stage: "proposal" });
    const leadId = String(lead._id);
    const input = { type: "deal_won" as const, title: "Confirm", payload: { leadId, amount: 150000, evidence: "PO-1" }, leadId, requestedBy: "sales@alpixn.test", dedupeKey: `deal_won:${leadId}` };
    const id1 = await m.approvals.requestApproval(input);
    const id2 = await m.approvals.requestApproval(input);
    assert.equal(id1, id2);

    const [r1, r2] = await Promise.all([m.approvals.decideApproval(id1, "approve", "owner@alpixn.test"), m.approvals.decideApproval(id1, "approve", "owner@alpixn.test")]);
    assert.equal([r1.ok, r2.ok].filter(Boolean).length, 1, "only one decision wins");

    const updated = (await m.core.SalesLeadModel.findById(leadId).lean()) as unknown as { stage: string; deal: { status: string; confirmedBy: string; amount: number }; onboarding: { checklist: unknown[] } };
    assert.equal(updated.stage, "won");
    assert.equal(updated.deal.status, "won");
    assert.equal(updated.deal.confirmedBy, "owner@alpixn.test");
    assert.equal(updated.deal.amount, 150000);
    assert.ok(updated.onboarding.checklist.length > 0, "onboarding started");

    const approval = await m.models.ApprovalModel.findById(id1).lean();
    assert.equal(approval!.status, "executed");
    const logs = await m.models.AuditLogModel.find({ target: id1 }).lean();
    assert.ok(logs.some((l) => l.action === "approval.approved"));
    assert.ok(logs.some((l) => l.action === "approval.executed"));
  });

  test("rejecting does not change the lead; override edits the payload", async () => {
    const lead = await m.core.SalesLeadModel.create({ name: "Maybe Co", email: "maybe@example.com", stage: "proposal" });
    const leadId = String(lead._id);
    const id = await m.approvals.requestApproval({ type: "deal_won", title: "Confirm", payload: { leadId, amount: 1000 }, leadId, requestedBy: "sales@alpixn.test" });
    await m.approvals.decideApproval(id, "reject", "owner@alpixn.test", { reason: "Not signed yet" });
    assert.equal(((await m.core.SalesLeadModel.findById(leadId).lean()) as unknown as { stage: string }).stage, "proposal");

    const id2 = await m.approvals.requestApproval({ type: "deal_won", title: "Confirm", payload: { leadId, amount: 1000 }, leadId, requestedBy: "sales@alpixn.test" });
    await m.approvals.decideApproval(id2, "approve", "owner@alpixn.test", { payloadPatch: { amount: 2500 } });
    assert.equal(((await m.core.SalesLeadModel.findById(leadId).lean()) as unknown as { deal: { amount: number } }).deal.amount, 2500);
  });

  test("audit log never stores secrets", async () => {
    const { audit } = await import("../lib/growth/audit");
    await audit("owner@alpixn.test", "integration.saved", "meta", { accessToken: "EAAB-secret", appSecret: "s3", page: "ALPIXN" });
    const row = (await m.models.AuditLogModel.findOne({ action: "integration.saved" }).lean()) as unknown as { details: Record<string, string> };
    assert.equal(row.details.accessToken, "[redacted]");
    assert.equal(row.details.appSecret, "[redacted]");
    assert.equal(row.details.page, "ALPIXN");
  });
});
