import React, { useEffect } from "react";
import "../styles/main.css";

const Hero = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
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

  return (
    <section id="Hero">
      <div id="tsparticles"></div>
      <div id="hero-image"></div>
      <div id="introduction" className="hidden">
        <h2>welcome, I'm</h2>
        <h1>Mustafa Sagaaro</h1>
        <p>based in Zurich, Switzerland.</p>
      </div>
    </section>


  );
};

export default Hero;
