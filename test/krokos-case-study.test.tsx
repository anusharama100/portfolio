import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import KrokosCaseStudy, { KrokosHomepageComparison } from '@/portfolio/pages/case-study-krokos'
import { caseStudyOrder, caseStudyProjects } from '@/portfolio/components/caseStudyProjects'
import { krokosDesignPreviews } from '@/portfolio/components/krokosDesignEvidence'
import PortfolioLanding from '@/portfolio/components/PortfolioLanding'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
}))
vi.mock('@/portfolio/components/FlowingArtwork', () => ({ FlowingArtwork: () => null }))

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('Krokos Bio case study', () => {
  it('keeps the four brand colors and their purpose labels together in the palette', () => {
    render(<KrokosCaseStudy />)
    const palette = screen.getByRole('list', { name: 'Colors used in the redesign' })
    const colors = within(palette).getAllByRole('listitem')
    expect(colors).toHaveLength(4)
    for (const [index, [name, purpose]] of [
      ['Botanical olive', 'Structure & contrast'],
      ['Warm cream', 'Reading surfaces'],
      ['Terracotta', 'Organic accents'],
      ['Saffron', 'Botanical warmth'],
    ].entries()) {
      expect(colors[index]).toHaveTextContent(name)
      expect(within(colors[index]).getByText(purpose)).toBeInTheDocument()
      expect(colors[index].querySelector('.krokos-swatch')).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('preserves space between the reading path and its natural-aspect evidence', () => {
    const { container } = render(<KrokosCaseStudy />)
    const path = screen.getByRole('list', { name: 'The redesigned website’s reading path' })
    const overview = container.querySelector('.krokos-landing-flow')!
    expect(path.nextElementSibling).toBe(overview)
    expect(path.children).toHaveLength(5)
    expect(overview.querySelector('img')).toHaveAttribute('width', '1600')
    expect(overview.querySelector('img')).toHaveAttribute('height', '1000')
    const styles = readFileSync(resolve('portfolio/krokos-case-study.css'), 'utf8')
    // The former high-specificity figure reset silently erased this margin.
    expect(styles).toContain('.krokos-case :where(figure)')
    expect(styles).not.toContain('.krokos-case figure {')
    expect(styles).toContain('margin: var(--krokos-block-space) auto 0')
    expect(styles).toContain('--krokos-block-space: clamp(40px, 4vw, 64px)')
    expect(styles).not.toContain('grid-template-columns: repeat(5,')
  })

  it('shows archived evidence before the redesigned homepage, without automatic scrolling', () => {
    const scroll = vi.spyOn(window, 'scrollTo')
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    const { container } = render(<KrokosHomepageComparison />)
    expect(screen.getByRole('button', { name: '01 Original site' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('region', { name: 'Original site page captures' }).querySelectorAll('img')).toHaveLength(7)
    expect(container.querySelector('video')).toBeNull()
    expect(screen.getByRole('link', { name: 'Open original site opening capture' })).toHaveAttribute('href', '/krokos/original-home.jpg')

    fireEvent.click(screen.getByRole('button', { name: '02 Redesign' }))
    expect(screen.getByRole('region', { name: 'Redesign page captures' }).querySelector('img')).toHaveAttribute('src', '/krokos/redesign-landing-full.jpg')
    expect(screen.getByRole('link', { name: 'Open redesign full-page capture' })).toHaveAttribute('href', '/krokos/redesign-landing-full.jpg')
    expect(screen.getByRole('button', { name: '02 Redesign' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('status')).toHaveTextContent('Showing redesign.')
    expect(screen.getByText('A clearer invitation into the company’s story.')).toBeInTheDocument()
    expect(scroll).not.toHaveBeenCalled()
    expect(scrollIntoView).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: '01 Original site' }))
    expect(screen.getByRole('region', { name: 'Original site page captures' })).toBeInTheDocument()
    expect(container.querySelector('video')).toBeNull()
  })

  it('distinguishes published delivery from prototype-only motion and unmeasured results', () => {
    render(<KrokosCaseStudy />)
    expect(screen.getByRole('list', { name: 'The redesigned website’s reading path' }).children).toHaveLength(5)
    expect(screen.getByText(/prototype explorations—not a claim about the published site/)).toBeInTheDocument()
    expect(screen.getByText(/no conversion lift is claimed/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Explore the live website/ })).toHaveAttribute('href', 'https://krokos.bio/')
    expect(screen.getByRole('link', { name: /View the Press page/ })).toHaveAttribute('href', 'https://krokos.bio/press')
  })

  it('uses bundled image assets and participates in the selected-work sequence', () => {
    const { container } = render(<KrokosCaseStudy />)
    const assets = [...container.querySelectorAll('img')].map(image => image.getAttribute('src')!)
    assets.push(...krokosDesignPreviews.map(image => image.src), caseStudyProjects.krokos.image)
    for (const asset of assets) expect(existsSync(resolve('public', asset.slice(1))), asset).toBe(true)
    expect(caseStudyOrder.indexOf('krokos')).toBe(caseStudyOrder.indexOf('crusoe') + 1)
    expect(caseStudyProjects.krokos.meta).toContainEqual(['Platform', 'Squarespace'])
    expect(caseStudyProjects.krokos.meta).toContainEqual(['Tools', 'Figma, Claude Code, Lovable'])
  })

  it('replaces standalone artwork with actual approach, Press, and landing-flow design evidence', () => {
    const { container } = render(<KrokosCaseStudy />)
    expect(container.querySelector('img[src*="botanical-hero"]')).toBeNull()
    expect(container.querySelector('img[src*="plant-cultures"]')).toBeNull()
    expect(container.querySelector('img[src*="process-plant"]')).toBeNull()
    expect(screen.getByRole('img', { name: /Published Krokos approach section/ })).toHaveAttribute('src', '/krokos/redesign-approach.jpg')
    expect(screen.getByRole('img', { name: /Published Krokos Press page coverage/ })).toHaveAttribute('src', '/krokos/redesign-press-coverage.jpg')
    expect(screen.getByRole('img', { name: /Six actual website sections/ })).toHaveAttribute('width', '1600')
    expect(screen.getByRole('link', { name: 'Open the complete Press-page design' })).toHaveAttribute('href', '/krokos/redesign-press-full.jpg')

    expect(screen.queryByText('Explore the complete landing-page design')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '02 Redesign' }))
    const preview = screen.getByRole('region', { name: 'Redesign page captures' })
    expect(preview).toHaveAttribute('tabindex', '0')
    expect(within(preview).getByRole('img')).toHaveAttribute('height', '8259')
    expect(container.querySelectorAll('img[src="/krokos/redesign-landing-full.jpg"]')).toHaveLength(1)
    expect(container.querySelector('video')).toBeNull()
  })

  it('shows homepage, Press, and flow screenshots in the landing-page carousel', () => {
    vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} })
    render(<PortfolioLanding />)
    const slideshow = screen.getByLabelText('Krokos Bio image slideshow')
    for (let index = 0; index < krokosDesignPreviews.length; index++) {
      fireEvent.click(within(slideshow).getByRole('button', { name: `Show Krokos Bio image ${index + 1}` }))
      expect(within(slideshow).getByRole('img')).toHaveAttribute('src', krokosDesignPreviews[index].src)
      expect(within(slideshow).getByRole('img')).toHaveAccessibleName(krokosDesignPreviews[index].alt)
    }
    expect(krokosDesignPreviews.map(image => image.src)).toEqual([
      '/krokos/redesign-home-screen.jpg', '/krokos/redesign-press-coverage.jpg', '/krokos/redesign-landing-flow.jpg',
    ])
  })
})
