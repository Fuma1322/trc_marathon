
import Link from "next/link";

import { portfolioProjects } from "@/lib/data";
import ProjectCard from "@/components/frontend/ProjectCard";

export default function FeaturedProjects() {
  const featuredProjects = portfolioProjects
    .filter((project) => project.featured)
    .slice(0, 3);

  return (
    <section
      id="featured-projects"
      className="bg-[#F6F0E8] px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C5A46D]" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9D7750]">
                Selected work
              </p>
            </div>

            <h2 className="font-serif text-4xl leading-tight text-[#271522] sm:text-5xl lg:text-6xl">
              Stories brought
              <br />
              <span className="italic text-[#C78691]">
                to life.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#171719]/65">
              A selection of visual stories, creative concepts, and
              productions that reflect a passion for film and
              storytelling.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-3 border-b border-[#C5A46D] pb-2 text-sm font-semibold text-[#271522] transition-colors hover:text-[#9D6875]"
          >
            Explore all projects
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Project gallery */}
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="border border-[#271522]/10 px-6 py-16 text-center">
            <p className="font-serif text-2xl text-[#271522]">
              New stories are on the way.
            </p>
            <p className="mt-3 text-sm text-[#171719]/60">
              Check back soon to explore the portfolio.
            </p>
          </div>
        )}

        {/* Bottom statement */}
        <div className="mt-20 border-t border-[#271522]/15 pt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-xl italic text-[#271522]">
              Every project begins with a story.
            </p>

            <span className="text-xs uppercase tracking-[0.2em] text-[#171719]/50">
              Film · Documentary · Music Video
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
