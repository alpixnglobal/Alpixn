"use client";

/**
 * Small UI kit shared by ALPIXN concept demos. Demos use their own fictional product branding
 * (accent colour via --d-accent) and a fixed light or dark palette, independent of the site theme,
 * so screenshots are stable.
 */
import type { CSSProperties, ReactNode } from "react";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function DemoFrame({ accent, dark = false, children, className = "" }: { accent: string; dark?: boolean; children: ReactNode; className?: string }) {
  return (
    <div
      data-demo-frame
      className={cx("demo-frame overflow-hidden rounded-2xl border shadow-xl", dark ? "demo-dark" : "demo-light", className)}
      style={{ ["--d-accent" as string]: accent } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function AppShell({
  brand,
  logo,
  nav,
  active,
  onNav,
  user = "Demo user",
  children,
  topRight,
}: {
  brand: string;
  logo: ReactNode;
  nav: { id: string; label: string; icon?: ReactNode }[];
  active: string;
  onNav: (id: string) => void;
  user?: string;
  children: ReactNode;
  topRight?: ReactNode;
}) {
  return (
    <div className="flex min-h-[640px] flex-col md:flex-row">
      <aside className="d-sidebar flex shrink-0 items-center gap-2 overflow-x-auto px-3 py-3 md:w-56 md:flex-col md:items-stretch md:gap-1 md:px-3 md:py-5">
        <div className="mr-3 flex items-center gap-2 px-2 md:mb-6 md:mr-0">
          <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: "var(--d-accent)" }}>
            {logo}
          </span>
          <span className="whitespace-nowrap text-[15px] font-bold tracking-tight">{brand}</span>
        </div>
        {nav.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => onNav(n.id)}
            className={cx("d-nav flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium", active === n.id && "d-nav-active")}
            aria-current={active === n.id ? "page" : undefined}
          >
            {n.icon}
            <span className="whitespace-nowrap">{n.label}</span>
          </button>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="d-topbar flex items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="d-search hidden items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] sm:flex">
            <span aria-hidden>⌕</span> Search…
          </div>
          <div className="ml-auto flex items-center gap-3">
            {topRight}
            <span className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: "var(--d-accent)" }}>
              {user
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        </header>
        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export function Card({ title, action, children, className = "" }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cx("d-card rounded-xl p-4", className)}>
      {title ? (
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-[13px] font-semibold">{title}</h3>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Stat({ label, value, delta, tone = "neutral" }: { label: string; value: ReactNode; delta?: string; tone?: "up" | "down" | "neutral" }) {
  return (
    <div className="d-card rounded-xl p-4">
      <p className="d-muted text-[11px] font-medium uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      {delta ? <p className={cx("mt-1 text-[11px] font-medium", tone === "up" ? "text-emerald-600" : tone === "down" ? "text-rose-600" : "d-muted")}>{delta}</p> : null}
    </div>
  );
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "good" | "warn" | "bad" | "accent" }) {
  const map = {
    neutral: "d-badge",
    good: "bg-emerald-500/15 text-emerald-700 dark-text-emerald",
    warn: "bg-amber-500/15 text-amber-700 dark-text-amber",
    bad: "bg-rose-500/15 text-rose-700 dark-text-rose",
    accent: "d-badge-accent",
  } as const;
  return <span className={cx("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold", map[tone])}>{children}</span>;
}

export function Btn({ children, onClick, variant = "primary", type = "button", disabled, className = "" }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "ghost"; type?: "button" | "submit"; disabled?: boolean; className?: string }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" ? "text-white hover:brightness-110" : "d-btn-ghost",
        className
      )}
      style={variant === "primary" ? { background: "var(--d-accent)" } : undefined}
    >
      {children}
    </button>
  );
}

export function Bars({ data, height = 120, labels }: { data: number[]; height?: number; labels?: string[] }) {
  const max = Math.max(...data, 1);
  return (
    <div>
      <div className="flex items-end gap-1.5" style={{ height }}>
        {data.map((v, i) => (
          <div key={i} className="flex-1 rounded-t-md" style={{ height: `${(v / max) * 100}%`, background: "var(--d-accent)", opacity: 0.35 + (v / max) * 0.65 }} title={String(v)} />
        ))}
      </div>
      {labels ? (
        <div className="mt-1.5 flex gap-1.5">
          {labels.map((l) => (
            <span key={l} className="d-muted flex-1 text-center text-[10px]">
              {l}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Line({ data, height = 90, fill = true }: { data: number[]; height?: number; fill?: boolean }) {
  const w = 300;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, height - ((v - min) / (max - min || 1)) * (height - 10) - 5]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none" aria-hidden>
      {fill ? <path d={`${d} L${w} ${height} L0 ${height} Z`} fill="var(--d-accent)" opacity="0.12" /> : null}
      <path d={d} fill="none" stroke="var(--d-accent)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Progress({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={cx("d-track h-2 overflow-hidden rounded-full", className)}>
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: "var(--d-accent)" }} />
    </div>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-[12.5px]">
        <thead>
          <tr className="d-muted">
            {head.map((h) => (
              <th key={h} className="d-row whitespace-nowrap px-2 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="d-row">
              {r.map((c, j) => (
                <td key={j} className="whitespace-nowrap px-2 py-2.5">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="d-muted mb-1 block text-[11px] font-medium">{label}</span>
      {children}
    </label>
  );
}

export const inputCls = "d-input w-full rounded-lg px-3 py-2 text-[13px] outline-none";

export function Phone({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="mx-auto w-full max-w-[380px]" aria-label={label}>
      <div className="rounded-[2.4rem] border-[10px] border-[#0b0f17] bg-[#0b0f17] shadow-2xl">
        <div className="relative overflow-hidden rounded-[1.8rem]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0b0f17]" aria-hidden />
          {children}
        </div>
      </div>
    </div>
  );
}

export function money(value: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: currency === "JPY" ? 0 : 0 }).format(value);
}
