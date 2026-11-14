import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Points,
  Group,
  AdditiveBlending,
  Vector3,
} from 'three'
import { SHAPES, rng } from './shapes.js'
import { SCENES } from './config.js'
import { vertexShader, fragmentShader } from './shaders.js'

const KEYS = ['x', 'y', 'scale', 'rotX', 'spin', 'opacity', 'noise', 'wave']
const FOV = 35
const CAM_Z = 10

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (t) => t * t * (3 - 2 * t)

function hexToVec3(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255)
}

/**
 * One fixed full-screen particle system that tells the story:
 * every section with data-scene="<key>" gets its own formation,
 * and scrolling between sections morphs one into the next.
 */
export function createParticleScene(canvas, { reducedMotion = false } = {}) {
  let renderer
  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    })
  } catch {
    return null
  }

  const sections = [...document.querySelectorAll('[data-scene]')]
  const configs = sections.map((el) => SCENES[el.dataset.scene] ?? SCENES.hero)
  if (!configs.length) configs.push(SCENES.hero)

  const small = Math.min(window.innerWidth, window.innerHeight) < 600
  const count = small ? 13000 : window.innerWidth < 1200 ? 20000 : 26000
  const rand = rng(2022)

  // Build every formation once.
  const cache = {}
  const shapes = configs.map((c) => {
    if (!cache[c.shape]) cache[c.shape] = SHAPES[c.shape](count, rand)
    return cache[c.shape]
  })

  const geometry = new BufferGeometry()
  const from = new BufferAttribute(new Float32Array(shapes[0]), 3)
  const to = new BufferAttribute(new Float32Array(shapes[Math.min(1, shapes.length - 1)]), 3)
  const randoms = new Float32Array(count * 4)
  for (let i = 0; i < count * 4; i++) randoms[i] = rand()
  geometry.setAttribute('position', from)
  geometry.setAttribute('aTo', to)
  geometry.setAttribute('aRand', new BufferAttribute(randoms, 4))

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uSwirl: { value: reducedMotion ? 0 : 0.85 },
    uNoise: { value: 0.05 },
    uWave: { value: 0 },
    uSize: { value: small ? 2.3 : 2.1 },
    uPixelRatio: { value: 1 },
    uOpacity: { value: 0 },
    uTwinkle: { value: reducedMotion ? 0 : 1 },
    uMouse: { value: { x: 99, y: 99 } },
    uMouseForce: { value: 0 },
    uColorLow: { value: hexToVec3('#8fe36a') },
    uColorHigh: { value: hexToVec3('#f1f7ea') },
  }

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  })

  const points = new Points(geometry, material)
  points.frustumCulled = false
  const group = new Group()
  group.add(points)
  const scene = new Scene()
  scene.add(group)
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100)
  camera.position.set(0, 0, CAM_Z)

  // ---- sizing -----------------------------------------------------------
  let width = 0
  let height = 0
  let halfH = Math.tan((FOV / 2) * (Math.PI / 180)) * CAM_Z
  let halfW = halfH
  let portrait = false
  let baseScale = 1

  function resize() {
    const w = window.innerWidth
    const h = window.innerHeight
    // Ignore tiny height changes from mobile browser chrome.
    if (w === width && Math.abs(h - height) < 120) return
    width = w
    height = h
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.6 : 1.8)
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h, false)
    uniforms.uPixelRatio.value = dpr * Math.min(1.25, Math.max(0.8, h / 900))
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    halfW = halfH * camera.aspect
    portrait = camera.aspect < 0.85
    baseScale = Math.min(1, Math.max(0.5, (halfW * 2) / 8.6))
  }
  resize()
  window.addEventListener('resize', resize)

  // ---- input --------------------------------------------------------------
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: 0, last: -10 }
  function onPointer(e) {
    if (e.pointerType === 'touch') return
    mouse.tx = (e.clientX / width) * 2 - 1
    mouse.ty = -((e.clientY / height) * 2 - 1)
    mouse.last = performance.now()
  }
  if (!reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true })

  // ---- scroll -> story progress -------------------------------------------
  function targetProgress() {
    const vh = window.innerHeight
    let p = 0
    for (let k = 1; k < sections.length; k++) {
      const top = sections[k].getBoundingClientRect().top
      p += clamp01((vh * 0.9 - top) / (vh * 0.75))
    }
    return p
  }

  let segment = 0
  function setSegment(i) {
    if (i === segment) return
    segment = i
    from.array.set(shapes[i])
    to.array.set(shapes[Math.min(i + 1, shapes.length - 1)])
    from.needsUpdate = true
    to.needsUpdate = true
  }

  function value(cfg, key) {
    if (portrait && cfg.m && key in cfg.m) return cfg.m[key]
    return cfg[key]
  }

  // ---- loop -----------------------------------------------------------------
  let progress = targetProgress()
  let spin = 0
  let intro = 0
  let last = performance.now()
  let started = false
  let resolveFirst
  const firstFrame = new Promise((r) => (resolveFirst = r))

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    const time = now / 1000

    const target = targetProgress()
    progress += (target - progress) * (1 - Math.exp(-dt * (reducedMotion ? 12 : 4.5)))
    if (Math.abs(target - progress) < 1e-4) progress = target

    const maxIndex = shapes.length - 1
    const i = Math.min(Math.floor(progress), maxIndex)
    const f = i >= maxIndex ? 0 : progress - i
    setSegment(i)

    const a = configs[i]
    const b = configs[Math.min(i + 1, maxIndex)]
    const e = smooth(f)
    const v = {}
    for (const k of KEYS) v[k] = lerp(value(a, k), value(b, k), e)

    if (started) intro = Math.min(1, intro + dt / (reducedMotion ? 0.3 : 2.2))
    const introE = 1 - Math.pow(1 - intro, 3)

    spin += v.spin * dt * (reducedMotion ? 0.25 : 1)
    group.position.set(v.x * halfW, v.y * halfH, 0)
    group.scale.setScalar(v.scale * baseScale * (0.6 + 0.4 * introE))
    group.rotation.set(v.rotX, spin + (1 - introE) * 1.2, 0)

    // mouse
    const idle = now - mouse.last > 2500
    mouse.active += ((idle ? 0 : 1) - mouse.active) * (1 - Math.exp(-dt * 3))
    mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 6))
    mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 6))
    uniforms.uMouse.value.x = mouse.x * halfW
    uniforms.uMouse.value.y = mouse.y * halfH
    uniforms.uMouseForce.value = mouse.active
    camera.position.x = mouse.x * 0.35
    camera.position.y = mouse.y * 0.25
    camera.lookAt(0, 0, 0)

    uniforms.uTime.value = reducedMotion ? 0 : time
    uniforms.uMorph.value = f
    uniforms.uNoise.value = v.noise
    uniforms.uWave.value = v.wave
    uniforms.uOpacity.value = v.opacity * introE

    renderer.render(scene, camera)
    if (resolveFirst) {
      resolveFirst()
      resolveFirst = null
    }
  }
  renderer.setAnimationLoop(frame)

  return {
    firstFrame,
    start() {
      started = true
    },
    dispose() {
      renderer.setAnimationLoop(null)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
}
