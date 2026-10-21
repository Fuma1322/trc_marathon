import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin, Footprints, Flag } from 'lucide-react';

const raceCategories = [
  { distance: '2.5 KM', type: 'Fun Walk / Run', fee: 'M90' },
  { distance: '5 KM', type: 'Fun Walk / Run', fee: 'M140' },
  { distance: '10 KM', type: 'Challenge Run', fee: 'M220' },
  { distance: '21 KM', type: 'Half Marathon', fee: 'M280' },
];

export default function Hero() {
  return (
    <section className="relative isolate w-full min-w-0 overflow-hidden bg-slate-950 text-white">
      {/* Race photography: keep the image visible and vibrant */}
      <div
        className="absolute inset-0 -z-30 bg-[url('/marathon-hero.png')] bg-cover"
        aria-hidden="true"
      />

      {/* Light overlay, not a heavy black filter */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-950/15"
        aria-hidden="true"
      />

      {/* Mobile readability without darkening the entire image */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80 lg:hidden"
        aria-hidden="true"
      />

      {/* Blue and green ambient brand lighting */}
      <div
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#25D366]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        {/* Left: hero content */}
        <div className="w-full min-w-0 max-w-2xl">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md sm:px-4 sm:text-sm">
            <Flag size={16} className="shrink-0 text-[#25D366]" />
            <span className="min-w-0">Lesotho 60 Years Independence Anniversary</span>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-[#25D366]" />
            <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-white sm:text-sm">
              TRC Race 2026
            </span>
          </div>

          <h1 className="mt-5 max-w-full break-words text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-[0.96] tracking-[-0.045em] text-blue-600 [overflow-wrap:anywhere]">
            One Heat •<span className="mt-2 block text-white">One Run •</span>
            <span className="mt-2 block text-[#25D366]">One Lesotho •</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg font-semibold leading-7 text-white sm:text-xl">
            Beating El Niño for Independence.
          </p>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
            Run, walk, and celebrate together. From your first 2.5 KM to the half marathon, every
            step counts.
          </p>

          {/* Registration actions */}
          <div className="mt-8 flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-extrabold text-slate-950 shadow-xl shadow-green-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#20c45d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
            >
              Register for the race
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#race-categories"
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/60 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 sm:w-auto"
            >
              Explore race categories
            </a>
          </div>

          {/* Event details */}
          <div className="mt-9 flex min-w-0 flex-col gap-4 border-t border-white/25 pt-6 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <MapPin size={19} className="text-[#25D366]" />
              </span>
              <span>
                <span className="block text-xs text-white/70">Location</span>
                <span className="mt-0.5 block font-bold">Maseru, Lesotho</span>
              </span>
            </div>

            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <CalendarDays size={19} className="text-blue-400" />
              </span>
              <span>
                <span className="block text-xs text-white/70">Race day</span>
                <span className="mt-0.5 block font-bold">14 November 2026</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: premium race pricing card */}
        <div id="race-categories" className="mb-20 w-full min-w-0 scroll-mt-24">
          <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-white/50 bg-white/95 text-slate-900 shadow-2xl shadow-black/30 backdrop-blur-xl lg:ml-auto">
            <div className="relative overflow-hidden bg-blue-600 px-6 py-6 text-white sm:px-7">
              <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full border-[20px] border-white/10" />

              <div className="relative flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Footprints size={25} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                    Find your distance
                  </p>
                  <h2 className="mt-1 text-2xl font-black">Choose your challenge</h2>
                </div>
              </div>

              <p className="relative mt-4 text-sm leading-6 text-blue-50">
                Every pace. Every age. Everyone belongs.
              </p>
            </div>

            <div className="space-y-3 p-4 sm:p-6">
              {raceCategories.map(({ distance, type, fee }) => (
                <div
                  key={distance}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Footprints size={19} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-extrabold text-slate-900">{distance}</p>
                      <p className="mt-1 text-xs leading-4 text-slate-500">{type}</p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-xl bg-[#80461B] px-3 py-2 text-sm font-black text-white shadow-sm">
                    {fee}
                  </span>
                </div>
              ))}

              <p className="px-1 pt-1 text-xs leading-5 text-slate-500">
                Registration fees are in Maloti (M). Choose your preferred distance when
                registering.
              </p>

              <Link
                href="/register"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-[#20c45d]"
              >
                Get race-ready
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brand-colour finishing line */}
      <div className="flex h-1 w-full">
        <div className="w-1/3 bg-blue-600" />
        <div className="w-1/3 bg-[#25D366]" />
        <div className="w-1/3 bg-[#80461B]" />
      </div>
    </section>
  );
}
