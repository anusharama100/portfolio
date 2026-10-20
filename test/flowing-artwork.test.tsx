import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FlowingArtwork } from '@/portfolio/components/FlowingArtwork'

let images: TestImage[]
let frames: Map<number, FrameRequestCallback>
let sequence: number
let resize: ResizeObserverCallback
let intersect: IntersectionObserverCallback
let preference: () => void
let hidden: boolean
let reduced: boolean
let context: Record<string, ReturnType<typeof vi.fn>>

class TestImage {
  width = 1920
  height = 1024
  src = ''
  decoding = ''
  onload: null | (() => Promise<void>) = null
  decode = vi.fn().mockResolvedValue(undefined)
  constructor() { images.push(this) }
}

function fixture() {
  return render(<div><img className="hero-art" src="/wave.jpg" alt="" /><FlowingArtwork src="/wave.jpg" /></div>)
}

async function load() {
  await act(async () => { await images[images.length - 1].onload?.() })
}

function advance(time: number) {
  act(() => {
    const pending = [...frames.values()]
    frames.clear()
    pending.forEach(callback => callback(time))
  })
}

function baseFrame() {
  return context.drawImage.mock.calls.filter(args => args.length === 5).at(-1)!.slice(1)
}

beforeEach(() => {
  images = []
  frames = new Map()
  sequence = 0
  hidden = reduced = false
  context = Object.fromEntries(['clearRect', 'drawImage', 'save', 'beginPath', 'moveTo', 'lineTo', 'closePath', 'clip', 'transform', 'restore', 'setTransform'].map(name => [name, vi.fn()]))
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as unknown as CanvasRenderingContext2D)
  vi.spyOn(HTMLCanvasElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 1200, height: 800, left: 0, top: 0 } as DOMRect)
  vi.spyOn(window, 'getComputedStyle').mockReturnValue({ objectPosition: '58% 50%' } as CSSStyleDeclaration)
  vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden)
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    get matches() { return reduced },
    addEventListener: (_: string, listener: () => void) => { preference = listener },
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList)
  vi.stubGlobal('Image', TestImage)
  vi.stubGlobal('requestAnimationFrame', vi.fn((callback: FrameRequestCallback) => { frames.set(++sequence, callback); return sequence }))
  vi.stubGlobal('cancelAnimationFrame', vi.fn((id: number) => { frames.delete(id) }))
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: ResizeObserverCallback) { resize = callback }
    observe() {}
    disconnect() {}
  })
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback }
    observe() {}
    disconnect() {}
  })
})

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('Flowing artwork startup and continuity', () => {
  it('decodes before revealing a first frame with the exact responsive still-image crop', async () => {
    const { container } = fixture()
    const canvas = container.querySelector('canvas')!
    let resolveDecode!: () => void
    images[0].decode.mockReturnValue(new Promise<void>(resolve => { resolveDecode = resolve }))
    let loading!: Promise<void>
    act(() => { loading = images[0].onload!() })
    expect(canvas).not.toHaveClass('artwork-ready')
    expect(frames.size).toBe(0)
    await act(async () => { resolveDecode(); await loading })
    expect(baseFrame()).toEqual([-174, 0, 1500, 800])
    expect(context.transform).not.toHaveBeenCalled()
    expect(canvas).toHaveClass('artwork-ready')
    expect(frames.size).toBe(1)
  })

  it('starts at zero regardless of page uptime and draws on consecutive display frames', async () => {
    fixture()
    await load()
    const still = baseFrame()
    advance(90000)
    expect(baseFrame()).toEqual(still)
    advance(90016.67)
    advance(90033.34)
    expect(context.clearRect).toHaveBeenCalledTimes(4)
    expect(baseFrame()[2]).toBeGreaterThan(still[2])
    expect(baseFrame()[2] - still[2]).toBeLessThan(1)
    expect(frames.size).toBe(1)
  })

  it('does not clear or redraw the bitmap for an unchanged resize notification', async () => {
    fixture()
    await load()
    act(() => resize([], {} as ResizeObserver))
    expect(context.clearRect).toHaveBeenCalledTimes(1)
    expect(context.setTransform).toHaveBeenCalledTimes(1)
  })

  it('pauses offscreen and in background tabs, resuming at the same wave position', async () => {
    fixture()
    await load()
    advance(1000)
    advance(1016.67)
    const beforePause = baseFrame()
    act(() => intersect([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver))
    expect(frames.size).toBe(0)
    act(() => intersect([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver))
    advance(200000)
    expect(baseFrame()).toEqual(beforePause)
    hidden = true
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    expect(frames.size).toBe(0)
    hidden = false
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    advance(400000)
    expect(baseFrame()).toEqual(beforePause)
  })

  it('caps a delayed frame instead of skipping ahead in the wave', async () => {
    fixture()
    await load()
    advance(1000)
    advance(2000)
    expect(baseFrame()[2] - 1500).toBeLessThan(1)
  })

  it('keeps reduced motion static and can safely restart motion without duplicate loops', async () => {
    reduced = true
    fixture()
    await load()
    expect(frames.size).toBe(0)
    expect(baseFrame()).toEqual([-174, 0, 1500, 800])
    reduced = false
    act(() => preference())
    expect(frames.size).toBe(1)
    act(() => preference())
    expect(frames.size).toBe(1)
    reduced = true
    act(() => preference())
    expect(frames.size).toBe(0)
    expect(baseFrame()).toEqual([-174, 0, 1500, 800])
  })

  it('does not reveal or schedule stale artwork if image decoding finishes after unmount', async () => {
    const { container, unmount } = fixture()
    const canvas = container.querySelector('canvas')!
    let resolveDecode!: () => void
    images[0].decode.mockReturnValue(new Promise<void>(resolve => { resolveDecode = resolve }))
    const loading = images[0].onload!()
    unmount()
    await act(async () => { resolveDecode(); await loading })
    expect(canvas).not.toHaveClass('artwork-ready')
    expect(frames.size).toBe(0)
    expect(context.drawImage).not.toHaveBeenCalled()
  })
})
