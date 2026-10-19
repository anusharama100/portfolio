import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CrusoeCaseStudy from '@/portfolio/pages/case-study-crusoe'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
  Image: ({ priority: _priority, fill: _fill, quality: _quality, ...props }: ComponentProps<'img'> & { priority?: boolean; fill?: boolean; quality?: number }) => <img {...props} />,
}))

vi.mock('@/portfolio/components/ViewportVideo', () => ({
  default: ({ ariaLabel }: { ariaLabel: string }) => <div aria-label={ariaLabel} />,
}))

beforeEach(() => {
  window.history.replaceState({}, '', '/case-study/crusoe/')
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('Crusoe project selection', () => {
  it('opens the empty-state system by default while keeping the other project choices available', () => {
    const { container } = render(
      <CaseStudyExperience slug="crusoe"><CrusoeCaseStudy /></CaseStudyExperience>,
    )

    expect(screen.getByRole('navigation', { name: 'Choose a Crusoe project' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^Read project/ })).toHaveLength(3)
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByRole('tabpanel', { name: 'Empty-state system project' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Read project 01: Empty-state system' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'Turn an empty screen into a useful starting point.' })).toBeInTheDocument()
    expect(container.querySelector('.study-product-stage')).toBeNull()
    expect(screen.queryByText('The project at a glance.')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Crusoe internship project details')).toBeInTheDocument()
    expect(window.location.hash).toBe('')
  })

  it('switches and reselects projects without scrolling the page', async () => {
    const scroll = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    render(<CrusoeCaseStudy />)
    for (const name of [
      'Read project 01: Empty-state system',
      'Read project 02: Heuristic evaluation',
      'Read project 03: Usage → cost',
      'Read project 01: Empty-state system',
      'Read project 01: Empty-state system',
    ]) {
      fireEvent.click(screen.getByRole('button', { name }))
      await new Promise<void>(resolve => window.requestAnimationFrame(() => resolve()))
      expect(scroll).not.toHaveBeenCalled()
      expect(screen.getByRole('button', { name })).toHaveAttribute('aria-pressed', 'true')
    }
  })

  it('cancels the initial deep-link scroll if a project is clicked before the first frame', async () => {
    const scroll = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    window.history.replaceState({}, '', '/case-study/crusoe/#empty-state-system')
    render(<CrusoeCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: 'Read project 02: Heuristic evaluation' }))
    await new Promise<void>(resolve => window.requestAnimationFrame(() => resolve()))
    expect(scroll).not.toHaveBeenCalled()
  })

  it('introduces the customer problem before the audit and connects it to the redesign', () => {
    const { container } = render(<CrusoeCaseStudy />)
    const story = screen.getByRole('tabpanel', { name: 'Empty-state system project' })
    const headings = [...story.querySelectorAll(':scope > .crusoe-clean-section > .crusoe-clean-heading h3')]

    expect(headings.map(heading => heading.textContent)).toEqual([
      'A create button did not explain how to get started.',
      'Was this one screen, or a pattern across the Console?',
      'The same task, with a clearer starting point.',
      'Make the foundation usable without waiting for every future feature.',
      'Help before creation, and feedback after it.',
      'One documented pattern, ready to reuse.',
    ])
    expect(screen.getByLabelText('Who this project helps and what I designed')).toBeInTheDocument()
    expect(screen.getByLabelText('What to notice in the original screen')).toBeInTheDocument()
    const comparison = screen.getByLabelText('Instances empty-state progression: Before, V1, and V2')
    expect([...comparison.querySelectorAll('img')].map(image => image.getAttribute('src'))).toEqual([
      '/images/crusoe/current-resource-empty.png',
      '/images/crusoe/final-instances-empty.png',
      '/images/crusoe/final-instances-provisioning.png',
    ])
    expect(comparison.querySelectorAll('figure')).toHaveLength(3)
    expect(comparison).toHaveTextContent('Proposed · V2')
    expect(screen.getByRole('link', { name: 'Open the proposed V2 Instances screenshot at full size' })).toHaveAttribute('href', '/images/crusoe/final-instances-provisioning.png')
    expect(container.querySelectorAll('.crusoe-before-patterns')).toHaveLength(0)
    expect(story.textContent).not.toContain('We shipped')
    expect(screen.getByLabelText('Project deliverables and status')).toHaveTextContent('Proposed next')
  })

  it('keeps audit details collapsed and walkthroughs expanded by default with a collapse option', () => {
    render(<CrusoeCaseStudy />)
    const evidence = screen.getByText('Explore the original screens and problem-framing notes').closest('details')!
    const walkthroughs = screen.getByText('Watch the empty-state design walkthroughs').closest('details')!

    expect(evidence).not.toHaveAttribute('open')
    expect(evidence.querySelectorAll('.crusoe-before-screen-grid img')).toHaveLength(6)
    expect(evidence.querySelector('img[src$="empty-state-problem-framing.png"]')).not.toBeNull()
    expect(walkthroughs).toHaveAttribute('open')
    expect(walkthroughs.querySelectorAll('.crusoe-clean-motion-grid > figure')).toHaveLength(4)
    fireEvent.click(screen.getByText('Watch the empty-state design walkthroughs'))
    expect(walkthroughs).not.toHaveAttribute('open')
    fireEvent.click(screen.getByText('Watch the empty-state design walkthroughs'))
    expect(walkthroughs).toHaveAttribute('open')
  })

  it('shows only the chosen project when switching among all three stories', () => {
    const { container } = render(<CrusoeCaseStudy />)
    const projects = [
      ['Read project 01: Empty-state system', 'Empty-state system project', 'empty-state-system'],
      ['Read project 02: Heuristic evaluation', 'Heuristic evaluation project', 'heuristic-evaluation'],
      ['Read project 03: Usage → cost', 'Usage-to-cost project', 'usage-to-cost'],
    ]

    for (const [button, panel, hash] of projects) {
      fireEvent.click(screen.getByRole('button', { name: button }))

      expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
      expect(screen.getByRole('tabpanel', { name: panel })).toBeInTheDocument()
      expect(window.location.hash).toBe(`#${hash}`)
      expect(container.querySelector('.crusoe-shared-context')).toBeNull()
      expect(screen.getByRole('tabpanel', { name: panel }).querySelectorAll('.crusoe-project-collaboration')).toHaveLength(1)
    }
  })

  it('still opens and scrolls to an incoming project deep link', async () => {
    const scroll = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    window.history.replaceState({}, '', '/case-study/crusoe/#usage-to-cost')
    render(<CrusoeCaseStudy />)

    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByRole('tabpanel', { name: 'Usage-to-cost project' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Read project 03: Usage → cost' })).toHaveAttribute('aria-pressed', 'true')
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' }))
    expect(scroll.mock.contexts[0]).toBe(screen.getByRole('tabpanel', { name: 'Usage-to-cost project' }))
  })

  it('preserves the selected project when opening a subsection deep link', () => {
    window.history.replaceState({}, '', '/case-study/crusoe/#crusoe-cost-process-title-section')
    render(<CrusoeCaseStudy />)
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByRole('tabpanel', { name: 'Usage-to-cost project' })).toBeInTheDocument()
  })

  it('preserves the product image and overview for single-project case studies', () => {
    const { container } = render(<CaseStudyExperience slug="tonipr"><div /></CaseStudyExperience>)

    expect(container.querySelector('.study-product-stage')).not.toBeNull()
    expect(screen.getByText('The project at a glance.')).toBeInTheDocument()
  })
})
