import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/**
 * AES-256-GCM encryption for API keys stored in the database. The key comes from
 * AI_ENCRYPTION_KEY (preferred) or AUTH_SECRET, so a database dump alone does not reveal provider keys.
 */
function key() {
  const secret = process.env.AI_ENCRYPTION_KEY || process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) throw new Error("Set AI_ENCRYPTION_KEY (or AUTH_SECRET) to store API keys securely.");
  return createHash("sha256").update(secret).digest();
}

export function canEncrypt() {
  const secret = process.env.AI_ENCRYPTION_KEY || process.env.AUTH_SECRET;
  return Boolean(secret && secret.length >= 16);
}

export function encryptSecret(plain: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return `v1:${iv.toString("base64")}:${cipher.getAuthTag().toString("base64")}:${enc.toString("base64")}`;
}

export function decryptSecret(stored: string) {
  if (!stored) return "";
  const [v, iv, tag, data] = stored.split(":");
  if (v !== "v1" || !iv || !tag || !data) return "";
  try {
    const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64"));
    decipher.setAuthTag(Buffer.from(tag, "base64"));
    return Buffer.concat([decipher.update(Buffer.from(data, "base64")), decipher.final()]).toString("utf8");
  } catch {
    return "";
  }
}

/** "sk-ant-…abcd" style hint for showing which key is saved, without revealing it. */
export function maskSecret(plain: string) {
  if (!plain) return "";
  return plain.length <= 8 ? "••••" : `${plain.slice(0, 6)}…${plain.slice(-4)}`;
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
