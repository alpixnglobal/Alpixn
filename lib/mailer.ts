import "server-only";
import nodemailer from "nodemailer";

/**
 * Sends contact-form enquiries by email over SMTP.
 *
 * Configure with environment variables (never commit real values):
 *   SMTP_HOST, SMTP_PORT (default 465), SMTP_USER, SMTP_PASS,
 *   SMTP_SECURE ("true" for port 465, default true when port is 465),
 *   CONTACT_TO_EMAIL (default info@alpixn.com),
 *   MAIL_FROM (default: SMTP_USER) — must be an address the SMTP account may send as.
 */
export const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@alpixn.com";

export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
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
  if (!isMailConfigured()) {
    throw new Error("SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS).");
  }
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

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

  await transporter.sendMail({
    from: { name: "ALPIXN Website", address: process.env.MAIL_FROM || (process.env.SMTP_USER as string) },
    to: CONTACT_TO_EMAIL,
    replyTo: { name, address: enquiry.email },
    subject: `New website enquiry: ${topic} — ${name}`,
    text,
    html,
  });
}
