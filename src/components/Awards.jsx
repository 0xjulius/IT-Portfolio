import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import awardImage from "../images/kamk-cybersecurity-fundamentals-badge.webp";
import awardImage2 from "../images/kamk-azure-fundamentals-badge.webp";
import awardImage3 from "../images/kamk-elements-of-cloud-and-cybersecurity-badge.webp";
import awardImage4 from "../images/certificate-elements-of-ai-fi.webp";
import awardImage5 from "../images/stage.jpg";
import awardImage6 from "../images/don.avif";
import awardImage7 from "../images/gandalf.png";
import awardImage8 from "../images/practical-ai-badge.png";
import awardImage1 from "../images/aicert-edu.png";
import awardImage9 from "../images/m365.png";
import awardImage10 from "../images/m365-2.png";
import awardImage11 from "../images/m365-3.png";
import awardImage12 from "../images/ai-agents.png";
import awardImage13 from "../images/cf-ibm.png";

const awardsContent = {
  fi: {
    certificatesTitle: "Sertifikaatit & Suoritukset",
    honorsTitle: "Tunnustukset & Palkinnot",
    certificates: [
      {
        image: awardImage13,
        title: "Cybersecurity Fundamentals",
        issuedBy: "Lokakuu, 2026 - IBM, SkillsBuild",
        desc: (
          <>
            Osoitus perustason ymmärryksestä{" "}
            <span className="ptx2 font-bold">tietoturvan käsitteistä</span>,{" "}
            tavoitteista ja käytännöistä. Koulutus kattoi kyberuhkat,
            hyökkäystyypit,{" "}
            social engineering,{" "}
            turvallisuusstrategiat, salausmenetelmät sekä organisaatioiden tavat{" "}
            ehkäistä, havaita ja reagoida kyberhyökkäyksiin.{" "}
            <a
              href="https://www.credly.com/badges/dd81befa-e8b1-46c0-a8db-db67bb0e563e/public_url"
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 font-semibold inline-block mt-2"
            >
              Katso Credly-sertifikaatti →
            </a>
          </>
        ),
      },
      {
        image: awardImage12,
        title: "Microsoft Copilot: AI Agents",
        issuedBy: "Myöntäjä: Esa Riutta, Eduhouse",
        desc: (
          <>
            Osoitus edistyneestä tekoälyagenttien tuntemuksesta ja hallinnasta (
            <span className="ptx2 font-bold">
              AI-agentit johtajan oikeana kätenä
            </span>
            ). Koulutus kattoi agenttien luonnin{" "}
            <span className="ptx2 font-bold">Copilot Studiossa</span>,
            konfiguroinnin, ohjeistuksen (prompting) sekä tietolähteiden
            määrittelyn liiketoiminta- ja johtamiskäyttöön.
          </>
        ),
      },
      {
        image: awardImage11,
        title: "Microsoft 365 3 – Using the Applications",
        issuedBy: "Myöntäjä: Tanja Lehto, Eduhouse",
        desc: (
          <>
            Käytännön taidot Microsoft 365 -ympäristön tehokkaassa ja
            turvallisessa käytössä (
            <span className="ptx2 font-bold">
              Microsoft 365 3 – Näin käytät sitä
            </span>
            ). Osaaminen kattaa sovellusten asennukset, järjestelmäasetukset
            sekä turvalliset tietoturvakäytännöt.
          </>
        ),
      },
      {
        image: awardImage10,
        title: "Microsoft 365 2 – Getting to Know the Applications",
        issuedBy: "Myöntäjä: Tanja Lehto, Eduhouse",
        desc: (
          <>
            M365-ekosysteemin sovellusten syvällinen hallinta (
            <span className="ptx2 font-bold">
              Microsoft 365 2 – Sovelluksiin tutustuminen
            </span>
            ). Hallitut työkalut:{" "}
            <span className="ptx2 font-bold">
              OneDrive, Teams, OneNote, Forms, Sway, Planner, Viva Engage,
              Stream
            </span>{" "}
            sekä prosessien automaatio{" "}
            <span className="ptx2 font-bold">Power Automatella</span>.
          </>
        ),
      },
      {
        image: awardImage9,
        title: "Microsoft 365 1 - Fundamentals",
        issuedBy: "Myöntäjä: Tanja Lehto, Eduhouse",
        desc: (
          <>
            M365-perusarkkitehtuurin ja keskeisten työkalujen hallinta (
            <span className="ptx2 font-bold">Microsoft 365 1 – Perusteet</span>
            ). Ymmärrys{" "}
            <span className="ptx2 font-bold">
              Outlook-, Word-, Excel-, PowerPoint-, Teams-
            </span>{" "}
            ja <span className="ptx2 font-bold">OneDrive</span> -sovellusten
            saumattomasta yhteiskäytöstä nykyaikaisessa työympäristössä.
          </>
        ),
      },
      {
        image: awardImage1,
        title: "AI: Basics of Artificial Intelligence",
        issuedBy: "Myöntäjä: Riku Rantala, Eduhouse",
        desc: (
          <>
            Generatiivisen tekoälyn soveltaminen ja työkalut (
            <span className="ptx2 font-bold">AI: Tekoälyn perusteet</span>).
            Kattavuus:{" "}
            <span className="ptx2 font-bold">ChatGPT, Copilot, Gemini</span>,
            kuvanluonti (<span className="ptx2 font-bold">Midjourney</span>),
            äänisynteesi (<span className="ptx2 font-bold">ElevenLabs</span>),
            synteettiset avatarit (
            <span className="ptx2 font-bold">HeyGen, Synthesia</span>) sekä
            AI-etiikka ja tietosuoja.
          </>
        ),
      },
      {
        image: awardImage8,
        title: "Practical AI by Microsoft",
        issuedBy: "Kajaanin ammattikorkeakoulu (KAMK) & Microsoft",
        desc: "Käytännönläheinen tekoälyosaaminen, terminologia ja periaatteet toteutettuna yhteistyössä Microsoftin ja KAMK:n kanssa.",
      },
      {
        image: awardImage,
        title: "Cybersecurity Fundamentals",
        issuedBy: "Maaliskuu 2023, Kajaanin ammattikorkeakoulu (KAMK)",
        desc: (
          <>
            Pilvi- ja tietoturvaratkaisujen perusteet{" "}
            <span className="ptx2 font-semibold">Microsoft Azure</span>{" "}
            -ympäristössä sekä käytännön vianmääritys ja suojauskäytännöt.
          </>
        ),
      },
      {
        image: awardImage3,
        title: "Elements of Cloud and Cybersecurity",
        issuedBy: "Maaliskuu 2023, Kajaanin ammattikorkeakoulu (KAMK)",
        desc: "Tietämät pilvi- ja tietoturvaratkaisuista, arkkitehtuureista sekä niihin liittyvistä peruskäsitteistä ja toimintaperiaatteista.",
      },
      {
        image: awardImage2,
        title: "Azure Fundamentals by Microsoft",
        issuedBy: "Maaliskuu 2023, Kajaanin ammattikorkeakoulu (KAMK)",
        desc: (
          <>
            Sertifioitua osaamista{" "}
            <span className="ptx2 font-semibold">Microsoft Azure</span>{" "}
            -pilvialustasta, sen infrastruktuurista, tietoturvasta ja
            hallintatyökaluista.
          </>
        ),
      },
      {
        image: awardImage4,
        title: "Elements of AI - The Basics of Artificial Intelligence",
        issuedBy: "Maaliskuu 2021, Helsingin yliopisto & Reaktor",
        desc: "Tekoälyn perusteet, algoritmit ja yhteiskunnalliset vaikuttavuusarvioinnit.",
      },
    ],
    honors: [
      {
        image: awardImage7,
        title: "Lakera's The Gandalf Challenge - AI Security Game",
        link: "https://www.lakera.ai/blog/who-is-gandalf",
        desc: (
          <>
            Syvällinen ymmärrys LLM-mallien tietoturvasta (Large Language
            Models) ja Prompt Engineeringistä. Suoritetut haasteet käsittelevät
            haavoittuvuuksia kuten{" "}
            <i>Prompt Injection, Jailbreaking, Prompt Leakage</i> ja{" "}
            <i>Data Poisoning</i>. Pääsy kärkisijoille (Taso 7) maailman
            suosituimmassa AI-tietoturvapelissä.
          </>
        ),
        moreText: "Lue lisää Gandalf AI Security -haasteesta",
      },
      {
        image: awardImage5,
        title: "Wapice's Hack The Stage - Grand Finalist",
        link: "https://juliusaalto.com/portfolio/wapice-hack-the-stage-iot-ticket/",
        issuedBy: "Maaliskuu 2021",
        desc: (
          <>
            Toimin opiskelijatiimimme{" "}
            <span className="ptx2 font-semibold">
              Lead Technical Project Managerina
            </span>{" "}
            ja johdin tiimimme finaaliin Wapicen järjestämässä IoT-Ticket Hack
            The Stage -innovaatiokilpailussa.
          </>
        ),
        moreText: "Lue lisää projektista",
      },
      {
        image: awardImage6,
        title: "Arkkitehtitoimisto Touko Saaren Säätiön Stipendi",
        issuedBy:
          "Myönnetty menestyksekkäästä ja tavoitteellisesta opiskelusta.",
        desc: "Stipendi tunnustuksena erinomaisesta opintomenestyksestä ja aktiivisesta otteesta teknologia-alalla.",
      },
    ],
  },
  en: {
    certificatesTitle: "Certificates",
    honorsTitle: "Awards and Honors",
    certificates: [
      {
        image: awardImage13,
        title: "Cybersecurity Fundamentals",
        issuedBy: "October, 2026 - IBM, SkillsBuild",
        desc: (
          <>
            Demonstrates a foundational understanding of{" "}
            <span className="ptx2 font-bold">cybersecurity concepts</span>,{" "}
            objectives, and practices. The training covered cyber threats,{" "}
            attack types,{" "}
            <span className="ptx2 font-bold">social engineering</span>, security
            strategies, cryptography, and organizational methods to prevent,
            detect, and respond to cyber attacks.{" "}
            <a
              href="https://www.credly.com/badges/dd81befa-e8b1-46c0-a8db-db67bb0e563e/public_url"
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 underline font-semibold inline-block mt-2"
            >
              View Credly Certificate →
            </a>
          </>
        ),
      },
      {
        image: awardImage12,
        title: "Microsoft Copilot: AI Agents",
        issuedBy: "Issued by Esa Riutta, Eduhouse",
        desc: (
          <>
            Recognizes advanced understanding of AI agents, demonstrated through{" "}
            <span className="ptx2 font-bold">
              AI-agentit johtajan oikeana kätenä
            </span>
            . Covered creating agents in{" "}
            <span className="ptx2 font-bold">Copilot Studio</span>,
            instructions, knowledge configuration, and executive workflow
            integration.
          </>
        ),
      },
      {
        image: awardImage11,
        title: "Microsoft 365 3 – Using the Applications",
        issuedBy: "Issued by Tanja Lehto, Eduhouse",
        desc: (
          <>
            Recognizes practical skills in navigating and operating the
            Microsoft 365 environment securely and efficiently, including app
            deployments and environment configuration.
          </>
        ),
      },
      {
        image: awardImage10,
        title: "Microsoft 365 2 – Getting to Know the Applications",
        issuedBy: "Issued by Tanja Lehto, Eduhouse",
        desc: (
          <>
            In-depth knowledge of key M365 applications:{" "}
            <span className="ptx2 font-bold">
              OneDrive, Teams, OneNote, Forms, Sway, Planner, Viva Engage,
              Stream
            </span>
            , and workflow automation via{" "}
            <span className="ptx2 font-bold">Power Automate</span>.
          </>
        ),
      },
      {
        image: awardImage9,
        title: "Microsoft 365 1 - Fundamentals",
        issuedBy: "Issued by Tanja Lehto, Eduhouse",
        desc: (
          <>
            Foundational knowledge of modern digital tools including{" "}
            <span className="ptx2 font-bold">
              Outlook, Word, Excel, PowerPoint, Teams
            </span>
            , and <span className="ptx2 font-bold">OneDrive</span> for secure
            collaborative workflows.
          </>
        ),
      },
      {
        image: awardImage1,
        title: "AI: Basics of Artificial Intelligence",
        issuedBy: "Issued by Riku Rantala, Eduhouse",
        desc: (
          <>
            Practical insights into applied AI (
            <span className="ptx2 font-bold">ChatGPT, Copilot, Gemini</span>),
            image generation (<span className="ptx2 font-bold">Midjourney</span>
            ), voice cloning (<span className="ptx2 font-bold">ElevenLabs</span>
            ), virtual avatars, AI security, and ethics.
          </>
        ),
      },
      {
        image: awardImage8,
        title: "Practical AI by Microsoft",
        issuedBy: "Kajaani University of Applied Sciences & Microsoft",
        desc: "Practical knowledge of AI concepts, terminology, and real-world application frameworks certified by Microsoft and KAMK.",
      },
      {
        image: awardImage,
        title: "Cybersecurity Fundamentals",
        issuedBy: "Issued March 2023, Kajaani University of Applied Sciences",
        desc: (
          <>
            Fundamental expertise in cloud and cybersecurity solutions across{" "}
            <span className="ptx2 font-semibold">Microsoft Azure</span> services
            and network protection practices.
          </>
        ),
      },
      {
        image: awardImage3,
        title: "Elements of Cloud and Cybersecurity",
        issuedBy: "Issued March 2023, Kajaani University of Applied Sciences",
        desc: "Core understanding of cloud architecture, cybersecurity principles, threat mitigation, and infrastructure terminology.",
      },
      {
        image: awardImage2,
        title: "Azure Fundamentals by Microsoft",
        issuedBy: "Issued March 2023, Kajaani University of Applied Sciences",
        desc: (
          <>
            Certified foundational knowledge of{" "}
            <span className="ptx2 font-semibold">Microsoft Azure</span> cloud
            platform, safety protocols, and infrastructure management.
          </>
        ),
      },
      {
        image: awardImage4,
        title: "Elements of AI - The Basics of Artificial Intelligence",
        issuedBy: "Issued March 2021, University of Helsinki",
        desc: "Fundamental concepts of AI, algorithms, machine learning basics, and societal implications.",
      },
    ],
    honors: [
      {
        image: awardImage7,
        title: "Lakera's The Gandalf Challenge - AI Security Game",
        link: "https://www.lakera.ai/blog/who-is-gandalf",
        desc: "Hands-on mastery of Prompt Engineering and LLM security vulnerabilities, including Prompt Injections, Jailbreaking, and Data Leakage. Reached Level 7 on the global leaderboard.",
        moreText: "Read more about the Gandalf AI Security Game",
      },
      {
        image: awardImage5,
        title: "Wapice's Hack The Stage - Grand Finalist",
        link: "https://juliusaalto.com/portfolio/wapice-hack-the-stage-iot-ticket/",
        issuedBy: "Awarded March 2021",
        desc: (
          <>
            Served as{" "}
            <span className="ptx2 font-semibold">
              Lead Technical Project Manager
            </span>{" "}
            for our team, leading us to the Grand Finale in Wapice's IoT-Ticket
            Hackathon.
          </>
        ),
        moreText: "Learn more about the project",
      },
      {
        image: awardImage6,
        title: "Touko Saari's Foundation Scholarship",
        issuedBy: "Awarded for outstanding academic achievement",
        desc: "Recognized for diligent, highly successful studies and proactive engagement in technology fields.",
      },
    ],
  },
};

