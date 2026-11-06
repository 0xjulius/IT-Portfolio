import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

// Ylös-nappi aktivoituu hieman myöhemmin kuin kielipainike väistyy (300 px),
// jolloin painikkeet vaihtuvat peräkkäin eivätkä ole yhtä aikaa näkyvissä.
const SHOW_AFTER = 450;

// Piilotetaan nappi, kun sivun loppuun on tätä vähemmän pikseleitä,
// ettei se peitä sivun alareunan sisältöä (esim. seuraava projekti -kortti).
const HIDE_NEAR_BOTTOM = 300;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolledEnough = window.scrollY > SHOW_AFTER;
      const distanceToBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      setIsVisible(scrolledEnough && distanceToBottom > HIDE_NEAR_BOTTOM);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Nappi pysyy aina DOM:ssa, jotta fade-in ja fade-out toimivat
  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-10 right-10 z-50 bg-sky-500 hover:bg-sky-400 text-white rounded-full p-4 lg:p-5 focus:outline-none shadow-lg transition-all duration-500 ease-in-out active:scale-95 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
