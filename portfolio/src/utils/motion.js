// Start Animation Slider

import { gsap, Power2 } from 'gsap';

const resetScrollPosition = () => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
    }, 100);
  };
  

const runAnimation = () => {
  const hero = document.querySelector('#hero-image');
  const slider = document.querySelector('.Slider');
  const logo = document.querySelector('#logo');
  const headline = document.querySelector('#introduction');

  document.body.style.overflow = 'hidden';

  resetScrollPosition();

  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = 'auto';
    },
  });

  tl.fromTo(hero, 0.85, { height: "0%" }, { height: "70%", ease: Power2.easeInOut })
    .fromTo(hero, 1.2, { width: "100%" }, { width: "70%", ease: Power2.easeInOut })
    .fromTo(slider, 1.2, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut }, "-=1.2")
    .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");
};

window.addEventListener('load', runAnimation);
