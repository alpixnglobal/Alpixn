"use client";

import { useState } from "react";
import { AppShell, Badge, Bars, Btn, Card, DemoFrame, Field, Phone, Progress, Stat, inputCls, money } from "./kit";

/* =========================================================================
   Haven — property listing portal (UAE, AED)
   ========================================================================= */
const LISTINGS = [
  { id: 1, t: "Two-bedroom apartment with marina view", area: "Dubai Marina", type: "Apartment", beds: 2, sqft: 1240, price: 145000, mode: "Rent", hue: 200 },
  { id: 2, t: "Family villa with private garden", area: "Arabian Ranches", type: "Villa", beds: 4, sqft: 3600, price: 4250000, mode: "Buy", hue: 32 },
  { id: 3, t: "Studio close to metro station", area: "Jumeirah Lake Towers", type: "Apartment", beds: 0, sqft: 480, price: 62000, mode: "Rent", hue: 260 },
  { id: 4, t: "Three-bedroom townhouse near schools", area: "Al Reem Island, Abu Dhabi", type: "Townhouse", beds: 3, sqft: 2100, price: 2650000, mode: "Buy", hue: 150 },
  { id: 5, t: "One-bedroom serviced apartment", area: "Downtown Dubai", type: "Apartment", beds: 1, sqft: 820, price: 118000, mode: "Rent", hue: 340 },
  { id: 6, t: "Penthouse with terrace", area: "Business Bay", type: "Apartment", beds: 3, sqft: 2900, price: 6900000, mode: "Buy", hue: 45 },
];

function PropertyArt({ hue, type }: { hue: number; type: string }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`sky${hue}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 70% 82%)`} />
          <stop offset="1" stopColor={`hsl(${hue} 60% 94%)`} />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#sky${hue})`} />
      <circle cx="260" cy="40" r="18" fill="#fde68a" />
      {type === "Villa" || type === "Townhouse" ? (
        <g>
          <rect x="70" y="80" width="180" height="80" fill="#f8fafc" stroke="#cbd5e1" />
          <polygon points="60,82 160,40 260,82" fill={`hsl(${hue} 35% 45%)`} />
          <rect x="145" y="115" width="30" height="45" fill={`hsl(${hue} 30% 35%)`} />
          <rect x="90" y="100" width="34" height="26" fill="#bae6fd" />
          <rect x="196" y="100" width="34" height="26" fill="#bae6fd" />
          <rect x="0" y="158" width="320" height="22" fill="#86efac" />
        </g>
      ) : (
        <g>
          {[0, 1, 2].map((k) => (
            <rect key={k} x={70 + k * 70} y={40 + k * 18} width="56" height={140 - k * 18} fill={k === 1 ? "#f1f5f9" : "#e2e8f0"} stroke="#cbd5e1" />
          ))}
          {Array.from({ length: 18 }, (_, k) => (
            <rect key={k} x={78 + (k % 3) * 70 + (k % 2) * 18} y={52 + Math.floor(k / 3) * 20} width="14" height="10" fill="#93c5fd" opacity="0.8" />
          ))}
          <rect x="0" y="168" width="320" height="12" fill={`hsl(${hue} 40% 60%)`} opacity="0.5" />
        </g>
      )}
    </svg>
  );
}

