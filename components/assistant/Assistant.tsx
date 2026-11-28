"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, Minus, Phone, RotateCcw, Send, Sparkles, X } from "lucide-react";
import RobotAvatar from "./RobotAvatar";
import { formatINR, type PricingCatalog } from "@/lib/pricing/catalog";
import { computeEstimate, rangeLabel, type Estimate, type EstimateSelection } from "@/lib/pricing/estimate";

/* ---------------- types ---------------- */

type Lead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  service: string;
  projectDetails: string;
  features: string[];
  thirdPartyApis: string[];
  domainHosting: string;
  references: string;
  budget: string;
  timeline: string;
};

const EMPTY: Lead = { name: "", email: "", phone: "", company: "", country: "", service: "", projectDetails: "", features: [], thirdPartyApis: [], domainHosting: "", references: "", budget: "", timeline: "" };

type Msg = { role: "user" | "assistant"; text: string; estimate?: Estimate };

type Step = "service" | "details" | "tier" | "features" | "apis" | "domain" | "references" | "budget" | "timeline" | "contact" | "done";

type State = {
  sessionId: string;
  mode: "ai" | "guided";
  messages: Msg[];
  lead: Lead;
  step: Step;
  categoryId: string;
  packageId: string;
  addOnIds: string[];
  extraSelections: EstimateSelection[];
  chips: string[];
};

export type AssistantConfig = { name: string; greeting: string; mode: "auto" | "guided" | "ai" };

const BUDGETS: { label: string; max: number }[] = [
  { label: "Under ₹25,000", max: 25000 },
  { label: "₹25,000 – ₹1 lakh", max: 100000 },
  { label: "₹1 – 5 lakh", max: 500000 },
  { label: "₹5 – 20 lakh", max: 2000000 },
  { label: "₹20 lakh+", max: Number.POSITIVE_INFINITY },
  { label: "Not sure yet", max: 0 },
];
const TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "3–6 months", "Flexible"];
const APIS = ["Payment gateway", "WhatsApp", "CRM / ERP", "Google Maps", "SMS / Email", "AI (ChatGPT / Claude)", "Astrology / numerology API", "None", "Not sure"];
const DOMAIN = ["I already have domain & hosting", "I need domain + hosting", "Not sure"];
const STORAGE_KEY = "alpixn-assistant-v2";
/** Services where integration / hosting questions don't apply. */
const NO_TECH_QUESTIONS = ["branding", "social-media", "products", "dedicated-team", "ai-consulting", "ui-ux", "third-party"];
const OPEN_EVENT = "alpixn:open-assistant";

/** Opens the floating assistant from anywhere (e.g. a "Get an estimate" button). */
export function openAssistant(service?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { service } }));
}

function newSession(config: AssistantConfig): State {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return {
    sessionId: id,
    mode: config.mode === "guided" ? "guided" : "ai",
    messages: [{ role: "assistant", text: config.greeting }],
    lead: EMPTY,
    step: "service",
    categoryId: "",
    packageId: "",
    addOnIds: [],
    extraSelections: [],
    chips: [],
  };
}

/* ---------------- estimate card ---------------- */

function EstimateCard({ estimate }: { estimate: Estimate }) {
  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-[#d99a19]/40 bg-surface text-[13px]">
      <div className="bg-[linear-gradient(135deg,#071a33,#064a87)] px-3.5 py-2.5 text-white">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#f6d77a]">Estimated budget</p>
        {estimate.totals.map((t) => (
          <p key={t.billing} className="font-display text-[17px] font-bold">
            {rangeLabel(t.low, t.high, t.billing)}
          </p>
        ))}
      </div>
      <ul className="space-y-1 px-3.5 py-2.5">
        {estimate.lines.map((l, i) => (
          <li key={i} className="flex justify-between gap-3 text-fg-muted">
            <span>{l.label}</span>
            <span className="shrink-0 font-semibold text-fg">{rangeLabel(l.low, l.high, l.billing)}</span>
          </li>
        ))}
        {estimate.recurringNotes.map((n, i) => (
          <li key={`n${i}`} className="text-[12px] text-fg-subtle">
            + {n}
          </li>
        ))}
      </ul>
      <p className="border-t border-line bg-[#f6d77a]/15 px-3.5 py-2 text-[11.5px] leading-snug text-fg-muted">
        This is an estimate from our assistant, <strong className="text-fg">not a final quote</strong>. GST extra. Our team will review your requirements and confirm the price — it may go up or down.
      </p>
    </div>
  );
}

