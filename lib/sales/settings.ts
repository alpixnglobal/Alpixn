import { connectToDatabase } from "@/lib/db";
import { SalesSettingsModel } from "@/lib/models";

export const STAGES = [
  { key: "new", label: "New", tone: "#0878d1" },
  { key: "contacted", label: "Contacted", tone: "#064a87" },
  { key: "replied", label: "Replied", tone: "#1f9d55" },
  { key: "meeting", label: "Meeting", tone: "#d99a19" },
  { key: "proposal", label: "Proposal", tone: "#9a5b08" },
  { key: "won", label: "Won", tone: "#15803d" },
  { key: "lost", label: "Lost", tone: "#6b7280" },
] as const;

export type StageKey = (typeof STAGES)[number]["key"];

export type SequenceStep = {
  /** Days after the previous email (or after enrolment for step 1). */
  delayDays: number;
  /** What this email should do — the AI writes the actual text. */
  instruction: string;
};

export type Sequence = { id: string; name: string; description: string; steps: SequenceStep[] };

export type SalesSettings = {
  /** "review": AI writes drafts you approve. "auto": approved sequences send by themselves. */
  mode: "review" | "auto";
  fromName: string;
  /** Address emails are sent from (best: a separate sending domain). */
  fromEmail: string;
  replyTo: string;
  /** Maximum emails sent per day (protects your domain reputation). */
  dailyLimit: number;
  /** Who you are and what you offer — given to the AI for every email. */
  pitch: string;
  signature: string;
  /** Postal address shown in the email footer (required by anti-spam laws in many countries). */
  footerAddress: string;
  /** Email address that receives the daily summary. */
  summaryEmail: string;
  providerId: string;
  sequences: Sequence[];
  summary?: { at: string; text: string };
};

export const DEFAULT_SALES_SETTINGS: SalesSettings = {
  mode: "review",
  fromName: "ALPIXN Sales",
  fromEmail: "",
  replyTo: "info@alpixn.com",
  dailyLimit: 30,
  pitch:
    "ALPIXN is an AI, robotics and software engineering company in Gurugram, India, with offices in Sydney, Dubai, Milan, London, New York, Toronto, Johannesburg and Bangkok. We build custom software, web and mobile apps, AI chatbots and agents, multilingual AI calling systems, AI automation, cloud and DevOps, and provide offshore developer teams. We work with startups and enterprises at every budget.",
  signature: "Team ALPIXN\n+91 7291031315 · info@alpixn.com · alpixn.com",
  footerAddress: "ALPIXN, Unitech Cyber Park, Tower B, Sector 39, Gurugram, Haryana 122001, India",
  summaryEmail: "info@alpixn.com",
  providerId: "",
  sequences: [
    {
      id: "inbound-followup",
      name: "Inbound follow-up",
      description: "For people who contacted us through the website, chat robot or forms.",
      steps: [
        { delayDays: 0, instruction: "Thank them for reaching out, briefly restate what they asked for, suggest a 20-minute call and ask one clarifying question about their requirement." },
        { delayDays: 2, instruction: "Short friendly follow-up. Offer two concrete next steps (a call, or sending a rough plan and estimate by email)." },
        { delayDays: 5, instruction: "Share one useful idea or consideration relevant to their project, and ask if they would like a detailed proposal." },
        { delayDays: 10, instruction: "Polite last check-in. Say you will close the request for now and they can reply any time to restart." },
      ],
    },
    {
      id: "cold-outreach",
      name: "Cold outreach (B2B)",
      description: "For business contacts added by the team. Keep it short, relevant and easy to decline.",
      steps: [
        { delayDays: 0, instruction: "Short first email (max 110 words). Mention something specific about their company or role, one relevant way ALPIXN could help, and a soft question asking if it is worth a quick chat." },
        { delayDays: 3, instruction: "Follow-up (max 80 words) with a different angle: one practical idea for their industry. Ask a yes/no question." },
        { delayDays: 6, instruction: "Very short bump (max 50 words). Offer to send a one-page plan instead of a call." },
        { delayDays: 10, instruction: "Polite break-up email (max 60 words). Ask if someone else handles this, and say you won't email again." },
      ],
    },
  ],
};

export async function getSalesSettings(): Promise<SalesSettings> {
  if (!process.env.MONGODB_URI) return DEFAULT_SALES_SETTINGS;
  try {
    await connectToDatabase();
  } catch {
    return DEFAULT_SALES_SETTINGS;
  }
  const doc = (await SalesSettingsModel.findOne({ key: "sales" }).lean()) as { data?: Partial<SalesSettings> } | null;
  const data = doc?.data ?? {};
  return { ...DEFAULT_SALES_SETTINGS, ...data, sequences: data.sequences?.length ? data.sequences : DEFAULT_SALES_SETTINGS.sequences };
}

export async function saveSalesSettings(patch: Partial<SalesSettings>) {
  await connectToDatabase();
  const current = await getSalesSettings();
  await SalesSettingsModel.updateOne({ key: "sales" }, { $set: { key: "sales", data: { ...current, ...patch } } }, { upsert: true });
}
