'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from './GlobalStyles';
import { Footer, Header, Preloader } from '..';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import PageBackdrop from '@/gateway-kit/components/PageBackdrop';
import HomeButton from '@/gateway-kit/components/HomeButton';

const GATEWAY_ROUTES = new Set(['/', '/gateway']);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [complete, setComplete] = useState(false);
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
        <HomeButton />
        <Preloader setComplete={setComplete} />
        <div className={complete ? 'complete' : 'not_complete'} style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          {children}
          <Footer />
        </div>
      </ReactLenis>
    </StyledComponentsRegistry>
  );
};

export default Layout;
