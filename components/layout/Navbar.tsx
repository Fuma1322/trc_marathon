'use client';

import Link from 'next/link';
import { Footprints } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="TRC Race home"
        >
          {/* Brand icon */}
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-[#111111] shadow-sm transition-all duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
            <Footprints size={28} strokeWidth={2.5} />
          </span>

          {/* Brand typography */}
          <span className="flex flex-col justify-center">
            <span className="text-[23px] font-black uppercase leading-none tracking-[-0.06em] text-[#111111] sm:text-[26px]">
              TRC
            </span>

            <span className="mt-1 flex items-center gap-1.5">
              <span className="h-[3px] w-5 rounded-full bg-[#25D366]" />
              <span className="text-[10px] font-extrabold uppercase leading-none tracking-[0.28em] text-gray-500 sm:text-[11px]">
                RACE
              </span>
            </span>
          </span>
        </Link>
      </nav>
    </header>
  );
}
