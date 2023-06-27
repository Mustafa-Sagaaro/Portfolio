import React from "react";
import Navbar from "./components/Navbar.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Experience from "./components/Experience.jsx";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import Tech from "./components/Tech.jsx";
import Background from "./components/Background.jsx";
import Footer from "./components/Footer.jsx";
import Slider from "./components/Slider.jsx";
import './utils/motion.js'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Slider />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
