import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CrusoeCaseStudy from '@/portfolio/pages/case-study-crusoe'
import { crusoeNarratives } from '@/portfolio/components/CrusoeStoryContent'

vi.mock('@/portfolio/compat', () => ({ Link: (props: Record<string, unknown>) => <a {...props} />, Image: ({fill: _f, priority: _p, ...props}: Record<string, unknown>) => <img {...props} /> }))
beforeEach(() => { window.history.replaceState({}, '', '/case-study/crusoe/'); vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }) })
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })
describe('Crusoe evidence and claim integrity', () => {
  it('leads with the original problem and distinguishes the initial design from proposed V2', () => {
    const { container } = render(<CrusoeCaseStudy />)
    const panel = screen.getByRole('tabpanel', { name: 'Empty-state system project' })
    const images = [...panel.querySelectorAll('img')].map(image => image.getAttribute('src'))
    expect(images.indexOf('/images/crusoe/current-resource-empty.png')).toBeLessThan(images.indexOf('/images/crusoe/final-instances-empty.png'))
    expect(panel).toHaveTextContent('Before · Existing Instances page')
    expect(panel).toHaveTextContent('After · Designed V1 guidance pattern')
    expect(panel).toHaveTextContent('Proposed V2')
    expect(panel).toHaveTextContent('The tradeoff:')
    expect(panel).toHaveTextContent('verified customer outcome data is not available')
    expect(container).not.toHaveTextContent(/60%|72%|85%|80%|25%|22%/)
    const details = panel.querySelector('details')!
    expect(details).not.toHaveAttribute('open')
    fireEvent.click(within(details).getByText('See the research synthesis'))
    expect(details).toHaveAttribute('open')
  })
  it('keeps useful scope counts separate from performance claims', () => {
    expect(crusoeNarratives['empty-state-system'].metrics).toEqual([])
    expect(crusoeNarratives['heuristic-evaluation'].metrics).toEqual([['3', 'reviewed journeys', 'Audit scope']])
    for (const story of Object.values(crusoeNarratives)) {
      expect(story.metricSource).toBeNull()
      expect(JSON.stringify(story.metrics)).not.toMatch(/%|faster|retention/)
    }
  })
  it('preserves the supporting decision explorer and optional journey evidence', () => {
    render(<CrusoeCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: 'Read project 02: Heuristic evaluation' }))
    const panel = screen.getByRole('tabpanel', { name: 'Heuristic evaluation project' })
    expect(within(panel).getByText('Safer API-key defaults')).toBeInTheDocument()
    const dossiers = [...panel.querySelectorAll('.crusoe-journey-dossier')]
    expect(dossiers).toHaveLength(3)
    expect(dossiers.map(el => el.querySelector('summary strong')?.textContent)).toEqual(['API keys', 'Cost monitoring', 'Monitoring + debugging'])
  })
})
