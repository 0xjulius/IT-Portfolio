// src/pages/ProjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { projects } from "../data/projectsData";
import { useLanguage } from "../context/LanguageContext"; // Otetaan kielikonteksti käyttöön

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang } = useLanguage(); // Haetaan nykyinen kieli (fi / en)
  const isFi = lang === "fi";

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const project = projects.find((p) => p.slug === slug);

  // Määritetään otsikko ja kuvaus turvallisesti kielen mukaan
  const title = project
    ? isFi && project.titleFi
      ? project.titleFi
      : project.titleEn || project.title
    : "";

  // Muotoillaan päivämäärä suoraan projektin tiedoista (turvallinen tuotannossa Vercelissä)
  const formattedDate = project?.date
    ? new Date(project.date).toLocaleDateString(isFi ? "fi-FI" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
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
        setContent(
          "## Article Not Found\n\nNo detailed writeup available yet for this project.",
        );
        setLoading(false);
      });
  }, [slug]);

  if (!project) {
    return (
      <div className="container mx-auto py-20 text-center text-slate-800">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link
          to="/#projects"
          className="text-purple-600 underline mt-4 inline-block font-medium"
        >
          ← Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <article className="w-full border-y border-slate-200 bg-white px-4 sm:px-8 py-10 md:py-14">
        <div className="max-w-5xl mx-auto">
          {/* Navigation & Action Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <Link
              to="/#projects"
              className="text-purple-700 hover:text-purple-600 font-bold text-sm inline-flex items-center gap-1 transition-colors"
            >
              ← Back to Projects
            </Link>

            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all duration-200 shadow-md active:scale-95"
                >
                  Source Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 border border-emerald-400 rounded-xl transition-all duration-200 shadow-md"
                >
                  Live Site
                </a>
              )}
            </div>
          </div>

          <header className="mb-6">
            {/* Käytetään turvallista ja responsiivista kieli-otsikkoa */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              {formattedDate && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  <span>
                    {isFi ? "Päivitetty:" : "Updated:"} {formattedDate}
                  </span>
                </div>
              )}

              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
            </div>
          </header>

          {project.image && (
            <div className="relative w-full h-80 sm:h-[450px] overflow-hidden bg-slate-50 border border-slate-200 mb-10 shadow-sm">
              <img
                src={project.image}
                alt={title}
                className="relative w-full h-full object-contain p-4"
              />
            </div>
          )}

          <hr className="border-slate-200 mb-10" />

          <main>
            {loading ? (
              <div className="text-center py-10 text-slate-500 font-medium">
                Loading case study...
              </div>
            ) : (
              <article
                className="prose prose-slate max-w-none font-serif
                prose-h2:font-sans prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-h2:text-slate-900 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:mt-10 prose-h2:mb-4
                prose-h3:font-sans prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-bold prose-h3:text-purple-800 prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-slate-800 prose-p:text-lg sm:prose-p:text-[19px] prose-p:leading-[1.85] prose-p:font-normal prose-p:my-5
                prose-li:text-slate-800 prose-li:text-lg prose-li:leading-relaxed prose-li:my-2
                prose-strong:text-slate-950 prose-strong:font-bold
                prose-table:font-sans prose-table:w-full prose-table:my-8 prose-th:text-slate-900 prose-th:bg-slate-100 prose-th:p-3 prose-th:border-b-2 prose-th:border-slate-300 prose-td:border-b prose-td:border-slate-200 prose-td:p-3"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </article>
            )}
          </main>
        </div>
      </article>
    </div>
  );
}
