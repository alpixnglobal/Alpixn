"use client";

import { useMemo, useState } from "react";
import { AppShell, Badge, Bars, Btn, Card, DemoFrame, Field, Line, Progress, Stat, Table, inputCls, money } from "./kit";

/* =========================================================================
   Siam Craft — e-commerce storefront (Thailand, THB)
   ========================================================================= */
const PRODUCTS = [
  { id: 1, name: "Hand-woven silk scarf", cat: "Textiles", price: 1290, hue: 330 },
  { id: 2, name: "Celadon tea set (4 cups)", cat: "Ceramics", price: 2450, hue: 160 },
  { id: 3, name: "Teak serving board", cat: "Home", price: 890, hue: 30 },
  { id: 4, name: "Indigo cotton cushion cover", cat: "Textiles", price: 650, hue: 225 },
  { id: 5, name: "Benjarong trinket bowl", cat: "Ceramics", price: 1750, hue: 45 },
  { id: 6, name: "Rattan storage basket", cat: "Home", price: 990, hue: 40 },
];

function ProductArt({ hue, cat }: { hue: number; cat: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <rect width="200" height="200" fill={`hsl(${hue} 45% 94%)`} />
      {cat === "Textiles" ? (
        <g>
          {Array.from({ length: 7 }, (_, k) => (
            <path key={k} d={`M30 ${50 + k * 15} Q100 ${35 + k * 15} 170 ${50 + k * 15}`} stroke={`hsl(${hue} 55% ${40 + k * 4}%)`} strokeWidth="9" fill="none" />
          ))}
        </g>
      ) : cat === "Ceramics" ? (
        <g>
          <ellipse cx="100" cy="150" rx="55" ry="10" fill="#0001" />
          <path d="M55 80 Q55 150 100 150 Q145 150 145 80 Z" fill={`hsl(${hue} 40% 60%)`} />
          <ellipse cx="100" cy="80" rx="45" ry="10" fill={`hsl(${hue} 40% 72%)`} />
          <path d="M70 105 Q100 120 130 105" stroke="#fff8" strokeWidth="3" fill="none" />
        </g>
      ) : (
        <g>
          <rect x="45" y="70" width="110" height="80" rx="10" fill={`hsl(${hue} 45% 55%)`} />
          {Array.from({ length: 5 }, (_, k) => (
            <line key={k} x1="45" y1={84 + k * 14} x2="155" y2={84 + k * 14} stroke="#0002" strokeWidth="3" />
          ))}
        </g>
      )}
    </svg>
  );
}

