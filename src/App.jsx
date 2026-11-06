import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import LanguageToggle from "./components/LanguageToggle.jsx"; // <-- Tuodaan kielinappi
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Studies from "./components/Studies.jsx";
import Thesis from "./components/Thesis.jsx";
import Skills from "./components/Skills.jsx";
import Awards from "./components/Awards.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import Technologies from "./components/Technologies.jsx";
import Gallery from "./components/Gallery.jsx";
import ProjectsNew from "./components/ProjectsNew.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import VantaBackground from "./components/VantaBackground.jsx";
import BlogIndex from "./pages/Blogindex.jsx";

// Ohjaa vanhat /projects/<slug>-linkit uuteen /blog/<slug>-osoitteeseen
function RedirectToBlog() {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug}`} replace />;
}

// Pehmeä sivunvaihto Framer Motionilla:
// vanha sivu häivytetään pois, vieritetään ylös, ja uusi sivu häivytetään näkyviin.
// Vain opacity (ei transformia), jotta fixed/sticky-elementit eivät hypi animaation aikana.
function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      // Vieritys ylös vasta kun vanha sivu on kadonnut, jottei sisältö hypi kesken häivytyksen
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<ProjectDetail />} />

          {/* Vanhat osoitteet ohjataan uusiin */}
          <Route path="/projects/:slug" element={<RedirectToBlog />} />
          <Route
            path="/projects"
            element={<Navigate to="/#projects" replace />}
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

// Group your main portfolio sections into a single page component
function PortfolioHome() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <>
      <Header />
      <Home />
      <Navbar />
      <Technologies />
      <main>
        <Studies />
        <Thesis />
        <ProjectsNew />
        <Skills />
        <Gallery />
        <Awards />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Kielinappi sijoitettu tähän, jotta se toimii moitteettomasti kaikkien sivujen ja osioiden päällä */}
        <LanguageToggle />

        <VantaBackground />

        <AnimatedRoutes />

        <ScrollToTopButton />

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />
      </Router>
    </LanguageProvider>
  );
}

export default App;
