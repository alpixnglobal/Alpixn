"use client";

import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { BILLING_LABEL, priceLabel, type AddOn, type Billing, type PricePackage, type PricingCatalog, type ServiceCategory } from "@/lib/pricing/catalog";

const input = "admin-input w-full rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[13px] text-fg outline-none focus:border-[#0878d1]";
const label = "mb-1 block text-[11.5px] font-medium text-fg-muted";
const BILLINGS = Object.keys(BILLING_LABEL) as Billing[];
const billingName: Record<Billing, string> = { "one-time": "One-time", monthly: "Monthly", yearly: "Yearly", "per-minute": "Per minute", "per-user-monthly": "Per user / month" };
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now().toString(36)}`;

function PackageRow({ p, onChange, onRemove }: { p: PricePackage; onChange: (p: PricePackage) => void; onRemove: () => void }) {
  return (
    <div className="rounded-xl border border-line bg-canvas p-3">
      <div className="grid gap-2 sm:grid-cols-6">
        <label className="sm:col-span-2">
          <span className={label}>Package name</span>
          <input className={input} value={p.name} onChange={(e) => onChange({ ...p, name: e.target.value })} />
        </label>
        <label>
          <span className={label}>Price from (₹)</span>
          <input className={input} type="number" min={0} value={p.priceFrom} onChange={(e) => onChange({ ...p, priceFrom: Number(e.target.value) || 0 })} />
        </label>
        <label>
          <span className={label}>Price to (₹, 0 = “and above”)</span>
          <input className={input} type="number" min={0} value={p.priceTo} onChange={(e) => onChange({ ...p, priceTo: Number(e.target.value) || 0 })} />
        </label>
        <label>
          <span className={label}>Billing</span>
          <select className={input} value={p.billing} onChange={(e) => onChange({ ...p, billing: e.target.value as Billing })}>
            {BILLINGS.map((b) => (
              <option key={b} value={b}>
                {billingName[b]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={label}>Timeline</span>
          <input className={input} value={p.timeline} onChange={(e) => onChange({ ...p, timeline: e.target.value })} />
        </label>
        <label className="sm:col-span-3">
          <span className={label}>Best for</span>
          <input className={input} value={p.bestFor} onChange={(e) => onChange({ ...p, bestFor: e.target.value })} />
        </label>
        <label className="sm:col-span-3">
          <span className={label}>Text when price is 0 (e.g. “Price on request”)</span>
          <input className={input} value={p.priceNote ?? ""} onChange={(e) => onChange({ ...p, priceNote: e.target.value })} />
        </label>
        <label className="sm:col-span-3">
          <span className={label}>Recurring cost note (optional)</span>
          <input className={input} value={p.recurring ?? ""} placeholder="e.g. ₹2,999/month platform & AI usage" onChange={(e) => onChange({ ...p, recurring: e.target.value })} />
        </label>
        <label className="sm:col-span-6">
          <span className={label}>What’s included (one per line)</span>
          <textarea className={`${input} min-h-20`} value={p.includes.join("\n")} onChange={(e) => onChange({ ...p, includes: e.target.value.split("\n") })} />
        </label>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[12px] font-semibold text-fg-muted">{priceLabel(p)}</span>
        <button type="button" onClick={onRemove} className="inline-flex items-center gap-1 text-[12px] font-semibold text-red-500">
          <Trash2 className="h-3.5 w-3.5" /> Remove package
        </button>
      </div>
    </div>
  );
}

function CategoryBlock({ cat, onChange, onRemove }: { cat: ServiceCategory; onChange: (c: ServiceCategory) => void; onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  const setPkg = (i: number, p: PricePackage) => onChange({ ...cat, packages: cat.packages.map((x, j) => (j === i ? p : x)) });
  const setAdd = (i: number, a: AddOn) => onChange({ ...cat, addOns: cat.addOns.map((x, j) => (j === i ? a : x)) });
  return (
    <div className="rounded-2xl border border-line bg-surface">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <span>
          <span className="block font-display text-[15px] font-bold text-fg">{cat.name || "New service"}</span>
          <span className="block text-[12px] text-fg-muted">
            {cat.packages.length} packages · {cat.addOns.length} add-ons{cat.packages[0] ? ` · from ${priceLabel(cat.packages[0])}` : ""}
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 text-fg-subtle transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="space-y-4 border-t border-line p-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <label>
              <span className={label}>Service name</span>
              <input className={input} value={cat.name} onChange={(e) => onChange({ ...cat, name: e.target.value })} />
            </label>
            <label>
              <span className={label}>Short line</span>
              <input className={input} value={cat.short} onChange={(e) => onChange({ ...cat, short: e.target.value })} />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Description</span>
              <input className={input} value={cat.description} onChange={(e) => onChange({ ...cat, description: e.target.value })} />
            </label>
            <label className="sm:col-span-2">
              <span className={label}>Notes shown under the packages (one per line)</span>
              <textarea className={`${input} min-h-16`} value={cat.notes.join("\n")} onChange={(e) => onChange({ ...cat, notes: e.target.value.split("\n") })} />
            </label>
          </div>

          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">Packages</p>
            {cat.packages.map((p, i) => (
              <PackageRow key={p.id} p={p} onChange={(np) => setPkg(i, np)} onRemove={() => onChange({ ...cat, packages: cat.packages.filter((_, j) => j !== i) })} />
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...cat, packages: [...cat.packages, { id: `${cat.id}-${Date.now().toString(36)}`, name: "New package", priceFrom: 0, priceTo: 0, billing: "one-time", timeline: "", bestFor: "", includes: [] }] })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[12.5px] font-semibold text-fg"
            >
              <Plus className="h-3.5 w-3.5" /> Add package
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">Add-ons</p>
            {cat.addOns.map((a, i) => (
              <div key={a.id} className="grid items-end gap-2 sm:grid-cols-[minmax(0,1fr)_140px_160px_auto]">
                <label>
                  <span className={label}>Name</span>
                  <input className={input} value={a.name} onChange={(e) => setAdd(i, { ...a, name: e.target.value })} />
                </label>
                <label>
                  <span className={label}>Price (₹)</span>
                  <input className={input} type="number" min={0} value={a.price} onChange={(e) => setAdd(i, { ...a, price: Number(e.target.value) || 0 })} />
                </label>
                <label>
                  <span className={label}>Billing</span>
                  <select className={input} value={a.billing} onChange={(e) => setAdd(i, { ...a, billing: e.target.value as Billing })}>
                    {BILLINGS.map((b) => (
                      <option key={b} value={b}>
                        {billingName[b]}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="button" aria-label="Remove add-on" onClick={() => onChange({ ...cat, addOns: cat.addOns.filter((_, j) => j !== i) })} className="mb-1 grid h-8 w-8 place-items-center rounded-lg border border-line text-red-500">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange({ ...cat, addOns: [...cat.addOns, { id: `${cat.id}-addon-${Date.now().toString(36)}`, name: "New add-on", price: 0, billing: "one-time" }] })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[12.5px] font-semibold text-fg"
            >
              <Plus className="h-3.5 w-3.5" /> Add add-on
            </button>
          </div>

          <button type="button" onClick={onRemove} className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-red-500">
            <Trash2 className="h-3.5 w-3.5" /> Remove this service
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Editable price catalog; posts the whole catalog as JSON in the `catalog` field. */
export function PricingEditor({ initial }: { initial: PricingCatalog }) {
  const [catalog, setCatalog] = useState<PricingCatalog>(initial);
  return (
    <div className="space-y-3">
      <textarea readOnly hidden name="catalog" value={JSON.stringify(catalog)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className={label}>Disclaimer shown on the pricing page</span>
          <textarea className={`${input} min-h-20`} value={catalog.disclaimer} onChange={(e) => setCatalog({ ...catalog, disclaimer: e.target.value })} />
        </label>
        <label>
          <span className={label}>Tax / currency note</span>
          <textarea className={`${input} min-h-20`} value={catalog.gstNote} onChange={(e) => setCatalog({ ...catalog, gstNote: e.target.value })} />
        </label>
      </div>
      {catalog.categories.map((cat, i) => (
        <CategoryBlock
          key={cat.id}
          cat={cat}
          onChange={(c) => setCatalog({ ...catalog, categories: catalog.categories.map((x, j) => (j === i ? c : x)) })}
          onRemove={() => setCatalog({ ...catalog, categories: catalog.categories.filter((_, j) => j !== i) })}
        />
      ))}
      <button
        type="button"
        onClick={() => {
          const name = "New service";
          setCatalog({ ...catalog, categories: [...catalog.categories, { id: `${slug(name)}-${Date.now().toString(36)}`, name, short: "", description: "", packages: [], addOns: [], notes: [] }] });
        }}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-line px-4 py-2.5 text-[13px] font-semibold text-fg"
      >
        <Plus className="h-4 w-4" /> Add a service
      </button>
    </div>
  );
}
