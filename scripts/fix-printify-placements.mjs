#!/usr/bin/env node
/**
 * Recalibrates all 10 live Printify products in Shop 29862406 with exact
 * print-area coordinates (Printify scale is relative to placeholder WIDTH),
 * swaps the zip-up hoodie (bp=66) for the Gildan 18500 Pullover (bp=77),
 * and uses halo-free crest-clean.png / crest-dark-garment.png artwork.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SHOP_ID = process.env.PRINTIFY_SHOP_ID || "29862406";
const BASE = "https://api.printify.com/v1";

function loadApiKey() {
  if (process.env.PRINTIFY_API_KEY) return process.env.PRINTIFY_API_KEY.trim();
  const lines = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*PRINTIFY_API_KEY=(.+)$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("PRINTIFY_API_KEY not found");
}

const API_KEY = loadApiKey();

async function pfetch(endpoint, opts = {}) {
  const res = await fetch(`${BASE}${endpoint}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "SweetPsilocybe/1.0",
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 300) };
  }
  if (!res.ok) {
    throw new Error(`Printify ${endpoint} HTTP ${res.status}: ${JSON.stringify(json).slice(0, 280)}`);
  }
  return json;
}

async function uploadPng(relPath, remoteName) {
  const b64 = fs.readFileSync(path.join(ROOT, relPath)).toString("base64");
  const up = await pfetch("/uploads/images.json", {
    method: "POST",
    body: JSON.stringify({ file_name: remoteName, contents: b64 }),
  });
  return up.id;
}

async function main() {
  console.log("1) Uploading halo-free & dark-garment PNGs to Printify...");
  const cleanId = await uploadPng(
    "public/images/crest-clean.png",
    "sweet-psilocybe-crest-clean.png"
  );
  const darkId = await uploadPng(
    "public/images/crest-dark-garment.png",
    "sweet-psilocybe-crest-dark-garment.png"
  );
  console.log(`   cleanId=${cleanId} | darkId=${darkId}`);

  const prods = (await pfetch(`/shops/${SHOP_ID}/products.json`)).data || [];
  console.log(`2) Inspecting ${prods.length} live products in shop ${SHOP_ID}...`);

  for (const p of prods) {
    const title = String(p.title || "");
    const variantIds = (p.print_areas?.[0]?.variant_ids) || (p.variants || []).filter((v) => v.is_enabled).map((v) => v.id);
    const pos = p.print_areas?.[0]?.placeholders?.[0]?.position || "front";

    // Replace Zip-Up Hoodie (bp=66) with true Gildan 18500 Pullover Hoodie (bp=77)
    if (p.blueprint_id === 66) {
      console.log(`   [REPLACE] Deleting Zip-Up Hoodie (${p.id}, bp=66) and creating Gildan 18500 Pullover (bp=77)...`);
      await pfetch(`/shops/${SHOP_ID}/products/${p.id}.json`, { method: "DELETE" });

      const providers = await pfetch("/catalog/blueprints/77/print_providers.json");
      const provider =
        providers.find((pr) => pr.id === 99) ||
        providers.find((pr) => pr.location?.country === "US") ||
        providers[0];
      const vData = await pfetch(`/catalog/blueprints/77/print_providers/${provider.id}/variants.json`);
      const preferredColors = ["black", "forest green", "dark heather", "maroon"];
      const preferredSizes = new Set(["S", "M", "L", "XL"]);
      let chosen = (vData.variants || []).filter((v) => {
        const c = String(v.options?.color || v.title || "").toLowerCase();
        const s = String(v.options?.size || "");
        return preferredColors.some((pc) => c.includes(pc)) && preferredSizes.has(s);
      });
      if (chosen.length === 0) chosen = (vData.variants || []).slice(0, 8);
      chosen = chosen.slice(0, 12);

      const created = await pfetch(`/shops/${SHOP_ID}/products.json`, {
        method: "POST",
        body: JSON.stringify({
          title: "Sweet Psilocybe Crest Heavyweight Pullover Hoodie",
          description:
            "Our #1 winter essential. Cozy Gildan 18500 heavy-blend pullover hoodie featuring the original Sweet Psilocybe mushroom & fern artwork centered on the upper chest. Warm fleece interior built for misty Pacific Northwest mornings and holiday gifting.",
          blueprint_id: 77,
          print_provider_id: provider.id,
          tags: ["Winter", "Hoodie", "Pullover", "Holiday Gift", "Apparel"],
          variants: chosen.map((v) => ({ id: v.id, price: 5499, is_enabled: true })),
          print_areas: [
            {
              variant_ids: chosen.map((v) => v.id),
              placeholders: [
                {
                  position: "front",
                  images: [{ id: darkId, x: 0.5, y: 0.34, scale: 0.72, angle: 0 }],
                },
              ],
            },
          ],
        }),
      });
      console.log(`   [OK] Created Pullover Hoodie (${created.id}, bp=77, pp=${provider.id})`);
      continue;
    }

    // Calibrated placement per product blueprint
    let images = [{ id: darkId, x: 0.5, y: 0.30, scale: 0.78, angle: 0 }];
    let background = undefined;

    if (/tee/i.test(title) && !/long sleeve/i.test(title)) {
      images = [{ id: darkId, x: 0.5, y: 0.30, scale: 0.78, angle: 0 }];
    } else if (/long sleeve/i.test(title)) {
      images = [{ id: darkId, x: 0.5, y: 0.30, scale: 0.76, angle: 0 }];
    } else if (/crewneck/i.test(title)) {
      images = [{ id: darkId, x: 0.5, y: 0.30, scale: 0.76, angle: 0 }];
    } else if (/beanie/i.test(title)) {
      // 1500x526 cuff area -> scale 0.30 fits 100% cleanly inside 526px height
      images = [{ id: darkId, x: 0.5, y: 0.50, scale: 0.30, angle: 0 }];
    } else if (/mug/i.test(title)) {
      // 2475x1155 wrap -> double-sided clean circular crest on left & right faces
      images = [
        { id: cleanId, x: 0.24, y: 0.50, scale: 0.36, angle: 0 },
        { id: cleanId, x: 0.76, y: 0.50, scale: 0.36, angle: 0 },
      ];
    } else if (/tumbler/i.test(title)) {
      // 2795x2100 wrap -> centered cleanly on front face, zero rim clipping
      images = [{ id: cleanId, x: 0.5, y: 0.44, scale: 0.42, angle: 0 }];
    } else if (/ornament/i.test(title)) {
      // 1043x996 star -> nested cleanly inside star tips with crisp white border
      images = [{ id: cleanId, x: 0.5, y: 0.54, scale: 0.66, angle: 0 }];
    } else if (/tote/i.test(title)) {
      // 2102x4051 full-wrap tote -> y=0.25 is centered on front face, y=0.75 is back face
      images = [
        { id: cleanId, x: 0.5, y: 0.25, scale: 0.62, angle: 0 },
        { id: cleanId, x: 0.5, y: 0.75, scale: 0.62, angle: 0 },
      ];
    } else if (/blanket/i.test(title)) {
      // 7875x9375 velveteen plush -> rich midnight PNW background + bold centered crest
      background = "#0B0D12";
      images = [{ id: darkId, x: 0.5, y: 0.50, scale: 0.64, angle: 0 }];
    }

    const printArea = {
      variant_ids: variantIds,
      placeholders: [{ position: pos, images }],
    };
    if (background) printArea.background = background;

    await pfetch(`/shops/${SHOP_ID}/products/${p.id}.json`, {
      method: "PUT",
      body: JSON.stringify({ print_areas: [printArea] }),
    });
    console.log(`   [UPDATED] ${title} (${p.id}) -> scale=${images[0].scale} y=${images[0].y}`);
  }

  console.log("\n✅ All 10 Printify products recalibrated cleanly!");
}

main().catch((err) => {
  console.error("Fix error:", err.message);
  process.exit(1);
});
