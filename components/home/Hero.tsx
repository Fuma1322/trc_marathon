import Link from 'next/link';
import { CalendarDays, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 -z-20 bg-[url('/marathon-hero.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
      <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#25D366]/20 blur-3xl" />
      <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Lesotho 60 Years Independence Anniversary
          </span>
          <h1 className="mt-7 text-5xl font-black leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Beating El Niño<span className="mt-2 block text-[#25D366]">for Independence.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
            One Heat • One Run • One Lesotho
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 text-sm font-extrabold text-[#111111] transition hover:bg-[#1fbd59]"
            >
              Register for the race
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 text-sm text-gray-200">
            <span className="flex items-center gap-2">
              <MapPin size={17} className="text-[#25D366]" /> Maseru, Lesotho
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-[#25D366]" /> 14 November 2026
            </span>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-3xl border border-white/15 bg-black/40 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Choose your challenge
            </p>
            <div className="mt-5 space-y-3">
              {[
                ['2.5 km', 'M90'],
                ['5 km', 'M140'],
                ['10 km', 'M220'],
                ['21 km', 'M280'],
              ].map(([distance, fee]) => (
                <div
                  key={distance}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <span className="font-bold text-white">{distance}</span>
                  <span className="font-extrabold text-[#25D366]">{fee}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-300">
              Registration fees are shown in Maloti (M). Confirm your category before making
              payment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
