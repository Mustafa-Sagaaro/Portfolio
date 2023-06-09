import React, { useEffect, useState } from 'react';

const Rocket = () => {
  const [rocketPosition, setRocketPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setRocketPosition(scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <img
      src="../../src/assets/Rocket.png"
      alt=""
      style={{ transform: `translateY(${rocketPosition}px)` }}
    />
  );
};

export default Rocket;
