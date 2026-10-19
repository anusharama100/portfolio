import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ComponentProps } from 'react'
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ToniProductSlideshow, { toniProductSlides } from '@/portfolio/components/ToniProductSlideshow'
import ToniPRCaseStudy from '@/portfolio/pages/case-study-tonipr'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
  Image: (props: ComponentProps<'img'>) => <img {...props} />,
}))

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers() })

describe('ToniPR manual product slideshow', () => {
  it('shows one complete screen and its explanation at a time', () => {
    render(<ToniProductSlideshow />)
    const slideshow = screen.getByRole('region', { name: 'ToniPR interview setup slideshow' })
    expect(slideshow).toHaveAttribute('aria-roledescription', 'carousel')
    expect(within(slideshow).getAllByRole('img')).toHaveLength(1)
    const chooser = screen.getByRole('group', { name: 'Choose a ToniPR product screen' })
    for (const slide of toniProductSlides) {
      fireEvent.click(within(chooser).getByRole('button', { name: `Show ToniPR ${slide.label.toLowerCase()} screen` }))
      expect(within(slideshow).getByRole('img')).toHaveAttribute('src', slide.src)
      expect(within(slideshow).getByRole('img')).toHaveAccessibleName(slide.alt)
      expect(within(slideshow).getByRole('heading', { level: 4 })).toHaveTextContent(slide.title)
      expect(within(slideshow).getByText(slide.detail)).toBeInTheDocument()
      expect(within(slideshow).getByRole('link')).toHaveAttribute('href', slide.src)
      expect(within(slideshow).getByRole('link')).toHaveAttribute('target', '_blank')
      expect(existsSync(resolve('public', slide.src.slice(1)))).toBe(true)
    }
    expect(within(chooser).getAllByRole('button').filter(button => button.getAttribute('aria-pressed') === 'true')).toHaveLength(1)
  })

  it('supports previous, next, step selection, and keyboard arrows without moving the page', () => {
    const outerScroll = vi.spyOn(window, 'scrollTo')
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    render(<ToniProductSlideshow />)
    const slideshow = screen.getByRole('region', { name: 'ToniPR interview setup slideshow' })
    fireEvent.click(screen.getByRole('button', { name: 'Previous ToniPR product screen' }))
    expect(screen.getByRole('group', { name: '4 of 4: Recording' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next ToniPR product screen' }))
    expect(screen.getByRole('group', { name: '1 of 4: Dashboard' })).toBeInTheDocument()
    fireEvent.keyDown(slideshow, { key: 'ArrowRight' })
    expect(screen.getByRole('group', { name: '2 of 4: Focus' })).toBeInTheDocument()
    fireEvent.keyDown(slideshow, { key: 'ArrowLeft' })
    expect(screen.getByRole('group', { name: '1 of 4: Dashboard' })).toBeInTheDocument()
    expect(outerScroll).not.toHaveBeenCalled()
    expect(scrollIntoView).not.toHaveBeenCalled()
  })

  it('never advances automatically and contains no video', () => {
    vi.useFakeTimers()
    const { container } = render(<ToniProductSlideshow />)
    act(() => vi.advanceTimersByTime(60_000))
    expect(screen.getByRole('img')).toHaveAttribute('src', toniProductSlides[0].src)
    expect(container.querySelector('video,source,track')).toBeNull()
    const styles = readFileSync(resolve('portfolio/toni-product-slideshow.css'), 'utf8')
    expect(styles).toContain('object-fit: contain; object-position: center')
    expect(styles).toContain('grid-template-columns: repeat(2, minmax(0, 1fr))')
    expect(styles).toContain(':focus-visible')
  })

  it('replaces the scattered lower gallery but preserves the separate top scroll-through', () => {
    const { container } = render(<ToniPRCaseStudy />)
    expect(screen.getByRole('region', { name: 'ToniPR interview setup slideshow' })).toBeInTheDocument()
    expect(container.querySelector('.toni-signed-in-gallery')).toBeNull()
    expect(container.querySelector('#interview-design .toni-product-slideshow')).toBeInTheDocument()
    const route = readFileSync(resolve('app/case-study/tonipr/page.tsx'), 'utf8')
    expect(route).toContain('preview={<ToniDesignScrollThrough />}')
  })
})
