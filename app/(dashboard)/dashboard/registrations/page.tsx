import { Suspense } from 'react';
import { CalendarDays, RefreshCw, Users } from 'lucide-react';
import RegistrationsTable from '@/components/dashboard/RegistrationsTable';
import StatsAutoRefresh from '@/components/dashboard/StatsAutoRefresh';

export const dynamic = 'force-dynamic';

export default function RegistrationsPage() {
  return (
    <div className="min-w-0 space-y-8">
      {/* Automatic refresh */}
      <StatsAutoRefresh />

      {/* Page heading */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#25D366]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 right-1/3 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl"
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#25D366]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]" />
              Race administration
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Runner Registrations</h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Review runner details, verify payment eligibility, approve registrations, and manage
              race-number assignments.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15">
              <Users className="h-5 w-5 text-[#25D366]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">TRC × LSRC</p>
              <p className="mt-0.5 text-xs text-slate-400">Race 2026</p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-5 text-xs text-slate-300 sm:text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#25D366]" />
            <span>14 November 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-[#25D366]" />
            <span>Automatic refresh every 5 seconds</span>
          </div>
        </div>
      </section>

      {/* Registrations table */}
      <section className="min-w-0 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              All registrations
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View registration details and take action on eligible runners.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#25D366]" />
            Live updates enabled
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Suspense
            fallback={
              <div className="p-8 text-center text-sm text-slate-500">Loading registrations...</div>
            }
          >
            <RegistrationsTable />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
