"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { FieldDef } from "@/lib/cms/blocks";

/**
 * Schema-driven editor for a CMS page block. Renders inputs for each field and a repeatable
 * editor for lists; the whole value is posted as JSON in a hidden `data` field.
 */
type Value = Record<string, unknown>;
type Row = Record<string, string>;

const inputCls =
  "admin-input w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[14px] text-fg outline-none transition placeholder:text-fg-subtle focus:border-[#0878d1] focus:ring-2 focus:ring-[#0878d1]/15";

function ListField({ field, rows, onChange }: { field: Extract<FieldDef, { type: "list" }>; rows: Row[]; onChange: (rows: Row[]) => void }) {
  const update = (i: number, key: string, v: string) => onChange(rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const single = field.fields.length === 1;
  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="rounded-xl border border-line bg-surface-2 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-fg-subtle">
              {field.itemLabel} {i + 1}
            </span>
            <span className="flex items-center gap-1">
              <button type="button" aria-label="Move up" onClick={() => move(i, -1)} disabled={i === 0} className="grid h-7 w-7 place-items-center rounded-lg border border-line bg-surface text-fg-muted disabled:opacity-30">
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button type="button" aria-label="Move down" onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="grid h-7 w-7 place-items-center rounded-lg border border-line bg-surface text-fg-muted disabled:opacity-30">
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button type="button" aria-label="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="grid h-7 w-7 place-items-center rounded-lg border border-rose-500/30 bg-surface text-rose-600 dark:text-rose-300">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </span>
          </div>
          <div className={single ? "" : "grid gap-2 sm:grid-cols-2"}>
            {field.fields.map((f) => (
              <label key={f.key} className={`block ${f.type === "textarea" && !single ? "sm:col-span-2" : ""}`}>
                {!single ? <span className="mb-1 block text-[12px] font-medium text-fg-muted">{f.label}</span> : null}
                {f.type === "textarea" ? (
                  <textarea value={row[f.key] ?? ""} onChange={(e) => update(i, f.key, e.target.value)} rows={f.key === "body" ? 6 : 3} className={inputCls} />
                ) : (
                  <input value={row[f.key] ?? ""} onChange={(e) => update(i, f.key, e.target.value)} className={inputCls} />
                )}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, Object.fromEntries(field.fields.map((f) => [f.key, ""]))])}
        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[#0878d1]/50 px-3.5 py-2 text-[13px] font-semibold text-[#0878d1] hover:bg-[#0878d1]/[0.06] dark:text-[#7cc6ff]"
      >
        <Plus className="h-4 w-4" /> Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

export default function BlockEditor({ fields, initial }: { fields: FieldDef[]; initial: Value }) {
  const [value, setValue] = useState<Value>(initial);
  const set = (k: string, v: unknown) => setValue((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-5">
      <input type="hidden" name="data" value={JSON.stringify(value)} />
      {fields.map((f) => (
        <div key={f.key} className="space-y-1.5">
          <label className="block text-[13px] font-semibold text-fg">{f.label}</label>
          {f.hint ? <p className="text-[12px] leading-relaxed text-fg-subtle">{f.hint}</p> : null}
          {f.type === "list" ? (
            <ListField field={f} rows={(value[f.key] as Row[]) ?? []} onChange={(rows) => set(f.key, rows)} />
          ) : f.type === "textarea" || f.type === "paragraphs" ? (
            <textarea value={String(value[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} rows={3} className={inputCls} />
          ) : (
            <input type={f.type === "url" ? "url" : "text"} value={String(value[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} className={inputCls} />
          )}
        </div>
      ))}
    </div>
  );
}
