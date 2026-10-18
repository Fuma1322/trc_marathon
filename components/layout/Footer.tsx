import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  Landmark,
  Wallet,
  Banknote,
  Send,
  MapPin,
  CalendarDays,
  Footprints,
  Flag,
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Register for the Race', href: '/register' },
];

const paymentMethods = [
  { label: 'M-Pesa', icon: Smartphone },
  { label: 'Bank Transfer', icon: Landmark },
  { label: 'E-Wallet', icon: Wallet },
  { label: 'Instant Money', icon: Send },
  { label: 'Cash', icon: Banknote },
];

export default function Footer() {
  return (
    <footer className="relative w-full min-w-0 overflow-hidden bg-slate-950 text-white">
      {/* Subtle brand atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-72 w-72 rounded-full bg-[#25D366]/10 blur-3xl"
      />

      {/* Registration callout */}
      <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-2xl shadow-black/10 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border-[24px] border-blue-500/10 sm:h-64 sm:w-64"
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#25D366]">
                <Footprints size={15} />
                Your next finish line awaits
              </div>

              <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Every step counts.
                <span className="block text-blue-400">Be part of the movement.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                Walk, run, and celebrate 60 years of Lesotho’s independence. There’s a place for
                everyone at the TRC Race.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-green-950/20 transition hover:-translate-y-0.5 hover:bg-[#20c45d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Register Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">
        <div className="grid min-w-0 grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div className="min-w-0">
            <Link
              href="/"
              aria-label="TRC Race home"
              className="inline-flex max-w-full items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg shadow-black/20">
                <Image
                  src="/logo.png"
                  alt="TRC Race logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </span>

              <span className="min-w-0">
                <span className="block text-2xl font-black uppercase leading-none tracking-tight text-white">
                  TRC <span className="text-[#80461B]">RACE</span>
                </span>
                <span className="mt-2 flex items-center gap-2">
                  <span className="h-1 w-7 rounded-full bg-[#25D366]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    One Lesotho
                  </span>
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              One Heat. One Run. One Lesotho. Bringing communities together through movement,
              national pride, and a shared finish line.
            </p>

            <div className="mt-5 flex items-center gap-3 text-sm text-gray-300">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <MapPin size={17} className="text-[#25D366]" />
              </span>
              <span>Maseru, Lesotho</span>
            </div>

            <div className="mt-3 flex items-center gap-3 text-sm text-gray-300">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <CalendarDays size={17} className="text-blue-400" />
              </span>
              <span>14 November 2026</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
              Explore
            </h3>
            <span className="mt-3 block h-1 w-8 rounded-full bg-blue-500" />

            <ul className="mt-5 space-y-4">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex max-w-full items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#25D366] focus-visible:text-[#25D366]"
                  >
                    <span>{label}</span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 opacity-60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment methods */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
              Payment Options
            </h3>
            <span className="mt-3 block h-1 w-8 rounded-full bg-[#25D366]" />

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Flexible payment options for your race registration.
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2">
              {paymentMethods.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <Icon size={17} className="shrink-0 text-[#25D366]" />
                  <span className="min-w-0">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
              More Than a Race
            </h3>
            <span className="mt-3 block h-1 w-8 rounded-full bg-[#80461B]" />

            <p className="mt-5 text-sm leading-7 text-gray-400">
              Every kilometre is a step towards healthier lives, stronger communities, and a more
              active Lesotho.
            </p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/15">
                  <Flag size={20} className="text-blue-400" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-white">One Lesotho</p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    One community. Every pace. Everyone welcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p className="text-xs leading-5 text-gray-500">
            © {new Date().getFullYear()} TRC Race. All rights reserved.
          </p>

          <p className="text-xs leading-5 text-gray-500">
            Made for runners. Built by{' '}
            <span className="font-bold text-gray-300">MPlug (Pty) Ltd.</span>
          </p>
        </div>
      </div>

      {/* Brand-colour finishing stripe */}
      <div aria-hidden="true" className="flex h-1 w-full">
        <div className="w-1/3 bg-blue-600" />
        <div className="w-1/3 bg-[#25D366]" />
        <div className="w-1/3 bg-[#80461B]" />
      </div>
    </footer>
  );
}
