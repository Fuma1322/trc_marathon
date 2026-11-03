import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import PrintTicketButton from '@/components/dashboard/PrintTicketButton';

export const dynamic = 'force-dynamic';

type TicketPageProps = {
  params: { id: string };
};

export default async function TicketPage({ params }: TicketPageProps) {
  const runner = await prisma.runnerRegistration.findFirst({
    where: { ticketId: params.id },
    select: {
      fullName: true,
      raceNumber: true,
      raceCategory: true,
      paymentStatus: true,
      registrationStatus: true,
      id: true,
    },
  });

  if (
    !runner ||
    runner.paymentStatus !== 'VERIFIED' ||
    runner.registrationStatus !== 'APPROVED' ||
    !runner.raceNumber ||
    !runner.id
  ) {
    notFound();
  }

  return (
    <main className="ticket-page min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-14">
      <div className="ticket-page-container mx-auto max-w-2xl">
        <div className="mb-5 flex items-center justify-between gap-3 print:hidden">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
              TRC × LSRC Race 2026
            </p>
            <h1 className="mt-1 text-xl font-extrabold text-slate-900">
              Your official race ticket
            </h1>
          </div>

          <PrintTicketButton ticketId="2026" />
        </div>

        <article className="ticket-print overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl print:rounded-none print:border-2 print:border-black print:shadow-none">
          <header className="ticket-print-color relative overflow-hidden bg-[#111111] px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[28px] border-[#25D366]/15" />

            <div className="relative">
              <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#25D366]">
                Official race pass
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                TRC <span className="text-[#25D366]">×</span> LSRC
              </h2>

              <p className="mt-2 text-sm text-slate-300">Beating El Niño for Independence</p>
            </div>
          </header>

          <div className="ticket-print-color bg-white p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Race number
                </p>

                <p className="mt-1 text-5xl font-black tracking-tight text-green-600 sm:text-6xl">
                  {runner.raceNumber}
                </p>
              </div>

              <div className="ticket-print-color w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-800">
                Registration approved
              </div>
            </div>

            <div className="my-8 border-t-2 border-dashed border-slate-200" />

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Racer&apos;s full name
                </p>

                <p className="mt-1 break-words text-xl font-bold text-slate-900">
                  {runner.fullName}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Race category
                </p>

                <p className="mt-1 text-base font-bold text-slate-900">{runner.raceCategory}</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Event date
                </p>

                <p className="mt-1 text-base font-bold text-slate-900">14 November 2026</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Venue</p>

                <p className="mt-1 text-base font-bold text-slate-900">
                  TRC Compound, Maseru, Lesotho
                </p>
              </div>

              {/* Race Schedule */}
              <div className="ticket-print-color mt-8 rounded-2xl border border-green-100 bg-green-50/70 p-5 sm:p-6">
                <div className="mb-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-green-700">
                    Race Day Schedule
                  </p>
                  <h3 className="mt-1 text-xl font-black text-slate-900">Race Start Times</h3>
                  <p className="mt-1 text-sm text-slate-600">14 November 2026</p>
                </div>

                <div className="space-y-3">
                  {[
                    { category: '21km', label: '21 km Race', time: '05:30 AM' },
                    { category: '10km', label: '10 km Race', time: '05:45 AM' },
                    { category: '5km', label: '5 km Race', time: '06:00 AM' },
                    { category: '2.5km', label: '2.5 km Race', time: '06:15 AM' },
                  ].map((race) => {
                    const isCurrentRace = runner.raceCategory === race.category;

                    return (
                      <div
                        key={race.category}
                        className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
                          isCurrentRace
                            ? 'border-green-500 bg-white ring-1 ring-green-500'
                            : 'border-slate-200 bg-white/70'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-slate-900">{race.label}</p>
                          {isCurrentRace && (
                            <p className="mt-0.5 text-xs font-extrabold uppercase tracking-wider text-green-700">
                              Your race
                            </p>
                          )}
                        </div>

                        <p className="shrink-0 text-base font-black text-green-700 sm:text-lg">
                          {race.time}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 text-center text-xs text-slate-600">
                  Please arrive early and be ready before your scheduled start time.
                </p>
              </div>
            </div>

            <div className="ticket-print-color mt-8 rounded-2xl bg-slate-50 p-5 text-center">
              <p className="text-sm font-extrabold text-slate-900">
                Tickets Sponsored By <span className="text-[#25D366]">Maseru</span>
                <span className="text-[#111111]">Plug</span>
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Keep this ticket and remember your race number.
              </p>
            </div>
          </div>
        </article>

        <p className="mt-4 text-center text-xs text-slate-500 print:hidden">
          Use Print ticket to print or choose Save as PDF in your browser.
        </p>
      </div>
    </main>
  );
}
