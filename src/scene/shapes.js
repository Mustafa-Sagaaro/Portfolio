// Procedural point clouds. Every shape returns `count` xyz triplets so the
// particle system can morph between any two of them.

export function rng(seed = 1) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const TAU = Math.PI * 2

// Small value noise for terrain generation.
function makeNoise2D(rand) {
  const size = 256
  const perm = new Uint8Array(size * 2)
  const vals = new Float32Array(size)
  for (let i = 0; i < size; i++) {
    perm[i] = i
    vals[i] = rand()
  }
  for (let i = size - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[perm[i], perm[j]] = [perm[j], perm[i]]
  }
  for (let i = 0; i < size; i++) perm[size + i] = perm[i]
  const fade = (t) => t * t * (3 - 2 * t)
  const v = (x, y) => vals[perm[(perm[x & 255] + y) & 255]]
  return (x, y) => {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const xf = fade(x - xi)
    const yf = fade(y - yi)
    const a = v(xi, yi)
    const b = v(xi + 1, yi)
    const c = v(xi, yi + 1)
    const d = v(xi + 1, yi + 1)
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf
  }
}

function gauss(rand) {
  return Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(TAU * rand())
}

// Hero: a living orb with a faint halo.
function sphere(count, rand) {
  const out = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const halo = rand() < 0.1
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    const R = halo ? 2.1 + rand() * 1.1 : 1.95 + gauss(rand) * 0.035
    out[i * 3] = Math.cos(th) * r * R
    out[i * 3 + 1] = y * R
    out[i * 3 + 2] = Math.sin(th) * r * R
  }
  return out
}

// Prolog: orbits around a core. Built flat-ish in the xz plane so the
// spin rotates it in place while the scene tilts it towards the camera.
function atom(count, rand) {
  const out = new Float32Array(count * 3)
  const tilts = [0.42, -0.42, 0.42]
  for (let i = 0; i < count; i++) {
    let x, y, z
    if (rand() < 0.16) {
      const u = rand() * 2 - 1
      const th = rand() * TAU
      const r = 0.42 * Math.cbrt(rand())
      const s = Math.sqrt(1 - u * u)
      x = Math.cos(th) * s * r
      y = u * r
      z = Math.sin(th) * s * r
    } else {
      const k = Math.floor(rand() * 3)
      const t = rand() * TAU
      const ex = Math.cos(t) * 2.5 + gauss(rand) * 0.03
      const eb = Math.sin(t) * 0.95 + gauss(rand) * 0.03
      const ly = eb * Math.sin(tilts[k]) + gauss(rand) * 0.03
      const lz = eb * Math.cos(tilts[k])
      const phi = (k * Math.PI) / 3
      const c = Math.cos(phi)
      const sn = Math.sin(phi)
      x = ex * c + lz * sn
      y = ly
      z = -ex * sn + lz * c
    }
    out[i * 3] = x
    out[i * 3 + 1] = y
    out[i * 3 + 2] = z
  }
  return out
}

// 2022: a lattice. Structure, basics, one cell at a time.
function lattice(count, rand) {
  const out = new Float32Array(count * 3)
  const div = 3
  const size = 3.1
  const h = size / 2
  const step = size / div
  const lines = []
  for (let axis = 0; axis < 3; axis++) {
    for (let a = 0; a <= div; a++) {
      for (let b = 0; b <= div; b++) lines.push([axis, -h + a * step, -h + b * step])
    }
  }
  for (let i = 0; i < count; i++) {
    const node = rand() < 0.12
    let p
    if (node) {
      const ix = Math.floor(rand() * (div + 1))
      const iy = Math.floor(rand() * (div + 1))
      const iz = Math.floor(rand() * (div + 1))
      p = [-h + ix * step, -h + iy * step, -h + iz * step].map((v) => v + gauss(rand) * 0.045)
    } else {
      const [axis, a, b] = lines[Math.floor(rand() * lines.length)]
      const t = -h + rand() * size
      p = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t]
      p = p.map((v) => v + gauss(rand) * 0.012)
    }
    out[i * 3] = p[0]
    out[i * 3 + 1] = p[1]
    out[i * 3 + 2] = p[2]
  }
  return out
}

