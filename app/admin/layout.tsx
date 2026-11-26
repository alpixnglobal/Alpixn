import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard - Axaon",
  description: "Axaon Admin Dashboard",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="dark min-h-screen"
      style={{ background: "radial-gradient(circle, rgba(0, 7, 14, 1) 45%, rgba(0, 35, 72, 1) 100%)" }}
    >
      {children}
    </div>
  );
}
