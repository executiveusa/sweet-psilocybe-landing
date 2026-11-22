# 24/7 Server Agent Handoff — Sweet Psilocybe (`sweetpsilocybe.com`)

> **Copy-paste this entire document to your Hostinger Server Agent.**
> **Goal:** Connect the official domain **`sweetpsilocybe.com`**, stand up the 24/7 backend on the Hostinger VPS (`31.220.58.212`), activate live Stripe + Printify order fulfillment, wire instant sale-alert emails to Aaron, and run the 24/7 autonomous research/store monitoring loop.

---

## 1. Verified Current State (Already Done & Live)
- **Repo:** `https://github.com/executiveusa/sweet-psilocybe-landing` (`main`)
- **Vercel Project:** `the-pauli-effect/sweet-psilocybe-landing` (`https://sweet-psilocybe-landing-nine.vercel.app`)
- **Printify Connected:** `PRINTIFY_API_KEY` & `PRINTIFY_SHOP_ID=29862406` are ALREADY set in Vercel (`production`, `preview`, `development`).
- **Live Printify Catalog:** **10 Holiday & Winter-Weather products** using Aaron's transparent crest logo (`6b032dbed3e8c8233c3dc988`) are ALREADY live in Shop `29862406` and served via `/api/store/printify/products`.
- **ICM + Chrome MCP:** `AGENTS.md`, `icm/*`, and `.mcp.json` (`chrome-devtools-mcp`) are committed in the repo.

---

## 2. Task 1 — Wire Official Domain `sweetpsilocybe.com` (Hostinger → Vercel)
1. **In Vercel (`the-pauli-effect/sweet-psilocybe-landing`):**
   - Run `npx vercel domains add sweetpsilocybe.com` and `npx vercel domains add www.sweetpsilocybe.com` (redirect `www` → apex `sweetpsilocybe.com`).
2. **In Hostinger DNS for `sweetpsilocybe.com`:**
   - Set `A` record `@` → `76.76.21.21` (TTL `300`).
   - Set `CNAME` record `www` → `cname.vercel-dns.com` (TTL `300`).
   - Remove any conflicting parking `A` / `AAAA` records on `@`.
3. **Verify SSL & Live Domain:**
   - Confirm `curl -sI https://sweetpsilocybe.com` returns `HTTP/2 200` with valid TLS certificate.
   - Update Vercel env var `NEXT_PUBLIC_SITE_URL=https://sweetpsilocybe.com`.

---

## 3. Task 2 — Provision 24/7 Hostinger Supabase Schema (`sweet_psilocybe.*`)
On Hostinger VPS (`31.220.58.212`), create the isolated PostgreSQL schema `sweet_psilocybe` (never touch other tenants' schemas):
```sql
CREATE SCHEMA IF NOT EXISTS sweet_psilocybe;

CREATE TABLE IF NOT EXISTS sweet_psilocybe.email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sweet_psilocybe.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  printify_order_id TEXT,
  customer_email TEXT NOT NULL,
  items JSONB NOT NULL,
  total_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'paid',
  aaron_notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sweet_psilocybe.mycology_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source_url TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  verified_http_200 BOOLEAN DEFAULT true,
  added_at TIMESTAMPTZ DEFAULT now()
);
```
Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to Vercel env vars (`Sensitive`).

---

## 4. Task 3 — Live Checkout + Printify Order Submission + Instant Sale-Alert Email to Aaron
1. **Stripe Checkout (`/api/store/checkout`):**
   - Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to Vercel env vars.
   - Create `POST /api/store/checkout` that accepts cart items (`productId`, `variantId`, `quantity`), validates prices server-side against Printify Shop `29862406`, and returns a Stripe Checkout Session URL with shipping address collection enabled.
2. **Stripe Webhook → Printify Fulfillment + Aaron Sale Alert (`/api/webhooks/stripe`):**
   - On `checkout.session.completed`:
     1. Verify Stripe signature.
     2. Record order in `sweet_psilocybe.orders` (idempotent on `stripe_session_id`).
     3. Submit the paid order directly to Printify (`POST https://api.printify.com/v1/shops/29862406/orders.json`) with `send_shipping_notification: true`.
     4. Send an **instant plain-English Sale Alert Email to Aaron** (`AARON_ALERT_EMAIL` env var via Resend API `RESEND_API_KEY` or Hostinger SMTP `orders@sweetpsilocybe.com`):
        - Subject: `🍄 Cha-Ching! New Sweet Psilocybe Sale — $XX.XX`
        - Body: Item(s) sold, customer city/state, total amount, Printify Order ID, and tracking status link.
3. **Printify Webhook (`/api/webhooks/printify`):**
   - Register `order:shipped` and `order:shipment:delivered` webhooks in Printify pointing to `https://sweetpsilocybe.com/api/webhooks/printify`, updating `sweet_psilocybe.orders` and notifying Aaron if any shipment hits an issue.

---

## 5. Task 4 — 24/7 Autonomous Worker on Hostinger VPS
Set up a lightweight systemd timer or cron job on `31.220.58.212` running every 6 hours (plus weekly digest):
- **Every 6 hours:** Health-check `https://sweetpsilocybe.com`, `/store`, `/api/store/printify/products` (confirm 10+ products), and reconcile any un-forwarded Printify orders.
- **Weekly (Monday 9am PT):** Run a worldwide mycology research sweep (PubMed / Nature / NIH), insert verified `HTTP 200` studies into `sweet_psilocybe.mycology_knowledge`, and email Aaron a calm 3-bullet digest (new sales total, 1 suggested blog topic, 1 vetted partnership opportunity).

---

## 6. Verification Checklist (Before Reporting Done)
- [ ] `https://sweetpsilocybe.com` returns `HTTP 200` with valid SSL
- [ ] `https://sweetpsilocybe.com/api/store/printify/products` returns `source: "printify"` and `10` products
- [ ] Test Stripe Checkout session completes in test mode → creates Printify draft order → delivers Sale Alert Email to Aaron
- [ ] `sweet_psilocybe.email_subscribers` stores a test signup from `/landing`
- [ ] 24/7 VPS health timer active and logged with zero exposed secrets
