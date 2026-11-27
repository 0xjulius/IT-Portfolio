// src/pages/ProjectDetail.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCitations from "../utils/remarkCitations";
import { projects } from "../data/projectsData";
import { useLanguage } from "../context/LanguageContext";
import AuthorBio from "../components/AuthorBio";
import {
  fetchStatsForSlugs,
  trackArticleView,
  setArticleLike,
} from "../utils/postStats";

const AUTHOR = "Julius Aalto";
const AUTHOR_AVATAR = "/images/pfp.png"; // public/images/pfp.png
// Polku, jolla projektisivut avautuvat reitityksessäsi (esim. /projects/:slug).
// Muuta tämä, jos reittisi on eri.
const PROJECT_ROUTE_BASE = "/blog";
const LIGHTBOX_FADE_MS = 200;

// Käännökset yhdessä paikassa
const T = {
  fi: {
    back: "← Takaisin projekteihin",
    backBlog: "← Takaisin blogiin",
    source: "Lähdekoodi",
    live: "Live-sivu",
    published: "Julkaistu",
    updated: "Päivitetty",
    readTime: "min lukuaika",
    viewsLabel: "katselukertaa",
    likeLabel: "Tykkää artikkelista",
    unlikeLabel: "Poista tykkäys",
    contents: "Sisällys",
    loading: "Ladataan artikkelia...",
    notFoundTitle: "Projektia ei löytynyt",
    notFoundBack: "← Takaisin portfolioon",
    articleMissing:
      "## Artikkelia ei löytynyt\n\nTälle projektille ei ole vielä kirjoitettu yksityiskohtaista artikkelia.",
    prev: "Edellinen projekti",
    next: "Seuraava projekti",
    imageAlt: "Projektin kansikuva:",
    closeLightbox: "Sulje kuva",
    zoomHint: "Klikkaa suurentaaksesi",
  },
  en: {
    back: "← Back to Projects",
    backBlog: "← Back to Blog",
    source: "Source Code",
    live: "Live Site",
    published: "Published",
    updated: "Updated",
    readTime: "min read",
    viewsLabel: "views",
    likeLabel: "Like article",
    unlikeLabel: "Unlike article",
    contents: "Contents",
    loading: "Loading case study...",
    notFoundTitle: "Project not found",
    notFoundBack: "← Return to Portfolio",
    articleMissing:
      "## Article Not Found\n\nNo detailed writeup available yet for this project.",
    prev: "Previous project",
    next: "Next project",
    imageAlt: "Project cover image:",
    closeLightbox: "Close image",
    zoomHint: "Click to enlarge",
  },
};

// Otsikkotekstistä URL-ystävällinen ankkuri (säilyttää ä, ö, å)
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

// Valitsee projektin otsikon kielen mukaan
const getTitle = (p, isFi) =>
  p ? (isFi && p.titleFi ? p.titleFi : p.titleEn || p.title) : "";

