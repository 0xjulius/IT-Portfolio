import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

// Sama raja kuin ScrollToTopButtonissa: tämän yli vieritettäessä
// kielipainike väistyy mobiilissa ja ylös-nappi ilmestyy samaan kohtaan.
const SCROLL_TOP_THRESHOLD = 300;

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(true); // desktop-logiikka
  const [nearTop, setNearTop] = useState(true); // mobiililogiikka
  const isEn = lang === "en";

  useEffect(() => {
    const handleScroll = () => {
      // Desktop: etsitään Home-osio sivulta
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const homeBottom = homeSection.getBoundingClientRect().bottom;
        // Jos Home-osion pohja on näytön yläreunan yläpuolella, piilotetaan nappi
        setIsVisible(homeBottom > 100);
      } else {
        // Jos osiota ei löydy (esim. eri sivulla), seurataan pelkkää pikselirajaa
        setIsVisible(window.scrollY < 800);
      }

      // Mobiili: näkyvissä vain sivun alussa, sitten ylös-nappi tulee tilalle
      setNearTop(window.scrollY <= SCROLL_TOP_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Vaihda kieltä / Switch language"
      className={`fixed z-[9999] flex items-center justify-between rounded-full bg-[#00A3E0] shadow-lg border-none outline-none cursor-pointer transition-all duration-500 ease-in-out
        w-[6.5rem] h-[3.25rem] px-3
        bottom-10 right-10
        lg:w-24 lg:h-12 lg:shadow-xl lg:shadow-sky-500/30
        lg:top-8 lg:bottom-auto lg:right-auto lg:left-12 ${
          isVisible ? "" : "lg:opacity-0 lg:scale-90 lg:pointer-events-none"
        } ${
          nearTop
            ? ""
            : "max-lg:opacity-0 max-lg:scale-90 max-lg:pointer-events-none"
        }`}
    >
      {/* Taustatekstit */}
      <span className="text-xs font-bold text-white select-none">FIN</span>
      <span className="text-xs font-bold text-white select-none">ENG</span>

      {/* Liukuva valkoinen pallo */}
      <div
        className={`absolute top-1 left-1 w-11 h-11 lg:w-10 lg:h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out ${
          isEn ? "translate-x-[3.25rem] lg:translate-x-12" : "translate-x-0"
        }`}
      >
        <span className="text-xs font-extrabold text-[#00A3E0] select-none">
          {isEn ? "ENG" : "FIN"}
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;
