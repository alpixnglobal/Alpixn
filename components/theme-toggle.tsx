"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "./theme-provider";

const noopSubscribe = () => () => {};
/** true on the client after hydration, false during SSR — without setState-in-effect. */
function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

type ThemeToggleProps = {
  className?: string;
};

/**
 * Premium dark/light switch. Knob position is driven by the <html> theme class via CSS,
 * so it renders correctly before hydration; ARIA state is added once hydrated.
 */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const hydrated = useHydrated();
  const isDark = theme === "dark";
  const label = hydrated ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle colour theme";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={hydrated ? isDark : undefined}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className={`group relative inline-flex h-9 w-[68px] shrink-0 items-center rounded-full p-1 transition-shadow duration-300
        [background:linear-gradient(var(--surface-2),var(--surface-2))_padding-box,linear-gradient(120deg,var(--gold),var(--tech),var(--gold-soft))_border-box]
        border border-transparent hover:shadow-[0_0_24px_-6px_var(--gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      {/* Track icons */}
      <Sun aria-hidden className="absolute left-2 h-3.5 w-3.5 text-gold-ink opacity-60 transition-opacity dark:opacity-40" />
      <Moon aria-hidden className="absolute right-2 h-3.5 w-3.5 text-tech opacity-40 transition-opacity dark:opacity-70" />

      {/* Knob */}
      <span
        aria-hidden
        className="relative z-10 grid h-7 w-7 place-items-center rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          translate-x-0 bg-[linear-gradient(135deg,#fff3c4,#e9b949_55%,#c2860f)]
          dark:translate-x-[32px] dark:bg-[linear-gradient(135deg,#0b3266,#071a33)] dark:ring-1 dark:ring-[color:var(--line-gold)]"
      >
        <Sun className="h-4 w-4 text-[#7a4a06] transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 text-[#f6d77a] transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      </span>
    </button>
  );
}
