import React from 'react';
import Navbar from './components/Navbar.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Experience from './components/Experience.jsx';
import Hero from './components/Hero.jsx';
import Works from './components/Works.jsx';
import Tech from './components/Tech.jsx';
import Background from './components/Background.jsx';

const App = () => {
  return (
      <div>
        <div>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div>
          <Contact />
          <Background />
        </div>
      </div>
  );
};


export default App;
