import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({
  slug,
  hasArticle,
  tags = [],
  image,
  title,
  description,
  github,
  live,
  badge,
}) {
  // Erotetaan kuva-alue omaan muuttujaan selkeyden vuoksi.
  // Lisätty 'group' luokka, jotta hover-efekti toimii kauniisti linkin kanssa.
  const ImageContent = (
    <div className="relative w-full h-64 overflow-hidden rounded-lg group">
      <img
        src={image}
        alt="blur background"
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-xl scale-110"
        aria-hidden="true"
      />
      <img
        src={image}
        alt={title}
        // Vaihdettu hover -> group-hover, jolloin zoomaus aktivoituu linkkiä hoveratessa
        className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );

  return (
    <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-center text-xl font-bold mb-2">
          {title}
          {badge && (
            <span className="ptx2 text-2xl text-amber-400"> {badge}</span>
          )}
        </h2>

        {/* Tech Stack Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-0.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* TÄSSÄ UUSI LOGIIKKA: Jos hasArticle on true, kääritään kuva Link-komponenttiin */}
        {slug && hasArticle ? (
          <Link
            to={`/blog/${slug}`}
            state={{ from: "/#projects" }}
            className="block cursor-pointer"
          >
            {ImageContent}
          </Link>
        ) : (
          ImageContent
        )}

        <p className="text-center mt-4 font-semibold text-lg">{description}</p>
      </div>

      {/* Styled Action Buttons - High Readability */}
      <div className="flex justify-center mt-6 flex-wrap gap-3">
        {slug && hasArticle && (
          <Link
            to={`/blog/${slug}`}
            state={{ from: "/#projects" }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-700 hover:bg-purple-600 border border-purple-400 rounded-xl transition-all duration-200 shadow-md hover:shadow-purple-500/20 active:scale-95"
          >
            <svg
              className="w-4 h-4 text-purple-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Case Study
          </Link>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-600 rounded-xl transition-all duration-200 shadow-md active:scale-95"
          >
            <svg className="w-4 h-4 fill-slate-200" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Source Code
          </a>
        )}

        {live && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 border border-emerald-400 rounded-xl transition-all duration-200 shadow-md hover:shadow-emerald-500/20 active:scale-95"
          >
            <svg
              className="w-4 h-4 text-emerald-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Site
          </a>
        )}
      </div>
    </div>
  );
}
