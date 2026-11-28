"use client";

import { MessageCircle } from "lucide-react";
import { openAssistant } from "./Assistant";

/** Opens the website assistant, optionally starting with a service. */
export default function EstimateButton({ service, label = "Get an estimate", variant = "gold", className = "" }: { service?: string; label?: string; variant?: "gold" | "ghost"; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openAssistant(service)}
      className={`${variant === "gold" ? "btn-brand" : "btn-ghost-brand"} inline-flex items-center gap-2 ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}
