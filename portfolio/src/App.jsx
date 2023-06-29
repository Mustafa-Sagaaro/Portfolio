import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import Footer from "./components/Footer.jsx";
import Slider from "./components/Slider.jsx";
import { runAnimation } from "./utils/motion.js";
import "./styles/work.css";
import CircleLoader from "react-spinners/CircleLoader";




const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    if (!loading) {
      runAnimation();
    }
  }, [loading]);

  return (
    <div className="App">
      {loading ? (
        <div className="loader-container">
          <CircleLoader size={200} color={"#36d7b7"} loading={loading} />
          <p>Please wait for the Website to load...</p>
        </div>
      ) : (
        <React.Fragment>
          <Navbar />
          <Hero />
          <Slider />
          <About />
          <Works />
          <Contact />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
