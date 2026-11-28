# ALPIXN website security checklist

The application already includes: limited admin login attempts, signed HTTP-only admin sessions, optional
two-factor login (Admin → Security), security headers (CSP, HSTS, clickjacking protection), form spam
protection and rate limits, encrypted API keys, hashed API tokens, and dependencies without known
vulnerabilities (`npm audit --omit=dev`).

The items below are on the **server and accounts**, handled by the server team. No website can be made
impossible to hack — these layers make attacks much harder and limit the damage if one part is compromised.

## 1. Accounts (most hacks start here)

- Turn on 2FA everywhere: AWS root and IAM users, GitHub, Hostinger (email & domain), Cloudflare, MongoDB
  Atlas (if used), Google Analytics / Search Console.
- Turn on 2FA for the website admin: Admin → Security → Set up 2FA.
- Use a long, unique `ADMIN_PASSWORD` (14+ characters, from a password manager) and a random
  `AUTH_SECRET` (`openssl rand -hex 32`). Change them if anyone who knew them leaves.
- Don't use the AWS root account day to day; give people their own IAM users with least privilege.

## 2. EC2 server

- Security group: allow only ports **80 and 443** from the internet. Allow **22 (SSH) only from your office IP**
  (or use AWS Systems Manager Session Manager and close 22 entirely).
- SSH: key-based login only (`PasswordAuthentication no`, `PermitRootLogin no` in `/etc/ssh/sshd_config`).
- Install `fail2ban` and unattended security updates (`sudo apt install fail2ban unattended-upgrades`).
- Run the app (PM2) as a normal user, not root.
- Protect secrets: `chmod 600 .env*`; never commit them to Git.

## 3. Nginx

```nginx
server_tokens off;                      # hide the Nginx version
client_max_body_size 12m;               # matches the app's upload limit
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;

# Slow down password guessing on the admin login and public forms
limit_req_zone $binary_remote_addr zone=forms:10m rate=10r/m;
location /admin/login { limit_req zone=forms burst=5 nodelay; proxy_pass http://127.0.0.1:3000; }
```

- HTTPS with Let's Encrypt (certbot), redirect all HTTP to HTTPS, TLS 1.2+ only.

## 4. Cloudflare in front (recommended, free plan is enough)

- Point the domain's DNS through Cloudflare (orange cloud) for DDoS protection, a web application firewall,
  bot protection and caching.
- SSL/TLS mode **Full (strict)**; enable "Always use HTTPS" and "Bot Fight Mode".
- Optionally restrict the EC2 security group to Cloudflare IP ranges so the server can't be hit directly.
- Turnstile (CAPTCHA) keys for the forms come from the same Cloudflare account.

## 5. Database (visitor data, leads)

- MongoDB must **not** be reachable from the internet: bind to `127.0.0.1` / private network, or on Atlas
  allow only the EC2 server's IP.
- Enable authentication with a dedicated user that only has access to the website database.
- Daily automated backups, stored separately (e.g. S3 with versioning), and test a restore occasionally.

## 6. Monitoring & updates

- Monthly: `npm audit --omit=dev`, update packages, rebuild, redeploy.
- Uptime monitoring (e.g. UptimeRobot, Better Stack) and PM2 log rotation (`pm2 install pm2-logrotate`).
- Review Admin → Inbox → Spam and Admin → Security occasionally.

## 7. Content copying

Anything a browser shows can be copied or screenshotted, so copying can't be fully prevented. The site
discourages it (credit added to copied text, image right-click disabled, AI training bots blocked in
robots.txt — Admin → Security). For real protection keep the copyright notice in the footer, and use DMCA /
copyright takedown requests (Google, hosting providers) if someone republishes your content.