export function HavenDemo() {
  const [mode, setMode] = useState<"Rent" | "Buy">("Rent");
  const [type, setType] = useState("Any");
  const [beds, setBeds] = useState(0);
  const [saved, setSaved] = useState<number[]>([2]);
  const list = LISTINGS.filter((l) => l.mode === mode && (type === "Any" || l.type === type) && l.beds >= beds);
  return (
    <DemoFrame accent="#b8860b">
      <div className="d-topbar flex items-center justify-between px-5 py-3">
        <span className="text-lg font-extrabold tracking-tight">
          Haven<span className="text-[#b8860b]">.</span>
          <span className="d-muted ml-2 text-xs font-medium">Homes across the UAE</span>
        </span>
        <div className="flex gap-2">
          <Badge>EN · العربية</Badge>
          <Badge tone="accent">AED</Badge>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="d-card grid gap-3 rounded-xl p-3 md:grid-cols-[auto_1fr_1fr_auto]">
          <div className="flex rounded-lg p-1 d-btn-ghost">
            {(["Rent", "Buy"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-md px-4 py-1.5 text-[13px] font-semibold ${mode === m ? "bg-[#b8860b] text-white" : ""}`}>
                {m}
              </button>
            ))}
          </div>
          <Field label="Property type">
            <select className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
              {["Any", "Apartment", "Villa", "Townhouse"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Bedrooms (min)">
            <select className={inputCls} value={beds} onChange={(e) => setBeds(Number(e.target.value))}>
              {[0, 1, 2, 3, 4].map((b) => (
                <option key={b} value={b}>
                  {b === 0 ? "Studio+" : `${b}+`}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex items-end">
            <span className="d-muted text-[12px]">{list.length} properties</span>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((l) => (
            <article key={l.id} className="d-card overflow-hidden rounded-xl">
              <div className="relative h-40">
                <PropertyArt hue={l.hue} type={l.type} />
                <button
                  type="button"
                  aria-label={saved.includes(l.id) ? "Remove from saved" : "Save property"}
                  onClick={() => setSaved((s) => (s.includes(l.id) ? s.filter((x) => x !== l.id) : [...s, l.id]))}
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[15px] text-rose-500 shadow"
                >
                  {saved.includes(l.id) ? "♥" : "♡"}
                </button>
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white">{l.type}</span>
              </div>
              <div className="p-4">
                <p className="text-lg font-bold">
                  {money(l.price, "AED", "en-AE")}
                  {l.mode === "Rent" ? <span className="d-muted text-[12px] font-medium"> /year</span> : null}
                </p>
                <p className="mt-1 text-[13px] font-semibold">{l.t}</p>
                <p className="d-muted text-[12px]">{l.area}</p>
                <p className="d-muted mt-2 text-[12px]">
                  {l.beds === 0 ? "Studio" : `${l.beds} bed`} · {l.sqft.toLocaleString("en-AE")} sq ft
                </p>
                <Btn className="mt-3 w-full" variant="ghost">
                  Request viewing
                </Btn>
              </div>
            </article>
          ))}
        </div>
      </div>
    </DemoFrame>
  );
}

/* =========================================================================
   EstateFlow — real estate CRM pipeline (Australia, AUD)
   ========================================================================= */
type Lead = { id: number; name: string; need: string; budget: number; src: string; stage: number };
const STAGES = ["New enquiry", "Qualified", "Viewing booked", "Offer made", "Settled"];
const LEADS: Lead[] = [
  { id: 1, name: "Olivia & Ben Carter", need: "3 bed house, Brunswick", budget: 1150000, src: "Portal", stage: 0 },
  { id: 2, name: "Priya Nair", need: "2 bed apartment, Southbank", budget: 720000, src: "Website", stage: 1 },
  { id: 3, name: "Tom Walsh", need: "Investment unit, Footscray", budget: 540000, src: "Referral", stage: 2 },
  { id: 4, name: "Grace Lim", need: "Townhouse, Box Hill", budget: 980000, src: "Open home", stage: 3 },
  { id: 5, name: "Daniel Russo", need: "Family home, Coburg", budget: 1320000, src: "Portal", stage: 1 },
  { id: 6, name: "Hannah Kelly", need: "1 bed apartment, CBD", budget: 480000, src: "Website", stage: 4 },
];

export function EstateFlowDemo() {
  const [tab, setTab] = useState("pipeline");
  const [leads, setLeads] = useState(LEADS);
  const move = (id: number, dir: number) => setLeads((l) => l.map((x) => (x.id === id ? { ...x, stage: Math.max(0, Math.min(4, x.stage + dir)) } : x)));
  const value = leads.filter((l) => l.stage >= 3).reduce((s, l) => s + l.budget, 0);
  return (
    <DemoFrame accent="#0e7490">
      <AppShell
        brand="EstateFlow"
        logo="⌂"
        user="Sophie Martin"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "pipeline", label: "Pipeline" },
          { id: "listings", label: "Listings" },
          { id: "inspections", label: "Inspections" },
          { id: "reports", label: "Reports" },
        ]}
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="d-muted text-[12px]">Harbourline Realty · Melbourne office</p>
            <h3 className="text-xl font-bold">Buyer pipeline</h3>
          </div>
          <Btn>+ Add lead</Btn>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Active leads" value={leads.filter((l) => l.stage < 4).length} />
          <Stat label="Inspections this week" value={9} />
          <Stat label="Offers in progress" value={leads.filter((l) => l.stage === 3).length} />
          <Stat label="Pipeline value (offer+)" value={money(value, "AUD", "en-AU")} />
        </div>
        <div className="mt-4 grid gap-3 overflow-x-auto pb-2 lg:grid-cols-5" style={{ gridAutoColumns: "minmax(210px,1fr)" }}>
          {STAGES.map((s, si) => (
            <div key={s} className="d-card min-w-[210px] rounded-xl p-3">
              <p className="mb-2 flex items-center justify-between text-[12px] font-semibold">
                {s} <Badge>{leads.filter((l) => l.stage === si).length}</Badge>
              </p>
              <div className="space-y-2">
                {leads
                  .filter((l) => l.stage === si)
                  .map((l) => (
                    <div key={l.id} className="rounded-lg border border-black/5 bg-black/[0.02] p-2.5 text-[12px]">
                      <p className="font-semibold">{l.name}</p>
                      <p className="d-muted">{l.need}</p>
                      <p className="mt-1 font-semibold">{money(l.budget, "AUD", "en-AU")}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge tone="accent">{l.src}</Badge>
                        <span className="flex gap-1">
                          <button type="button" aria-label="Move back" disabled={si === 0} onClick={() => move(l.id, -1)} className="d-btn-ghost h-6 w-6 rounded disabled:opacity-30">
                            ‹
                          </button>
                          <button type="button" aria-label="Move forward" disabled={si === 4} onClick={() => move(l.id, 1)} className="d-btn-ghost h-6 w-6 rounded disabled:opacity-30">
                            ›
                          </button>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </AppShell>
    </DemoFrame>
  );
}

/* =========================================================================
   Fabrica — production tracking & OEE (Italy, EUR)
   ========================================================================= */
const LINES = [
  { id: "L1", name: "Linea 1 · Stampaggio", product: "Staffa acciaio A-220", target: 1200, done: 914, avail: 92, perf: 88, qual: 98.5, state: "Running" },
  { id: "L2", name: "Linea 2 · Assemblaggio", product: "Gruppo valvola V-40", target: 600, done: 402, avail: 81, perf: 91, qual: 97.2, state: "Changeover" },
  { id: "L3", name: "Linea 3 · Verniciatura", product: "Carter C-12", target: 900, done: 655, avail: 95, perf: 84, qual: 99.1, state: "Running" },
];
const DOWNTIME = [
  ["Cambio formato", 42],
  ["Attesa materiale", 26],
  ["Guasto pressa", 18],
  ["Pulizia programmata", 12],
];

export function FabricaDemo() {
  const [tab, setTab] = useState("lines");
  const [sel, setSel] = useState(LINES[0]);
  const oee = (l: (typeof LINES)[number]) => Math.round((l.avail / 100) * (l.perf / 100) * (l.qual / 100) * 1000) / 10;
  return (
    <DemoFrame accent="#c2410c">
      <AppShell
        brand="Fabrica"
        logo="⚙"
        user="Luca Bianchi"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "lines", label: "Linee / Lines" },
          { id: "orders", label: "Ordini / Orders" },
          { id: "quality", label: "Qualità / Quality" },
          { id: "maint", label: "Manutenzione" },
        ]}
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="d-muted text-[12px]">Stabilimento di Brescia · Turno 2 (14:00–22:00)</p>
            <h3 className="text-xl font-bold">Production overview</h3>
          </div>
          <Badge tone="accent">IT / EN</Badge>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {LINES.map((l) => (
            <button key={l.id} type="button" onClick={() => setSel(l)} className={`d-card rounded-xl p-4 text-left ${sel.id === l.id ? "ring-2 ring-[#c2410c]" : ""}`}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold">{l.name}</span>
                <Badge tone={l.state === "Running" ? "good" : "warn"}>{l.state}</Badge>
              </div>
              <p className="d-muted mt-1 text-[12px]">{l.product}</p>
              <p className="mt-3 text-2xl font-bold">{oee(l)}% <span className="d-muted text-[11px] font-medium">OEE</span></p>
              <Progress value={(l.done / l.target) * 100} className="mt-2" />
              <p className="d-muted mt-1 text-[11px]">
                {l.done.toLocaleString("it-IT")} / {l.target.toLocaleString("it-IT")} pezzi
              </p>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card title={`${sel.name} — output per hour`}>
            <Bars data={[138, 151, 147, 112, 98, 156, 160, 149]} labels={["14", "15", "16", "17", "18", "19", "20", "21"]} />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px]">
              {[
                ["Disponibilità", sel.avail],
                ["Prestazioni", sel.perf],
                ["Qualità", sel.qual],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-lg bg-black/[0.03] p-2">
                  <p className="d-muted">{k}</p>
                  <p className="text-base font-bold">{v}%</p>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Fermi macchina (min) · Downtime reasons">
            {DOWNTIME.map(([r, m]) => (
              <div key={r as string} className="mb-3">
                <div className="mb-1 flex justify-between text-[12px]">
                  <span>{r}</span>
                  <span className="d-muted">{m} min</span>
                </div>
                <Progress value={((m as number) / 42) * 100} />
              </div>
            ))}
            <p className="d-muted text-[11px]">Costo stimato fermi turno: {money(1860, "EUR", "it-IT")} (demo)</p>
          </Card>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

/* =========================================================================
   VisionQC — computer vision inspection review (USA)
   ========================================================================= */
type Insp = { id: string; part: string; defect: string | null; conf: number; box?: [number, number, number, number]; verdict?: "accept" | "reject" };
const INSPECTIONS: Insp[] = [
  { id: "IMG-20931", part: "Bracket 7B", defect: "Scratch", conf: 0.71, box: [120, 60, 70, 26] },
  { id: "IMG-20932", part: "Bracket 7B", defect: null, conf: 0.97 },
  { id: "IMG-20933", part: "Housing H2", defect: "Dent", conf: 0.64, box: [60, 90, 46, 40] },
  { id: "IMG-20934", part: "Housing H2", defect: "Porosity", conf: 0.58, box: [170, 40, 34, 34] },
  { id: "IMG-20935", part: "Bracket 7B", defect: null, conf: 0.94 },
];

function PartImage({ insp }: { insp: Insp }) {
  const housing = insp.part.startsWith("Housing");
  return (
    <svg viewBox="0 0 280 180" className="h-full w-full" aria-label={`Inspection image ${insp.id}`}>
      <rect width="280" height="180" fill="#1a2233" />
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9d2de" />
          <stop offset="0.5" stopColor="#8d99ab" />
          <stop offset="1" stopColor="#b7c1cf" />
        </linearGradient>
      </defs>
      {housing ? <rect x="40" y="30" width="200" height="120" rx="26" fill="url(#metal)" /> : <path d="M40 120 L40 50 L110 50 L110 95 L240 95 L240 130 L40 130 Z" fill="url(#metal)" />}
      <circle cx={housing ? 90 : 70} cy={housing ? 90 : 80} r="10" fill="#1a2233" />
      {insp.box ? (
        <g>
          <rect x={insp.box[0]} y={insp.box[1]} width={insp.box[2]} height={insp.box[3]} fill="none" stroke="#f43f5e" strokeWidth="2.5" />
          <text x={insp.box[0]} y={insp.box[1] - 5} fill="#f43f5e" fontSize="11" fontFamily="monospace">
            {insp.defect} {Math.round(insp.conf * 100)}%
          </text>
          {insp.defect === "Scratch" ? <line x1={insp.box[0] + 6} y1={insp.box[1] + 18} x2={insp.box[0] + 64} y2={insp.box[1] + 8} stroke="#3b4658" strokeWidth="2" /> : null}
          {insp.defect === "Dent" ? <ellipse cx={insp.box[0] + 23} cy={insp.box[1] + 20} rx="15" ry="12" fill="#7d889a" /> : null}
          {insp.defect === "Porosity" ? [0, 1, 2, 3].map((k) => <circle key={k} cx={insp.box![0] + 8 + (k % 2) * 16} cy={insp.box![1] + 10 + Math.floor(k / 2) * 14} r="3" fill="#3b4658" />) : null}
        </g>
      ) : null}
    </svg>
  );
}

export function VisionQCDemo() {
  const [tab, setTab] = useState("review");
  const [items, setItems] = useState(INSPECTIONS);
  const [cur, setCur] = useState(0);
  const flagged = items.filter((i) => i.defect);
  const it = items[cur];
  const decide = (v: "accept" | "reject") => {
    setItems((a) => a.map((x, k) => (k === cur ? { ...x, verdict: v } : x)));
    setCur((c) => Math.min(items.length - 1, c + 1));
  };
  return (
    <DemoFrame accent="#e11d48" dark>
      <AppShell
        brand="VisionQC"
        logo="◎"
        user="QA Lead"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "review", label: "Review queue" },
          { id: "stations", label: "Camera stations" },
          { id: "models", label: "Models" },
          { id: "trends", label: "Defect trends" },
        ]}
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="d-muted text-[12px]">Plant 3 · Station CAM-04 · Ohio</p>
            <h3 className="text-xl font-bold">Inspection review</h3>
          </div>
          <Badge tone="accent">Model v3.2 · threshold 0.80</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Parts inspected (shift)" value="3,482" />
          <Stat label="Auto-passed" value="96.1%" />
          <Stat label="Sent to review" value={flagged.length} />
          <Stat label="Confirmed defects" value={items.filter((i) => i.verdict === "reject").length} />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Card title={`${it.id} · ${it.part}`} action={it.verdict ? <Badge tone={it.verdict === "accept" ? "good" : "bad"}>{it.verdict === "accept" ? "Accepted" : "Rejected"}</Badge> : <Badge tone="warn">Awaiting decision</Badge>}>
            <div className="aspect-[14/9] overflow-hidden rounded-lg">
              <PartImage insp={it} />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[12px]">
              <span className="d-muted">
                Model output: {it.defect ? `${it.defect} (${Math.round(it.conf * 100)}% confidence)` : `No defect (${Math.round(it.conf * 100)}%)`}
              </span>
              <span className="flex gap-2">
                <Btn variant="ghost" onClick={() => decide("accept")}>
                  Accept part
                </Btn>
                <Btn onClick={() => decide("reject")}>Reject part</Btn>
              </span>
            </div>
          </Card>
          <Card title="Queue">
            <ul className="space-y-1.5">
              {items.map((x, k) => (
                <li key={x.id}>
                  <button type="button" onClick={() => setCur(k)} className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-[12px] ${k === cur ? "bg-white/5 ring-1 ring-[#e11d48]" : ""}`}>
                    <span>
                      {x.id} <span className="d-muted">· {x.part}</span>
                    </span>
                    <Badge tone={x.verdict === "reject" ? "bad" : x.verdict === "accept" ? "good" : x.defect ? "warn" : "neutral"}>{x.verdict ?? (x.defect ?? "OK")}</Badge>
                  </button>
                </li>
              ))}
            </ul>
            <p className="d-muted mt-3 text-[11px]">Reviewer decisions are stored as labels for the next training cycle.</p>
          </Card>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

/* =========================================================================
   CargoTrace — multi-carrier shipment tracking (South Africa, ZAR)
   ========================================================================= */
const SHIPMENTS: Record<string, { from: string; to: string; carrier: string; eta: string; value: number; events: [string, string, string][] }> = {
  "CT-JHB-48213": {
    from: "Johannesburg (Kempton Park DC)",
    to: "Cape Town, Western Cape",
    carrier: "Road freight · Linehaul",
    eta: "Thu, 14:00–17:00",
    value: 18450,
    events: [
      ["Order received", "Mon 09:12", "Johannesburg"],
      ["Picked & packed", "Mon 15:40", "Kempton Park DC"],
      ["Departed hub", "Tue 06:05", "Kempton Park"],
      ["In transit", "Wed 11:30", "Bloemfontein"],
      ["Out for delivery", "—", "Cape Town"],
    ],
  },
  "CT-DUR-77102": {
    from: "Durban Port",
    to: "Pretoria, Gauteng",
    carrier: "Container · Rail + road",
    eta: "Fri, by 12:00",
    value: 96200,
    events: [
      ["Container released", "Mon 10:00", "Durban Port"],
      ["Customs cleared", "Tue 08:20", "Durban"],
      ["Rail departure", "Tue 22:15", "Durban"],
      ["Arrived inland terminal", "—", "City Deep"],
      ["Delivered", "—", "Pretoria"],
    ],
  },
};

export function CargoTraceDemo() {
  const [q, setQ] = useState("CT-JHB-48213");
  const [id, setId] = useState("CT-JHB-48213");
  const s = SHIPMENTS[id];
  const reached = s.events.filter((e) => e[1] !== "—").length;
  return (
    <DemoFrame accent="#16a34a">
      <div className="d-topbar flex items-center justify-between px-5 py-3">
        <span className="font-extrabold tracking-tight">
          CargoTrace <span className="d-muted text-xs font-medium">· Shipment visibility</span>
        </span>
        <Badge tone="accent">ZAR · SAST</Badge>
      </div>
      <div className="p-4 md:p-6">
        <form
          className="d-card flex flex-col gap-2 rounded-xl p-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (SHIPMENTS[q.trim().toUpperCase()]) setId(q.trim().toUpperCase());
          }}
        >
          <input className={inputCls} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Tracking number" placeholder="Enter tracking number" />
          <Btn type="submit">Track shipment</Btn>
          <span className="d-muted self-center whitespace-nowrap text-[11px]">Try CT-DUR-77102</span>
        </form>
        {!SHIPMENTS[q.trim().toUpperCase()] && q ? <p className="mt-2 text-[12px] text-rose-600">No shipment found for that number (demo data).</p> : null}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card title={id} action={<Badge tone="good">On schedule</Badge>}>
            <div className="grid gap-2 text-[13px] sm:grid-cols-2">
              <p>
                <span className="d-muted block text-[11px]">From</span>
                {s.from}
              </p>
              <p>
                <span className="d-muted block text-[11px]">To</span>
                {s.to}
              </p>
              <p>
                <span className="d-muted block text-[11px]">Mode</span>
                {s.carrier}
              </p>
              <p>
                <span className="d-muted block text-[11px]">Estimated delivery</span>
                <b>{s.eta}</b>
              </p>
            </div>
            <Progress value={(reached / s.events.length) * 100} className="mt-4" />
            <ol className="mt-4 space-y-3">
              {s.events.map(([label, time, place], k) => (
                <li key={label} className="flex gap-3 text-[13px]">
                  <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${k < reached ? "bg-[#16a34a] text-white" : "d-badge"}`}>{k < reached ? "✓" : ""}</span>
                  <span className="flex-1">
                    <span className="font-semibold">{label}</span>
                    <span className="d-muted block text-[12px]">
                      {place} · {time}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <div className="space-y-4">
            <Card title="Route progress">
              <svg viewBox="0 0 300 150" className="w-full" aria-hidden>
                <path d="M40 40 C 110 60, 160 40, 260 120" fill="none" stroke="#d0d5dd" strokeWidth="6" strokeLinecap="round" />
                <path d="M40 40 C 110 60, 160 40, 260 120" fill="none" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" strokeDasharray="400" strokeDashoffset={400 - (reached / s.events.length) * 340} />
                <circle cx="40" cy="40" r="8" fill="#16a34a" />
                <circle cx="260" cy="120" r="8" fill="#101828" />
              </svg>
            </Card>
            <Card title="Shipment details">
              <ul className="space-y-1.5 text-[13px]">
                <li className="flex justify-between">
                  <span className="d-muted">Declared value</span>
                  {money(s.value, "ZAR", "en-ZA")}
                </li>
                <li className="flex justify-between">
                  <span className="d-muted">Proof of delivery</span>Photo + signature
                </li>
                <li className="flex justify-between">
                  <span className="d-muted">Notifications</span>SMS & email
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}

/* =========================================================================
   RoutePilot — delivery driver mobile app (Australia)
   ========================================================================= */
const STOPS = [
  { id: 1, name: "Kensington Pharmacy", addr: "212 Racecourse Rd, Flemington VIC", items: 3, win: "09:00–10:00" },
  { id: 2, name: "M. Ahmed (residential)", addr: "17/45 Union Rd, Ascot Vale VIC", items: 1, win: "09:30–11:00" },
  { id: 3, name: "Moonee Ponds Bakery", addr: "8 Puckle St, Moonee Ponds VIC", items: 6, win: "10:00–12:00" },
  { id: 4, name: "Essendon Physio", addr: "1020 Mt Alexander Rd, Essendon VIC", items: 2, win: "11:00–13:00" },
];

export function RoutePilotDemo() {
  const [done, setDone] = useState<Record<number, "delivered" | "failed">>({ 1: "delivered" });
  const [open, setOpen] = useState(2);
  const [signed, setSigned] = useState(false);
  const pending = STOPS.filter((s) => !done[s.id]);
  const stop = STOPS.find((s) => s.id === open) ?? STOPS[0];
  return (
    <DemoFrame accent="#7c3aed" className="!border-0 !bg-transparent !shadow-none">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <Phone label="RoutePilot driver app">
          <div className="demo-light min-h-[680px] bg-[#f5f7fb] text-[#101828]">
            <div className="bg-[#7c3aed] px-5 pb-5 pt-10 text-white">
              <p className="text-[12px] opacity-80">Route MEL-N-04 · Thu</p>
              <p className="text-xl font-bold">
                {STOPS.length - pending.length} of {STOPS.length} stops done
              </p>
              <div className="mt-3 h-2 rounded-full bg-white/25">
                <div className="h-full rounded-full bg-white" style={{ width: `${((STOPS.length - pending.length) / STOPS.length) * 100}%` }} />
              </div>
            </div>
            <ul className="space-y-2 p-3">
              {STOPS.map((s, k) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(s.id);
                      setSigned(false);
                    }}
                    className={`d-card flex w-full items-start gap-3 rounded-xl p-3 text-left ${open === s.id ? "ring-2 ring-[#7c3aed]" : ""}`}
                  >
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-bold ${done[s.id] === "delivered" ? "bg-emerald-500 text-white" : done[s.id] === "failed" ? "bg-rose-500 text-white" : "bg-[#7c3aed]/12 text-[#7c3aed]"}`}>
                      {done[s.id] === "delivered" ? "✓" : done[s.id] === "failed" ? "!" : k + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold">{s.name}</span>
                      <span className="d-muted block truncate text-[12px]">{s.addr}</span>
                      <span className="d-muted block text-[11px]">
                        {s.items} items · {s.win}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Phone>
        <Card title={`Stop: ${stop.name}`} action={<Badge tone="accent">{stop.win}</Badge>}>
          <p className="d-muted text-[13px]">{stop.addr}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Btn variant="ghost">Navigate</Btn>
            <Btn variant="ghost">Call customer</Btn>
          </div>
          <div className="mt-4">
            <p className="text-[12px] font-semibold">Proof of delivery</p>
            <button type="button" onClick={() => setSigned(true)} className="mt-2 grid h-28 w-full place-items-center rounded-xl border-2 border-dashed border-[#7c3aed]/40 text-[13px]">
              {signed ? (
                <svg viewBox="0 0 200 60" className="h-16" aria-label="Signature captured">
                  <path d="M10 40 C 30 10, 40 55, 60 30 S 90 10, 100 40 S 140 50, 150 20 S 180 35, 190 30" fill="none" stroke="#101828" strokeWidth="2.5" />
                </svg>
              ) : (
                <span className="d-muted">Tap to capture signature</span>
              )}
            </button>
            <p className="d-muted mt-2 text-[11px]">Photo, signature, GPS position and timestamp are uploaded when signal is available (offline queue).</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Btn className="flex-1" disabled={!signed || !!done[stop.id]} onClick={() => setDone((d) => ({ ...d, [stop.id]: "delivered" }))}>
              Mark delivered
            </Btn>
            <Btn variant="ghost" disabled={!!done[stop.id]} onClick={() => setDone((d) => ({ ...d, [stop.id]: "failed" }))}>
              Unable to deliver
            </Btn>
          </div>
        </Card>
      </div>
    </DemoFrame>
  );
}

