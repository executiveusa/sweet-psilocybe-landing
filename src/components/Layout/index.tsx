'use client';

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

  if (isGateway) {
    return (
      <StyledComponentsRegistry>
        <GlobalStyles />
        {children}
      </StyledComponentsRegistry>
    );
  }

  return (
    <StyledComponentsRegistry>
      <ReactLenis
        root
        easing={(t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
      >
        <GlobalStyles />
        <PageBackdrop pathname={pathname} />
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 20 }}
        >
          <Header />
          {children}
          <Footer />
        </motion.div>
      </ReactLenis>
    </StyledComponentsRegistry>
  );
};

export default Layout;
