// src/components/AuthorBio.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext";

const AUTHOR = "Julius Aalto";
const AUTHOR_AVATAR = "/images/pfp.png";
const LINKEDIN_URL = "https://www.linkedin.com/in/juliusaalto/"; // Vaihda tähän oma LinkedIn-profiilisi osoite

const T = {
  fi: {
    bioText:
      "Ohjelmistokehittäjä ja teknologiaohjelmien harrastaja. Kirjoitan moderneista web-teknologioista, ohjelmistosuunnittelusta ja omista projekteistani.",
    connect: "Verkostoidutaan LinkedInissä!",
  },
  en: {
    bioText:
      "Software developer and tech enthusiast. I write about modern web technologies, software architecture, and building my own projects.",
    connect: "Let's connect on LinkedIn!",
  },
};

export default function AuthorBio() {
  const { lang } = useLanguage();
  const t = T[lang] || T.fi;

  return (
    <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 shadow-sm">
      <img
        src={AUTHOR_AVATAR}
        alt={AUTHOR}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-slate-200 shadow-md shrink-0"
      />
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
          {AUTHOR}
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
          {t.bioText}
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#0a66c2] hover:bg-[#004182] rounded-xl transition-all duration-200 shadow-sm active:scale-95"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          {t.connect}
        </a>
      </div>
    </div>
  );
}
