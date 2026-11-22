'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'sp_age_verified_v2';

const AgeGate = () => {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    try {
      const verified = window.localStorage.getItem(STORAGE_KEY) === 'true';
      if (!verified) {
        setShowGate(true);
      }
    } catch {
      setShowGate(true);
    }
  }, []);

  const handleConfirm = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
      document.cookie = 'age_verified=true; path=/; max-age=2592000; SameSite=Lax';
    } catch {
      // Ignore storage errors in restricted browsing modes
    }
    setShowGate(false);
  };

  const handleExit = () => {
    window.location.href = 'https://www.samhsa.gov/find-help/national-helpline';
  };

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          aria-describedby="age-gate-description"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070A0C]/82 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="w-full max-w-md rounded-3xl border border-[#F6AFCF]/35 bg-[#0B0D12]/95 p-7 text-center shadow-2xl sm:p-9"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
              <Image
                src="/images/sweet-psilocybe-crest-transparent.png"
                alt="Sweet Psilocybe Crest"
                width={64}
                height={64}
                priority
                className="h-16 w-16 rounded-full object-contain"
              />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A9C0B0]">
              Sweet Psilocybe &middot; 18+ Sanctuary
            </p>
            <h2
              id="age-gate-title"
              className="mt-2 text-2xl font-bold tracking-tight text-[#F7F3EF]"
            >
              Confirm You Are 18 or Older
            </h2>
            <p
              id="age-gate-description"
              className="mt-3 text-sm leading-relaxed text-[#F7F3EF]/75"
            >
              Sweet Psilocybe is an independent Pacific Northwest hub for{' '}
              <strong className="text-[#F6AFCF]">
                peer-reviewed mushroom research, global books &amp; films, free
                games, and wearable forest art
              </strong>
              . We never sell psilocybin or controlled substances.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleConfirm}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#F6AFCF] px-6 py-3 text-sm font-bold text-[#0B0D12] transition hover:bg-[#FFEDEE] cursor-pointer"
              >
                I am 18+ — Enter Site
              </button>
              <button
                type="button"
                onClick={handleExit}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-[#F7F3EF]/85 transition hover:border-white/40 cursor-pointer"
              >
                Exit
              </button>
            </div>

            <p className="mt-5 text-[11px] leading-relaxed text-[#F7F3EF]/45">
              Educational purposes only — no medical advice. By entering, you
              confirm you are at least 18 years old.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeGate;
