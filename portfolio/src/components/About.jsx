import React, { useEffect, useRef } from "react";
import { Hologram } from "./Hologram";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber'

const About = () => {
  return (
    <section id="About">
      <div className="about-content">
        <h1 id="Aboutheader" className="box">About Me</h1>
        <img
          className="profile-image"
          src="src/assets/Sagaaro_Mustafa.png"
          alt="Sagaaro Mustafa"
        />
        <div className="about-text">
          <div className="textleft">
            <h1 className="box">
              I am <span id="nameTitle"> Mustafa Sagaaro</span>
            </h1>
            <p className="box">
              Welcome to my profile! My name is Sagaaro Mustafa and I'm a
              passionate developer with a love for front-end development and
              design. I specialize in creating engaging and interactive web
              applications using the latest technologies.
            </p>
            <p className="box">
              With several years of experience in the industry, I have gained
              expertise in HTML, CSS, JavaScript, and React.js. I enjoy working
              on challenging projects and finding creative solutions to
              problems. I strive to deliver high-quality code and exceptional
              user experiences.
            </p>
          </div>
        </div>
        <ul id="socials">
          <li>
            <a href="https://github.com/Mustafa-Sagaaro">
              <i className="fa fa-github" aria-hidden="true"></i>
              <span> - Github</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/mustafa-sagaaro-26166827a/">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
              <span> - Linkedin</span>
            </a>
          </li>
          <li>
            <a href="mailto:sagaaromustafa@gmail.com">
              <i className="fa fa-google" aria-hidden="true"></i>
              <span> - Mail</span>
            </a>
          </li>
        </ul>
      </div>
      <div
        className="threedmodell"
        style={{ position: "relative", width: "100%", height: "100vh" }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "63%",
            right: 0,
            width: "55%",
            height: "100%",
          }}
          id="canvasback"
        >
          <Canvas style={{ width: "100%", height: "100%", zIndex: "100" }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Hologram scale={[2.2, 2.2, 2.2]} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default About;
