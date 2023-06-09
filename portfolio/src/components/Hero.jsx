import React, { useEffect } from "react";
import "../styles/main.css";

const Hero = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="Hero" className="hidden">
      <div id="introduction">
        <h2>welcome</h2>
        <h1>I'm Mustafa Sagaaro</h1>
        <p>based in Zurich, Switzerland.</p>
      </div>
    </section>
  );
};

export default Hero;


