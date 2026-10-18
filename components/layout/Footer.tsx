import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Smartphone, Landmark, Wallet, Banknote, Send, MapPin } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Register', href: '/register' },
  { label: 'Payment Instructions', href: '/payments' },
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
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="TRC Race home">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#111111]">
                <Image src="/logo.png" alt="TRC Race Logo" width={75} height={75} />
              </span>
              <span className="flex flex-col justify-center">
                <span className="text-[23px] font-black uppercase leading-none tracking-[-0.06em] text-[#80461B] sm:text-[26px]">
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
            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Every step tells a story. Choose your distance and get ready to be part of the TRC
              Race running community.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={17} className="shrink-0 text-[#25D366]" />
              <span>Maseru, Lesotho</span>
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider">Quick Links</h2>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#25D366]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider">Payment Methods</h2>
            <ul className="space-y-4">
              {paymentMethods.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[#25D366]">
                    <Icon size={17} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">Ready to Run?</h2>
            <p className="mb-6 text-sm leading-7 text-gray-400">
              Choose your distance, complete your registration, and prepare for the finish line.
            </p>
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-[#111111] hover:bg-[#1fbd59] sm:w-auto"
            >
              Register Now <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p className="text-xs leading-5 text-gray-500">
            © {new Date().getFullYear()} TRC Race. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">Made for runners. Built by MPlug (Pty) Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
