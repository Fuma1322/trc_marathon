import type { ReactNode } from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-slate-50 lg:flex-row">
      {/* Fixed sidebar */}
      <div className="z-20 shrink-0 border-b border-slate-200 bg-white lg:h-full lg:border-b-0 lg:border-r lg:border-slate-200">
        <Sidebar />
      </div>

      {/* Main workspace */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Stationary top bar */}
        <header className="z-10 shrink-0 border-b border-slate-200/80 bg-white/95 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
                  TRC Race management
                </p>
              </div>

              <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">
                Administration workspace
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-2 sm:gap-2.5 sm:px-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>

              <span className="hidden text-xs font-bold text-green-800 sm:inline">
                System Online
              </span>
              <span className="text-xs font-bold text-green-800 sm:hidden">Online</span>
            </div>
          </div>
        </header>

        {/* The only vertically scrolling region */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="mx-auto min-h-full max-w-[1500px] p-4 sm:p-6 lg:p-8">
            {/* Workspace introduction */}
            <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15">
                  <ShieldCheck size={20} className="text-green-700" />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">Organizer control center</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Manage payments, registrations and runners.
                  </p>
                </div>
              </div>

              <Activity size={19} className="hidden shrink-0 text-green-600 sm:block" />
            </div>

            <main className="min-w-0 flex-1 pb-24 lg:pb-6">{children}</main>
          </div>
        </div>
      </main>
    </div>
  );
}
