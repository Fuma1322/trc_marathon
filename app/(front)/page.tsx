import Hero from '@/components/home/Hero';
import RaceCategories from '@/components/home/RaceCategories';
import Features from '@/components/home/Features';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <RaceCategories />
      <Features />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 rounded-3xl bg-[#111111] p-8 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#25D366]">
              Your next finish line starts here
            </p>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Ready to take the first step?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300">
              Register for your preferred distance and review the official payment instructions.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-extrabold text-[#111111] hover:bg-[#1fbd59]"
          >
            Start registration <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
