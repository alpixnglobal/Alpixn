"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Sequence } from "@/lib/sales/settings";

const input = "admin-input w-full rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[13px] text-fg outline-none focus:border-[#0878d1]";

/** Edit email sequences: each step has a delay and an instruction the AI follows. Posted as JSON in `sequences`. */
export function SequencesEditor({ initial }: { initial: Sequence[] }) {
  const [seqs, setSeqs] = useState<Sequence[]>(initial);
  const set = (i: number, s: Sequence) => setSeqs(seqs.map((x, j) => (j === i ? s : x)));
  return (
    <div className="space-y-4">
      <textarea readOnly hidden name="sequences" value={JSON.stringify(seqs)} />
      {seqs.map((s, i) => (
        <div key={s.id} className="rounded-2xl border border-line bg-canvas p-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={input} value={s.name} onChange={(e) => set(i, { ...s, name: e.target.value })} placeholder="Sequence name" />
            <input className={input} value={s.description} onChange={(e) => set(i, { ...s, description: e.target.value })} placeholder="When to use it" />
          </div>
          <ol className="mt-3 space-y-2">
            {s.steps.map((st, k) => (
              <li key={k} className="grid gap-2 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-start">
                <label className="text-[11.5px] text-fg-muted">
                  Email {k + 1} after
                  <span className="mt-1 flex items-center gap-1">
                    <input className={input} type="number" min={0} max={60} value={st.delayDays} onChange={(e) => set(i, { ...s, steps: s.steps.map((x, j) => (j === k ? { ...x, delayDays: Number(e.target.value) || 0 } : x)) })} />
                    days
                  </span>
                </label>
                <textarea className={`${input} min-h-16`} value={st.instruction} onChange={(e) => set(i, { ...s, steps: s.steps.map((x, j) => (j === k ? { ...x, instruction: e.target.value } : x)) })} placeholder="What this email should do" />
                <button type="button" aria-label="Remove step" onClick={() => set(i, { ...s, steps: s.steps.filter((_, j) => j !== k) })} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-red-500">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap justify-between gap-2">
            <button type="button" onClick={() => set(i, { ...s, steps: [...s.steps, { delayDays: 3, instruction: "" }] })} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[12.5px] font-semibold text-fg">
              <Plus className="h-3.5 w-3.5" /> Add email
            </button>
            <button type="button" onClick={() => setSeqs(seqs.filter((_, j) => j !== i))} className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-red-500">
              <Trash2 className="h-3.5 w-3.5" /> Remove sequence
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setSeqs([...seqs, { id: `seq-${Date.now().toString(36)}`, name: "New sequence", description: "", steps: [{ delayDays: 0, instruction: "" }] }])}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-line px-4 py-2.5 text-[13px] font-semibold text-fg"
      >
        <Plus className="h-4 w-4" /> Add sequence
      </button>
    </div>
  );
}
