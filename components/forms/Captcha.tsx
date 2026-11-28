"use client";

import { useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_ID = "cf-turnstile-script";
const READY_EVENT = "alpixn:turnstile-ready";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

function loadScript() {
  if (document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  s.async = true;
  s.defer = true;
  s.onload = () => window.dispatchEvent(new Event(READY_EVENT));
  document.head.appendChild(s);
}

/**
 * Cloudflare Turnstile CAPTCHA (free, usually invisible: most visitors just see a tick).
 * Renders nothing until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. The widget adds a hidden
 * "cf-turnstile-response" field to the surrounding form, which the server verifies.
 */
export default function Captcha({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!SITE_KEY) return;
    let widgetId: string | undefined;
    const render = () => {
      if (!ref.current || !window.turnstile || widgetId) return;
      widgetId = window.turnstile.render(ref.current, { sitekey: SITE_KEY, theme: "auto", size: "flexible", appearance: "interaction-only" });
    };
    if (window.turnstile) render();
    else {
      window.addEventListener(READY_EVENT, render);
      loadScript();
    }
    return () => {
      window.removeEventListener(READY_EVENT, render);
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);
  if (!SITE_KEY) return null;
  return <div ref={ref} className={className} />;
}
