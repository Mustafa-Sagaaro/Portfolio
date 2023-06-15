import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const About = () => {
  return (
<section id="About">
  <div id="Headlinerabout" className="hidden">
    <h1>About Me</h1>
    <p>introduction</p>
  </div>
  <div id="Mainabout">
    <div className="image-container">
      <img src="src/assets/Sagaaro_Mustafa.png" alt="" />
    </div>
    <div className="info-container">
      <div className="info-card">
        <h2>Experience</h2>
        <p>Apprenticeship as a Software engineer</p>
      </div>
      <div className="info-card">
        <h2>Projects</h2>
        <p>4 projects</p>
      </div>
      <div className="info-card">
        <h2>Availability</h2>
        <p>Available 24/7</p>
        <p>I am a recently in my first year as a Software engineer currently seeking opportunities to further develop within the field. I have experience in multiple projects and strive to gain more experience to continue my professional growth.</p>
      </div>
    </div>
  </div>
</section>


  );
};

export default About;
