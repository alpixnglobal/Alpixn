import { sanitizeLead, saveChatLead, type Transcript } from "@/lib/assistant/leads";
import { clientIp, rateLimit } from "@/lib/assistant/rate-limit";
import { computeEstimate, estimateText, type EstimateSelection } from "@/lib/pricing/estimate";
import { getCachedPricingData } from "@/lib/pricing/store";

export const dynamic = "force-dynamic";

/** Saves a lead from the guided (no-AI) assistant flow. The estimate is recalculated on the server from the catalog. */
export async function POST(request: Request) {
  if (!rateLimit(`lead:${clientIp(request)}`, 20, 60 * 60 * 1000)) return Response.json({ error: "Too many requests" }, { status: 429 });
  const body = (await request.json().catch(() => null)) as { sessionId?: string; lead?: unknown; transcript?: Transcript; selections?: EstimateSelection[]; pagePath?: string } | null;
  if (!body?.sessionId) return Response.json({ error: "Invalid request" }, { status: 400 });
  const { catalog } = await getCachedPricingData();
  const selections = (Array.isArray(body.selections) ? body.selections : []).slice(0, 5).map((s) => ({ packageId: String(s?.packageId ?? ""), addOnIds: Array.isArray(s?.addOnIds) ? s.addOnIds.map(String).slice(0, 10) : [] }));
  const estimate = computeEstimate(catalog, selections);
  const transcript = (Array.isArray(body.transcript) ? body.transcript : []).map((t) => ({ role: t?.role === "assistant" ? ("assistant" as const) : ("user" as const), text: String(t?.text ?? "").slice(0, 1500) }));
  try {
    const result = await saveChatLead({ sessionId: body.sessionId, lead: sanitizeLead(body.lead), transcript, estimate: estimate.lines.length ? estimateText(estimate) : undefined, pagePath: body.pagePath });
    return Response.json(result);
  } catch {
    return Response.json({ saved: false }, { status: 503 });
  }
}
