# Agent Context — Sweet Psilocybe

## Purpose
Faceless mycology education & artistic merchandise brand (18+ education + print-on-demand apparel via Printify; never sells psilocybin).

## Stack
- Next.js 16.2.12 (App Router, Turbopack), React 19.2.0, TypeScript 5, Styled-Components 6
- 3D Gateway: Three.js 0.185, `@react-three/fiber` 9.6, `@react-three/drei` 10.7, `@react-three/postprocessing` 3.0
- Motion / Video: Framer Motion, GSAP, HyperFrames (`media/hyperframes/`), Blender (`assets-src/blender/`)
- Hosting: Vercel (`the-pauli-effect/sweet-psilocybe-landing` → `https://sweet-psilocybe-landing-nine.vercel.app`)
- Planned Backend: Hostinger self-hosted Supabase (`31.220.58.212`, schema `sweet_psilocybe.*` with strict RLS)

## Architecture & Key Paths
- `src/gateway-kit/spec.ts` — Universal `gateway-skin/v1` contract (25-part anatomy)
- `src/gateway-kit/skins/sweet-psilocybe.ts` — Sweet Psilocybe skin manifest + budgets + SPDX licenses
- `src/gateway-kit/components/` — `GatewayShell.tsx`, `GatewayWorld.tsx`, `SanctuaryCenterpiece.tsx`
- `src/gateway-kit/audio/useForestAudio.ts` — Consent-gated WebAudio forest soundscape
- `src/app/(home)/page.tsx` & `src/app/gateway/page.tsx` — 3D Enchanted Canopy Gateway (primary `/` entrance)
- `src/app/landing/` — Rebuilt faceless brand landing page (`/landing`)
- `src/app/store/` — Standalone Printify-backed merch store (`/store`, `/store/[productId]`)
- `src/app/blog/`, `src/app/library/`, `src/app/games/` — Education, global library, and arcade routes
- `scripts/validate-gateway-skin.mjs` — Pre-build skin, asset, GLB budget, and SPDX license validator
- `assets-src/blender/build_sanctuary.py` — Blender 4.x `.blend` → Draco `.glb` generator
- `media/hyperframes/hero-loop/index.html` — HyperFrames HTML/CSS/GSAP motion reel template

## Validation & Deploy Commands
```bash
node scripts/validate-gateway-skin.mjs
npm run build
npx vercel deploy --prod --yes
```

## Decisions Made
- Promoted 3D Gateway (`gateway-skin/v1`) to `/` and moved the faceless brand landing page to `/landing` so visitors enter the 3D experience immediately with a 1-click skip/door.
- Replaced external Drei `<Environment preset>` CDN fetches with a self-hosted procedural sky dome + explicit key/fill/rim lights to stay 100% CSP-compliant and eliminate CDN fetch failures.
- Wired `/store` and `/landing` featured merch to live `/api/store/printify/products` with graceful fallback when Printify env vars are unset.

## Next Recommended Steps
1. Execute the Hostinger self-hosted Supabase `sweet_psilocybe.*` schema + RLS migration (`implementation_plan.md`) and wire `/blog` & `/library` to live Supabase tables.
2. Add `PRINTIFY_API_TOKEN` and `PRINTIFY_SHOP_ID` in Vercel Project Settings so `/store` renders live Printify products.
3. Run `blender --background --python assets-src/blender/build_sanctuary.py` on a machine with Blender 4.x to generate `public/skins/sweet-psilocybe/sanctuary.glb`.
