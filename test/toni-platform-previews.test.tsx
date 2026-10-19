import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import PortfolioLanding from '@/portfolio/components/PortfolioLanding'
import { toniPlatformPreviews } from '@/portfolio/components/toniPlatformPreviews'
import { toniProjectPreviews } from '@/portfolio/components/toniProjectPreviews'
import { caseStudyProjects } from '@/portfolio/components/caseStudyProjects'

vi.mock('@/portfolio/compat', () => ({ Link: (props: ComponentProps<'a'>) => <a {...props} /> }))
vi.mock('@/portfolio/components/FlowingArtwork', () => ({ FlowingArtwork: () => null }))
beforeEach(() => vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }))
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('ToniPR project previews', () => {
  it('starts the selected-work carousel with the landing page while preserving the case-study cover', () => {
    render(<PortfolioLanding />)
    const gallery = screen.getByLabelText('ToniPR image slideshow')
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', '/tonipr/case-study/public-hero.png')
    expect(within(gallery).getByRole('link', { name: 'View ToniPR case study' })).toHaveAttribute('href', '/case-study/tonipr/')
    expect(caseStudyProjects.tonipr.image).toBe(toniPlatformPreviews[0].src)
  })

  it('includes the three Toni scroll-animation stills before the existing platform screens', () => {
    expect(toniProjectPreviews.slice(1, 4).map(preview => preview.src)).toEqual([
      '/tonipr/previews/landing-problem.jpg',
      '/tonipr/previews/landing-solution.jpg',
      '/tonipr/previews/landing-transformation.jpg',
    ])
    expect(toniProjectPreviews.slice(4)).toEqual(toniPlatformPreviews)
    for (const preview of toniProjectPreviews.slice(1, 4)) expect(preview.alt).toContain('scroll animation still')
  })

  it('navigates all seven actual design images without bringing back the marketing phone demo', () => {
    render(<PortfolioLanding />)
    const gallery = screen.getByLabelText('ToniPR image slideshow')
    expect(within(gallery).getAllByRole('button', { name: /Show ToniPR image/ })).toHaveLength(7)
    expect(gallery).toHaveClass('project-card-slideshow-expanded')
    for (let index = 0; index < toniProjectPreviews.length; index++) {
      const preview = toniProjectPreviews[index]
      fireEvent.click(within(gallery).getByRole('button', { name: `Show ToniPR image ${index + 1}` }))
      expect(within(gallery).getByRole('img')).toHaveAttribute('src', preview.src)
      expect(within(gallery).getByRole('img')).toHaveAccessibleName(preview.alt)
      expect(gallery.querySelector('.image-slideshow-count')).toHaveTextContent(`${index + 1} / 7`)
      expect(preview.src).not.toMatch(/project-tonipr|content-kit|demo-overview/)
      expect(existsSync(resolve('public', preview.src.slice(1)))).toBe(true)
    }
    fireEvent.click(within(gallery).getByRole('button', { name: 'Next ToniPR image' }))
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', toniProjectPreviews[0].src)
    fireEvent.click(within(gallery).getByRole('button', { name: 'Previous ToniPR image' }))
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', toniProjectPreviews[toniProjectPreviews.length - 1].src)
  })
})
