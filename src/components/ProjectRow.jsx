import React from "react";
import { FaGithub, FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const btnBase =
  "flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 h-10 px-3 text-xs font-semibold whitespace-nowrap rounded-full transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1";

export default function ProjectRow({
  slug,
  title,
  tags,
  image,
  github,
  live,
  badge,
  hasArticle,
}) {
  const { lang } = useLanguage();
  const isFi = lang === "fi";

  return (
    <div className="flex flex-col p-4 sm:p-5 border-b border-gray-200/80 last:border-none gap-3.5 hover:bg-black/5 transition-colors">
      {/* Ylärivi: Kuva + Otsikko + Badge */}
      <div className="flex items-center space-x-3.5 min-w-0">
        <img
          src={image}
          alt={title}
          className="w-14 h-14 object-cover rounded-xl flex-shrink-0 border border-gray-300/60 shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-gray-900 text-base leading-snug truncate">
              {title}
            </h3>
            {badge && (
              <span className="text-[11px] bg-sky-100 text-sky-700 border border-sky-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0">
                {badge}
              </span>
            )}
          </div>

          {/* Tägit */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs font-semibold text-gray-700 bg-gray-200/80 border border-gray-300/70 px-2.5 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
            {tags && tags.length > 3 && (
              <span className="text-xs font-semibold text-gray-500 bg-gray-200/50 px-2 py-0.5 rounded-md">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Painikkeet: Demo = ensisijainen, Case Study = valkoinen, Koodi = harmaa */}
      <div className="flex items-stretch gap-2 pt-1">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnBase} bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 hover:brightness-110`}
          >
            <span>Demo</span>
            <FaExternalLinkAlt className="text-[10px] flex-shrink-0" />
          </a>
        )}
        {hasArticle && (
          <Link
            to={`/blog/${slug}`}
            state={{ from: "/#projects" }}
            className={`${btnBase} bg-white/90 text-slate-800 border border-slate-200 shadow-sm hover:bg-white hover:border-slate-300 hover:shadow-md`}
          >
            <FaBookOpen className="text-xs flex-shrink-0 text-purple-600" />
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
            <FaGithub className="text-sm flex-shrink-0" />
            <span>{isFi ? "Koodi" : "Code"}</span>
          </a>
        )}
      </div>
    </div>
  );
}
