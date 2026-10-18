import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  WalletCards,
  Footprints,
} from 'lucide-react';

const features = [
  {
    number: '01',
    icon: Users,
    title: 'A race for everyone',
    description:
      'Whether you are a first-time walker or an experienced runner, choose a distance that matches your pace and goals.',
    accent: 'bg-blue-50 text-blue-600',
    line: 'bg-blue-600',
  },
  {
    number: '02',
    icon: WalletCards,
    title: 'Clear payment steps',
    description:
      'Follow the payment instructions for your preferred method, with the steps laid out to help you register confidently.',
    accent: 'bg-emerald-50 text-emerald-700',
    line: 'bg-[#25D366]',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'A clear confirmation process',
    description:
      'Keep your proof of payment and registration details while the organisers review your submission.',
    accent: 'bg-orange-50 text-[#80461B]',
    line: 'bg-[#80461B]',
  },
];

export default function Features() {
  return (
    <section className="relative w-full min-w-0 overflow-hidden border-y border-slate-200/80 bg-slate-50 py-16 sm:py-20">
      {/* Soft brand accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
            <Footprints size={15} />
            The TRC experience
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            More than a race.
            <span className="block text-blue-600">A movement for everyone.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Your journey to the starting line should feel just as good as crossing the finish line.
            Here is what to expect when you join us.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid min-w-0 gap-5 md:grid-cols-3">
          {features.map(({ number, icon: Icon, title, description, accent, line }) => (
            <article
              key={title}
              className="group relative min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-7"
            >
              {/* Top accent */}
              <div
                className={`absolute inset-x-0 top-0 h-1 ${line} transition-all duration-300 group-hover:h-1.5`}
              />

              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accent} transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon size={26} strokeWidth={2} />
                </div>

                <span className="text-sm font-black tracking-widest text-slate-300">{number}</span>
              </div>

              <h3 className="mt-6 text-lg font-extrabold leading-snug text-slate-950 sm:text-xl">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-bold text-slate-500">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>Designed with participants in mind</span>
                <ArrowUpRight
                  size={15}
                  className="ml-auto shrink-0 text-blue-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </article>
          ))}
        </div>

        {/* Brand message */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-5 py-5 text-center sm:flex-row sm:gap-4 sm:text-left">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-slate-950">
            <Footprints size={21} />
          </span>

          <p className="text-sm leading-6 text-slate-700">
            <span className="font-extrabold text-slate-950">One Heat. One Run. One Lesotho.</span>{' '}
            Every pace matters, and every participant belongs.
          </p>
        </div>
      </div>
    </section>
  );
}
