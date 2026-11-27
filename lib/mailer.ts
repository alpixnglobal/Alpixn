import "server-only";
import nodemailer from "nodemailer";

/**
 * Sends contact-form enquiries by email over SMTP.
 *
 * Configure with environment variables (never commit real values):
 *   SMTP_HOST (default smtp.hostinger.com), SMTP_PORT (default 465), SMTP_USER, SMTP_PASS,
 *   SMTP_SECURE ("true" for port 465, default true when port is 465),
 *   CONTACT_TO_EMAIL (default info@alpixn.com), HR_TO_EMAIL (default hr@alpixn.com),
 *   MAIL_FROM (default: SMTP_USER) — must be an address the SMTP account may send as.
 */
export const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@alpixn.com";
export const HR_TO_EMAIL = process.env.HR_TO_EMAIL || "hr@alpixn.com";

export function isMailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function transporter() {
  // Hostinger defaults: smtp.hostinger.com, port 465, SSL.
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

async function sendFormEmail(opts: { to: string; replyName: string; replyEmail: string; subject: string; heading: string; text: string; html: string }) {
  if (!isMailConfigured()) throw new Error("SMTP is not configured (SMTP_USER, SMTP_PASS).");
  await transporter().sendMail({
    from: { name: "ALPIXN Website", address: process.env.MAIL_FROM || (process.env.SMTP_USER as string) },
    to: opts.to,
    replyTo: opts.replyEmail ? { name: opts.replyName, address: opts.replyEmail } : undefined,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}

/** Generic "rows + message" email used by the offshore and career forms. */
export async function sendRowsEmail(opts: { to: string; subject: string; heading: string; rows: [string, string][]; messageLabel?: string; message?: string; replyName: string; replyEmail: string }) {
  const rows = opts.rows.filter(([, v]) => v);
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), ...(opts.message ? ["", `${opts.messageLabel ?? "Message"}:`, opts.message] : [])].join("\n");
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0d1526">
      <h2 style="margin:0 0 12px;color:#071a33">${escapeHtml(opts.heading)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="color:#4f5868;font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td>${/^https?:\/\//.test(v) ? `<a href="${escapeHtml(v)}">${escapeHtml(v)}</a>` : escapeHtml(v)}</td></tr>`).join("")}
      </table>
      ${opts.message ? `<p style="margin:16px 0 4px;color:#4f5868;font-weight:bold">${escapeHtml(opts.messageLabel ?? "Message")}</p><p style="white-space:pre-wrap;margin:0">${escapeHtml(opts.message)}</p>` : ""}
    </div>`;
  await sendFormEmail({ to: opts.to, replyName: opts.replyName, replyEmail: opts.replyEmail, subject: opts.subject, heading: opts.heading, text, html });
}

export type ContactEnquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export async function sendContactEnquiryEmail(enquiry: ContactEnquiry) {
  const name = `${enquiry.firstName} ${enquiry.lastName}`.trim();
  const topic = enquiry.interest ? enquiry.interest.replace(/-/g, " ") : "General enquiry";
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Topic", topic],
  ];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", enquiry.message || "(no message)"].join("\n");
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0d1526">
      <h2 style="margin:0 0 12px;color:#071a33">New enquiry from the ALPIXN website</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="color:#4f5868;font-weight:bold">${k}</td><td>${escapeHtml(v)}</td></tr>`).join("")}
      </table>
      <p style="margin:16px 0 4px;color:#4f5868;font-weight:bold">Message</p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(enquiry.message || "(no message)")}</p>
    </div>`;

  await sendFormEmail({ to: CONTACT_TO_EMAIL, replyName: name, replyEmail: enquiry.email, subject: `New website enquiry: ${topic} — ${name}`, heading: "New enquiry from the ALPIXN website", text, html });
}
