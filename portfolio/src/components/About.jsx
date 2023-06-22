import React, { useEffect, useRef } from "react";

const About = () => {
  return (
    <div id="About">
      <div className="about-content">
        <img
          className="profile-image"
          src="src/assets/Sagaaro_Mustafa.png"
          alt="Sagaaro Mustafa"
        />
        <h1 id="Aboutheader">About Me</h1>
        <div className="about-text">
          <div className="textleft">
            <p>
              Welcome to my profile! My name is Sagaaro Mustafa and I'm a
              passionate developer with a love for front-end development and
              design. I specialize in creating engaging and interactive web
              applications using the latest technologies.
            </p>
            <p>
              With several years of experience in the industry, I have gained
              expertise in HTML, CSS, JavaScript, and React.js. I enjoy working
              on challenging projects and finding creative solutions to
              problems. I strive to deliver high-quality code and exceptional
              user experiences.
            </p>
          </div>
          <div className="textright">
            <p>
              Apart from coding, I also have a keen interest in graphic design
              and UI/UX. I believe that a well-designed user interface can
              greatly enhance the overall user experience and engagement.
            </p>
            <p>
              If you have an exciting project or collaboration opportunity, feel
              free to get in touch with me. I'm always open to new challenges
              and ready to bring innovative ideas to life.
            </p>
          </div>
        </div>

          <ul>
            <li>
              <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class="fa fa-facebook"></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class="fa fa-twitter"></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class="fa fa-instagram"></span>
              </a>
            </li>
            <li>
              <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class="fa fa-linkedin"></span>
              </a>
            </li>
          </ul>
      </div>
    </div>
  );
};

export default About;
