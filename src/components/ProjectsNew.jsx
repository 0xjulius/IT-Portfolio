import React from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectRow from "../components/ProjectRow";
import { useLanguage } from "../context/LanguageContext";
import { projectsData } from "../data/projectsData";

function ProjectsNew() {
  const { lang } = useLanguage();
  const isFi = lang === "fi";

  return (
    <section className="py-10" id="projects">
      <div className="container mx-auto lg:mt-10">
        <h1 className="text-[30px] lg:text-[36px] uppercase text-center text-4xl font-bold text-gradient">
          {isFi ? "Projektini" : "My projects"}
        </h1>

        {/* 1. MOBIILINÄKYMÄ: Täsmälleen sama leveys ja reunat kuin yläpuolisella kortilla */}
        <div className="block sm:hidden mt-6 mx-4 sm:mx-4 card overflow-hidden shadow-lg">
          {projectsData.map((project) => (
            <ProjectRow
              key={project.slug}
              {...project}
              title={isFi ? project.titleFi : project.titleEn}
              description={isFi ? project.descriptionFi : project.descriptionEn}
              badge={isFi ? project.badgeFi : project.badgeEn}
            />
          ))}
        </div>

        {/* 2. TYÖPÖYTÄNÄKYMÄ: Näkyy vain isommilla näytöillä (hidden sm:flex) */}
        <div className="hidden sm:flex flex-wrap items-center justify-center ptx lg:mt-10">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.slug}
              {...project}
              title={isFi ? project.titleFi : project.titleEn}
              description={isFi ? project.descriptionFi : project.descriptionEn}
              badge={isFi ? project.badgeFi : project.badgeEn}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsNew;
