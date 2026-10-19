import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ComponentProps } from 'react'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ToniDesignScrollThrough, { toniDesignGroups } from '@/portfolio/components/ToniDesignScrollThrough'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import ToniPRCaseStudy from '@/portfolio/pages/case-study-tonipr'
import { caseStudyProjects } from '@/portfolio/components/caseStudyProjects'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
  Image: ({ sizes, ...props }: ComponentProps<'img'>) => <img sizes={sizes} {...props} />,
}))
afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('ToniPR reader-controlled design preview', () => {
  it('replaces video and timestamps with a keyboard-scrollable frame', () => {
    const scroll = vi.spyOn(window, 'scrollTo')
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    const { container } = render(<ToniDesignScrollThrough />)
    const frame = screen.getByRole('region', { name: 'ToniPR design screens' })
    expect(frame).toHaveAttribute('tabindex', '0')
    expect(frame).toHaveAccessibleDescription(/Scroll inside the frame.*arrow keys/)
    expect(container.querySelector('video,source,track,iframe')).toBeNull()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText('The experience in 28 seconds.')).not.toBeInTheDocument()
    expect(scroll).not.toHaveBeenCalled()
    expect(scrollIntoView).not.toHaveBeenCalled()
  })

  it('keeps complete, labeled captures in landing-page then product-flow order', () => {
    render(<ToniDesignScrollThrough />)
    expect(screen.getAllByRole('region').map(region => region.getAttribute('aria-label') || region.getAttribute('aria-labelledby'))).toEqual([
      'ToniPR design screens', 'toni-scroll-landing', 'toni-scroll-product',
    ])
    for (const group of toniDesignGroups) {
      const captures = screen.getByRole('list', { name: `${group.title} captures` })
      expect(within(captures).getAllByRole('listitem')).toHaveLength(5)
      expect([...captures.querySelectorAll('figcaption')].map(caption => caption.textContent)).toEqual(
        group.screens.map((image, index) => `${String(index + 1).padStart(2, '0')} ${image.title}`),
      )
      for (const image of group.screens) {
        const img = within(captures).getByRole('img', { name: image.alt })
        expect(img).toHaveAttribute('src', image.src)
        expect(img).toHaveAttribute('width', String(image.width))
        expect(img).toHaveAttribute('height', String(image.height))
        expect(existsSync(resolve('public', image.src.slice(1))), image.src).toBe(true)
      }
    }
  })

  it('identifies separate static captures and the public output demo accurately', () => {
    render(<ToniDesignScrollThrough />)
    expect(screen.getByText(/not a continuous full-page screenshot/)).toBeInTheDocument()
    expect(screen.getByText(/pictured controls and animations are not interactive/)).toBeInTheDocument()
    expect(screen.getByText(/stills of Toni’s scroll animation/)).toBeInTheDocument()
    expect(screen.getByText('Public content-kit demo')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Toni presenting the guided interview solution/ })).toHaveAttribute('src', '/tonipr/previews/landing-solution.jpg')
  })

  it('uses native overflow and natural image heights without playback or automatic scrolling', () => {
    const css = readFileSync(resolve('portfolio/case-studies.css'), 'utf8')
    expect(css).toContain('overflow: auto; overscroll-behavior-y: contain')
    expect(css).toContain('.toni-design-scroll:focus-visible')
    expect(css).toContain('.toni-scroll-screen img { display: block; width: 100%; max-width: 100%; height: auto; }')
    const component = readFileSync(resolve('portfolio/components/ToniDesignScrollThrough.tsx'), 'utf8')
    expect(component).not.toMatch(/setInterval|setTimeout|requestAnimationFrame|scrollTo|scrollIntoView|<video/)
  })

  it('places the preview before the detailed case-study evidence without removing it', () => {
    const { container } = render(<CaseStudyExperience slug="tonipr" preview={<ToniDesignScrollThrough />}><ToniPRCaseStudy /></CaseStudyExperience>)
    const preview = screen.getByLabelText('ToniPR scroll-through design preview')
    const original = container.querySelector('.study-original-content') as HTMLElement
    const detailed = within(original).getByRole('img', { name: /Detail of ToniPR's three steps/ })
    expect(preview.compareDocumentPosition(detailed) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(container.querySelector('.study-product-stage')).not.toBeInTheDocument()
    expect(container.querySelector('video')).toBeNull()
    expect(within(original).getByRole('img', { name: /Public ToniPR demo pairing/ })).toHaveAttribute('src', '/tonipr/previews/source-and-story.jpg')
    const route = readFileSync(resolve('app/case-study/tonipr/page.tsx'), 'utf8')
    expect(route).toContain('preview={<ToniDesignScrollThrough />}')
    expect(route).not.toContain('ToniJourneyWalkthrough')
    expect(existsSync(resolve('public/tonipr/journey-highlights.mp4'))).toBe(true)
  })

  it('explains founder alignment and engineering collaboration as distinct parts of the work', () => {
    render(<ToniPRCaseStudy />)
    const collaboration = screen.getByRole('region', { name: 'Founder and engineering collaboration' })
    const founder = within(collaboration).getByRole('article', { name: 'Translate the vision into a product people can understand.' })
    const engineering = within(collaboration).getByRole('article', { name: 'Make the design intent clear beyond the final screen.' })
    expect(founder).toHaveTextContent('product story, customer value')
    expect(founder).toHaveTextContent('Flows and prototypes')
    expect(engineering).toHaveTextContent('camera and microphone preparation')
    expect(engineering).toHaveTextContent('permissions, interruptions, recovery, and responsive')
    expect(collaboration).not.toHaveTextContent('From ambiguity to shipped behavior')
    expect(collaboration).not.toHaveTextContent('usability testing')
  })

  it('makes the founder and engineering partnership visible in the recruiter introduction', () => {
    const project = caseStudyProjects.tonipr
    expect(project.meta).toContainEqual(['Team', 'Founder + engineering'])
    expect(project.description).toContain('Working with the founder and engineering')
    expect(project.summary.find(([title]) => title === 'My contribution')?.[1]).toContain('Partnered with the founder and engineering')
  })
})
