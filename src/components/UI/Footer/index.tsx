import Image from 'next/image';
import Link from 'next/link';
// raft_footer_logo import removed (legacy Raft asset, not used)
import qr_code from '../../../../public/svgs/qr_code.svg';
import ic_google_playstore from '../../../../public/svgs/ic_google_playstore.svg';
import ic_baseline_apple from '../../../../public/svgs/ic_baseline_apple.svg';
import ic_chevron_down from '../../../../public/svgs/ic_chevron_down.svg';
import ic_copyright from '../../../../public/svgs/ic_copyright.svg';

const linksArr = [
  {
    title: 'About',
    links: [
      { text: 'Our Mission', url: '/about/our-mission' },
      { text: 'Research Partners', url: '/about/research-partners' },
      { text: 'Contact', url: '/about/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { text: 'Terms of Use', url: '/legal/terms-of-use' },
      { text: 'Privacy Policy', url: '/legal/privacy-policy' },
      { text: 'Disclaimers', url: '/legal/disclaimers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { text: 'Research Hub', url: '/resources/research-hub' },
      { text: 'Safety Info', url: '/resources/safety-info' },
      { text: 'FAQ', url: '/resources/faq' },
    ],
  },
];

import {
  Wrapper,
  Inner,
  FooterLogo,
  FooterMainContent,
  FooterMiddle,
  QRContainer,
  QRImageCtn,
  TextCtn,
  IconCtn,
  FooterNavigation,
  GridColumn,
  LinksContainer,
  FooterBottom,
  Translator,
  CopyRight,
} from './styles';

const Footer = () => {
  const storeUrl = process.env.NEXT_PUBLIC_STORE_URL;
  
  return (
    <Wrapper>
      <Inner>
        <FooterLogo>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: 'var(--primary)',
            margin: 0,
            fontFamily: 'Inter, sans-serif'
          }}>
            Sweet Psilocybe
          </h2>
          <p style={{ color: 'var(--light-gray)', marginTop: '1rem', fontSize: '0.9rem', maxWidth: '400px' }}>
            <strong>Educational Content Only.</strong> This site provides information about psilocybin research for educational purposes. 
            We do not provide medical advice or sell psilocybin mushrooms.
          </p>
        </FooterLogo>
        <FooterMainContent>
          <FooterMiddle>
            <div style={{ padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(246, 175, 207, 0.3)', background: 'rgba(246, 175, 207, 0.05)' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.125rem' }}>⚠️ Important Disclaimers</h3>
              <ul style={{ color: 'var(--light-gray)', fontSize: '0.9rem', lineHeight: '1.6', listStyle: 'none', padding: 0 }}>
                <li>✓ 18+ Only - Age restricted content</li>
                <li>✓ Educational purposes only</li>
                <li>✓ No medical advice provided</li>
                <li>✓ Laws vary by jurisdiction</li>
                <li>✓ Always consult healthcare professionals</li>
                {storeUrl && <li>✓ <a href={storeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Visit Store</a></li>}
              </ul>
            </div>
            <FooterNavigation>
              {linksArr.map((l, i) => (
                <GridColumn key={i}>
                  <h3>{l.title}</h3>
                  <LinksContainer>
                    {l.links.map((link, idx) => (
                      <li key={idx}>
                        <Link href={link.url} aria-label={link.text}>
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </LinksContainer>
                </GridColumn>
              ))}
            </FooterNavigation>
          </FooterMiddle>
          <FooterBottom>
            <div style={{ color: 'var(--light-gray)', fontSize: '0.875rem' }}>
              Content for natural alternatives and research purposes
            </div>
            <CopyRight>
              <Image src={ic_copyright} alt="copyright" />
              {new Date().getFullYear()} Sweet Psilocybe. All rights reserved.
            </CopyRight>
          </FooterBottom>
        </FooterMainContent>
      </Inner>
    </Wrapper>
  );
};

export default Footer;
