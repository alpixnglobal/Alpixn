import { pickAssistantProvider, runAssistantTurn } from "@/lib/assistant/engine";
import { hasContact, sanitizeLead, saveChatLead, type Transcript } from "@/lib/assistant/leads";
import { clientIp, rateLimit } from "@/lib/assistant/rate-limit";
import { estimateText } from "@/lib/pricing/estimate";
import { getCachedPricingData } from "@/lib/pricing/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** One AI turn of the website assistant. Falls back to guided mode (409) when no AI provider is configured. */
export async function POST(request: Request) {
  if (!rateLimit(`chat:${clientIp(request)}`, 40, 60 * 60 * 1000)) {
    return Response.json({ error: "Too many messages. Please try again later or contact info@alpixn.com." }, { status: 429 });
  }
  const body = (await request.json().catch(() => null)) as { sessionId?: string; transcript?: Transcript; lead?: unknown; pagePath?: string } | null;
  if (!body || !Array.isArray(body.transcript)) return Response.json({ error: "Invalid request" }, { status: 400 });
  const transcript: Transcript = body.transcript
    .slice(-40)
    .map((t) => ({ role: t?.role === "assistant" ? ("assistant" as const) : ("user" as const), text: String(t?.text ?? "").slice(0, 1500) }))
    .filter((t) => t.text);
  if (!transcript.length || transcript.length > 80) return Response.json({ error: "Invalid conversation" }, { status: 400 });

  const { catalog, assistant } = await getCachedPricingData();
  if (!assistant.enabled) return Response.json({ error: "Assistant is offline" }, { status: 503 });
  const provider = await pickAssistantProvider(assistant);
  if (!provider) return Response.json({ mode: "guided" }, { status: 409 });

  try {
    const turn = await runAssistantTurn({ provider, catalog, settings: assistant, transcript, lead: sanitizeLead(body.lead) });
    const lead = sanitizeLead(turn.lead);
    if (body.sessionId && hasContact(lead)) {
      await saveChatLead({
        sessionId: body.sessionId,
        lead,
        transcript: [...transcript, { role: "assistant", text: turn.reply }],
        estimate: turn.estimate ? estimateText(turn.estimate) : undefined,
        pagePath: body.pagePath,
        ip: clientIp(request),
      }).catch(() => {});
    }
    return Response.json({ reply: turn.reply, quickReplies: turn.quickReplies, lead, estimate: turn.estimate });
  } catch {
    // Provider error: let the widget continue with guided questions.
    return Response.json({ mode: "guided" }, { status: 409 });
  }
}