export function SiamCraftDemo() {
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({ 2: 1 });
  const [lang, setLang] = useState<"EN" | "TH">("EN");
  const items = Object.entries(cart).filter(([, q]) => q > 0);
  const subtotal = items.reduce((s, [id, q]) => s + (PRODUCTS.find((p) => p.id === Number(id))?.price ?? 0) * q, 0);
  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 80;
  const add = (id: number, d: number) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));
  return (
    <DemoFrame accent="#be185d">
      <div className="d-topbar flex items-center justify-between px-5 py-3">
        <span className="font-serif text-xl font-bold italic">Siam Craft</span>
        <div className="flex items-center gap-2 text-[12px]">
          <button type="button" onClick={() => setLang(lang === "EN" ? "TH" : "EN")} className="d-btn-ghost rounded-md px-2 py-1 font-semibold">
            {lang === "EN" ? "EN · ไทย" : "ไทย · EN"}
          </button>
          <Badge tone="accent">🛒 {items.reduce((s, [, q]) => s + q, 0)}</Badge>
        </div>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[1fr_280px] md:p-6">
        <div>
          <div className="rounded-xl bg-[#be185d] p-5 text-white">
            <p className="text-[12px] uppercase tracking-widest opacity-80">{lang === "EN" ? "Made by artisans in Chiang Mai" : "งานฝีมือจากเชียงใหม่"}</p>
            <p className="mt-1 text-xl font-bold">{lang === "EN" ? "Free delivery across Thailand over ฿2,000" : "ส่งฟรีทั่วไทยเมื่อซื้อครบ ฿2,000"}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["All", "Textiles", "Ceramics", "Home"].map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} className={`rounded-full px-3 py-1 text-[12px] font-semibold ${cat === c ? "bg-[#be185d] text-white" : "d-btn-ghost"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {PRODUCTS.filter((p) => cat === "All" || p.cat === cat).map((p) => (
              <article key={p.id} className="d-card overflow-hidden rounded-xl">
                <div className="aspect-square">
                  <ProductArt hue={p.hue} cat={p.cat} />
                </div>
                <div className="p-3">
                  <p className="text-[13px] font-semibold">{p.name}</p>
                  <p className="d-muted text-[11px]">{p.cat}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold">{money(p.price, "THB", "th-TH")}</span>
                    <Btn onClick={() => add(p.id, 1)}>Add</Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <Card title="Your basket">
          {items.length ? (
            <ul className="space-y-3">
              {items.map(([id, q]) => {
                const p = PRODUCTS.find((x) => x.id === Number(id))!;
                return (
                  <li key={id} className="flex items-center justify-between gap-2 text-[12.5px]">
                    <span className="min-w-0 flex-1 truncate">{p.name}</span>
                    <span className="flex items-center gap-1">
                      <button type="button" aria-label="Decrease" onClick={() => add(p.id, -1)} className="d-btn-ghost h-6 w-6 rounded">
                        −
                      </button>
                      <span className="w-5 text-center">{q}</span>
                      <button type="button" aria-label="Increase" onClick={() => add(p.id, 1)} className="d-btn-ghost h-6 w-6 rounded">
                        +
                      </button>
                    </span>
                    <span className="w-16 text-right font-semibold">{money(p.price * q, "THB", "th-TH")}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="d-muted text-[13px]">Your basket is empty.</p>
          )}
          <div className="mt-4 space-y-1 border-t border-black/5 pt-3 text-[13px]">
            <p className="flex justify-between">
              <span className="d-muted">Subtotal</span>
              {money(subtotal, "THB", "th-TH")}
            </p>
            <p className="flex justify-between">
              <span className="d-muted">Shipping</span>
              {shipping ? money(shipping, "THB", "th-TH") : "Free"}
            </p>
            <p className="flex justify-between text-base font-bold">
              <span>Total</span>
              {money(subtotal + shipping, "THB", "th-TH")}
            </p>
          </div>
          <p className="d-muted mt-3 text-[11px]">Payment options shown: PromptPay QR, cards, cash on delivery (simulated).</p>
          <Btn className="mt-3 w-full" disabled={!items.length}>
            Checkout
          </Btn>
        </Card>
      </div>
    </DemoFrame>
  );
}

/* =========================================================================
   Ledgerly — invoicing SaaS (USA, USD)
   ========================================================================= */
type Inv = { no: string; client: string; issued: string; due: string; amount: number; status: "Paid" | "Sent" | "Overdue" | "Draft" };
const INVOICES: Inv[] = [
  { no: "INV-1042", client: "Northwind Dental Group", issued: "Nov 03", due: "Dec 03", amount: 4800, status: "Sent" },
  { no: "INV-1041", client: "Bluebird Logistics LLC", issued: "Oct 28", due: "Nov 27", amount: 12650, status: "Paid" },
  { no: "INV-1040", client: "Cedar & Pine Interiors", issued: "Oct 15", due: "Nov 14", amount: 2300, status: "Overdue" },
  { no: "INV-1039", client: "Summit Fitness Studios", issued: "Oct 10", due: "Nov 09", amount: 1980, status: "Paid" },
];

export function LedgerlyDemo() {
  const [tab, setTab] = useState("invoices");
  const [invoices, setInvoices] = useState(INVOICES);
  const [lines, setLines] = useState([
    { d: "Website maintenance (November)", q: 1, r: 1200 },
    { d: "Support hours", q: 6, r: 95 },
  ]);
  const [client, setClient] = useState("Harbor View Bakery");
  const subtotal = lines.reduce((s, l) => s + l.q * l.r, 0);
  const tax = Math.round(subtotal * 0.0725 * 100) / 100;
  const out = invoices.filter((i) => i.status !== "Paid" && i.status !== "Draft").reduce((s, i) => s + i.amount, 0);
  const tone = (s: Inv["status"]) => (s === "Paid" ? "good" : s === "Overdue" ? "bad" : s === "Draft" ? "neutral" : "accent");
  return (
    <DemoFrame accent="#4f46e5">
      <AppShell
        brand="Ledgerly"
        logo="L"
        user="Alex Rivera"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "dash", label: "Overview" },
          { id: "invoices", label: "Invoices" },
          { id: "clients", label: "Clients" },
          { id: "payments", label: "Payments" },
        ]}
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Outstanding" value={money(out, "USD", "en-US")} />
          <Stat label="Overdue" value={money(invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0), "USD", "en-US")} tone="down" delta="1 invoice" />
          <Stat label="Paid (30 days)" value={money(14630, "USD", "en-US")} tone="up" delta="2 invoices" />
          <Stat label="Avg. days to pay" value="18" />
        </div>
        <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
          <Card title="Recent invoices">
            <Table
              head={["Invoice", "Client", "Due", "Amount", "Status"]}
              rows={invoices.map((i) => [<b key="n">{i.no}</b>, i.client, i.due, money(i.amount, "USD", "en-US"), <Badge key="s" tone={tone(i.status) as "good"}>{i.status}</Badge>])}
            />
          </Card>
          <Card title="New invoice" action={<Badge>Draft</Badge>}>
            <Field label="Bill to">
              <input className={inputCls} value={client} onChange={(e) => setClient(e.target.value)} />
            </Field>
            <div className="mt-3 space-y-2">
              {lines.map((l, k) => (
                <div key={k} className="grid grid-cols-[1fr_52px_80px] gap-2">
                  <input aria-label="Description" className={inputCls} value={l.d} onChange={(e) => setLines((ls) => ls.map((x, j) => (j === k ? { ...x, d: e.target.value } : x)))} />
                  <input aria-label="Quantity" type="number" min={0} className={inputCls} value={l.q} onChange={(e) => setLines((ls) => ls.map((x, j) => (j === k ? { ...x, q: Number(e.target.value) } : x)))} />
                  <input aria-label="Rate" type="number" min={0} className={inputCls} value={l.r} onChange={(e) => setLines((ls) => ls.map((x, j) => (j === k ? { ...x, r: Number(e.target.value) } : x)))} />
                </div>
              ))}
              <button type="button" onClick={() => setLines((ls) => [...ls, { d: "New item", q: 1, r: 0 }])} className="text-[12px] font-semibold text-[#4f46e5]">
                + Add line
              </button>
            </div>
            <div className="mt-3 space-y-1 text-[13px]">
              <p className="flex justify-between">
                <span className="d-muted">Subtotal</span>
                {money(subtotal, "USD", "en-US")}
              </p>
              <p className="flex justify-between">
                <span className="d-muted">Sales tax (7.25%, example rate)</span>
                {money(tax, "USD", "en-US")}
              </p>
              <p className="flex justify-between text-base font-bold">
                <span>Total</span>
                {money(subtotal + tax, "USD", "en-US")}
              </p>
            </div>
            <Btn
              className="mt-3 w-full"
              disabled={!client || subtotal <= 0}
              onClick={() => setInvoices((v) => [{ no: `INV-${1043 + v.length - 4}`, client, issued: "Today", due: "Net 30", amount: Math.round(subtotal + tax), status: "Sent" }, ...v])}
            >
              Send invoice
            </Btn>
          </Card>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

/* =========================================================================
   Lagoon Stay — boutique hotel booking engine (Italy, EUR)
   ========================================================================= */
const ROOMS = [
  { id: "r1", name: "Camera Classica", desc: "Courtyard view · 18 m² · queen bed", base: 145, max: 2 },
  { id: "r2", name: "Camera Superior Canale", desc: "Canal view · 24 m² · king bed", base: 210, max: 2 },
  { id: "r3", name: "Suite Laguna", desc: "Lagoon view · 38 m² · lounge area", base: 340, max: 4 },
];

export function LagoonStayDemo() {
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [room, setRoom] = useState("r2");
  const [rate, setRate] = useState<"flex" | "saver">("flex");
  const [confirmed, setConfirmed] = useState(false);
  const r = ROOMS.find((x) => x.id === room)!;
  const nightly = Math.round(r.base * (rate === "saver" ? 0.88 : 1));
  const cityTax = 4 * guests * Math.min(nights, 5);
  const total = nightly * nights + cityTax;
  return (
    <DemoFrame accent="#0369a1">
      <div className="relative h-36 overflow-hidden">
        <svg viewBox="0 0 800 150" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="800" height="150" fill="#bae6fd" />
          <rect y="95" width="800" height="55" fill="#0369a1" opacity="0.7" />
          {[60, 180, 300, 420, 540, 660].map((x, k) => (
            <g key={x}>
              <rect x={x} y={40 + (k % 2) * 10} width="90" height={60 - (k % 2) * 10} fill={["#fcd34d", "#fca5a5", "#fdba74", "#fef3c7", "#f9a8d4", "#fde68a"][k]} />
              <rect x={x + 15} y={60 + (k % 2) * 10} width="14" height="20" fill="#7c2d12" opacity="0.6" />
              <rect x={x + 55} y={60 + (k % 2) * 10} width="14" height="20" fill="#7c2d12" opacity="0.6" />
            </g>
          ))}
        </svg>
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-5">
          <div className="text-white">
            <p className="text-xl font-bold">Lagoon Stay · Venezia</p>
            <p className="text-[12px] opacity-85">Boutique hotel · Cannaregio · Book direct (concept)</p>
          </div>
        </div>
      </div>
      {confirmed ? (
        <div className="p-6">
          <Card title="Prenotazione confermata · Booking confirmed">
            <p className="text-[14px]">
              {r.name} · {nights} nights · {guests} guests · {rate === "flex" ? "Flexible rate" : "Non-refundable saver"}
            </p>
            <p className="mt-2 text-2xl font-bold">{money(total, "EUR", "it-IT")}</p>
            <p className="d-muted mt-1 text-[12px]">Includes city tax {money(cityTax, "EUR", "it-IT")} (illustrative). Confirmation sent by email in IT/EN.</p>
            <Btn className="mt-4" variant="ghost" onClick={() => setConfirmed(false)}>
              Modify booking
            </Btn>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4 p-4 md:grid-cols-[1fr_300px] md:p-6">
          <div>
            <div className="d-card grid gap-3 rounded-xl p-3 sm:grid-cols-3">
              <Field label="Check-in">
                <input className={inputCls} defaultValue="12 Mar" aria-label="Check-in date" />
              </Field>
              <Field label="Nights">
                <input type="number" min={1} max={14} className={inputCls} value={nights} onChange={(e) => setNights(Math.max(1, Number(e.target.value)))} />
              </Field>
              <Field label="Guests">
                <select className={inputCls} value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                  {[1, 2, 3, 4].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </Field>
            </div>
            <ul className="mt-4 space-y-3">
              {ROOMS.map((x) => {
                const fits = guests <= x.max;
                return (
                  <li key={x.id}>
                    <button type="button" disabled={!fits} onClick={() => setRoom(x.id)} className={`d-card flex w-full items-center justify-between gap-3 rounded-xl p-4 text-left disabled:opacity-40 ${room === x.id ? "ring-2 ring-[#0369a1]" : ""}`}>
                      <span>
                        <span className="block text-[15px] font-semibold">{x.name}</span>
                        <span className="d-muted block text-[12px]">{x.desc}</span>
                        {!fits ? <span className="block text-[11px] text-rose-600">Max {x.max} guests</span> : null}
                      </span>
                      <span className="text-right">
                        <span className="block text-lg font-bold">{money(x.base, "EUR", "it-IT")}</span>
                        <span className="d-muted block text-[11px]">per night</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <Card title="Your stay">
            <div className="flex gap-2 text-[12px]">
              {(["flex", "saver"] as const).map((k) => (
                <button key={k} type="button" onClick={() => setRate(k)} className={`flex-1 rounded-lg px-2 py-2 font-semibold ${rate === k ? "bg-[#0369a1]/12 text-[#0369a1] ring-1 ring-[#0369a1]" : "d-btn-ghost"}`}>
                  {k === "flex" ? "Flexible" : "Saver −12%"}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-[13px]">
              <p className="flex justify-between">
                <span className="d-muted">
                  {money(nightly, "EUR", "it-IT")} × {nights} nights
                </span>
                {money(nightly * nights, "EUR", "it-IT")}
              </p>
              <p className="flex justify-between">
                <span className="d-muted">City tax (illustrative)</span>
                {money(cityTax, "EUR", "it-IT")}
              </p>
              <p className="flex justify-between border-t border-black/5 pt-2 text-base font-bold">
                <span>Total</span>
                {money(total, "EUR", "it-IT")}
              </p>
            </div>
            <p className="d-muted mt-3 text-[11px]">{rate === "flex" ? "Free cancellation up to 48 hours before arrival." : "Non-refundable. Paid at booking."}</p>
            <Btn className="mt-3 w-full" onClick={() => setConfirmed(true)}>
              Book {r.name}
            </Btn>
          </Card>
        </div>
      )}
    </DemoFrame>
  );
}

/* =========================================================================
   Saffron Table — restaurant reservations (UAE, AED)
   ========================================================================= */
const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
const FULL = new Set(["20:00", "20:30"]);

export function SaffronTableDemo() {
  const [party, setParty] = useState(4);
  const [time, setTime] = useState("19:30");
  const [area, setArea] = useState("Terrace");
  const [occasion, setOccasion] = useState("None");
  const [done, setDone] = useState(false);
  const deposit = party >= 6 ? party * 50 : 0;
  return (
    <DemoFrame accent="#b45309">
      <div className="grid md:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[220px] bg-[#3b1d0a] p-6 text-white">
          <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
            {Array.from({ length: 12 }, (_, k) => (
              <circle key={k} cx={(k * 53) % 300} cy={(k * 37) % 200} r={10 + (k % 4) * 6} fill="none" stroke="#fbbf24" />
            ))}
          </svg>
          <div className="relative">
            <p className="text-[12px] uppercase tracking-[0.3em] text-[#fbbf24]">Jumeirah · Dubai</p>
            <p className="mt-2 font-serif text-3xl font-bold">Saffron Table</p>
            <p className="mt-2 max-w-xs text-[13px] opacity-85">Modern Levantine kitchen. Concept reservation experience with deposits for larger groups and occasion notes.</p>
            <ul className="mt-6 space-y-1 text-[12px] opacity-85">
              <li>Daily 18:00–23:30</li>
              <li>Terrace seating October–April</li>
            </ul>
          </div>
        </div>
        <div className="p-5 md:p-6">
          {done ? (
            <Card title="Reservation confirmed">
              <p className="text-[14px]">
                Table for <b>{party}</b> at <b>{time}</b> · {area}
                {occasion !== "None" ? ` · ${occasion}` : ""}
              </p>
              {deposit ? <p className="mt-1 text-[13px]">Deposit paid: {money(deposit, "AED", "en-AE")} (deducted from bill)</p> : null}
              <p className="d-muted mt-2 text-[12px]">A WhatsApp confirmation and a reminder 3 hours before will be sent (simulated).</p>
              <Btn className="mt-3" variant="ghost" onClick={() => setDone(false)}>
                Change reservation
              </Btn>
            </Card>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Reserve a table</h3>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Guests">
                  <select className={inputCls} value={party} onChange={(e) => setParty(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Date">
                  <input className={inputCls} defaultValue="Friday" aria-label="Date" />
                </Field>
              </div>
              <div>
                <p className="d-muted mb-1 text-[11px] font-medium">Time</p>
                <div className="grid grid-cols-3 gap-2">
                  {TIMES.map((t) => (
                    <button key={t} type="button" disabled={FULL.has(t)} onClick={() => setTime(t)} className={`rounded-lg py-2 text-[12px] font-semibold ${FULL.has(t) ? "d-btn-ghost line-through opacity-40" : time === t ? "bg-[#b45309] text-white" : "d-btn-ghost"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Seating">
                  <select className={inputCls} value={area} onChange={(e) => setArea(e.target.value)}>
                    {["Terrace", "Main dining room", "Private majlis (8+)"].map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Occasion">
                  <select className={inputCls} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                    {["None", "Birthday", "Anniversary", "Business dinner"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>
              {deposit ? <p className="rounded-lg bg-[#b45309]/10 p-3 text-[12px]">Groups of 6 or more: deposit of {money(deposit, "AED", "en-AE")} required to secure the table.</p> : null}
              <Btn className="w-full" onClick={() => setDone(true)}>
                {deposit ? `Pay deposit & reserve` : "Confirm reservation"}
              </Btn>
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}

/* =========================================================================
   AgriSense — farm IoT monitoring & irrigation (India)
   ========================================================================= */
const FIELDS = [
  { id: "F1", name: "Field 1 · Sugarcane", moist: 31, temp: 29, area: 2.4 },
  { id: "F2", name: "Field 2 · Tomato (drip)", moist: 18, temp: 31, area: 1.1 },
  { id: "F3", name: "Field 3 · Groundnut", moist: 26, temp: 30, area: 1.8 },
];

export function AgriSenseDemo() {
  const [tab, setTab] = useState("fields");
  const [pumps, setPumps] = useState<Record<string, boolean>>({ F1: false, F2: false, F3: false });
  const [lang, setLang] = useState<"EN" | "MR">("EN");
  const status = (m: number) => (m < 20 ? "bad" : m < 25 ? "warn" : "good");
  const t = (en: string, mr: string) => (lang === "EN" ? en : mr);
  const forecast = useMemo(() => [0, 0, 2, 12, 6, 0, 0], []);
  return (
    <DemoFrame accent="#15803d">
      <AppShell
        brand="AgriSense"
        logo="❦"
        user="Suresh Jadhav"
        active={tab}
        onNav={setTab}
        topRight={
          <button type="button" onClick={() => setLang(lang === "EN" ? "MR" : "EN")} className="d-btn-ghost rounded-md px-2 py-1 text-[11px] font-semibold">
            {lang === "EN" ? "EN · मराठी" : "मराठी · EN"}
          </button>
        }
        nav={[
          { id: "fields", label: t("Fields", "शेत") },
          { id: "irrigation", label: t("Irrigation", "सिंचन") },
          { id: "records", label: t("Farm records", "नोंदी") },
          { id: "alerts", label: t("Alerts", "सूचना") },
        ]}
      >
        <p className="d-muted text-[12px]">Jadhav Farms · Baramati, Maharashtra · 5.3 ha</p>
        <h3 className="text-xl font-bold">{t("Soil & weather today", "आजची माती व हवामान")}</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {FIELDS.map((f) => (
            <div key={f.id} className="d-card rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold">{f.name}</span>
                <Badge tone={status(f.moist) as "good"}>{f.moist < 20 ? t("Irrigate", "पाणी द्या") : f.moist < 25 ? t("Watch", "लक्ष ठेवा") : t("OK", "ठीक")}</Badge>
              </div>
              <p className="mt-3 text-2xl font-bold">
                {f.moist}% <span className="d-muted text-[11px] font-medium">{t("soil moisture", "मातीतील ओलावा")}</span>
              </p>
              <Progress value={(f.moist / 45) * 100} className="mt-2" />
              <p className="d-muted mt-2 text-[11px]">
                {f.temp}°C · {f.area} ha
              </p>
              <button
                type="button"
                onClick={() => setPumps((p) => ({ ...p, [f.id]: !p[f.id] }))}
                className={`mt-3 w-full rounded-lg py-2 text-[12px] font-semibold ${pumps[f.id] ? "bg-[#15803d] text-white" : "d-btn-ghost"}`}
              >
                {pumps[f.id] ? t("Pump ON · tap to stop", "पंप चालू · थांबवा") : t("Start irrigation (20 min)", "सिंचन सुरू करा (२० मि)")}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card title={t("Rain forecast (mm, next 7 days)", "पावसाचा अंदाज (मिमी, ७ दिवस)")}>
            <Bars data={forecast} labels={["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"]} />
            <p className="d-muted mt-2 text-[11px]">{t("Rain expected Sunday — irrigation for Field 1 can wait.", "रविवारी पाऊस अपेक्षित — शेत १ ला थांबता येईल.")}</p>
          </Card>
          <Card title={t("Field 2 moisture (7 days)", "शेत २ ओलावा (७ दिवस)")}>
            <Line data={[29, 27, 25, 24, 22, 20, 18]} />
            <p className="d-muted mt-2 text-[11px]">{t("Below 20% threshold — drip irrigation recommended this morning.", "२०% पेक्षा कमी — आज सकाळी ठिबक सिंचन करा.")}</p>
          </Card>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

