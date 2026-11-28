import { BILLING_LABEL, formatINR, type Billing, type PricingCatalog } from "./catalog";

export type EstimateSelection = { packageId: string; addOnIds?: string[] };

export type EstimateLine = { label: string; low: number; high: number | null; billing: Billing; note?: string };

export type Estimate = {
  lines: EstimateLine[];
  /** Totals per billing type. high = null means "and above" (custom quote). */
  totals: { billing: Billing; low: number; high: number | null }[];
  recurringNotes: string[];
};

/** Builds a price range from catalog packages and add-ons. Prices always come from the catalog, never from the AI. */
export function computeEstimate(catalog: PricingCatalog, selections: EstimateSelection[]): Estimate {
  const lines: EstimateLine[] = [];
  const recurringNotes: string[] = [];
  for (const sel of selections) {
    const cat = catalog.categories.find((c) => c.packages.some((p) => p.id === sel.packageId));
    const p = cat?.packages.find((x) => x.id === sel.packageId);
    if (!cat || !p) continue;
    if (p.priceFrom || p.priceTo) lines.push({ label: `${cat.name} — ${p.name}`, low: p.priceFrom, high: p.priceTo || null, billing: p.billing });
    else recurringNotes.push(`${p.name}: ${p.priceNote || "billed at actuals"}`);
    if (p.recurring) recurringNotes.push(`${p.name}: ${p.recurring}`);
    for (const id of sel.addOnIds ?? []) {
      const a = cat.addOns.find((x) => x.id === id);
      if (a) lines.push({ label: a.name, low: a.price, high: a.price, billing: a.billing });
    }
  }
  const totals: Estimate["totals"] = [];
  for (const line of lines) {
    let t = totals.find((x) => x.billing === line.billing);
    if (!t) totals.push((t = { billing: line.billing, low: 0, high: 0 }));
    t.low += line.low;
    t.high = t.high === null || line.high === null ? null : t.high + line.high;
  }
  const order: Billing[] = ["one-time", "monthly", "yearly", "per-user-monthly", "per-minute"];
  totals.sort((a, b) => order.indexOf(a.billing) - order.indexOf(b.billing));
  return { lines, totals, recurringNotes };
}

export function rangeLabel(low: number, high: number | null, billing: Billing) {
  const suffix = billing === "one-time" ? "" : BILLING_LABEL[billing];
  if (high === null) return `${formatINR(low)}+${suffix}`;
  if (high === low) return `${formatINR(low)}${suffix}`;
  return `${formatINR(low)} – ${formatINR(high)}${suffix}`;
}

/** Plain-text summary used in emails and the inbox. */
export function estimateText(e: Estimate) {
  return [
    ...e.lines.map((l) => `• ${l.label}: ${rangeLabel(l.low, l.high, l.billing)}`),
    ...e.totals.map((t) => `Total (${t.billing}): ${rangeLabel(t.low, t.high, t.billing)}`),
    ...e.recurringNotes.map((n) => `+ ${n}`),
  ].join("\n");
}
