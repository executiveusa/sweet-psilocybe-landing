export type ProductCategory = "Apparel" | "Drinkware" | "Art Prints";

export interface StoreVariant {
  id: string;
  label: string;
  priceCents: number;
  inStock: boolean;
}

export interface StoreProduct {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  priceCents: number;
  priceFormatted: string;
  image: string;
  variants: StoreVariant[];
  fulfillmentNote: string;
}

export interface StoreCatalogResponse {
  source: "printify" | "curated-preview";
  products: StoreProduct[];
}

export function formatPriceCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export const CURATED_PREVIEW_PRODUCTS: StoreProduct[] = [
  {
    id: "mycelium-network-tee",
    title: "Mycelium Network Tee",
    category: "Apparel",
    description:
      "Organic ring-spun cotton tee featuring original Pacific Northwest mycelial lattice artwork. Soft, breathable, and printed to order with water-based inks.",
    priceCents: 3500,
    priceFormatted: "$35.00",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    variants: [
      { id: "tee-s", label: "S", priceCents: 3500, inStock: true },
      { id: "tee-m", label: "M", priceCents: 3500, inStock: true },
      { id: "tee-l", label: "L", priceCents: 3500, inStock: true },
      { id: "tee-xl", label: "XL", priceCents: 3700, inStock: true },
    ],
    fulfillmentNote: "Printed on demand via Printify • Ships from US facilities",
  },
  {
    id: "spore-print-hoodie",
    title: "Spore Print Heavyweight Hoodie",
    category: "Apparel",
    description:
      "Cozy heavy-blend pullover hoodie with botanical gill-and-spore line art across the back. Built for misty San Juan mornings and late-night field notes.",
    priceCents: 6500,
    priceFormatted: "$65.00",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    variants: [
      { id: "hoodie-s", label: "S", priceCents: 6500, inStock: true },
      { id: "hoodie-m", label: "M", priceCents: 6500, inStock: true },
      { id: "hoodie-l", label: "L", priceCents: 6500, inStock: true },
      { id: "hoodie-xl", label: "XL", priceCents: 6800, inStock: true },
    ],
    fulfillmentNote: "Printed on demand via Printify • Ships from US facilities",
  },
  {
    id: "botanical-field-mug",
    title: "PNW Mycology Ceramic Mug",
    category: "Drinkware",
    description:
      "11oz matte-finish ceramic mug illustrated with classic Pacific Northwest forest fungi taxonomy. Dishwasher and microwave safe.",
    priceCents: 1800,
    priceFormatted: "$18.00",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    variants: [
      { id: "mug-11", label: "11 oz", priceCents: 1800, inStock: true },
      { id: "mug-15", label: "15 oz", priceCents: 2200, inStock: true },
    ],
    fulfillmentNote: "Printed on demand via Printify • Lead- and BPA-free ceramic",
  },
  {
    id: "san-juan-canopy-print",
    title: "San Juan Canopy Archival Print",
    category: "Art Prints",
    description:
      "Museum-grade matte giclée art print celebrating bioluminescent Pacific Northwest woodland fungi and old-growth cedar ecosystems.",
    priceCents: 2800,
    priceFormatted: "$28.00",
    image: "/background/library-background.webp",
    variants: [
      { id: "print-12x16", label: '12" × 16"', priceCents: 2800, inStock: true },
      { id: "print-18x24", label: '18" × 24"', priceCents: 4200, inStock: true },
    ],
    fulfillmentNote: "Archival 200gsm matte paper • Shipped in protective tube",
  },
];

interface RawPrintifyVariant {
  id: number | string;
  title?: string;
  price?: number;
  is_enabled?: boolean;
  is_available?: boolean;
}

interface RawPrintifyImage {
  src?: string;
  is_default?: boolean;
}

interface RawPrintifyProduct {
  id: number | string;
  title?: string;
  description?: string;
  tags?: string[];
  variants?: RawPrintifyVariant[];
  images?: RawPrintifyImage[];
}

function inferCategory(title: string, tags: string[] = []): ProductCategory {
  const haystack = `${title} ${tags.join(" ")}`.toLowerCase();
  if (haystack.includes("mug") || haystack.includes("tumbler") || haystack.includes("cup")) {
    return "Drinkware";
  }
  if (haystack.includes("poster") || haystack.includes("print") || haystack.includes("canvas")) {
    return "Art Prints";
  }
  return "Apparel";
}

export function mapPrintifyProduct(raw: RawPrintifyProduct): StoreProduct {
  const title = raw.title?.trim() || "Sweet Psilocybe Edition";
  const cleanDescription =
    typeof raw.description === "string"
      ? raw.description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
      : "Artistic Pacific Northwest mycology merchandise printed on demand.";

  const enabledVariants = (raw.variants ?? []).filter(
    (v) => v.is_enabled !== false
  );
  const mappedVariants: StoreVariant[] =
    enabledVariants.length > 0
      ? enabledVariants.slice(0, 8).map((v) => ({
          id: String(v.id),
          label: v.title || "Standard",
          priceCents: typeof v.price === "number" ? v.price : 3500,
          inStock: v.is_available !== false,
        }))
      : [{ id: "default", label: "Standard", priceCents: 3500, inStock: true }];

  const basePriceCents = mappedVariants[0].priceCents;
  const defaultImg =
    raw.images?.find((img) => img.is_default)?.src ||
    raw.images?.[0]?.src ||
    CURATED_PREVIEW_PRODUCTS[0].image;

  return {
    id: String(raw.id),
    title,
    category: inferCategory(title, raw.tags),
    description: cleanDescription,
    priceCents: basePriceCents,
    priceFormatted: formatPriceCents(basePriceCents),
    image: defaultImg,
    variants: mappedVariants,
    fulfillmentNote: "Printed on demand via Printify • Official Sweet Psilocybe Merch",
  };
}
