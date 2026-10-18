import Link from 'next/link';

const creativeInterests = [
  {
    number: '01',
    title: 'Film Production',
    description:
      'Exploring the creative and technical processes involved in bringing film projects from concept to screen.',
  },
  {
    number: '02',
    title: 'Documentary Storytelling',
    description:
      'A passion for authentic stories, human experiences, and perspectives that deserve to be seen and heard.',
  },
  {
    number: '03',
    title: 'Music & Visuals',
    description:
      'Connecting sound, imagery, atmosphere, and movement to create engaging visual experiences.',
  },
  {
    number: '04',
    title: 'Television Production',
    description:
      'Developing an understanding of collaborative production workflows and the art of visual communication.',
  },
];

const skills = [
  'Production Planning',
  'Visual Storytelling',
  'Creative Research',
  'Team Collaboration',
  'Communication',
  'Production Coordination',
];

export default function AboutContent() {
  return (
    <main className="bg-[#F6F0E8] text-[#171719]">
      {/* Intro hero */}
      <section className="relative overflow-hidden bg-[#271522] px-6 py-24 text-[#F6F0E8] sm:px-10 lg:px-16 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#C78691]/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C5A46D]" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#C5A46D]">Get to know me</p>
          </div>

          <h1 className="max-w-4xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            Behind every story
            <br />
            <span className="italic text-[#C78691]">is a storyteller.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            A little about my background, my creative interests, and my journey into television and
            film production.
          </p>
        </div>
      </section>

      {/* Biography */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-3 border border-[#C5A46D]/60" />

            <div
              role="img"
              aria-label="Portrait of Mookho Fuma"
              className="relative aspect-[4/5] overflow-hidden bg-[#271522]"
              style={{
                backgroundImage: `
                  linear-gradient(
                    to top,
                    rgba(39, 21, 34, 0.55),
                    transparent 60%
                  ),
                  url('/mookho-portrait.jpeg')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute bottom-0 left-0 p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.25em] text-[#C5A46D]">
                  The person behind the work
                </p>
                <p className="mt-2 font-serif text-3xl text-white">Mookho Fuma</p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -bottom-7 -right-5 h-20 w-20 border-b border-r border-[#C78691]/70"
            />
          </div>

          {/* Biography text */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A46D]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#9D7750]">My story</p>
            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#271522] sm:text-5xl">
              Creativity with
              <br />
              <span className="italic text-[#C78691]">purpose.</span>
            </h2>

            <div className="mt-8 space-y-5 text-base leading-8 text-[#171719]/70">
              <p>
                I&apos;m Mookho Fuma, a graduate of Limkokwing University of Creative Technology in
                Lesotho, where I earned a Diploma in Film Production.
              </p>

              <p>
                My interest lies in the power of visual storytelling — how film, documentaries,
                music videos, and television can communicate ideas, capture experiences, and connect
                people.
              </p>

              <p>
                I&apos;m continuing to develop my creative practice, strengthen my production
                skills, and explore opportunities to contribute to meaningful visual projects.
              </p>
            </div>

            <Link
              href="/projects"
              className="mt-9 inline-flex items-center gap-3 border-b border-[#C5A46D] pb-2 text-sm font-semibold text-[#271522] transition-colors hover:text-[#9D6875]"
            >
              Explore my work
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-white/60 px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A46D]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#9D7750]">Education</p>
            </div>

            <h2 className="font-serif text-4xl text-[#271522] sm:text-5xl">
              Building the foundation.
            </h2>
          </div>

          <div className="grid gap-8 border-t border-[#271522]/15 pt-8 md:grid-cols-[180px_1fr] md:gap-16">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#9D7750]">
                Qualification
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-[#271522] sm:text-3xl">
                Diploma in Film Production
              </h3>

              <p className="mt-3 text-sm font-medium text-[#171719]/75">
                Limkokwing University of Creative Technology
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#171719]/65">
                Academic foundation in television and film production, supporting an understanding
                of creative development, production processes, and visual communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creative interests */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A46D]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#9D7750]">
                Creative interests
              </p>
            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#271522] sm:text-5xl">
              Different formats.
              <br />
              <span className="italic text-[#C78691]">One love for stories.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-[#271522]/10 sm:grid-cols-2">
            {creativeInterests.map((interest) => (
              <article
                key={interest.number}
                className="border-b border-r border-[#271522]/10 p-7 transition-colors hover:bg-white/60 sm:p-9 lg:p-11"
              >
                <p className="text-xs tracking-[0.2em] text-[#9D7750]">{interest.number}</p>

                <h3 className="mt-6 font-serif text-2xl text-[#271522]">{interest.title}</h3>

                <p className="mt-4 text-sm leading-7 text-[#171719]/65">{interest.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-[#271522] px-6 py-20 text-[#F6F0E8] sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A46D]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#C5A46D]">
                Areas of development
              </p>
            </div>

            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              The skills behind
              <br />
              <span className="italic text-[#C78691]">the storytelling.</span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/60">
              A selection of creative and production-related areas that can be refined as the
              portfolio develops.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="border border-white/15 px-4 py-3 text-sm text-white/80 transition-colors hover:border-[#C5A46D] hover:text-[#C5A46D]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact call to action */}
      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl border border-[#271522]/10 px-7 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#9D7750]">
            Let&apos;s create something
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#271522] sm:text-5xl">
            Every great production starts with a conversation.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#171719]/65">
            Interested in working together or discussing a creative project? I&apos;d love to hear
            from you.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 bg-[#271522] px-7 py-4 text-sm font-semibold text-[#F6F0E8] transition-colors hover:bg-[#C5A46D] hover:text-[#271522]"
          >
            Get in touch
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
