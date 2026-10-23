import type { ReactNode } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <div className="border-b border-gray-200 bg-white px-5 py-4 sm:px-8">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                TRC Race management
              </p>
              <p className="mt-1 text-sm text-gray-500">Administration workspace</p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-800">
              System Online
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-[1500px] p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
