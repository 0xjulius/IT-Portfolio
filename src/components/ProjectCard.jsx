import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const btnBase =
  "inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-semibold whitespace-nowrap rounded-full transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1";

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
  const { lang } = useLanguage();
  const isFi = lang === "fi";

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

      {/* Painikkeet: Demo = ensisijainen, Case Study = valkoinen, Koodi = harmaa */}
      <div className="flex justify-center items-stretch mt-6 flex-wrap gap-3">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnBase} bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 hover:brightness-110`}
          >
            <span>Demo</span>
            <FaExternalLinkAlt className="text-[11px]" />
          </a>
        )}

        {slug && hasArticle && (
          <Link
            to={`/blog/${slug}`}
            state={{ from: "/#projects" }}
            className={`${btnBase} bg-white/90 text-slate-800 border border-slate-200 shadow-sm hover:bg-white hover:border-slate-300 hover:shadow-md`}
          >
            <FaBookOpen className="text-sm text-purple-600" />
            <span>Case Study</span>
          </Link>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnBase} bg-slate-500 text-white shadow-md shadow-slate-500/30 hover:bg-slate-600`}
          >
            <FaGithub className="text-base" />
            <span>{isFi ? "Koodi" : "Code"}</span>
          </a>
        )}
      </div>
    </div>
  );
}
