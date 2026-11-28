import type { Metadata } from "next";
import Link from "next/link";
import { CirclePause, CirclePlay, Save } from "lucide-react";

import { saveGrowthSettingsAction, setGlobalPauseAction } from "@/admin/actions/growth-actions";
import { AdminField, AdminInput, AdminTextarea, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { connectToDatabase } from "@/lib/db";
import { ApprovalModel, ConversationModel, JobModel, MessageModel } from "@/lib/growth/models";
import { AGENTS, getGrowthSettings, isWithinWorkingHours, type AgentKey, type ChannelKey } from "@/lib/growth/settings";

export const metadata: Metadata = { title: "AI agents" };

const card = `${adminCardClassName} p-5 sm:p-6`;
const h2 = "font-display text-[16px] font-bold text-fg";
const select = "w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[13.5px] text-fg outline-none focus:border-tech";

const AUTONOMY_LABEL = {
  off: "Off",
  suggest: "Suggest only",
  approve: "Draft → I approve",
  auto: "Fully automatic",
} as const;

const CHANNEL_LABEL: Record<ChannelKey, string> = {
  web_chat: "Website chat",
  email: "Email",
  whatsapp: "WhatsApp",
  instagram: "Instagram DM",
  messenger: "Facebook Messenger",
};

const DAY_LABEL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

async function monitor() {
  try {
    await connectToDatabase();
    const since = new Date(Date.now() - 864e5);
    const [pending, queued, failedJobs, open, inbound, outbound, lastJob] = await Promise.all([
      ApprovalModel.countDocuments({ status: "pending" }),
      JobModel.countDocuments({ status: { $in: ["queued", "running"] } }),
      JobModel.countDocuments({ status: "failed", updatedAt: { $gte: new Date(Date.now() - 7 * 864e5) } }),
      ConversationModel.countDocuments({ status: "open" }),
      MessageModel.countDocuments({ direction: "in", createdAt: { $gte: since } }),
      MessageModel.countDocuments({ direction: "out", author: { $regex: "^ai" }, createdAt: { $gte: since } }),
      JobModel.findOne({ status: "done" }).sort({ finishedAt: -1 }).select("finishedAt type").lean() as Promise<{ finishedAt?: Date; type?: string } | null>,
    ]);
    const recentFailures = (await JobModel.find({ status: "failed" }).sort({ updatedAt: -1 }).limit(5).select("type lastError updatedAt").lean()) as unknown as { type: string; lastError: string; updatedAt: Date }[];
    return { pending, queued, failedJobs, open, inbound, outbound, lastJob, recentFailures };
  } catch {
    return null;
  }
}

export default async function GrowthPage({ searchParams }: { searchParams: Promise<{ status?: string; error?: string }> }) {
  const p = await searchParams;
  const flash = getAdminFlashMessage(p.status, p.error);
  const [s, m] = await Promise.all([getGrowthSettings(), monitor()]);
  const inHours = isWithinWorkingHours(s);
  const cron = Boolean(process.env.CRON_SECRET);

  return (
    <AdminShell
      title="AI agents"
      description="Control what the AI sales & marketing team may do on its own, what needs your approval, and when it works."
      activePath="/admin/growth"
      topActions={
        <form action={setGlobalPauseAction}>
          <input type="hidden" name="paused" value={s.globalPaused ? "0" : "1"} />
          {s.globalPaused ? (
            <button className="btn-brand !px-4 !py-2 text-[13px]">
              <CirclePlay className="h-4 w-4" /> Resume all agents
            </button>
          ) : (
            <button className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-[13px] font-semibold text-rose-700 hover:bg-rose-500/15 dark:text-rose-200">
              <CirclePause className="h-4 w-4" /> Pause all agents
            </button>
          )}
        </form>
      }
    >
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      {s.globalPaused ? <StatusNotice tone="error" message="All AI agents are paused. No messages are sent and no campaigns are changed until you resume." /> : null}
      {!cron ? <StatusNotice tone="error" message="CRON_SECRET is not set on the server, so background agents won't run. See docs/aws-setup.md (crontab for /api/cron/agents)." /> : null}

      {/* Agent monitoring */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["Waiting for approval", m?.pending, "/admin/growth/approvals"],
          ["Open conversations", m?.open, "/admin/growth/conversations"],
          ["Messages in (24h)", m?.inbound, null],
          ["AI messages out (24h)", m?.outbound, null],
          ["Jobs in queue", m?.queued, null],
          ["Failed jobs (7 days)", m?.failedJobs, null],
        ].map(([label, value, href]) => (
          <div key={String(label)} className={`${adminCardClassName} p-4`}>
            <p className="text-[12px] text-fg-muted">{label}</p>
            <p className="mt-1 font-display text-[24px] font-bold text-fg">{value ?? "—"}</p>
            {href ? (
              <Link href={String(href)} className="text-[12px] font-semibold text-[#0878d1] hover:underline">
                Open →
              </Link>
            ) : null}
          </div>
        ))}
      </section>
      <p className="-mt-2 text-[12.5px] text-fg-muted">
        {inHours ? "Inside working hours." : "Outside working hours — follow-ups wait until the next working slot."} Last background run:{" "}
        {m?.lastJob?.finishedAt ? new Date(m.lastJob.finishedAt).toLocaleString("en-IN", { timeZone: s.workingHours.timezone }) : "never"}.
      </p>
      {m?.recentFailures?.length ? (
        <section className={card}>
          <h2 className={h2}>Recent failures</h2>
          <ul className="mt-2 space-y-1 text-[12.5px] text-fg">
            {m.recentFailures.map((f, i) => (
              <li key={i}>
                <span className="font-semibold">{f.type}</span> — {f.lastError || "error"} <span className="text-fg-muted">({new Date(f.updatedAt).toLocaleString("en-IN")})</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <form action={saveGrowthSettingsAction} className="grid gap-5">
        <section className={card}>
          <h2 className={h2}>Agents and autonomy</h2>
          <p className="mt-0.5 text-[13px] text-fg-muted">
            Discounts, custom prices, contracts, payment terms, sending proposals, marking a deal won and new ad campaigns or budget increases <strong>always</strong> need human approval, whatever you choose here.
          </p>
          <div className="mt-4 grid gap-3">
            {(Object.keys(AGENTS) as AgentKey[]).map((key) => (
              <div key={key} className="grid gap-3 rounded-xl border border-line bg-canvas p-4 md:grid-cols-[minmax(0,1fr)_200px] md:items-center">
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" name={`agent.${key}.enabled`} defaultChecked={s.agents[key].enabled} className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
                  <span>
                    <span className="block text-[14px] font-semibold text-fg">{AGENTS[key].label}</span>
                    <span className="block text-[12.5px] text-fg-muted">{AGENTS[key].description}</span>
                  </span>
                </label>
                <select name={`agent.${key}.autonomy`} defaultValue={s.agents[key].autonomy} className={select} aria-label={`${AGENTS[key].label} autonomy`}>
                  {(Object.keys(AUTONOMY_LABEL) as (keyof typeof AUTONOMY_LABEL)[])
                    .filter((a) => !(key === "proposals" && a === "auto"))
                    .map((a) => (
                      <option key={a} value={a}>
                        {AUTONOMY_LABEL[a]}
                      </option>
                    ))}
                </select>
              </div>
            ))}
          </div>
        </section>

        <section className={card}>
          <h2 className={h2}>Channels and daily sending limits</h2>
          <p className="mt-0.5 text-[13px] text-fg-muted">Limits count AI-sent messages per day. Keep new email domains low (20–40/day) to protect deliverability.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {(Object.keys(CHANNEL_LABEL) as ChannelKey[]).map((key) => (
              <div key={key} className="rounded-xl border border-line bg-canvas p-4">
                <label className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-fg">
                  <input type="checkbox" name={`channel.${key}.enabled`} defaultChecked={s.channels[key].enabled} className="h-4 w-4 accent-[#0878d1]" />
                  {CHANNEL_LABEL[key]}
                </label>
                <AdminField label="Max per day" className="mt-2">
                  <AdminInput name={`channel.${key}.limit`} type="number" min={0} defaultValue={String(s.channels[key].dailyLimit)} />
                </AdminField>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-2">
          <section className={`${card} grid gap-4`}>
            <h2 className={h2}>Working hours</h2>
            <div className="flex flex-wrap gap-2">
              {DAY_LABEL.map((d, i) => (
                <label key={d} className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-canvas px-3 py-1.5 text-[13px] text-fg">
                  <input type="checkbox" name="wh.days" value={i} defaultChecked={s.workingHours.days.includes(i)} className="h-3.5 w-3.5 accent-[#0878d1]" />
                  {d}
                </label>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <AdminField label="Start">
                <AdminInput name="wh.start" type="time" defaultValue={s.workingHours.start} />
              </AdminField>
              <AdminField label="End">
                <AdminInput name="wh.end" type="time" defaultValue={s.workingHours.end} />
              </AdminField>
              <AdminField label="Time zone">
                <AdminInput name="wh.timezone" defaultValue={s.workingHours.timezone} />
              </AdminField>
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-canvas p-3">
              <input type="checkbox" name="wh.instant" defaultChecked={s.workingHours.instantRepliesAnyTime} className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
              <span className="text-[13px] text-fg">Reply instantly 24/7 when someone writes to us (follow-ups still wait for working hours)</span>
            </label>
          </section>

          <section className={`${card} grid gap-4`}>
            <h2 className={h2}>Escalation to a human</h2>
            <AdminField label="Alert email" hint="Hot leads, negotiation and requests for a person are emailed here.">
              <AdminInput name="esc.email" type="email" defaultValue={s.escalation.notifyEmail} />
            </AdminField>
            <AdminField label="Escalate when lead score is at least">
              <AdminInput name="esc.score" type="number" min={0} max={100} defaultValue={String(s.escalation.scoreThreshold)} />
            </AdminField>
            <AdminField label="Escalate when a message mentions" hint="One per line.">
              <AdminTextarea name="esc.keywords" defaultValue={s.escalation.keywords.join("\n")} className="min-h-24" />
            </AdminField>
          </section>
        </div>

        <section className={card}>
          <h2 className={h2}>Ad spend limits (Meta)</h2>
          <p className="mt-0.5 text-[13px] text-fg-muted">0 means no automatic spending changes are allowed at all. The ads agent can only pause campaigns or lower budgets on its own; anything that spends more goes to the Approval Center.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <AdminField label="Max daily spend (₹)">
              <AdminInput name="ads.daily" type="number" min={0} defaultValue={String(s.ads.dailyLimit)} />
            </AdminField>
            <AdminField label="Max monthly spend (₹)">
              <AdminInput name="ads.monthly" type="number" min={0} defaultValue={String(s.ads.monthlyLimit)} />
            </AdminField>
            <AdminField label="Max cost per lead (₹)" hint="Above this the agent flags or pauses.">
              <AdminInput name="ads.maxCpl" type="number" min={0} defaultValue={String(s.ads.maxCpl)} />
            </AdminField>
            <AdminField label="Max budget change per step (%)">
              <AdminInput name="ads.maxChange" type="number" min={0} max={100} defaultValue={String(s.ads.maxBudgetChangePercent)} />
            </AdminField>
            <AdminField label="Allowed countries" hint="2-letter codes, e.g. IN, AE">
              <AdminInput name="ads.countries" defaultValue={s.ads.allowedCountries.join(", ")} />
            </AdminField>
          </div>
        </section>

        <div className="flex justify-end">
          <button type="submit" className="btn-brand !px-5 !py-2.5 text-[13.5px]">
            <Save className="h-4 w-4" /> Save agent settings
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
