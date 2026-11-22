# HyperFrames + Blender Asset Pipeline

## 1. Blender → Normalized `.glb` (Gateway Centerpiece)
Run the generator script with Blender 4.x installed:
```bash
blender --background --python assets-src/blender/build_sanctuary.py
```
This saves `assets-src/blender/sweet_psilocybe_sanctuary.blend` (editable source, kept out of `public/`) and exports a Draco-compressed, Y-up, meter-scale GLB to `public/skins/sweet-psilocybe/sanctuary.glb`.

To activate the exported GLB in the Gateway, update `src/gateway-kit/skins/sweet-psilocybe.ts`:
```ts
centerpiece: {
  mode: "glb",
  glbUrl: "/skins/sweet-psilocybe/sanctuary.glb",
  ...
}
```
Then run the pre-build validator:
```bash
node scripts/validate-gateway-skin.mjs
```

## 2. HyperFrames (HTML/CSS/GSAP → FFmpeg Video Reels & Hero Loops)
Open `media/hyperframes/hero-loop/index.html` in a browser or render locally with HyperFrames + FFmpeg (already installed on this workstation):
```bash
npx hyperframes render media/hyperframes/hero-loop/index.html --width 1080 --height 1920 --fps 30 --duration 6 --out media/hyperframes/out/sweet-psilocybe-reel.mp4
```
