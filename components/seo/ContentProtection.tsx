"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Light content protection for public pages (copying can never be fully prevented — anything a
 * browser shows can be captured — but this discourages casual copying and credits ALPIXN):
 * - adds "Source: <page URL>" to copied text longer than 120 characters,
 * - blocks right-click / drag on images,
 * - optionally disables text selection.
 * Form fields are never affected.
 */
export default function ContentProtection({ copyAttribution, protectImages, disableSelection }: { copyAttribution: boolean; protectImages: boolean; disableSelection: boolean }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const isField = (t: EventTarget | null) => t instanceof HTMLElement && !!t.closest("input, textarea, select, [contenteditable=true]");

    const onCopy = (e: ClipboardEvent) => {
      if (!copyAttribution || isField(e.target)) return;
      const text = window.getSelection()?.toString() ?? "";
      if (text.length < 120 || !e.clipboardData) return;
      e.clipboardData.setData("text/plain", `${text}\n\nSource: ${window.location.origin}${window.location.pathname} — © ALPIXN`);
      e.preventDefault();
    };
    const onContext = (e: MouseEvent) => {
      if (protectImages && e.target instanceof HTMLElement && (e.target.tagName === "IMG" || e.target.tagName === "VIDEO" || e.target.closest("picture"))) e.preventDefault();
    };
    const onDrag = (e: DragEvent) => {
      if (protectImages && e.target instanceof HTMLElement && (e.target.tagName === "IMG" || e.target.tagName === "VIDEO")) e.preventDefault();
    };

    document.addEventListener("copy", onCopy);
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDrag);
    if (disableSelection) document.body.classList.add("no-select");
    return () => {
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDrag);
      document.body.classList.remove("no-select");
    };
  }, [copyAttribution, protectImages, disableSelection, isAdmin]);

  return null;
}
