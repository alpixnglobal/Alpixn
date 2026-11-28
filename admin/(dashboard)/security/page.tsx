import type { Metadata } from "next";
import QRCode from "qrcode";
import { CheckCircle2, CircleAlert, KeyRound, Lock, Save, ShieldCheck, Smartphone } from "lucide-react";

import { disableTwoFactorAction, enableTwoFactorAction, saveContentProtectionAction, startTwoFactorSetupAction } from "@/admin/actions/security-actions";
import { AdminField, AdminInput, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { decryptSecret } from "@/lib/ai/crypto";
import { getAdminSession } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { SecuritySettingsModel } from "@/lib/models";
import { getSeoSettings } from "@/lib/seo-store";
import { isTwoFactorEnabled, totpUri } from "@/lib/totp";

export const metadata: Metadata = { title: "Security" };

const card = `${adminCardClassName} p-5 sm:p-6`;
const h2 = "font-display text-[16px] font-bold text-fg";

async function pendingSetup() {
  try {
    await connectToDatabase();
    const doc = (await SecuritySettingsModel.findOne({ key: "security" }).lean()) as { data?: Record<string, string> } | null;
    const d = doc?.data ?? {};
    if (!d.pendingTotpEnc || Date.now() - Date.parse(d.pendingAt ?? "") > 15 * 60 * 1000) return null;
    return { secret: decryptSecret(d.pendingTotpEnc), enabledAt: d.totpEnabledAt };
  } catch {
    return null;
  }
}

function Item({ ok, label, hint }: { ok: boolean; label: string; hint?: string }) {
  return (
    <li className="flex gap-2.5">
      {ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1f9d55]" /> : <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#d99a19]" />}
      <span>
        <span className="text-fg">{label}</span>
        {hint && !ok ? <span className="block text-[12px] text-fg-muted">{hint}</span> : null}
      </span>
    </li>
  );
}

