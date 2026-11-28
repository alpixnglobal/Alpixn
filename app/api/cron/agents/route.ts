import { after } from "next/server";
import { canRunInBackground } from "@/lib/ai/blog-writer";
import { JOB_HANDLERS, RECURRING } from "@/lib/growth/handlers";
import { enqueue, runDueJobs } from "@/lib/growth/jobs";
import { getGrowthSettings } from "@/lib/growth/settings";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * The AI agents' heartbeat, called every 5 minutes by the server crontab (docs/aws-setup.md).
 * Schedules recurring work and runs due jobs from the queue (locked, retried with backoff).
 * Protected by CRON_SECRET. When all agents are paused, only housekeeping runs.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const work = async () => {
    const settings = await getGrowthSettings();
    const now = Date.now();
    for (const r of RECURRING) {
      const bucket = Math.floor(now / (r.everyMinutes * 60e3));
      await enqueue(r.type, {}, { dedupeKey: `${r.type}:${bucket}`, maxAttempts: 3 });
    }
    const handlers = settings.globalPaused ? { "system.cleanup": JOB_HANDLERS["system.cleanup"] } : JOB_HANDLERS;
    return runDueJobs(handlers, { limit: 100, timeBudgetMs: 240e3 });
  };

  if (canRunInBackground()) {
    after(() => work().catch(() => {}));
    return Response.json({ started: true }, { status: 202 });
  }
  return Response.json(await work());
}
