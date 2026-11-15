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
  it('curates four primary projects and three supporting concepts, with HABITat last', () => {
    const { container } = render(<PortfolioLanding />)
    const primary = [...container.querySelectorAll('.projects-list > article')]
    const supporting = [...container.querySelectorAll('.supporting-work-grid > article')]
    expect(primary).toHaveLength(4)
    expect(supporting).toHaveLength(3)
    expect([...primary, ...supporting].map(row => row.querySelector('.case-link')?.getAttribute('href'))).toEqual(featuredCaseStudyOrder.map(slug => `/case-study/${slug}/`))
    expect(supporting.at(-1)).toHaveTextContent('07 / HABITat')
    expect(featuredCaseStudyOrder).not.toContain('flowops')
    expect(caseStudyOrder).toContain('flowops')
    expect(screen.getByRole('link', { name: 'Try the workspace' })).toHaveAttribute('href', '/lab/trace/')
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

  it.each([['crusoe', 'trace'], ['habitat', 'crusoe']] as const)('takes %s to %s in the featured reading sequence', (slug: CaseStudySlug, next) => {
    const { container } = render(<CaseStudyExperience slug={slug}><p>Project story</p></CaseStudyExperience>)
    expect(container.querySelector('.study-next')).toHaveAttribute('href', `/case-study/${next}`)
    if (slug === 'habitat') expect(container.querySelector('.study-cover .study-eyebrow')).toHaveTextContent('selected work / 07')
  })
})
