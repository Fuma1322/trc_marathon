export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950 p-6 shadow-2xl shadow-black/10 sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border-[24px] border-blue-600/40 sm:h-64 sm:w-64"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 max-w-2xl">
                <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                  TRC Race 2026 Postponed
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
                  The TRC × LSRC Race 2026 has been postponed due to unforeseen circumstances. We
                  apologize for any inconvenience this may cause and appreciate your understanding.
                  Please reach out to the race organizers for further information and updates
                  regarding the new schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
