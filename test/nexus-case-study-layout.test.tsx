import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import NexusCaseStudy from '@/portfolio/pages/case-study-nexus'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
  Image: ({ fill, priority, ...props }: ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => <img {...props} />,
}))
vi.mock('@/portfolio/components/CaseStudyNav', () => ({ default: () => null }))
vi.mock('@/portfolio/components/EditorialCaseStudyCover', () => ({ default: () => null }))
beforeEach(() => vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }))
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('Nexus editorial case-study layout', () => {
  it('puts all eight sections in the same layout shell, with the number above the heading', () => {
    const { container } = render(<NexusCaseStudy />)
    const sections = [...container.querySelectorAll('.legacy-case-section')]
    expect(sections).toHaveLength(8)
    expect(sections.map(section => section.querySelector('.legacy-section-title')?.textContent)).toEqual([
      'Overview', 'Design Process', 'Research', 'Core Features', 'Design System', 'Impact & Results', 'Reflection', 'Product Walkthrough',
    ])
    for (const [index, section] of sections.entries()) {
      const shell = section.firstElementChild!
      expect(shell).toHaveClass('nexus-section-inner')
      expect(shell.children[0]).toHaveClass('legacy-section-number')
      expect(shell.children[0]).toHaveTextContent(String(index + 1).padStart(2, '0'))
      expect(shell.children[1]).toHaveClass('legacy-section-title')
    }
  })

  it('keeps the overview and design question in the shared full-width content shell', () => {
    const { container } = render(<NexusCaseStudy />)
    const overview = container.querySelector('.nexus-overview-content')!
    const question = screen.getByLabelText('Nexus design question')
    expect(overview).not.toHaveClass('max-w-3xl')
    expect(overview).toContainElement(question)
    expect(question).not.toHaveAttribute('style')
    expect(question).toHaveTextContent('How might we give students one accurate answer')
  })

  it('keeps the timeline keyboard-scrollable and preserves the original evidence links', () => {
    render(<NexusCaseStudy />)
    const timeline = screen.getByRole('region', { name: 'Nexus 10-week design timeline' })
    expect(timeline).toHaveAttribute('tabindex', '0')
    expect(within(timeline).getAllByRole('link')).toHaveLength(6)
    expect(within(timeline).getByRole('link', { name: 'User Research' })).toHaveAttribute('href', '#research')
    expect(within(timeline).getByRole('link', { name: 'Final Polish' })).toHaveAttribute('href', '#product-walkthrough')
    fireEvent.click(screen.getByRole('button', { name: 'Read research note 1' }))
    expect(screen.getByLabelText('Research note 1')).toBeInTheDocument()
  })

  it('uses the shared case-study introduction and persistent back navigation', () => {
    const { container } = render(<CaseStudyExperience slug="nexus"><NexusCaseStudy /></CaseStudyExperience>)
    expect(container.firstElementChild).toHaveAttribute('data-study-slug', 'nexus')
    const research = within(container.querySelector('.study-meta') as HTMLElement).getByText('Research').parentElement!
    expect(research.querySelector('dd')).toHaveTextContent('48 users')
    expect(screen.getByRole('link', { name: 'Back to selected work' })).toHaveAttribute('href', '/#projects')
    expect(screen.queryByRole('combobox', { name: 'Jump to section' })).not.toBeInTheDocument()
  })

  it('separates the insight, comparison, takeaway, and affinity chapters without dropping the evidence', () => {
    const { container } = render(<NexusCaseStudy />)
    const insight = screen.getByLabelText('Research key insight')
    const comparison = container.querySelector('#competitive-analysis')!
    const affinity = container.querySelector('#affinity-mapping')!
    expect(within(insight).getAllByRole('listitem')).toHaveLength(3)
    expect(comparison).toHaveClass('nexus-research-chapter')
    expect(affinity).toHaveClass('nexus-research-chapter')
    expect(insight.compareDocumentPosition(comparison) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(comparison.compareDocumentPosition(affinity) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    const table = within(comparison as HTMLElement).getByRole('region', { name: 'AI platforms comparison' })
    expect(table).toHaveClass('nexus-competitive-table')
    expect(table.children).toHaveLength(6)
    for (const platform of ['ChatGPT', 'Claude', 'Poe', 'OpenRouter', 'Nexus']) expect(within(table).getByText(platform, { exact: true })).toBeInTheDocument()
    expect(comparison.querySelector('.nexus-comparison-takeaway')).toHaveTextContent('Most platforms offer either one model')
  })

  it('gives the affinity map a separate, wrapping color key before its synthesis', () => {
    render(<NexusCaseStudy />)
    const legend = screen.getByRole('list', { name: 'Affinity map color key' })
    expect(legend).toHaveClass('nexus-affinity-legend')
    expect(within(legend).getAllByRole('listitem').map(item => item.textContent?.trim())).toEqual([
      'User Behavior', 'Needs / Goals', 'Pain Point', 'UX Principle', 'Opportunity',
    ])
    expect(legend.previousElementSibling).toHaveClass('grid')
    expect(legend.nextElementSibling).toHaveClass('nexus-affinity-synthesis')
    expect(legend.nextElementSibling).toHaveTextContent('Key Insight')
  })

  it('shows two clearly labeled journeys with one shared chat flow and explicit plan access', () => {
    const { container } = render(<NexusCaseStudy />)
    const onboarding = screen.getByRole('region', { name: 'Onboarding' })
    const chat = screen.getByRole('region', { name: 'Main Chat Interface' })
    const steps = within(chat).getByRole('list', { name: 'Main chat steps' })
    expect(within(onboarding).getAllByRole('listitem')).toHaveLength(4)
    expect(within(steps).getAllByRole('listitem')).toHaveLength(5)
    expect(within(steps).getByText('Enter Question')).toBeInTheDocument()
    expect(within(steps).getByText('Run AI Models').closest('li')).toHaveClass('nexus-journey-step--processing')
    expect(within(steps).getByText('Compare Responses').closest('li')).toHaveClass('nexus-journey-step--processing')
    expect(within(steps).getByText('Final Answer').closest('li')).toHaveClass('nexus-journey-step--result')
    const access = screen.getByLabelText('Model access by plan')
    expect(access).toHaveTextContent('Free2–3 models')
    expect(access).toHaveTextContent('PaidAll models')
    expect(chat).toContainElement(access)
    expect(container.querySelector('#core-product-flow')).toHaveClass('nexus-research-chapter')
    expect(container.querySelector('#lofi')).toHaveClass('nexus-research-chapter', 'nexus-lofi-chapter')
  })

  it('gives each research phase its own spaced chapter and preserves full-size evidence links', () => {
    const { container } = render(<NexusCaseStudy />)
    const phases = ['#lofi', '#midfi', '#hifi'].map(selector => container.querySelector(selector)!)
    for (const phase of phases) {
      expect(phase).toHaveClass('nexus-research-chapter')
      expect(phase.parentElement).toHaveClass('nexus-section-inner')
    }
    expect(phases[0].querySelector('.nexus-wireframe-grid')).toBeInTheDocument()
    expect(phases[1].querySelector('.nexus-wireframe-grid')).toBeInTheDocument()
    expect(phases[2].querySelectorAll('.nexus-artifact-grid a')).toHaveLength(4)
    for (const link of phases[2].querySelectorAll('.nexus-artifact-grid a')) {
      expect(link).toHaveAttribute('href', link.querySelector('img')?.getAttribute('src'))
      expect(link).toHaveAccessibleName(/at full size/)
    }
    for (const className of ['nexus-survey-grid', 'nexus-affinity-grid', 'nexus-feature-grid', 'nexus-design-grid', 'nexus-impact-grid', 'nexus-reflection-grid']) {
      expect(container.querySelector(`.${className}`)).toBeInTheDocument()
    }
  })

  it('keeps the walkthrough image uncropped with labeled controls outside the image', () => {
    render(<NexusCaseStudy />)
    const carousel = screen.getByRole('region', { name: 'Nexus product screens' })
    const image = within(carousel).getByRole('img')
    expect(carousel).toHaveClass('nexus-walkthrough')
    expect(image).toHaveAttribute('width', '2044')
    expect(image).toHaveAttribute('height', '992')
    expect(image).not.toHaveClass('absolute', 'object-cover')
    expect(within(carousel).getAllByRole('img')).toHaveLength(1)
    const next = within(carousel).getByRole('button', { name: 'Next Nexus screen' })
    expect(carousel.querySelector('figure')).not.toContainElement(next)
    expect(within(carousel).getByRole('link', { name: 'Open full image ↗' })).toHaveAttribute('href', '/narbl/narbl-1.png')
    fireEvent.click(next)
    expect(within(carousel).getByRole('img')).toHaveAttribute('alt', 'Smarter Homework, Faster Results')
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' })
    expect(within(carousel).getByRole('img')).toHaveAttribute('alt', 'Everything You Need. One Nexus.')
    fireEvent.click(within(carousel).getByRole('button', { name: 'Previous Nexus screen' }))
    expect(within(carousel).getByRole('img')).toHaveAttribute('alt', 'Final Platform')
    expect(within(carousel).getByRole('button', { name: 'Show screen 8: Final Platform' })).toHaveAttribute('aria-pressed', 'true')
    expect(within(carousel).getByRole('group', { name: 'Choose a Nexus screen' }).children).toHaveLength(8)
  })
})
