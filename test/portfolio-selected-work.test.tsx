import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import PortfolioLanding from '@/portfolio/components/PortfolioLanding'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { caseStudyOrder, featuredCaseStudyOrder, type CaseStudySlug } from '@/portfolio/components/caseStudyProjects'

vi.mock('@/portfolio/compat', () => ({ Link: (props: ComponentProps<'a'>) => <a {...props} /> }))
vi.mock('@/portfolio/components/FlowingArtwork', () => ({ FlowingArtwork: () => null }))
beforeEach(() => vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }))
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('Featured portfolio projects', () => {
  it('restores HABITat as the seventh and final project without removing existing selected work', () => {
    const { container } = render(<PortfolioLanding />)
    const rows = [...container.querySelectorAll('.projects-list > article')]
    expect(rows.map(row => row.querySelector('.case-link')?.getAttribute('href'))).toEqual(
      featuredCaseStudyOrder.map(slug => `/case-study/${slug}/`)
    )
    expect(rows).toHaveLength(7)
    expect(rows.at(-1)).toHaveTextContent('07 / HABITat')
    expect(rows.at(-1)).toHaveTextContent('Mobile app concept')
    expect(within(rows.at(-1) as HTMLElement).getByRole('heading', { name: 'Small habits. A world worth growing.' })).toBeInTheDocument()
    expect(caseStudyOrder).toContain('spotify')
    expect(featuredCaseStudyOrder).not.toContain('spotify')
  })

  it('uses the original HABITat designs in an operable case-study slideshow', () => {
    render(<PortfolioLanding />)
    const gallery = screen.getByLabelText('HABITat image slideshow')
    const assets = ['/habitat/habitat-hero.png', '/habitat/home-screen.jpeg', '/habitat/shared-habits.jpeg']
    expect(within(gallery).getByRole('link', { name: 'View HABITat case study' })).toHaveAttribute('href', '/case-study/habitat/')
    for (const [index, asset] of assets.entries()) {
      fireEvent.click(within(gallery).getByRole('button', { name: `Show HABITat image ${index + 1}` }))
      expect(within(gallery).getByRole('img')).toHaveAttribute('src', asset)
      expect(existsSync(resolve('public', asset.slice(1)))).toBe(true)
    }
    fireEvent.click(within(gallery).getByRole('button', { name: 'Next HABITat image' }))
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', assets[0])
    fireEvent.click(within(gallery).getByRole('button', { name: 'Previous HABITat image' }))
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', assets[2])
  })

  it.each([['flowops', 'habitat'], ['habitat', 'crusoe']] as const)('takes %s to %s in the featured reading sequence', (slug: CaseStudySlug, next) => {
    const { container } = render(<CaseStudyExperience slug={slug}><p>Project story</p></CaseStudyExperience>)
    expect(container.querySelector('.study-next')).toHaveAttribute('href', `/case-study/${next}`)
    if (slug === 'habitat') expect(container.querySelector('.study-cover .study-eyebrow')).toHaveTextContent('selected work / 07')
  })
})
