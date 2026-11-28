import type { Metadata } from "next";
import Link from "next/link";
import { Bot, ExternalLink, Inbox, RotateCcw, Save, Tags } from "lucide-react";

import { resetCatalogAction, saveAssistantSettingsAction, saveCatalogAction } from "@/admin/actions/pricing-actions";
import { AdminField, AdminInput, AdminTextarea, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { AdminShell } from "@/components/admin/admin-shell";
import { PricingEditor } from "@/components/admin/pricing-editor";
import { getAiSettings, providerKeyStatus } from "@/lib/ai/settings";
import { getPricingData } from "@/lib/pricing/store";

export const metadata: Metadata = { title: "Pricing & assistant" };

type Params = { tab?: string; status?: string; error?: string };
const card = `${adminCardClassName} p-5 sm:p-6`;
const select = "admin-input w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[14px] text-fg outline-none focus:border-[#0878d1]";

export default async function PricingAdminPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const flash = getAdminFlashMessage(params.status, params.error);
  const tab = params.tab === "assistant" ? "assistant" : "prices";
  const [{ catalog, assistant }, ai] = await Promise.all([getPricingData(), getAiSettings()]);
  const aiReady = ai.providers.some((p) => p.enabled && providerKeyStatus(p).source !== "none");

  return (
    <AdminShell
      title="Pricing & assistant"
      description="Price plans used on the pricing page and by the website chat robot for estimates."
      activePath="/admin/pricing"
      topActions={
        <div className="flex gap-2">
          <a href="/pricing" target="_blank" className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2 text-[13px] font-semibold text-fg hover:border-[#d99a19]/60">
            Pricing page <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link href="/admin/inbox?type=assistant" className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2 text-[13px] font-semibold text-fg hover:border-[#d99a19]/60">
            <Inbox className="h-3.5 w-3.5" /> Chat leads
          </Link>
        </div>
      }
    >
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      <nav className="mb-5 inline-flex rounded-2xl border border-line bg-surface p-1">
        {[
          { key: "prices", label: "Price plans", icon: Tags },
          { key: "assistant", label: "Chat robot", icon: Bot },
        ].map((t) => (
          <Link key={t.key} href={`/admin/pricing?tab=${t.key}`} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13.5px] font-semibold ${tab === t.key ? "bg-[linear-gradient(135deg,#071a33,#064a87)] text-white" : "text-fg-muted hover:text-fg"}`}>
            <t.icon className="h-4 w-4" />
            {t.label}
          </Link>
        ))}
      </nav>

      {tab === "prices" ? (
        <form action={saveCatalogAction} className={card}>
          <p className="mb-4 text-[13px] text-fg-muted">
            Click a service to edit its packages, prices and add-ons. Prices are in ₹ without GST. The robot only uses these prices for estimates and always says the estimate is not final.
          </p>
          <PricingEditor initial={catalog} />
          <div className="sticky bottom-0 -mx-5 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/95 px-5 py-3 backdrop-blur sm:-mx-6 sm:px-6">
            <button formAction={resetCatalogAction} className="inline-flex items-center gap-1.5 rounded-xl border border-line px-3.5 py-2 text-[13px] font-semibold text-fg-muted hover:text-fg">
              <RotateCcw className="h-4 w-4" /> Restore suggested prices
            </button>
            <button type="submit" className="btn-brand !px-5 !py-2.5 text-[13.5px]">
              <Save className="h-4 w-4" /> Save price plans
            </button>
          </div>
        </form>
      ) : (
        <form action={saveAssistantSettingsAction} className={`${card} grid gap-5 lg:grid-cols-2`}>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-canvas p-4 lg:col-span-2">
            <input type="checkbox" name="enabled" defaultChecked={assistant.enabled} className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
            <span>
              <span className="block text-[14px] font-semibold text-fg">Show the chat robot on the website</span>
              <span className="block text-[12.5px] text-fg-muted">Floating robot button on every page. Leads appear in Inbox → AI assistant and are emailed to info@.</span>
            </span>
          </label>
          <AdminField label="Robot name">
            <AdminInput name="name" defaultValue={assistant.name} />
          </AdminField>
          <AdminField label="How the robot talks" hint={aiReady ? "An AI provider is ready in AI Studio." : "No AI key yet — the robot asks guided questions until you add one in AI Studio."}>
            <select name="mode" defaultValue={assistant.mode} className={select}>
              <option value="auto">Automatic — AI conversation when a key is set, otherwise guided questions</option>
              <option value="ai">AI conversation (falls back to guided if AI is unavailable)</option>
              <option value="guided">Guided questions only (no AI cost)</option>
            </select>
          </AdminField>
          <AdminField label="AI model for chat">
            <select name="providerId" defaultValue={assistant.providerId} className={select}>
              <option value="">Default provider from AI Studio</option>
              {ai.providers.map((p) => (
                <option key={p.id} value={p.id} disabled={!p.enabled}>
                  {p.label} — {p.model}
                </option>
              ))}
            </select>
          </AdminField>
          <label className="flex cursor-pointer items-center gap-3 self-end rounded-xl border border-line bg-canvas px-4 py-3">
            <input type="checkbox" name="showOnHome" defaultChecked={assistant.showOnHome} className="h-4 w-4 accent-[#0878d1]" />
            <span className="text-[13.5px] text-fg">Show the “Plan your project” section on the homepage</span>
          </label>
          <div className="lg:col-span-2">
            <AdminField label="Greeting message">
              <AdminTextarea name="greeting" defaultValue={assistant.greeting} className="min-h-20" />
            </AdminField>
          </div>
          <div className="flex justify-end lg:col-span-2">
            <button type="submit" className="btn-brand !px-5 !py-2.5 text-[13.5px]">
              <Save className="h-4 w-4" /> Save robot settings
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