/* ---------------- main component ---------------- */

export default function Assistant({ catalog, config }: { catalog: PricingCatalog; config: AssistantConfig }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [state, setState] = useState<State>(() => newSession(config));
  const [input, setInput] = useState("");
  const [multi, setMulti] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [contact, setContact] = useState({ name: "", phone: "", email: "", company: "" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  const categories = catalog.categories.filter((c) => c.id !== "third-party");

  /* restore / persist conversation across pages */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as State;
        if (parsed?.sessionId && Array.isArray(parsed.messages)) setTimeout(() => setState(parsed), 0);
      }
    } catch {
      /* storage unavailable */
    }
    hydrated.current = true;
    const t = setTimeout(() => {
      try {
        if (!localStorage.getItem("alpixn-assistant-teaser")) setTeaser(true);
      } catch {
        setTeaser(true);
      }
    }, 7000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [state.messages, busy, open]);

  /* ---------- guided flow ---------- */

  const ask = useCallback(
    (s: State, step: Step, text: string, chips: string[] = []): State => ({ ...s, step, chips, messages: [...s.messages, { role: "assistant", text }] }),
    []
  );

  const guidedPrompt = useCallback(
    (s: State, step: Step): State => {
      const cat = catalog.categories.find((c) => c.id === s.categoryId);
      switch (step) {
        case "service":
          return ask(s, "service", "Which service are you interested in?", categories.map((c) => c.name));
        case "details":
          return ask(s, "details", `Great choice! Tell me a little about your business and what you want the ${cat?.name.toLowerCase() ?? "project"} to do — goals, must-have features, number of pages/screens or users. (Type your answer or skip.)`, ["Skip"]);
        case "tier":
          return ask(
            s,
            "tier",
            "Which of these sounds closest to what you need?",
            [...(cat?.packages ?? []).map((p) => `${p.name} — ${p.priceFrom || p.priceTo ? `from ${formatINR(p.priceFrom)}` : p.priceNote || "on request"}`), "Not sure — suggest one"]
          );
        case "features":
          return cat?.addOns.length ? ask(s, "features", "Any extras you'd like? Select all that apply, then tap Continue.", cat.addOns.map((a) => a.name)) : guidedPrompt(s, "apis");
        case "apis":
          if (NO_TECH_QUESTIONS.includes(s.categoryId)) return guidedPrompt(s, "references");
          return ask(s, "apis", "Will you need any third-party services or integrations? (Select all that apply.)", APIS);
        case "domain":
          if (NO_TECH_QUESTIONS.includes(s.categoryId) || s.categoryId === "hosting") return guidedPrompt(s, "references");
          return ask(s, "domain", "Do you already have a domain and hosting?", DOMAIN);
        case "references":
          return ask(s, "references", "Do you have reference websites, apps or a design style you like? Paste links or describe it — or skip.", ["Skip"]);
        case "budget":
          return ask(s, "budget", "What budget range do you have in mind? We work with every budget and can plan in phases.", BUDGETS.map((b) => b.label));
        case "timeline":
          return ask(s, "timeline", "When would you like to launch?", TIMELINES);
        case "contact":
          return ask(s, "contact", "Almost done! Where can our team reach you? Your estimate appears right after.");
        default:
          return s;
      }
    },
    [ask, catalog.categories, categories]
  );

  const finishGuided = useCallback(
    async (s: State) => {
      const selections: EstimateSelection[] = [...s.extraSelections, { packageId: s.packageId, addOnIds: s.addOnIds }];
      if (s.lead.domainHosting.startsWith("I need")) {
        const hosting = ["web-starter", "web-business", "astro-site"].includes(s.packageId) ? "host-basic" : "host-cloud";
        selections.push({ packageId: hosting, addOnIds: ["host-domain-com"] });
      }
      const estimate = computeEstimate(catalog, selections);
      const budgetMax = BUDGETS.find((b) => b.label === s.lead.budget)?.max ?? 0;
      const oneTime = estimate.totals.find((t) => t.billing === "one-time");
      const fit =
        budgetMax && oneTime && oneTime.low > budgetMax
          ? " Your budget is a little below this range — no problem: we can start with a smaller first phase or a starter package and grow from there."
          : "";
      const apis = s.lead.thirdPartyApis.filter((a) => !["None", "Not sure"].includes(a));
      const priced = estimate.lines.length > 0;
      const text = priced
        ? `Thanks ${s.lead.name.split(" ")[0]}! Based on what you shared, here is an estimated budget.${fit}${apis.length ? ` Third-party charges (${apis.join(", ")}) are billed at actuals.` : ""} Our team will contact you shortly to discuss details.`
        : `Thanks ${s.lead.name.split(" ")[0]}! Pricing for this depends on your users and usage, so our team will share the plans with a quick demo. We'll contact you shortly.`;
      const next: State = { ...s, step: "done", chips: ["Add another service", "Start over"], messages: [...s.messages, { role: "assistant", text, ...(priced ? { estimate } : {}) }] };
      setState(next);
      try {
        await fetch("/api/assistant/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: s.sessionId, lead: s.lead, transcript: next.messages.map((m) => ({ role: m.role, text: m.text })), selections, pagePath: pathname }),
        });
      } catch {
        /* lead stays visible to the user; team can still be contacted */
      }
    },
    [catalog, pathname]
  );

  const answerGuided = useCallback(
    (s: State, answer: string, values?: string[]) => {
      let next: State = { ...s, chips: [], messages: [...s.messages, { role: "user", text: answer }] };
      const cat = catalog.categories.find((c) => c.id === s.categoryId);
      switch (s.step) {
        case "service": {
          const c = categories.find((x) => x.name.toLowerCase() === answer.toLowerCase()) ?? categories.find((x) => answer.toLowerCase().includes(x.name.split(" ")[0].toLowerCase()));
          if (!c) return setState(ask(next, "service", "Please choose one of these services:", categories.map((x) => x.name)));
          next = { ...next, categoryId: c.id, packageId: "", addOnIds: [], lead: { ...next.lead, service: [s.lead.service, c.name].filter(Boolean).join(" + ") } };
          return setState(guidedPrompt(next, "details"));
        }
        case "details":
          next = { ...next, lead: { ...next.lead, projectDetails: answer === "Skip" ? next.lead.projectDetails : [next.lead.projectDetails, answer].filter(Boolean).join("\n") } };
          return setState(guidedPrompt(next, "tier"));
        case "tier": {
          const p = cat?.packages.find((x) => answer.startsWith(x.name));
          next = { ...next, packageId: p?.id ?? "" };
          return setState(guidedPrompt(next, "features"));
        }
        case "features": {
          const ids = (cat?.addOns ?? []).filter((a) => (values ?? []).includes(a.name)).map((a) => a.id);
          next = { ...next, addOnIds: ids, lead: { ...next.lead, features: [...next.lead.features, ...(values ?? [])] } };
          return setState(guidedPrompt(next, "apis"));
        }
        case "apis":
          next = { ...next, lead: { ...next.lead, thirdPartyApis: values?.length ? values : [answer] } };
          return setState(guidedPrompt(next, "domain"));
        case "domain":
          next = { ...next, lead: { ...next.lead, domainHosting: answer } };
          return setState(guidedPrompt(next, "references"));
        case "references":
          next = { ...next, lead: { ...next.lead, references: answer === "Skip" ? "" : answer } };
          return setState(guidedPrompt(next, "budget"));
        case "budget": {
          next = { ...next, lead: { ...next.lead, budget: answer } };
          if (!next.packageId && cat) {
            // "Not sure": pick the largest package that fits the budget, else the starter.
            const max = BUDGETS.find((b) => b.label === answer)?.max || 0;
            const fit = [...cat.packages].reverse().find((p) => max && p.priceFrom <= max) ?? cat.packages[max ? 0 : 1] ?? cat.packages[0];
            next = { ...next, packageId: fit.id };
          }
          return setState(guidedPrompt(next, "timeline"));
        }
        case "timeline":
          next = { ...next, lead: { ...next.lead, timeline: answer } };
          if (next.lead.name && (next.lead.phone || next.lead.email)) return void finishGuided(next);
          return setState(guidedPrompt(next, "contact"));
        case "done":
          if (answer === "Start over") return setState(guidedPrompt({ ...newSession(config), mode: "guided", messages: [{ role: "assistant", text: config.greeting }] }, "service"));
          if (answer === "Add another service") {
            next = { ...next, extraSelections: [...next.extraSelections, { packageId: next.packageId, addOnIds: next.addOnIds }], categoryId: "", packageId: "", addOnIds: [] };
            return setState(guidedPrompt(next, "service"));
          }
          next = { ...next, lead: { ...next.lead, projectDetails: [next.lead.projectDetails, answer].filter(Boolean).join("\n") } };
          return setState(ask(next, "done", "Thanks — I've added that to your request. Our team will take it into account.", ["Add another service", "Start over"]));
        default:
          return setState(next);
      }
    },
    [ask, catalog.categories, categories, config, finishGuided, guidedPrompt]
  );

  /* ---------- AI flow ---------- */

  const sendAi = useCallback(
    async (s: State, text: string) => {
      const withUser: State = { ...s, chips: [], messages: [...s.messages, { role: "user", text }] };
      setState(withUser);
      setBusy(true);
      try {
        const res = await fetch("/api/assistant/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: s.sessionId, transcript: withUser.messages.map((m) => ({ role: m.role, text: m.text })), lead: s.lead, pagePath: pathname }),
        });
        if (res.status === 409) {
          // No AI provider: continue with guided questions, using what the visitor typed.
          const guided: State = { ...withUser, mode: "guided" };
          const c = categories.find((x) => text.toLowerCase().includes(x.name.split(" ")[0].toLowerCase()));
          if (c) {
            const isJustName = text.trim().toLowerCase() === c.name.toLowerCase();
            setState(guidedPrompt({ ...guided, categoryId: c.id, lead: { ...guided.lead, service: c.name, projectDetails: isJustName ? "" : text } }, "details"));
          } else {
            setState(guidedPrompt({ ...guided, lead: { ...guided.lead, projectDetails: text } }, "service"));
          }
          return;
        }
        const data = (await res.json()) as { reply?: string; quickReplies?: string[]; lead?: Lead; estimate?: Estimate | null; error?: string };
        if (!res.ok || !data.reply) throw new Error(data.error || "error");
        setState((cur) => ({
          ...cur,
          lead: data.lead ?? cur.lead,
          chips: data.quickReplies ?? [],
          messages: [...cur.messages, { role: "assistant", text: data.reply!, ...(data.estimate ? { estimate: data.estimate } : {}) }],
        }));
      } catch (e) {
        setState((cur) => ({
          ...cur,
          messages: [...cur.messages, { role: "assistant", text: e instanceof Error && e.message !== "error" ? e.message : "Sorry, I couldn't reply just now. Please try again, or reach us at info@alpixn.com / +91 7291031315." }],
        }));
      } finally {
        setBusy(false);
      }
    },
    [categories, guidedPrompt, pathname]
  );

  /* ---------- input handlers ---------- */

  const submit = (text: string, values?: string[]) => {
    const t = text.trim();
    if (!t || busy) return;
    setInput("");
    setMulti([]);
    if (state.mode === "ai") return void sendAi(state, t);
    answerGuided(state, t, values);
  };

  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    const okPhone = contact.phone.replace(/\D/g, "").length >= 7;
    const okEmail = /^\S+@\S+\.\S+$/.test(contact.email);
    if (!contact.name.trim() || (!okPhone && !okEmail)) return;
    const s: State = {
      ...state,
      lead: { ...state.lead, name: contact.name.trim(), phone: contact.phone.trim(), email: contact.email.trim(), company: contact.company.trim() },
      messages: [...state.messages, { role: "user", text: `${contact.name}${contact.phone ? ` · ${contact.phone}` : ""}${contact.email ? ` · ${contact.email}` : ""}` }],
    };
    void finishGuided(s);
  };

  /* ---------- open from other components ---------- */

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      setTeaser(false);
      const service = (e as CustomEvent<{ service?: string }>).detail?.service;
      if (!service) return;
      setState((cur) => {
        if (cur.messages.length > 1) return cur;
        if (cur.mode === "ai") {
          setTimeout(() => void sendAi(cur, `I'm interested in ${service}.`), 0);
          return cur;
        }
        const c = categories.find((x) => x.name === service);
        return c ? guidedPrompt({ ...cur, categoryId: c.id, lead: { ...cur.lead, service: c.name }, messages: [...cur.messages, { role: "user", text: c.name }] }, "details") : cur;
      });
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, [categories, guidedPrompt, sendAi]);

  /* first guided question when the panel opens */
  useEffect(() => {
    if (open && state.mode === "guided" && state.messages.length === 1 && !state.chips.length) setTimeout(() => setState((cur) => guidedPrompt(cur, "service")), 0);
  }, [open, state.mode, state.messages.length, state.chips.length, guidedPrompt]);

  const chips = useMemo(() => (state.mode === "ai" && state.messages.length === 1 ? categories.slice(0, 6).map((c) => c.name) : state.chips), [state, categories]);
  const isMulti = state.mode === "guided" && (state.step === "features" || state.step === "apis");

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      localStorage.setItem("alpixn-assistant-teaser", "1");
    } catch {
      /* ignore */
    }
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Launcher */}
      {!open ? (
        <div className="fixed bottom-5 right-5 z-[60] flex items-end gap-3 print:hidden">
          {teaser ? (
            <div className="relative mb-2 hidden max-w-[220px] rounded-2xl border border-line bg-surface px-4 py-3 text-[13px] text-fg shadow-[0_20px_40px_-20px_rgba(7,26,51,0.5)] sm:block">
              <button aria-label="Dismiss" onClick={dismissTeaser} className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full text-fg-subtle hover:text-fg">
                <X className="h-3 w-3" />
              </button>
              <p className="pr-3 font-semibold">Planning a project?</p>
              <p className="mt-0.5 text-fg-muted">Chat with our robot and get an estimated budget in 2 minutes.</p>
            </div>
          ) : null}
          <button
            onClick={() => {
              setOpen(true);
              dismissTeaser();
            }}
            aria-label={`Chat with ${config.name}`}
            className="group relative grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(145deg,#ffffff,#eef3fb)] shadow-[0_18px_40px_-12px_rgba(7,26,51,0.55)] ring-2 ring-[#d99a19]/70 transition-transform hover:scale-105 dark:bg-[linear-gradient(145deg,#0c2040,#071a33)]"
          >
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#d99a19]/25 [animation-duration:2.8s] motion-reduce:hidden" />
            <RobotAvatar size={44} className="relative assistant-bob" />
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#28c840]" />
          </button>
        </div>
      ) : null}

      {/* Panel */}
      {open ? (
        <section
          role="dialog"
          aria-label={config.name}
          className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-canvas sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(640px,calc(100vh-40px))] sm:w-[390px] sm:rounded-[28px] sm:border sm:border-line sm:shadow-[0_40px_90px_-30px_rgba(7,26,51,0.65)] print:hidden"
        >
          <header className="flex items-center gap-3 bg-[linear-gradient(135deg,#071a33,#064a87)] px-4 py-3 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
              <RobotAvatar size={34} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[15px] font-bold">{config.name}</p>
              <p className="flex items-center gap-1.5 text-[11.5px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" /> Online · project & budget planner
              </p>
            </div>
            <button aria-label="Start over" title="Start over" onClick={() => setState(newSession(config))} className="grid h-8 w-8 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button aria-label="Minimise" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white">
              <Minus className="h-4 w-4" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {state.messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" ? <RobotAvatar size={26} className="mt-0.5 shrink-0" /> : null}
                <div className={m.role === "user" ? "max-w-[80%]" : "max-w-[85%]"}>
                  <div
                    className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                      m.role === "user" ? "rounded-br-md bg-[linear-gradient(135deg,#0878d1,#064a87)] text-white" : "rounded-bl-md border border-line bg-surface text-fg"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.estimate ? <EstimateCard estimate={m.estimate} /> : null}
                </div>
              </div>
            ))}
            {busy ? (
              <div className="flex items-center gap-2">
                <RobotAvatar size={26} />
                <span className="flex gap-1 rounded-2xl border border-line bg-surface px-3.5 py-3">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0878d1]" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </span>
              </div>
            ) : null}

            {state.mode === "guided" && state.step === "contact" ? (
              <form onSubmit={submitContact} className="ml-8 space-y-2 rounded-2xl border border-line bg-surface p-3">
                {(["name", "phone", "email", "company"] as const).map((f) => (
                  <input
                    key={f}
                    value={contact[f]}
                    onChange={(e) => setContact({ ...contact, [f]: e.target.value })}
                    placeholder={f === "name" ? "Your name *" : f === "phone" ? "Phone / WhatsApp" : f === "email" ? "Email" : "Company (optional)"}
                    type={f === "email" ? "email" : f === "phone" ? "tel" : "text"}
                    required={f === "name"}
                    className="w-full rounded-xl border border-line bg-canvas px-3 py-2 text-[13.5px] text-fg outline-none focus:border-[#0878d1]"
                  />
                ))}
                <p className="text-[11px] text-fg-subtle">Phone or email is required. We only use it to send your quote.</p>
                <button type="submit" className="btn-brand w-full !py-2 text-[13px]">
                  Show my estimate
                </button>
              </form>
            ) : null}
          </div>

          {/* Quick replies */}
          {chips.length ? (
            <div className="flex max-h-36 flex-wrap gap-1.5 overflow-y-auto border-t border-line bg-surface/60 px-3 py-2.5">
              {chips.map((c) => {
                const on = multi.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => (isMulti ? setMulti((cur) => (on ? cur.filter((x) => x !== c) : [...cur, c])) : submit(c))}
                    className={`rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${on ? "border-[#0878d1] bg-[#0878d1] text-white" : "border-line bg-surface text-fg hover:border-[#d99a19]"}`}
                  >
                    {c}
                  </button>
                );
              })}
              {isMulti ? (
                <button onClick={() => submit(multi.length ? multi.join(", ") : "None", multi)} className="rounded-full bg-[linear-gradient(135deg,#f6d77a,#d99a19)] px-3.5 py-1.5 text-[12.5px] font-bold text-[#071a33]">
                  Continue →
                </button>
              ) : null}
            </div>
          ) : null}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-center gap-2 border-t border-line bg-surface px-3 py-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={state.mode === "guided" && state.step === "contact" ? "Fill in the form above" : "Type your message…"}
              disabled={busy || (state.mode === "guided" && state.step === "contact")}
              maxLength={1000}
              className="min-w-0 flex-1 rounded-full border border-line bg-canvas px-4 py-2.5 text-[13.5px] text-fg outline-none focus:border-[#0878d1] disabled:opacity-60"
            />
            <button type="submit" aria-label="Send" disabled={busy || !input.trim()} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#f6d77a,#d99a19)] text-[#071a33] disabled:opacity-40">
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-4 bg-surface pb-2.5 text-[11px] text-fg-subtle">
            <a href="tel:+917291031315" className="inline-flex items-center gap-1 hover:text-fg">
              <Phone className="h-3 w-3" /> +91 7291031315
            </a>
            <a href="mailto:info@alpixn.com" className="inline-flex items-center gap-1 hover:text-fg">
              <Mail className="h-3 w-3" /> info@alpixn.com
            </a>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> estimates are not final
            </span>
          </div>
        </section>
      ) : null}
    </>
  );
}
