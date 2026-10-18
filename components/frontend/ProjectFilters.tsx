
"use client";

import { projectCategories } from "@/lib/data";

type ProjectFiltersProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function ProjectFilters({
  selectedCategory,
  onCategoryChange,
}: ProjectFiltersProps) {
  return (
    <div
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-3"
    >
      {projectCategories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category)}
            className={`border px-5 py-3 text-sm transition-colors duration-200 ${
              isActive
                ? "border-[#271522] bg-[#271522] text-[#F6F0E8]"
                : "border-[#271522]/15 bg-transparent text-[#271522]/70 hover:border-[#C5A46D] hover:text-[#271522]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
