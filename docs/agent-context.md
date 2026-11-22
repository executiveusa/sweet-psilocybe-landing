# Sweet Psilocybe — Agent Context

## Repo Purpose
**Sweet Psilocybe** (`executiveusa/sweet-psilocybe-landing`, production: `https://sweet-psilocybe-landing-nine.vercel.app`) — an independent, faceless Pacific Northwest mycology education & artistic merchandise brand (18+ evidence-based research + print-on-demand apparel via Printify; never sells controlled substances).

## Stack
- **Framework:** Next.js `16.4.6` (App Router, Turbopack), React 19, TypeScript
- **3D & Motion:** Three.js / `@react-three/fiber` / `@react-three/drei`, Framer Motion, `styled-components` + Tailwind CSS
- **Commerce & Backend:** Printify API (`/api/store/printify/products`), Supabase email capture (planned self-hosted Hostinger `sweet_psilocybe.*` schema)
- **Pre-build Safety Gate:** `scripts/validate-gateway-skin.mjs` (`prebuild` script) verifies all 5 PNW WebP backdrops, 3 GLB models, licensed assets, and `SECRET_GUARD`.

## Main Directories & Data Modules
- `src/gateway-kit/` — 3D Gateway shell, `LivingAtmosphere`, `OrbitalNavigation`, `TransparentModelStage`, `FloatingPropStage`, `Library3DScene`, `PageBackdrop`, `FireFliesBackground`
- `src/data/blogArticles.ts` — Single typed source of truth for `/blog`, `/blog/[slug]`, and `/landing` research highlights (13 live-verified primary citations)
- `src/data/libraryItems.ts` — Single typed source of truth for `/library` (17 live-verified HTTP 200 references across Books, Documentaries, Movies)
- `src/data/storeCatalog.ts` & `src/lib/storeCart.ts` — Single typed catalog + `localStorage` bag shared across `/store`, `/store/[productId]`, `/api/store/printify/products`, and `/landing`
- `src/components/Games/CanopyCatchGame.tsx` — Native 60fps HTML5 Canvas game (*Mushroom Spirit: Canopy Catch*) embedded in `/games` alongside 6 live-verified open-source games
- `public/background/*.webp` & `public/models/*.glb` — 5 PNW backdrops + 3 custom 3D `.glb` assets

## Stacked Local Changes (Uncommitted — Not Yet Deployed to Vercel)
1. **Gateway & Animations:** Fixed Windows `prefers-reduced-motion` freeze, added top-bar `⏸ Motion` toggle, removed untextured square particles, fixed `PageBackdrop` `z-0` layering behind all inner pages, built interactive 3D Library (`Library3DScene.tsx`).
2. **`/games` Arcade:** Built `CanopyCatchGame.tsx` + sandboxed Arcade Cabinet hosting 6 live-verified open-source games (`next.config.js` CSP updated for `*.github.io` & `*.vercel.app`).
3. **`/blog` & `/blog/[slug]`:** Extracted `src/data/blogArticles.ts` with 13 HTTP-200 verified primary citations, live search + tag filters, typed JSX (removed `dangerouslySetInnerHTML`), dynamic `useParams()` lookup.
4. **`/library`:** Extracted `src/data/libraryItems.ts` replacing all 16 `#` dead links with 17 HTTP-200 verified URLs, added live search + language filter pills + hover contrast fix.
5. **`/store` & `/store/[productId]`:** Fixed Printify API 1-item fallback bug with unified `StoreCatalogResponse`, removed deprecated `legacyBehavior` and `alert()`, added category filters, size/variant selector, and persistent `localStorage` bag.
6. **`/landing` & `EmailCapture`:** Migrated `LandingClient.tsx` to `CURATED_PREVIEW_PRODUCTS` + `StoreCatalogResponse` contract, frosted-glass cards, fixed `#privacy` dead link → `/legal/privacy-policy`, removed developer-facing `SUPABASE-SETUP.md` notice.

## Build & Validation Commands
- `Set-Location 'C:\Users\execu\Downloads\sweet-psilocybe-landing'; npm run build` (runs `prebuild` safety gate + Turbopack + TypeScript + 29 routes)

## Known Issues / Next Steps
- **Ready for single batch deploy:** All 5 pages (`/games`, `/blog`, `/library`, `/store`, `/landing`) + animations are stacked and verified locally with zero Vercel deploys burned. Next step: user approval to `git commit` → `git push origin main` → single `npx vercel deploy --prod --yes` + live HTTP 200 smoke test.
- **Later backend phase:** Connect live `PRINTIFY_API_TOKEN` / `PRINTIFY_SHOP_ID` + Stripe checkout + Hostinger self-hosted Supabase `sweet_psilocybe.*` schema.
