'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-center gap-5 sm:gap-8">
          {/* Second Logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
            <Image src="/logo.png" alt="Partner Logo" width={75} height={75} />
          </div>

          {/* Divider with extra spacing */}
          <span className="mx-2 h-10 w-px shrink-0 bg-gray-200 sm:mx-4" aria-hidden="true" />

          {/* TRC Race Logo and Wordmark */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-4 sm:gap-5"
            aria-label="TRC Race home"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              <Image src="/logo2.png" alt="TRC Race Logo" width={75} height={75} priority />
            </span>

            {/* TRC RACE Wordmark */}
            <span className="flex flex-col justify-center">
              <span className="text-[23px] font-black uppercase leading-none tracking-[-0.06em] text-[#80461B] sm:text-[26px]">
                TRC
              </span>

              <span className="mt-1 flex items-center gap-1.5">
                <span className="h-[3px] w-5 rounded-full bg-[#25D366]" />
                <span className="text-[10px] font-extrabold uppercase leading-none tracking-[0.28em] text-[#111111] sm:text-[11px]">
                  RACE
                </span>
              </span>
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
