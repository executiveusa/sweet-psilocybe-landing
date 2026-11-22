'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CURATED_PREVIEW_PRODUCTS,
  formatPriceCents,
  type StoreCatalogResponse,
  type StoreProduct,
} from '@/data/storeCatalog';
import { addToCart, cartItemCount, readCart } from '@/lib/storeCart';
import {
  DetailWrapper,
  Container,
  BackLink,
  ProductLayout,
  ImageGallery,
  ProductDetails,
  AddToCartBtn,
} from './styles';

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const [product, setProduct] = useState<StoreProduct | null>(
    () => CURATED_PREVIEW_PRODUCTS.find((p) => p.id === productId) ?? null
  );
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [bagCount, setBagCount] = useState(0);

  useEffect(() => {
    setBagCount(cartItemCount(readCart()));

    const loadProduct = async () => {
      try {
        const res = await fetch('/api/store/printify/products');
        if (res.ok) {
          const payload: StoreCatalogResponse = await res.json();
          const match = payload?.products?.find((p) => p.id === productId);
          if (match) {
            setProduct(match);
            setSelectedVariantId(match.variants[0]?.id ?? '');
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      }
      setLoading(false);
    };

    loadProduct();
  }, [productId]);

  useEffect(() => {
    if (product && !selectedVariantId && product.variants[0]) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product, selectedVariantId]);

  if (!loading && !product) {
    return (
      <DetailWrapper>
        <Container>
          <BackLink>
            <Link href="/store">← Back to Collection</Link>
          </BackLink>
          <div className="rounded-2xl border border-white/15 bg-[#0B0D12]/80 backdrop-blur-xl p-10 text-center">
            <h1 className="text-2xl font-bold text-white mb-3">
              Item Not Found
            </h1>
            <p className="text-white/70 mb-6">
              This edition is no longer in the active catalog or the link has
              expired.
            </p>
            <Link
              href="/store"
              className="inline-block rounded-full bg-[#F6AFCF] px-6 py-2.5 text-sm font-semibold text-[#0B0D12]"
            >
              Browse Full Collection
            </Link>
          </div>
        </Container>
      </DetailWrapper>
    );
  }

  if (!product) {
    return (
      <DetailWrapper>
        <Container>
          <p className="text-center text-white/70 py-16">
            Loading product details...
          </p>
        </Container>
      </DetailWrapper>
    );
  }

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];

  const handleAddToBag = () => {
    if (!activeVariant) return;
    const updated = addToCart({
      productId: product.id,
      variantId: activeVariant.id,
      title: product.title,
      variantLabel: activeVariant.label,
      priceCents: activeVariant.priceCents,
      image: product.image,
    });
    setBagCount(cartItemCount(updated));
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 2400);
  };

  return (
    <DetailWrapper>
      <Container>
        <BackLink className="flex items-center justify-between">
          <Link href="/store">← Back to Collection</Link>
          <Link href="/store" className="text-sm text-[#A9C0B0]">
            Bag ({bagCount})
          </Link>
        </BackLink>

        <ProductLayout
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <ImageGallery>
            <img src={product.image} alt={product.title} />
          </ImageGallery>

          <ProductDetails>
            <span className="text-xs uppercase tracking-widest text-[#A9C0B0] mb-2">
              {product.category}
            </span>
            <h1>{product.title}</h1>
            <div className="price">
              {activeVariant
                ? formatPriceCents(activeVariant.priceCents)
                : product.priceFormatted}
            </div>
            <p className="description">{product.description}</p>

            {product.variants.length > 0 && (
              <div className="mb-6">
                <div className="text-xs uppercase tracking-wider text-white/60 mb-2">
                  Select Size / Edition
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const selected = variant.id === activeVariant?.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        disabled={!variant.inStock}
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium border transition cursor-pointer ${
                          selected
                            ? 'border-[#F6AFCF] bg-[#F6AFCF]/20 text-white'
                            : 'border-white/15 bg-white/5 text-white/75 hover:border-white/40'
                        } ${!variant.inStock ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        {variant.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <AddToCartBtn type="button" onClick={handleAddToBag}>
              {addedFeedback
                ? `Added (${activeVariant?.label}) ✓`
                : 'Add to Bag'}
            </AddToCartBtn>

            <p className="mt-4 text-xs text-white/60 leading-relaxed">
              {product.fulfillmentNote}. 100% artistic apparel &amp; educational
              merchandise — Sweet Psilocybe never sells controlled substances.
            </p>
          </ProductDetails>
        </ProductLayout>
      </Container>
    </DetailWrapper>
  );
}
