import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "ALPIXN content administration",
  robots: { index: false, follow: false },
};

// Admin follows the global dark/light theme (previously forced to dark here).
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-canvas text-fg">{children}</div>;
}
