import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";

const thesisContent = {
  fi: {
    title: "Opinnäytetyö",
    subtitle: "Ammattikorkeakoulututkinnon lopputyö",
    linkText: "Lue opinnäytetyö",
    projectName: "Sytytä kynttilä -WordPress-lisäosan kehittäminen",
    linkUrl: "https://bit.ly/43pT6JA",
    p1: "Kehitin opinnäytetyönäni ’Sytytä kynttilä’ -WordPress-lisäosan, joka mahdollistaa virtuaalisten muistokynttilöiden sytyttämisen Lumivaarassa menehtyneiden läheisten muistolle.",
    p2: "Sain työlleni arvosanan 5/5. Tämä projekti oli tärkeä askel teknisessä ja ammatillisessa kehityksessäni, ja se opetti syvällisesti käyttäjälähtöisestä sovelluskehityksestä.",
  },
  en: {
    title: "Thesis",
    subtitle: "University of Applied Sciences Degree Project",
    linkText: "Read thesis",
    projectName: "Development of Light a Candle -plugin for WordPress",
    linkUrl: "https://bit.ly/43pT6JA",
    p1: "For my thesis, I developed the ’Light a Candle’ WordPress plugin, which provides an intuitive platform for users to light virtual memorial candles for their loved ones from Lumivaara.",
    p2: "Graded with the highest score (5/5), this project was a significant milestone in my professional growth, deepening my expertise in modern web development and user experience.",
  },
};

const Thesis = () => {
  const { lang } = useLanguage();
  const t = thesisContent[lang] || thesisContent.fi;

  return (
    <section className="schoolThesis mb-20">
      <div className="mx-auto text-center pt-10 px-5 max-w-[700px] lg:max-w-[950px] mt-[80px]">
        {/* Otsikko */}
        <h1 className="text-[30px] lg:text-[36px] uppercase font-bold text-gradient mb-3 flex items-center justify-center gap-3">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base font-medium ptx2 uppercase tracking-wider mb-8">
          {t.subtitle}
        </p>

        {/* Kortti */}
        <div className="card mx-auto p-6 sm:p-10 flex flex-col gap-6 shadow-sm text-center">
          {/* Projektin nimi / otsikko sisällä */}
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold ptx leading-snug">
              {t.projectName}
            </h3>
          </div>

          {/* Leipätekstit */}
          <div className="space-y-4 text-base sm:text-lg lg:text-xl ctext font-medium leading-relaxed opacity-95">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>

          {/* Painike */}
          <div className="pt-2">
            <a
              href={t.linkUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shadow-sm"
            >
              <span>{t.linkText}</span>
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                className="text-sm shrink-0"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thesis;
