// src/pages/BlogIndex.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projectsData";
import { useLanguage } from "../context/LanguageContext";

// Pidä sama kuin ProjectDetail.jsx:n PROJECT_ROUTE_BASE ja reititys
const BLOG_ROUTE_BASE = "/blog";
const AUTHOR = "Julius Aalto";

const T = {
  fi: {
    back: "← Etusivulle",
    title: "Blogi",
    intro:
      "Kirjoituksia projekteistani, oppimistani asioista ja niiden takana olevista ratkaisuista.",
    all: "Kaikki",
    empty: "Ei kirjoituksia tällä rajauksella.",
    posts: "kirjoitusta",
  },
  en: {
    back: "← Home",
    title: "Blog",
    intro:
      "Writing about my projects, what I have learned and the decisions behind them.",
    all: "All",
    empty: "No posts match this filter.",
    posts: "posts",
  },
};

const getTitle = (p, isFi) =>
  isFi && p.titleFi ? p.titleFi : p.titleEn || p.title;

const getDescription = (p, isFi) =>
  (isFi && p.descriptionFi
    ? p.descriptionFi
    : p.descriptionEn || p.description) || "";

const getBadge = (p, isFi) => (isFi ? p.badgeFi : p.badgeEn) || "";

const getDate = (p) => p.publishedAt ?? p.date ?? null;

// Rajaa tekstin riveihin ilman Tailwindin line-clamp-pluginia.
// Luokat kirjoitetaan kokonaisina, jotta Tailwind löytää ne.
const CLAMP_2 =
  "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden";
const CLAMP_3 =
  "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden";

export default function BlogIndex() {
  const { lang } = useLanguage();
  const isFi = lang === "fi";
  const t = isFi ? T.fi : T.en;
  const [activeTag, setActiveTag] = useState(null);

  const formatDate = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString(isFi ? "fi-FI" : "en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
      : null;

  // Näytetään vain projektit, joille on kirjoitettu artikkeli (hasArticle).
  // Uusin ensin. Jos päivämäärä puuttuu, projektia pidetään uusimpana,
  // kunnes publishedAt on lisätty.
  const posts = useMemo(
    () =>
      projects
        .filter((p) => p.hasArticle)
        .map((p, i) => ({ p, i }))
        .sort((a, b) => {
          const da = getDate(a.p) ?? "9999-12-31";
          const db = getDate(b.p) ?? "9999-12-31";
          return db.localeCompare(da) || a.i - b.i;
        })
        .map(({ p }) => p),
    [],
  );

  // Suodatinchipit: tagit, joita on vähintään kahdessa kirjoituksessa
  const topTags = useMemo(() => {
    const counts = {};
    posts.forEach((p) =>
      p.tags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      }),
    );
    return Object.entries(counts)
      .filter(([, n]) => n >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [posts]);

  const visible = activeTag
    ? posts.filter((p) => p.tags?.includes(activeTag))
    : posts;

  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = `${t.title} | ${AUTHOR}`;
    return () => {
      document.title = prev;
    };
  }, [t.title]);

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <main className="w-full border-y border-slate-200 bg-white px-4 sm:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-8 pb-4 border-b border-slate-200">
            <Link
              to="/"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-sky-800 bg-sky-100 hover:bg-sky-200 border border-sky-200 rounded-xl transition-all duration-200 active:scale-95"
            >
              {t.back}
            </Link>
          </nav>

          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
              {t.title}
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">{t.intro}</p>
          </header>

          {/* Tagisuodatin */}
          {topTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8" role="group">
              {[null, ...topTags].map((tag) => {
                const active = tag === activeTag;
                return (
                  <button
                    key={tag ?? "all"}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    aria-pressed={active}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-blue-100 text-slate-800 border-blue-200 hover:bg-blue-200"
                    }`}
                  >
                    {tag ?? t.all}
                  </button>
                );
              })}
            </div>
          )}

          {visible.length === 0 ? (
            <p className="py-16 text-center text-slate-500">{t.empty}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => {
                const date = getDate(p);
                const badge = getBadge(p, isFi);
                return (
                  <Link
                    key={p.slug}
                    to={`${BLOG_ROUTE_BASE}/${p.slug}`}
                    state={{ from: BLOG_ROUTE_BASE }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      {p.image && (
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      {/* Pieni blurri alareunaan, kuten artikkelisivun bannerissa */}
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 backdrop-blur-md"
                        style={{
                          WebkitMaskImage:
                            "linear-gradient(to top, black 0%, transparent 100%)",
                          maskImage:
                            "linear-gradient(to top, black 0%, transparent 100%)",
                        }}
                      />
                      {badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-purple-600 px-2.5 py-1 text-[11px] font-bold text-white shadow">
                          {badge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      {date && (
                        <time
                          dateTime={date}
                          className="text-xs font-medium text-slate-500"
                        >
                          {formatDate(date)}
                        </time>
                      )}
                      <h2
                        className={`mt-1 text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-purple-700 ${CLAMP_2}`}
                      >
                        {getTitle(p, isFi)}
                      </h2>
                      <p
                        className={`mt-2 text-sm leading-relaxed text-slate-600 ${CLAMP_3}`}
                      >
                        {getDescription(p, isFi)}
                      </p>

                      {p.tags?.length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                          {p.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
