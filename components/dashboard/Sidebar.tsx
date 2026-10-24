'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Users,
  Footprints,
  ChevronRight,
  Ticket,
} from 'lucide-react';
import LogoutButton from './LogoutButton';

const items = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Dashboard summary',
  },
  {
    label: 'Payments',
    href: '/dashboard/payments',
    icon: CreditCard,
    description: 'Payment verification',
  },
  {
    label: 'Registrations',
    href: '/dashboard/registrations',
    icon: ClipboardList,
    description: 'Approve registrations',
  },
  {
    label: 'Runners',
    href: '/dashboard/runners',
    icon: Users,
    description: 'Runner directory',
  },
  {
    label: 'Tickets',
    href: '/dashboard/ticket',
    icon: Ticket,
    description: 'Ticket management',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/dashboard'
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-white text-[#111111] lg:flex lg:h-full">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="group flex shrink-0 items-center gap-3 border-b border-slate-100 px-5 py-5 transition hover:bg-slate-50"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-[#111111] shadow-sm shadow-green-900/10 transition group-hover:scale-105">
            <Footprints size={26} strokeWidth={2.3} />
          </span>

          <span className="min-w-0">
            <span className="block text-base font-black tracking-tight">
              TRC <span className="text-green-600">RACE</span>
            </span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Admin workspace
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-4"
          aria-label="Admin navigation"
        >
          <p className="px-3 pb-3 pt-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
            Main menu
          </p>

          {items.map(({ label, href, icon: Icon, description }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                title={description}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-[#25D366]/15 text-[#111111] ring-1 ring-[#25D366]/25'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-[#111111]'
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#25D366]"
                  />
                )}

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                    active
                      ? 'bg-[#25D366] text-[#111111] shadow-sm'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-[#111111]'
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>

                <span>{label}</span>

                {active && <ChevronRight size={16} className="ml-auto text-green-700" />}
              </Link>
            );
          })}
        </nav>

        {/* Desktop logout */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile bottom dock */}
      <nav
        aria-label="Mobile admin navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/95 px-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
          {items.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                aria-label={label}
                className={`relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-2 transition-all duration-200 ${
                  active ? 'text-[#111111]' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-[#25D366]"
                  />
                )}

                <span
                  className={`flex h-8 w-10 items-center justify-center rounded-xl transition-all ${
                    active ? 'bg-[#25D366]/15 text-[#111111]' : 'bg-transparent'
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.9} />
                </span>

                <span
                  className={`max-w-full truncate text-[10px] leading-tight ${
                    active ? 'font-extrabold' : 'font-medium'
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
