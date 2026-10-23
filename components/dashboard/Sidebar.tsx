'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Users,
  Footprints,
  LogOut,
} from 'lucide-react';

const items = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { label: 'Registrations', href: '/dashboard/registrations', icon: ClipboardList },
  { label: 'Runners', href: '/dashboard/runners', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-full shrink-0 flex-col text-[#111111] lg:min-h-screen lg:w-64">
      <Link href="/" className="flex items-center gap-3 border-b border-white/10 px-5 py-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366] text-[#111111]">
          <Footprints size={23} />
        </span>
        <span>
          <span className="block font-black uppercase">TRC Race</span>
          <span className="block text-xs text-gray-400">Admin portal</span>
        </span>
      </Link>
      <nav
        className="flex gap-1 overflow-x-auto p-3 lg:flex-1 lg:flex-col"
        aria-label="Admin navigation"
      >
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${active ? 'bg-[#25D366] text-[#111111]' : 'text-[#111111] hover:bg-white/10 hover:text-[#25D366]'} `}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="hidden border-t border-white/10 p-4 lg:block">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} /> Sign out (demo)
        </Link>
      </div>
    </aside>
  );
}
