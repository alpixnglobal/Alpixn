"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const load = (loader: () => Promise<Record<string, unknown>>, name: string) =>
  dynamic(() => loader().then((m) => m[name] as ComponentType), {
    ssr: false,
    loading: () => <div className="grid min-h-[480px] place-items-center rounded-2xl border border-line bg-surface text-sm text-fg-subtle">Loading interactive demo…</div>,
  });

const he = () => import("./healthcare-education");
const pil = () => import("./property-industry-logistics");
const cha = () => import("./commerce-hospitality-agri");
const ars = () => import("./ai-robotics-services");

/** slug → interactive demo component (each group is code-split). */
export const DEMOS: Record<string, ComponentType> = {
  "careslot-clinic-booking": load(he, "CareSlotDemo"),
  "pulseboard-clinic-dashboard": load(he, "PulseBoardDemo"),
  "examready-online-assessment": load(he, "ExamReadyDemo"),
  "learnpath-lms": load(he, "LearnPathDemo"),
  "haven-property-portal": load(pil, "HavenDemo"),
  "estateflow-crm": load(pil, "EstateFlowDemo"),
  "fabrica-production-tracker": load(pil, "FabricaDemo"),
  "visionqc-inspection-dashboard": load(pil, "VisionQCDemo"),
  "cargotrace-shipment-tracking": load(pil, "CargoTraceDemo"),
  "routepilot-delivery-app": load(pil, "RoutePilotDemo"),
  "siam-craft-storefront": load(cha, "SiamCraftDemo"),
  "ledgerly-invoicing-saas": load(cha, "LedgerlyDemo"),
  "lagoon-stay-booking": load(cha, "LagoonStayDemo"),
  "saffron-table-reservations": load(cha, "SaffronTableDemo"),
  "agrisense-farm-monitor": load(cha, "AgriSenseDemo"),
  "docusense-document-ai": load(ars, "DocuSenseDemo"),
  "robofleet-command-center": load(ars, "RoboFleetDemo"),
  "askdesk-ai-assistant": load(ars, "AskDeskDemo"),
  "fitflow-studio-app": load(ars, "FitFlowDemo"),
  "buildtrack-site-manager": load(ars, "BuildTrackDemo"),
};

export default function DemoRenderer({ slug }: { slug: string }) {
  const Demo = DEMOS[slug];
  return Demo ? <Demo /> : null;
}
