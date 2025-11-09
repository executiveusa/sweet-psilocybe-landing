'use client';

import Image from 'next/image';
import {
  Wrapper,
  Inner,
  LogoContainer,
  Nav,
  CallToActions,
  AbsoluteLinks,
  BurgerMenu,
} from './styles';
// raft_logo import removed (legacy Raft asset, not used)
import ic_bars from '../../../../public/svgs/ic_bars.svg';
import { GetStartedButton } from '@/components';
import AnimatedLink from '@/components/Common/AnimatedLink';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { links, menu } from './constants';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const storeUrl = process.env.NEXT_PUBLIC_STORE_URL;
  
  return (
    <Wrapper>
      <Inner>
        <LogoContainer>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: 'var(--primary)',
            margin: 0,
            fontFamily: 'Inter, sans-serif'
          }}>
            Sweet Psilocybe
          </h1>
          <BurgerMenu onClick={() => setIsOpen(!isOpen)}>
            <motion.div
              variants={menu}
              animate={isOpen ? 'open' : 'closed'}
              initial="closed"
            ></motion.div>
            <Image src={ic_bars} alt="menu" />
          </BurgerMenu>
        </LogoContainer>
        <Nav className={isOpen ? 'active' : ''}>
          {links.filter(link => link.url !== '#store' || storeUrl).map((link, i) => (
            <a key={i} href={link.url} target={link.linkTo === 'Store' ? '_blank' : undefined} rel={link.linkTo === 'Store' ? 'noopener noreferrer' : undefined}>
              <AnimatedLink title={link.linkTo} />
            </a>
          ))}
        </Nav>
        <CallToActions className={isOpen ? 'active' : ''}>
          <AnimatedLink title="18+ Only" />
          <GetStartedButton padding="0.5rem 0.75rem" />
        </CallToActions>
      </Inner>
    </Wrapper>
  );
};

export default Header;
