import project18 from "../images/project18.png";
import project17 from "../images/project17.png";
import project16 from "../images/project16.png";
import project15 from "../images/project15.png";
import project14 from "../images/project-photography.png";
import project13 from "../images/project13.png";
import project1 from "../images/project1.webp";
import project2 from "../images/project2.webp";
import project3 from "../images/project3.webp";
import project4 from "../images/project4.webp";
import project5 from "../images/project5.webp";
import project6 from "../images/project6.webp";
import project7 from "../images/project7.webp";
import project8 from "../images/project8.webp";
import project9 from "../images/project9.webp";
import project10 from "../images/project10.webp";
import project11 from "../images/project11.png";
import project12 from "../images/project12.png";
import project from "../images/project-main.png";
import project19 from "../images/project19.png";
import project20 from "../images/project20.png";
import project21 from "../images/project21.png";
import project22 from "../images/project22.png";
import project23 from "../images/project23.png";

export const projectsData = [
  {
    slug: "gyre-roulette",
    hasArticle: true,
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: project23,
    titleEn: "Gyre Roulette – Interactive Play-for-Fun Roulette",
    titleFi: "Gyre Roulette – Leikkimielinen interaktiivinen ruletti",
    descriptionEn:
      "A modern, interactive 15-slot browser roulette demo game built strictly for fun. Features provably fair randomness via CSPRNG Engine, synchronized audio-visual animations, and a responsive UI.",
    descriptionFi:
      "Moderni 15-paikkainen demo-ruletti puhtaasti leikkimieliseen viihde- ja testi-käyttöön. Sisältää todennettavasti satunnaisen CSPRNG-moottorin, ja responsiivisen käyttöliittymän.",
    github: "https://github.com/0xjulius/casino",
    live: "https://gyre-roulette.vercel.app",
    badgeEn: "NEW!",
    badgeFi: "UUSI!",
  },
  {
    slug: "duunify-mini-saas",
    hasArticle: true,
    tags: [
      "NextJS",
      "Tailwind",
      "SaaS",
      "Full-Stack",
      "Automation",
      "Typescript",
      "Gemini",
      "Supabase",
    ],
    image: project22,
    titleEn: "Duunify.com – Mini-SaaS | Smart Job Application Solution",
    titleFi: "Duunify.com – Mini-SaaS | Älykäs työnhakuratkaisu",
    descriptionEn:
      "A production-ready Mini-SaaS platform engineered for tracking job applications while eliminating Excel. Features user authentication, automated data from job links, and data-driven insights.",
    descriptionFi:
      "Tuotantovalmis Mini-SaaS-alusta työhakemusten seurantaan ilman Exceliä. Sisältää käyttäjätunnistautumisen, automaattisen datan haun työpaikkalinkeistä sekä visuaaliset tilastot.",
    github: "https://github.com/0xjulius/Duunify",
    live: "https://duunify.com",
    badgeEn: "NEW!",
    badgeFi: "UUSI!",
  },
  {
    slug: "atm-machine-react",
    hasArticle: true,
    tags: ["React", "Tailwind CSS", "JavaScript"],
    image: project21,
    titleEn: "ATM-machine - Simple react app with a retro vibe",
    titleFi: "Pankkiautomaatti - Retro-henkinen React-sovellus",
    descriptionEn:
      "A React-based ATM simulator with a 90s Finnish retro vibe, featuring 0-9 buttons, sound-effects and basic banking options. Built with React, Tailwind.",
    descriptionFi:
      "React-pohjainen pankkiautomaattisimulaattori 90-luvun suomalaisella retrofiliksellä. Sisältää näppäimistön, ääniefektit ja peruspankkitoiminnot.",
    github: "https://github.com/0xjulius/atm-machine-react",
    live: "https://atm-machine-0xjulius.vercel.app/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "podstation-podcast-app",
    hasArticle: true,
    tags: ["React", "Tailwind CSS", "API", "Serverless"],
    image: project19,
    titleEn: "The PodStation - Where podcasts come alive",
    titleFi: "The PodStation - Podcast-soitin verkkoselaimessa",
    descriptionEn:
      "A full stack, responsive, serverless custom API React app to browse, stream, and search podcast episodes via RSS. Built with React, Tailwind.",
    descriptionFi:
      "Full-stack-, serverless- ja React-sovellus podcast-jaksojen selaamiseen, kuunteluun ja hakuun RSS-syötteiden kautta.",
    github: "https://github.com/0xjulius/PodStation-save-and-listen",
    live: "https://podstation-0xjulius.vercel.app/",
  },
  {
    slug: "ylenews-feed",
    hasArticle: true,
    tags: ["React", "Tailwind CSS", "Axios", "XML/RSS"],
    image: project18,
    titleEn: "Yle Uutiset - News feed solution",
    titleFi: "Yle Uutiset - Uutissoitin ja lukija",
    descriptionEn:
      "React app that fetches Yle’s RSS feed via a proxy, converts XML to JSON, and displays news using Tailwind styles.",
    descriptionFi:
      "React-sovellus, joka hakee Ylen RSS-syötteen proxyn kautta, muuntaa XML-datan JSON-muotoon ja esittää uutiset tyylikkäästi.",
    github: "https://github.com/0xjulius/xml-to-json-axios-react",
    live: "https://xml2json-axios-react.vercel.app/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "weather-app-json-api",
    hasArticle: true,
    tags: ["React", "Vite", "Tailwind CSS", "REST API"],
    image: project17,
    titleEn: "Weather application JSON api-request fetcher",
    titleFi: "Sääsovellus JSON API -rajapintahauilla",
    descriptionEn:
      "Fetching and displaying JSON data from a weather API using React, styling UI with Tailwind, and setting up the project with Vite.",
    descriptionFi:
      "Säädatan hakeminen ja esittäminen REST API -rajapinnasta Reactilla, Vite-ympäristössä ja Tailwind CSS -tyyleillä.",
    github: "https://github.com/0xjulius/json-api-fetch-react",
    live: "https://json-api-fetch-react.vercel.app/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "python-atm-simulation",
    hasArticle: true,
    tags: ["Python", "CLI"],
    image: project20,
    titleEn: "Python ATM-Machine simulation",
    titleFi: "Python Pankkiautomaattisimulaattori",
    descriptionEn:
      "Python project simulating an ATM machine. Features include deposits, and withdrawals.",
    descriptionFi:
      "Pythonilla toteutettu pankkiautomaattisimulaattori. Ominaisuuksina muun muassa talletukset ja nostot komentonäkymässä.",
    github: "https://github.com/0xjulius/atm-machine",
    live: "",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "python-job-finder-telegram-bot",
    hasArticle: true,
    tags: ["Python", "Web Scraping", "Telegram Bot", "Automation"],
    image: project7,
    titleEn: "Python IT-job finder and Telegram bot",
    titleFi: "Python IT-työpaikka-botti & Telegram-ilmoitukset",
    descriptionEn:
      "Python Project which is scraping the web for the latest IT job postings all around Finland. It sends job alerts straight to your phone via Telegram!",
    descriptionFi:
      "Python-projekti, joka skrapaa verkosta Suomen uusimmat IT-työpaikkailmoitukset ja lähettää hälytykset suoraan puhelimeen Telegram-botilla!",
    github: "https://github.com/0xjulius/python-job-finder",
    live: "",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "shop-with-elon-usestate",
    hasArticle: true,
    tags: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    image: project15,
    titleEn: "Shop With Elon - Showcase useState on React",
    titleFi: "Shop With Elon - useState-tilanhallinnan harjoitus sovellus",
    descriptionEn:
      "Key learnings include using useState for state management, Tailwind CSS for styling, number formatting, and implementing a sticky header.",
    descriptionFi:
      "Hauska peli/harjoitus, jossa opittiin Reactin useState-tilanhallintaa, lukujen muotoilua sekä kiinteän navigaatiopalkin toteutusta.",
    github: "https://github.com/0xjulius/react-usestate-training",
    live: "https://usestate-training-livid.vercel.app/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "photography-gallery",
    hasArticle: true,
    tags: ["React", "Vite", "Tailwind CSS", "CSS Animations"],
    image: project14,
    titleEn: "Photography gallery website made with React",
    titleFi: "Valokuvausgalleria verkkosivusto Reactilla",
    descriptionEn:
      "Built showcasing my photography skills using React, Vite, Animations.css, and Tailwind. Responsive design and state management.",
    descriptionFi:
      "Valokuvausportfolioni, joka on toteutettu Reactilla, Vitellä ja Tailwindilla. Opetusti responssiivista suunnittelua ja komponenttien rakennetta.",
    github: "https://github.com/0xjulius/photography-gallery",
    live: "https://visionbyjulius.vercel.app/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "lumivaara-wordpress-php-plugin",
    tags: ["WordPress", "PHP", "MySQL", "CSS"],
    image: project6,
    titleEn: "Lumivaara.fi - WordPress Solution + PHP WP Plugin",
    titleFi: "Lumivaara.fi - WordPress-sivusto & PHP-lisäosa",
    descriptionEn:
      "Fully deployed WordPress solution with a custom PHP plugin that enables users to light virtual candles on the website.",
    descriptionFi:
      "Julkaistu WordPress-sivusto ja kustomoitu PHP-lisäosa, jonka avulla käyttäjät voivat sytyttää virtuaalisia muistokynttilöitä.",
    github: "https://github.com/0xjulius/light-a-candle-wp",
    live: "https://www.lumivaara.fi",
    badgeEn: "| My Bachelor’s Thesis",
    badgeFi: "| Opinnäytetyöni",
  },
  {
    slug: "cs2-rank-guesser-csharp",
    tags: ["C#", ".NET", "Desktop"],
    image: project12,
    titleEn: "CS2/CSGO-hour / rank guesser with C#",
    titleFi: "CS2 / CS:GO pelituntien ja arvon arvioija C#:lla",
    descriptionEn:
      "Guesses your Premier and FaceIt elo, and calculates your gaming hours.",
    descriptionFi:
      "Laskee ja arvioi pelituntiesi perusteella CS2 Premier- ja FaceIt-elo-arvosi.",
    github: "https://github.com/0xjulius/cs2-rank-guessr",
    live: "",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "old-wordpress-portfolio",
    tags: ["WordPress", "Elementor", "CMS"],
    image: project11,
    titleEn: "Old WordPress IT-portfolio",
    titleFi: "Aiempi WordPress IT-portfolio",
    descriptionEn:
      "My own customized portfolio with WordPress and Elementor. Site has been redone with React.",
    descriptionFi:
      "Aiempi kustomoitu portfolioni WordPressillä ja Elementorilla. Sivusto on myöhemmin rakennettu uudelleen Reactilla.",
    github: "",
    live: "https://juliusaalto.com",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "bmi-calculator-python",
    tags: ["Python", "CLI"],
    image: project10,
    titleEn: "BMI calculator with Python",
    titleFi: "Painoindeksilaskuri Pythonilla",
    descriptionEn:
      "Python tool designed to show your current BMI and estimate calorie burn during walking exercises.",
    descriptionFi:
      "Python-työkalu painoindeksin laskemiseen sekä kävelylenkkien kalorikulutuksen arvioimiseen.",
    github: "https://github.com/0xjulius/bmi_laskuri",
    live: "",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "lotto-generator-python",
    tags: ["Python", "CLI"],
    image: project9,
    titleEn: "Lotto number random generator with Python",
    titleFi: "Lottorivigeneraattori Pythonilla",
    descriptionEn:
      "Generating random numbers from 1-41 and sorting them, while deleting duplicates.",
    descriptionFi:
      "Satunnaisten lottonumeroiden (1–41) generointi, järjestäminen ja kaksoiskappaleiden poistaminen.",
    github: "https://github.com/0xjulius/python-lotto-generaattori",
    live: "",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "react-tailwind-it-portfolio",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    image: project,
    titleEn: "IT-Portfolio with React + Tailwind",
    titleFi: "IT-Portfolio Reactilla ja Tailwindilla",
    descriptionEn:
      "Project showcasing multiple React components with Tailwind. Modernized version of my old portfolio.",
    descriptionFi:
      "Tämä portfolio-sivusto! Rakennettu uudelleen Reactilla ja Tailwindilla moderneja web-kehitystaitoja hyödyntäen.",
    github: "https://github.com/0xjulius/react-portfolio",
    live: "https://react-portfolio-0xjulius.vercel.app/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "flappybird-night-version",
    tags: ["Unity", "C#", "C++", "WebGL"],
    image: project8,
    titleEn: "FlappyBird - Night version",
    titleFi: "FlappyBird - Yöversio peli",
    descriptionEn:
      "Made with Unity / C# / C++ / Photoshop. Exported to WebGL and Windows executable.",
    descriptionFi:
      "Toteutettu Unitylla, C#:lla ja Photoshopilla. Käännetty pelattavaksi selainversioon (WebGL) sekä Windows-sovellukseksi.",
    github: "https://github.com/0xjulius/FlappyBird",
    live: "https://0xjulius.github.io/FlappyBird/",
    badgeEn: "(school project)",
    badgeFi: "(Kouluprojekti)",
  },
  {
    slug: "rock-paper-scissors-csharp",
    tags: ["C#", ".NET", "Game Development"],
    image: project13,
    titleEn: "Rock Paper Scissors game with C#",
    titleFi: "Kivi sakset paperi -peli C#:lla",
    descriptionEn: "Small desktop game built with C# and Visual Studio.",
    descriptionFi:
      "Pieni työpöytäpeli toteutettuna C#:lla ja Visual Studiolla.",
    github: "https://github.com/0xjulius/kivipaperisakset-24",
    live: "",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "referral-website-concept",
    tags: ["HTML5", "CSS3", "Responsive Design"],
    image: project5,
    titleEn: "Referral website concept HTML & CSS only",
    titleFi: "Suosittelusivusto-konsepti pelkällä HTML/CSS:llä",
    descriptionEn:
      "Built with HTML5 and CSS only, optimized for mobile and tablet devices with media queries.",
    descriptionFi:
      "Pelkällä HTML5:llä ja CSS:llä toteutettu responssiivinen sivustokonsepti, joka toimii täydellisesti eri laitteilla.",
    github: "https://github.com/0xjulius/ref-site-concept",
    live: "https://0xjulius.github.io/ref-site-concept/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "banking-app-one-pager",
    tags: ["React", "Vite", "Tailwind CSS", "Tutorial"],
    image: project4,
    titleEn: "Banking app one-pager React + Vite + Tailwind",
    titleFi: "Pankkisovelluksen landing page React + Tailwind",
    descriptionEn:
      "Built with React, Vite, Tailwind CSS, and animations. Focus on layout and active states.",
    descriptionFi:
      "Yhden sivun pankkisovellusUI toteutettuna Reactilla, Vitellä ja Tailwindilla animaatioita hyödyntäen.",
    github: "https://github.com/julmezha/bank-app-react",
    live: "https://bank-app-react-one.vercel.app/",
    badgeEn: "(tutorial)",
    badgeFi: "(tutoriaali)",
  },
  {
    slug: "tesla-website-clone",
    tags: ["React", "Tailwind CSS", "Tutorial"],
    image: project3,
    titleEn: "Tesla website Clone with React & Tailwind",
    titleFi: "Tesla-verkkosivuston klooni Reactilla",
    descriptionEn:
      "Project showcasing hover effects, responsive sidebar, and clean Tailwind layout.",
    descriptionFi:
      "Projekti, jossa harjoiteltiin kuvalatauksia, leijutusefektejä, sivuvalikkoa ja puhdasta Tailwind-asettelua.",
    github: "https://github.com/julmezha/tesla-react-app-tailwind",
    live: "https://tesla-react-app-tailwind.vercel.app/",
    badgeEn: "Tutorial",
    badgeFi: "Tutoriaali",
  },
  {
    slug: "budget-calculator-js",
    tags: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
    image: project2,
    titleEn: "Budget Calculator with HTML, CSS & JS",
    titleFi: "Budjettilaskuri JavaScriptillä",
    descriptionEn:
      "Practical experience in DOM manipulation, event handling, and error handling in JavaScript.",
    descriptionFi:
      "Käytännön harjoitus DOM-manipulaatiosta, tapahtumankuuntelijoista ja virheenkäsittelystä JavaScriptillä.",
    github: "https://github.com/julmezha/budjettilaskuri",
    live: "https://0xjulius.github.io/budjettilaskuri/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "crypto-price-checker",
    tags: ["React", "Tailwind CSS", "REST API", "LocalStorage"],
    image: project1,
    titleEn: "Cryptocurrency price checker with React",
    titleFi: "Kryptovaluuttojen hinta-analysaattori Reactilla",
    descriptionEn:
      "Utilizes CoinGecko API to fetch real-time crypto prices with LocalStorage caching.",
    descriptionFi:
      "Hyödyntää CoinGecko API -rajapintaa kryptovaluuttojen reaalikuvaisten hintojen hakuun ja tallentaa ne paikallismuistiin.",
    github: "https://github.com/0xjulius/price-checker-crypto",
    live: "https://0xjulius.github.io/price-checker-crypto/",
    badgeEn: "",
    badgeFi: "",
  },
  {
    slug: "cs2-edpi-calculator-csharp",
    tags: ["C#", "WinForms", ".NET"],
    image: project16,
    titleEn: "CS2/esports mouse eDPI calculator with C#",
    titleFi: "CS2 eDPI-hiirilaskuri C#:lla",
    descriptionEn:
      "C# WinForms desktop app for calculating effective DPI (eDPI) for esports gaming.",
    descriptionFi:
      "C# WinForms -työpöytäsovellus eDPI-herkkyyden laskemiseen elektronisen urheilun ja CS2-pelin tarpeisiin.",
    github: "https://github.com/0xjulius/eDPI-Calculator",
    live: "",
    badgeEn: "",
    badgeFi: "",
  },
];

export const projects = projectsData;