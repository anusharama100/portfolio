import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import NeuranoteCaseStudy from '@/portfolio/pages/case-study-neuranote'
import NeuraWalkthroughVideo from '@/portfolio/components/NeuraWalkthroughVideo'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
  Image: ({ fill, priority, ...props }: ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => <img {...props} />,
}))
vi.mock('@/portfolio/components/CaseStudyNav', () => ({ default: () => null }))
vi.mock('@/portfolio/components/EditorialCaseStudyCover', () => ({ default: () => null }))
beforeEach(() => vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }))
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('NeuraNote editorial case-study layout', () => {
  it('keeps all ten sections in one centered shell with the number above the title', () => {
    const { container } = render(<NeuranoteCaseStudy />)
    const sections = [...container.querySelectorAll('.legacy-case-section')]
    expect(sections).toHaveLength(10)
    for (const [index, section] of sections.entries()) {
      const shell = section.firstElementChild!
      expect(shell).toHaveClass('neura-section-inner')
      expect(shell.children[0]).toHaveClass('legacy-section-number')
      expect(shell.children[0]).toHaveTextContent(String(index + 1).padStart(2, '0'))
      expect(shell.children[1]).toHaveClass('legacy-section-title')
    }
    const question = screen.getByLabelText('NeuraNote design question')
    expect(question).toHaveClass('neura-problem')
    expect(question).not.toHaveAttribute('style')
    expect(question).toHaveTextContent('capture, connect, and review')
    expect(question).toHaveTextContent('long-term memory')
  })

  it('preserves the six-week timeline with keyboard-scrollable overflow', () => {
    render(<NeuranoteCaseStudy />)
    const timeline = screen.getByRole('region', { name: 'NeuraNote six-week design timeline' })
    expect(timeline).toHaveAttribute('tabindex', '0')
    for (const label of ['Week 1', 'Week 6', 'User Research', 'Usability Testing', 'Hi-Fi Prototype Completion']) {
      expect(within(timeline).getByText(label, { exact: true })).toBeInTheDocument()
    }
  })

  it('separates the research chapters and keeps every evidence image available at full size', () => {
    const { container } = render(<NeuranoteCaseStudy />)
    for (const id of ['neura-comparison', 'neura-affinity', 'neura-lofi', 'neura-flows']) expect(container.querySelector(`#${id}`)).toHaveClass('neura-chapter')
    const table = screen.getByRole('region', { name: 'Note-taking tools comparison' })
    expect(table.children).toHaveLength(6)
    expect(container.querySelectorAll('.neura-affinity-grid [class*="aspect-square"]')).toHaveLength(18)
    expect(screen.getByRole('group', { name: 'Affinity map color key' }).children).toHaveLength(5)
    const links = [...container.querySelectorAll('.neura-artifact-link')]
    expect(links).toHaveLength(4)
    for (const link of links) {
      expect(link).toHaveAttribute('href', link.querySelector('img')?.getAttribute('src'))
      expect(link).toHaveAccessibleName(/at full size/)
      expect(link.querySelector('img')).not.toHaveClass('object-cover', 'absolute')
    }
  })

  it('preserves all six journeys, branches, and alternative capture methods', () => {
    const { container } = render(<NeuranoteCaseStudy />)
    const flows = container.querySelector('#neura-flows') as HTMLElement
    expect(flows.querySelectorAll('.neura-journey')).toHaveLength(6)
    for (const label of ['Onboarding', 'Create Note', 'AI Features', 'Concept Map', 'Review Session', 'Insights']) {
      expect(within(flows).getByRole('region', { name: label })).toBeInTheDocument()
    }
    const capture = within(flows).getByRole('list', { name: 'Other capture options' })
    expect(within(capture).getAllByRole('listitem').map(e => e.textContent)).toEqual(['Upload PDF', 'Import Photo', 'Voice Note'])
    expect(within(flows).getByRole('list', { name: 'Without concepts' })).toHaveTextContent('Empty State')
    expect(within(flows).getByRole('list', { name: 'Finish review' })).toHaveTextContent('View Insights')
  })

  it('keeps both original recordings user-controlled and removes the redundant footer', () => {
    const { container } = render(<NeuranoteCaseStudy />)
    const videos = [...container.querySelectorAll('.neura-walkthroughs video')]
    expect(videos).toHaveLength(2)
    for (const video of videos) {
      expect(video).toHaveAttribute('controls')
      expect(video).toHaveAttribute('preload', 'metadata')
      expect(video).not.toHaveAttribute('autoplay')
      expect(video).not.toHaveAttribute('loop')
    }
    expect(videos[0].querySelector('source')).toHaveAttribute('src', '/neuranote/onboarding-chaptered.mp4')
    expect(videos[1].querySelector('source')).toHaveAttribute('src', '/neuranote/workflow-chaptered.mp4')
    expect(screen.getByRole('group', { name: 'NeuraNote guided onboarding chapters' }).children).toHaveLength(6)
    expect(screen.getByRole('group', { name: 'NeuraNote product workflow chapters' }).children).toHaveLength(6)
    expect(screen.queryByRole('link', { name: 'Back to Portfolio' })).not.toBeInTheDocument()
  })

  it('shows an honest preview fallback if a recording cannot load', () => {
    const { container } = render(<NeuraWalkthroughVideo label="Test prototype" poster="/preview.png" sources={[{ src: '/test.mp4', type: 'video/mp4' }]} />)
    fireEvent.error(container.querySelector('video')!)
    expect(screen.getByRole('group', { name: 'Test prototype' })).toHaveTextContent('currently unavailable')
    expect(screen.getByRole('img', { name: 'Test prototype preview' })).toHaveAttribute('src', '/preview.png')
  })
})
