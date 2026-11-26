import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";

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

function verifySessionValue(value: string | undefined) {
  if (!value) return null;

  try {
    const { email, secret } = getRequiredConfig();
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
    if (!safeCompare(sessionEmail, email)) return null;

    const expected = signValue(email, issuedAt, secret);
    if (!safeCompare(signature, expected)) return null;

    return { email };
  } catch {
    return null;
  }
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

export async function signInAdmin(email: string, password: string) {
  try {
    const config = getRequiredConfig();
    const ip = await getClientIp();
    const attempts = await consumeLoginAttempt(ip);

    if (attempts > MAX_LOGIN_ATTEMPTS) return false;

    const validEmail = safeCompare(email, config.email);
    const validPassword = safeCompare(password, config.password);

    if (!validEmail || !validPassword) return false;

    await clearLoginAttempts(ip);

    const cookieStore = await cookies();
    cookieStore.set(
      SESSION_COOKIE_NAME,
      createSessionValue(config.email, config.secret),
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

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySessionValue(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
