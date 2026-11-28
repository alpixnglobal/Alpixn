import type { JobHandler } from "./jobs";
import { connectToDatabase } from "@/lib/db";
import { ApprovalModel, AuditLogModel, JobModel } from "./models";

/**
 * Background job types and their handlers. Agents add theirs here; the cron tick (/api/cron/agents)
 * runs whatever is due. Every handler must be safe to retry.
 */
export const JOB_HANDLERS: Record<string, JobHandler> = {
  /** Housekeeping: drop finished jobs after 14 days and audit entries after 365 days; expire stale approvals. */
  async "system.cleanup"() {
    await connectToDatabase();
    const now = Date.now();
    await JobModel.deleteMany({ status: { $in: ["done", "cancelled"] }, finishedAt: { $lt: new Date(now - 14 * 864e5) } });
    await AuditLogModel.deleteMany({ at: { $lt: new Date(now - 365 * 864e5) } });
    const expired = await ApprovalModel.updateMany({ status: "pending", type: "recommendation", createdAt: { $lt: new Date(now - 30 * 864e5) } }, { $set: { status: "expired" } });
    return `expired ${expired.modifiedCount} old recommendations`;
  },
};

/** Recurring jobs the tick schedules (one per time bucket, deduplicated). */
export const RECURRING: { type: string; everyMinutes: number }[] = [{ type: "system.cleanup", everyMinutes: 24 * 60 }];
