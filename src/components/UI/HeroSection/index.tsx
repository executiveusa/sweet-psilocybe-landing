'use client';
import Image from 'next/image';
import { Wrapper, Inner, Pill, HeroTextContainer } from './styles';
import ic_chevron_right from '../../../../public/svgs/ic_chevron_right.svg';
import { GetStartedButton } from '@/components';
import MaskText from '@/components/Common/MaskText';
import { useIsMobile } from '../../../../libs/useIsMobile';
import ParallaxText from '@/components/Common/ParallaxText';
import { ParallaxWrapper } from '@/components/Common/ParallaxText/styles';
import {
  mobileParagraphPhrases,
  mobilePhrases,
  paragraphPhrases,
  phrases,
} from './constants';

const HeroSection = () => {
  const isMobile = useIsMobile();
  return (
        <Wrapper>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            <Image
              src={'/images/sweet pslocybe.jpg'}
              alt="Sweet Psilocybe Hero Background"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
              priority
            />
          </div>
      <Inner style={{ position: 'relative', zIndex: 1 }}>
          <ParallaxWrapper>
            <ParallaxText baseVelocity={50}>SWEET PSILOCYBE</ParallaxText>
          </ParallaxWrapper>
          <Pill>
          <span>18+ Educational Content Only</span>
          <Image src={ic_chevron_right} alt="chevron-right" />
        </Pill>
        <HeroTextContainer>
          {isMobile ? (
            <>
              <MaskText phrases={mobilePhrases} tag="h1" />
              <MaskText phrases={mobileParagraphPhrases} tag="p" />
            </>
          ) : (
            <>
              <MaskText phrases={phrases} tag="h1" />
              <MaskText phrases={paragraphPhrases} tag="p" />
            </>
          )}
        </HeroTextContainer>
        <GetStartedButton padding="1rem 2rem" />
      </Inner>
    </Wrapper>
  );
};

export default HeroSection;
