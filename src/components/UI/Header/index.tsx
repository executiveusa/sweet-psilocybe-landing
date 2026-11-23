'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links } from './constants';

const Header = () => {
  const pathname = usePathname() || '/';
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0D12]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        {/* Top-left Brand Identity: Enlarged Crest + Original GSAP Preloader Wordmark Typography */}
        <Link
          href="/"
          className="inline-flex min-h-[48px] shrink-0 items-center gap-3 transition-transform duration-150 active:scale-[0.98]"
          style={{ touchAction: 'manipulation' }}
          aria-label="Sweet Psilocybe — Return to 3D Gateway Home"
        >
          <Image
            src="/images/sweet-psilocybe-crest-transparent.png"
            alt="Sweet Psilocybe Logo"
            width={52}
            height={52}
            priority
            className="h-11 w-11 shrink-0 rounded-full object-contain sm:h-12 sm:w-12"
          />
          <span
            className="whitespace-nowrap text-base font-semibold text-[#F7F3EF] transition-colors hover:text-[#F6AFCF] sm:text-xl"
            style={{ letterSpacing: '0.08em' }}
          >
            Sweet Psilocybe
          </span>
        </Link>

        {/* Desktop Navigation (activates at lg: 1024px so 768px tablet never clips or wraps) */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-5 lg:flex"
        >
          {links.map((link) => {
            const isActive =
              pathname === link.url ||
              (link.url !== '/' &&
                link.url !== '/landing' &&
                pathname.startsWith(link.url));
            return (
              <Link
                key={link.url}
                href={link.url}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex min-h-[44px] items-center whitespace-nowrap px-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#F6AFCF]'
                    : 'text-[#F7F3EF]/80 hover:text-[#F7F3EF]'
                }`}
              >
                {link.linkTo}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <span className="whitespace-nowrap rounded-full border border-[#A9C0B0]/35 bg-[#A9C0B0]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#A9C0B0]">
            18+ Education
          </span>
          <Link
            href="/gateway"
            className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-[#F6AFCF] px-4 py-2 text-xs font-bold text-[#0B0D12] transition-transform duration-150 hover:bg-[#FFEDEE] active:scale-[0.97]"
            style={{ touchAction: 'manipulation' }}
          >
            3D Gateway →
          </Link>
        </div>

        {/* Mobile & Tablet Menu Button (< 1024px, 44x44 minimum tap target) */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-primary-nav"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          style={{ touchAction: 'manipulation' }}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#F7F3EF] transition-transform duration-150 hover:border-[#F6AFCF] active:scale-[0.95] lg:hidden cursor-pointer"
        >
          {isOpen ? (
            <span className="text-lg font-bold leading-none">✕</span>
          ) : (
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          )}
        </button>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {isOpen && (
        <nav
          id="mobile-primary-nav"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#0B0D12]/96 px-4 py-4 backdrop-blur-xl lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive =
                pathname === link.url ||
                (link.url !== '/' &&
                  link.url !== '/landing' &&
                  pathname.startsWith(link.url));
              return (
                <Link
                  key={link.url}
                  href={link.url}
                  aria-current={isActive ? 'page' : undefined}
                  style={{ touchAction: 'manipulation' }}
                  className={`flex min-h-[44px] items-center rounded-xl px-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F6AFCF]/15 text-[#F6AFCF]'
                      : 'text-[#F7F3EF]/85 hover:bg-white/5 hover:text-[#F7F3EF]'
                  }`}
                >
                  {link.linkTo}
                </Link>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
            <span className="text-xs font-medium text-[#A9C0B0]">
              18+ Educational Platform
            </span>
            <Link
              href="/gateway"
              style={{ touchAction: 'manipulation' }}
              className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-[#F6AFCF] px-5 py-2 text-xs font-bold text-[#0B0D12]"
            >
              Enter 3D Gateway →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
