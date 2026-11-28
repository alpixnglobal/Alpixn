import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Bot, CalendarClock, CheckCircle2, CircleAlert, CircleSlash, KeyRound, Plug, Plus, Save, Sparkles, Trash2, Wand2, Zap } from "lucide-react";

import {
  addProviderAction,
  createApiTokenAction,
  generateNowAction,
  removeProviderAction,
  revokeApiTokenAction,
  saveAutopilotAction,
  saveProviderAction,
  testProviderAction,
} from "@/admin/actions/ai-actions";
import { AdminField, AdminInput, AdminShell, AdminTextarea, StatusNotice, adminCardClassName, getAdminFlashMessage } from "@/components/admin/admin-ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { getAiSettings, providerKeyStatus } from "@/lib/ai/settings";
import { API_SCOPES, listApiTokens } from "@/lib/api-auth";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = { title: "AI Studio" };

type Params = { tab?: string; status?: string; error?: string };

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const card = `${adminCardClassName} p-5 sm:p-6`;
const h2 = "font-display text-[16px] font-bold text-fg";
const sub = "mt-0.5 text-[13px] text-fg-muted";
const select = "admin-input w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[14px] text-fg outline-none focus:border-[#0878d1]";
const ghost = "inline-flex items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-[12.5px] font-semibold text-fg hover:border-[#d99a19]/60";

