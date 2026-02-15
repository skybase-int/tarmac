# Local API Workers Testing

Testing the `api-workers` Cloudflare Worker endpoints against the Tarmac webapp locally, before cutting over from `staging-api.sky.money`.

---

## How It Works

The webapp uses three environment variables to locate API endpoints. We point them at the Vite dev server (`localhost:3000`) and proxy requests to the worker (`localhost:8787`). This keeps everything same-origin so cookies work without HTTPS.

| Env Var | Production | Local Override |
|---------|-----------|----------------|
| `VITE_AUTH_URL` | `https://api.sky.money` | `http://localhost:3000` |
| `VITE_TERMS_ENDPOINT` | `https://api.sky.money/terms-acceptance` | `http://localhost:3000/terms-acceptance` |
| `VITE_CHATBOT_DOMAIN` | `https://api.sky.money` | `http://localhost:3000` |

```
┌──────────────────────┐  same-origin  ┌──────────────────────┐
│  Tarmac Webapp        │    fetch      │  Vite Dev Server      │
│  localhost:3000       │──────────────▶│  proxy config         │
│                       │               │                       │
│  .env overrides       │               │  /ip/status     ──┐   │
│  VITE_*=localhost:3000│               │  /address/status ─┤   │
└──────────────────────┘               │  /terms-*       ──┤   │
                                        │  /chat*        ──┤   │
                                        │  /health       ──┘   │
                                        └───────┬──────────────┘
                                                │ proxy
                                                ▼
                                        ┌──────────────────────┐
                                        │  api-workers          │
                                        │  localhost:8787       │
                                        │  .dev.vars secrets    │
                                        └──────────────────────┘
                                                │
                                    ┌───────────┼───────────┐
                                    ▼           ▼           ▼
                                Supabase    MaxMind     Archon API
                                (staging)   (GeoIP)    (chatbot)
```

Endpoint coverage (10 endpoints):

- **Auth** — `GET /ip/status`, `GET /address/status`
- **Terms** — `POST /terms-acceptance/check`, `POST /terms-acceptance/add`
- **Chatbot** — `POST /chat`, `POST /chatbot/terms/sign`, `POST /chatbot/terms/check`, `POST /chatbot/terms/wallet`, `POST /chatbot/feedback`

---

## Setup

### 1. Feature branch in tarmac

```bash
cd tarmac
git checkout -b feat/local-api-workers-testing
```

### 2. Webapp env overrides

Set the API env vars to go through the Vite proxy (same-origin). Either create `apps/webapp/.env.local` or edit `.env` directly:

```bash
# API requests go to localhost:3000, Vite proxies them to the worker at :8787
VITE_AUTH_URL=http://localhost:3000
VITE_TERMS_ENDPOINT=http://localhost:3000/terms-acceptance
VITE_CHATBOT_DOMAIN=http://localhost:3000

# Disable auth skip so we actually exercise the auth endpoints
VITE_SKIP_AUTH_CHECK=false
```

> **Note:** The existing `.env` has `VITE_SKIP_AUTH_CHECK=true`, which bypasses IP/address/terms checks entirely. Set it to `false` to exercise the full flow.

### 3. Vite proxy config

The proxy is configured in `apps/webapp/vite.config.ts` under `server.proxy`. It forwards API paths from the dev server to the local worker:

```typescript
proxy: {
  '/ip/status': 'http://localhost:8787',
  '/address/status': 'http://localhost:8787',
  '/terms-acceptance': 'http://localhost:8787',
  '/chatbot': 'http://localhost:8787',
  '/chat': 'http://localhost:8787',
  '/health': 'http://localhost:8787'
}
```

### 4. CSP connect-src

Add `http://localhost:8787` to the `connect-src` directive in `vite.config.ts` as a fallback for any direct requests:

```typescript
http://localhost:8787
```

### 5. Set up api-workers secrets

Create `api-workers/.dev.vars` (gitignored by wrangler). Get values from Bitwarden.

```bash
# IMPORTANT: set this so cookie attributes use SameSite=Lax for local dev
ENVIRONMENT=development

# Database (use STAGING Supabase — do not use production)
SUPABASE_URL=https://dfgcoypusphlqhydnioz.supabase.co
SUPABASE_KEY=<staging-supabase-service-role-key>

# IP Geolocation
MAXMIND_ACCOUNT_ID=<maxmind-account-id>
MAXMIND_API_KEY=<maxmind-api-key>
VPNAPI_API_KEY=<vpnapi-key>

# Blockchain RPCs (any provider works — Tenderly, Alchemy, Infura)
RPC_ENDPOINT_MAINNET=<mainnet-rpc-url>
RPC_ENDPOINT_BASE=<base-rpc-url>
RPC_ENDPOINT_ARBITRUM=<arbitrum-rpc-url>
RPC_ENDPOINT_OPTIMISM=<optimism-rpc-url>
RPC_ENDPOINT_UNICHAIN=<unichain-rpc-url>

# Chatbot / Archon
ARCHON_API_KEY=<archon-api-key>
CHATBOT_TERMS_JWT_SECRET=<any-strong-secret-for-local-dev>

# Error tracking (optional for local dev)
SENTRY_DSN=<sentry-dsn-or-empty>

# Admin (optional — only needed for admin endpoints)
ADMIN_SECRET=<admin-secret>
```