// 2023: the mountain from the first portfolio, as a topographic scan.
function mountain(count, rand) {
  const out = new Float32Array(count * 3)
  const noise = makeNoise2D(rand)
  const fbm = (x, y) => {
    let s = 0
    let a = 0.5
    let f = 1
    for (let o = 0; o < 5; o++) {
      s += a * noise(x * f, y * f)
      f *= 2.03
      a *= 0.5
    }
    return s
  }
  const rows = 72
  const R = 4.6
  for (let i = 0; i < count; i++) {
    const row = Math.floor(rand() * rows)
    const z = -R + (row / (rows - 1)) * 2 * R
    const half = Math.sqrt(Math.max(0, R * R - z * z))
    const x = -half + rand() * 2 * half
    const dx = x + 0.3
    const dz = z + 0.2
    const peak = Math.exp(-(dx * dx + dz * dz * 1.4) / (2 * 1.25 * 1.25))
    const ridge = 1 - Math.abs(fbm(x * 0.55 + 4, z * 0.55 + 9) * 2 - 1)
    let y = peak * (2.5 + ridge * 0.9) + fbm(x * 0.8, z * 0.8) * 0.55
    const edge = Math.min(1, (R - Math.hypot(x, z)) / 1.2)
    y *= Math.max(0, edge)
    out[i * 3] = x
    out[i * 3 + 1] = y - 1.1
    out[i * 3 + 2] = z
  }
  return out
}

// Lehrjahre: a calm field. The shader animates it.
function wave(count, rand) {
  const out = new Float32Array(count * 3)
  const R = 5.2
  const rows = 64
  for (let i = 0; i < count; i++) {
    const row = Math.floor(rand() * rows)
    const z = -R + (row / (rows - 1)) * 2 * R
    const half = Math.sqrt(Math.max(0, R * R - z * z))
    const x = -half + rand() * 2 * half
    out[i * 3] = x
    out[i * 3 + 1] = 0
    out[i * 3 + 2] = z
  }
  return out
}

// 2026: the horizon opens up.
function galaxy(count, rand) {
  const out = new Float32Array(count * 3)
  const arms = 3
  for (let i = 0; i < count; i++) {
    const r = Math.pow(rand(), 1.6) * 3.7 + 0.08
    const arm = (i % arms) * (TAU / arms)
    const spin = r * 1.25
    const spread = Math.pow(rand(), 3) * 0.6 * (0.4 + r * 0.35)
    const a = arm + spin
    out[i * 3] = Math.cos(a) * r + gauss(rand) * spread
    out[i * 3 + 1] = gauss(rand) * 0.07 * (1.3 - r / 3.7)
    out[i * 3 + 2] = Math.sin(a) * r + gauss(rand) * spread
  }
  return out
}

// Heute: the foundation. Stacked layers, the widest one at the bottom.
function slabs(count, rand) {
  const out = new Float32Array(count * 3)
  const layers = [
    { y: -1.45, w: 3.5 },
    { y: -0.6, w: 2.8 },
    { y: 0.25, w: 2.15 },
    { y: 1.1, w: 1.5 },
  ]
  const weights = [0.38, 0.27, 0.2, 0.15]
  for (let i = 0; i < count; i++) {
    let pick = rand()
    let li = 0
    while (li < 3 && pick > weights[li]) {
      pick -= weights[li]
      li++
    }
    const { y, w } = layers[li]
    const h = w / 2
    const thick = 0.16
    const mode = rand()
    let x
    let z
    let py = y
    if (mode < 0.55) {
      // crisp outline on the top and bottom edges
      const side = Math.floor(rand() * 4)
      const t = -h + rand() * w
      ;[x, z] = side === 0 ? [t, -h] : side === 1 ? [t, h] : side === 2 ? [-h, t] : [h, t]
      py = y + (rand() < 0.5 ? thick : 0)
    } else if (mode < 0.68) {
      // vertical corners
      const cx = rand() < 0.5 ? -h : h
      const cz = rand() < 0.5 ? -h : h
      x = cx
      z = cz
      py = y + rand() * thick
    } else {
      // surface grid dots
      const n = 9
      x = -h + (Math.floor(rand() * (n + 1)) / n) * w + gauss(rand) * 0.015
      z = -h + (Math.floor(rand() * (n + 1)) / n) * w + gauss(rand) * 0.015
      py = y + thick
    }
    out[i * 3] = x + gauss(rand) * 0.008
    out[i * 3 + 1] = py
    out[i * 3 + 2] = z + gauss(rand) * 0.008
  }
  return out
}

// Epilog: a ring (in the xz plane, tilted towards the camera by the scene).
function ring(count, rand) {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const a = rand() * TAU
    const inner = rand() < 0.82
    const R = inner ? 2.35 + gauss(rand) * 0.05 : 2.35 + gauss(rand) * 0.45
    const tube = inner ? 0.05 : 0.25
    out[i * 3] = Math.cos(a) * R + gauss(rand) * tube * 0.4
    out[i * 3 + 1] = gauss(rand) * tube
    out[i * 3 + 2] = Math.sin(a) * R + gauss(rand) * tube * 0.4
  }
  return out
}

export const SHAPES = { sphere, atom, lattice, mountain, wave, galaxy, slabs, ring }
