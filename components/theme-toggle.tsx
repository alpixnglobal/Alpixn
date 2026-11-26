"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  className?: string;
  variant?: "default" | "icon-only";
};

export function ThemeToggle({ className = "", variant = "default" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  const isDark = theme === "dark";

  if (variant === "icon-only") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`inline-flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:bg-black/5 dark:bg-black/5 dark:bg-white/10 ${className}`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-400 transition-transform duration-300 hover:rotate-12" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
        isDark
          ? "border-white/20 bg-white/5 text-white hover:bg-black/5 dark:bg-black/5 dark:bg-white/10"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
      } ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-yellow-400" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-slate-600" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}
