
import type { PortfolioProject } from "@/lib/data";
import Link from "next/link";

type ProjectCardProps = {
  project: PortfolioProject;
  index?: number;
};

export default function ProjectCard({
  project,
  index = 0,
}: ProjectCardProps) {
  return (
    <article className="group">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${project.title} on YouTube`}
        className="relative block aspect-[4/3] overflow-hidden bg-[#271522] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C5A46D]"
      >
        {/* Thumbnail */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url("${project.thumbnail}")`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/85 via-[#171719]/10 to-transparent" />

        {/* Project number */}
        <span className="absolute left-5 top-5 text-xs tracking-[0.2em] text-white/80">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Play icon */}
        <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white transition-colors group-hover:border-[#C5A46D] group-hover:bg-[#C5A46D] group-hover:text-[#171719]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-0.5 h-4 w-4"
          >
            <path d="M8 5.5v13l10-6.5z" />
          </svg>
        </span>

        {/* Thumbnail caption */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="inline-block border border-white/30 bg-[#171719]/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </a>

      {/* Project information */}
      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <h3 className="font-serif text-2xl text-[#271522] transition-colors group-hover:text-[#9D6875]">
  <Link href={`/projects/${project.slug}`}>
    {project.title}
  </Link>
</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[#171719]/65">
            {project.description}
          </p>
        </div>

        <span className="shrink-0 pt-2 text-xs tracking-wider text-[#171719]/50">
          {project.year}
        </span>
      </div>
    </article>
  );
}
