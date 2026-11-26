"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  pendingLabel?: string;
  variant?: "primary" | "secondary" | "danger";
};

const variantClassNames: Record<NonNullable<SubmitButtonProps["variant"]>, string> = {
  primary:
    "bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:bg-cyan-400/60 disabled:text-slate-950/70",
  secondary:
    "border border-white/12 bg-black/5 dark:bg-black/5 dark:bg-white/6 text-slate-100 hover:bg-black/5 dark:bg-black/5 dark:bg-white/10 disabled:border-white/8 disabled:text-slate-500 dark:text-slate-500 dark:text-slate-400",
  danger:
    "bg-rose-500 text-[#00070e] dark:text-[#00070e] dark:text-white hover:bg-rose-400 disabled:bg-rose-500/60 disabled:text-[#00070e] dark:text-[#00070e] dark:text-white/70",
};

export function SubmitButton({
  label,
  pendingLabel = "Saving...",
  variant = "primary",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed ${variantClassNames[variant]}`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
