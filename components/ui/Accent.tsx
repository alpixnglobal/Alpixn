import type { ReactNode } from "react";

/** Site-wide heading treatment: dark text with the last words in the logo-colour gradient. */
export default function Accent({ text, words = 2 }: { text: ReactNode; words?: number }) {
  if (typeof text !== "string") return <>{text}</>;
  const parts = text.trim().split(/\s+/);
  if (parts.length <= 1) return <span className="text-brand-spectrum">{text}</span>;
  const n = Math.min(words, parts.length - 1);
  return (
    <>
      {parts.slice(0, -n).join(" ")} <span className="text-brand-spectrum">{parts.slice(-n).join(" ")}</span>
    </>
  );
}
