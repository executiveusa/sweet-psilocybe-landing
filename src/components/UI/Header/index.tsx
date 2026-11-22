'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links } from './constants';

const Header = () => {
  const pathname = usePathname() || '/';
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on route change or Escape key
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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0D12]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Top-left clickable Brand Identity with Original Crest Logo */}
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2.5 text-lg font-bold tracking-tight text-[#F6AFCF] transition hover:text-[#FFEDEE] sm:text-xl"
          aria-label="Sweet Psilocybe — Return to 3D Gateway Home"
        >
          <Image
            src="/images/sweet-psilocybe-crest-transparent.png"
            alt="Sweet Psilocybe Logo"
            width={40}
            height={40}
            priority
            className="h-9 w-9 shrink-0 rounded-full object-contain sm:h-10 sm:w-10"
          />
          <span>Sweet Psilocybe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 md:flex"
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
                className={`text-sm font-medium transition ${
                  isActive
                    ? 'text-[#F6AFCF]'
                    : 'text-[#F7F3EF]/75 hover:text-[#F7F3EF]'
                }`}
              >
                {link.linkTo}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action */}
        <div className="hidden items-center gap-3 md:flex">
          <span className="rounded-full border border-[#A9C0B0]/35 bg-[#A9C0B0]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#A9C0B0]">
            18+ Education
          </span>
          <Link
            href="/gateway"
            className="rounded-full bg-[#F6AFCF] px-4 py-2 text-xs font-bold text-[#0B0D12] transition hover:bg-[#FFEDEE]"
          >
            3D Gateway →
          </Link>
        </div>

        {/* Mobile Menu Button (44x44 minimum tap target) */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-primary-nav"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#F7F3EF] transition hover:border-[#F6AFCF] md:hidden cursor-pointer"
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

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <nav
          id="mobile-primary-nav"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#0B0D12]/95 px-4 py-4 backdrop-blur-xl md:hidden"
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
                  className={`flex min-h-[44px] items-center rounded-xl px-3 text-base font-medium transition ${
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
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs font-medium text-[#A9C0B0]">
              18+ Educational Platform
            </span>
            <Link
              href="/gateway"
              className="rounded-full bg-[#F6AFCF] px-4 py-2 text-xs font-bold text-[#0B0D12]"
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
