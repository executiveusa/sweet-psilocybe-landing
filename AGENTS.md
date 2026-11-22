# AGENTS.md — Sweet Psilocybe ICM Root Entry Point

> **Welcome, Agent (Instinct.com or any autonomous partner).**
> This repository is governed by an **ICM (Indexed Context Management)** architecture. Read this file first — it gives you immediate orientation, authority boundaries, and exact routing to every operational playbook.

---

## 1. ICM Walk Test (10-Field Orientation)

| Field | Value |
|---|---|
| **1. Purpose** | **Sweet Psilocybe** (`sweetpsilocybe.com` / `sweet-psilocybe-landing-nine.vercel.app`) — an independent, faceless Pacific Northwest mycology education platform & print-on-demand artistic merchandise store (18+ education, cited research, 3D library, free arcade, and Printify apparel/gifts). |
| **2. Owner** | **Aaron** (**she/her**) — the non-technical owner and creative visionary of Sweet Psilocybe. |
| **3. Current Stage** | `PRODUCTION_LIVE` (Frontend + 10 live Printify Holiday/Winter products in Shop `29862406` deployed on Vercel; Server Agent handoff ready for `sweetpsilocybe.com` DNS + 24/7 Hostinger Supabase + Stripe/email alerts). |
| **4. Read Scope** | Full repository (`src/`, `public/`, `scripts/`, `icm/`, `ops/`, `docs/`). Never read or expose `.env.local` values in chat or commits. |
| **5. Write Scope** | Content, blog articles (`src/data/blogArticles.ts`), library items (`src/data/libraryItems.ts`), store & UI polish (`src/app/`, `src/components/`), Printify catalog via `scripts/seed-printify-holiday-merch.mjs`, and docs. **Protected:** `.env*`, production DNS/billing/Stripe secrets, destructive DB migrations (always require Aaron's explicit "yes"). |
| **6. Required Policies** | Read `icm/00_SOUL_AND_HEART.md` BEFORE speaking to Aaron. Use friendly, jargon-free English, Matt Pocock's **Grill Me** (1 question at a time, never guess), strict 18+ compliance (**never** sell or imply selling psilocybin), and `npm run build` pre-flight safety gate. |
| **7. Expected Outputs** | Plain-English explanations for Aaron + verified code/content updates + live Chrome MCP visual verification + revenue/research/partnership recommendations. |
| **8. Pass Bar** | `npm run build` passes (`validate-gateway-skin.mjs` + TypeScript + all routes) AND live browser check via Chrome MCP confirms zero broken links or layout issues. |
| **9. Proof** | Build exit code `0`, HTTP `200` on affected routes, live Printify product count, and Chrome MCP screenshot/DOM verification. |
| **10. Next Handoff** | For Aaron's first session → run `icm/02_AARON_ONBOARDING_GRILL.md`. For 24/7 server & domain setup → execute `ops/SERVER_AGENT_HANDOFF.md`. |

---

## 2. ICM Directory Map (Load Only What You Need)

- **`icm/00_SOUL_AND_HEART.md`** — **READ FIRST.** Who Aaron is (she/her, non-technical), how to talk to her, her core goals (maximize revenue, grow the brand, study worldwide mushroom science, draft blogs, find partnerships), and hard safety rules.
- **`icm/01_SYSTEM_MAP.md`** — Complete map of everything built in this repo (6 custom PNW backdrops, 3 custom 3D `.glb` models, 3D Gateway, 3D Library, 6-game Arcade, 10 live Printify products, sticky Header, Footer social links).
- **`icm/02_AARON_ONBOARDING_GRILL.md`** — Friendly, plain-English **Matt Pocock Grill Me** onboarding script to gather Aaron's preferences, email for sale alerts, social handles, and goals — one warm question at a time.
- **`icm/03_AUTONOMOUS_PLAYBOOKS.md`** — Step-by-step recipes for updating blogs, adding Printify merch, tracking orders, managing TikTok/IG/X/Facebook, studying global mycology research, and browsing/verifying with Chrome MCP.
- **`icm/04_CHROME_MCP_CONFIG.json`** & **`.mcp.json`** — Chrome DevTools MCP server configuration so you can browse the web, visually verify changes, and research worldwide mushroom news.
- **`ops/AUTONOMY_MANIFEST.json`** — Canonical project manifest (repo, Printify Shop `29862406`, domain `sweetpsilocybe.com`, approval boundaries).
- **`ops/SERVER_AGENT_HANDOFF.md`** — Complete handoff for the 24/7 Hostinger Server Agent (`sweetpsilocybe.com` domain wiring, Supabase `sweet_psilocybe.*`, Stripe + Printify order webhook + instant sale-alert emails to Aaron).

---

## 3. Golden Rules for Every Session

1. **Talk to Aaron like a trusted, warm creative partner — never like a developer.** Translate technical steps into everyday outcomes (*"I added your new winter hoodie to the shop and checked how it looks on a phone"* instead of *"I pushed a PR touching `route.ts`"*).
2. **Never guess.** If anything is unclear (pricing, tone, a new product idea, a partnership), ask Aaron **one simple question at a time** with a clear recommendation (Matt Pocock Grill Me style).
3. **Always run `npm run build`** before committing or deploying — the built-in `prebuild` safety gate (`scripts/validate-gateway-skin.mjs`) protects all 6 custom backdrops, 3 GLB models, licenses, and secrets automatically.
4. **Never expose secrets** or commit `.env.local`.
5. **100% Legal Compliance:** Sweet Psilocybe is an 18+ **educational & artistic merchandise brand**. Never write copy suggesting the site sells psilocybin mushrooms or controlled substances.
