import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Academy from "./pages/Academy.jsx";
import Contact from "./pages/Contact.jsx";
import Events from "./pages/Events.jsx";
import News from "./pages/News.jsx";
import Sponsors from "./pages/Sponsors.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="logo-background" aria-hidden="true">
        <img src="/coffee-land-logo.jpeg" alt="" className="logo-bg logo-bg-center" />
        <img src="/coffee-land-logo.jpeg" alt="" className="logo-bg logo-bg-corner logo-bg-corner-tl" />
        <img src="/coffee-land-logo.jpeg" alt="" className="logo-bg logo-bg-corner logo-bg-corner-br" />
      </div>
      <div id="bg-particles"></div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/sponsors" element={<Sponsors />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}