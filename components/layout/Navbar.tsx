'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Projects', href: '/projects', icon: 'projects' },
  { label: 'About', href: '/about', icon: 'about' },
  { label: 'Contact', href: '/contact', icon: 'contact' },
];

function NavIcon({ name }: { name: string }) {
  const commonProps = {
    width: 21,
    height: 21,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...commonProps}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-7h6v7" />
        </svg>
      );

    case 'projects':
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="m10 9 5 3-5 3z" />
        </svg>
      );

    case 'about':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );

    case 'contact':
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );

    default:
      return null;
  }
}

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#271522]/95 text-[#F6F0E8] backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
        >
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-[#C5A46D]/60 font-serif text-lg text-[#C5A46D] transition-colors group-hover:bg-[#C5A46D] group-hover:text-[#271522]">
              MF
            </span>

            <span>
              <span className="block font-serif text-lg leading-tight">Mookho Fuma</span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.25em] text-[#F6F0E8]/55">
                Film Production
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-2 text-sm transition-colors ${
                    active ? 'text-[#C5A46D]' : 'text-[#F6F0E8]/70 hover:text-[#F6F0E8]'
                  }`}
                >
                  {link.label}

                  {active && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-[#C5A46D]" />
                  )}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="border border-[#C5A46D] px-5 py-3 text-sm font-medium text-[#C5A46D] transition-colors hover:bg-[#C5A46D] hover:text-[#271522]"
            >
              Let&apos;s Talk <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile bottom dock */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <div className="mx-auto flex max-w-md items-center justify-around rounded-2xl border border-white/10 bg-[#271522]/95 px-2 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 transition-all duration-200 ${
                  active ? 'text-[#C5A46D]' : 'text-[#F6F0E8]/55 hover:text-[#F6F0E8]'
                }`}
              >
                {active && <span className="absolute top-0 h-0.5 w-6 rounded-full bg-[#C5A46D]" />}

                <NavIcon name={link.icon} />

                <span className="text-[10px] font-medium tracking-wide">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
