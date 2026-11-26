"use client";

import { useEffect, type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";

/**
 * ALPIXN global theme system (single source of truth).
 *
 * - Uses `next-themes`, which injects a tiny blocking script so the saved theme
 *   is applied to <html class="dark|light"> before first paint (no flash, no
 *   hydration mismatch).
 * - Persists the visitor's choice in localStorage under THEME_STORAGE_KEY.
 * - Dark is the brand default; light is a fully designed alternative.
 */
export const THEME_STORAGE_KEY = "alpixn-theme";

export type Theme = "dark" | "light";

function ThemeReadyFlag() {
  // Enable colour cross-fade only after the first paint so initial load never animates.
  useEffect(() => {
    const id = requestAnimationFrame(() => document.documentElement.classList.add("theme-ready"));
    return () => cancelAnimationFrame(id);
  }, []);
  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      themes={["dark", "light"]}
      enableSystem={false}
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange={false}
    >
      <ThemeReadyFlag />
      {children}
    </NextThemesProvider>
  );
}

/** Thin wrapper kept for backwards compatibility with the previous custom context API. */
export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme();
  const theme: Theme = resolvedTheme === "light" ? "light" : "dark";
  return {
    theme,
    setTheme: (next: Theme) => setTheme(next),
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  };
}
