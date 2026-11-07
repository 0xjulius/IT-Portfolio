import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHtml5,
  faJs,
  faReact,
  faPython,
  faGitAlt,
  faMicrosoft,
  faLinux,
  faWindows,
  faWordpress,
  faPhp,
  faTelegram,
  faApple,
  faAndroid,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faBrain,
  faRobot,
  faCloud,
  faShieldHalved,
  faPlug,
  faPalette,
  faGear,
  faMicrochip,
  faSliders,
  faChevronDown,
  faCode,
  faLayerGroup,
  faWandMagicSparkles,
  faBolt,
  faGlobe,
  faNetworkWired,
  faKey,
  faLock,
  faServer,
  faBoxesStacked,
  faMobileScreenButton,
  faScrewdriverWrench,
  faLaptopCode,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const techGroups = [
  {
    title: {
      fi: "Tekoäly, Agentit & Automaatio",
      en: "AI, Agents & Automation",
    },
    items: [
      {
        name: {
          fi: "Copilot Studio & AI-agentit",
          en: "Copilot Studio & AI Agents",
        },
        icon: faRobot,
        color: "#0078D4",
      },
      {
        name: {
          fi: "LLM-mallit (ChatGPT, Claude, Gemini, Grok, Qwen)",
          en: "LLMs (ChatGPT, Claude, Gemini, Grok, Qwen)",
        },
        icon: faBrain,
        color: "#10a37f",
      },
      {
        name: {
          fi: "Hermes Agent & Nous Research -mallit",
          en: "Hermes Agent & Nous Research Models",
        },
        icon: faRobot,
        color: "#7c3aed",
      },
      {
        name: {
          fi: "AI-avusteinen ohjelmistokehitys",
          en: "AI-Assisted Software Development",
        },
        icon: faWandMagicSparkles,
        color: "#db2777",
      },
      {
        name: { fi: "Prompt Engineering", en: "Prompt Engineering" },
        icon: faBrain,
        color: "#0284c7",
      },
      {
        name: { fi: "Telegram Bot -automaatio", en: "Telegram Bot Automation" },
        icon: faTelegram,
        color: "#24A1DE",
      },
      {
        name: {
          fi: "n8n & Zapier -automaatiot",
          en: "n8n & Zapier Automation",
        },
        icon: faGear,
        color: "#FF6C37",
      },
      {
        name: {
          fi: "Hugging Face & Avoin tekoäly",
          en: "Hugging Face & Open Source AI",
        },
        icon: faMicrochip,
        color: "#E8B931",
      },
      {
        name: {
          fi: "LM Studio (Lokaalit LLM:ät)",
          en: "LM Studio (Local LLMs)",
        },
        icon: faBrain,
        color: "#6366f1",
      },
    ],
  },
  {
    title: {
      fi: "Web-kehitys, Rajapinnat & Ohjelmointi",
      en: "Web Dev, APIs & Software",
    },
    items: [
      {
        name: { fi: "TypeScript", en: "TypeScript" },
        icon: faCode,
        color: "#3178C6",
      },
      {
        name: { fi: "JavaScript (ES6+)", en: "JavaScript (ES6+)" },
        icon: faJs,
        color: "#d97706",
      },
      {
        name: { fi: "React & Next.js", en: "React & Next.js" },
        icon: faReact,
        color: "#087ea4",
      },
      {
        name: { fi: "Node.js", en: "Node.js" },
        icon: faNodeJs,
        color: "#16a34a",
      },
      {
        name: { fi: "Vite", en: "Vite" },
        icon: faBolt,
        color: "#7c3aed",
      },
      {
        name: { fi: "HTML5 & CSS3 / Tailwind", en: "HTML5 & CSS3 / Tailwind" },
        icon: faHtml5,
        color: "#ea580c",
      },
      {
        name: {
          fi: "REST APIs & Integraatiot",
          en: "REST APIs & Integrations",
        },
        icon: faPlug,
        color: "#e11d48",
      },
      {
        name: { fi: "Python", en: "Python" },
        icon: faPython,
        color: "#2563eb",
      },
      {
        name: { fi: "C# & .NET (WinForms)", en: "C# & .NET (WinForms)" },
        icon: faLaptopCode,
        color: "#512BD4",
      },
      { name: { fi: "PHP", en: "PHP" }, icon: faPhp, color: "#4f46e5" },
    ],
  },
  {
    title: {
      fi: "Tietokannat, Pilvipalvelut & Identiteetit",
      en: "Databases, Cloud & Identity",
    },
    items: [
      {
        name: { fi: "Supabase", en: "Supabase" },
        icon: faDatabase,
        color: "#3ECF8E",
      },
      {
        name: { fi: "SQL & MariaDB", en: "SQL & MariaDB" },
        icon: faDatabase,
        color: "#0284c7",
      },
      {
        name: { fi: "DNS-palvelut", en: "DNS Services" },
        icon: faGlobe,
        color: "#0891b2",
      },
      {
        name: { fi: "Microsoft Azure", en: "Microsoft Azure" },
        icon: faCloud,
        color: "#0284c7",
      },
      {
        name: {
          fi: "Active Directory & Entra ID",
          en: "Active Directory & Entra ID",
        },
        icon: faKey,
        color: "#0078D4",
      },
      {
        name: {
          fi: "Microsoft 365 -ympäristö",
          en: "Microsoft 365 Environment",
        },
        icon: faMicrosoft,
        color: "#0078D4",
      },
    ],
  },
  {
    title: {
      fi: "Verkot, Tietoturva & VPN",
      en: "Networking, Security & VPN",
    },
    items: [
      {
        name: {
          fi: "Tietoturvan perusteet",
          en: "Cybersecurity Fundamentals",
        },
        icon: faShieldHalved,
        color: "#16a34a",
      },
      {
        name: {
          fi: "Verkkoteknologiat (TCP/IP)",
          en: "Network Technologies (TCP/IP)",
        },
        icon: faNetworkWired,
        color: "#0284c7",
      },
      {
        name: {
          fi: "VPN & tunnelointiprotokollat",
          en: "VPN & Tunneling Protocols",
        },
        icon: faLock,
        color: "#4f46e5",
      },
      {
        name: {
          fi: "Salaus & varmuuskopiointi",
          en: "Encryption & Backups",
        },
        icon: faUserShield,
        color: "#dc2626",
      },
    ],
  },
  {
    title: {
      fi: "Käyttöjärjestelmät, Virtualisointi & Laitteet",
      en: "Operating Systems, Virtualization & Devices",
    },
    items: [
      {
        name: { fi: "Windows-infrastruktuuri", en: "Windows Infrastructure" },
        icon: faWindows,
        color: "#0284c7",
      },
      {
        name: { fi: "Linux & Komentorivi", en: "Linux & Terminal" },
        icon: faLinux,
        color: "#d97706",
      },
      {
        name: { fi: "macOS", en: "macOS" },
        icon: faApple,
        color: "#475569",
      },
      {
        name: { fi: "VMware & VirtualBox", en: "VMware & VirtualBox" },
        icon: faServer,
        color: "#0891b2",
      },
      {
        name: {
          fi: "Ohjelmistohallinta & käyttöönotto",
          en: "Software Management & Deployment",
        },
        icon: faBoxesStacked,
        color: "#6366f1",
      },
      {
        name: { fi: "iOS & Android -tuki", en: "iOS & Android Support" },
        icon: faMobileScreenButton,
        color: "#16a34a",
      },
      {
        name: {
          fi: "Laitteistodiagnostiikka & vianmääritys",
          en: "Hardware Diagnostics & Troubleshooting",
        },
        icon: faScrewdriverWrench,
        color: "#ea580c",
      },
    ],
  },
  {
    title: {
      fi: "Suunnittelu, Hallintapaneelit & Työkalut",
      en: "Design, Dashboards & Dev Tools",
    },
    items: [
      {
        name: { fi: "Sanity Headless CMS", en: "Sanity Headless CMS" },
        icon: faLayerGroup,
        color: "#F04336",
      },
      {
        name: { fi: "Räätälöidyt admin-paneelit", en: "Custom Admin Panels" },
        icon: faSliders,
        color: "#6366f1",
      },
      {
        name: { fi: "WordPress & Elementor", en: "WordPress & Elementor" },
        icon: faWordpress,
        color: "#0284c7",
      },
      {
        name: { fi: "Adobe Creative Cloud", en: "Adobe Creative Cloud" },
        icon: faPalette,
        color: "#dc2626",
      },
      {
        name: { fi: "Git & GitHub", en: "Git & GitHub" },
        icon: faGitAlt,
        color: "#ea580c",
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const Technologies = () => {
  const { lang = "fi" } = useLanguage() || {};
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sectionTitle =
    lang === "fi" ? "Teknologia- & Työkaluosaaminen" : "Technologies & Tools";

  return (
    <section className="py-12 px-4 mt-10" id="technologies">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-slate-800 mb-10 uppercase tracking-wide">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {techGroups.map((group, groupIdx) => {
            const isOpen = openIndex === groupIdx;

            return (
              <motion.div
                key={groupIdx}
                custom={groupIdx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-2xl bg-white/40 border border-white/60 shadow-sm backdrop-blur-md overflow-hidden"
              >
                <button
                  onClick={() => toggleDropdown(groupIdx)}
                  aria-expanded={isOpen}
                  className="w-full p-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:bg-white/30 transition-colors duration-200 cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-slate-800">
                    {group.title[lang] || group.title.fi}
                  </h3>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-slate-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-300/40">
                        <div className="flex flex-wrap gap-2.5 items-start">
                          {group.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-400 hover:shadow-md transition-all duration-200"
                            >
                              <FontAwesomeIcon
                                icon={item.icon}
                                className="text-base"
                                style={{ color: item.color }}
                              />
                              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                                {item.name[lang] || item.name.fi}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
