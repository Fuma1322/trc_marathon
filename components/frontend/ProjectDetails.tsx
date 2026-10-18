
import Link from "next/link";
import type { PortfolioProject } from "@/lib/data";

type ProjectDetailsProps = {
  project: PortfolioProject;
};

export default function ProjectDetails({
  project,
}: ProjectDetailsProps) {
  const validVideoId = /^[a-zA-Z0-9_-]{11}$/.test(project.youtubeId);

  return (
    <main className="min-h-screen bg-[#F6F0E8]">
      {/* Project header */}
      <section className="bg-[#271522] px-6 py-16 text-[#F6F0E8] sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-[#C5A46D]"
          >
            <span aria-hidden="true">←</span>
            Back to projects
          </Link>

          <div className="mb-6 mt-12 flex flex-wrap items-center gap-3">
            <span className="border border-[#C5A46D]/50 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#C5A46D]">
              {project.category}
            </span>

            <span className="text-sm text-white/50">
              {project.year}
            </span>
          </div>

          <h1 className="max-w-4xl font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
            {project.description}
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="px-6 pt-12 sm:px-10 lg:px-16 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="aspect-video overflow-hidden bg-[#171719]">
            {validVideoId ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}`}
                title={`${project.title} — video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center text-[#F6F0E8]">
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#C5A46D]/60 text-2xl text-[#C5A46D]">
                  ▶
                </span>

                <p className="font-serif text-2xl">
                  Video coming soon
                </p>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/55">
                  The video for this project has not been added yet.
                  Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Synopsis and credits */}
      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A46D]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#9D7750]">
                The story
              </p>
            </div>

            <h2 className="font-serif text-3xl text-[#271522] sm:text-4xl">
              Behind the project
            </h2>

            <p className="mt-7 whitespace-pre-line text-base leading-8 text-[#171719]/70">
              {project.synopsis}
            </p>

            <div className="mt-12 border-t border-[#271522]/10 pt-7">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9D7750]">
                My contribution
              </p>

              <p className="mt-3 font-serif text-2xl text-[#271522]">
                {project.role}
              </p>
            </div>
          </div>

          <aside className="h-fit border border-[#271522]/10 p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-[#271522]">
              Production credits
            </h2>

            <div className="mt-7 space-y-5">
              <div className="border-b border-[#271522]/10 pb-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[#171719]/45">
                  Director
                </p>
                <p className="mt-2 text-sm font-medium text-[#271522]">
                  {project.director}
                </p>
              </div>

              <div className="border-b border-[#271522]/10 pb-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[#171719]/45">
                  Production
                </p>
                <p className="mt-2 text-sm font-medium text-[#271522]">
                  {project.production}
                </p>
              </div>

              {project.credits.map((credit, index) => (
                <div
                  key={`${credit.role}-${index}`}
                  className="border-b border-[#271522]/10 pb-5 last:border-0 last:pb-0"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-[#171719]/45">
                    {credit.role}
                  </p>

                  <p className="mt-2 text-sm font-medium text-[#271522]">
                    {credit.name}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Return to gallery */}
      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl border-t border-[#271522]/15 pt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm font-semibold text-[#271522] transition-colors hover:text-[#9D6875]"
          >
            <span aria-hidden="true">←</span>
            Explore more projects
          </Link>
        </div>
      </section>
    </main>
  );
}
