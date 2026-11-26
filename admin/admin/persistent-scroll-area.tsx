"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type PersistentScrollAreaProps = {
  children: ReactNode;
  storageKey: string;
  className?: string;
};

export function PersistentScrollArea({ children, storageKey, className = "" }: PersistentScrollAreaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const resolvedStorageKey = `${storageKey}:${pathname}`;

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container || typeof window === "undefined") {
      return;
    }

    const savedScrollTop = window.sessionStorage.getItem(resolvedStorageKey);

    if (savedScrollTop) {
      container.scrollTop = Number(savedScrollTop);
    }

    const handleScroll = () => {
      window.sessionStorage.setItem(resolvedStorageKey, String(container.scrollTop));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [resolvedStorageKey]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
