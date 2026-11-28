import { promises as dns } from "node:dns";
import { connectToDatabase } from "@/lib/db";
import { ContactMessageModel, SpamSettingsModel } from "@/lib/models";
import { rateLimit } from "@/lib/assistant/rate-limit";

/* ---------------- settings ---------------- */

export type SpamSettings = {
  enabled: boolean;
  /** Score at or above which a submission goes to the spam folder (0–100+). */
  threshold: number;
  checkMx: boolean;
  blockedEmails: string[];
  blockedDomains: string[];
  blockedIps: string[];
  keywords: string[];
};

export const DEFAULT_SPAM_SETTINGS: SpamSettings = {
  enabled: true,
  threshold: 50,
  checkMx: true,
  blockedEmails: [],
  blockedDomains: [],
  blockedIps: [],
  keywords: [
    "crypto",
    "bitcoin",
    "forex",
    "casino",
    "betting",
    "viagra",
    "cialis",
    "porn",
    "escort",
    "lottery",
    "backlinks",
    "guest post",
    "dofollow",
    "seo services",
    "rank your website",
    "first page of google",
    "increase your traffic",
    "website traffic",
    "investment opportunity",
    "loan offer",
    "telegram me",
    "unsubscribe from our list",
  ],
};

export async function getSpamSettings(): Promise<SpamSettings> {
  if (!process.env.MONGODB_URI) return DEFAULT_SPAM_SETTINGS;
  try {
    await connectToDatabase();
    const doc = (await SpamSettingsModel.findOne({ key: "spam" }).lean()) as { data?: Partial<SpamSettings> } | null;
    return { ...DEFAULT_SPAM_SETTINGS, ...(doc?.data ?? {}) };
  } catch {
    return DEFAULT_SPAM_SETTINGS;
  }
}

export async function saveSpamSettings(data: SpamSettings) {
  await connectToDatabase();
  await SpamSettingsModel.updateOne({ key: "spam" }, { $set: { key: "spam", data } }, { upsert: true });
}

/* ---------------- checks ---------------- */

const DISPOSABLE = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "sharklasers.com", "10minutemail.com", "tempmail.com", "temp-mail.org",
  "yopmail.com", "trashmail.com", "getnada.com", "dispostable.com", "maildrop.cc", "throwawaymail.com", "fakeinbox.com",
  "mailnesia.com", "mintemail.com", "emailondeck.com", "tempail.com", "moakt.com", "burnermail.io", "tempmailo.com",
  "mohmal.com", "spamgourmet.com", "mytemp.email", "tmpmail.org", "tmail.ws", "linshiyouxiang.net", "33mail.com",
]);

/** Whether DNS lookups work on this server (checked against well-known domains, cached for 10 minutes). */
let dnsCheck: { ok: boolean; at: number } | null = null;
async function dnsWorks() {
  if (dnsCheck && Date.now() - dnsCheck.at < 10 * 60 * 1000) return dnsCheck.ok;
  const probe = async (d: string) => {
    try {
      const r = await Promise.race([dns.resolveMx(d), new Promise<null>((res) => setTimeout(() => res(null), 3000))]);
      return Array.isArray(r) && r.length > 0;
    } catch {
      return false;
    }
  };
  const ok = (await probe("gmail.com")) || (await probe("outlook.com"));
  dnsCheck = { ok, at: Date.now() };
  return ok;
}

async function hasMailServer(domain: string) {
  // If DNS itself is unavailable, never mark an address as invalid.
  if (!(await dnsWorks())) return true;
  try {
    const mx = await Promise.race([dns.resolveMx(domain), new Promise<null>((r) => setTimeout(() => r(null), 3000))]);
    if (mx === null) return true; // timeout: don't punish
    return mx.length > 0;
  } catch (e) {
    const code = (e as { code?: string }).code;
    return !(code === "ENOTFOUND" || code === "ENODATA" || code === "NXDOMAIN");
  }
}

