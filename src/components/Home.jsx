import React from "react";
import heropic from "../images/omakuva.webp";
import { FaLinkedin, FaGithub, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const content = {
  fi: {
    heroTitle: "Julius Aalto.",
    body1:
      "Olen IT-alan osaaja, jonka vahvuuksia ovat ohjelmisto- ja web-kehitys, IT-tuki sekä tietoturva. Tekninen osaamiseni pohjautuu tietojenkäsittelyn koulutukseen, yli 20 vuoden IT-harrastuneisuuteen ja jatkuvaan itsenäiseen oppimiseen.",
    body2:
      "Liiketalouden taustani antaa vahvan ymmärryksen yritysten tarpeista, prosesseista ja käyttäjälähtöisyydestä. Minua motivoi käytännönläheisten ja liiketoimintaa aitoina hyödyttävien teknisten ratkaisujen suunnittelu sekä kehittäminen.",
    body3:
      "Olen analyyttinen ongelmanratkaisija, joka selvittää haasteet aina juurisyyhyn asti. Kehitän osaamistani jatkuvasti eri projektien ja teknologioiden parissa, ja viihdyn tiimeissä, joissa rakennetaan uutta yhdessä.",
    contact:
      "Verkostoidun mielelläni ja kerron taustastani lisää – ota rohkeasti yhteyttä!",
    projectsBtn: "Katso projektini",
  },
  en: {
    heroTitle: "Julius Aalto.",
    body1:
      "I'm an IT specialist skilled in software & web development, IT support, and cybersecurity. My technical expertise is built on IT education, over 20 years of hands-on technology passion, and continuous self-learning.",
    body2:
      "My business background provides a strong understanding of corporate needs, processes, and user-centric design. I am driven by planning and developing practical tech solutions that bring real business value.",
    body3:
      "I'm an analytical problem solver who gets to the root cause of issues. I continuously advance my skills through projects and technologies, thriving in team environments where we build new things together.",
    contact:
      "I'm always open to networking and sharing more about my background – feel free to reach out!",
    projectsBtn: "View Projects",
  },
};

const Home = () => {
  const { lang } = useLanguage();
  const t = content[lang] || content.fi;

  return (
    <section className="home" id="home">
      <div className="flex items-center justify-center mt-10">
        <div className="flex flex-col lg:flex-row items-center justify-between p-4">
          <div className="mr-4 mt-10 px-4">
            <img
              src={heropic}
              alt="Hero"
              className="lg:w-[500px] h-auto mx-auto w-[400px] mb-10 rounded-xl shadow-lg shadow-white/20 duration-300 transition-transform hover:scale-105"
            />
          </div>
          <div className="lg:w-1/2 px-10 card pb-10">
            <h1 className="text-4xl font-bold mb-4 ptx mt-10">{t.heroTitle}</h1>
            <p className="text-xl max-w-lg ptx mt-10">
              {t.body1}
              <br />
              <br />
              {t.body2}
              <br />
              <br />
              {t.body3}
              <br />
              <br />
              {t.contact}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {/* LinkedIn-nappi */}
              <a
                href="https://www.linkedin.com/in/juliusaalto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#084e96] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
              {/* Vaihda käyttäjänimi omaksesi */}
              <a
                href="https://github.com/0xjulius"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#24292f] hover:bg-[#1b1f23] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
