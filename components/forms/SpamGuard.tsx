"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Invisible spam protection for website forms:
 * - a honeypot field people never see (bots fill it in),
 * - the time the form was opened (bots submit within a second or two),
 * - Cloudflare Turnstile when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 */
export default function SpamGuard() {
  const started = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (started.current) started.current.value = String(Date.now());
  }, []);
  return (
    <>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company website (leave empty)
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input ref={started} type="hidden" name="form_started" defaultValue="" />
      {SITE_KEY ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={SITE_KEY} data-size="flexible" data-theme="auto" />
        </>
      ) : null}
    </>
  );
}
