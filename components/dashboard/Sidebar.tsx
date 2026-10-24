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

  return (
    <aside className="flex w-full flex-col bg-white text-[#111111] lg:h-full lg:w-64">
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

      {/* Navigation */}
      <nav
        className="flex gap-2 overflow-x-auto px-3 py-3 lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:px-4 lg:py-2"
        aria-label="Admin navigation"
      >
        <p className="hidden px-3 pb-3 pt-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400 lg:block">
          Main menu
        </p>

        {items.map(({ label, href, icon: Icon, description }) => {
          const active =
            href === '/dashboard'
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              title={description}
              className={`group relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 lg:w-full ${
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

              <span className="whitespace-nowrap">{label}</span>

              {active && (
                <ChevronRight size={16} className="ml-auto hidden text-green-700 lg:block" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer branding — no demo sign-out */}
      <div className="hidden shrink-0 border-t border-slate-100 p-4 lg:block">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <Footprints size={18} className="text-green-600" />
          </span>

          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800">TRC × LSRC</p>
            <p className="mt-1 truncate text-[10px] text-slate-500">Race management portal</p>
            <LogoutButton />
          </div>

          <span
            className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#25D366]"
            title="System online"
          />
        </div>
      </div>
    </aside>
  );
}
