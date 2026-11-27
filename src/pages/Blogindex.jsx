// src/pages/BlogIndex.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projectsData";
import { useLanguage } from "../context/LanguageContext";
import { fetchStatsForSlugs } from "../utils/postStats";
import SortDropdown from "../components/SortDropdown";

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
    sortLabel: "Järjestä:",
    sortNewest: "Uusimmat",
    sortMostViewed: "Katsotuimmat",
    sortMostLiked: "Tykätyimmät",
    empty: "Ei kirjoituksia tällä rajauksella.",
    posts: "kirjoitusta",
    viewsLabel: "katselukertaa",
    likesLabel: "tykkäystä",
  },
  en: {
    back: "← Home",
    title: "Blog",
    intro:
      "Writing about my projects, what I have learned and the decisions behind them.",
    all: "All",
    sortLabel: "Sort by:",
    sortNewest: "Newest",
    sortMostViewed: "Most viewed",
    sortMostLiked: "Most liked",
    empty: "No posts match this filter.",
    posts: "posts",
    viewsLabel: "views",
    likesLabel: "likes",
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
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "views" | "likes"
  const [statsBySlug, setStatsBySlug] = useState({});

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
  // Perusjärjestys: uusin ensin. Jos päivämäärä puuttuu, projektia pidetään
  // uusimpana, kunnes publishedAt on lisätty.
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

  // Haetaan kaikkien artikkelien katselu- ja tykkäysmäärät yhdellä kutsulla
  useEffect(() => {
    let active = true;
    const slugs = posts.map((p) => p.slug).filter(Boolean);
    if (slugs.length === 0) return;

    fetchStatsForSlugs(slugs).then((stats) => {
      if (active && stats) setStatsBySlug(stats);
    });

    return () => {
      active = false;
    };
  }, [posts]);

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

  // Tagirajaus + valittu lajittelu (uusimmat / katsotuimmat / tykätyimmät).
  // Tasatilanteessa säilytetään oletusjärjestys (uusin ensin).
  const visible = useMemo(() => {
    const filtered = activeTag
      ? posts.filter((p) => p.tags?.includes(activeTag))
      : posts;

    if (sortBy === "newest") return filtered;

    return filtered
      .map((p, idx) => ({ p, idx }))
      .sort((a, b) => {
        const sa = statsBySlug[a.p.slug] ?? {};
        const sb = statsBySlug[b.p.slug] ?? {};
        const va = sortBy === "views" ? (sa.views ?? 0) : (sa.likes ?? 0);
        const vb = sortBy === "views" ? (sb.views ?? 0) : (sb.likes ?? 0);
        return vb - va || a.idx - b.idx;
      })
      .map(({ p }) => p);
  }, [posts, activeTag, sortBy, statsBySlug]);

  const sortOptions = useMemo(
    () => [
      { id: "newest", label: t.sortNewest },
      { id: "views", label: t.sortMostViewed },
      { id: "likes", label: t.sortMostLiked },
    ],
    [t.sortNewest, t.sortMostViewed, t.sortMostLiked],
  );

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
          <nav className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <Link
              to="/"
              className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-sky-800 bg-sky-100 hover:bg-sky-200 border border-sky-200 rounded-xl transition-all duration-200 active:scale-95 shrink-0"
            >
              {t.back}
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-widest text-right">
              <span className="text-gradient">JULIUS AALTO.</span>
            </h1>
          </nav>

          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
              {t.title}
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">{t.intro}</p>
          </header>

          {/* Tagisuodatin ja lajittelu */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
            {topTags.length > 0 && (
              <div className="flex flex-wrap gap-2" role="group">
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

            <SortDropdown
              label={t.sortLabel}
              value={sortBy}
              options={sortOptions}
              onChange={setSortBy}
            />
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-slate-500">{t.empty}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => {
                const date = getDate(p);
                const badge = getBadge(p, isFi);
                const postViews = statsBySlug[p.slug]?.views ?? 0;
                const postLikes = statsBySlug[p.slug]?.likes ?? 0;
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
                      <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
                        {date ? (
                          <time dateTime={date}>{formatDate(date)}</time>
                        ) : (
                          <span />
                        )}

                        <div className="inline-flex items-center gap-2.5 text-slate-500">
                          <span
                            className="inline-flex items-center gap-1"
                            title={`${postViews} ${t.viewsLabel}`}
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span>{postViews}</span>
                          </span>

                          <span
                            className="inline-flex items-center gap-1"
                            title={`${postLikes} ${t.likesLabel}`}
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span>{postLikes}</span>
                          </span>
                        </div>
                      </div>

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