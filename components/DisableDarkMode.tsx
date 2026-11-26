"use client";

import { useEffect } from "react";

export default function DisableDarkMode() {
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const stripDarkClass = () => {
      root.classList.remove("dark");
      body.classList.remove("dark");
    };

    stripDarkClass();

    const observer = new MutationObserver(stripDarkClass);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return null;
}
