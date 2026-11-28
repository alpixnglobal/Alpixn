"use client";

import { useEffect, useRef } from "react";

/**
 * Invisible spam protection for website forms:
 * - a honeypot field people never see (bots fill it in),
 * - the time the form was opened (bots submit within a second or two).
 * The visible CAPTCHA is <Captcha />, placed next to the submit button.
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
    </>
  );
}
