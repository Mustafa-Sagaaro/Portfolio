import { useState } from 'react'

const links = [
  ['#story', 'Story'],
  ['#projekte', 'Projekte'],
  ['#heute', 'Heute'],
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={`nav${open ? ' is-open' : ''}`}>
      <div className="nav-bar">
        <a className="brand" href="#top" onClick={close} aria-label="Mustafa Sagaaro, zum Anfang">
          <span className="brand-mark" aria-hidden="true">
            MS
          </span>
          <span className="brand-name">Mustafa Sagaaro</span>
        </a>
        <nav className="nav-links" aria-label="Hauptnavigation">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a className="nav-cta" href="#kontakt">
            Kontakt
          </a>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-label">{open ? 'Schliessen' : 'Menü'}</span>
          <span className="menu-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
      <div className="mobile-menu" id="mobile-menu" aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile Navigation">
          {[...links, ['#kontakt', 'Kontakt']].map(([href, label], i) => (
            <a key={href} href={href} onClick={close} style={{ '--i': i }}>
              <span>0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export function Hud() {
  return (
    <>
      <div className="progress" aria-hidden="true">
        <span className="progress-bar" />
      </div>
      <div className="hud" aria-hidden="true">
        <span className="hud-no">00</span>
        <span className="hud-line">
          <span />
        </span>
        <span className="hud-title">Intro</span>
      </div>
    </>
  )
}

export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        <span className="loader-mark">MS</span>
        <span className="loader-count">
          <span className="loader-num">0</span>%
        </span>
      </div>
      <p className="loader-line">Eine Geschichte in fünf Kapiteln</p>
    </div>
  )
}
