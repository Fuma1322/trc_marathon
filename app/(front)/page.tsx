import Hero from '@/components/home/Hero';
import RaceCategories from '@/components/home/RaceCategories';
import Features from '@/components/home/Features';
import Link from 'next/link';
import { ArrowRight, Footprints } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <RaceCategories />
      <Features />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950 p-6 shadow-2xl shadow-black/10 sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border-[24px] border-blue-600/40 sm:h-64 sm:w-64"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/10 bg-[#25D366]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#25D366]">
                  <Footprints size={15} />
                  Your next finish line awaits
                </div>

                <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Every step counts.
                  <span className="block text-white">Be part of the movement.</span>
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
      </section>
    </>
  );
}
