"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the public header/footer on admin routes so the CMS has its own full-screen layout. */
export default function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  if (isAdmin) return <>{children}</>;
  return (
    <>
      {header}
      <div id="main-content">{children}</div>
      {footer}
    </>
  );
}
