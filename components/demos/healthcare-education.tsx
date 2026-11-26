"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell, Badge, Bars, Btn, Card, DemoFrame, Field, Line, Progress, Stat, Table, inputCls, money } from "./kit";

/* =========================================================================
   CareSlot — clinic appointment booking (India, INR)
   ========================================================================= */
const DOCTORS = [
  { id: "d1", name: "Dr. Ananya Rao", spec: "General Physician", fee: 600, lang: "English, Kannada, Hindi", next: "Today" },
  { id: "d2", name: "Dr. Vikram Menon", spec: "Paediatrics", fee: 800, lang: "English, Malayalam", next: "Tomorrow" },
  { id: "d3", name: "Dr. Farah Siddiqui", spec: "Dermatology", fee: 900, lang: "English, Hindi, Urdu", next: "Today" },
  { id: "d4", name: "Dr. Kiran Patil", spec: "Orthopaedics", fee: 1000, lang: "English, Marathi", next: "Thu" },
];
const SLOTS = ["09:30", "10:00", "10:30", "11:15", "12:00", "16:00", "16:30", "17:15", "18:00"];
const TAKEN = new Set(["10:30", "16:30"]);

export function CareSlotDemo() {
  const [spec, setSpec] = useState("All");
  const [doctor, setDoctor] = useState(DOCTORS[0]);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>("11:15");
  const [name, setName] = useState("Rahul Sharma");
  const [phone, setPhone] = useState("+91 98xxxx2210");
  const [pay, setPay] = useState<"upi" | "clinic">("upi");
  const [booked, setBooked] = useState(false);
  const days = ["Today", "Tomorrow", "Thu", "Fri", "Sat"];
  const list = DOCTORS.filter((d) => spec === "All" || d.spec === spec);

  return (
    <DemoFrame accent="#0f9f8f">
      <div className="d-topbar flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0f9f8f] font-bold text-white">+</span>
          <span className="font-bold">CareSlot Clinics</span>
          <span className="d-muted hidden text-xs sm:inline">· Indiranagar, Bengaluru</span>
        </div>
        <Badge tone="accent">Open today 9:00–20:00</Badge>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[1.1fr_1fr] md:p-6">
        <div>
          <h3 className="text-lg font-bold">Book an appointment</h3>
          <p className="d-muted text-[13px]">Choose a doctor, pick a time and confirm in under a minute.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["All", "General Physician", "Paediatrics", "Dermatology", "Orthopaedics"].map((s) => (
              <button key={s} type="button" onClick={() => setSpec(s)} className={`rounded-full px-3 py-1 text-[12px] font-medium ${spec === s ? "bg-[#0f9f8f] text-white" : "d-btn-ghost"}`}>
                {s}
              </button>
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {list.map((d) => (
              <li key={d.id}>
                <button type="button" onClick={() => setDoctor(d)} className={`d-card flex w-full items-center gap-3 rounded-xl p-3 text-left ${doctor.id === d.id ? "ring-2 ring-[#0f9f8f]" : ""}`}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0f9f8f]/15 text-sm font-bold text-[#0f9f8f]">
                    {d.name.split(" ")[1][0]}
                    {d.name.split(" ")[2][0]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold">{d.name}</span>
                    <span className="d-muted block text-[12px]">
                      {d.spec} · {d.lang}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[13px] font-semibold">{money(d.fee, "INR", "en-IN")}</span>
                    <span className="d-muted block text-[11px]">Next: {d.next}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Card title={booked ? "Appointment confirmed" : `Schedule with ${doctor.name}`}>
          {booked ? (
            <div className="space-y-3 text-[13px]">
              <div className="rounded-xl bg-[#0f9f8f]/10 p-4">
                <p className="text-base font-bold text-[#0f9f8f]">✓ Booking reference CS-24{doctor.id.slice(1)}{slot?.replace(":", "")}</p>
                <p className="mt-1">
                  {name}, your visit with {doctor.name} is on <b>{days[day]}</b> at <b>{slot}</b>.
                </p>
                <p className="d-muted mt-1">A WhatsApp/SMS reminder will be sent to {phone} 2 hours before.</p>
              </div>
              <p className="d-muted">Payment: {pay === "upi" ? `${money(doctor.fee, "INR", "en-IN")} via UPI (simulated)` : "Pay at clinic"}</p>
              <Btn variant="ghost" onClick={() => setBooked(false)}>
                Book another
              </Btn>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2 overflow-x-auto">
                {days.map((d, i) => (
                  <button key={d} type="button" onClick={() => setDay(i)} className={`shrink-0 rounded-lg px-3 py-2 text-[12px] font-semibold ${day === i ? "bg-[#0f9f8f] text-white" : "d-btn-ghost"}`}>
                    {d}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SLOTS.map((s) => {
                  const taken = day === 0 && TAKEN.has(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={taken}
                      onClick={() => setSlot(s)}
                      className={`rounded-lg py-2 text-[12px] font-semibold ${taken ? "cursor-not-allowed line-through opacity-40 d-btn-ghost" : slot === s ? "bg-[#0f9f8f] text-white" : "d-btn-ghost"}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Patient name">
                  <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
                </Field>
                <Field label="Mobile number">
                  <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Field>
              </div>
              <div className="flex gap-2 text-[12px]">
                {(["upi", "clinic"] as const).map((p) => (
                  <button key={p} type="button" onClick={() => setPay(p)} className={`flex-1 rounded-lg py-2 font-semibold ${pay === p ? "bg-[#0f9f8f]/15 text-[#0f9f8f] ring-1 ring-[#0f9f8f]" : "d-btn-ghost"}`}>
                    {p === "upi" ? "Pay now with UPI" : "Pay at clinic"}
                  </button>
                ))}
              </div>
              <Btn className="w-full" disabled={!slot || !name} onClick={() => setBooked(true)}>
                Confirm {slot ? `${days[day]} · ${slot}` : "appointment"} · {money(doctor.fee, "INR", "en-IN")}
              </Btn>
            </div>
          )}
        </Card>
      </div>
    </DemoFrame>
  );
}

/* =========================================================================
   PulseBoard — clinic operations dashboard (United Kingdom)
   ========================================================================= */
const QUEUE = [
  { t: "08:45", p: "M. Okafor", r: "Medication review", c: "Dr Patel", s: "Seen" },
  { t: "09:00", p: "J. Hughes", r: "Asthma check", c: "Nurse Evans", s: "In consultation" },
  { t: "09:10", p: "A. Kowalski", r: "Blood test results", c: "Dr Patel", s: "Arrived" },
  { t: "09:20", p: "S. Begum", r: "Child vaccination", c: "Nurse Evans", s: "Arrived" },
  { t: "09:30", p: "R. Thompson", r: "Back pain", c: "Dr Clarke", s: "Booked" },
  { t: "09:40", p: "L. Nguyen", r: "Telephone follow-up", c: "Dr Clarke", s: "Booked" },
];

export function PulseBoardDemo() {
  const [tab, setTab] = useState("today");
  const [rows, setRows] = useState(QUEUE);
  const next = (i: number) =>
    setRows((r) => r.map((x, j) => (j === i ? { ...x, s: x.s === "Booked" ? "Arrived" : x.s === "Arrived" ? "In consultation" : "Seen" } : x)));
  const tone = (s: string) => (s === "Seen" ? "good" : s === "In consultation" ? "accent" : s === "Arrived" ? "warn" : "neutral");
  return (
    <DemoFrame accent="#5b5bd6">
      <AppShell
        brand="PulseBoard"
        logo="♥"
        user="Practice Manager"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "today", label: "Today" },
          { id: "rota", label: "Clinician rota" },
          { id: "recalls", label: "Recalls" },
          { id: "reports", label: "Reports" },
        ]}
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="d-muted text-[12px]">Riverside Family Practice · Leeds</p>
            <h3 className="text-xl font-bold">Today&apos;s clinic</h3>
          </div>
          <Badge tone="accent">Live · demo data</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Appointments" value={42} delta="6 telephone" />
          <Stat label="Waiting now" value={rows.filter((r) => r.s === "Arrived").length} delta="Avg wait 11 min" />
          <Stat label="Did not attend" value={2} delta="Reminders sent" tone="down" />
          <Stat label="Same-day slots left" value={5} delta="Released at 08:00" />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <Card title="Arrivals board" action={<span className="d-muted text-[11px]">Click a status to advance</span>}>
            <Table
              head={["Time", "Patient", "Reason", "Clinician", "Status"]}
              rows={rows.map((r, i) => [
                r.t,
                r.p,
                r.r,
                r.c,
                <button key={i} type="button" onClick={() => next(i)}>
                  <Badge tone={tone(r.s) as "good"}>{r.s}</Badge>
                </button>,
              ])}
            />
          </Card>
          <div className="space-y-4">
            <Card title="Demand this week">
              <Bars data={[58, 64, 51, 47, 39]} labels={["Mon", "Tue", "Wed", "Thu", "Fri"]} />
            </Card>
            <Card title="Recall programme">
              {[
                ["Diabetes annual review", 72],
                ["Hypertension check", 58],
                ["Childhood immunisations", 86],
              ].map(([l, v]) => (
                <div key={l as string} className="mb-3">
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span>{l}</span>
                    <span className="d-muted">{v}%</span>
                  </div>
                  <Progress value={v as number} />
                </div>
              ))}
            </Card>
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

/* =========================================================================
   ExamReady — online assessment (India)
   ========================================================================= */
const QUESTIONS = [
  { q: "Which data structure works on a First-In-First-Out (FIFO) basis?", o: ["Stack", "Queue", "Tree", "Graph"], a: 1 },
  { q: "What is the time complexity of binary search on a sorted array?", o: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], a: 2 },
  { q: "Which HTTP status code means a resource was not found?", o: ["200", "301", "404", "500"], a: 2 },
  { q: "In SQL, which clause filters grouped results?", o: ["WHERE", "HAVING", "ORDER BY", "LIMIT"], a: 1 },
  { q: "Which of these is NOT a JavaScript primitive type?", o: ["string", "boolean", "object", "number"], a: 2 },
];

export function ExamReadyDemo() {
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [flag, setFlag] = useState<boolean[]>(Array(QUESTIONS.length).fill(false));
  const [secs, setSecs] = useState(15 * 60);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [done]);
  const score = ans.filter((a, k) => a === QUESTIONS[k].a).length;
  const q = QUESTIONS[i];
  return (
    <DemoFrame accent="#e8590c">
      <div className="d-topbar flex flex-wrap items-center justify-between gap-2 px-5 py-3">
        <div>
          <p className="font-bold">ExamReady · Computer Science Practice Test</p>
          <p className="d-muted text-[12px]">Roll no. 24CS1187 · Section A · 5 questions</p>
        </div>
        <span className={`rounded-lg px-3 py-1.5 font-mono text-sm font-bold ${secs < 120 ? "bg-rose-500/15 text-rose-600" : "bg-[#e8590c]/12 text-[#e8590c]"}`}>
          ⏱ {String(Math.floor(secs / 60)).padStart(2, "0")}:{String(secs % 60).padStart(2, "0")}
        </span>
      </div>
      {done ? (
        <div className="p-6">
          <Card title="Result summary">
            <p className="text-3xl font-bold">
              {score} / {QUESTIONS.length}
            </p>
            <p className="d-muted text-[13px]">Scores are calculated instantly; descriptive answers would go to teacher review.</p>
            <ul className="mt-4 space-y-2 text-[13px]">
              {QUESTIONS.map((x, k) => (
                <li key={k} className="flex items-start gap-2">
                  <Badge tone={ans[k] === x.a ? "good" : "bad"}>{ans[k] === x.a ? "Correct" : "Review"}</Badge>
                  <span>
                    {x.q} <span className="d-muted">— Answer: {x.o[x.a]}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Btn
              className="mt-4"
              variant="ghost"
              onClick={() => {
                setDone(false);
                setAns(Array(QUESTIONS.length).fill(null));
                setI(0);
                setSecs(15 * 60);
              }}
            >
              Retake practice test
            </Btn>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4 p-4 md:grid-cols-[1fr_220px] md:p-6">
          <Card>
            <p className="d-muted text-[12px] font-semibold">
              Question {i + 1} of {QUESTIONS.length}
            </p>
            <p className="mt-2 text-[16px] font-semibold">{q.q}</p>
            <div className="mt-4 space-y-2">
              {q.o.map((o, k) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setAns((a) => a.map((x, j) => (j === i ? k : x)))}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[14px] ${ans[i] === k ? "bg-[#e8590c]/12 ring-2 ring-[#e8590c]" : "d-btn-ghost"}`}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full border text-[11px] font-bold">{"ABCD"[k]}</span>
                  {o}
                </button>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap justify-between gap-2">
              <Btn variant="ghost" onClick={() => setFlag((f) => f.map((x, j) => (j === i ? !x : x)))}>
                {flag[i] ? "★ Flagged" : "☆ Flag for review"}
              </Btn>
              <div className="flex gap-2">
                <Btn variant="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>
                  Previous
                </Btn>
                {i < QUESTIONS.length - 1 ? <Btn onClick={() => setI(i + 1)}>Save & next</Btn> : <Btn onClick={() => setDone(true)}>Submit test</Btn>}
              </div>
            </div>
          </Card>
          <Card title="Question palette">
            <div className="grid grid-cols-5 gap-2">
              {QUESTIONS.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setI(k)}
                  className={`h-9 rounded-lg text-[12px] font-bold ${k === i ? "ring-2 ring-[#e8590c]" : ""} ${flag[k] ? "bg-amber-400/30" : ans[k] !== null ? "bg-[#e8590c] text-white" : "d-btn-ghost"}`}
                >
                  {k + 1}
                </button>
              ))}
            </div>
            <div className="d-muted mt-4 space-y-1 text-[11px]">
              <p>■ Answered · ▣ Flagged · □ Not visited</p>
              <p>Answered: {ans.filter((a) => a !== null).length}</p>
            </div>
          </Card>
        </div>
      )}
    </DemoFrame>
  );
}

/* =========================================================================
   LearnPath — student learning portal (Canada)
   ========================================================================= */
const COURSES = [
  { id: "c1", t: "Introduction to Data Analysis", m: 8, done: 5, colour: "#2563eb" },
  { id: "c2", t: "Business Writing Essentials", m: 6, done: 6, colour: "#16a34a" },
  { id: "c3", t: "Project Management Foundations", m: 10, done: 3, colour: "#9333ea" },
];

export function LearnPathDemo() {
  const [tab, setTab] = useState("dash");
  const [course, setCourse] = useState(COURSES[0]);
  const [completed, setCompleted] = useState<Record<string, number>>(Object.fromEntries(COURSES.map((c) => [c.id, c.done])));
  const pct = (c: (typeof COURSES)[number]) => Math.round(((completed[c.id] ?? 0) / c.m) * 100);
  const lessons = useMemo(() => Array.from({ length: course.m }, (_, k) => `Module ${k + 1}: ${["Getting started", "Core concepts", "Working with data", "Visualisation", "Case study", "Quiz", "Applied project", "Review", "Advanced topics", "Final assessment"][k]}`), [course]);
  return (
    <DemoFrame accent="#2563eb">
      <AppShell
        brand="LearnPath"
        logo="◆"
        user="Maya Tremblay"
        active={tab}
        onNav={setTab}
        nav={[
          { id: "dash", label: "My learning" },
          { id: "cal", label: "Calendar" },
          { id: "grades", label: "Grades" },
          { id: "msgs", label: "Messages" },
        ]}
      >
        <p className="d-muted text-[12px]">Northbridge College · Continuing Education · Toronto</p>
        <h3 className="text-xl font-bold">Welcome back, Maya</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {COURSES.map((c) => (
            <button key={c.id} type="button" onClick={() => setCourse(c)} className={`d-card rounded-xl p-4 text-left ${course.id === c.id ? "ring-2 ring-[#2563eb]" : ""}`}>
              <span className="block h-1.5 w-10 rounded-full" style={{ background: c.colour }} />
              <span className="mt-3 block text-[14px] font-semibold">{c.t}</span>
              <span className="d-muted mt-1 block text-[12px]">
                {completed[c.id]} of {c.m} modules · {pct(c)}%
              </span>
              <Progress value={pct(c)} className="mt-3" />
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card title={course.t} action={<Badge tone={pct(course) === 100 ? "good" : "accent"}>{pct(course) === 100 ? "Completed" : "In progress"}</Badge>}>
            <ol className="space-y-1.5">
              {lessons.map((l, k) => {
                const isDone = k < (completed[course.id] ?? 0);
                const isNext = k === (completed[course.id] ?? 0);
                return (
                  <li key={l} className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-[13px]">
                    <span className="flex items-center gap-2">
                      <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${isDone ? "bg-emerald-500 text-white" : "d-badge"}`}>{isDone ? "✓" : k + 1}</span>
                      {l}
                    </span>
                    {isNext ? (
                      <Btn onClick={() => setCompleted((c) => ({ ...c, [course.id]: Math.min(course.m, (c[course.id] ?? 0) + 1) }))}>Mark complete</Btn>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </Card>
          <div className="space-y-4">
            <Card title="Study time (hours)">
              <Line data={[2, 3.5, 1.5, 4, 3, 5, 4.5]} />
              <p className="d-muted mt-1 text-[11px]">Last 7 days</p>
            </Card>
            <Card title="Upcoming">
              <ul className="space-y-2 text-[13px]">
                <li className="flex justify-between">
                  <span>Data Analysis — Quiz 3</span>
                  <Badge tone="warn">Fri</Badge>
                </li>
                <li className="flex justify-between">
                  <span>PM Foundations — Live session</span>
                  <Badge>Mon 6:30 pm</Badge>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </AppShell>
    </DemoFrame>
  );
}
