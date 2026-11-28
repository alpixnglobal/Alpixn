import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CircleAlert, Save, ShieldCheck } from "lucide-react";

import { saveSpamSettingsAction } from "@/admin/actions/spam-actions";
import { AdminField, AdminInput, AdminTextarea, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { connectToDatabase } from "@/lib/db";
import { ChatLeadModel, ContactMessageModel, JobApplicationModel } from "@/lib/models";
import { getSpamSettings } from "@/lib/spam";

export const metadata: Metadata = { title: "Spam protection" };

const card = `${adminCardClassName} p-5 sm:p-6`;

async function spamCounts() {
  try {
    await connectToDatabase();
    const since = new Date(new Date().getTime() - 30 * 864e5);
    const [contact, jobs, chat] = await Promise.all([
      ContactMessageModel.countDocuments({ status: "spam", createdAt: { $gte: since } }),
      JobApplicationModel.countDocuments({ status: "spam", createdAt: { $gte: since } }),
      ChatLeadModel.countDocuments({ status: "spam", createdAt: { $gte: since } }),
    ]);
    return { contact, jobs, chat };
  } catch {
    return null;
  }
}

export default async function SpamPage({ searchParams }: { searchParams: Promise<{ status?: string; error?: string }> }) {
  const p = await searchParams;
  const flash = getAdminFlashMessage(p.status, p.error);
  const [s, counts] = await Promise.all([getSpamSettings(), spamCounts()]);
  const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);

  return (
    <AdminShell title="Spam protection" description="Stop bots and junk submissions on the contact, hire-developer, career and chat forms." activePath="/admin/spam">
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <form action={saveSpamSettingsAction} className="grid gap-5">
          <section className={`${card} grid gap-4 sm:grid-cols-2`}>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-canvas p-4 sm:col-span-2">
              <input type="checkbox" name="enabled" defaultChecked={s.enabled} className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
              <span>
                <span className="block text-[14px] font-semibold text-fg">Spam filter on</span>
                <span className="block text-[12.5px] text-fg-muted">Suspicious submissions go to Inbox → Spam (not emailed, not added to the CRM). Obvious bots are dropped silently.</span>
              </span>
            </label>
            <AdminField label="Strictness (spam score threshold)" hint="Lower = stricter. 50 is balanced; 40 catches more spam but may flag a few real people.">
              <AdminInput name="threshold" type="number" min={20} max={150} defaultValue={String(s.threshold)} />
            </AdminField>
            <label className="flex cursor-pointer items-center gap-3 self-end rounded-xl border border-line bg-canvas px-4 py-3">
              <input type="checkbox" name="checkMx" defaultChecked={s.checkMx} className="h-4 w-4 accent-[#0878d1]" />
              <span className="text-[13.5px] text-fg">Check that the email domain can receive mail</span>
            </label>
          </section>

          <section className={`${card} grid gap-4 sm:grid-cols-2`}>
            <div className="sm:col-span-2">
              <h2 className="font-display text-[16px] font-bold text-fg">Blocklists</h2>
              <p className="mt-0.5 text-[13px] text-fg-muted">One per line. Blocked senders are dropped silently. Tip: use “Block sender” on a spam message in the Inbox.</p>
            </div>
            <AdminField label="Blocked email addresses">
              <AdminTextarea name="blockedEmails" defaultValue={s.blockedEmails.join("\n")} className="min-h-28" />
            </AdminField>
            <AdminField label="Blocked email domains" hint="e.g. spammy-domain.com">
              <AdminTextarea name="blockedDomains" defaultValue={s.blockedDomains.join("\n")} className="min-h-28" />
            </AdminField>
            <AdminField label="Blocked IP addresses">
              <AdminTextarea name="blockedIps" defaultValue={s.blockedIps.join("\n")} className="min-h-28" />
            </AdminField>
            <AdminField label="Spam words and phrases" hint="Each match adds to the spam score; two matches send a message to Spam.">
              <AdminTextarea name="keywords" defaultValue={s.keywords.join("\n")} className="min-h-28" />
            </AdminField>
          </section>

          <div className="flex justify-end">
            <button type="submit" className="btn-brand !px-5 !py-2.5 text-[13.5px]">
              <Save className="h-4 w-4" /> Save spam settings
            </button>
          </div>
        </form>

        <aside className="grid gap-5">
          <section className={card}>
            <h2 className="flex items-center gap-2 font-display text-[16px] font-bold text-fg">
              <ShieldCheck className="h-5 w-5 text-[#1f9d55]" /> Active protection
            </h2>
            <ul className="mt-3 space-y-2 text-[13px] text-fg">
              {[
                ["Hidden honeypot field", true],
                ["Too-fast submission check (bots)", true],
                ["5 submissions per IP per 10 minutes", true],
                ["Links, spam words, random names", true],
                ["Temporary / fake email domains", true],
                ["Duplicate submissions", true],
                [turnstile ? "Cloudflare Turnstile CAPTCHA" : "Cloudflare Turnstile — not set up", turnstile],
              ].map(([label, ok]) => (
                <li key={String(label)} className="flex items-center gap-2">
                  {ok ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1f9d55]" /> : <CircleAlert className="h-4 w-4 shrink-0 text-[#d99a19]" />}
                  {label}
                </li>
              ))}
            </ul>
            {!turnstile ? (
              <p className="mt-3 text-[12px] leading-relaxed text-fg-muted">
                For the strongest protection add a free Cloudflare Turnstile widget: create one at dash.cloudflare.com → Turnstile, then set <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> (before building) and <code>TURNSTILE_SECRET_KEY</code> in the server’s .env.
              </p>
            ) : null}
          </section>
          <section className={card}>
            <h2 className="font-display text-[16px] font-bold text-fg">Caught in the last 30 days</h2>
            {counts ? (
              <ul className="mt-3 space-y-1.5 text-[13.5px] text-fg">
                <li>Contact & hire forms: {counts.contact}</li>
                <li>Job applications: {counts.jobs}</li>
                <li>Chat robot: {counts.chat}</li>
              </ul>
            ) : (
              <p className="mt-2 text-[13px] text-fg-muted">Database unavailable.</p>
            )}
            <Link href="/admin/inbox?status=spam" className="mt-3 inline-block text-[13px] font-semibold text-[#0878d1] hover:underline">
              Review spam folder →
            </Link>
            <p className="mt-2 text-[12px] text-fg-muted">Dropped bot submissions (honeypot, blocklist, rate limit) are not stored.</p>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
