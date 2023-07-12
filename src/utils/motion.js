import { gsap, Power2 } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export function runAnimation() {
  const resetScrollPosition = () => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
    }, 100);
  };

  const boxes = gsap.utils.toArray('.box');
  const world = gsap.utils.toArray('.threedmodell');
  const socials = gsap.utils.toArray('#socials');
  const Wrapper = gsap.utils.toArray('.wrapper');
  const navigation = gsap.utils.toArray('.navigation');
  const contactcanvas = gsap.utils.toArray('#contactcanvas');

  
  boxes.forEach((box, i) => {
    const anim = gsap.fromTo(box, { autoAlpha: 0, y: 100 }, { duration: 1, autoAlpha: 1, y: 0 });
    ScrollTrigger.create({
      trigger: box,
      start: "top 80%",
      end: "top 10%",
      animation: anim,
      toggleActions: 'play reverse restart reverse',
    });
  });

  navigation.forEach((linie, i) => {
    const anim = gsap.fromTo(linie, { autoAlpha: 0, y: 100 }, { duration: 1, autoAlpha: 1, y: 0 });
    ScrollTrigger.create({
      trigger: linie,
      start: "top 100%",
      end: "top 50%",
      animation: anim,
      toggleActions: 'play reverse restart reverse',
    });
  });
  
  socials.forEach((social, i) => {
    const anim = gsap.fromTo(social, { autoAlpha: 0, x: -100 }, { duration: 1, autoAlpha: 1, x: 0 });
    ScrollTrigger.create({
      trigger: social,
      start: "top 80%",
      end: "top 30%",
      animation: anim,
      toggleActions: 'play reverse restart reverse',
    });
  });
  contactcanvas.forEach((canvas, i) => {
    const anim = gsap.fromTo(canvas, { autoAlpha: 0, x: -100 }, { duration: 1, autoAlpha: 1, x: 0 });
    ScrollTrigger.create({
      trigger: canvas,
      start: "top 80%",
      end: "top 0%",
      animation: anim,
      toggleActions: 'play reverse restart reverse',
    });
  });
  Wrapper.forEach((Wrapper, i) => {
    const anim = gsap.fromTo(Wrapper, { autoAlpha: 0, x: -100 }, { duration: 1, autoAlpha: 1, x: 0 });
    ScrollTrigger.create({
      trigger: Wrapper,
      start: "top 90%",
      end: "top 20%",
      animation: anim,
      toggleActions: 'play reverse restart reverse',
    });
  });

  world.forEach((element, i) => {
    const anim = gsap.fromTo(element, { autoAlpha: 0, x: 200 }, { duration: 1, autoAlpha: 1, x: 0 });
    ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      end: "top 30%",
      animation: anim,
      toggleActions: 'play none none reverse',
      once: true,
    });
  });
  

  const hero = document.querySelector('#hero-image');
  const slider = document.querySelector('.Slider');
  const logo = document.querySelector('#logo');
  const introduction = document.querySelector('#introduction');

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
    .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
    .fromTo(introduction, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");
}