export default async function SecurityPage({ searchParams }: { searchParams: Promise<{ setup?: string; status?: string; error?: string }> }) {
  const p = await searchParams;
  const flash = p.status && p.status !== "saved" ? { tone: "success" as const, message: p.status } : getAdminFlashMessage(p.status, p.error);
  const [twoFactor, seo, session, pending] = await Promise.all([isTwoFactorEnabled(), getSeoSettings(), getAdminSession(), p.setup ? pendingSetup() : Promise.resolve(null)]);
  const qr = pending ? await QRCode.toDataURL(totpUri(pending.secret, session?.email ?? "admin"), { margin: 1, width: 220 }) : "";
  const authSecretOk = (process.env.AUTH_SECRET ?? "").length >= 32;
  const passwordOk = (process.env.ADMIN_PASSWORD ?? "").length >= 14;

  return (
    <AdminShell title="Security" description="Protect the admin panel, website content and visitor data." activePath="/admin/security">
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        <div className="grid gap-5">
          <section className={card}>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#071a33,#064a87)] text-[#f6d77a]">
                <Smartphone className="h-5 w-5" />
              </span>
              <div>
                <h2 className={h2}>Two-factor login (2FA)</h2>
                <p className="mt-0.5 text-[13px] text-fg-muted">After the password, sign-in also needs a 6-digit code from Google Authenticator, Microsoft Authenticator or Authy. A stolen password alone can’t open the admin.</p>
              </div>
            </div>

            {pending ? (
              <form action={enableTwoFactorAction} className="mt-5 grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qr} alt="QR code for the authenticator app" width={220} height={220} className="rounded-xl border border-line bg-white p-2" />
                <div className="grid gap-3 text-[13.5px] text-fg">
                  <ol className="list-decimal space-y-1.5 pl-4">
                    <li>Open your authenticator app and tap “+” → “Scan a QR code”.</li>
                    <li>Scan this code (or enter the setup key below).</li>
                    <li>Type the 6-digit code the app shows and click “Turn on 2FA”.</li>
                  </ol>
                  <code className="select-all break-all rounded-lg border border-line bg-canvas px-3 py-2 font-mono text-[12.5px]">{pending.secret}</code>
                  <AdminField label="6-digit code">
                    <AdminInput name="code" inputMode="numeric" maxLength={7} required autoComplete="one-time-code" placeholder="123456" />
                  </AdminField>
                  <button type="submit" className="btn-brand w-fit !px-4 !py-2 text-[13px]">
                    <ShieldCheck className="h-4 w-4" /> Turn on 2FA
                  </button>
                  <p className="text-[12px] text-fg-muted">Keep the setup key somewhere safe (e.g. a password manager). If the phone is lost, the server team can set ADMIN_2FA_RESET=1 temporarily to turn 2FA off.</p>
                </div>
              </form>
            ) : twoFactor ? (
              <form action={disableTwoFactorAction} className="mt-5 flex flex-wrap items-end gap-3">
                <p className="w-full text-[13.5px] font-semibold text-[#1f9d55]">✓ 2FA is on.</p>
                {!process.env.ADMIN_TOTP_SECRET ? (
                  <>
                    <AdminField label="Code to turn it off">
                      <AdminInput name="code" inputMode="numeric" maxLength={7} required placeholder="123456" />
                    </AdminField>
                    <button className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2.5 text-[13px] font-semibold text-red-500">Turn off 2FA</button>
                  </>
                ) : (
                  <p className="text-[12.5px] text-fg-muted">Managed by ADMIN_TOTP_SECRET on the server.</p>
                )}
              </form>
            ) : (
              <form action={startTwoFactorSetupAction} className="mt-5">
                <button type="submit" className="btn-brand !px-4 !py-2.5 text-[13px]">
                  <KeyRound className="h-4 w-4" /> Set up 2FA
                </button>
              </form>
            )}
          </section>

          <form action={saveContentProtectionAction} className={card}>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#071a33,#064a87)] text-[#f6d77a]">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <h2 className={h2}>Content protection</h2>
                <p className="mt-0.5 text-[13px] text-fg-muted">Nothing shown in a browser can be made impossible to copy, but these settings discourage copying, credit ALPIXN and keep AI bots from training on your content.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["blockAiCrawlers", seo.blockAiCrawlers, "Block AI training bots", "Tells GPTBot, ClaudeBot, CCBot, Google-Extended and similar bots not to collect your content (robots.txt). Google and Bing search are not affected."],
                ["copyAttribution", seo.copyAttribution, "Credit ALPIXN on copied text", "When someone copies a longer passage, “Source: alpixn.com/… — © ALPIXN” is added to what they paste."],
                ["protectImages", seo.protectImages, "Protect images and videos", "Disables right-click “Save image” and dragging on images and videos."],
                ["disableSelection", seo.disableSelection, "Disable text selection", "Stops selecting text on public pages. Not recommended: it annoys visitors and hurts accessibility. Form fields still work."],
              ].map(([name, on, label, hint]) => (
                <label key={String(name)} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-canvas p-4">
                  <input type="checkbox" name={String(name)} defaultChecked={Boolean(on)} className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
                  <span>
                    <span className="block text-[14px] font-semibold text-fg">{label}</span>
                    <span className="block text-[12.5px] text-fg-muted">{hint}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
          </form>
        </div>

        <aside className={card}>
          <h2 className={h2}>Security status</h2>
          <ul className="mt-4 space-y-3 text-[13.5px]">
            <Item ok label="Login attempts limited (5 per 15 minutes)" />
            <Item ok label="Signed, HTTP-only, strict admin session (8 hours)" />
            <Item ok label="Security headers (CSP, HSTS, clickjacking protection)" />
            <Item ok label="Form spam protection & rate limits" />
            <Item ok label="API keys and tokens stored encrypted / hashed" />
            <Item ok={twoFactor} label="Two-factor login" hint="Turn it on above." />
            <Item ok={authSecretOk} label="Strong AUTH_SECRET (32+ characters)" hint="Set a long random AUTH_SECRET on the server." />
            <Item ok={passwordOk} label="Strong admin password (14+ characters)" hint="Use a long, unique ADMIN_PASSWORD." />
            <Item ok={Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY)} label="CAPTCHA on forms (Turnstile)" hint="Add Turnstile keys — see Spam protection." />
          </ul>
          <p className="mt-5 text-[12px] leading-relaxed text-fg-muted">Server-side protection (firewall, SSH, HTTPS, database access, backups, Cloudflare) is handled by the server team — see docs/security.md in the project.</p>
        </aside>
      </div>
    </AdminShell>
  );
}
