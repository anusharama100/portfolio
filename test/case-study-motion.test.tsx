import { useRef } from 'react'
import { act, cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useCaseStudyMotion } from '@/portfolio/components/useCaseStudyMotion'

function MotionFixture() {
  const root = useRef<HTMLElement>(null)
  useCaseStudyMotion(root, 'example')
  return <main ref={root}><section className="crusoe-project-panel"><div className="crusoe-clean-heading">Always readable content</div></section></main>
}

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('Case-study scroll motion', () => {
  it('reveals an intersecting block once without hiding the waiting content', () => {
    let notify: IntersectionObserverCallback = () => {}
    const observe = vi.fn()
    const unobserve = vi.fn()
    const disconnect = vi.fn()
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback) { notify = callback }
      observe = observe
      unobserve = unobserve
      disconnect = disconnect
    })
    const { container, unmount } = render(<MotionFixture />)
    const block = container.querySelector('.crusoe-clean-heading')!
    expect(observe).toHaveBeenCalledWith(block)
    expect(block).not.toHaveAttribute('hidden')
    expect(block).not.toHaveAttribute('data-case-revealed')
    act(() => notify([{ target: block, isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver))
    expect(block).toHaveAttribute('data-case-revealed', 'true')
    expect(unobserve).toHaveBeenCalledWith(block)
    unmount()
    expect(disconnect).toHaveBeenCalled()
  })

  it('does not initialize motion when reduced motion is preferred', () => {
    const observer = vi.fn()
    vi.stubGlobal('IntersectionObserver', observer)
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    const { container } = render(<MotionFixture />)
    expect(observer).not.toHaveBeenCalled()
    expect(container.querySelector('.crusoe-clean-heading')).not.toHaveAttribute('data-case-revealed')
  })

  it('keeps content readable when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const { getByText } = render(<MotionFixture />)
    expect(getByText('Always readable content')).toBeVisible()
  })
})
