import React from "react";
import logo from "../images/Wm_white.png";
import LanguageToggle from "./LanguageToggle"; // <-- Tuodaan kielinappi
import { useLanguage } from "../context/LanguageContext"; // <-- Tuodaan kielikonteksti
import "animate.css";

const headerContent = {
  fi: {
    welcome: "Ohjelmisto- ja web-kehittäjä",
    subtitle: "Rakennan älykkäitä ratkaisuja yrityksen tarpeisiin.",
  },
  en: {
    welcome: "Software & web developer",
    subtitle: "I build smart solutions for real business needs.",
  },
};

function Header() {
  const { lang } = useLanguage();
  const t = headerContent[lang] || headerContent.fi;

  return (
    <div className="relative text-black top-10 lg:pt-10 mt-[100px] lg:mt-5">
      {/* Kielinappi vasemmassa yläkulmassa */}
      <div className="fixed top-4 left-4 z-50">
        <LanguageToggle />
      </div>
      <section className="md:flex lg:justify-start justify-center sticky z-10 px-4">
        <div className="text-center xl:pl-40 2xl:pl-60">
          <h1 className="w-full text-5xl font-semibold flex-1 font tracking-widest lg:text-6xl">
            <div className="mb-16 lg:hidden">
              <img
                src={logo}
                alt="logo"
                className="h-auto mx-auto w-[250px] lg:mb-0"
              />
            </div>
            <span className="text-gradient">JULIUS AALTO.</span>
          </h1>
          <p className="text-xl mt-3 subpixel-antialiased tracking-widest ptx font-semibold animate__animated animate__fadeInUp">
            {t.welcome} <br />{" "}
            <span className="ctext text-sm font-normal animate__animated animate__fadeInUp animate__delay-1s">
              {t.subtitle}
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Header;
