import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { awardsContent } from "../data/awardsData";

const AwardCard = ({ image, title, issuedBy, desc }) => {
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
              {title}
            </h2>
            {issuedBy && (
              <p className="text-xs sm:text-base ptx2 font-semibold opacity-90 mt-1">
                {issuedBy}
              </p>
            )}
          </div>
        </div>
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
