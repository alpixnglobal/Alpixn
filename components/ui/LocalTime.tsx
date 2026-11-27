"use client";

import { useSyncExternalStore } from "react";

/** Live local time for an IANA zone. Renders "--:--" on the server to avoid hydration mismatch. */
function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 20_000);
  return () => window.clearInterval(id);
}

export function formatZoneTime(zone: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: zone }).format(new Date());
  } catch {
    return "--:--";
  }
}

export function isWorkingHours(zone: string) {
  const hour = Number(formatZoneTime(zone).slice(0, 2));
  return hour >= 9 && hour < 19;
}

export default function LocalTime({ zone, className = "", showStatus = false, statusOnly = false }: { zone: string; className?: string; showStatus?: boolean; statusOnly?: boolean }) {
  const time = useSyncExternalStore(subscribe, () => formatZoneTime(zone), () => "--:--");
  const open = useSyncExternalStore(subscribe, () => isWorkingHours(zone), () => false);
  return (
    <span className={className}>
      {statusOnly ? null : <span className="tabular-nums">{time}</span>}
      {(showStatus || statusOnly) && time !== "--:--" ? (
        <span className={`${statusOnly ? "" : "ml-2 "}inline-flex items-center gap-1 text-[11px] font-semibold ${open ? "text-[#17803a] dark:text-[#5ee39a]" : "text-fg-subtle"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-[#28c840]" : "bg-fg-subtle"}`} />
          {open ? "Working hours" : "After hours"}
        </span>
      ) : null}
    </span>
  );
}

