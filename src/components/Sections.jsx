import { profile, facts, projects, principles, stack } from '../content.js'
import portrait from '../assets/img/portrait.webp'
import v1Hero from '../assets/img/v1-hero.webp'
import v1About from '../assets/img/v1-about.webp'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Meta({ no, when }) {
  return (
    <p className="meta" data-reveal>
      <span className="meta-no">Kapitel {no}</span>
      <span className="meta-line" aria-hidden="true" />
      <span className="meta-when">{when}</span>
    </p>
  )
}

function Browser({ src, alt, lazy = true }) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <img src={src} alt={alt} loading={lazy ? 'lazy' : 'eager'} decoding="async" width="1400" height="708" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top" data-scene="hero" data-hud="00" data-hud-title="Intro">
      <div className="container hero-inner">
        <p className="eyebrow hero-fade">
          <span className="eyebrow-dot" aria-hidden="true" />
          Software Entwickler · {profile.location}, CH
        </p>
        <h1 className="hero-title">
          <span className="hero-line">
            <span className="hero-word">{profile.first}</span>
          </span>
          <span className="hero-line">
            <span className="hero-word serif">{profile.last}</span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-lead hero-fade">
            Ich baue die Basis, auf der Software steht. Das hier ist meine Geschichte, vom ersten Tag der Lehre bis heute.
          </p>
          <a className="status hero-fade" href="#heute">
            <span className="status-pulse" aria-hidden="true" />
            Aktuell {profile.role} bei {profile.company}
          </a>
        </div>
      </div>
      <a className="scroll-cue hero-fade" href="#story" aria-label="Zur Geschichte scrollen">
        <span>Scroll</span>
        <span className="scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}

