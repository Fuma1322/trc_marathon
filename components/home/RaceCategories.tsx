import Link from "next/link";
import { ArrowUpRight, Footprints, Gauge, Route, Trophy } from "lucide-react";
import { RACE_CATEGORIES } from "@/lib/constants";

const icons = [Footprints, Route, Gauge, Trophy];

export default function RaceCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-green-700">Find your distance</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-[#111111] sm:text-4xl">A race for every runner</h2>
        <p className="mt-4 leading-7 text-gray-600">Start where you are, set your goal, and take the next step.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {RACE_CATEGORIES.map((race, index) => {
          const Icon = icons[index];
          return (
            <article key={race.id} className="group rounded-3xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:bg-[#25D366] group-hover:text-[#111111]">
                <Icon size={24} />
              </div>
              <p className="mt-6 text-sm font-semibold text-gray-500">{race.level}</p>
              <h3 className="mt-1 text-xl font-extrabold text-[#111111]">{race.name}</h3>
              <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-600">{race.description}</p>
              <div className="mt-6 flex items-end justify-between border-t border-gray-100 pt-5">
                <div>
                  <p className="text-xs text-gray-500">Entry fee</p>
                  <p className="mt-1 text-2xl font-black text-[#111111]">M{race.fee}</p>
                </div>
                <Link href={`/register?race=${race.id}`} aria-label={`Register for ${race.name}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-[#111111] transition hover:rotate-45">
                  <ArrowUpRight size={19} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
