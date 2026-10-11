import React from "react";
import { FaGithub, FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

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
            {(tags && tags.slice(0, 3).label) ||
              tags.slice(0, 3).map((tag, i) => (
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

      {/* Painikkeet: flex-nowrap pitää napit samalla rivillä ja text-xs / sopivat paddingit estävät tekstin katkeamisen */}
      <div className="flex items-center gap-2 pt-1">
        {hasArticle && (
          <Link
            to={`/projects/${slug}`}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 rounded-xl transition-all shadow-sm truncate"
          >
            <FaBookOpen className="text-[10px] flex-shrink-0" />
            <span className="truncate">Case Study</span>
          </Link>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-xs font-bold text-gray-100 bg-slate-800 hover:bg-slate-900 rounded-xl transition-all shadow-sm truncate"
          >
            <FaGithub className="text-sm flex-shrink-0" />
            <span className="truncate">Code</span>
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 px-2 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shadow-sm truncate"
          >
            <span className="truncate">Demo</span>
            <FaExternalLinkAlt className="text-[10px] flex-shrink-0" />
          </a>
        )}
      </div>
    </div>
  );
}
