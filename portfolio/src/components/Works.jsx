import React, { useState } from "react";
import "../styles/work.css";

const Works = () => {
  const data = [
    {
      Auftrag: "My Work  ",
      description: "Klick next to see my previous Work",
      img: "",
    },
    {
      Auftrag: "Lorem Ipsum 1",
      description: "Lorem ipsum dolor sit amet 1",
      img: "https://plus.unsplash.com/premium_photo-1669316982093-b2ed20cc82ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1197&q=80",
    },
    {
      Auftrag: "Lorem Ipsum 2",
      description: "Lorem ipsum dolor sit amet 2",
      img: "https://images.unsplash.com/photo-1682687220499-d9c06b872eee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
      Auftrag: "Lorem Ipsum 3",
      description: "Lorem ipsum dolor sit amet 3",
      img: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
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
                  <button className="discover-button" style={{ "--idx": "2" }}>
                    Discover Now
                  </button>
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