export default async function AiStudioPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const tab = params.tab === "providers" || params.tab === "api" ? params.tab : "autopilot";
  const statusMessage = params.status && !["saved", "created"].includes(params.status) ? params.status : undefined;
  const flash = statusMessage ? { tone: "success" as const, message: statusMessage } : getAdminFlashMessage(params.status === "created" ? "saved" : params.status, params.error);

  return (
    <AdminShell title="AI Studio" description="Connect Claude, ChatGPT and other AI models, run the weekly blog autopilot, and give external AI tools safe access to your CMS." activePath="/admin/ai">
      {flash ? <StatusNotice tone={flash.tone} message={flash.message} /> : null}
      <nav className="mb-5 inline-flex flex-wrap rounded-2xl border border-line bg-surface p-1">
        {[
          { key: "autopilot", label: "Blog autopilot", icon: CalendarClock },
          { key: "providers", label: "AI providers", icon: Bot },
          { key: "api", label: "API access", icon: KeyRound },
        ].map((t) => (
          <Link
            key={t.key}
            href={`/admin/ai?tab=${t.key}`}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13.5px] font-semibold ${tab === t.key ? "bg-[linear-gradient(135deg,#071a33,#064a87)] text-white" : "text-fg-muted hover:text-fg"}`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </Link>
        ))}
      </nav>
      {tab === "providers" ? <ProvidersTab /> : tab === "api" ? <ApiTab /> : <AutopilotTab />}
    </AdminShell>
  );
}

/* ---------------- Autopilot ---------------- */

async function AutopilotTab() {
  const s = await getAiSettings();
  const a = s.autopilot;
  const enabledProviders = s.providers.filter((p) => p.enabled);
  const cronReady = Boolean(process.env.CRON_SECRET);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
      <div className="grid gap-5">
        <form action={generateNowAction} className={card}>
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#f6d77a,#d99a19)] text-[#071a33]">
              <Wand2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className={h2}>Write a blog post now</h2>
              <p className={sub}>The AI writes a full article, checks it against every existing post, and saves it. Takes 1–3 minutes.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <AdminField label="Topic (optional)" hint="Leave empty to use the next topic in the queue, or let the AI pick a fresh one.">
              <AdminInput name="topic" placeholder="e.g. How to choose between an AI chatbot and an AI voice agent" />
            </AdminField>
            <AdminField label="After writing">
              <select name="publish" defaultValue="draft" className={select}>
                <option value="draft">Save as draft for review</option>
                <option value="publish">Publish immediately</option>
              </select>
            </AdminField>
          </div>
          <div className="mt-4 flex justify-end">
            <SubmitButton label="Write article" pendingLabel="Writing… (1–3 min)" />
          </div>
        </form>

        <form action={saveAutopilotAction} className={card}>
          <h2 className={h2}>Weekly autopilot</h2>
          <p className={sub}>One new, original article every week, written automatically on the day you choose.</p>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-canvas p-4 lg:col-span-2">
              <input type="checkbox" name="enabled" defaultChecked={a.enabled} className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
              <span>
                <span className="block text-[14px] font-semibold text-fg">Turn on weekly blog autopilot</span>
                <span className="block text-[12.5px] text-fg-muted">Runs around 10:00 AM India time on the chosen day.</span>
              </span>
            </label>
            <AdminField label="Day of the week">
              <select name="dayOfWeek" defaultValue={String(a.dayOfWeek)} className={select}>
                {DAYS.map((d, i) => (
                  <option key={d} value={i}>
                    {d}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="After writing" hint="Recommended: review drafts before they go live.">
              <select name="publishMode" defaultValue={a.publishMode} className={select}>
                <option value="draft">Save as draft — I will review and publish</option>
                <option value="publish">Publish automatically</option>
              </select>
            </AdminField>
            <AdminField label="AI model">
              <select name="providerId" defaultValue={a.providerId} className={select}>
                {s.providers.map((p) => (
                  <option key={p.id} value={p.id} disabled={!p.enabled}>
                    {p.label} — {p.model}
                    {p.enabled ? "" : " (off)"}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Minimum words">
              <AdminInput name="minWords" type="number" min={600} max={3000} step={100} defaultValue={String(a.minWords)} />
            </AdminField>
            <div className="lg:col-span-2">
              <AdminField label="Topic queue" hint="One topic per line, written in order. When the queue is empty, the AI proposes a new topic that does not repeat existing posts.">
                <AdminTextarea name="topics" defaultValue={a.topics.join("\n")} className="min-h-32" placeholder={"Multilingual AI calling for customer support: a practical guide\nWhen to hire an offshore Node.js team vs build in-house"} />
              </AdminField>
            </div>
            <div className="lg:col-span-2">
              <AdminField label="Writing brief" hint="Audience, tone and focus added to every article.">
                <AdminTextarea name="brief" defaultValue={a.brief} className="min-h-20" />
              </AdminField>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button type="submit" className="btn-brand !px-5 !py-2.5 text-[13.5px]">
              <Save className="h-4 w-4" /> Save autopilot
            </button>
          </div>
        </form>
      </div>

      <aside className="grid gap-5">
        <section className={card}>
          <h2 className={h2}>Status</h2>
          <ul className="mt-4 space-y-2.5 text-[13.5px]">
            <Status ok={a.enabled} label={a.enabled ? `Autopilot on — every ${DAYS[a.dayOfWeek]}` : "Autopilot off"} />
            <Status ok={enabledProviders.some((p) => providerKeyStatus(p).source !== "none")} label={enabledProviders.length ? `${enabledProviders.length} AI provider(s) enabled` : "No AI provider enabled"} />
            <Status ok={cronReady} label={cronReady ? "Scheduler ready (CRON_SECRET set)" : "Add CRON_SECRET on Vercel to run the weekly schedule"} />
            <Status ok label={`${a.topics.length} topic(s) in queue`} />
          </ul>
        </section>
        <section className={card}>
          <h2 className={h2}>Recent activity</h2>
          <ul className="mt-3 divide-y divide-line">
            {s.log.slice(0, 12).map((l, i) => (
              <li key={i} className="flex gap-2.5 py-2.5 text-[13px]">
                {l.status === "ok" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1f9d55]" /> : l.status === "skipped" ? <CircleSlash className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" /> : <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />}
                <div className="min-w-0">
                  <p className="text-fg">{l.message}</p>
                  <p className="text-[11.5px] text-fg-subtle">
                    {new Date(l.at).toLocaleString("en-IN")} · {l.trigger}
                    {l.provider ? ` · ${l.provider}` : ""}
                    {l.slug ? (
                      <>
                        {" · "}
                        <Link href="/admin/blogs" className="text-[#0878d1] hover:underline">
                          review
                        </Link>
                      </>
                    ) : null}
                  </p>
                </div>
              </li>
            ))}
            {!s.log.length ? <li className="py-4 text-[13px] text-fg-subtle">No runs yet.</li> : null}
          </ul>
        </section>
        <section className={`${card} text-[12.5px] leading-relaxed text-fg-muted`}>
          <p className="font-semibold text-fg">How originality is protected</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>The AI is told to write in its own words and never invent statistics, clients, quotes or case studies.</li>
            <li>Every draft is compared with all existing posts; near-duplicate titles or repeated passages are rejected.</li>
            <li>Posts are marked as AI-assisted, written by the ALPIXN Editorial Team.</li>
            <li>For full certainty, review drafts before publishing and optionally run them through a plagiarism checker.</li>
          </ul>
        </section>
      </aside>
    </div>
  );
}

function Status({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2.5">
      {ok ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1f9d55]" /> : <CircleAlert className="h-4 w-4 shrink-0 text-[#d99a19]" />}
      <span className="text-fg">{label}</span>
    </li>
  );
}

/* ---------------- Providers ---------------- */

async function ProvidersTab() {
  const s = await getAiSettings();
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        {s.providers.map((p) => {
          const key = providerKeyStatus(p);
          return (
            <form key={p.id} action={saveProviderAction} className={card}>
              <input type="hidden" name="id" value={p.id} />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,#071a33,#064a87)] text-[#f6d77a]">
                    {p.type === "anthropic" ? <Sparkles className="h-5 w-5" /> : p.type === "openai-compatible" ? <Plug className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  </span>
                  <div>
                    <h2 className={h2}>{p.label}</h2>
                    <p className="text-[12px] text-fg-subtle">
                      {p.type}
                      {s.defaultProviderId === p.id ? " · default" : ""}
                    </p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${key.source === "none" ? "bg-[#d99a19]/15 text-[#9a5b08] dark:text-[#f6d77a]" : "bg-[#1f9d55]/10 text-[#1f9d55]"}`}>
                  {key.source === "none" ? "No key" : key.source === "env" ? "Key from Vercel" : "Key saved"}
                </span>
              </div>
              <div className="mt-5 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminField label="Display name">
                    <AdminInput name="label" defaultValue={p.label} />
                  </AdminField>
                  <AdminField label="Model">
                    <AdminInput name="model" defaultValue={p.model} />
                  </AdminField>
                </div>
                {p.type === "openai-compatible" ? (
                  <AdminField label="Base URL" hint="OpenAI-compatible endpoint, e.g. https://api.example.com/v1">
                    <AdminInput name="baseUrl" defaultValue={p.baseUrl} />
                  </AdminField>
                ) : null}
                <AdminField label="API key" hint={key.hint ? `Current: ${key.hint}. Leave empty to keep it.` : "Paste the key. It is encrypted before it is stored, and never shown again."}>
                  <AdminInput name="apiKey" type="password" autoComplete="off" placeholder={key.hint || "Paste API key"} />
                </AdminField>
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line px-3 py-2 text-[13px] text-fg">
                    <input type="checkbox" name="enabled" defaultChecked={p.enabled} className="h-4 w-4 accent-[#0878d1]" /> Enabled
                  </label>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line px-3 py-2 text-[13px] text-fg">
                    <input type="checkbox" name="makeDefault" defaultChecked={s.defaultProviderId === p.id} className="h-4 w-4 accent-[#0878d1]" /> Default
                  </label>
                  {key.source === "admin" ? (
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line px-3 py-2 text-[13px] text-fg">
                      <input type="checkbox" name="clearKey" className="h-4 w-4 accent-red-500" /> Remove saved key
                    </label>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap justify-end gap-2">
                {!["claude", "chatgpt", "gemini"].includes(p.id) ? (
                  <button formAction={removeProviderAction} className={`${ghost} text-red-500`}>
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                ) : null}
                <button formAction={testProviderAction} className={ghost}>
                  <Zap className="h-3.5 w-3.5" /> Test connection
                </button>
                <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
                  <Save className="h-4 w-4" /> Save
                </button>
              </div>
            </form>
          );
        })}
      </div>

      <form action={addProviderAction} className={card}>
        <h2 className={h2}>
          <Plus className="mr-1 inline h-4 w-4" />
          Add another AI provider
        </h2>
        <p className={sub}>Any service with an OpenAI-compatible API (for example a self-hosted Llama or Mistral model, or another vendor) can be added here.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-5">
          <AdminField label="Name">
            <AdminInput name="label" placeholder="Mistral" />
          </AdminField>
          <AdminField label="Type">
            <select name="type" defaultValue="openai-compatible" className={select}>
              <option value="openai-compatible">OpenAI-compatible</option>
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="openai">OpenAI</option>
              <option value="gemini">Google Gemini</option>
            </select>
          </AdminField>
          <AdminField label="Model">
            <AdminInput name="model" placeholder="mistral-large-latest" />
          </AdminField>
          <AdminField label="Base URL">
            <AdminInput name="baseUrl" placeholder="https://api.mistral.ai/v1" />
          </AdminField>
          <AdminField label="API key">
            <AdminInput name="apiKey" type="password" autoComplete="off" />
          </AdminField>
        </div>
        <div className="mt-4 flex justify-end">
          <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
            <Plus className="h-4 w-4" /> Add provider
          </button>
        </div>
      </form>

      <p className="text-[12.5px] text-fg-muted">
        Prefer Vercel environment variables for keys? Set <code>ANTHROPIC_API_KEY</code>, <code>OPENAI_API_KEY</code> or <code>GEMINI_API_KEY</code> and leave the key field empty here. Keys saved in the admin are encrypted with <code>AUTH_SECRET</code>.
      </p>
    </div>
  );
}

