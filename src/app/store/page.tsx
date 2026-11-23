'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CURATED_PREVIEW_PRODUCTS,
  formatPriceCents,
  type ProductCategory,
  type StoreCatalogResponse,
  type StoreProduct,
} from '@/data/storeCatalog';
import {
  cartItemCount,
  cartSubtotalCents,
  readCart,
  removeFromCart,
  type CartItem,
} from '@/lib/storeCart';
import {
  StoreWrapper,
  StoreHero,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductPrice,
  ViewButton,
} from './styles';

const FloatingPropStage = dynamic(
  () => import('@/gateway-kit/components/FloatingPropStage'),
  { ssr: false }
);

const CATEGORIES: Array<ProductCategory | 'All'> = [
  'All',
  'Apparel',
  'Drinkware',
  'Home & Holiday',
  'Accessories',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export default function StorePage() {
  const [products, setProducts] = useState<StoreProduct[]>(
    CURATED_PREVIEW_PRODUCTS
  );
  const [source, setSource] = useState<'printify' | 'curated-preview'>(
    'curated-preview'
  );
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>(
    'All'
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    setCart(readCart());

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/store/printify/products');
        if (res.ok) {
          const payload: StoreCatalogResponse = await res.json();
          if (Array.isArray(payload?.products) && payload.products.length > 0) {
            setProducts(payload.products);
            setSource(payload.source);
          }
        }
      } catch (err) {
        console.error('Failed to sync store catalog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const totalItems = cartItemCount(cart);
  const subtotal = cartSubtotalCents(cart);

  return (
    <StoreWrapper>
      <StoreHero
        as={motion.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FloatingPropStage
          glbUrl="/models/store-prop.glb"
          height={190}
          accentColor="#F6AFCF"
        />
        <h1>The Collection</h1>
        <p>
          Support the Science. Wear the Movement.{' '}
          {loading
            ? '(Syncing catalog...)'
            : source === 'printify'
              ? 'Live Printify print-on-demand catalog.'
              : 'Artistic PNW apparel & prints — 100% educational merch, zero controlled substances.'}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{ touchAction: 'manipulation' }}
              className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-medium transition-transform duration-150 active:scale-[0.97] cursor-pointer border ${
                activeCategory === cat
                  ? 'border-[#F6AFCF]/70 bg-[#F6AFCF]/20 text-[#F6AFCF]'
                  : 'border-white/15 bg-black/50 text-white/75 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setBagOpen((v) => !v)}
            style={{ touchAction: 'manipulation' }}
            className="min-h-[44px] rounded-full px-4 py-2 text-sm font-semibold border border-[#A9C0B0]/50 bg-[#A9C0B0]/15 text-[#A9C0B0] hover:bg-[#A9C0B0]/25 transition-transform duration-150 active:scale-[0.97] cursor-pointer"
          >
            Bag ({totalItems})
          </button>
        </div>

        {bagOpen && (
          <div className="mt-4 w-full max-w-lg rounded-2xl border border-[#A9C0B0]/30 bg-[#0B0D12]/90 backdrop-blur-xl p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-white">
                Saved Bag ({totalItems})
              </span>
              <button
                type="button"
                onClick={() => setBagOpen(false)}
                className="text-xs text-white/60 hover:text-white cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-sm text-white/65">
                Your bag is empty. Select any item below to choose a size or
                edition.
              </p>
            ) : (
              <>
                <ul className="space-y-2.5 mb-4">
                  {cart.map((entry) => (
                    <li
                      key={`${entry.productId}-${entry.variantId}`}
                      className="flex items-center justify-between gap-3 text-sm border-b border-white/10 pb-2"
                    >
                      <div>
                        <div className="text-white font-medium">
                          {entry.title}{' '}
                          <span className="text-white/55">
                            ({entry.variantLabel})
                          </span>
                        </div>
                        <div className="text-xs text-white/60">
                          Qty {entry.quantity} &bull;{' '}
                          {formatPriceCents(entry.priceCents * entry.quantity)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setCart(
                            removeFromCart(entry.productId, entry.variantId)
                          )
                        }
                        className="text-xs text-[#F6AFCF] hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between text-sm font-semibold text-white mb-2">
                  <span>Estimated Subtotal</span>
                  <span>{formatPriceCents(subtotal)}</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  {source === 'printify'
                    ? 'Live Printify fulfillment is active. Checkout links open once Stripe is connected.'
                    : 'Your selections are saved locally. Checkout activates automatically once Printify & Stripe live keys are connected.'}
                </p>
              </>
            )}
          </div>
        )}
      </StoreHero>

      <ProductGrid
        as={motion.div}
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.map((product) => (
          <Link
            href={`/store/${product.id}`}
            key={product.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ProductCard as={motion.article} variants={itemVariants}>
              <ProductImage>
                <img src={product.image} alt={product.title} loading="lazy" />
              </ProductImage>
              <ProductInfo>
                <span className="text-[11px] uppercase tracking-wider text-[#A9C0B0] mb-1">
                  {product.category}
                </span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <ProductPrice>{product.priceFormatted}</ProductPrice>
                <ViewButton>Select Size &amp; Details</ViewButton>
              </ProductInfo>
            </ProductCard>
          </Link>
        ))}
      </ProductGrid>
    </StoreWrapper>
  );
}
