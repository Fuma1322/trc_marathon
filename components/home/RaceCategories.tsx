import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Footprints,
  Route,
  Gauge,
  Trophy,
  CheckCircle2,
  Flag,
} from 'lucide-react';
import { RACE_CATEGORIES } from '@/lib/constants';

const icons = [Footprints, Route, Gauge, Trophy];

const accents = [
  {
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-700',
    badge: 'bg-emerald-50 text-emerald-800',
    line: 'bg-emerald-500',
  },
  {
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-700',
    badge: 'bg-blue-50 text-blue-800',
    line: 'bg-blue-600',
  },
  {
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-700',
    badge: 'bg-orange-50 text-orange-800',
    line: 'bg-[#80461B]',
  },
  {
    iconBg: 'bg-slate-900',
    iconColor: 'text-white',
    badge: 'bg-white/10 text-white',
    line: 'bg-[#25D366]',
  },
];

export default function RaceCategories() {
  return (
    <section
      id="race-categories"
      className="relative w-full min-w-0 overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-blue-50/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-emerald-50/70 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700">
              <Flag size={15} />
              Find your distance
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Your race.
              <span className="text-blue-600"> Your pace.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Whether you are taking your first steps or chasing a new personal best, there is a
              place for you at the TRC Race.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/15">
              <Footprints size={21} className="text-emerald-700" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">Every step counts</p>
              <p className="mt-1 text-xs text-slate-500">Everyone is welcome</p>
            </div>
          </div>
        </div>

        {/* Race cards */}
        <div className="mt-10 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {RACE_CATEGORIES.map((race, index) => {
            const Icon = icons[index % icons.length];
            const accent = accents[index % accents.length];
            const featured = index === 3;

            return (
              <article
                key={race.id}
                className={`group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border transition duration-300 hover:-translate-y-1.5 ${
                  featured
                    ? 'border-slate-900 bg-slate-950 text-white shadow-xl shadow-slate-900/10 hover:shadow-2xl'
                    : 'border-slate-200 bg-white text-slate-950 shadow-sm hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5'
                }`}
              >
                {/* Top accent */}
                <div className={`h-1.5 w-full ${accent.line}`} />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.iconColor} transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon size={24} strokeWidth={2.2} />
                    </div>

                    {featured ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/15 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#25D366]">
                        <Trophy size={12} />
                        Half marathon
                      </span>
                    ) : (
                      <span
                        className={`rounded-full px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${accent.badge}`}
                      >
                        {race.level}
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-6 text-xs font-bold uppercase tracking-[0.16em] ${
                      featured ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {race.level}
                  </p>

                  <h3
                    className={`mt-2 text-2xl font-black tracking-tight ${
                      featured ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    {race.name}
                  </h3>

                  <p
                    className={`mt-3 min-h-[72px] text-sm leading-6 ${
                      featured ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {race.description}
                  </p>

                  <div
                    className={`mt-5 flex items-center gap-2 text-xs font-semibold ${
                      featured ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    <CheckCircle2 size={15} className="shrink-0 text-[#25D366]" />
                    Open to all participants
                  </div>

                  {/* Price and registration */}
                  <div
                    className={`mt-6 flex items-end justify-between gap-3 border-t pt-5 ${
                      featured ? 'border-white/15' : 'border-slate-100'
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-medium ${
                          featured ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        Entry fee
                      </p>
                      <p className="mt-1 text-3xl font-black tracking-tight text-[#80461B]">
                        M{race.fee}
                      </p>
                      <p
                        className={`mt-1 text-[10px] ${
                          featured ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        Maloti
                      </p>
                    </div>

                    <Link
                      href={`/register?race=${encodeURIComponent(String(race.id))}`}
                      aria-label={`Register for ${race.name}`}
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                        featured
                          ? 'bg-[#25D366] text-slate-950 hover:rotate-45 hover:bg-[#20c45d]'
                          : 'bg-blue-600 text-white hover:rotate-45 hover:bg-blue-700'
                      }`}
                    >
                      <ArrowUpRight size={20} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom banner */}
        <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-slate-950">
              <Footprints size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-950">Not sure which distance to choose?</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Pick the distance that suits your fitness and experience. Walkers are welcome too!
              </p>
            </div>
          </div>

          <Link
            href="/register"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-[#20c45d]"
          >
            Get started
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Independence theme */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-xs font-extrabold uppercase tracking-[0.15em] text-slate-500 sm:text-sm">
          <span>One Heat.</span>
          <span className="text-blue-600">One Run.</span>
          <span className="text-emerald-700">One Lesotho.</span>
        </div>
      </div>
    </section>
  );
}
