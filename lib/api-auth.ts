import { randomBytes } from "node:crypto";
import { sha256 } from "@/lib/ai/crypto";
import { connectToDatabase } from "@/lib/db";
import { ApiTokenModel } from "@/lib/models";

export const API_SCOPES = [
  { key: "blogs:read", label: "Read blog posts (including drafts)" },
  { key: "blogs:write", label: "Create blog posts as drafts" },
  { key: "blogs:publish", label: "Publish blog posts directly" },
  { key: "ai:generate", label: "Ask the site's AI to write a new blog post" },
  { key: "seo:read", label: "Read page SEO settings" },
  { key: "seo:write", label: "Update page SEO title, description and keywords" },
] as const;

export type ApiScope = (typeof API_SCOPES)[number]["key"];

/** Creates a token. The plain value is returned once and never stored — only its SHA-256 hash. */
export async function createApiToken(name: string, scopes: ApiScope[]) {
  await connectToDatabase();
  const token = `alpx_${randomBytes(24).toString("hex")}`;
  await ApiTokenModel.create({ name, prefix: token.slice(0, 10), tokenHash: sha256(token), scopes });
  return token;
}

export type ApiTokenInfo = { id: string; name: string; prefix: string; scopes: string[]; lastUsedAt: string | null; createdAt: string; revoked: boolean };

export async function listApiTokens(): Promise<ApiTokenInfo[]> {
  await connectToDatabase();
  const docs = (await ApiTokenModel.find().sort({ createdAt: -1 }).lean()) as unknown as {
    _id: unknown;
    name: string;
    prefix: string;
    scopes: string[];
    lastUsedAt?: Date | null;
    createdAt: Date;
    revoked: boolean;
  }[];
  return docs.map((d) => ({
    id: String(d._id),
    name: d.name,
    prefix: d.prefix,
    scopes: d.scopes,
    lastUsedAt: d.lastUsedAt ? new Date(d.lastUsedAt).toISOString() : null,
    createdAt: new Date(d.createdAt).toISOString(),
    revoked: d.revoked,
  }));
}

/** Validates "Authorization: Bearer alpx_…" and the required scope. Returns an error Response when not allowed. */
export async function requireApiScope(request: Request, scope: ApiScope): Promise<{ ok: true; tokenName: string } | { ok: false; response: Response }> {
  const header = request.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  const deny = (status: number, error: string) => ({ ok: false as const, response: Response.json({ error }, { status }) });
  if (!token.startsWith("alpx_")) return deny(401, "Missing or invalid API token. Send Authorization: Bearer <token>.");
  try {
    await connectToDatabase();
  } catch {
    return deny(503, "Database unavailable.");
  }
  const doc = (await ApiTokenModel.findOne({ tokenHash: sha256(token), revoked: false }).lean()) as { _id: unknown; name: string; scopes: string[] } | null;
  if (!doc) return deny(401, "API token not recognised or revoked.");
  if (!doc.scopes.includes(scope)) return deny(403, `This token does not have the "${scope}" permission.`);
  await ApiTokenModel.updateOne({ _id: doc._id }, { $set: { lastUsedAt: new Date() } });
  return { ok: true, tokenName: doc.name };
}
