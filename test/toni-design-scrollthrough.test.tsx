import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
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
  it('opens the real scroll-animated landing page without a recorded video or automatic outer scrolling', () => {
    const scroll = vi.spyOn(window, 'scrollTo')
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    const { container } = render(<ToniDesignScrollThrough />)
    const frame = screen.getByRole('region', { name: 'ToniPR live website preview' })
    expect(frame).toHaveAccessibleDescription(/Scroll inside the live website to see Toni’s animations/)
    const website = screen.getByTitle('ToniPR live landing page with scroll animations')
    expect(website).toHaveAttribute('src', 'https://tonipr.com/')
    expect(website).toHaveAttribute('loading', 'lazy')
    expect(website).toHaveAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups')
    expect(website).toHaveAttribute('allow', "camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'")
    expect(website).toHaveAttribute('referrerpolicy', 'no-referrer')
    expect(screen.getByRole('button', { name: '01 Landing page' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: 'Open ToniPR in a new tab ↗' })).toHaveAttribute('href', 'https://tonipr.com/')
    expect(container.querySelector('video,source,track')).toBeNull()
    expect(screen.queryByText('The experience in 28 seconds.')).not.toBeInTheDocument()
    expect(scroll).not.toHaveBeenCalled()
    expect(scrollIntoView).not.toHaveBeenCalled()
  })

  it('preserves complete labeled captures as the landing-page fallback and separate product flow', () => {
    render(<ToniDesignScrollThrough />)
    fireEvent.click(screen.getByRole('button', { name: 'View captured version instead' }))
    for (const group of toniDesignGroups) {
      if (group.id === 'product') fireEvent.click(screen.getByRole('button', { name: '02 Product flow' }))
      const frame = screen.getByRole('region', { name: 'ToniPR design screens' })
      expect(frame).toHaveAttribute('tabindex', '0')
      expect(frame).toHaveAccessibleDescription(/Scroll inside the frame.*arrow keys/)
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

  it('distinguishes the live animations from the static fallback and preserves a way back', () => {
    render(<ToniDesignScrollThrough />)
    expect(screen.getByText(/Live public website: scroll animations run inside this frame/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'View captured version instead' }))
    expect(screen.getByText(/not a continuous full-page screenshot/)).toBeInTheDocument()
    expect(screen.getByText(/Pictured controls are not interactive/)).toBeInTheDocument()
    expect(screen.getByText(/stills of Toni’s scroll animation/)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Toni presenting the guided interview solution/ })).toHaveAttribute('src', '/tonipr/previews/landing-solution.jpg')
    fireEvent.click(screen.getByRole('button', { name: 'Return to live animations' }))
    expect(screen.getByTitle('ToniPR live landing page with scroll animations')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '02 Product flow' }))
    expect(screen.getByText('Public content-kit demo')).toBeInTheDocument()
  })

  it('offers a captured fallback and resets each capture view without moving the case-study page', () => {
    render(<ToniDesignScrollThrough />)
    fireEvent.click(screen.getByRole('button', { name: 'View captured version instead' }))
    expect(screen.getByRole('list', { name: 'Landing page captures' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '02 Product flow' }))
    const product = screen.getByRole('region', { name: 'ToniPR design screens' })
    product.scrollTop = 800
    fireEvent.click(screen.getByRole('button', { name: '01 Landing page' }))
    expect(screen.getByTitle('ToniPR live landing page with scroll animations')).toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'Product flow captures' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '02 Product flow' }))
    expect(screen.getByRole('region', { name: 'ToniPR design screens' }).scrollTop).toBe(0)
  })

  it('uses a tall native website frame and natural capture heights, without simulated video motion', () => {
    const css = readFileSync(resolve('portfolio/case-studies.css'), 'utf8')
    expect(css).toContain('overflow: auto; overscroll-behavior-y: contain')
    expect(css).toContain('.toni-design-scroll:focus-visible')
    expect(css).toContain('.toni-scroll-screen img { display: block; width: 100%; max-width: 100%; height: auto; }')
    expect(css).toContain('height: clamp(420px, calc(88svh / var(--study-reading-scale, 1)), 1200px)')
    expect(css).toContain('.toni-live-site iframe { display: block; width: 100%; height: 100%; border: 0; }')
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
