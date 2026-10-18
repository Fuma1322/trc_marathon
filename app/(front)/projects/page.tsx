
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { portfolioProjects } from "@/lib/data";
import ProjectFilters from "@/components/frontend/ProjectFilters";
import ProjectCard from "@/components/frontend/ProjectCard";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return portfolioProjects;
    }

    return portfolioProjects.filter(
      (project) => project.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-[#F6F0E8]">
      {/* Page introduction */}
      <section className="relative overflow-hidden bg-[#271522] px-6 py-24 text-[#F6F0E8] sm:px-10 lg:px-16 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#C78691]/10 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C5A46D]" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#C5A46D]">
              The portfolio
            </p>
          </div>

          <h1 className="max-w-4xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            A collection of
            <br />
            <span className="italic text-[#C78691]">
              visual stories.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
            Explore selected projects across film, documentary,
            music video, and television production.
          </p>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/45">
            {portfolioProjects.length} portfolio entries
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <ProjectFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="mb-8 flex items-center justify-between border-b border-[#271522]/10 pb-5">
            <p className="text-sm text-[#171719]/65">
              Showing{" "}
              <span className="font-semibold text-[#271522]">
                {filteredProjects.length}
              </span>{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
            </p>

            <span className="text-xs uppercase tracking-[0.15em] text-[#171719]/45">
              {selectedCategory}
            </span>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <div key={project.slug} className="flex flex-col">
                  <ProjectCard project={project} index={index} />

                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#271522] transition-colors hover:text-[#9D6875]"
                  >
                    View project details
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-[#271522]/10 px-6 py-20 text-center">
              <h2 className="font-serif text-3xl text-[#271522]">
                No projects in this category yet.
              </h2>

              <p className="mt-3 text-sm text-[#171719]/60">
                Try another category to explore the portfolio.
              </p>

              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="mt-7 border border-[#C5A46D] px-5 py-3 text-sm font-semibold text-[#271522] transition-colors hover:bg-[#C5A46D]"
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
