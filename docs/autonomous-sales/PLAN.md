# ALPIXN Autonomous AI Sales, Marketing & Advertising — Audit and Plan

## 1. Audit (what exists today)

| Area | Existing implementation | Reuse |
|---|---|---|
| Stack | Next.js 16.4 App Router, React 19, MongoDB/Mongoose, PM2 on AWS EC2 behind Nginx | Same stack, no new infrastructure |
| AI | `lib/ai/providers.ts` — Claude (official SDK, structured output, refusal fallback), OpenAI, Gemini, OpenAI-compatible; keys encrypted (`lib/ai/crypto.ts`) | All agents use `generateStructured()` |
| Website chatbot | `components/assistant`, `lib/assistant/*`, `/api/assistant/*` — AI or guided, price catalog estimates, `ChatLead` | Becomes the "web_chat" channel of the unified inbox |
| Price catalog | `lib/pricing/*` — editable packages | Proposal/quotation pricing source; agents may only use catalog prices |
| Sales CRM | `lib/sales/*`, Admin → Sales CRM — `SalesLead`, stages, timeline, sequences, outbox, daily briefing, unsubscribe | Central lead record; extended (channels, consent, attribution, intent, deal) |
| Inbox | Contact / offshore / career / chat leads + spam folder | Feeds the CRM (hourly sync) |
| Background work | Crontab → `/api/cron/sales`, `/api/cron/blog-autopilot`, `after()` for long tasks | New Mongo job queue + one `/api/cron/agents` tick |
| Security | Signed admin session, login rate limit, 2FA, CSP/HSTS, spam scoring, API tokens (hashed, scoped), audit-free | Add RBAC users, audit log, webhook signature checks |
| Admin auth | Single owner from env (`ADMIN_EMAIL/PASSWORD`) | Owner stays; team users with roles added |

Gaps: no conversation/message store, no WhatsApp/Instagram/Meta integration, no job queue/retries, no approvals, no meetings/proposals, no audit log, no roles, no ads management, no experiments.

Network note: this build environment cannot reach `graph.facebook.com`. Meta code follows the official
Graph API v21 contracts and is tested here with official-format payloads and a local mock Graph server;
it must be verified against Meta after credentials are added (see DEPLOY.md).

## 2. Architecture

```
Channels ──► Webhooks / chat API ──► ingestMessage() ──► Conversation + Message (dedupe by external id)
                                                   └──► Job queue ──► Agents (qualify → reply → follow-up …)
Agents ──► autonomy.decide(agent, action) ──► auto | needs approval (Approval Center) | blocked (paused / limits / hours)
Every action ──► AuditLog          Settings ──► AgentSettings (global pause, per-agent autonomy, channels, hours, limits, escalation)
Meta OAuth ──► Integration (encrypted tokens) ──► WhatsApp / Instagram / Messenger / Lead Ads / Marketing API
```

Agents (each with enable switch + autonomy level: off · suggest · approve · auto):
1. Qualification & scoring · 2. Conversation (chat, WhatsApp, Instagram, Messenger, email) · 3. Follow-up ·
4. Meetings · 5. Proposals & quotations · 6. Ads (Meta campaigns) · 7. Marketing (strategy & copy) ·
8. Analytics & reporting · 9. Learning (experiments, prompt versions).

Hard rules enforced in code (not configurable): no invented prices (catalog only), discounts/custom pricing/
contracts/payment terms always need human approval, a deal is "won" only when a human confirms, opt-outs
are permanent until the person opts in again, ad budget increases / new campaigns beyond limits need approval.

## 3. Phases

1. Foundation — models, settings & autonomy, audit log, job queue with retries/locks, Approval Center, RBAC.
2. Unified conversations — chat + email + inbound pipeline, qualification agent, reply agent, escalation alerts.
3. Meetings (booking page, reminders, .ics), proposals (catalog-priced, approval, public proposal page), onboarding.
4. Meta — OAuth connect, webhook verification + signature, WhatsApp Cloud API, Instagram/Messenger messaging, Lead Ads, Click-to-WhatsApp attribution.
5. Ads — campaign sync & insights, create/pause/resume/budget within limits, creatives, AI recommendations, ROI.
6. Analytics, forecasting, daily report, learning (A/B experiments, prompt versions with rollback, daily learning report).
7. Admin UI for everything, tests, security checks, production build, DEPLOY.md and final report.