export function Prolog() {
  return (
    <section id="story" className="section prolog" data-scene="prolog" data-hud="00" data-hud-title="Prolog">
      <div className="container">
        <p className="label" data-reveal>
          Prolog
        </p>
        <p className="statement" data-scrub-words>
          Hi, ich bin Mustafa. 2022 hab ich meine Lehre als Informatiker angefangen. Heute schreibe ich Code, auf dem
          andere Entwickler aufbauen. Dazwischen liegen vier Jahre, viele Projekte und eine Menge Gelerntes.
        </p>
        <div className="prolog-grid">
          <figure className="portrait" data-reveal>
            <div className="portrait-glow" aria-hidden="true" />
            <img src={portrait} alt="Portrait von Mustafa Sagaaro" width="425" height="394" loading="lazy" />
          </figure>
          <dl className="facts">
            {facts.map(([k, v]) => (
              <div className="fact" key={k} data-reveal>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function Anfang() {
  return (
    <section id="anfang" className="section chapter" data-scene="anfang" data-hud="01" data-hud-title="2022 · Der Anfang">
      <span className="ghost" aria-hidden="true" data-parallax="18">
        2022
      </span>
      <div className="container chapter-grid">
        <div className="chapter-text">
          <Meta no="01" when="August 2022" />
          <h2 data-split>
            Der erste <em>Commit.</em>
          </h2>
          <p className="lead" data-reveal>
            Start der Lehre als Informatiker EFZ. Das erste Jahr: Basislehrjahr am ZLI in Zürich.
          </p>
          <p data-reveal>
            Grundlagen, Grundlagen, Grundlagen. Vom ersten HTML-Tag über CSS und JavaScript bis zur ersten eigenen
            Web-App. Jeden Tag ein Stück besser verstehen, wie Software unter der Haube funktioniert.
          </p>
          <ul className="chips" data-reveal>
            {['HTML', 'CSS', 'JavaScript', 'Git'].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Version1() {
  return (
    <section
      id="version-1"
      className="section chapter v1"
      data-scene="version1"
      data-hud="02"
      data-hud-title="2023 · Version 1"
    >
      <span className="ghost ghost-right" aria-hidden="true" data-parallax="18">
        2023
      </span>
      <div className="container chapter-grid v1-grid">
        <div className="chapter-text">
          <Meta no="02" when="Juni 2023" />
          <h2 data-split>
            Mein erstes <em>Portfolio.</em>
          </h2>
          <p className="lead" data-reveal>
            Abschlussprojekt am ZLI. Drei Wochen, ein Ziel: ein eigenes Portfolio mit React, Three.js und GSAP.
          </p>
          <p data-reveal>
            Ein Berg im Hero, eine Erde mit Hologramm, ein Camping-Modell beim Kontakt. Viel auf einmal, aber jedes Teil
            davon hab ich selbst gebaut. Die Seite, die du gerade anschaust, ist Version 2.
          </p>
          <p className="note" data-reveal>
            Der Berg ist übrigens geblieben.
          </p>
          <a className="text-link" href={profile.v1Code} {...ext} data-reveal>
            Code von Version 1 ansehen <Arrow />
          </a>
        </div>
        <div className="v1-shots">
          <figure className="shot shot-a" data-parallax="-6">
            <Browser src={v1Hero} alt="Startseite des ersten Portfolios von 2023 mit Bergbild" />
          </figure>
          <figure className="shot shot-b" data-parallax="8">
            <Browser src={v1About} alt="About-Seite des ersten Portfolios mit 3D-Erde" />
          </figure>
          <p className="shot-caption">v1 · 30.06.2023</p>
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section
      id="projekte"
      className="projects"
      data-scene="projekte"
      data-hud="03"
      data-hud-title="2023 bis 2026 · Lehrjahre"
    >
      <div className="projects-sticky">
        <div className="projects-track">
          <div className="projects-intro">
            <Meta no="03" when="2023 bis 2026" />
            <h2 data-split>
              Gebaut in der <em>Lehre.</em>
            </h2>
            <p className="lead" data-reveal>
              Schule, Betrieb, Kurse. Dazwischen sind Projekte entstanden, und jedes hat mir etwas anderes beigebracht.
            </p>
            <p className="projects-hint" aria-hidden="true">
              Weiter scrollen <span>→</span>
            </p>
          </div>
          {projects.map((p, i) => (
            <article className="project" key={p.title}>
              <a className="project-media" href={p.link} {...ext} aria-label={`${p.title} auf GitHub`}>
                <Browser src={p.image} alt={`Screenshot von ${p.title}`} />
              </a>
              <div className="project-body">
                <p className="project-top">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{p.kind}</span>
                </p>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <p className="learned">
                  <span>Gelernt</span>
                  {p.learned}
                </p>
                <div className="project-foot">
                  <ul className="chips chips-sm">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a className="text-link" href={p.link} {...ext}>
                    Code <Arrow />
                  </a>
                </div>
              </div>
            </article>
          ))}
          <a className="projects-more" href={profile.github} {...ext}>
            <span>Mehr auf</span>
            <strong>
              GitHub <Arrow />
            </strong>
          </a>
        </div>
        <div className="projects-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}

export function Abschluss() {
  return (
    <section id="abschluss" className="milestone" data-scene="abschluss" data-hud="04" data-hud-title="2026 · Abschluss">
      <div className="milestone-sticky">
        <div className="container milestone-inner">
          <p className="meta meta-center ms-fade">
            <span className="meta-no">Kapitel 04</span>
            <span className="meta-line" aria-hidden="true" />
            <span className="meta-when">Sommer 2026</span>
          </p>
          <h2 className="milestone-title">
            <span className="ms-line">Lehre</span>
            <span className="ms-line serif">abgeschlossen.</span>
          </h2>
          <p className="milestone-sub ms-fade">
            Vier Jahre. Informatiker EFZ. <br className="br-md" />
            Aus dem Lernenden wird ein Entwickler.
          </p>
        </div>
      </div>
    </section>
  )
}

export function Heute() {
  return (
    <section id="heute" className="section chapter today" data-scene="heute" data-hud="05" data-hud-title="Heute · Cistec">
      <span className="ghost" aria-hidden="true" data-parallax="18">
        Heute
      </span>
      <div className="container chapter-grid">
        <div className="chapter-text">
          <Meta no="05" when="Heute" />
          <h2 data-split>
            Basisentwickler bei <em>Cistec.</em>
          </h2>
          <p className="lead" data-reveal>
            Cistec entwickelt mit KISIM ein Klinikinformationssystem für Spitäler und Kliniken in der Schweiz. Software,
            auf die sich Ärztinnen, Pflegende und Patienten verlassen.
          </p>
          <p data-reveal>
            Als Basisentwickler arbeite ich am Fundament: an den Komponenten und Werkzeugen, auf denen andere Teams ihre
            Features bauen. Wenn alles läuft, merkt man meine Arbeit kaum. Genau so soll es sein.
          </p>
          <ul className="principles" aria-label="Wie ich arbeite">
            {principles.map(([title, text], i) => (
              <li className="principle" key={title} data-reveal>
                <span className="principle-no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Kontakt({ onCopy, copied }) {
  const year = new Date().getFullYear()
  return (
    <section id="kontakt" className="contact" data-scene="kontakt" data-hud="06" data-hud-title="Epilog · Kontakt">
      <div className="marquee" aria-label={`Tech Stack: ${stack.join(', ')}`}>
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((n) => (
            <div className="marquee-group" key={n}>
              {stack.map((s) => (
                <span key={s}>
                  {s}
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="container contact-inner">
        <p className="label label-center" data-reveal>
          Epilog · Das nächste Kapitel
        </p>
        <h2 className="contact-title" data-split>
          Lass uns was <em>bauen.</em>
        </h2>
        <p className="lead contact-lead" data-reveal>
          Ein Projekt, eine Frage oder einfach Hallo sagen? Mein Postfach ist offen.
        </p>
        <div className="mail-row" data-reveal>
          <a className="mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button type="button" className="copy" onClick={onCopy} aria-live="polite">
            {copied ? 'Kopiert ✓' : 'Kopieren'}
          </button>
        </div>
        <ul className="socials" data-reveal>
          <li>
            <a href={profile.github} {...ext}>
              GitHub <Arrow />
            </a>
          </li>
          <li>
            <a href={profile.linkedin} {...ext}>
              LinkedIn <Arrow />
            </a>
          </li>
        </ul>
      </div>
      <footer className="footer container">
        <span>© {year} Mustafa Sagaaro</span>
        <span className="footer-mid">Version 2 · React, Three.js & GSAP</span>
        <a href="#top">Nach oben ↑</a>
      </footer>
    </section>
  )
}
