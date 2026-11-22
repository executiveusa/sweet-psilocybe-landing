'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  StoreWrapper,
  StoreHero,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductPrice,
  ViewButton
} from './styles';

interface DisplayProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

const FALLBACK_PRODUCTS: DisplayProduct[] = [
  {
    id: '1',
    title: 'Mycelium Network Tee',
    description: 'Premium organic cotton tee featuring intricate mycelium network artwork. Soft, breathable, and sustainably sourced.',
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Spore Print Hoodie',
    description: 'Cozy heavy-blend hoodie with abstract spore print design on back. Perfect for chilly foraging mornings.',
    price: '$65.00',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Psilocybe Ceramic Mug',
    description: 'Start your day right. 11oz ceramic mug with scientific illustration of Psilocybe cubensis.',
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function StorePage() {
  const [products, setProducts] = useState<DisplayProduct[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/store/printify/products');
        if (res.ok) {
          const payload = await res.json();
          const list = Array.isArray(payload) ? payload : payload?.data;
          if (Array.isArray(list) && list.length > 0) {
            const mapped: DisplayProduct[] = list.map((item: any) => ({
              id: String(item.id),
              title: item.title || 'Sweet Psilocybe Edition',
              description:
                typeof item.description === 'string'
                  ? item.description.replace(/<[^>]*>/g, '').slice(0, 140)
                  : 'Artistic mycology merchandise printed on demand.',
              price: item.variants?.[0]?.price
                ? `$${(Number(item.variants[0].price) / 100).toFixed(2)}`
                : '$35.00',
              image:
                item.images?.[0]?.src ||
                FALLBACK_PRODUCTS[0].image,
            }));
            setProducts(mapped);
          }
        }
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <StoreWrapper>
      <StoreHero as={motion.header} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1>The Collection</h1>
        <p>Support the Science. Wear the Movement.{loading ? ' (Syncing catalog...)' : ''}</p>
      </StoreHero>

      <ProductGrid as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
        {products.map((product) => (
          <Link href={`/store/${product.id}`} key={product.id} passHref legacyBehavior>
            <ProductCard as={motion.a} variants={itemVariants}>
              <ProductImage>
                <img src={product.image} alt={product.title} loading="lazy" />
              </ProductImage>
              <ProductInfo>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <ProductPrice>{product.price}</ProductPrice>
                <ViewButton>View Product</ViewButton>
              </ProductInfo>
            </ProductCard>
          </Link>
        ))}
      </ProductGrid>
    </StoreWrapper>
  );
}
