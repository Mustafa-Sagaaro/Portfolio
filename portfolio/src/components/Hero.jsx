import "../styles/main.css";
import "../utils/motion.js";
import { useEffect } from "react";


const Hero = () => {


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
  
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));
  
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
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
    <section id="Hero">
      <div id="tsparticles"></div>
      <div id="hero-image"></div>
      <div id="introduction" className="hidden">
        <h2>welcome, I'm</h2>
        <h1>Mustafa Sagaaro</h1>
        <p>based in Zurich, Switzerland.</p>
      </div>
      <div className="section"></div>
    </section>
  );
};

export default Hero;
