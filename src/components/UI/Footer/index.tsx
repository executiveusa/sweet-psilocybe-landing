"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../Modal";
import ModalContent from "../ModalContent";
import ic_copyright from "../../../../public/svgs/ic_copyright.svg";

const linksArr = [
  {
    title: "About",
    links: [
      { text: "Our Mission", modal: "mission" },
      { text: "Research Partners", modal: "research" },
      { text: "Contact", modal: "contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { text: "Store", url: "/store" },
      { text: "Blog", url: "/blog" },
      { text: "Games", url: "/games" },
      { text: "Library", url: "/library" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Terms of Use", modal: "terms" },
      { text: "Privacy Policy", modal: "privacy" },
      { text: "Disclaimers", modal: "disclaimers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Research Hub", modal: "research-hub" },
      { text: "Safety Info", modal: "safety" },
      { text: "FAQ", url: "/resources/faq" },
    ],
  },
];

import {
  Wrapper,
  Inner,
  FooterLogo,
  FooterMainContent,
  FooterMiddle,
  FooterNavigation,
  GridColumn,
  LinksContainer,
  FooterBottom,
  CopyRight,
} from "./styles";

const Footer = () => {
  const storeUrl = process.env.NEXT_PUBLIC_STORE_URL;
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getModalTitle = (modalType: string) => {
    const titles: { [key: string]: string } = {
      mission: "Our Mission",
      research: "Research Partners",
      contact: "Contact Us",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      disclaimers: "Disclaimers",
      "research-hub": "Research Hub",
      safety: "Safety Information",
    };
    return titles[modalType] || "Information";
  };

  return (
    <Wrapper>
      <Inner>
        <FooterLogo>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--primary)",
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Sweet Psilocybe
          </h2>
          <p
            style={{
              color: "var(--light-gray)",
              marginTop: "1rem",
              fontSize: "0.9rem",
              maxWidth: "400px",
            }}
          >
            <strong>Educational Content Only.</strong> This site provides
            information about psilocybin research for educational purposes. We
            do not provide medical advice or sell psilocybin mushrooms.
          </p>
          <div
            aria-label="Sweet Psilocybe Social Channels"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginTop: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                name: "TikTok",
                href: "https://www.tiktok.com/signup",
                svg: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                ),
              },
              {
                name: "Instagram",
                href: "https://www.instagram.com/accounts/emailsignup/",
                svg: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                ),
              },
              {
                name: "X",
                href: "https://x.com/i/flow/signup",
                svg: (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                name: "Facebook",
                href: "https://www.facebook.com/r.php",
                svg: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Sweet Psilocybe on ${social.name}`}
                title={`${social.name} (Sign up / Connect)`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(246, 175, 207, 0.35)",
                  background: "rgba(11, 13, 18, 0.72)",
                  color: "#F6AFCF",
                  transition: "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                }}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </FooterLogo>
        <FooterMainContent>
          <FooterMiddle>
            <div
              style={{
                padding: "2rem",
                borderRadius: "1rem",
                border: "1px solid rgba(246, 175, 207, 0.3)",
                background: "rgba(246, 175, 207, 0.05)",
              }}
            >
              <h3
                style={{
                  color: "var(--primary)",
                  marginBottom: "1rem",
                  fontSize: "1.125rem",
                }}
              >
                ⚠️ Important Disclaimers
              </h3>
              <ul
                style={{
                  color: "var(--light-gray)",
                  fontSize: "0.9rem",
                  lineHeight: "1.6",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                <li>✓ 18+ Only - Age restricted content</li>
                <li>✓ Educational purposes only</li>
                <li>✓ No medical advice provided</li>
                <li>✓ Laws vary by jurisdiction</li>
                <li>✓ Always consult healthcare professionals</li>
                {storeUrl && (
                  <li>
                    ✓{" "}
                    <a
                      href={storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--primary)",
                        textDecoration: "underline",
                      }}
                    >
                      Visit Store
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <FooterNavigation>
              {linksArr.map((l, i) => (
                <GridColumn key={i}>
                  <h3>{l.title}</h3>
                  <LinksContainer>
                    {l.links.map((link, idx) => (
                      <li key={idx}>
                        {link.modal ? (
                          <button
                            onClick={() => openModal(link.modal!)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--light-gray)",
                              cursor: "pointer",
                              textDecoration: "underline",
                              fontSize: "inherit",
                              fontFamily: "inherit",
                              padding: 0,
                            }}
                            aria-label={link.text}
                          >
                            {link.text}
                          </button>
                        ) : (
                          <Link href={link.url!} aria-label={link.text}>
                            {link.text}
                          </Link>
                        )}
                      </li>
                    ))}
                  </LinksContainer>
                </GridColumn>
              ))}
            </FooterNavigation>
          </FooterMiddle>
          <FooterBottom>
            <div style={{ color: "var(--light-gray)", fontSize: "0.875rem" }}>
              Content for natural alternatives and research purposes
            </div>
            <CopyRight>
              <Image src={ic_copyright} alt="copyright" />
              {new Date().getFullYear()} Sweet Psilocybe. All rights reserved.
            </CopyRight>
          </FooterBottom>
        </FooterMainContent>

        {/* Modal */}
        {activeModal && (
          <Modal
            isOpen={!!activeModal}
            onClose={closeModal}
            title={getModalTitle(activeModal)}
          >
            <ModalContent type={activeModal} />
          </Modal>
        )}
      </Inner>
    </Wrapper>
  );
};

export default Footer;
