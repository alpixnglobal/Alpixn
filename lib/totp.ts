import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/** RFC 6238 time-based one-time passwords (Google Authenticator, Microsoft Authenticator, Authy). */
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Encode(buf: Buffer) {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

function base32Decode(input: string) {
  const clean = input.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    value = (value << 5) | ALPHABET.indexOf(ch);
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(out);
}

function codeAt(secret: Buffer, counter: number) {
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(counter));
  const hmac = createHmac("sha1", secret).update(msg).digest();
  const offset = hmac[hmac.length - 1] & 15;
  const bin = ((hmac[offset] & 0x7f) << 24) | (hmac[offset + 1] << 16) | (hmac[offset + 2] << 8) | hmac[offset + 3];
  return String(bin % 1_000_000).padStart(6, "0");
}

/** Accepts the current code and one step either side (clock drift). */
export function verifyTotp(secretBase32: string, code: string, now = Date.now()) {
  const token = code.replace(/\s+/g, "");
  if (!/^\d{6}$/.test(token)) return false;
  const secret = base32Decode(secretBase32);
  if (secret.length < 10) return false;
  const step = Math.floor(now / 1000 / 30);
  return [-1, 0, 1].some((d) => timingSafeEqual(Buffer.from(codeAt(secret, step + d)), Buffer.from(token)));
}

export function generateTotpSecret() {
  return base32Encode(randomBytes(20));
}

export function totpUri(secret: string, account: string) {
  return `otpauth://totp/${encodeURIComponent(`ALPIXN Admin:${account}`)}?secret=${secret}&issuer=${encodeURIComponent("ALPIXN Admin")}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * The active two-factor secret: ADMIN_TOTP_SECRET from the server environment, otherwise the one
 * enabled from Admin → Security (stored encrypted). ADMIN_2FA_RESET=1 turns 2FA off in an emergency
 * (e.g. the phone with the authenticator app was lost).
 */
export async function getTotpSecret(): Promise<string> {
  if (process.env.ADMIN_2FA_RESET === "1") return "";
  if (process.env.ADMIN_TOTP_SECRET) return process.env.ADMIN_TOTP_SECRET;
  if (!process.env.MONGODB_URI) return "";
  try {
    const { connectToDatabase } = await import("@/lib/db");
    const { SecuritySettingsModel } = await import("@/lib/models");
    const { decryptSecret } = await import("@/lib/ai/crypto");
    await connectToDatabase();
    const doc = (await SecuritySettingsModel.findOne({ key: "security" }).lean()) as { data?: { totpSecretEnc?: string } } | null;
    return doc?.data?.totpSecretEnc ? decryptSecret(doc.data.totpSecretEnc) : "";
  } catch {
    return "";
  }
}

export async function isTwoFactorEnabled() {
  return Boolean(await getTotpSecret());
}
