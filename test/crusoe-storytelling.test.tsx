import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CrusoeCaseStudy from '@/portfolio/pages/case-study-crusoe'
import { crusoeNarratives } from '@/portfolio/components/CrusoeStoryContent'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
  Image: ({ priority: _priority, fill: _fill, quality: _quality, ...props }: ComponentProps<'img'> & { priority?: boolean; fill?: boolean; quality?: number }) => <img {...props} />,
}))
vi.mock('@/portfolio/components/ViewportVideo', () => ({ default: ({ ariaLabel }: { ariaLabel: string }) => <div aria-label={ariaLabel} /> }))

beforeEach(() => {
  window.history.replaceState({}, '', '/case-study/crusoe/')
  vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} })
})
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

const projects = [
  ['empty-state-system', 'Read project 01: Empty-state system', 'Empty-state system project'],
  ['heuristic-evaluation', 'Read project 02: Heuristic evaluation', 'Heuristic evaluation project'],
  ['usage-to-cost', 'Read project 03: Usage → cost', 'Usage-to-cost project'],
] as const

describe('Crusoe evidence-led storytelling', () => {
  it.each(projects)('frames %s with the user, challenge, role, goal, and project-specific reflection', (id, button, name) => {
    render(<CrusoeCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: button }))
    const panel = screen.getByRole('tabpanel', { name })
    const story = crusoeNarratives[id]
    const designStart = id === 'usage-to-cost'
      ? panel.querySelector('#crusoe-cost-process-title')!.closest('section')!
      : panel.querySelector('.crusoe-clean-section')!
    expect(within(panel).getByText(story.audience)).toBeInTheDocument()
    expect(within(panel).getByText(story.challenge)).toBeInTheDocument()
    expect(within(panel).getByText(story.role)).toBeInTheDocument()
    expect(within(panel).getByLabelText('Design goal')).toHaveTextContent(story.goal)
    const process = within(panel).getByRole('region', { name: `${story.projectName} process` })
    expect(within(process).getByRole('heading', { name: story.processTitle })).toBeInTheDocument()
    expect(within(process).getAllByRole('listitem')).toHaveLength(4)
    for (const step of story.process) {
      expect(within(process).getByRole('heading', { name: step.title })).toBeInTheDocument()
      expect(within(process).getByText(step.body)).toBeInTheDocument()
    }
    expect(panel.querySelector('.crusoe-narrative-opening')!.compareDocumentPosition(process) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(process.compareDocumentPosition(designStart) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(document.querySelectorAll('.crusoe-project-process')).toHaveLength(1)
    const collaboration = within(panel).getByRole('region', { name: `${story.projectName} collaboration` })
    expect(within(collaboration).getByRole('heading', { name: story.collaborationTitle })).toBeInTheDocument()
    expect(within(collaboration).getAllByRole('listitem')).toHaveLength(4)
    for (const step of story.collaboration) {
      expect(within(collaboration).getByRole('heading', { name: step.title })).toBeInTheDocument()
      expect(within(collaboration).getByText(step.body)).toBeInTheDocument()
      expect(collaboration).toHaveTextContent(step.partner)
    }
    expect(process.compareDocumentPosition(collaboration) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(collaboration.compareDocumentPosition(designStart) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(document.querySelectorAll('.crusoe-project-collaboration')).toHaveLength(1)
    expect(within(panel).getByLabelText('What I would measure next')).toHaveTextContent(story.next)
    const reflection = screen.getByRole('region', { name: `${story.projectName} takeaways` })
    expect(within(reflection).getByRole('heading', { name: 'What I’m taking with me.' })).toBeInTheDocument()
    expect(within(reflection).getAllByRole('listitem')).toHaveLength(3)
    for (const takeaway of story.takeaways) {
      expect(within(reflection).getByRole('heading', { name: takeaway.title })).toBeInTheDocument()
      expect(within(reflection).getByText(takeaway.body)).toBeInTheDocument()
    }
    for (const otherStory of Object.values(crusoeNarratives)) {
      if (otherStory !== story) {
        expect(within(panel).queryByText(otherStory.collaborationTitle)).not.toBeInTheDocument()
        for (const takeaway of otherStory.takeaways) expect(within(reflection).queryByText(takeaway.body)).not.toBeInTheDocument()
      }
    }
    expect(panel.compareDocumentPosition(reflection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(document.querySelector('.crusoe-shared-context')).toBeNull()
    expect(screen.queryByText('Frequent reviews kept the work clear and buildable.')).not.toBeInTheDocument()
    expect([...reflection.parentElement!.children].filter(element => element.tagName !== 'FOOTER').at(-1)).toBe(reflection)
    expect(panel).not.toHaveTextContent(/usability test|user test|customer interview|participants?/i)
    const methods = screen.getByText(/Methods across the work:/)
    expect(methods).toHaveTextContent('cross-functional design reviews, and engineering QA')
    expect(methods).not.toHaveTextContent(/usability test|user test|customer interview/i)
    expect(panel.querySelector('.crusoe-narrative-opening')!.compareDocumentPosition(panel.querySelector('.crusoe-clean-section')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('connects the empty-state findings to decisions and places comparative research before the redesign', () => {
    const { container } = render(<CrusoeCaseStudy />)
    expect(container.querySelectorAll('.crusoe-insight-implication')).toHaveLength(3)
    const research = container.querySelector('#crusoe-clean-competitive-title-section')!
    const design = container.querySelector('#crusoe-clean-v1-title')!
    expect(research.compareDocumentPosition(design) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(container.querySelectorAll('#crusoe-clean-competitive-title-section')).toHaveLength(1)
  })

  it('labels the four proposed V2 states as edge cases and state transitions', () => {
    render(<CrusoeCaseStudy />)
    const edgeCases = screen.getByRole('region', { name: 'Edge cases & state transitions' })
    expect(edgeCases).toHaveTextContent('proposed V2 edge-case designs')
    expect(edgeCases).toHaveTextContent('provisioning, failure, retry, and the ready state')
    expect(edgeCases.querySelectorAll('figure')).toHaveLength(4)
    expect(within(edgeCases).getAllByRole('img')).toHaveLength(4)
    expect([...edgeCases.querySelectorAll('figcaption strong')].map(label => label.textContent)).toEqual(['Creating the resource', 'Failure', 'Retry', 'Ready'])
  })

  it('keeps outcomes specific to the selected project instead of repeating a mixed internship summary', () => {
    const { container } = render(<CrusoeCaseStudy />)
    const cases = [
      ['Read project 01: Empty-state system', 'Project deliverables and status', 'A reusable first-release empty-state pattern and product examples'],
      ['Read project 02: Heuristic evaluation', 'Heuristic evaluation outcomes', 'Nine improvements across the three evaluated Console journeys'],
      ['Read project 03: Usage → cost', 'Usage-to-cost outcomes', 'customer impact has not been measured'],
    ] as const
    for (const [button, label, result] of cases) {
      fireEvent.click(screen.getByRole('button', { name: button }))
      const panel = screen.getByRole('tabpanel')
      const outcomes = within(panel).getByLabelText(label)
      expect(outcomes).toHaveTextContent(result)
      expect(outcomes.querySelectorAll('dt')).toHaveLength(3)
      for (const [, otherLabel] of cases) {
        if (otherLabel !== label) expect(within(panel).queryByLabelText(otherLabel)).not.toBeInTheDocument()
      }
      expect(container.querySelector('.crusoe-shared-context')).toBeNull()
      expect(screen.queryByText('Clearer experiences for customers and clearer plans for the team.')).not.toBeInTheDocument()
      expect(container.querySelector('.crusoe-outcomes-section')).toBeNull()
    }
  })

  it('shows the usability-principles section by default while allowing collapse and reopening', () => {
    render(<CrusoeCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: 'Read project 02: Heuristic evaluation' }))
    const summary = screen.getByText('How usability principles informed the review')
    const disclosure = summary.closest('details')!
    expect(disclosure).toHaveAttribute('open')
    for (const name of ['Working memory', 'Mental models', 'Error recovery']) {
      expect(within(disclosure).getByRole('heading', { name })).toBeVisible()
    }
    fireEvent.click(summary)
    expect(disclosure).not.toHaveAttribute('open')
    fireEvent.click(summary)
    expect(disclosure).toHaveAttribute('open')
  })

  it('puts heuristic findings before the design explorer and distinguishes additional proposals from shipped work', () => {
    render(<CrusoeCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: 'Read project 02: Heuristic evaluation' }))
    const table = screen.getByRole('table', { name: 'From evaluation evidence to a design response' })
    expect(within(table).getAllByRole('row')).toHaveLength(4)
    expect(within(table).getByRole('columnheader', { name: 'Why it mattered' })).toBeInTheDocument()
    expect(table.compareDocumentPosition(screen.getByRole('heading', { name: 'Explore the reasoning, not just the final screens.' })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getByText(/they are not all presented as shipped screens/)).toBeInTheDocument()
  })

  it('keeps the full journey notes in the same API, cost, and debugging order as the decision cards', () => {
    const { container } = render(<CrusoeCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: 'Read project 02: Heuristic evaluation' }))
    expect(screen.getAllByRole('button', { name: /^Explore (Safer|Explain|Recover)/ }).map(button => button.getAttribute('aria-label'))).toEqual([
      'Explore Safer API-key defaults', 'Explore Explain a cost change', 'Explore Recover without a detour',
    ])
    const journeys = [...container.querySelectorAll('.crusoe-journey-dossier')]
    expect(journeys.map(journey => journey.querySelector('summary > span')!.textContent)).toEqual([
      'Journey 01', 'Journey 02', 'Journey 03',
    ])
    expect(journeys.map(journey => journey.querySelector('summary > strong')!.textContent)).toEqual([
      'API keys', 'Cost monitoring', 'Monitoring + debugging',
    ])
    expect(within(journeys[0] as HTMLElement).getByRole('list', { name: 'API keys evaluated path', hidden: true })).toHaveTextContent('Find API keys')
    expect(within(journeys[1] as HTMLElement).getByRole('list', { name: 'Cost monitoring evaluated path', hidden: true })).toHaveTextContent('See spend change')
    expect(within(journeys[2] as HTMLElement).getByRole('list', { name: 'Monitoring + debugging evaluated path', hidden: true })).toHaveTextContent('Notice an issue')
  })

  it('links usage analysis to design decisions without presenting prototype playback as measured impact', () => {
    const { container } = render(<CrusoeCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: 'Read project 03: Usage → cost' }))
    expect(screen.getByRole('heading', { name: 'How the redesign helps investigate a bill.' })).toBeInTheDocument()
    expect(screen.queryByText('Follow the question, not a long screen recording.')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('How I mapped and reviewed the investigation'))
    expect(screen.getByRole('table', { name: 'How the workflow analysis shaped the design' })).toBeInTheDocument()
    expect(screen.getByLabelText('Questions guiding the investigation')).toBeInTheDocument()
    expect(screen.getByText(/not evidence of a measured reduction in cost or investigation time/)).toBeInTheDocument()
    expect(container.querySelector('.crusoe-cost-journey')).toBeNull()
    expect(screen.getByText('How I mapped and reviewed the investigation').closest('details')).toHaveAttribute('open')
  })
})
