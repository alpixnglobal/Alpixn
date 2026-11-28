import { connectToDatabase } from "@/lib/db";
import { JobModel } from "./models";

export type JobHandler = (payload: Record<string, unknown>, job: { id: string; attempts: number }) => Promise<void | string>;

/** Adds a job. With a dedupeKey, the same job is never queued twice (e.g. one reply per inbound message). */
export async function enqueue(type: string, payload: Record<string, unknown> = {}, opts: { runAt?: Date; dedupeKey?: string; maxAttempts?: number } = {}) {
  await connectToDatabase();
  try {
    const doc = await JobModel.create({ type, payload, runAt: opts.runAt ?? new Date(), maxAttempts: opts.maxAttempts ?? 5, ...(opts.dedupeKey ? { dedupeKey: opts.dedupeKey } : {}) });
    return String(doc._id);
  } catch (e) {
    if ((e as { code?: number }).code === 11000) return null; // duplicate dedupeKey — already queued
    throw e;
  }
}

/** Exponential backoff: 1, 2, 4, 8 … minutes (max 6 hours). */
export const backoffMs = (attempt: number) => Math.min(6 * 3600e3, 60e3 * 2 ** Math.max(0, attempt - 1));

/**
 * Runs due jobs one at a time with an atomic lock, so two cron runs (or PM2 instances) never process the
 * same job. Failed jobs are retried with backoff until maxAttempts, then marked failed.
 */
export async function runDueJobs(handlers: Record<string, JobHandler>, opts: { limit?: number; timeBudgetMs?: number } = {}) {
  await connectToDatabase();
  const started = Date.now();
  const limit = opts.limit ?? 50;
  const budget = opts.timeBudgetMs ?? 240e3;
  const done: string[] = [];
  const failed: string[] = [];
  for (let i = 0; i < limit && Date.now() - started < budget; i++) {
    const now = new Date();
    const job = (await JobModel.findOneAndUpdate(
      {
        type: { $in: Object.keys(handlers) },
        runAt: { $lte: now },
        $or: [{ status: "queued" }, { status: "running", lockedUntil: { $lt: now } }],
      },
      { $set: { status: "running", lockedUntil: new Date(now.getTime() + 5 * 60e3) }, $inc: { attempts: 1 } },
      { sort: { runAt: 1 }, new: true }
    ).lean()) as { _id: unknown; type: string; payload: Record<string, unknown>; attempts: number; maxAttempts: number } | null;
    if (!job) break;
    const id = String(job._id);
    try {
      const result = await handlers[job.type](job.payload ?? {}, { id, attempts: job.attempts });
      await JobModel.updateOne({ _id: id }, { $set: { status: "done", finishedAt: new Date(), lockedUntil: null, lastError: typeof result === "string" ? result : "" } });
      done.push(job.type);
    } catch (e) {
      const msg = e instanceof Error ? e.message.slice(0, 500) : "error";
      const final = job.attempts >= job.maxAttempts;
      await JobModel.updateOne(
        { _id: id },
        { $set: final ? { status: "failed", lastError: msg, finishedAt: new Date(), lockedUntil: null } : { status: "queued", lastError: msg, runAt: new Date(Date.now() + backoffMs(job.attempts)), lockedUntil: null } }
      );
      failed.push(`${job.type}: ${msg}`);
    }
  }
  return { done, failed };
}
