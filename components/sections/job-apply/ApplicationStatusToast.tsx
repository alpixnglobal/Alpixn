"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplicationStatusToast() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const error = searchParams.get("error");

  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const isSuccess = status === "applied" || status === "sent";
  const successMessage = status === "sent"
    ? { title: "Message Sent!", body: "Thanks for reaching out. We'll get back to you soon." }
    : { title: "Application Submitted!", body: "Your application has been received. We'll be in touch soon." };
  const isError = !!error;

  useEffect(() => {
    if (isSuccess || isError) {
      setVisible(true);
      setLeaving(false);
      const hideTimer = setTimeout(() => {
        setLeaving(true);
      }, 5000);
      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 5400);
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [isSuccess, isError]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex items-start gap-3 rounded-xl px-5 py-4 shadow-2xl border max-w-sm w-full"
      style={{
        background: isSuccess
          ? "linear-gradient(135deg, #003D1F 0%, #001F0F 100%)"
          : "linear-gradient(135deg, #3D0000 0%, #1F0000 100%)",
        borderColor: isSuccess ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)",
        animation: leaving
          ? "toastSlideOut 0.4s ease-in forwards"
          : "toastSlideIn 0.4s ease-out forwards",
      }}
    >
      {/* Icon */}
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{
          background: isSuccess ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
        }}
      >
        {isSuccess ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9.5L7 13.5L15 5" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5 5L13 13M13 5L5 13" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span
          className="text-sm font-semibold"
          style={{ color: isSuccess ? "#22C55E" : "#EF4444" }}
        >
          {isSuccess ? successMessage.title : "Submission Failed"}
        </span>
        <span className="text-xs text-white/70 leading-relaxed">
          {isSuccess
            ? successMessage.body
            : decodeURIComponent(error ?? "Something went wrong. Please try again.")}
        </span>
      </div>

      {/* Close button */}
      <button
        onClick={() => {
          setLeaving(true);
          setTimeout(() => setVisible(false), 400);
        }}
        className="ml-auto shrink-0 text-white/40 hover:text-white/80 transition-colors"
        aria-label="Close notification"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes toastSlideOut {
          from { opacity: 1; transform: translateY(0)     scale(1);    }
          to   { opacity: 0; transform: translateY(20px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
