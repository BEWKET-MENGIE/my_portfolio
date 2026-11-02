"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilter from "@/components/projects/ProjectFilter";

const ALL = "All";
const categories = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))];

export default function AllProjects() {
  const [filter, setFilter] = useState(ALL);
  const visible = true;
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const filteredProjects = useMemo(
    () =>
      filter === ALL
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  const handleSelectCategory = (category: string) => {
    setFilter(category);
    setActiveProject(null);
  };

  return (
    <div>
      {categories.length > 2 && (
        <ProjectFilter
          categories={categories}
          selectedCategory={filter}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              visible={visible}
              prioritizeImage={index === 0}
              active={activeProject === project.id}
              setActive={() =>
                setActiveProject(activeProject === project.id ? null : project.id)
              }
            />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-neutral-500">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}