import React, { useState } from "react";
import "../styles/work.css";
import { Link } from "react-router-dom";

const Works = () => {
  const data = [
    {
      Auftrag: "My Work  ",
      description: "Klick next to see my previous Work",
      img: "src/assets/workswallpaper.png",
    },
    {
      Auftrag: "MeierMüller Auto Sales Web Design",
      description:
        "Developed a concept website for a hypothetical car sales company, exemplifying modern web design principles.",
      img: "src/assets/MeierMüller.png",
      link: "https://github.com/Mustafa-Sagaaro/ResponsiveWebseiteumsetzen",
    },
    {
      Auftrag: "Advanced Todo-List Web App",
      description:
        "Developed a robust To-Do List web application with comprehensive functionalities such as task creation, editing, and deletion during a course on integrating frontend with backend technologies.",
      img: "src/assets/frontend1.png",
      link: "https://github.com/Mustafa-Sagaaro/m294-lb-Mustafa_Sagaaro",
    },
    {
      Auftrag: "Recipe Fetch API Web Application",
      description:
        "Worked on a project focusing on API utilization. Successfully fetched and displayed cooking recipes from an external API. The project served as a practical exercise in API handling.",
      img: "src/assets/API.png",
      link: "https://github.com/Mustafa-Sagaaro/CodeWeekWebAnwendung",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    setIsContentVisible(true);
  };

  return (
    <section id="Works">
      <div className="container">
        <div id="WorkTitle" className="box">
          <h1>My Work</h1>
        </div>
        <div className={`content ${isContentVisible ? "visible" : ""}`}>
          <div className="introduce">
            {data.map((item, index) => (
              <div
                key={index}
                className={`wrapper ${index === currentIndex ? "active" : ""}`}
              >
                <span>
                  <h5 className="Auftrag" style={{ "--idx": "0" }}>
                    {item.Auftrag}
                  </h5>
                </span>
                <span>
                  <h5 className="description" style={{ "--idx": "1" }}>
                    {item.description}
                  </h5>
                </span>
                <span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="discover-button"
                    style={{ "--idx": "2" }}
                  >
                    Discover more
                  </a>
                </span>
              </div>
            ))}
          </div>
          <div className="thumbnail-list">
            <div className="wrapper">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    index === currentIndex ? "zoom" : ""
                  }`}
                  style={{ "--idx": index - 1 }}
                >
                  <img src={item.img} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="navigation">
          <button className="next-button" onClick={handleNextClick}>
            Next
          </button>
          <span className="line"></span>
          <span className="ordinal-number">
            {data.map((_item, index) => {
              const isActive = index === currentIndex;
              const ordinal = isActive ? currentIndex + 1 : index + 1;
              const formattedOrdinal = ordinal < 10 ? `0${ordinal}` : ordinal;

              return (
                <h2 key={index} className={isActive ? "active" : ""}>
                  {formattedOrdinal}
                </h2>
              );
            })}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Works;