/* ---------------- API access ---------------- */

async function ApiTab() {
  const jar = await cookies();
  const newToken = jar.get("alpx_new_token")?.value;
  let tokens: Awaited<ReturnType<typeof listApiTokens>> = [];
  try {
    tokens = await listApiTokens();
  } catch {
    tokens = [];
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start">
      <div className="grid gap-5">
        {newToken ? (
          <section className={`${card} border-[#1f9d55]/40`}>
            <h2 className={h2}>Your new API token</h2>
            <p className={sub}>Copy it now — for security it will not be shown again.</p>
            <code className="mt-3 block select-all break-all rounded-xl border border-line bg-canvas p-3 font-mono text-[13px] text-fg">{newToken}</code>
          </section>
        ) : null}

        <section className={card}>
          <h2 className={h2}>API tokens</h2>
          <p className={sub}>Each AI tool or automation gets its own token with only the permissions it needs. Revoke a token any time.</p>
          <ul className="mt-4 divide-y divide-line">
            {tokens.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-fg">
                    {t.name} <span className="font-mono text-[12px] font-normal text-fg-subtle">{t.prefix}…</span>
                  </p>
                  <p className="text-[12px] text-fg-subtle">
                    {t.scopes.join(", ")} · created {new Date(t.createdAt).toLocaleDateString("en-IN")} · {t.lastUsedAt ? `last used ${new Date(t.lastUsedAt).toLocaleString("en-IN")}` : "never used"}
                  </p>
                </div>
                {t.revoked ? (
                  <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[11px] font-bold uppercase text-red-500">Revoked</span>
                ) : (
                  <form action={revokeApiTokenAction}>
                    <input type="hidden" name="id" value={t.id} />
                    <button className={`${ghost} text-red-500`}>
                      <Trash2 className="h-3.5 w-3.5" /> Revoke
                    </button>
                  </form>
                )}
              </li>
            ))}
            {!tokens.length ? <li className="py-4 text-[13px] text-fg-subtle">No tokens yet.</li> : null}
          </ul>
        </section>

        <form action={createApiTokenAction} className={card}>
          <h2 className={h2}>Create a token</h2>
          <div className="mt-4 grid gap-4">
            <AdminField label="Name" hint="Who or what uses it, e.g. “ChatGPT blog GPT” or “Claude assistant”.">
              <AdminInput name="name" required maxLength={60} />
            </AdminField>
            <fieldset>
              <legend className="mb-2 text-[13px] font-semibold text-fg">Permissions</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {API_SCOPES.map((s) => (
                  <label key={s.key} className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-canvas p-3 text-[13px]">
                    <input type="checkbox" name="scopes" value={s.key} defaultChecked={s.key === "blogs:read" || s.key === "blogs:write"} className="mt-0.5 h-4 w-4 accent-[#0878d1]" />
                    <span>
                      <span className="block font-mono text-[12px] text-fg">{s.key}</span>
                      <span className="text-fg-muted">{s.label}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn-brand !px-4 !py-2 text-[13px]">
              <KeyRound className="h-4 w-4" /> Create token
            </button>
          </div>
        </form>
      </div>

      <aside className={`${card} text-[13px] leading-relaxed text-fg-muted`}>
        <h2 className={h2}>Connect an AI tool</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-4">
          <li>
            <span className="font-semibold text-fg">ChatGPT (custom GPT):</span> Create a GPT → Configure → Actions → Import from URL and paste{" "}
            <code className="break-all text-fg">{SITE_URL}/api/v1/openapi.json</code>. Authentication: API key, Bearer, and paste the token.
          </li>
          <li>
            <span className="font-semibold text-fg">Claude:</span> give Claude (for example in Claude Code or a Claude project with web tools) the same OpenAPI URL and token, or use the built-in Claude provider for the autopilot.
          </li>
          <li>
            <span className="font-semibold text-fg">Zapier, Make, n8n or scripts:</span> send HTTP requests with the header <code className="text-fg">Authorization: Bearer &lt;token&gt;</code>.
          </li>
        </ol>
        <p className="mt-4 font-semibold text-fg">Endpoints</p>
        <ul className="mt-1 space-y-1 font-mono text-[12px]">
          <li>GET /api/v1/blogs</li>
          <li>POST /api/v1/blogs</li>
          <li>POST /api/v1/blogs/generate</li>
          <li>GET /api/v1/seo</li>
          <li>PUT /api/v1/seo</li>
        </ul>
        <p className="mt-4">Tokens never give admin-panel access or the ability to delete content.</p>
      </aside>
    </div>
  );
}
