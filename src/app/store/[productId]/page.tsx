'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { use } from 'react';
import {
  DetailWrapper,
  Container,
  BackLink,
  ProductLayout,
  ImageGallery,
  ProductDetails,
  AddToCartBtn
} from './styles';

const DUMMY_PRODUCTS = [
  {
    id: '1',
    title: 'Mycelium Network Tee',
    description: 'Premium organic cotton tee featuring intricate mycelium network artwork. Soft, breathable, and sustainably sourced. By wearing this tee, you are spreading awareness about the fascinating world of fungi networks.',
    price: '$35.00',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Spore Print Hoodie',
    description: 'Cozy heavy-blend hoodie with abstract spore print design on back. Perfect for chilly foraging mornings or casual evenings. Made with recycled polyester and organic cotton blend.',
    price: '$65.00',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Psilocybe Ceramic Mug',
    description: 'Start your day right. 11oz ceramic mug with scientific illustration of Psilocybe cubensis. Microwave and dishwasher safe, featuring high-quality sublimation printing that won\'t fade.',
    price: '$18.00',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

export default function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const resolvedParams = use(params);
  const product = DUMMY_PRODUCTS.find(p => p.id === resolvedParams.productId) || DUMMY_PRODUCTS[0];

  return (
    <DetailWrapper>
      <Container>
        <BackLink>
          <Link href="/store">
            ← Back to Store
          </Link>
        </BackLink>

        <ProductLayout as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ImageGallery>
            <img src={product.image} alt={product.title} />
          </ImageGallery>
          
          <ProductDetails>
            <h1>{product.title}</h1>
            <div className="price">{product.price}</div>
            <p className="description">{product.description}</p>
            
            <AddToCartBtn onClick={() => alert('Add to cart functionality coming soon!')}>
              Add to Cart
            </AddToCartBtn>
          </ProductDetails>
        </ProductLayout>
      </Container>
    </DetailWrapper>
  );
}
