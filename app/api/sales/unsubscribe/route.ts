import { connectToDatabase } from "@/lib/db";
import { SalesLeadModel } from "@/lib/models";
import { addTimeline } from "@/lib/sales/leads";
import { unsubscribeToken } from "@/lib/sales/mailer";

export const dynamic = "force-dynamic";

const page = (title: string, text: string) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head><body style="font-family:Arial,sans-serif;background:#f6f8fc;color:#0d1526;display:grid;place-items:center;min-height:100vh;margin:0"><main style="max-width:420px;padding:32px;background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(7,26,51,.12);text-align:center"><h1 style="font-size:20px">${title}</h1><p style="color:#4f5868;line-height:1.6">${text}</p><p><a href="/" style="color:#0878d1">alpixn.com</a></p></main></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );

async function unsubscribe(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("l") ?? "";
  const token = url.searchParams.get("t") ?? "";
  if (!/^[a-f0-9]{24}$/.test(id) || token !== unsubscribeToken(id)) return page("Link not valid", "This unsubscribe link is not valid. Reply to the email and we will remove you.");
  await connectToDatabase();
  const res = await SalesLeadModel.updateOne({ _id: id }, { $set: { unsubscribed: true, "sequence.status": "stopped", "sequence.nextSendAt": null } });
  if (res.matchedCount) await addTimeline(id, { type: "system", text: "Unsubscribed from emails", by: "lead" });
  return page("You're unsubscribed", "You won't receive any more sales emails from ALPIXN. Sorry for the interruption.");
}

export const GET = unsubscribe;
/** One-click unsubscribe (RFC 8058) from email clients. */
export const POST = unsubscribe;
