import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Academy from "./pages/Academy";
import Events from "./pages/Events";
import News from "./pages/News";
import Sponsors from "./pages/Sponsors";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
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
          <Route path="/events" element={<Events />} />
          <Route path="/news" element={<News />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}