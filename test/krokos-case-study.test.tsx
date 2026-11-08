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
  it('shows actual mobile homepage, navigation, and Press captures without removing desktop evidence', () => {
    const { container } = render(<KrokosCaseStudy />)
    const mobile = screen.getByRole('region', { name: 'The same story, on a smaller screen.' })
    expect(mobile.querySelectorAll('figure')).toHaveLength(3)
    for (const [id, title, height] of [['homepage', 'homepage', '13635'], ['navigation', 'navigation', '844'], ['press', 'press page', '2652']]) {
      const image = within(mobile).getByRole('img', { name: `Published Krokos ${title} at phone width` })
      expect(image).toHaveAttribute('src', `/krokos/mobile/${id}.png`)
      expect(image).toHaveAttribute('width', '390')
      expect(image).toHaveAttribute('height', height)
      expect(within(mobile).getByRole('link', { name: `Open mobile ${title} capture at full size` })).toHaveAttribute('href', `/krokos/mobile/${id}.png`)
    }
    for (const label of ['Mobile homepage capture', 'Mobile press page capture']) {
      const preview = within(mobile).getByRole('region', { name: label })
      expect(preview).toHaveAttribute('tabindex', '0')
      expect(preview).toHaveAttribute('aria-describedby', 'krokos-mobile-help')
    }
    expect(mobile.querySelector('video')).toBeNull()
    expect(screen.getByRole('button', { name: '01 Original site' })).toBeInTheDocument()
    expect(container.querySelector('img[src="/krokos/redesign-landing-flow.jpg"]')).toBeInTheDocument()
    expect(mobile.compareDocumentPosition(document.getElementById('krokos-delivery')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('presents all five questions as one numbered reading sequence with their design rationale', () => {
    render(<KrokosCaseStudy />)
    const path = screen.getByRole('list', { name: 'The redesigned website’s reading path' })
    expect(path.tagName).toBe('OL')
    const stages = within(path).getAllByRole('listitem')
    const questions = [
      ['The need', 'Why should sourcing botanicals change?', 'Start with the supply-chain problem, not a technical definition.'],
      ['The mechanism', 'How does plant cell culture work?', 'Move from a familiar plant to the science behind production.'],
      ['The application', 'What is Krokos building first?', 'Make the platform tangible through its initial saffron focus.'],
      ['The credibility', 'Who is behind the work?', 'Connect the story to the team and independent press coverage.'],
      ['The next step', 'How can I learn more or connect?', 'Keep contact and newsletter paths easy to find.'],
    ]
    expect(stages).toHaveLength(5)
    for (const [index, [label, question, rationale]] of questions.entries()) {
      expect(stages[index].querySelector('.krokos-reading-step')).toHaveTextContent(`0${index + 1}`)
      expect(stages[index].querySelector('.krokos-reading-step')).toHaveAttribute('aria-hidden', 'true')
      expect(within(stages[index]).getByText(label).parentElement).toHaveClass('krokos-reading-question')
      expect(within(stages[index]).getByRole('heading', { level: 3, name: question })).toBeInTheDocument()
      expect(within(stages[index]).getByText(rationale)).toBeInTheDocument()
    }
    expect(within(path).queryByRole('button')).not.toBeInTheDocument()
    expect(within(path).queryByRole('link')).not.toBeInTheDocument()
  })

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
    expect(screen.getByRole('region', { name: 'Original site page captures' }).querySelectorAll('img')).toHaveLength(9)
    expect(container.querySelector('video')).toBeNull()
    expect(screen.getByRole('link', { name: 'Open original site opening capture' })).toHaveAttribute('href', '/krokos/original-sections/opening.jpg')

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
