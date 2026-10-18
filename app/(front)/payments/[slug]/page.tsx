
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetails from "@/components/frontend/ProjectDetails";
import { portfolioProjects } from "@/lib/data";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({
  params,
}: ProjectPageProps): Metadata {
  const project = portfolioProjects.find(
    (item) => item.slug === params.slug
  );

  if (!project) {
    return {
      title: "Project Not Found | Mookho Fuma",
    };
  }

  return {
    title: `${project.title} | Mookho Fuma`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = portfolioProjects.find(
    (item) => item.slug === params.slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
