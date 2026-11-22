import { NextResponse } from "next/server";
import {
  CURATED_PREVIEW_PRODUCTS,
  mapPrintifyProduct,
  type StoreCatalogResponse,
} from "@/data/storeCatalog";

export async function GET() {
  const PRINTIFY_API_TOKEN =
    process.env.PRINTIFY_API_KEY || process.env.PRINTIFY_API_TOKEN;
  let PRINTIFY_SHOP_ID = process.env.PRINTIFY_SHOP_ID;

  if (!PRINTIFY_API_TOKEN) {
    const fallback: StoreCatalogResponse = {
      source: "curated-preview",
      products: CURATED_PREVIEW_PRODUCTS,
    };
    return NextResponse.json(fallback, { status: 200 });
  }

  try {
    if (!PRINTIFY_SHOP_ID) {
      const shopsRes = await fetch("https://api.printify.com/v1/shops.json", {
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_TOKEN}`,
          "User-Agent": "SweetPsilocybe/1.0",
        },
        next: { revalidate: 300 },
      });
      if (shopsRes.ok) {
        const shops = await shopsRes.json();
        if (Array.isArray(shops) && shops[0]?.id) {
          PRINTIFY_SHOP_ID = String(shops[0].id);
        }
      }
    }

    if (!PRINTIFY_SHOP_ID) {
      const fallback: StoreCatalogResponse = {
        source: "curated-preview",
        products: CURATED_PREVIEW_PRODUCTS,
      };
      return NextResponse.json(fallback, { status: 200 });
    }

    const res = await fetch(
      `https://api.printify.com/v1/shops/${PRINTIFY_SHOP_ID}/products.json`,
      {
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "SweetPsilocybe/1.0",
        },
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) {
      throw new Error(`Printify API error: ${res.status} ${res.statusText}`);
    }

    const payload = await res.json();
    const rawList = Array.isArray(payload?.data) ? payload.data : [];
    const mapped = rawList.map(mapPrintifyProduct);

    const response: StoreCatalogResponse = {
      source: mapped.length > 0 ? "printify" : "curated-preview",
      products: mapped.length > 0 ? mapped : CURATED_PREVIEW_PRODUCTS,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch Printify catalog";
    console.error("Printify catalog fetch failed; serving curated preview:", message);
    const fallback: StoreCatalogResponse = {
      source: "curated-preview",
      products: CURATED_PREVIEW_PRODUCTS,
    };
    return NextResponse.json(fallback, { status: 200 });
  }
}
