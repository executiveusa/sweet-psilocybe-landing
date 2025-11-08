'use client';
import {
  Wrapper,
  Inner,
  Header,
  Pillars,
  PillarCard,
  IconWrapper,
  PillarTitle,
  PillarDescription,
} from './styles';
import MaskText from '@/components/Common/MaskText';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrases,
  desktopParagraphPhrase,
  mobileParagraphPhrase,
  brandPillars,
} from './constants';

const BrandStrip = () => {
  const isMobile = useIsMobile();
  
  return (
    <Wrapper>
      <Inner>
        <Header>
          <MaskText phrases={desktopHeaderPhrases} tag="h1" />
          {isMobile ? (
            <MaskText phrases={mobileParagraphPhrase} tag="p" />
          ) : (
            <MaskText phrases={desktopParagraphPhrase} tag="p" />
          )}
        </Header>
        <Pillars>
          {brandPillars.map((pillar, i) => (
            <PillarCard key={i}>
              <IconWrapper>{pillar.icon}</IconWrapper>
              <PillarTitle>{pillar.title}</PillarTitle>
              <PillarDescription>{pillar.description}</PillarDescription>
            </PillarCard>
          ))}
        </Pillars>
      </Inner>
    </Wrapper>
  );
};

export default BrandStrip;
