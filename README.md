# Portfolio · Mustafa Sagaaro

Version 2 meines Portfolios. Eine Geschichte in fünf Kapiteln: vom ersten Tag der Lehre bis zum Basisentwickler bei Cistec.

Version 1 (Abschlussprojekt ZLI, Juni 2023) liegt im Git-Verlauf: Commit `3cef365`.

## Stack

- React 19 + Vite 8
- Three.js: ein einziges Partikelsystem (eigene Shader), das sich pro Kapitel in eine neue Form verwandelt
- GSAP (ScrollTrigger, SplitText) + Lenis für Smooth Scroll und Scroll-Storytelling
- Schriften selbst gehostet über Fontsource (Inter Tight, Instrument Serif, JetBrains Mono)

## Entwickeln

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Produktion nach dist/
npm run preview   # Build lokal anschauen
```

Node 20.19 oder neuer.

## Wo was liegt

| Datei | Inhalt |
| --- | --- |
| `src/content.js` | Alle Texte, Projekte, Links, Fakten. Hier wird die Story gepflegt. |
| `src/components/Sections.jsx` | Die Kapitel (Hero, Prolog, 2022, 2023, Projekte, Abschluss, Heute, Kontakt) |
| `src/scene/config.js` | Welche 3D-Form zu welchem Kapitel gehört, Position, Drehung, Deckkraft |
| `src/scene/shapes.js` | Die prozeduralen Formen (Kugel, Atom, Gitter, Berg, Welle, Galaxie, Fundament, Ring) |
| `src/scene/ParticleScene.js` | WebGL-Renderer, Scroll-zu-Morph-Logik, Maus-Interaktion |
| `src/lib/motion.js` | Loader, Intro, alle Scroll-Animationen |
| `src/styles.css` | Design-Tokens und Layout |

Ein neues Kapitel: Section mit `data-scene="<key>"` in `Sections.jsx` anlegen und den Key in `src/scene/config.js` eintragen. Die Reihenfolge im DOM bestimmt die Reihenfolge der Formen.

## Deploy

- **GitHub Pages**: jeder Push auf `main` baut und deployt über `.github/workflows/deploy.yml` nach https://mustafa-sagaaro.github.io/Portfolio/
- **Vercel**: falls mit dem Repo verbunden, baut es automatisch (`vercel.json`).
- **Docker**: `docker build -t portfolio . && docker run -p 5000:5000 portfolio`
