
export type ProjectCategory =
  | "Short Film"
  | "Documentary"
  | "Music Video"
  | "Television";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  synopsis: string;
  thumbnail: string;
  youtubeId: string;
  featured: boolean;
  role: string;
  director: string;
  production: string;
  credits: { role: string; name: string }[];
};

export const projectCategories = [
  "All",
  "Short Film",
  "Documentary",
  "Music Video",
  "Television",
] as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "a-story-worth-telling",
    title: "A Story Worth Telling",
    category: "Documentary",
    year: "2026",
    description:
      "A documentary concept exploring people, identity, and everyday experiences.",
    synopsis:
      "A sample documentary narrative centred on lived experiences, personal perspectives, and the stories that shape a community.",
    thumbnail: "/images/projects/documentary.jpg",
    youtubeId: "REPLACE_WITH_VIDEO_ID",
    featured: true,
    role: "Production Assistant",
    director: "Director name",
    production: "Independent Production",
    credits: [
      { role: "Director", name: "Director name" },
      { role: "Production", name: "Production team" },
      { role: "Camera", name: "Camera operator" },
    ],
  },
  {
    slug: "between-two-worlds",
    title: "Between Two Worlds",
    category: "Short Film",
    year: "2026",
    description:
      "A short-film concept exploring perspective, emotion, and human connection.",
    synopsis:
      "A sample fictional story about the decisions, relationships, and experiences that influence how people see the world.",
    thumbnail: "/images/projects/short-film.jpg",
    youtubeId: "REPLACE_WITH_VIDEO_ID",
    featured: true,
    role: "Production Coordinator",
    director: "Director name",
    production: "Independent Production",
    credits: [
      { role: "Director", name: "Director name" },
      { role: "Production", name: "Production team" },
      { role: "Editing", name: "Editor name" },
    ],
  },
  {
    slug: "visual-rhythm",
    title: "Visual Rhythm",
    category: "Music Video",
    year: "2026",
    description:
      "A music-video concept combining visual composition and creative storytelling.",
    synopsis:
      "A sample music-video project focused on translating musical energy into visual sequences, atmosphere, and movement.",
    thumbnail: "/images/projects/music-video.jpg",
    youtubeId: "REPLACE_WITH_VIDEO_ID",
    featured: true,
    role: "Production Assistant",
    director: "Director name",
    production: "Independent Production",
    credits: [
      { role: "Director", name: "Director name" },
      { role: "Artist", name: "Artist name" },
      { role: "Production", name: "Production team" },
    ],
  },
  {
    slug: "on-location",
    title: "On Location",
    category: "Television",
    year: "2026",
    description:
      "A sample television production highlighting location-based storytelling.",
    synopsis:
      "A sample television concept showcasing the planning, coordination, and creative decisions involved in production.",
    thumbnail: "/images/projects/television.jpg",
    youtubeId: "REPLACE_WITH_VIDEO_ID",
    featured: false,
    role: "Production Crew",
    director: "Director name",
    production: "Independent Production",
    credits: [
      { role: "Director", name: "Director name" },
      { role: "Production", name: "Production team" },
    ],
  },
];
