import { connectToDatabase } from "@/lib/db";
import { AuditLogModel } from "./models";

/** Records who did what. Never throws — logging must not break the action itself. */
export async function audit(actor: string, action: string, target = "", details: Record<string, unknown> = {}, ip = "") {
  try {
    await connectToDatabase();
    // Never store secrets in the log.
    const clean = JSON.parse(JSON.stringify(details, (k, v) => (/token|secret|password|apikey|api_key/i.test(k) ? "[redacted]" : v)));
    await AuditLogModel.create({ at: new Date(), actor, action, target, details: clean, ip });
  } catch {
    /* ignore */
  }
}
