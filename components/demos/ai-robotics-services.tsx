"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell, Badge, Bars, Btn, Card, DemoFrame, Field, Line, Phone, Progress, Stat, Table, inputCls, money } from "./kit";

/* =========================================================================
   DocuSense — intelligent document processing (Canada, CAD)
   ========================================================================= */
type Doc = {
  id: string;
  file: string;
  type: string;
  fields: { k: string; v: string; conf: number; rule?: string }[];
};
const DOCS: Doc[] = [
  {
    id: "D-3381",
    file: "maple-supply-invoice-0912.pdf",
    type: "Supplier invoice",
    fields: [
      { k: "Supplier", v: "Maple Industrial Supply Ltd.", conf: 0.98 },
      { k: "Invoice no.", v: "MIS-0912", conf: 0.99 },
      { k: "Invoice date", v: "2026-11-04", conf: 0.96 },
      { k: "PO number", v: "PO-55120", conf: 0.93 },
      { k: "Subtotal", v: "4,250.00", conf: 0.97 },
      { k: "GST/HST (13%)", v: "552.50", conf: 0.95 },
      { k: "Total (CAD)", v: "4,812.50", conf: 0.88, rule: "Subtotal + tax ≠ total (expected 4,802.50)" },
    ],
  },
  {
    id: "D-3382",
    file: "northshore-freight-bol.pdf",
    type: "Bill of lading",
    fields: [
      { k: "Carrier", v: "Northshore Freight Inc.", conf: 0.97 },
      { k: "BOL number", v: "NSF-77821", conf: 0.98 },
      { k: "Ship date", v: "2026-11-06", conf: 0.94 },
      { k: "Pieces", v: "12 pallets", conf: 0.9 },
      { k: "Consignee", v: "Lakeview Distribution, Mississauga ON", conf: 0.86 },
    ],
  },
];

