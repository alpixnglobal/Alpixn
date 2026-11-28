import { createHash, createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { getTotpSecret, verifyTotp } from "@/lib/totp";
import { can, canView, isRole, type Permission, type Role } from "@/lib/rbac";

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export type AdminSession = { email: string; role: Role; name: string; owner: boolean };

const SESSION_COOKIE_NAME = "axaon-admin-session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

function getRequiredConfig() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;

  if (!email || !password || !secret || secret.length < 32) {
    throw new Error("Admin authentication configuration is invalid.");
  }

  return { email, password, secret };
}

function safeCompare(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function signValue(email: string, issuedAt: number, secret: string) {
  return createHmac("sha256", secret)
    .update(`${email}.${issuedAt}`)
    .digest("hex");
}

function createSessionValue(email: string, secret: string) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const encodedEmail = Buffer.from(email, "utf8").toString("base64url");
  const signature = signValue(email, issuedAt, secret);

  return `${encodedEmail}.${issuedAt}.${signature}`;
}

/** Checks the cookie signature and age; returns the signed-in email (owner or team member). */
function verifySessionValue(value: string | undefined) {
  if (!value) return null;

  try {
    const { secret } = getRequiredConfig();
    const parts = value.split(".");

    if (parts.length !== 3) return null;

    const [encodedEmail, timestamp, signature] = parts;
    if (!encodedEmail || !timestamp || !signature) return null;

    const issuedAt = Number(timestamp);
    const now = Math.floor(Date.now() / 1000);

    if (!Number.isSafeInteger(issuedAt)) return null;
    if (issuedAt > now + 60) return null;
    if (now - issuedAt > SESSION_DURATION_SECONDS) return null;

    const sessionEmail = Buffer.from(encodedEmail, "base64url").toString("utf8");
    const expected = signValue(sessionEmail, issuedAt, secret);
    if (!safeCompare(signature, expected)) return null;

    return { email: sessionEmail, issuedAt };
  } catch {
    return null;
  }
}

/* ---------------- team members (password hashing) ---------------- */

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [algo, saltB64, keyB64] = stored.split("$");
  if (algo !== "scrypt" || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, "base64");
  const key = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length);
  return key.length === expected.length && timingSafeEqual(key, expected);
}

type TeamUser = { email: string; name?: string; role?: string; passwordHash: string; totpSecretEnc?: string; active?: boolean; passwordChangedAt?: Date | null };

async function findTeamUser(email: string): Promise<TeamUser | null> {
  if (!process.env.MONGODB_URI) return null;
  await connectToDatabase();
  const { AdminUserModel } = await import("@/lib/growth/models");
  return (await AdminUserModel.findOne({ email: email.toLowerCase().trim(), active: true }).lean()) as TeamUser | null;
}

async function getClientIp() {
  const requestHeaders = await headers();
  return requestHeaders.get("x-real-ip")?.trim() || "unknown";
}

async function consumeLoginAttempt(ip: string) {
  await connectToDatabase();

  const collection = (await import("mongoose")).default.connection.db!
    .collection<{ _id: string; attempts?: number; windowStart?: Date; expiresAt?: Date }>("adminLoginAttempts");

  await collection.createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: "admin_login_attempts_ttl" }
  );

  const now = new Date();
  const cutoff = new Date(now.getTime() - LOGIN_WINDOW_MS);
  const key = createHash("sha256").update(ip).digest("hex");

  await collection.updateOne(
    { _id: key },
    [
      {
        $set: {
          windowStart: {
            $cond: [
              {
                $lte: [
                  { $ifNull: ["$windowStart", new Date(0)] },
                  cutoff,
                ],
              },
              now,
              { $ifNull: ["$windowStart", now] },
            ],
          },
          attempts: {
            $cond: [
              {
                $lte: [
                  { $ifNull: ["$windowStart", new Date(0)] },
                  cutoff,
                ],
              },
              1,
              { $add: [{ $ifNull: ["$attempts", 0] }, 1] },
            ],
          },
          expiresAt: new Date(now.getTime() + LOGIN_WINDOW_MS * 2),
        },
      },
    ],
    { upsert: true }
  );

  const bucket = await collection.findOne({ _id: key });
  return Number(bucket?.attempts ?? 0);
}

async function clearLoginAttempts(ip: string) {
  await connectToDatabase();

  const collection = (await import("mongoose")).default.connection.db!
    .collection<{ _id: string; attempts?: number; windowStart?: Date; expiresAt?: Date }>("adminLoginAttempts");

  const key = createHash("sha256").update(ip).digest("hex");
  await collection.deleteOne({ _id: key });
}

export async function signInAdmin(email: string, password: string, otp = "") {
  try {
    const config = getRequiredConfig();
    const ip = await getClientIp();
    const attempts = await consumeLoginAttempt(ip);

    if (attempts > MAX_LOGIN_ATTEMPTS) return false;

    let sessionEmail = "";
    if (safeCompare(email, config.email)) {
      if (!safeCompare(password, config.password)) return false;
      // Two-factor authentication (authenticator app) when enabled.
      const totpSecret = await getTotpSecret();
      if (totpSecret && !verifyTotp(totpSecret, otp)) return false;
      sessionEmail = config.email;
    } else {
      // Team member with their own password (scrypt hash) and optional own 2FA.
      const user = await findTeamUser(email);
      if (!user || !isRole(user.role) || !(await verifyPassword(password, user.passwordHash))) return false;
      if (user.totpSecretEnc) {
        const { decryptSecret } = await import("@/lib/ai/crypto");
        if (!verifyTotp(decryptSecret(user.totpSecretEnc), otp)) return false;
      }
      sessionEmail = user.email;
      const { AdminUserModel } = await import("@/lib/growth/models");
      await AdminUserModel.updateOne({ email: user.email }, { $set: { lastLoginAt: new Date() } });
    }

    await clearLoginAttempts(ip);

    const cookieStore = await cookies();
    cookieStore.set(
      SESSION_COOKIE_NAME,
      createSessionValue(sessionEmail, config.secret),
      {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_DURATION_SECONDS,
      }
    );

    return true;
  } catch {
    return false;
  }
}

export async function signOutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * The signed-in admin with their role. The owner comes from ADMIN_EMAIL; team members are looked up on
 * every request, so deactivating a member or changing their password ends their sessions immediately.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const verified = verifySessionValue(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  if (!verified) return null;
  try {
    const { email } = getRequiredConfig();
    if (safeCompare(verified.email, email)) return { email, role: "owner", name: "Owner", owner: true };
    const user = await findTeamUser(verified.email);
    if (!user || !isRole(user.role)) return null;
    if (user.passwordChangedAt && new Date(user.passwordChangedAt).getTime() / 1000 > verified.issuedAt + 1) return null;
    return { email: user.email, role: user.role, name: user.name || user.email, owner: false };
  } catch {
    return null;
  }
}

/**
 * Requires a signed-in admin. With a permission, members without it are sent back to the dashboard
 * (pages pass `{ view: true }` to also let read-only viewers in).
 */
export async function requireAdminSession(permission?: Permission, opts: { view?: boolean } = {}): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (permission && !(opts.view ? canView(session.role, permission) : can(session.role, permission))) {
    redirect(`/admin?error=${encodeURIComponent("Your role doesn't have access to that.")}`);
  }
  return session;
}
