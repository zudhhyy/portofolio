"use client";

import { projects, technologies, type Project } from "@/lib/data";
import { openInNewTab } from "@/lib/link";
import { ExternalLink, Search, Smartphone } from "lucide-react";
import { useMemo, useState } from "react";
import { MotionDiv } from "./motion";

const INITIAL_VISIBLE = 4;

function ProjectLinks({ project }: { project: Project }) {
  const hasLinks = project.web || project.playStore || project.appStore;
  if (!hasLinks) return null;

  return (
    <div className="flex flex-wrap gap-3 absolute bottom-5 left-5">
      {project.web ? (
        <a
          href={project.web}
          {...openInNewTab}
          className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300/40 hover:bg-white/[0.05]"
        >
          <ExternalLink size={16} />
          Live Site
        </a>
      ) : null}
      {project.playStore ? (
        <a
          href={project.playStore}
          {...openInNewTab}
          className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300/40 hover:bg-white/[0.05]"
        >
          <Smartphone size={16} />
          Play Store
        </a>
      ) : null}
      {project.appStore ? (
        <a
          href={project.appStore}
          {...openInNewTab}
          className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300/40 hover:bg-white/[0.05]"
        >
          <Smartphone size={16} />
          App Store
        </a>
      ) : null}
    </div>
  );
}

export function ProjectExplorer() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTech = active === "All" || project.stack.some((tech) => tech.includes(active));
      const matchesQuery = `${project.name} ${project.type} ${project.description} ${project.stack.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesTech && matchesQuery;
    });
  }, [active, query]);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE);
  const hasMore = filteredProjects.length > INITIAL_VISIBLE;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => {
                setActive(tech);
                setShowAll(false);
              }}
              className={`focus-ring whitespace-nowrap rounded-md border px-3 py-2 text-sm transition ${
                active === tech
                  ? "border-blue-300/50 bg-blue-400/12 text-blue-100"
                  : "border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <label className="focus-within:border-blue-300/50 flex min-w-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-neutral-400 lg:w-80">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAll(false);
            }}
            placeholder="Search projects"
            className="w-full bg-transparent text-white outline-none placeholder:text-neutral-500"
          />
        </label>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <MotionDiv
            key={project.name}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="group glass overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-blue-300/35 pb-14 lg:pb-20 relative"
          >
            <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
              <div className="absolute inset-0 dot-grid opacity-45" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100/80">
                  {project.type}
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">{project.name}</h3>
              </div>
              <div className="absolute right-5 top-5 rounded-md border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
                {project.company}
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <p className="leading-7 text-neutral-300">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-neutral-300">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-2">
                {project.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-2 text-sm leading-6 text-neutral-400">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-300" />
                    {achievement}
                  </li>
                ))}
              </ul>
              <ProjectLinks project={project} />
            </div>
          </MotionDiv>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="focus-ring text-xl font-medium text-neutral-400 transition hover:text-white"
          >
            {showAll ? "Show less" : "See more"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
