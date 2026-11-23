'use client';

import { useEffect, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion } from 'framer-motion';
import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from './GlobalStyles';
import { Footer, Header } from '..';
import { usePathname } from 'next/navigation';
import PageBackdrop from '@/gateway-kit/components/PageBackdrop';

const GATEWAY_ROUTES = new Set(['/', '/gateway']);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || '/';
  const isGateway = GATEWAY_ROUTES.has(pathname);
  const [useSmoothDesktopScroll, setUseSmoothDesktopScroll] = useState(false);

  // Never scrolljack mobile/touch devices — keep native iOS/Android scroll physics
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const update = () => setUseSmoothDesktopScroll(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  if (isGateway) {
    return (
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}
      </StyledComponentsRegistry>
    );
  }

  const innerContent = (
    <>
      <GlobalStyles />
      <PageBackdrop pathname={pathname} />
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 20 }}
      >
        <Header />
        {children}
        <Footer />
      </motion.div>
    </>
  );

  return (
    <StyledComponentsRegistry>
      {useSmoothDesktopScroll ? (
        <ReactLenis
          root
          easing={(t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
        >
          {innerContent}
        </ReactLenis>
      ) : (
        innerContent
      )}
    </StyledComponentsRegistry>
  );
};

export default Layout;
