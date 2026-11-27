// src/components/SortDropdown.jsx
import React, { useEffect, useRef, useState } from "react";

export default function SortDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const optionRefs = useRef([]);

  const selectedOption =
    options.find((opt) => opt.id === value) ?? options[0] ?? null;

  // Sulje valikko klikattaessa ulkopuolelle
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Kohdista valittuun tai nuolinäppäimellä liikutettuun vaihtoehtoon
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  const openMenu = (startAtSelected = true) => {
    const idx = startAtSelected
      ? Math.max(
          0,
          options.findIndex((opt) => opt.id === value),
        )
      : 0;
    setActiveIndex(idx);
    setOpen(true);
  };

  const handleButtonKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openMenu(true);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) {
        setOpen(false);
      } else {
        openMenu(true);
      }
    }
  };

  const handleOptionKeyDown = (e, index, optionId) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(optionId);
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="inline-flex items-center gap-2 shrink-0">
      {label && (
        <span className="text-xs font-semibold text-slate-600">{label}</span>
      )}

      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => (open ? setOpen(false) : openMenu(true))}
          onKeyDown={handleButtonKeyDown}
          className={`inline-flex items-center justify-between gap-2.5 rounded-2xl border px-3.5 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
            open
              ? "border-purple-600 bg-white text-slate-900 ring-2 ring-purple-200 shadow-sm"
              : "border-purple-200 bg-purple-50/70 text-slate-800 shadow-xs hover:border-purple-300 hover:bg-purple-100/70"
          }`}
        >
          <span>{selectedOption?.label}</span>
          <svg
            className={`h-3.5 w-3.5 text-purple-700 transition-transform duration-200 ease-out ${
              open ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="M5 7.5l5 5 5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <div
            role="listbox"
            aria-label={label}
            className="absolute right-0 z-30 mt-2 min-w-40 overflow-hidden rounded-2xl border border-purple-200 bg-white p-1.5 shadow-xl ring-1 ring-slate-900/5"
          >
            {options.map((opt, idx) => {
              const isSelected = opt.id === value;
              return (
                <button
                  key={opt.id}
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.id);
                    setOpen(false);
                  }}
                  onKeyDown={(e) => handleOptionKeyDown(e, idx, opt.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                    isSelected
                      ? "bg-purple-700 text-white"
                      : "text-slate-700 hover:bg-purple-50 hover:text-purple-900"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <svg
                      className="h-3.5 w-3.5 shrink-0"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden="true"
                    >
                      <path
                        d="M4.5 10.5l3.5 3.5 7.5-8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
