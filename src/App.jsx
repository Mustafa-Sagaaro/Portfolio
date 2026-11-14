import { useEffect, useRef, useState } from 'react'
import { Nav, Hud, Loader } from './components/Chrome.jsx'
import { Hero, Prolog, Anfang, Version1, Projects, Abschluss, Heute, Kontakt } from './components/Sections.jsx'
import { createParticleScene } from './scene/ParticleScene.js'
import {
  createSmoothScroll,
  heroIntro,
  initScrollStory,
  playLoader,
  prefersReducedMotion,
  ScrollTrigger,
} from './lib/motion.js'
import { profile } from './content.js'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export default function App() {
  const canvasRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const html = document.documentElement
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (!location.hash) window.scrollTo(0, 0)

    const smooth = reduced ? null : createSmoothScroll()
    smooth?.lenis.stop()

    const scene = createParticleScene(canvasRef.current, { reducedMotion: reduced })
    if (!scene) html.classList.add('no-webgl')

    let cleanupStory = () => {}
    let cancelled = false

    const fonts = document.fonts?.ready ?? Promise.resolve()
    const ready = Promise.all([
      fonts,
      Promise.race([scene?.firstFrame ?? Promise.resolve(), wait(2500)]),
    ]).then(() => {
      if (cancelled) return
      cleanupStory = initScrollStory(reduced)
      ScrollTrigger.refresh()
    })

    playLoader(ready, reduced).then(() => {
      if (cancelled) return
      html.classList.remove('is-loading')
      smooth?.lenis.start()
      scene?.start()
      heroIntro(reduced)
      if (location.hash) {
        const target = document.querySelector(location.hash)
        if (target) smooth ? smooth.lenis.scrollTo(target, { immediate: true }) : target.scrollIntoView()
      }
    })

    return () => {
      cancelled = true
      cleanupStory()
      scene?.dispose()
      smooth?.destroy()
    }
  }, [])

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <>
      <Loader />
      <canvas ref={canvasRef} className="webgl" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#story">
        Zum Inhalt springen
      </a>
      <Nav />
      <Hud />
      <main>
        <Hero />
        <Prolog />
        <Anfang />
        <Version1 />
        <Projects />
        <Abschluss />
        <Heute />
        <Kontakt onCopy={copyMail} copied={copied} />
      </main>
    </>
  )
}
