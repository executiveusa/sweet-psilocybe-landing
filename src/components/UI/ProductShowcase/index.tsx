'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Wrapper,
  Inner,
  Header,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ViewButton,
  StoreButtonWrapper,
  StoreButton,
  ComingSoonBadge,
} from './styles';
import MaskText from '@/components/Common/MaskText';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  headerPhrases,
  paragraphPhrases,
  mobileParagraphPhrases,
  showcaseProducts,
} from './constants';

const ProductShowcase = () => {
  const isMobile = useIsMobile();
  const storeUrl = process.env.NEXT_PUBLIC_STORE_URL;
  const isStoreAvailable = storeUrl && storeUrl !== '';

  return (
    <Wrapper>
      <Inner>
        <Header>
          <MaskText phrases={headerPhrases} tag="h2" />
          {isMobile ? (
            <MaskText phrases={mobileParagraphPhrases} tag="p" />
          ) : (
            <MaskText phrases={paragraphPhrases} tag="p" />
          )}
        </Header>

        <ProductGrid>
          {showcaseProducts.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard>
                <ProductImage>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      // Hide image if it fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </ProductImage>
                <ProductInfo>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <ViewButton href={product.link || '#'} target="_blank" rel="noopener noreferrer" aria-label={`View ${product.name} product`}>
                    View Product
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </ViewButton>
                </ProductInfo>
              </ProductCard>
            </motion.div>
          ))}
        </ProductGrid>

        <StoreButtonWrapper>
          {isStoreAvailable ? (
            <StoreButton href={storeUrl} target="_blank" rel="noopener noreferrer">
              Visit Our Store
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </StoreButton>
          ) : (
            <ComingSoonBadge>Store Coming Soon - Follow Setup Guide</ComingSoonBadge>
          )}
        </StoreButtonWrapper>
      </Inner>
    </Wrapper>
  );
};

export default ProductShowcase;
