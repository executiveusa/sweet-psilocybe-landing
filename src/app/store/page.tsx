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

// Placeholder data for initial render or fallback
const DUMMY_PRODUCTS = [
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
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch from our proxy route
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/store/printify/products');
        if (res.ok) {
          const data = await res.json();
          // If we get actual data from Printify via proxy, we'd map it here.
          // For now, if the endpoint works but returns our fallback, that's fine.
          if (data && data.length > 0) {
            // Map printify product shape to our display shape if needed
            // This is just defensive check
            // setProducts(data);
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
        <p>Support the Science. Wear the Movement.</p>
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
