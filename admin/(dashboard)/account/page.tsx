import type { Metadata } from "next";
import QRCode from "qrcode";
import { KeyRound, Smartphone } from "lucide-react";

import { changeMyPasswordAction, enableMyTwoFactorAction, startMyTwoFactorAction } from "@/admin/actions/growth-actions";
import { AdminField, AdminInput, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { decryptSecret } from "@/lib/ai/crypto";
import { requireAdminSession } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { AdminUserModel } from "@/lib/growth/models";
import { ROLES } from "@/lib/rbac";
import { totpUri } from "@/lib/totp";

export const metadata: Metadata = { title: "My account" };

const card = `${adminCardClassName} p-5 sm:p-6`;
const h2 = "flex items-center gap-2 font-display text-[16px] font-bold text-fg";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ status?: string; error?: string; setup?: string }> }) {
  const p = await searchParams;
  const flash = getAdminFlashMessage(p.status, p.error);
  const session = await requireAdminSession();

  let twoFactor = false;
  let qr = "";
  let secret = "";
  if (!session.owner) {
    try {
      await connectToDatabase();
      const u = (await AdminUserModel.findOne({ email: session.email }).lean()) as { totpSecretEnc?: string; pendingTotpEnc?: string; pendingTotpAt?: Date } | null;
      twoFactor = Boolean(u?.totpSecretEnc);
      if (p.setup && u?.pendingTotpEnc && u.pendingTotpAt && Date.now() - new Date(u.pendingTotpAt).getTime() < 15 * 60e3) {
        secret = decryptSecret(u.pendingTotpEnc);
        qr = secret ? await QRCode.toDataURL(totpUri(secret, session.email), { margin: 1, width: 200 }) : "";
      }
    } catch {
      /* database unavailable */
    }
  }

  return (
    <AdminShell title="My account" description={`${session.email} · ${ROLES[session.role].label}`} activePath="/admin/account">
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      {session.owner ? (
        <section className={card}>
          <p className="text-[13.5px] text-fg">You are signed in as the owner. The owner password is set on the server (ADMIN_PASSWORD); two-factor login is managed in Admin → Security.</p>
        </section>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
          <section className={card}>
            <h2 className={h2}>
              <KeyRound className="h-5 w-5 text-[#0878d1]" /> Change password
            </h2>
            <form action={changeMyPasswordAction} className="mt-4 grid gap-3">
              <AdminField label="Current password">
                <AdminInput name="current" type="password" autoComplete="current-password" required />
              </AdminField>
              <AdminField label="New password" hint="12+ characters with letters and numbers.">
                <AdminInput name="next" type="password" autoComplete="new-password" minLength={12} required />
              </AdminField>
              <div>
                <button className="btn-brand !px-4 !py-2 text-[13px]">Change password</button>
              </div>
            </form>
          </section>
          <section className={card}>
            <h2 className={h2}>
              <Smartphone className="h-5 w-5 text-[#0878d1]" /> Two-factor login
            </h2>
            {twoFactor ? (
              <p className="mt-3 text-[13.5px] text-fg">On. You need the 6-digit code from your authenticator app at every sign-in. Lost your phone? Ask the owner to reset it.</p>
            ) : qr ? (
              <form action={enableMyTwoFactorAction} className="mt-4 grid gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qr} alt="Scan with your authenticator app" width={200} height={200} className="rounded-lg bg-white p-2" />
                <p className="text-[12px] text-fg-muted">
                  Can&apos;t scan? Enter this key: <code className="break-all">{secret}</code>
                </p>
                <AdminField label="6-digit code">
                  <AdminInput name="code" inputMode="numeric" maxLength={7} required />
                </AdminField>
                <div>
                  <button className="btn-brand !px-4 !py-2 text-[13px]">Turn on</button>
                </div>
              </form>
            ) : (
              <form action={startMyTwoFactorAction} className="mt-3">
                <p className="text-[13.5px] text-fg-muted">Protect your account with Google Authenticator, Microsoft Authenticator or Authy.</p>
                <button className="btn-brand mt-3 !px-4 !py-2 text-[13px]">Set up 2FA</button>
              </form>
            )}
          </section>
        </div>
      )}
    </AdminShell>
  );
}
