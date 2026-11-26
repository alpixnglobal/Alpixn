import type { ReactNode } from "react";

export function FormGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 lg:grid-cols-2">{children}</div>;
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3 pt-2">{children}</div>;
}