// Edellinen/seuraava-kortti: projektin kuva taustana, alaosa blurrattu ja tummennettu
// jotta teksti on helppo lukea kuvasta riippumatta.
function ProjectNavCard({
  project,
  label,
  isFi,
  state,
  align = "left",
  className = "",
}) {
  const isRight = align === "right";

  return (
    <Link
      to={`${PROJECT_ROUTE_BASE}/${project.slug}`}
      state={state}
      className={`group relative block h-44 sm:h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-800 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-lg ${className}`}
    >
      {project.image && (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Blurri alaosaan, häivytetään maskilla ylöspäin */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 backdrop-blur-md"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, black 30%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
        }}
      />
      {/* Tumma häivytys tekstin luettavuutta varten */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-900/85 via-slate-900/50 to-transparent" />

      <div
        className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 ${
          isRight ? "text-right" : "text-left"
        }`}
      >
        <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-normal sm:tracking-wide text-slate-200">
          {label}
        </span>
        <span className="mt-1 text-sm sm:text-base font-bold leading-snug text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden transition-colors group-hover:text-purple-200">
          {getTitle(project, isFi)}
        </span>
      </div>
    </Link>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const isFi = lang === "fi";
  const t = isFi ? T.fi : T.en;

  // Mistä käyttäjä tuli: linkit lähettävät tiedon mukana (state.from).
  // Suora linkki (esim. Google) palaa oletuksena blogilistaan.
  const routerLocation = useLocation();
  const backTo = routerLocation.state?.from ?? "/blog";
  const backLabel = backTo.startsWith("/#") ? t.back : t.backBlog;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  // Katselukerrat ja tykkäykset (oletuksena 0, jotta ikonit näkyvät aina)
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [lightbox, setLightbox] = useState(null); // { src, alt } | null
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragStartRef = useRef({
    x: 0,
    y: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });
  const closeTimeoutRef = useRef(null);
  const openRafRef = useRef(null);

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setDragging(false);
  };

  const openLightbox = (data) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openRafRef.current) {
      window.cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    }
    resetZoom();
    setLightbox(data);
    setLightboxVisible(false);
    openRafRef.current = window.requestAnimationFrame(() => {
      openRafRef.current = window.requestAnimationFrame(() => {
        setLightboxVisible(true);
      });
    });
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    setLightboxVisible(false);
    setDragging(false);
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setLightbox(null);
      resetZoom();
      closeTimeoutRef.current = null;
    }, LIGHTBOX_FADE_MS);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
      if (openRafRef.current) window.cancelAnimationFrame(openRafRef.current);
    };
  }, []);

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projectIndex >= 0 ? projects[projectIndex] : undefined;
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex >= 0 && projectIndex < projects.length - 1
      ? projects[projectIndex + 1]
      : null;

  const title = getTitle(project, isFi);

  const description = project
    ? (isFi && project.descriptionFi
        ? project.descriptionFi
        : project.descriptionEn || project.description) || ""
    : "";

  // ISO-päivämäärä (YYYY-MM-DD) kielen mukaan. timeZone: "UTC" estää päivän siirtymisen.
  const formatDate = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString(isFi ? "fi-FI" : "en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
      : null;

  const published = project?.publishedAt ?? project?.date;
  const publishedText = formatDate(published);
  const updatedText =
    project?.updatedAt && project.updatedAt !== published
      ? formatDate(project.updatedAt)
      : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setLightbox(null);
    setLightboxVisible(false);
    resetZoom();
  }, [slug]);

  // Tilastot (katselut + tykkäykset) Upstashista oman /api/stats-reitin kautta
  useEffect(() => {
    if (!slug) return;
    let active = true;

    setViews(0);
    setLikes(0);
    setLiked(localStorage.getItem(`liked:${slug}`) === "1");

    trackArticleView(slug).then((v) => {
      if (active && typeof v === "number") {
        setViews((prev) => Math.max(prev, v));
      }
    });

    fetchStatsForSlugs([slug]).then((stats) => {
      if (!active || !stats?.[slug]) return;
      if (typeof stats[slug].likes === "number") {
        setLikes(stats[slug].likes);
      }
      if (typeof stats[slug].views === "number") {
        setViews((prev) => Math.max(prev, stats[slug].views));
      }
    });

    return () => {
      active = false;
    };
  }, [slug]);

  const handleLike = async () => {
    if (!slug) return;
    const nextLiked = !liked;
    setLiked(nextLiked);
    localStorage.setItem(`liked:${slug}`, nextLiked ? "1" : "0");
    setLikes((prev) => Math.max(0, prev + (nextLiked ? 1 : -1)));

    const updated = await setArticleLike(slug, nextLiked);
    if (typeof updated === "number") setLikes(updated);
  };

  // Sulje lightbox Escapella ja lukitse taustan vieritys auki ollessa
  useEffect(() => {
    if (!lightbox) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  // Haetaan markdown-artikkeli
  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setMissing(false);
    fetch(`/content/${slug}.md`)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok || (contentType && contentType.includes("text/html"))) {
          throw new Error("No markdown writeup found");
        }
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setMissing(true);
        setContent(t.articleMissing);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, isFi]);

  // Poimitaan H2/H3-otsikot: ankkurit sisällysluetteloa varten.
  // Koodilohkojen sisällä olevia #-rivejä ei lasketa otsikoiksi.
  const { tocItems, idByLine } = useMemo(() => {
    const items = [];
    const ids = {};
    const used = {};
    let inFence = false;

    content.split(/\r?\n/).forEach((line, i) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return;
      }
      if (inFence) return;

      const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
      if (!m) return;

      const text = m[2]
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[`*_]/g, "")
        .trim();
      const base = slugify(text) || "osio";
      used[base] = (used[base] || 0) + 1;
      const id = used[base] > 1 ? `${base}-${used[base]}` : base;

      ids[i + 1] = id; // react-markdownin rivinumerot alkavat 1:stä
      if (m[1].length === 2) items.push({ id, text });
    });

    return { tocItems: items, idByLine: ids };
  }, [content]);

  const readingMinutes = useMemo(() => {
    if (missing || !content.trim()) return null;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [content, missing]);

  // Markdown-komponentit: ankkurit otsikoille, klikattavat kuvat, vierittyvät taulukot ja lähdeviitteiden pehmeä vieritys
  const mdComponents = useMemo(() => {
    const heading =
      (Tag) =>
      ({ node, children }) => (
        <Tag className="scroll-mt-24" id="{idByLine[node?.position?.start?.line]}">
          {children}
        </Tag>
      );
    return {
      h2: heading("h2"),
      h3: heading("h3"),
      img: ({ node, src, alt, className = "", ...props }) => {
        if (!src) return null;
        return (
          <img
            src={src}
            alt={alt || ""}
            loading="lazy"
            onClick={() => openLightbox({ src, alt: alt || "" })}
            title={t.zoomHint}
            className={`cursor-zoom-in rounded-xl border border-slate-200 shadow-sm transition-transform duration-200 hover:scale-[1.01] ${className}`}
            {...props}
          />
        );
      },
      table: ({ node, ...props }) => (
        <div className="overflow-x-auto my-8">
          <table {...props} />
        </div>
      ),
      // Lähdeviitteet (#ref-n / #cite-n): vieritä pehmeästi ja korosta kohde hetkeksi
      a: ({ node, href, children, ...props }) => {
        const isCitation =
          href?.startsWith("#ref-") || href?.startsWith("#cite-");
        if (!isCitation) {
          return (
            <a href={href} {...props}>
              {children}
            </a>
          );
        }
        return (
          <a
            href={href}
            {...props}
            onClick={(e) => {
              const target = document.getElementById(href.slice(1));
              if (!target) return;
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "center" });
              target.classList.add("bg-amber-100");
              window.setTimeout(
                () => target.classList.remove("bg-amber-100"),
                1600,
              );
            }}
          >
            {children}
          </a>
        );
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idByLine, t.zoomHint]);

  // SEO: title, description, Open Graph ja BlogPosting-JSON-LD ilman lisäkirjastoja
  useEffect(() => {
    if (!project) return;

    const prevTitle = document.title;
    document.title = `${title} | ${AUTHOR}`;

    const canonicalUrl = `${window.location.origin}${PROJECT_ROUTE_BASE}/${project.slug}`;
    const canonicalEl = document.head.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalEl?.getAttribute("href") ?? null;
    if (canonicalEl) {
      canonicalEl.setAttribute("href", canonicalUrl);
    }

    const undo = [];
    const setMeta = (attr, key, value) => {
      if (!value) return;
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (el) {
        const old = el.getAttribute("content");
        el.setAttribute("content", value);
        undo.push(() => el.setAttribute("content", old ?? ""));
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        el.setAttribute("content", value);
        document.head.appendChild(el);
        undo.push(() => el.remove());
      }
    };

    const imageUrl = project.image
      ? new URL(project.image, window.location.origin).href
      : null;

    setMeta("name", "description", description);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:site_name", AUTHOR);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "[https://schema.org](https://schema.org)",
      "@type": "BlogPosting",
      headline: title,
      description,
      image: imageUrl || undefined,
      author: {
        "@type": "Person",
        "@id": "[https://juliusaalto.com/#person](https://juliusaalto.com/#person)",
        name: AUTHOR,
        url: "[https://juliusaalto.com/](https://juliusaalto.com/)",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      datePublished: published,
      dateModified: project.updatedAt || published,
      inLanguage: isFi ? "fi" : "en",
      keywords: project.tags?.join(", "),
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (canonicalEl && prevCanonical !== null) {
        canonicalEl.setAttribute("href", prevCanonical);
      }
      undo.forEach((fn) => fn());
      script.remove();
    };
  }, [project, title, description, published, isFi]);

  if (!project) {
    return (
      <div className="container mx-auto py-20 text-center text-slate-800">
        <h1 className="text-2xl font-bold">{t.notFoundTitle}</h1>
        <Link className="text-purple-600 underline mt-4 inline-block font-medium" to="/#projects">
          {t.notFoundBack}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <main className="w-full border-y border-slate-200 bg-white px-4 sm:px-8 py-10 md:py-14">
        {/* Yläpalkki: linjassa bannerin kanssa */}
        <nav
          aria-label={isFi ? "Projektinavigaatio" : "Project navigation"}
          className="max-w-5xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-slate-200"
        >
          <Link
            to={backTo}
            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-sky-800 bg-sky-100 hover:bg-sky-200 border border-sky-200 rounded-xl transition-all duration-200 active:scale-95"
          >
            {backLabel}
          </Link>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all duration-200 shadow-md active:scale-95"
              >
                {t.source}
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 border border-emerald-400 rounded-xl transition-all duration-200 shadow-md"
              >
                {t.live}
              </a>
            )}
          </div>
        </nav>

        {/* Otsikko + banneri.
            Desktop (lg+): otsikko ensin, sen alla banneri.
            Mobiili/tabletti: banneri ensin täyteen leveyteen, otsikko sen alapuolella. */}
        <div className="max-w-5xl mx-auto flex flex-col">
          <header className="order-2 lg:order-1 w-full max-w-4xl mx-auto mb-6 lg:mb-8">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500 mb-4">
              <span className="inline-flex items-center gap-2 font-semibold text-slate-700">
                <img
                  src={AUTHOR_AVATAR}
                  alt={AUTHOR}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover border border-slate-200"
                />
                {AUTHOR}
              </span>

              {publishedText && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={published}>
                    {t.published} {publishedText}
                  </time>
                </>
              )}

              {updatedText && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={project.updatedAt}>
                    {t.updated} {updatedText}
                  </time>
                </>
              )}

              {readingMinutes && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    {readingMinutes} {t.readTime}
                  </span>
                </>
              )}

              <span aria-hidden="true">·</span>
              <span
                className="inline-flex items-center gap-1 text-slate-600"
                title={`${views} ${t.viewsLabel}`}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{views}</span>
              </span>

              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={handleLike}
                aria-pressed={liked}
                aria-label={liked ? t.unlikeLabel : t.likeLabel}
                title={liked ? t.unlikeLabel : t.likeLabel}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition active:scale-95 ${
                  liked
                    ? "bg-rose-100 text-rose-700 border border-rose-200"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{likes}</span>
              </button>
            </div>

            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-200 text-slate-800 px-3 py-1 rounded-full font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {project.image && (
            <div
              onClick={() =>
                openLightbox({
                  src: project.image,
                  alt: `${t.imageAlt} ${title}`,
                })
              }
              title={t.zoomHint}
              className="group order-1 lg:order-2 relative -mx-4 sm:-mx-8 lg:-mx-8 xl:-mx-16 mb-6 lg:mb-10 aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-none lg:rounded-2xl bg-slate-100 border-y lg:border border-slate-200 shadow-lg cursor-zoom-in"
            >
              <img
                src={project.image}
                alt={`${t.imageAlt} ${title}`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.01]"
              />
              {/* Pieni blurri bannerin alaosaan */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 backdrop-blur-md"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to top, black 0%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to top, black 0%, transparent 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-white/50 to-transparent" />
            </div>
          )}
        </div>

        {/* Tekstipalsta: kapeampi, jotta rivinpituus pysyy luettavana */}
        <div className="max-w-4xl mx-auto">
          {/* Sisällysluettelo */}
          {!loading && !missing && tocItems.length >= 3 && (
            <nav
              aria-label={t.contents}
              className="mb-10 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
            >
              <p className="text-sm font-extrabold uppercase tracking-wide text-slate-700 mb-2">
                {t.contents}
              </p>
              <ol className="list-decimal list-inside space-y-1 text-[15px] text-slate-700">
                {tocItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-purple-700 hover:text-purple-600 hover:underline"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <hr className="border-slate-200 mb-10" />

          {loading ? (
            <div className="text-center py-10 text-slate-500 font-medium">
              {t.loading}
            </div>
          ) : (
            <article
              className="prose prose-slate max-w-none font-serif
                prose-h1:hidden
                prose-h2:font-sans prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-h2:text-slate-900 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:mt-10 prose-h2:mb-4
                prose-h3:font-sans prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-bold prose-h3:text-purple-800 prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-slate-800 prose-p:text-lg sm:prose-p:text-[19px] prose-p:leading-[1.85] prose-p:font-normal prose-p:my-5
                prose-li:text-slate-800 prose-li:text-lg prose-li:leading-relaxed prose-li:my-2
                prose-strong:text-slate-950 prose-strong:font-bold
                prose-table:font-sans prose-table:w-full prose-table:my-0 prose-th:text-slate-900 prose-th:bg-slate-100 prose-th:p-3 prose-th:border-b-2 prose-th:border-slate-300 prose-td:border-b prose-td:border-slate-200 prose-td:p-3"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkCitations]}
                components={mdComponents}
              >
                {content}
              </ReactMarkdown>
            </article>
          )}

          {/* Kirjoittajan esittelylaatikko */}
          <AuthorBio />

          {/* Edellinen / seuraava projekti */}
          {(prevProject || nextProject) && (
            <nav
              aria-label={isFi ? "Muut projektit" : "More projects"}
              className="mt-16 pt-8 border-t border-slate-200 grid grid-cols-2 gap-3 sm:gap-4"
            >
              {prevProject ? (
                <ProjectNavCard
                  project={prevProject}
                  label={`← ${t.prev}`}
                  isFi={isFi}
                  state={routerLocation.state}
                />
              ) : (
                <span />
              )}

              {nextProject && (
                <ProjectNavCard
                  project={nextProject}
                  label={`${t.next} →`}
                  isFi={isFi}
                  state={routerLocation.state}
                  align="right"
                  className={!prevProject ? "col-start-2" : ""}
                />
              )}
            </nav>
          )}
        </div>
      </main>

      {/* Lightbox-modal fade-in ja fade-out -animaatiolla */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt || t.closeLightbox}
          onClick={closeLightbox}
          onPointerMove={(e) => {
            if (!dragging || zoom <= 1) return;
            const dx = e.clientX - dragStartRef.current.x;
            const dy = e.clientY - dragStartRef.current.y;
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
              dragStartRef.current.moved = true;
            }
            setPan({
              x: dragStartRef.current.originX + dx,
              y: dragStartRef.current.originY + dy,
            });
          }}
          onPointerUp={() => setDragging(false)}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 sm:p-8 backdrop-blur-sm select-none transition-opacity duration-200 ease-out ${
            lightboxVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-10 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => {
                if (zoom > 1) {
                  resetZoom();
                } else {
                  setZoom(2);
                }
              }}
              className="flex h-11 px-4 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white transition hover:bg-white/25 focus:outline-none"
            >
              {zoom > 1 ? "200% → 100%" : "100% → 200%"}
            </button>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label={t.closeLightbox}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl font-bold text-white transition hover:bg-white/25 focus:outline-none"
            >
              &times;
            </button>
          </div>

          <figure
            onClick={(e) => e.stopPropagation()}
            className={`flex max-h-[90vh] max-w-6xl flex-col items-center overflow-hidden transition-all duration-200 ease-out ${
              lightboxVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              draggable={false}
              onPointerDown={(e) => {
                e.stopPropagation();
                if (zoom <= 1) return;
                setDragging(true);
                dragStartRef.current = {
                  x: e.clientX,
                  y: e.clientY,
                  originX: pan.x,
                  originY: pan.y,
                  moved: false,
                };
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (dragStartRef.current.moved) {
                  dragStartRef.current.moved = false;
                  return;
                }
                if (zoom > 1) {
                  resetZoom();
                } else {
                  setZoom(2);
                }
              }}
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              }}
              className={`max-h-[82vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-transform duration-150 ${
                zoom > 1
                  ? dragging
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-zoom-in"
              }`}
            />
            {lightbox.alt && (
              <figcaption className="mt-3 text-center text-sm text-slate-200">
                {lightbox.alt}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}