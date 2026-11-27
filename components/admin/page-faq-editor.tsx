"use client";

import { useState } from "react";

import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/admin-ui";

type Faq = { question: string; answer: string };

const btn = "w-fit rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition";

function Block({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <details className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">{hint}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">Expand</span>
        </div>
      </summary>
      <div className="mt-5 grid gap-5">{children}</div>
    </details>
  );
}

/** Page-specific FAQs, posted as JSON in the `faqs` field. */
export function PageFaqEditor({ initial }: { initial?: Faq[] }) {
  const [faqs, setFaqs] = useState<Faq[]>(initial ?? []);
  const update = (index: number, patch: Partial<Faq>) => setFaqs((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  return (
    <Block title="Page FAQs" hint="Questions shown at the bottom of this page. Leave empty to show the shared FAQs from settings.">
      <textarea readOnly hidden name="faqs" value={JSON.stringify(faqs)} />
      {faqs.map((faq, index) => (
        <div key={index} className="grid gap-4 rounded-[18px] border border-white/10 bg-[#0f172a]/45 p-4">
          <AdminField label={`Question ${index + 1}`}>
            <AdminInput value={faq.question} onChange={(event) => update(index, { question: event.target.value })} />
          </AdminField>
          <AdminField label="Answer">
            <AdminTextarea value={faq.answer} onChange={(event) => update(index, { answer: event.target.value })} className="min-h-24" />
          </AdminField>
          <button type="button" onClick={() => setFaqs((current) => current.filter((_, i) => i !== index))} className={`${btn} border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/20`}>
            Remove question
          </button>
        </div>
      ))}
      <button type="button" onClick={() => setFaqs((current) => [...current, { question: "", answer: "" }])} className={`${btn} border-white/12 bg-white/6 text-slate-200 hover:bg-white/10`}>
        Add question
      </button>
    </Block>
  );
}

/** Short list items (one per line), posted as JSON under `name`. */
export function LinesEditor({ name, title, hint, initial }: { name: string; title: string; hint: string; initial?: string[] }) {
  const [text, setText] = useState((initial ?? []).join("\n"));
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  return (
    <Block title={title} hint={hint}>
      <textarea readOnly hidden name={name} value={JSON.stringify(lines)} />
      <AdminField label="Items" hint="One item per line">
        <AdminTextarea value={text} onChange={(event) => setText(event.target.value)} className="min-h-28" />
      </AdminField>
    </Block>
  );
}
