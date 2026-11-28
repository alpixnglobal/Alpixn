# ALPIXN website on AWS (EC2 + Nginx + PM2): CMS, SEO and AI Studio setup

Production runs on AWS EC2 behind Nginx with PM2. Vercel is used only for testing previews.
Everything below is done by whoever manages the server. Nothing in the code changes the server automatically.

## 1. Update the app

```bash
cd /path/to/alpixn          # the app folder on the server
git pull origin main
npm ci                      # new dependency: @anthropic-ai/sdk
npm run build
pm2 reload <app-name>       # or: pm2 restart <app-name> --update-env
```

## 2. Environment variables

Add these to the app's `.env` / `.env.production` file (or the PM2 ecosystem `env` block), then restart PM2
with `--update-env`. Never commit this file.

| Variable | Needed for | Value |
|---|---|---|
| `MONGODB_URI` | Admin, inbox, CMS edits | MongoDB connection string |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin login | Admin credentials |
| `AUTH_SECRET` | Admin sessions, encrypting AI keys | Long random string (32+ characters) |
| `SMTP_USER`, `SMTP_PASS` | Contact / offshore / career form emails | Hostinger mailbox and password |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap | `https://alpixn.com` (set **before** `npm run build`) |
| `CRON_SECRET` | Weekly blog autopilot | Long random string |
| `ANTHROPIC_API_KEY` | Claude (optional here; can be saved in Admin → AI Studio instead) | Key from console.anthropic.com |
| `OPENAI_API_KEY`, `GEMINI_API_KEY` | Only if ChatGPT / Gemini are used | Provider keys |
| `SALES_SMTP_HOST`, `SALES_SMTP_PORT`, `SALES_SMTP_USER`, `SALES_SMTP_PASS` | Sales CRM emails (recommended: a separate sending domain) | Falls back to `SMTP_*` if not set |

Create a random secret with: `openssl rand -hex 32`

## 3. Weekly blog autopilot (crontab)

Vercel Cron does not run on AWS, so add one line to the server's crontab (`crontab -e`). It calls the app once a
day; the app itself decides whether today is the day chosen in Admin → AI Studio and posts at most once a week.

```cron
30 4 * * * curl -fsS -m 30 -H "Authorization: Bearer YOUR_CRON_SECRET" http://127.0.0.1:3000/api/cron/blog-autopilot >/dev/null 2>&1
```

- `30 4 * * *` = 04:30 UTC = 10:00 AM India time.
- Replace `3000` with the port PM2 runs the app on, and `YOUR_CRON_SECRET` with the same value as in `.env`.
- Calling `127.0.0.1` skips Nginx. The endpoint replies at once (HTTP 202) and writes the article in the background,
  so request timeouts are not a problem.
- To test once: add `?force=1` to the URL. The result shows under Admin → AI Studio → Recent activity.

Add a second line for the **Sales CRM** (runs every hour: writes/sends due sequence emails and the 9 AM briefing):

```cron
5 * * * * curl -fsS -m 30 -H "Authorization: Bearer YOUR_CRON_SECRET" http://127.0.0.1:3000/api/cron/sales >/dev/null 2>&1
```

## 4. Nginx

No change is required: AI articles are written in the background. The admin "Write article" button also returns
immediately; refresh the page after 1–3 minutes to see the result.

The server needs outbound HTTPS to the AI provider you use: `api.anthropic.com` (Claude), `api.openai.com`
(ChatGPT) or `generativelanguage.googleapis.com` (Gemini).

## 5. After deploying

1. Admin → SEO & analytics → **Analytics & webmaster tools**: paste the GA4 ID and the Search Console verification
   tag, then save.
2. In Google Search Console click **Verify**, then submit `https://alpixn.com/sitemap.xml`. Do the same in Bing
   Webmaster Tools.
3. Admin → AI Studio → **AI providers**: add the Claude key (or confirm "Key from server .env") and click
   **Test connection**.
4. Admin → AI Studio → **Blog autopilot**: choose the day, keep "Save as draft" at first, add a few topics, turn it on.

## Note on PM2 cluster mode

If PM2 runs the app with several instances (`-i max`), each instance keeps its own page cache, so an admin edit
can take up to an hour to show on every instance. Running a single instance (`-i 1`) or restarting PM2 after big
content changes avoids this.
