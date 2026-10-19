import type { ComponentProps } from 'react'
import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import NexusCaseStudy from '@/portfolio/pages/case-study-nexus'
import SpotifyCaseStudy from '@/portfolio/pages/case-study-spotify'
import HabitatCaseStudy from '@/portfolio/pages/case-study-habitat'
import NeuranoteCaseStudy from '@/portfolio/pages/case-study-neuranote'
import FlowOpsCaseStudy from '@/portfolio/pages/case-study-flowops'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
  Image: ({ fill, priority, ...props }: ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => <img {...props} />,
}))
vi.mock('@/portfolio/components/CaseStudyNav', () => ({ default: () => null }))
vi.mock('@/portfolio/components/EditorialCaseStudyCover', () => ({ default: () => null }))
vi.mock('@/portfolio/components/ViewportVideo', () => ({ default: () => null }))
beforeEach(() => vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }))
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('Numbered case-study section headings', () => {
  it.each([
    ['Nexus', NexusCaseStudy, 8],
    ['Spotify', SpotifyCaseStudy, 12],
    ['Habitat', HabitatCaseStudy, 11],
    ['NeuraNote', NeuranoteCaseStudy, 10],
    ['FlowOps', FlowOpsCaseStudy, 12],
  ] as const)('keeps every %s number immediately above its title in the shared layout shell', (_name, Page, count) => {
    const { container } = render(<Page />)
    const sections = [...container.querySelectorAll('.legacy-case-section')].filter(section => section.querySelector('.legacy-section-number'))
    expect(sections).toHaveLength(count)
    for (const [index, section] of sections.entries()) {
      const shell = section.firstElementChild!
      const number = shell.querySelector('.legacy-section-number')!
      const title = shell.querySelector('.legacy-section-title')!
      expect(number.parentElement).toBe(shell)
      expect(title.parentElement).toBe(shell)
      expect(number).toHaveTextContent(String(index + 1).padStart(2, '0'))
      expect(number.nextElementSibling).toBe(title)
      expect(title.tagName).toBe('H2')
    }
  })
})