export function DocuSenseDemo() {
  const [tab, setTab] = useState("review");
  const [di, setDi] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [approved, setApproved] = useState<string[]>([]);
  const doc = DOCS[di];
  const val = (k: string, v: string) => values[`${doc.id}:${k}`] ?? v;
  const fixed = doc.fields.every((f) => !f.rule || values[`${doc.id}:${f.k}`]);
  return (
    <DemoFrame accent="#0d9488">
      <AppShell
        brand="DocuSense"
        logo="▤"
        user="AP Team"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "inbox", label: "Inbox" },
          { id: "review", label: "Review queue" },
          { id: "rules", label: "Validation rules" },
          { id: "exports", label: "ERP exports" },
        ]}
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Documents today" value={186} />
          <Stat label="Straight-through" value="81%" delta="Passed all rules" tone="up" />
          <Stat label="Needs review" value={DOCS.length - approved.length} />
          <Stat label="Avg. handling time" value="42 s" />
        </div>
        <div className="mt-4 flex gap-2">
          {DOCS.map((d, k) => (
            <button key={d.id} type="button" onClick={() => setDi(k)} className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold ${di === k ? "bg-[#0d9488] text-white" : "d-btn-ghost"}`}>
              {d.id} · {d.type}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card title={doc.file} action={<Badge>{doc.type}</Badge>}>
            <div className="rounded-lg border border-black/10 bg-white p-5 font-mono text-[11px] leading-6 text-[#344054] shadow-inner">
              <p className="text-[13px] font-bold">{doc.fields[0].v}</p>
              <p>100 King St W, Toronto ON</p>
              <div className="my-3 h-px bg-black/10" />
              {doc.fields.slice(1).map((f) => (
                <p key={f.k} className={f.rule ? "rounded bg-amber-100" : f.conf < 0.9 ? "rounded bg-sky-50" : ""}>
                  {f.k.padEnd(16, ".")} {f.v}
                </p>
              ))}
            </div>
            <p className="d-muted mt-2 text-[11px]">Highlighted lines: low confidence (blue) or failed validation (amber).</p>
          </Card>
          <Card title="Extracted fields" action={approved.includes(doc.id) ? <Badge tone="good">Exported to ERP</Badge> : <Badge tone="warn">Review</Badge>}>
            <div className="space-y-2">
              {doc.fields.map((f) => (
                <div key={f.k}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="d-muted font-medium">{f.k}</span>
                    <span className={f.conf < 0.9 ? "text-amber-600" : "d-muted"}>{Math.round(f.conf * 100)}%</span>
                  </div>
                  <input aria-label={f.k} className={inputCls} value={val(f.k, f.v)} onChange={(e) => setValues((v) => ({ ...v, [`${doc.id}:${f.k}`]: e.target.value }))} />
                  {f.rule && !values[`${doc.id}:${f.k}`] ? <p className="mt-1 text-[11px] text-amber-700">⚠ {f.rule}</p> : null}
                </div>
              ))}
            </div>
            <Btn className="mt-4 w-full" disabled={!fixed || approved.includes(doc.id)} onClick={() => setApproved((a) => [...a, doc.id])}>
              {fixed ? "Approve & export" : "Resolve validation issues to approve"}
            </Btn>
          </Card>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

/* =========================================================================
   RoboFleet — robot fleet command centre (Australia)
   ========================================================================= */
type Robot = { id: string; zone: string; task: string; battery: number; state: "Working" | "Charging" | "Idle" | "Blocked" };
const ROBOTS: Robot[] = [
  { id: "AMR-01", zone: "Aisle 4", task: "T-5512 · tote to pack", battery: 76, state: "Working" },
  { id: "AMR-02", zone: "Dock B", task: "T-5514 · pallet to staging", battery: 54, state: "Working" },
  { id: "AMR-03", zone: "Aisle 12", task: "T-5509 · tote to pick", battery: 63, state: "Blocked" },
  { id: "AMR-04", zone: "Charger 2", task: "—", battery: 22, state: "Charging" },
  { id: "AMR-05", zone: "Pack zone", task: "T-5517 · empty tote return", battery: 88, state: "Working" },
  { id: "ARM-01", zone: "Cell 1", task: "Pick & place · SKU 88231", battery: 100, state: "Working" },
];

export function RoboFleetDemo() {
  const [tab, setTab] = useState("live");
  const [robots, setRobots] = useState(ROBOTS);
  const [sel, setSel] = useState("AMR-03");
  const [tick, setTick] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timer.current = setInterval(() => setTick((t) => t + 1), 1500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);
  const r = robots.find((x) => x.id === sel)!;
  const tone = (s: Robot["state"]) => (s === "Working" ? "good" : s === "Blocked" ? "bad" : s === "Charging" ? "warn" : "neutral");
  const pos = (k: number) => {
    const base = [
      [60, 50],
      [250, 140],
      [180, 40],
      [40, 150],
      [300, 70],
      [120, 120],
    ][k];
    const st = robots[k].state;
    const d = st === "Working" ? Math.sin((tick + k) / 1.6) * 14 : 0;
    return [base[0] + d, base[1] + (st === "Working" ? Math.cos((tick + k) / 2) * 6 : 0)];
  };
  return (
    <DemoFrame accent="#38bdf8" dark>
      <AppShell
        brand="RoboFleet"
        logo="⬢"
        user="Shift Supervisor"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "live", label: "Live operations" },
          { id: "tasks", label: "Task queue" },
          { id: "maint", label: "Maintenance" },
          { id: "reports", label: "Shift reports" },
        ]}
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="d-muted text-[12px]">Western Sydney fulfilment centre · Simulated telemetry</p>
            <h3 className="text-xl font-bold">Fleet health</h3>
          </div>
          <Badge tone={robots.some((x) => x.state === "Blocked") ? "bad" : "good"}>{robots.some((x) => x.state === "Blocked") ? "1 robot needs attention" : "All systems normal"}</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Active robots" value={`${robots.filter((x) => x.state === "Working").length}/${robots.length}`} />
          <Stat label="Tasks / hour" value={184 + (tick % 4)} />
          <Stat label="Avg. task time" value="3m 12s" />
          <Stat label="Open exceptions" value={robots.filter((x) => x.state === "Blocked").length} tone="down" />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card title="Floor map">
            <svg viewBox="0 0 360 200" className="w-full rounded-lg bg-[#0a1322]" aria-label="Warehouse floor map with robot positions">
              {[0, 1, 2, 3, 4].map((k) => (
                <rect key={k} x={30 + k * 66} y="20" width="18" height="110" fill="#16233a" />
              ))}
              <rect x="20" y="160" width="90" height="28" fill="#13304d" />
              <text x="28" y="178" fill="#7aa5d6" fontSize="9">PACK ZONE</text>
              <rect x="250" y="160" width="90" height="28" fill="#13304d" />
              <text x="258" y="178" fill="#7aa5d6" fontSize="9">DOCK B</text>
              {robots.map((x, k) => {
                const [px, py] = pos(k);
                const col = x.state === "Blocked" ? "#f43f5e" : x.state === "Charging" ? "#fbbf24" : "#38bdf8";
                return (
                  <g key={x.id} onClick={() => setSel(x.id)} style={{ cursor: "pointer" }}>
                    {x.id === sel ? <circle cx={px} cy={py} r="13" fill="none" stroke={col} strokeOpacity="0.6" /> : null}
                    <circle cx={px} cy={py} r="6" fill={col} />
                    <text x={px + 9} y={py + 3} fill="#c7d3e6" fontSize="8">
                      {x.id}
                    </text>
                  </g>
                );
              })}
            </svg>
            <Table
              head={["Robot", "Zone", "Task", "Battery", "State"]}
              rows={robots.map((x) => [
                <button key="b" type="button" className="font-semibold" onClick={() => setSel(x.id)}>
                  {x.id}
                </button>,
                x.zone,
                x.task,
                `${x.battery}%`,
                <Badge key="s" tone={tone(x.state) as "good"}>
                  {x.state}
                </Badge>,
              ])}
            />
          </Card>
          <div className="space-y-4">
            <Card title={`${r.id} · ${r.zone}`} action={<Badge tone={tone(r.state) as "good"}>{r.state}</Badge>}>
              <p className="d-muted text-[12px]">{r.task}</p>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-[11px]">
                  <span>Battery</span>
                  <span>{r.battery}%</span>
                </div>
                <Progress value={r.battery} />
              </div>
              {r.state === "Blocked" ? <p className="mt-3 rounded-lg bg-rose-500/10 p-2 text-[12px] text-rose-300">Path blocked for 3 min at Aisle 12 — task T-5509 delayed. Check for an obstruction on the floor.</p> : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn
                  variant="ghost"
                  disabled={r.state !== "Blocked"}
                  onClick={() => setRobots((rs) => rs.map((x) => (x.id === r.id ? { ...x, state: "Working", zone: "Aisle 11" } : x)))}
                >
                  Clear & resume
                </Btn>
                <Btn variant="ghost" onClick={() => setRobots((rs) => rs.map((x) => (x.id === r.id ? { ...x, state: "Charging", task: "—" } : x)))}>
                  Send to charger
                </Btn>
              </div>
              <p className="d-muted mt-3 text-[10px]">Remote actions are logged. Physical safety systems always take priority over software commands.</p>
            </Card>
            <Card title="Throughput (tasks / hour)">
              <Line data={[150, 162, 171, 168, 180, 176, 184 + (tick % 4)]} />
            </Card>
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

/* =========================================================================
   AskDesk — internal knowledge assistant (USA) — scripted responses, no live model
   ========================================================================= */
const KB: { q: RegExp; a: string; src: string[] }[] = [
  { q: /(pto|vacation|leave|holiday)/i, a: "Full-time employees accrue paid time off each pay period. Requests should be submitted in the HR portal at least two weeks in advance; your manager approves them.", src: ["Employee Handbook §4.2 — Paid time off", "HR Portal guide — Requesting leave"] },
  { q: /(expense|reimburse|receipt)/i, a: "Submit expenses within 30 days with itemised receipts. Meals while travelling are reimbursed up to the per-diem limits in the travel policy; anything above needs manager approval.", src: ["Travel & Expense Policy v3 — Section 2", "Finance FAQ — Reimbursement timelines"] },
  { q: /(vpn|password|laptop|it)/i, a: "For VPN or password problems, use the self-service reset first. If that fails, open an IT ticket with the device ID shown in Settings → About.", src: ["IT Help Center — VPN access", "IT Help Center — Password reset"] },
];

export function AskDeskDemo() {
  const [tab, setTab] = useState("assistant");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{ from: "user" | "bot"; text: string; src?: string[] }[]>([
    { from: "bot", text: "Hi! I answer questions using Harborline's internal policies and help-centre articles, and I always show my sources. What do you need?" },
  ]);
  const ask = (text: string) => {
    if (!text.trim()) return;
    const hit = KB.find((k) => k.q.test(text));
    setMsgs((m) => [
      ...m,
      { from: "user", text },
      hit ? { from: "bot", text: hit.a, src: hit.src } : { from: "bot", text: "I couldn't find that in the approved knowledge base, so I won't guess. I've created a draft ticket for the People Ops team.", src: [] },
    ]);
    setInput("");
  };
  return (
    <DemoFrame accent="#2563eb">
      <AppShell
        brand="AskDesk"
        logo="?"
        user="Jordan Lee"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "assistant", label: "Assistant" },
          { id: "sources", label: "Knowledge sources" },
          { id: "analytics", label: "Analytics" },
          { id: "settings", label: "Settings" },
        ]}
      >
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Card title="Ask a question" action={<Badge tone="warn">Demo: scripted answers, no live AI model</Badge>}>
            <div className="h-[340px] space-y-3 overflow-y-auto pr-1">
              {msgs.map((m, k) => (
                <div key={k} className={`flex ${m.from === "user" ? "justify-end" : ""}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] ${m.from === "user" ? "bg-[#2563eb] text-white" : "d-badge"}`}>
                    {m.text}
                    {m.src?.length ? (
                      <ul className="mt-2 space-y-0.5 border-t border-black/10 pt-2 text-[11px] opacity-80">
                        {m.src.map((s) => (
                          <li key={s}>📄 {s}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input className={inputCls} value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. How do I submit expenses?" aria-label="Question" />
              <Btn type="submit">Ask</Btn>
            </form>
            <div className="mt-2 flex flex-wrap gap-2">
              {["How much PTO do I get?", "How do I submit expenses?", "My VPN isn't working"].map((s) => (
                <button key={s} type="button" onClick={() => ask(s)} className="d-btn-ghost rounded-full px-3 py-1 text-[11px]">
                  {s}
                </button>
              ))}
            </div>
          </Card>
          <div className="space-y-4">
            <Card title="Answer quality (last 30 days)">
              <div className="space-y-3 text-[12px]">
                {[
                  ["Answered with sources", 78],
                  ["Escalated to a person", 15],
                  ["Marked unhelpful", 7],
                ].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="mb-1 flex justify-between">
                      <span>{l}</span>
                      <span className="d-muted">{v}%</span>
                    </div>
                    <Progress value={v as number} />
                  </div>
                ))}
              </div>
              <p className="d-muted mt-3 text-[10px]">Illustrative demo figures.</p>
            </Card>
            <Card title="Connected sources">
              <ul className="space-y-1.5 text-[12px]">
                <li className="flex justify-between">Employee Handbook <Badge tone="good">Synced</Badge></li>
                <li className="flex justify-between">IT Help Center <Badge tone="good">Synced</Badge></li>
                <li className="flex justify-between">Finance FAQ <Badge tone="warn">Review due</Badge></li>
              </ul>
            </Card>
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

/* =========================================================================
   FitFlow — fitness studio class booking app (United Kingdom, GBP)
   ========================================================================= */
const CLASSES = [
  { id: 1, t: "Morning Flow Yoga", time: "07:00", coach: "Ellie", spots: 4, len: 60, lvl: "All levels" },
  { id: 2, t: "Strength Fundamentals", time: "12:30", coach: "Marcus", spots: 0, len: 45, lvl: "Beginner" },
  { id: 3, t: "Indoor Cycling", time: "18:00", coach: "Priya", spots: 7, len: 45, lvl: "Intermediate" },
  { id: 4, t: "Pilates Core", time: "19:15", coach: "Ellie", spots: 2, len: 50, lvl: "All levels" },
];

export function FitFlowDemo() {
  const [booked, setBooked] = useState<number[]>([1]);
  const [wait, setWait] = useState<number[]>([]);
  const [day, setDay] = useState(1);
  const credits = 8 - booked.length;
  return (
    <DemoFrame accent="#db2777" className="!border-0 !bg-transparent !shadow-none">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <Phone label="FitFlow member app">
          <div className="demo-light min-h-[680px] bg-[#fdf2f8] text-[#101828]">
            <div className="px-5 pb-4 pt-10">
              <p className="text-[12px] text-[#db2777]">FitFlow · Manchester Northern Quarter</p>
              <p className="text-xl font-bold">Hi Sam 👋</p>
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#db2777] p-4 text-white">
                <div>
                  <p className="text-[11px] opacity-80">Class credits left</p>
                  <p className="text-2xl font-bold">{credits}</p>
                </div>
                <div className="text-right text-[11px] opacity-85">
                  8-class pack
                  <br />
                  {money(64, "GBP", "en-GB")} / month
                </div>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto px-5">
              {["Mon 10", "Tue 11", "Wed 12", "Thu 13", "Fri 14"].map((d, k) => (
                <button key={d} type="button" onClick={() => setDay(k)} className={`shrink-0 rounded-xl px-3 py-2 text-[12px] font-semibold ${day === k ? "bg-[#101828] text-white" : "bg-white"}`}>
                  {d}
                </button>
              ))}
            </div>
            <ul className="space-y-2 p-4">
              {CLASSES.map((c) => {
                const isBooked = booked.includes(c.id);
                const full = c.spots === 0;
                const waiting = wait.includes(c.id);
                return (
                  <li key={c.id} className="rounded-2xl bg-white p-3.5 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[14px] font-semibold">{c.t}</p>
                        <p className="text-[12px] text-[#667085]">
                          {c.time} · {c.len} min · {c.coach} · {c.lvl}
                        </p>
                      </div>
                      <span className="text-[11px] text-[#667085]">{full ? "Full" : `${c.spots} left`}</span>
                    </div>
                    <button
                      type="button"
                      disabled={!isBooked && !full && credits <= 0}
                      onClick={() => {
                        if (isBooked) setBooked((b) => b.filter((x) => x !== c.id));
                        else if (full) setWait((w) => (waiting ? w.filter((x) => x !== c.id) : [...w, c.id]));
                        else setBooked((b) => [...b, c.id]);
                      }}
                      className={`mt-3 w-full rounded-xl py-2 text-[12px] font-semibold ${isBooked ? "bg-emerald-100 text-emerald-700" : full ? (waiting ? "bg-amber-100 text-amber-700" : "border border-[#d0d5dd]") : "bg-[#db2777] text-white"}`}
                    >
                      {isBooked ? "Booked ✓ · tap to cancel" : full ? (waiting ? "On waitlist · tap to leave" : "Join waitlist") : "Book class"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Phone>
        <div className="space-y-4">
          <Card title="Studio dashboard (staff view)">
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Bookings this week" value={286} />
              <Stat label="Avg. class fill" value="82%" />
            </div>
            <div className="mt-4">
              <Bars data={[62, 74, 81, 88, 70, 55, 40]} labels={["M", "T", "W", "T", "F", "S", "S"]} />
            </div>
          </Card>
          <Card title="Booking rules (configurable)">
            <ul className="space-y-1.5 text-[13px]">
              <li>• Late cancellation window: 6 hours</li>
              <li>• Waitlist auto-promotes and notifies by push</li>
              <li>• Payments via card & Apple/Google Pay (simulated)</li>
            </ul>
          </Card>
        </div>
      </div>
    </DemoFrame>
  );
}

/* =========================================================================
   BuildTrack — construction site manager (South Africa, ZAR)
   ========================================================================= */
const TASKS = [
  { id: 1, t: "Foundation pour — Block B", owner: "Thabo M.", due: "Mon", pct: 100 },
  { id: 2, t: "Brickwork level 1 — Block B", owner: "Sipho K.", due: "Fri", pct: 65 },
  { id: 3, t: "Electrical first fix — Block A", owner: "Ayesha P.", due: "Thu", pct: 40 },
  { id: 4, t: "Roof trusses delivery", owner: "Procurement", due: "Wed", pct: 0 },
];
const MATERIALS = [
  ["Cement (50 kg bags)", 420, 380, 109],
  ["Face bricks (thousand)", 48, 31, 4200],
  ["Rebar Y12 (tonnes)", 9, 9, 16800],
] as const;

export function BuildTrackDemo() {
  const [tab, setTab] = useState("site");
  const [tasks, setTasks] = useState(TASKS);
  const [note, setNote] = useState("");
  const [log, setLog] = useState(["07:10 · Toolbox talk completed (14 workers)", "09:45 · Concrete cube samples taken — Block B"]);
  const budget = 18_500_000,
    spent = 11_240_000;
  return (
    <DemoFrame accent="#ca8a04">
      <AppShell
        brand="BuildTrack"
        logo="▲"
        user="Site Manager"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "site", label: "Site overview" },
          { id: "tasks", label: "Programme" },
          { id: "materials", label: "Materials" },
          { id: "safety", label: "Safety & diary" },
        ]}
      >
        <p className="d-muted text-[12px]">Riverbend Residential · Phase 2 · Midrand, Gauteng</p>
        <h3 className="text-xl font-bold">Site overview</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Programme progress" value="58%" />
          <Stat label="Budget used" value={money(spent, "ZAR", "en-ZA")} delta={`of ${money(budget, "ZAR", "en-ZA")}`} />
          <Stat label="Days without incident" value={46} tone="up" />
          <Stat label="Weather" value="Clear, 27°C" delta="Rain risk Fri" />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card title="This week's programme">
            <ul className="space-y-3">
              {tasks.map((t) => (
                <li key={t.id}>
                  <div className="flex items-center justify-between gap-2 text-[13px]">
                    <span className="font-medium">{t.t}</span>
                    <span className="d-muted text-[11px]">
                      {t.owner} · due {t.due}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Progress value={t.pct} className="flex-1" />
                    <button type="button" onClick={() => setTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, pct: Math.min(100, x.pct + 10) } : x)))} className="d-btn-ghost rounded px-2 text-[11px]">
                      +10%
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <div className="space-y-4">
            <Card title="Materials on site">
              <Table head={["Item", "Ordered", "Delivered", "Unit cost"]} rows={MATERIALS.map(([n, o, d, c]) => [n, o, d, money(c, "ZAR", "en-ZA")])} />
            </Card>
            <Card title="Site diary">
              <ul className="d-muted mb-3 space-y-1 text-[12px]">
                {log.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (note.trim()) {
                    setLog((l) => [...l, `Now · ${note.trim()}`]);
                    setNote("");
                  }
                }}
              >
                <Field label="">
                  <input className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add diary entry" aria-label="Diary entry" />
                </Field>
                <Btn type="submit">Add</Btn>
              </form>
            </Card>
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}
