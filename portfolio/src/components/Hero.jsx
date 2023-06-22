import "../styles/main.css";
import "../utils/motion.js";
import { useEffect } from "react";

const Hero = () => {

  useEffect(() => {
    setTimeout(() => {
      const sectionBefore = document.querySelector('.section');
      if (sectionBefore) {
        sectionBefore.classList.add('show-arrow');
      }
    }, 2000);
  }, []);
  
  window.addEventListener("scroll", () => {
    document.body.classList.add("scrolled");
  });
  
  return (
    <section id="Hero" className="section">
      <div id="hero-image">
      </div>
      <div id="tsparticles"></div>
      <div id="introduction" >
        <h2>welcome, I'm</h2>
        <h1>Mustafa Sagaaro</h1>
        <p>based in Zurich, Switzerland.</p>
      </div>
    </section>
  );
};

export default Hero;