### 6. Start both services

Terminal 1 — worker:
```bash
cd api-workers
npm run dev
# Starts at http://localhost:8787
```

Terminal 2 — webapp:
```bash
cd tarmac
pnpm dev --filter webapp
# Starts at http://localhost:3000
```

---

## Things to Know

### CORS

The worker's `ALLOWED_ORIGINS` already includes `http://localhost:3000`. With the Vite proxy, most requests are same-origin and skip CORS entirely. For any direct cross-origin requests, CORS is handled.

The worker's CORS `allowHeaders` config includes `CF-Access-Client-Id` and `CF-Access-Client-Secret` — the webapp sends these on non-prod chatbot requests. Without them in the allow list, chatbot preflight requests fail.

### Cookies (chatbot JWT)

The chatbot terms flow sets a `chatbot_terms_token` JWT cookie. In production this uses `SameSite=None; Secure` for cross-origin support. Locally this causes problems:

- `SameSite=None; Secure` cookies require HTTPS. Even though Chrome treats `localhost` as a secure context, cross-port cookie handling (`localhost:3000` ↔ `localhost:8787`) over HTTP is unreliable.
- The fix has two parts:
  1. **Vite proxy** — requests go through `localhost:3000` (same-origin), so the cookie round-trips on the same origin.
  2. **Environment-aware cookie attributes** — the worker uses `SameSite=Lax` when `ENVIRONMENT` is not `production` or `staging` (see `getCookieSameSiteAttribute()` in `helpers/cookie.ts`). This is why `.dev.vars` must set `ENVIRONMENT=development`.

### CF-Connecting-IP

In production, Cloudflare sets `CF-Connecting-IP` automatically. Locally, `wrangler dev` simulates this. The worker's `getClientIp()` falls back through `CF-Connecting-IPv6` → `CF-Connecting-IP` → `X-Forwarded-For` → `True-Client-IP`, so IP detection works locally.

### IP Whitelist

The worker has a hardcoded whitelist of ~60 test IPs (Endtest) that bypass IP checks entirely. Your local IP won't be on this list, so you'll hit the real MaxMind/VPNAPI flow.

### Staging Supabase

Set `SUPABASE_URL` in `.dev.vars` to point at the staging instance (`https://dfgcoypusphlqhydnioz.supabase.co`). Without this, `wrangler dev` uses the production URL from `wrangler.toml`. Make sure `SUPABASE_KEY` matches whichever instance you're pointing at.

---

## Verification Checklist

Once both services are running, walk through the full user flow:

### Health
- [ ] `curl http://localhost:8787/health` returns `OK`

### Auth Flow
- [ ] Load webapp — VPN check fires automatically (`GET /ip/status`)
- [ ] Connect wallet — address check fires (`GET /address/status?address=0x...`)
- [ ] Verify both return real responses (not mocked)

### Terms Flow
- [ ] Connect wallet — terms check fires (`POST /terms-acceptance/check`)
- [ ] If terms not accepted, modal appears
- [ ] Sign and submit terms — `POST /terms-acceptance/add` succeeds with 201
- [ ] Refresh page — terms check now returns `termsAccepted: true`

### Chatbot Flow
- [ ] Open chatbot — terms check fires (`POST /chatbot/terms/check`)
- [ ] Accept chatbot terms — `POST /chatbot/terms/sign` sets JWT cookie
- [ ] Send a message — `POST /chat` proxies to Archon and returns response
- [ ] Submit feedback — `POST /chatbot/feedback` succeeds
- [ ] Wallet association — `POST /chatbot/terms/wallet` links wallet to session

### DevTools Check
- [ ] Network tab: API calls go to `localhost:3000` (proxied to worker)
- [ ] No CORS errors in console
- [ ] No CSP violations in console
- [ ] Chatbot JWT cookie visible in Application > Cookies > localhost

---

## What's Not Covered

- **Cloudflare Cache API** — `wrangler dev` provides local cache simulation but behavior may differ from production.
- **Cloudflare headers** — Production headers like `cf-ray`, `cf-cache-status`, `CF-IPCountry` won't be present locally.
- **Rate limiting / WAF** — Cloudflare-level protections are bypassed in local dev.
- **Production data** — Testing against staging Supabase. Terms records, denylist entries, etc. will differ from production.
