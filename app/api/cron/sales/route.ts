import { after } from "next/server";
import { canRunInBackground } from "@/lib/ai/blog-writer";
import { buildDailySummary, processDueSequences } from "@/lib/sales/engine";
import { syncInboundLeads } from "@/lib/sales/leads";
import { getSalesSettings } from "@/lib/sales/settings";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Called every hour by the server crontab (see docs/aws-setup.md). Copies new website enquiries into
 * the CRM, writes/sends due sequence emails
 * and, once a day after 9 AM India time, builds the sales briefing. Protected by CRON_SECRET.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await getSalesSettings();
  const istHour = new Date(Date.now() + 5.5 * 3600 * 1000).getUTCHours();
  const summaryDue = istHour >= 9 && (!settings.summary?.at || Date.now() - Date.parse(settings.summary.at) > 20 * 3600 * 1000);

  const work = async () => {
    await syncInboundLeads().catch(() => 0);
    const result = await processDueSequences();
    if (summaryDue) await buildDailySummary();
    return result;
  };
  if (canRunInBackground()) {
    after(() => work().catch(() => {}));
    return Response.json({ started: true, summaryDue }, { status: 202 });
  }
  return Response.json({ ...(await work()), summaryDue });
}
