import type { ComponentProps } from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { collectStudySections } from '@/portfolio/components/caseStudySections'
import { caseStudyOrder } from '@/portfolio/components/caseStudyProjects'

vi.mock('@/portfolio/compat', () => ({ Link: (props: ComponentProps<'a'>) => <a {...props} /> }))
afterEach(cleanup)

describe('Case study section navigation', () => {
  it('uses a purple NeuraNote backdrop while preserving its product preview', () => {
    const { container } = render(<CaseStudyExperience slug="neuranote"><p>Project story</p></CaseStudyExperience>)
    expect(container.firstElementChild).toHaveClass('study-tone-purple')
    expect(container.firstElementChild).not.toHaveClass('study-tone-green')
    expect(container.querySelector('.study-product-stage img')).toHaveAttribute('src', '/landing/project-neuranote.png')
  })

  it('reuses the landing-page rainbow as a decorative background confined to the introduction', () => {
    const { container } = render(<CaseStudyExperience slug="crusoe"><p>Project story</p></CaseStudyExperience>)
    const artwork = container.querySelector('.study-intro-art')!
    expect(artwork).toHaveAttribute('aria-hidden', 'true')
    expect(artwork.querySelector('img')).toHaveAttribute('src', '/landing/editorial-flow.jpg')
    expect(artwork.querySelector('img')).toHaveAttribute('alt', '')
    expect(container.querySelector('.study-intro .study-header')).toBeNull()
    expect(container.querySelector('.study-intro .study-cover')).toBeInTheDocument()
    expect(container.querySelector('.study-original-content .study-intro-art')).toBeNull()
  })

  it.each(caseStudyOrder)('opens %s without the portfolio header and retains navigation in the footer', slug => {
    const { container } = render(<CaseStudyExperience slug={slug}>
      <section className="legacy-case-section" id="overview"><h2 className="legacy-section-title">Overview</h2></section>
      <section className="legacy-case-section" id="research"><h2 className="legacy-section-title">Research</h2></section>
    </CaseStudyExperience>)
    expect(screen.queryByRole('navigation', { name: 'Case study sections' })).not.toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'Jump to section' })).not.toBeInTheDocument()
    expect(container.querySelector('.study-chapters, .study-progress, .study-reading-track')).toBeNull()
    expect(screen.queryByRole('navigation', { name: 'Portfolio navigation' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Back to selected work' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Anusha Ramachandran, home' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '← All selected work' })).toHaveAttribute('href', '/#projects')
    expect(screen.getByRole('heading', { name: 'Research' })).toBeInTheDocument()
    expect(screen.queryByText('In this story')).not.toBeInTheDocument()
  })

  it('uses real subsections of the selected Crusoe project and excludes closed or hidden content', () => {
    const root = document.createElement('div')
    root.innerHTML = `<section class="crusoe-case-section crusoe-project-panel" id="selected-project">
      <h2>Console empty states</h2>
      <section class="crusoe-clean-section" aria-labelledby="audit-title"><div class="crusoe-clean-heading"><span>02 · Audit</span><h3 id="audit-title">A long explanatory heading</h3></div></section>
      <section class="crusoe-clean-section"><div class="crusoe-clean-heading"><span>05 · V1</span></div></section>
    </section>
    <details><section class="crusoe-case-section"><h2>Shared process</h2></section></details>
    <section class="legacy-case-section" hidden><h2>Other project</h2></section>`
    const sections = collectStudySections(root, 'crusoe')
    expect(sections.map(section => section.title)).toEqual(['Project overview', 'Audit', 'V1: first release'])
    expect(sections[1].id).toBe('audit-title-section')
    expect(collectStudySections(root, 'crusoe').map(section => section.id)).toEqual(sections.map(section => section.id))
  })
})