const AwardCard = ({ image, title, issuedBy, desc }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card m-2 sm:m-4 lg:m-10 p-4 sm:p-6 lg:p-8">
      {/* Ylärivi: Kuva + Otsikko + Myöntäjä otsikon alla + Väkänen */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 cursor-pointer lg:cursor-default"
      >
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <div className="w-14 h-14 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center bg-white/60 rounded-xl p-1 border border-gray-200/60 shadow-sm">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left min-w-0">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold ptx leading-snug">
              {title}
            </h2>
            {issuedBy && (
              <p className="text-xs sm:text-base ptx2 font-semibold opacity-90 mt-1">
                {issuedBy}
              </p>
            )}
          </div>
        </div>
        {/* Väkänen pyörähdysanimaatiolla (vain mobiilissa) */}
        <button className="lg:hidden p-2 text-md text-black/50 focus:outline-none shrink-0">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Sisältöosa: Laajeneva mobiilissa, aina näkyvissä työpöydällä (lg:) */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-[800px] opacity-100 mt-4"
            : "max-h-0 opacity-0 lg:max-h-[800px] lg:opacity-100 lg:mt-4"
        }`}
      >
        <div className="text-left pl-0 sm:pl-[112px] lg:pl-0">
          <div className="text-base sm:text-lg lg:text-xl ctext font-medium leading-relaxed opacity-95">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
};

const HonorCard = ({ image, title, link, issuedBy, desc, moreText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card m-2 sm:m-4 lg:m-10 p-4 sm:p-6 lg:p-8">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 cursor-pointer lg:cursor-default"
      >
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <div className="w-14 h-14 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center bg-white/60 rounded-xl p-1 border border-gray-200/60 shadow-sm">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left min-w-0">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold ptx leading-snug">
              {link && !isOpen ? (
                <span className="underline">{title}</span>
              ) : (
                title
              )}
            </h2>
            {issuedBy && (
              <p className="text-xs sm:text-base ptx2 font-semibold opacity-90 mt-1">
                {issuedBy}
              </p>
            )}
          </div>
        </div>
        {/* Väkänen pyörähdysanimaatiolla (vain mobiilissa) */}
        <button className="lg:hidden p-2 text-md text-black/50 focus:outline-none shrink-0">
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-[800px] opacity-100 mt-4"
            : "max-h-0 opacity-0 lg:max-h-[800px] lg:opacity-100 lg:mt-4"
        }`}
      >
        <div className="text-left pl-0 sm:pl-[112px] lg:pl-0 space-y-2">
          <div className="text-base sm:text-lg lg:text-xl ctext font-medium leading-relaxed opacity-95">
            {desc}
          </div>
          {link && moreText && (
            <div>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="ptx2 text-base sm:text-lg font-bold hover:underline inline-block mt-2"
              >
                {moreText} &rarr;
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Awards = () => {
  const { lang } = useLanguage();
  const t = awardsContent[lang] || awardsContent.fi;

  return (
    <section className="py-10" id="awards">
      <h1 className="text-2xl sm:text-[30px] lg:text-[36px] uppercase text-center font-bold text-gradient mb-6 sm:mb-8">
        {t.certificatesTitle}
      </h1>

      {t.certificates.map((cert, index) => (
        <AwardCard
          key={index}
          image={cert.image}
          title={cert.title}
          issuedBy={cert.issuedBy}
          desc={cert.desc}
        />
      ))}

      <h1 className="text-2xl sm:text-[30px] lg:text-[36px] uppercase text-center font-bold text-gradient mt-12 sm:mt-[100px] mb-6 sm:mb-8">
        {t.honorsTitle}
      </h1>

      {t.honors.map((honor, index) => (
        <HonorCard
          key={index}
          image={honor.image}
          title={honor.title}
          link={honor.link}
          issuedBy={honor.issuedBy}
          desc={honor.desc}
          moreText={honor.moreText}
        />
      ))}
    </section>
  );
};

export default Awards;
