// One entry per story section (matched via data-scene="<key>").
// x / y are fractions of the visible half width / height, so the layout
// adapts to every aspect ratio. `m` overrides values on portrait screens.
export const SCENES = {
  hero: {
    shape: 'sphere',
    x: 0.42, y: 0.04, scale: 1, rotX: 0.15, spin: 0.09,
    opacity: 1, noise: 0.09, wave: 0,
    m: { x: 0, y: 0.36, opacity: 0.85 },
  },
  prolog: {
    shape: 'atom',
    x: 0.5, y: 0.02, scale: 0.92, rotX: 1.12, spin: 0.22,
    opacity: 0.85, noise: 0.025, wave: 0,
    m: { x: 0, y: 0.6, opacity: 0.3 },
  },
  anfang: {
    shape: 'lattice',
    x: 0.5, y: 0, scale: 0.95, rotX: 0.55, spin: 0.14,
    opacity: 0.9, noise: 0.015, wave: 0,
    m: { x: 0, y: 0.6, opacity: 0.32 },
  },
  version1: {
    shape: 'mountain',
    x: 0, y: -0.62, scale: 1.15, rotX: 0.32, spin: 0.045,
    opacity: 0.85, noise: 0.012, wave: 0,
    m: { y: -0.7, opacity: 0.55 },
  },
  projekte: {
    shape: 'wave',
    x: 0, y: -0.7, scale: 1.25, rotX: 0.42, spin: 0.02,
    opacity: 0.55, noise: 0.01, wave: 1,
    m: { y: -0.78, opacity: 0.4 },
  },
  abschluss: {
    shape: 'galaxy',
    x: 0, y: 0, scale: 1.15, rotX: 1.05, spin: 0.12,
    opacity: 0.9, noise: 0.02, wave: 0,
    m: { opacity: 0.6 },
  },
  heute: {
    shape: 'slabs',
    x: 0.5, y: -0.02, scale: 0.9, rotX: 0.55, spin: 0.16,
    opacity: 0.95, noise: 0.008, wave: 0,
    m: { x: 0, y: 0.62, opacity: 0.28 },
  },
  kontakt: {
    shape: 'ring',
    x: 0, y: 0.04, scale: 1.05, rotX: 1.32, spin: 0.12,
    opacity: 0.9, noise: 0.02, wave: 0,
    m: { y: 0.05, opacity: 0.5 },
  },
}
