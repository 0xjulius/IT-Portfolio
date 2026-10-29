import React, { useState, useEffect } from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useLanguage } from "../context/LanguageContext";

const navContent = {
  fi: {
    me: "Koti",
    studies: "Koulutus",
    projects: "Projektit",
    skills: "Osaaminen",
    accolades: "Sertifikaatit",
  },
  en: {
    me: "Me",
    studies: "Studies",
    projects: "Projects",
    skills: "Skills",
    accolades: "Accolades",
  },
};

const navItems = [
  { id: "home", key: "me" },
  { id: "studies", key: "studies" },
  { id: "projects", key: "projects" },
  { id: "skills", key: "skills" },
  { id: "awards", key: "accolades" },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const t = navContent[lang] || navContent.fi;

  const toggleNav = () => setNav((prev) => !prev);

  useEffect(() => {
    if (nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [nav]);

  const handleNavClick = (targetId) => {
    setNav(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(targetId, {
          smooth: true,
          duration: 500,
        });
      }, 100);
    }
  };

  return (
    <nav className="absolute top-6 sm:top-8 right-4 lg:right-12 z-50 flex items-center justify-end w-full px-4 text-base xl:text-xl">
      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center gap-1 px-6 py-2 card rounded-full shadow-lg whitespace-nowrap">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="font-semibold text-md sm:text-base ptx hover:text-purple-700 py-1.5 px-4 rounded-full transition-all duration-200 hover:bg-slate-900/5 cursor-pointer"
          >
            {location.pathname === "/" ? (
              <ScrollLink
                to={item.id}
                spy={true}
                smooth={true}
                duration={500}
                className="cursor-pointer block w-full h-full"
              >
                {t[item.key]}
              </ScrollLink>
            ) : (
              <button
                onClick={() => handleNavClick(item.id)}
                className="cursor-pointer block w-full h-full text-left"
              >
                {t[item.key]}
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleNav}
        aria-label="Toggle navigation"
        className="block lg:hidden z-50 p-3 card rounded-full shadow-md text-slate-900 focus:outline-none"
      >
        {nav ? (
          <AiOutlineClose
            size={24}
            className="text-slate-900 dark:text-white"
          />
        ) : (
          <AiOutlineMenu size={24} className="text-slate-900" />
        )}
      </button>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md lg:hidden transition-opacity duration-300 ease-in-out ${
          nav
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full">
          <ul className="flex flex-col gap-2 text-2xl text-center text-white px-6 w-full max-w-xs">
            {navItems.map((item) => (
              <li key={item.id} className="w-full">
                {location.pathname === "/" ? (
                  <ScrollLink
                    to={item.id}
                    smooth={true}
                    duration={500}
                    onClick={() => setNav(false)}
                    className="cursor-pointer block py-3 px-6 rounded-xl hover:bg-white/10 hover:text-cyan-400 transition-all duration-200"
                  >
                    {t[item.key]}
                  </ScrollLink>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="cursor-pointer block w-full py-3 px-6 rounded-xl hover:bg-white/10 hover:text-cyan-400 transition-all duration-200 text-center"
                  >
                    {t[item.key]}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
