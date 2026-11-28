"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { canEncrypt, decryptSecret, encryptSecret } from "@/lib/ai/crypto";
import { requireAdminSession } from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/db";
import { SecuritySettingsModel, SeoSettingsModel } from "@/lib/models";
import { getSeoSettings } from "@/lib/seo-store";
import { generateTotpSecret, getTotpSecret, verifyTotp } from "@/lib/totp";

const back = (q: string) => redirect(`/admin/security?${q}`);
const err = (m: string) => back(`error=${encodeURIComponent(m)}`);

async function db() {
  await requireAdminSession("security");
  try {
    await connectToDatabase();
  } catch {
    err("Database unavailable. Check MongoDB connection.");
  }
}

async function getData() {
  const doc = (await SecuritySettingsModel.findOne({ key: "security" }).lean()) as { data?: Record<string, string> } | null;
  return doc?.data ?? {};
}
async function setData(data: Record<string, string | null>) {
  await SecuritySettingsModel.updateOne({ key: "security" }, { $set: { key: "security", data } }, { upsert: true });
}

/** Step 1: create a new secret (kept server-side, encrypted) and show its QR code. */
export async function startTwoFactorSetupAction() {
  await db();
  if (!canEncrypt()) err("AUTH_SECRET must be set (32+ characters) before enabling 2FA.");
  const current = await getData();
  await setData({ ...current, pendingTotpEnc: encryptSecret(generateTotpSecret()), pendingAt: new Date().toISOString() });
  back("setup=1");
}

/** Step 2: confirm a code from the authenticator app, then turn 2FA on. */
export async function enableTwoFactorAction(formData: FormData) {
  await db();
  const data = await getData();
  const pending = decryptSecret(data.pendingTotpEnc ?? "");
  if (!pending || Date.now() - Date.parse(data.pendingAt ?? "") > 15 * 60 * 1000) err("Setup expired. Start again.");
  if (!verifyTotp(pending, String(formData.get("code") ?? ""))) back(`setup=1&error=${encodeURIComponent("That code didn't match. Check the time on your phone and try again.")}`);
  await setData({ ...data, totpSecretEnc: encryptSecret(pending), totpEnabledAt: new Date().toISOString(), pendingTotpEnc: null, pendingAt: null });
  revalidatePath("/admin/security");
  back(`status=${encodeURIComponent("Two-factor login is on. You'll need the 6-digit code every time you sign in.")}`);
}

export async function disableTwoFactorAction(formData: FormData) {
  await db();
  if (process.env.ADMIN_TOTP_SECRET) err("2FA is set by ADMIN_TOTP_SECRET on the server; remove it there to turn it off.");
  const secret = await getTotpSecret();
  if (secret && !verifyTotp(secret, String(formData.get("code") ?? ""))) err("Enter a valid code from your authenticator app to turn 2FA off.");
  const data = await getData();
  await setData({ ...data, totpSecretEnc: null, totpEnabledAt: null });
  revalidatePath("/admin/security");
  back("status=saved");
}

export async function saveContentProtectionAction(formData: FormData) {
  await db();
  const current = await getSeoSettings();
  await SeoSettingsModel.updateOne(
    { key: "seo" },
    {
      $set: {
        key: "seo",
        data: {
          ...current,
          blockAiCrawlers: formData.get("blockAiCrawlers") === "on",
          copyAttribution: formData.get("copyAttribution") === "on",
          protectImages: formData.get("protectImages") === "on",
          disableSelection: formData.get("disableSelection") === "on",
        },
      },
    },
    { upsert: true }
  );
  revalidateTag("seo", { expire: 0 });
  revalidatePath("/robots.txt");
  revalidatePath("/", "layout");
  back("status=saved");
}
