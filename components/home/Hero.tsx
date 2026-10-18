import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#271522] text-[#F6F0E8]">
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 h-[480px] w-[480px] rounded-full bg-[#C78691]/10 blur-[120px]"
      />

      <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        {/* Introduction */}
        <div className="relative z-10 max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C5A46D]" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C5A46D]">
              Film Production
            </p>
          </div>

          <h1 className="font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Every frame
            <br />
            <span className="italic text-[#C78691]">tells a story.</span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-8 text-[#F6F0E8]/70 sm:text-lg">
            I&apos;m Mookho Fuma — Film Production graduate, camera operator, and editor. I work as
            a Director of Photography and videographer, turning ideas into moving images that
            connect. Problem-solving is my superpower, from lighting a tricky scene to cutting a
            story that flows. Welcome to my portfolio website.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-3 bg-[#C5A46D] px-7 py-4 text-sm font-semibold text-[#171719] transition-colors duration-300 hover:bg-[#F6F0E8]"
            >
              Explore My Work
              <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-[#F6F0E8]/25 px-7 py-4 text-sm font-medium text-[#F6F0E8] transition-colors duration-300 hover:border-[#C78691] hover:text-[#C78691]"
            >
              More About Me
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-4 border-t border-white/10 pt-6">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C5A46D]">
              Based in Lesotho
            </span>
            <span className="h-1 w-1 rounded-full bg-[#C78691]" />
            <span className="text-xs text-[#F6F0E8]/55">Creating stories with purpose</span>
          </div>
        </div>

        {/* Portrait / cinematic image */}
        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="absolute -inset-3 border border-[#C5A46D]/30" />

          <div
            className="relative aspect-[4/5] overflow-hidden bg-[#171719]"
            style={{
              backgroundImage: `
                linear-gradient(
                  to top,
                  rgba(39, 21, 34, 0.85),
                  rgba(39, 21, 34, 0.05) 65%
                ),
                url('/mookho-portraitt.jpeg')
              `,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            role="img"
            aria-label="Portrait of Mookho Fuma"
          >
            {/* Image fallback when the portrait is not yet available */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <span className="font-serif text-8xl text-[#C78691]/30">MF</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="text-xs uppercase tracking-[0.25em] text-[#C5A46D]">The storyteller</p>
              <p className="mt-2 font-serif text-3xl">Mookho Fuma</p>
              <p className="mt-2 text-sm text-[#F6F0E8]/70">Film. Perspective. Emotion.</p>
            </div>
          </div>

          {/* Decorative detail */}
          <div
            aria-hidden="true"
            className="absolute -bottom-7 -right-5 h-20 w-20 border-b border-r border-[#C78691]/60"
          />
        </div>
      </div>

      {/* Bottom edge detail */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C5A46D]/50 to-transparent"
      />
    </section>
  );
}
