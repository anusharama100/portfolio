import type { ComponentProps } from 'react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CrusoeCaseStudy from '@/portfolio/pages/case-study-crusoe'
import KrokosCaseStudy from '@/portfolio/pages/case-study-krokos'
import ToniCaseStudy from '@/portfolio/pages/case-study-tonipr'
import NexusCaseStudy from '@/portfolio/pages/case-study-nexus'
import NeuraCaseStudy from '@/portfolio/pages/case-study-neuranote'
import FlowOpsCaseStudy from '@/portfolio/pages/case-study-flowops'
import HabitatCaseStudy from '@/portfolio/pages/case-study-habitat'
import SpotifyCaseStudy from '@/portfolio/pages/case-study-spotify'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
  Image: ({ fill: _fill, priority: _priority, ...props }: ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => <img {...props} />,
}))
vi.mock('@/portfolio/components/CaseStudyNav', () => ({ default: () => null }))
vi.mock('@/portfolio/components/EditorialCaseStudyCover', () => ({ default: () => null }))
vi.mock('@/portfolio/components/ViewportVideo', () => ({ default: () => null }))
beforeEach(() => {
  window.history.replaceState({}, '', '/')
  vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} })
})
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

const stylesheet = readFileSync(resolve('portfolio/case-study-callouts.css'), 'utf8')

describe('Shared ombré reading callouts', () => {
  it.each([
    ['Crusoe', CrusoeCaseStudy, ['.crusoe-narrative-goal', '.crusoe-story-takeaway', '.crusoe-project-next-steps']],
    ['Krokos', KrokosCaseStudy, ['.krokos-design-question', '.krokos-implementation-note']],
    ['ToniPR', ToniCaseStudy, ['.toni-thesis-band', '.toni-edge-strip', '.toni-format-strip', '.toni-collaboration-takeaway']],
    ['Nexus', NexusCaseStudy, ['.nexus-problem-statement', '.nexus-research-insight', '.nexus-comparison-takeaway', '.nexus-reflection-takeaway', '.nexus-design-notes']],
    ['NeuraNote', NeuraCaseStudy, ['.neura-problem', '.neura-note-block']],
    ['FlowOps', FlowOpsCaseStudy, ['.flowops-problem', '.flowops-note-block', '.study-callout']],
    ['HABITat', HabitatCaseStudy, ['.study-callout']],
    ['Spotify', SpotifyCaseStudy, ['.study-callout']],
  ] as const)('includes %s editorial callouts without recoloring product evidence', (_name, Page, selectors) => {
    const { container } = render(<Page />)
    for (const selector of selectors) {
      expect(stylesheet).toContain(selector)
      const callouts = [...container.querySelectorAll(selector)]
      expect(callouts.length).toBeGreaterThan(0)
      for (const callout of callouts) {
        expect(callout.textContent?.trim().length).toBeGreaterThan(0)
        expect(callout.querySelector('img,video,svg,canvas')).toBeNull()
      }
    }
  })

  it('uses one soft wash and accent rail, including a legacy-card cascade override', () => {
    expect(stylesheet).toContain('background: var(--study-callout-wash) !important')
    expect(stylesheet).toContain('border-image-source: var(--study-callout-accent) !important')
    expect(stylesheet).toContain('.case-study-experience .study-original-content .legacy-case-section :is(div, aside, p, blockquote).study-callout')
    expect(stylesheet).not.toContain('[class*=')
  })
})
