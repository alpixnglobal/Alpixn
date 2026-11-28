import { createHmac } from "node:crypto";
import nodemailer from "nodemailer";
import { SITE_URL } from "@/lib/seo";
import type { SalesSettings } from "./settings";

/**
 * Sales emails use their own SMTP account when SALES_SMTP_* is set (recommended: a separate sending
 * domain so cold outreach can never hurt the main alpixn.com mailbox), otherwise the form SMTP account.
 */
function env(key: string) {
  return process.env[`SALES_${key}`] || process.env[key] || "";
}

export function isSalesMailConfigured() {
  return Boolean(env("SMTP_USER") && env("SMTP_PASS"));
}

export function unsubscribeToken(leadId: string) {
  const secret = process.env.AUTH_SECRET || process.env.AI_ENCRYPTION_KEY || "alpixn";
  return createHmac("sha256", secret).update(`unsub:${leadId}`).digest("hex").slice(0, 32);
}

export function unsubscribeUrl(leadId: string) {
  return `${SITE_URL}/api/sales/unsubscribe?l=${encodeURIComponent(leadId)}&t=${unsubscribeToken(leadId)}`;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function sendSalesEmail(opts: { settings: SalesSettings; leadId: string; to: string; subject: string; body: string }) {
  const { settings } = opts;
  const port = Number(env("SMTP_PORT") || 465);
  const transport = nodemailer.createTransport({
    host: env("SMTP_HOST") || "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
  });
  const unsub = unsubscribeUrl(opts.leadId);
  const fromEmail = settings.fromEmail || env("SMTP_USER");
  const text = `${opts.body.trim()}\n\n${settings.signature}\n\n—\n${settings.footerAddress}\nDon't want these emails? Unsubscribe: ${unsub}`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#0d1526">${opts.body
    .trim()
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 12px">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("")}<p style="margin:16px 0 0;white-space:pre-line">${escapeHtml(settings.signature)}</p><p style="margin:24px 0 0;font-size:11px;color:#6b7280">${escapeHtml(settings.footerAddress)}<br><a href="${unsub}" style="color:#6b7280">Unsubscribe</a></p></div>`;
  await transport.sendMail({
    from: `"${settings.fromName.replace(/"/g, "")}" <${fromEmail}>`,
    to: opts.to,
    replyTo: settings.replyTo || fromEmail,
    subject: opts.subject,
    text,
    html,
    headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  });
}
