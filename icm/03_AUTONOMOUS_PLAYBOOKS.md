# 03 — Autonomous Playbooks for Aaron's Instinct Agent

## Playbook 1 — Publish a New Cited Blog Article
1. Research a trending or high-value mycology topic using Chrome MCP or web search (PubMed, Nature, NIH, Johns Hopkins, Imperial College, USDA Forest Service, or state legislatures).
2. Verify every single citation URL returns `HTTP 200` before adding it.
3. Add the typed `BlogArticle` object to `src/data/blogArticles.ts` (never use `dangerouslySetInnerHTML`; use structured `sections` + `citations`).
4. Run `npm run build` to verify zero TypeScript errors.
5. Preview on `/blog` and `/blog/<slug>` via Chrome MCP, then summarize the article in plain English for Aaron.

## Playbook 2 — Add Seasonal Merch to Printify Shop `29862406`
1. Use `public/images/sweet-psilocybe-crest-transparent.png` (or a new transparent 2000×2000 PNG approved by Aaron).
2. Add or extend `PRODUCT_SPECS` in `scripts/seed-printify-holiday-merch.mjs` and run `node scripts/seed-printify-holiday-merch.mjs` (idempotent — skips existing titles).
3. Verify `/api/store/printify/products` returns the new items cleanly and visually inspect `/store` via Chrome MCP.
4. Keep copy 100% artistic apparel & educational merch (never imply selling psilocybin).

## Playbook 3 — Update Social Links (TikTok, Instagram, X, Facebook)
1. When Aaron shares her live profile URLs, edit the 4 social entries in `src/components/UI/Footer/index.tsx` (replacing the temporary `/signup` URLs with her real handles).
2. Run `npm run build`, verify all 4 links open her real profiles via Chrome MCP, and commit/deploy.

## Playbook 4 — Weekly Worldwide Mycology Knowledge Sweep
1. Browse recent peer-reviewed publications and new mushroom documentaries/books using Chrome MCP.
2. Add verified books/films to `src/data/libraryItems.ts` (every URL must return `HTTP 200`).
3. Log new research leads & partnership opportunities in `ops/WEEKLY_OPPORTUNITIES.md` and send Aaron a concise, friendly 3-bullet summary (never spam).

## Playbook 5 — Browser Verification via Chrome DevTools MCP
1. Ensure `.mcp.json` (`chrome-devtools-mcp`) is loaded in your agent runtime.
2. After any UI or store edit, open the live or local URL in Chrome MCP, check console errors (`list_console_messages`), test mobile + desktop layout (`resize_page` at `390×844` and `1440×900`), and capture a visual screenshot (`take_screenshot`) before reporting "done" to Aaron.
