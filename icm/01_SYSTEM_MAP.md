# 01 — Complete System Map (What We Built & Why)

## Live URLs & Ownership
- **Repository:** `https://github.com/executiveusa/sweet-psilocybe-landing` (branch `main`)
- **Current Live Vercel URL:** `https://sweet-psilocybe-landing-nine.vercel.app`
- **Official Domain (owned on Hostinger):** `https://sweetpsilocybe.com` (ready to wire via `ops/SERVER_AGENT_HANDOFF.md`)
- **Printify Shop:** `Shop ID 29862406` (`10` live Holiday & Winter products using Aaron's transparent crest logo)
- **Framework:** Next.js `16.4.6` (App Router + Turbopack), React 19, TypeScript, Tailwind CSS, `styled-components`, Framer Motion, Three.js (`@react-three/fiber` + `@react-three/drei`).

---

## Every Page & Feature Built

| Route | Purpose | Key Files | Custom Visual / 3D Assets |
|---|---|---|---|
| `/` & `/gateway` | **Living 3D Enchanted Canopy Gateway** — San Juan Islands dusk/twilight toggle, drifting mist, canopy rays, fireflies, interactive 3D Mushroom Spirit (tracks pointer + click-to-spin 360°), orbiting glassmorphic 4-portal wheel, top-bar `⏸ Motion` & audio toggle. | `src/gateway-kit/components/GatewayShell.tsx`, `LivingAtmosphere.tsx`, `OrbitalNavigation.tsx`, `TransparentModelStage.tsx` | `public/background/home-golden-dusk.webp`, `home-twilight.webp`, `public/models/mushroom-spirit.glb` |
| `/landing` | **Main Introduction & Storytelling Home** — 5-beat progressive-disclosure guide explaining Sweet Psilocybe (merch, cited research, films/books, healing benefits of mushrooms), interactive 4-portal 3D Gateway guide, 3 cited science articles, 3 live merch cards, and email capture. | `src/app/landing/LandingClient.tsx`, `src/components/UI/Header/index.tsx`, `src/components/UI/EmailCapture/index.tsx` | `home-twilight.webp` |
| `/store` & `/store/[productId]` | **Printify Print-on-Demand Merch Store** — Connected live to Printify Shop `29862406` via `/api/store/printify/products`. Category filters (`All`, `Apparel`, `Drinkware`, `Home & Holiday`, `Accessories`), variant/size selector, and persistent `localStorage` Bag. | `src/app/store/page.tsx`, `src/app/store/[productId]/page.tsx`, `src/app/api/store/printify/products/route.ts`, `src/data/storeCatalog.ts`, `src/lib/storeCart.ts` | `public/background/store-background.webp`, `public/models/store-prop.glb`, `public/images/sweet-psilocybe-crest-transparent.png` |
| `/blog` & `/blog/[slug]` | **Evidence-Based Research Hub** — 4 peer-reviewed articles with 13 live-verified primary citations (PubMed, Nature, NIH NIDA, WA SB 5263, USDA Forest Service), live search, tag filter pills, and safe typed JSX rendering. | `src/data/blogArticles.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx` | `public/background/blog-background.webp`, `public/models/blog-prop.glb` |
| `/library` | **Interactive 3D Conservatory Library** — Draggable 3D grimoire & glowing bookshelves (`Books`, `Documentaries`, `Movies`), 17 live-verified `HTTP 200` references, search bar, and language filter pills (`English`, `French`, `German`, `Japanese`, `Spanish`). | `src/data/libraryItems.ts`, `src/app/library/page.tsx`, `src/gateway-kit/components/Library3DScene.tsx` | `public/background/library-background.webp` |
| `/games` | **Mycology Arcade** — Native 60fps HTML5 Canvas game (*Mushroom Spirit: Canopy Catch*) + 5 live-verified open-source mushroom games (*Frog Jumper*, *Glimmerwood Dash*, *Fungus*, *Mycelium — First Bloom*, *Underneath*), In-App Full-Screen Theater Mode with pinned **`🍄 ← Return Home`** bar so players are never trapped. | `src/app/games/page.tsx`, `src/components/Games/CanopyCatchGame.tsx` | `public/background/games-background.webp` |
| `/about/*`, `/resources/*`, `/legal/*` | **Trust, Mission, FAQ, Safety & Legal Pages** — All 9 secondary routes styled with transparent PNW backdrops and frosted-glass cards. | `src/app/about/`, `src/app/resources/`, `src/app/legal/` | Shared `PageBackdrop.tsx` |
| Global `Header` & `Footer` | **Sticky Top Header** (`🍄 Sweet Psilocybe` clickable at top-left, 44px mobile drawer) + **Footer** with 18+ disclaimers, info modals, and 4 custom SVG social icons (**TikTok, Instagram, X, Facebook**). | `src/components/UI/Header/index.tsx`, `src/components/UI/Footer/index.tsx`, `src/components/Layout/index.tsx` | Inline custom SVGs |

---

## Automated Pre-Build Safety Gate
Every `npm run build` automatically runs `scripts/validate-gateway-skin.mjs`, which verifies:
1. All **6 custom PNW WebP backdrops** exist and stay under `300 KB`
2. All **3 custom 3D `.glb` models** have valid `glTF` headers and stay under `4 MB`
3. Licensed assets in `src/gateway-kit/skins/sweet-psilocybe.ts` exist
4. `SECRET_GUARD` confirms zero hardcoded API keys or private keys in `src/`