const countLinks = (s: string) => (s.match(/https?:\/\/|www\.|\[url|<a\s/gi) ?? []).length;

function looksGibberish(name: string) {
  const n = name.replace(/\s+/g, "");
  if (n.length < 7) return false;
  const noVowels = !/[aeiouy]/i.test(n);
  const caseFlips = (n.match(/[a-z][A-Z]/g) ?? []).length;
  return noVowels || caseFlips >= 3;
}

function nonLatinShare(s: string) {
  const letters = s.match(/\p{L}/gu) ?? [];
  if (letters.length < 20) return 0;
  // Devanagari and other Indian scripts are welcome; flag Cyrillic and CJK-heavy messages (common bulk spam).
  const flagged = s.match(/[Ѐ-ӿ぀-ヿ一-鿿]/g) ?? [];
  return flagged.length / letters.length;
}

export type SpamVerdict = { action: "allow" | "spam" | "drop" | "challenge"; score: number; reasons: string[] };

/**
 * Scores one form submission. "drop" = obvious bot (pretend success, store nothing);
 * "spam" = store in the spam folder without emailing; "challenge" = CAPTCHA failed (ask the person to retry).
 */
export async function assessSubmission(opts: {
  formData?: FormData;
  ip: string;
  form: string;
  email: string;
  name: string;
  texts: string[];
  /** Skip the honeypot/timing checks (e.g. chat robot, which has no HTML form). */
  noFormChecks?: boolean;
}): Promise<SpamVerdict> {
  const s = await getSpamSettings();
  const reasons: string[] = [];
  let score = 0;
  const email = opts.email.trim().toLowerCase();
  const domain = email.split("@")[1] ?? "";
  const all = [opts.name, ...opts.texts].join("\n").toLowerCase();

  if (s.blockedIps.includes(opts.ip)) return { action: "drop", score: 100, reasons: ["Blocked IP"] };
  if (email && (s.blockedEmails.includes(email) || s.blockedDomains.some((d) => domain === d || domain.endsWith(`.${d}`)))) return { action: "drop", score: 100, reasons: ["Blocked email or domain"] };
  if (!s.enabled) return { action: "allow", score: 0, reasons: [] };

  // Rate limit: 5 submissions per IP per 10 minutes, per form.
  if (!rateLimit(`form:${opts.form}:${opts.ip}`, 5, 10 * 60 * 1000)) return { action: "drop", score: 100, reasons: ["Too many submissions"] };

  if (!opts.noFormChecks && opts.formData) {
    if (String(opts.formData.get("company_website") ?? "").trim()) return { action: "drop", score: 100, reasons: ["Honeypot field filled"] };

    // Optional Cloudflare Turnstile.
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (secret && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      const token = String(opts.formData.get("cf-turnstile-response") ?? "");
      let ok = false;
      if (token) {
        try {
          const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: new URLSearchParams({ secret, response: token, remoteip: opts.ip }),
            signal: AbortSignal.timeout(5000),
          });
          ok = Boolean(((await res.json()) as { success?: boolean }).success);
        } catch {
          ok = true; // Cloudflare unreachable: fall back to the other checks.
        }
      }
      if (!ok) return { action: "challenge", score: 100, reasons: ["Verification failed"] };
    }

    const started = Number(opts.formData.get("form_started") ?? 0);
    if (!started) {
      score += 40;
      reasons.push("No browser check (JavaScript off or bot)");
    } else {
      const seconds = (Date.now() - started) / 1000;
      if (seconds < 3) {
        score += 50;
        reasons.push(`Submitted in ${seconds.toFixed(1)}s`);
      }
    }
  }

  const links = countLinks(opts.texts.join(" "));
  if (links >= 2) {
    score += 40;
    reasons.push(`${links} links in message`);
  } else if (links === 1) {
    score += 10;
    reasons.push("Link in message");
  }
  if (countLinks(opts.name)) {
    score += 50;
    reasons.push("Link in name");
  }
  const hits = s.keywords.filter((k) => k && all.includes(k.toLowerCase()));
  if (hits.length) {
    score += Math.min(80, hits.length * 40);
    reasons.push(`Spam words: ${hits.slice(0, 4).join(", ")}`);
  }
  if (looksGibberish(opts.name)) {
    score += 30;
    reasons.push("Random-looking name");
  }
  if (nonLatinShare(all) > 0.3) {
    score += 40;
    reasons.push("Message mostly in Cyrillic/CJK script");
  }
  if (domain) {
    if (DISPOSABLE.has(domain)) {
      score += 60;
      reasons.push("Temporary email address");
    } else if (s.checkMx && !(await hasMailServer(domain))) {
      score += 60;
      reasons.push("Email domain has no mail server");
    }
  }

  // Same person sending the same message again within 10 minutes.
  if (email && process.env.MONGODB_URI) {
    try {
      await connectToDatabase();
      const msg = opts.texts.join("\n").trim().slice(0, 500);
      if (msg && (await ContactMessageModel.exists({ email, message: { $regex: `^${msg.slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}` }, createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } }))) {
        return { action: "drop", score: 100, reasons: ["Duplicate submission"] };
      }
    } catch {
      /* ignore */
    }
  }

  return { action: score >= s.threshold ? "spam" : "allow", score, reasons };
}
