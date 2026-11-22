#!/usr/bin/env node
/**
 * Repeatable Printify Holiday & Winter Merch Seeder for Sweet Psilocybe
 * - Reads PRINTIFY_API_KEY from .env.local (never logs secrets)
 * - Uploads public/images/sweet-psilocybe-crest-transparent.png
 * - Resolves live Printify catalog blueprints, US print providers, and variants
 * - Creates 10 top-selling Holiday & Cold-Weather products idempotently in Shop 29862406
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ENV_PATH = path.join(ROOT, ".env.local");
const LOGO_PATH = path.join(
  ROOT,
  "public/images/sweet-psilocybe-crest-transparent.png"
);
const SHOP_ID = process.env.PRINTIFY_SHOP_ID || "29862406";

function loadApiKey() {
  if (process.env.PRINTIFY_API_KEY) return process.env.PRINTIFY_API_KEY.trim();
  if (!fs.existsSync(ENV_PATH)) {
    throw new Error(".env.local not found");
  }
  const lines = fs.readFileSync(ENV_PATH, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*PRINTIFY_API_KEY=(.+)$/);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("PRINTIFY_API_KEY not found in .env.local");
}

const API_KEY = loadApiKey();
const BASE = "https://api.printify.com/v1";

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
    throw new Error(
      `Printify ${endpoint} HTTP ${res.status}: ${JSON.stringify(json).slice(0, 260)}`
    );
  }
  return json;
}

// 10 Top-Selling Holiday & Cold-Weather Merch Definitions (Nov/Dec Peak Season)
const PRODUCT_SPECS = [
  {
    title: "Sweet Psilocybe Crest Heavyweight Hoodie",
    description:
      "Our #1 winter essential. Cozy Gildan 18500 heavy-blend hooded sweatshirt featuring the original Sweet Psilocybe mushroom & fern crest. Warm fleece interior built for misty Pacific Northwest mornings and holiday gifting.",
    tags: ["Winter", "Hoodie", "Holiday Gift", "Apparel", "Mycology"],
    priceCents: 5499,
    scale: 0.72,
    match: (b) =>
      /heavy blend.*hooded sweatshirt/i.test(b.title) &&
      /18500|gildan/i.test(`${b.title} ${b.brand} ${b.model}`),
    preferredColors: ["Black", "Forest Green", "Dark Heather", "Maroon", "Sand"],
    maxVariants: 12,
  },
  {
    title: "Sweet Psilocybe Winter Crewneck Sweatshirt",
    description:
      "Classic Gildan 18000 heavy-blend fleece crewneck sweatshirt stamped with the Sweet Psilocybe botanical crest. Soft, durable, and a top cold-weather holiday gift for mycology enthusiasts.",
    tags: ["Winter", "Sweatshirt", "Crewneck", "Holiday Gift", "Apparel"],
    priceCents: 4499,
    scale: 0.72,
    match: (b) =>
      /heavy blend.*crewneck sweatshirt/i.test(b.title) &&
      /18000|gildan/i.test(`${b.title} ${b.brand} ${b.model}`),
    preferredColors: ["Black", "Forest Green", "Dark Heather", "Maroon", "Sand"],
    maxVariants: 12,
  },
  {
    title: "Sweet Psilocybe PNW Knit Beanie",
    description:
      "Warm ribbed winter knit beanie featuring the Sweet Psilocybe circular crest. Designed for chilly coastal trails, winter foraging walks, and holiday stocking stuffers.",
    tags: ["Winter", "Beanie", "Headwear", "Holiday Gift", "Apparel"],
    priceCents: 2899,
    scale: 0.78,
    match: (b) => /beanie/i.test(b.title) && !/baby/i.test(b.title),
    preferredColors: ["Black", "Forest", "Green", "Charcoal", "Heather", "White"],
    maxVariants: 8,
  },
  {
    title: "Sweet Psilocybe Velveteen Plush Holiday Blanket",
    description:
      "Ultra-soft velveteen plush fleece throw blanket showcasing the Sweet Psilocybe crest. A cozy centerpiece for winter evenings, reading sessions, and holiday gifting.",
    tags: ["Winter", "Blanket", "Home", "Holiday Gift", "Cozy"],
    priceCents: 5999,
    scale: 0.68,
    match: (b) => /velveteen plush blanket|sherpa fleece blanket/i.test(b.title),
    preferredColors: [],
    maxVariants: 4,
  },
  {
    title: "Sweet Psilocybe Botanical Ceramic Mug",
    description:
      "Glossy ceramic mug adorned with the signature Sweet Psilocybe fern & mushroom crest. Ideal for morning coffee, functional mushroom tea, or holiday cocoa. Microwave and dishwasher safe.",
    tags: ["Drinkware", "Mug", "Holiday Gift", "Stocking Stuffer"],
    priceCents: 1899,
    scale: 0.78,
    match: (b) =>
      /ceramic mug/i.test(b.title) &&
      (/11oz|15oz|accent|white glossy/i.test(b.title)),
    preferredColors: ["White", "Black", "Green", "Pink"],
    maxVariants: 6,
  },
  {
    title: "Sweet Psilocybe Insulated Winter Travel Tumbler",
    description:
      "Double-wall stainless steel vacuum-insulated tumbler that keeps tea, coffee, or cocoa piping hot on cold Pacific Northwest drives and winter hikes.",
    tags: ["Drinkware", "Tumbler", "Winter", "Holiday Gift"],
    priceCents: 3299,
    scale: 0.75,
    match: (b) =>
      /tumbler/i.test(b.title) && /20oz|insulated|stainless|ringneck/i.test(b.title),
    preferredColors: ["Black", "White", "Green", "Navy"],
    maxVariants: 6,
  },
  {
    title: "Sweet Psilocybe Ceramic Holiday Ornament",
    description:
      "Limited seasonal ceramic holiday ornament printed with the Sweet Psilocybe petal-pink mushroom & fern crest. Includes hanging ribbon — an unforgettable botanical gift.",
    tags: ["Holiday", "Ornament", "Home", "Stocking Stuffer"],
    priceCents: 1699,
    scale: 0.88,
    match: (b) => /ceramic ornament/i.test(b.title),
    preferredColors: [],
    maxVariants: 4,
  },
  {
    title: "Sweet Psilocybe Heavyweight Long Sleeve Tee",
    description:
      "Soft heavyweight cotton long sleeve shirt built for crisp autumn and winter layering, featuring the Sweet Psilocybe crest centered on the chest.",
    tags: ["Winter", "Long Sleeve", "Apparel", "Layering"],
    priceCents: 3499,
    scale: 0.72,
    match: (b) =>
      /long sleeve/i.test(b.title) &&
      /unisex|cotton|jersey|heavy/i.test(b.title) &&
      !/youth|kids|toddler|baby/i.test(b.title),
    preferredColors: ["Black", "Forest Green", "Dark Heather", "White", "Sand"],
    maxVariants: 12,
  },
  {
    title: "Sweet Psilocybe Forager Cotton Canvas Tote",
    description:
      "Durable cotton canvas tote bag printed with the Sweet Psilocybe crest. Perfect for books, market runs, holiday gifting, and everyday Pacific Northwest carry.",
    tags: ["Accessories", "Tote", "Holiday Gift", "Foraging"],
    priceCents: 2499,
    scale: 0.78,
    match: (b) =>
      /cotton.*tote|canvas tote|tote bag/i.test(b.title) && !/aop/i.test(b.title),
    preferredColors: ["Black", "Natural", "White"],
    maxVariants: 6,
  },
  {
    title: "Sweet Psilocybe Signature Organic-Feel Tee",
    description:
      "Our year-round classic Bella+Canvas 3001 unisex jersey tee featuring the crisp Sweet Psilocybe circular crest. Lightweight, ultra-soft combed cotton ideal for gifting in any climate.",
    tags: ["Apparel", "Tee", "Bestseller", "Holiday Gift"],
    priceCents: 3299,
    scale: 0.72,
    match: (b) =>
      /unisex jersey short sleeve tee/i.test(b.title) &&
      /3001|bella/i.test(`${b.title} ${b.brand} ${b.model}`),
    preferredColors: ["Black", "Forest", "Dark Grey Heather", "Maroon", "White"],
    maxVariants: 12,
  },
];

function pickVariants(allVariants, preferredColors, maxVariants) {
  const usable = allVariants.filter((v) => v && v.id);
  const preferredSizes = new Set(["S", "M", "L", "XL", "One size", "11oz", "15oz", "20oz", '50" × 60"', '30" × 40"']);

  let filtered = usable;
  if (preferredColors.length > 0) {
    const colorMatched = usable.filter((v) => {
      const color = String(v.options?.color || v.title || "").toLowerCase();
      return preferredColors.some((pc) => color.includes(pc.toLowerCase()));
    });
    if (colorMatched.length > 0) filtered = colorMatched;
  }

  const sizeMatched = filtered.filter((v) => {
    const size = String(v.options?.size || "");
    return !size || preferredSizes.has(size);
  });
  if (sizeMatched.length > 0) filtered = sizeMatched;

  return filtered.slice(0, maxVariants);
}

async function main() {
  if (!fs.existsSync(LOGO_PATH)) {
    throw new Error(`Missing transparent logo PNG at ${LOGO_PATH}`);
  }

  console.log("1) Checking existing products in Printify shop", SHOP_ID);
  const existingRes = await pfetch(`/shops/${SHOP_ID}/products.json`);
  const existingTitles = new Set(
    (existingRes.data || []).map((p) => String(p.title).trim().toLowerCase())
  );
  console.log(`   Existing products in shop: ${existingTitles.size}`);

  console.log("2) Uploading transparent Sweet Psilocybe crest logo to Printify...");
  const b64 = fs.readFileSync(LOGO_PATH).toString("base64");
  const uploaded = await pfetch("/uploads/images.json", {
    method: "POST",
    body: JSON.stringify({
      file_name: "sweet-psilocybe-crest-2026.png",
      contents: b64,
    }),
  });
  const imageId = uploaded.id;
  console.log(`   Uploaded image ID: ${imageId} (${uploaded.width}x${uploaded.height})`);

  console.log("3) Fetching live Printify blueprint catalog...");
  const blueprints = await pfetch("/catalog/blueprints.json");
  console.log(`   Loaded ${blueprints.length} blueprints`);

  const created = [];
  const skipped = [];
  const failed = [];

  for (const spec of PRODUCT_SPECS) {
    if (existingTitles.has(spec.title.toLowerCase())) {
      skipped.push(spec.title);
      console.log(`   [SKIP] Already exists: ${spec.title}`);
      continue;
    }

    const candidates = blueprints.filter(spec.match);
    if (candidates.length === 0) {
      failed.push({ title: spec.title, reason: "No matching blueprint found" });
      console.error(`   [FAIL] No blueprint for: ${spec.title}`);
      continue;
    }

    let productCreated = null;
    let lastErr = "";

    for (const bp of candidates.slice(0, 4)) {
      try {
        const providers = await pfetch(
          `/catalog/blueprints/${bp.id}/print_providers.json`
        );
        if (!Array.isArray(providers) || providers.length === 0) continue;

        // Prefer US print provider when location is present
        const provider =
          providers.find((p) => p.location?.country === "US") || providers[0];

        const variantPayload = await pfetch(
          `/catalog/blueprints/${bp.id}/print_providers/${provider.id}/variants.json`
        );
        const allVariants = variantPayload.variants || [];
        const chosen = pickVariants(
          allVariants,
          spec.preferredColors,
          spec.maxVariants
        );
        if (chosen.length === 0) continue;

        // Find a valid print area position supported by the chosen variants
        const firstPh = chosen[0].placeholders || [];
        const preferredPh =
          firstPh.find((p) => p.position === "front") ||
          firstPh.find((p) => p.position === "default") ||
          firstPh[0];
        if (!preferredPh) continue;

        const body = {
          title: spec.title,
          description: spec.description,
          blueprint_id: bp.id,
          print_provider_id: provider.id,
          tags: spec.tags,
          variants: chosen.map((v) => ({
            id: v.id,
            price: spec.priceCents,
            is_enabled: true,
          })),
          print_areas: [
            {
              variant_ids: chosen.map((v) => v.id),
              placeholders: [
                {
                  position: preferredPh.position,
                  images: [
                    {
                      id: imageId,
                      x: 0.5,
                      y: 0.5,
                      scale: spec.scale,
                      angle: 0,
                    },
                  ],
                },
              ],
            },
          ],
        };

        const res = await pfetch(`/shops/${SHOP_ID}/products.json`, {
          method: "POST",
          body: JSON.stringify(body),
        });
        productCreated = {
          id: res.id,
          title: res.title,
          blueprint: `${bp.id} (${bp.title})`,
          provider: `${provider.id} (${provider.title})`,
          variants: chosen.length,
          price: `$${(spec.priceCents / 100).toFixed(2)}`,
          mockup: res.images?.[0]?.src || "(generating)",
        };
        created.push(productCreated);
        console.log(
          `   [OK] ${productCreated.title} | ${productCreated.price} | ${productCreated.variants} variants | blueprint=${bp.id} provider=${provider.id}`
        );
        break;
      } catch (err) {
        lastErr = err instanceof Error ? err.message : String(err);
      }
    }

    if (!productCreated) {
      failed.push({ title: spec.title, reason: lastErr || "Creation failed" });
      console.error(`   [FAIL] ${spec.title}: ${lastErr}`);
    }
  }

  console.log("\n=== SUMMARY ===");
  console.log(`Created: ${created.length} | Skipped: ${skipped.length} | Failed: ${failed.length}`);
  if (failed.length > 0) {
    console.log("Failures:", JSON.stringify(failed, null, 2));
  }
}

main().catch((err) => {
  console.error("Seeder error:", err.message);
  process.exit(1);
});
