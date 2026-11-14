import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function createSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return {
    lenis,
    destroy() {
      gsap.ticker.remove(tick)
      lenis.destroy()
    },
  }
}

/** Loader counter + curtain. Resolves when the page is revealed. */
export function playLoader(ready, reduced) {
  const loader = document.querySelector('.loader')
  if (!loader) return Promise.resolve()
  const num = loader.querySelector('.loader-num')
  return new Promise((resolve) => {
    if (reduced) {
      ready.then(() => {
        gsap.to(loader, { autoAlpha: 0, duration: 0.3, onComplete: () => (loader.remove(), resolve()) })
      })
      return
    }
    const counter = { v: 0 }
    const tl = gsap.timeline()
    tl.to(counter, {
      v: 82,
      duration: 0.9,
      ease: 'power2.inOut',
      onUpdate: () => (num.textContent = Math.round(counter.v)),
    })
    ready.then(() => {
      tl.to(counter, {
        v: 100,
        duration: 0.3,
        ease: 'power1.out',
        onUpdate: () => (num.textContent = Math.round(counter.v)),
      })
        .to('.loader-inner, .loader-line', { yPercent: -40, autoAlpha: 0, duration: 0.45, ease: 'power3.in' })
        .to(loader, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.85,
          ease: 'expo.inOut',
          onStart: resolve,
          onComplete: () => loader.remove(),
        })
    })
  })
}

export function heroIntro(reduced) {
  if (reduced) return
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.from('.hero-word', { yPercent: 115, rotate: 4, duration: 1.6, stagger: 0.12 }, 0.15)
    .from('.hero-fade', { y: 24, autoAlpha: 0, duration: 1.2, stagger: 0.08 }, 0.55)
    .from('.nav-bar > *', { y: -20, autoAlpha: 0, duration: 1, stagger: 0.06 }, 0.6)
    .from('.hud', { y: 20, autoAlpha: 0, duration: 1 }, 0.9)
}

/** All scroll-driven storytelling. Returns a cleanup function. */
export function initScrollStory(reduced) {
  const mm = gsap.matchMedia()
  const ctx = gsap.context(() => {

    // --- HUD + progress (always on) -------------------------------------
    const hudNo = document.querySelector('.hud-no')
    const hudTitle = document.querySelector('.hud-title')
    const hudFill = document.querySelector('.hud-line span')
    const sections = gsap.utils.toArray('[data-hud]')
    const setHud = (el) => {
      if (!hudNo) return
      const no = el.dataset.hud
      const title = el.dataset.hudTitle
      if (hudTitle.textContent === title) return
      hudNo.textContent = no
      hudTitle.textContent = title
      if (!reduced) gsap.fromTo([hudNo, hudTitle], { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' })
    }
    sections.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setHud(el),
        onUpdate: (self) => hudFill && gsap.set(hudFill, { scaleX: self.progress }),
      })
    })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set('.progress-bar', { scaleX: self.progress }),
    })
    ScrollTrigger.create({
      trigger: '.footer',
      start: 'top bottom-=40',
      onToggle: (self) => document.querySelector('.hud')?.classList.toggle('is-away', self.isActive),
    })

    // --- Nav: hide on scroll down, show on scroll up --------------------------
    const nav = document.querySelector('.nav')
    ScrollTrigger.create({
      start: 80,
      end: 'max',
      onUpdate: (self) => {
        if (nav.classList.contains('is-open')) return
        nav.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 200)
      },
      onToggle: (self) => nav.classList.toggle('is-scrolled', self.isActive),
    })

    if (reduced) return

    // --- Headlines: masked line reveal -----------------------------------------
    gsap.utils.toArray('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.09,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          }),
      })
    })

    // --- Simple reveals ----------------------------------------------------------
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 36,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })

    // --- Prolog statement: words light up while reading -------------------------
    gsap.utils.toArray('[data-scrub-words]').forEach((el) => {
      const split = SplitText.create(el, { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: true },
        },
      )
    })

    // --- Parallax --------------------------------------------------------------
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 10
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })

    // --- Hero fades out as the story begins --------------------------------------
    gsap.to('.hero-inner', {
      yPercent: -12,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 20%', scrub: true },
    })
    gsap.to('.scroll-cue', {
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '15% top', scrub: true },
    })

    // --- Milestone: the big moment ------------------------------------------------
    const ms = document.querySelector('.milestone')
    if (ms) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ms, start: 'top 75%', end: 'bottom bottom', scrub: 0.8 },
      })
      tl.from('.ms-line', { yPercent: 60, autoAlpha: 0, scale: 0.86, stagger: 0.15, duration: 0.5, ease: 'power2.out' })
        .from('.ms-fade', { y: 30, autoAlpha: 0, stagger: 0.1, duration: 0.35 }, '-=0.25')
        .to({}, { duration: 0.35 })
        .to('.milestone-inner', { scale: 0.94, autoAlpha: 0, duration: 0.3, ease: 'power1.in' })
    }

    // --- Projects: horizontal journey on large screens ----------------------------
    mm.add('(min-width: 1024px) and (min-height: 560px)', () => {
      const section = document.querySelector('.projects')
      const track = document.querySelector('.projects-track')
      const bar = document.querySelector('.projects-progress span')
      if (!section || !track) return
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
      const setHeight = () => {
        section.style.height = `${distance() + window.innerHeight * 1.15}px`
      }
      setHeight()
      ScrollTrigger.addEventListener('refreshInit', setHeight)

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
        },
      })
      gsap.utils.toArray('.project .browser img').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.18 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', setHeight)
        section.style.height = ''
        gsap.set(track, { clearProps: 'transform' })
      }
    })

    mm.add('(max-width: 1023px), (max-height: 559px)', () => {
      gsap.utils.toArray('.project').forEach((card) => {
        gsap.from(card, {
          y: 50,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
      })
    })
  })

  // Layout can change once images decode; keep triggers accurate.
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)

  return () => {
    window.removeEventListener('load', refresh)
    mm.revert()
    ctx.revert()
  }
}

export { gsap, ScrollTrigger }
