import { canRunInBackground, generateBlogPost, startBlogPostInBackground } from "@/lib/ai/blog-writer";
import { appendAiLog, getAiSettings } from "@/lib/ai/settings";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Called once a day by a scheduler — a crontab line on the AWS server (see docs/aws-setup.md) or
 * Vercel Cron (vercel.json). Writes one article on the weekday chosen in AI Studio, at most once
 * every 6 days. Protected by CRON_SECRET. On a long-running server it answers immediately (202)
 * and writes in the background so proxy timeouts don't cut it off.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getAiSettings();
  if (!settings.autopilot.enabled) return Response.json({ skipped: "Autopilot is off" });

  const istDay = new Date(Date.now() + 5.5 * 3600 * 1000).getUTCDay();
  const force = new URL(request.url).searchParams.get("force") === "1";
  if (!force && istDay !== settings.autopilot.dayOfWeek) return Response.json({ skipped: "Not the scheduled day" });

  const lastOk = settings.log.find((l) => l.status === "ok" && l.trigger === "cron");
  if (!force && lastOk && Date.now() - Date.parse(lastOk.at) < 6 * 24 * 3600 * 1000) {
    await appendAiLog({ at: new Date().toISOString(), status: "skipped", message: "Already posted this week", trigger: "cron" }).catch(() => {});
    return Response.json({ skipped: "Already posted this week" });
  }
  if (canRunInBackground()) {
    const started = await startBlogPostInBackground({ trigger: "cron" });
    return Response.json(started, { status: started.started ? 202 : 409 });
  }
  const result = await generateBlogPost({ trigger: "cron" });
  return Response.json(result, { status: result.ok ? 200 : 500 });
}
