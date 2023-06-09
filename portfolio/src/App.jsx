import React from "react";
import Navbar from "./components/Navbar.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Experience from "./components/Experience.jsx";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import Tech from "./components/Tech.jsx";
import Background from "./components/Background.jsx";
import Rocket from "./components/Rocket.jsx"
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Rocket />
      <div id="layer2">
        <About />
      </div>
    </div>
  );
};

export default App;
