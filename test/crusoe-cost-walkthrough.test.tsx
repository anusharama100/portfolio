import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CrusoeCostWalkthrough, { costWalkthroughChapters, costWalkthroughChapterAt } from '@/portfolio/components/CrusoeCostWalkthrough'
import CrusoeUsageCostStory from '@/portfolio/components/CrusoeUsageCostStory'
import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

vi.mock('@/portfolio/compat', () => ({
  Image: ({ priority: _priority, ...props }: ComponentProps<'img'> & { priority?: boolean }) => <img {...props} />,
}))
beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined)
})
afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('Usage-to-cost edited walkthrough', () => {
  it('uses a short local edit with controls and descriptions, without autoplay or looping', () => {
    const { container } = render(<CrusoeCostWalkthrough />)
    const video = container.querySelector('video')!
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('preload', 'metadata')
    expect(video).not.toHaveAttribute('autoplay')
    expect(video).not.toHaveAttribute('loop')
    expect(video.querySelector('source')).toHaveAttribute('src', '/crusoe/usage-cost-highlights-trimmed.mp4')
    expect(video).toHaveAttribute('width', '1280')
    expect(video).toHaveAttribute('height', '802')
    expect(video.querySelector('track')).toHaveAttribute('kind', 'captions')
    expect(video.querySelector('track')).toHaveAttribute('src', '/crusoe/usage-cost-highlights-trimmed.vtt')
    expect(screen.getByText('A 21-second tour of the proposed design')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(6)
    expect(costWalkthroughChapters.map(chapter => chapter.time)).toEqual([0, 1, 5, 9, 13, 17])
  })

  it('pauses at a chosen timestamp for reading and still follows native playback', () => {
    const { container } = render(<CrusoeCostWalkthrough />)
    const video = container.querySelector('video')!
    Object.defineProperty(video, 'readyState', { configurable: true, value: 1 })
    fireEvent.click(screen.getByRole('button', { name: 'Show Request logs at 00:13' }))
    expect(video.currentTime).toBeCloseTo(13.08)
    expect(video.pause).toHaveBeenCalledOnce()
    expect(video.play).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Show Request logs at 00:13' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'What happened in individual requests?' })).toBeInTheDocument()
    video.currentTime = 18
    fireEvent.timeUpdate(video)
    expect(screen.getByRole('button', { name: 'Show Account activity at 00:17' })).toHaveAttribute('aria-pressed', 'true')
    expect(container.querySelector('.crusoe-cost-current-chapter')).toHaveTextContent('not proof of the cause')
  })

  it('honors a chapter choice made before metadata is available', () => {
    const { container } = render(<CrusoeCostWalkthrough />)
    const video = container.querySelector('video')!
    fireEvent.click(screen.getByRole('button', { name: 'Show Usage totals at 00:05' }))
    fireEvent.loadedMetadata(video)
    expect(video.currentTime).toBeCloseTo(5.08)
    expect(video.play).not.toHaveBeenCalled()
    expect(screen.getByRole('heading', { name: 'How much was actually used?' })).toBeInTheDocument()
  })

  it('explains the actual screen, personal design decision, and purpose at all six timestamps', () => {
    render(<CrusoeCostWalkthrough />)
    for (const [index, chapter] of costWalkthroughChapters.entries()) {
      const timestamp = `00:${String(chapter.time).padStart(2, '0')}`
      const button = screen.getByRole('button', { name: `Show ${chapter.label} at ${timestamp}` })
      fireEvent.click(button)
      const explanation = screen.getByRole('region', { name: 'Explanation of the selected video moment' })
      expect(button).toHaveAttribute('aria-controls', explanation.id)
      expect(explanation).toHaveTextContent(`${timestamp} · Step ${String(index + 1).padStart(2, '0')} of 06`)
      expect(within(explanation).getByRole('heading', { name: chapter.question })).toBeInTheDocument()
      expect([...explanation.querySelectorAll('dt')].map(label => label.textContent)).toEqual(['What you’re seeing', 'My design decision', 'Why it helps'])
      expect([...explanation.querySelectorAll('dd')].map(detail => detail.textContent)).toEqual([chapter.screen, chapter.decision, chapter.why])
    }
    expect(screen.getByText(/Select a timestamp to pause on that screen/)).toBeInTheDocument()
    expect(screen.getByText(/not a before\/after comparison, one continuous session, or proof/)).toBeInTheDocument()
  })

  it('keeps a screenshot fallback when playback is unavailable', () => {
    const { container } = render(<CrusoeCostWalkthrough />)
    fireEvent.error(container.querySelector('source')!)
    expect(screen.getByRole('status')).toHaveTextContent('All six moments are shown as screenshots below')
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/crusoe/usage-to-cost/story-screen-only/walkthrough-poster-trimmed.jpg')
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled()
  })

  it('explains the before/after before the video and pairs decisions with six full-frame screenshots', () => {
    const { container } = render(<CrusoeUsageCostStory />)
    const comparison = screen.getByLabelText('Cost investigation before and after')
    expect(within(comparison).getAllByRole('list')).toHaveLength(2)
    expect(comparison.compareDocumentPosition(screen.getByLabelText('21-second usage-to-cost walkthrough')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(container.querySelectorAll('video')).toHaveLength(1)
    expect(container.querySelectorAll('.crusoe-cost-story-shot')).toHaveLength(6)
    expect(screen.getAllByLabelText('Problem, design decision, and rationale')).toHaveLength(3)
    expect(screen.getByText('How I mapped and reviewed the investigation').closest('details')).not.toHaveAttribute('open')
    for (const image of container.querySelectorAll('.crusoe-cost-story-shot img')) {
      expect(image).toHaveAttribute('width', '1280')
      expect(image).toHaveAttribute('height', '690')
      expect(image.getAttribute('src')).toContain('/story-screen-only/')
      expect(existsSync(resolve('public', image.getAttribute('src')!.slice(1)))).toBe(true)
    }
    expect(container).not.toHaveTextContent(/usability testing|customer interviews|participants/i)
  })

  it('separates the previous-workflow summary from the redesigned screen sequence', () => {
    const { container } = render(<CrusoeUsageCostStory />)
    expect(screen.queryByLabelText('How to read the design evidence')).not.toBeInTheDocument()
    expect(screen.queryByText('All visuals below show the proposed redesign.')).not.toBeInTheDocument()
    expect(container.querySelector('.crusoe-cost-reading-guide')).toBeNull()
    const before = container.querySelector('.crusoe-cost-workflow-before')!
    expect(before).toHaveTextContent('Before · Previous workflow')
    expect(before).toHaveTextContent('not a screenshot of the old interface')
    expect(before.querySelector('img,video')).toBeNull()
    expect(container.querySelector('.crusoe-cost-workflow-after')).toHaveTextContent('After · Proposed redesign')
    expect(screen.queryByLabelText('Before, after, and design rationale')).not.toBeInTheDocument()
    const comparison = screen.getByLabelText('Cost investigation before and after')
    const process = screen.getByRole('region', { name: 'Usage → cost process' })
    expect(comparison.compareDocumentPosition(process) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(process.compareDocumentPosition(screen.getByLabelText('21-second usage-to-cost walkthrough')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('labels every screenshot and video as after, with six sequential screenshot steps', () => {
    const { container } = render(<CrusoeUsageCostStory />)
    const shots = [...container.querySelectorAll('.crusoe-cost-story-shot')]
    expect(shots).toHaveLength(6)
    for (const [index, shot] of shots.entries()) {
      expect(shot).toHaveAttribute('data-design-version', 'after')
      expect(shot.querySelector('header')).toHaveTextContent('After · Proposed redesign')
      expect(shot.querySelector('header')).toHaveTextContent(`Step ${String(index + 1).padStart(2, '0')} / 06`)
      expect(shot.querySelector('img')).toHaveAccessibleName(/^Proposed redesign:/)
      expect(shot.querySelector('header')!.compareDocumentPosition(shot.querySelector('a')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    }
    const walkthrough = screen.getByLabelText('21-second usage-to-cost walkthrough')
    expect(walkthrough).toHaveAttribute('data-design-version', 'after')
    expect(walkthrough.querySelector('header')).toHaveTextContent('After · Proposed redesign')
    expect(screen.getAllByRole('group', { name: /^After redesign:/ })).toHaveLength(3)
  })

  it('keeps the edited asset under the repository’s 10MB local-video limit', () => {
    expect(statSync(resolve('public/crusoe/usage-cost-highlights-trimmed.mp4')).size).toBeLessThan(10_000_000)
    expect(existsSync(resolve('public/crusoe/usage-cost-highlights-trimmed.vtt'))).toBe(true)
  })

  it('uses the shifted chapter boundaries after trimming three seconds from the intro', () => {
    for (const [time, chapter] of [[0, 0], [0.99, 0], [1, 1], [4.99, 1], [5, 2], [8.99, 2], [9, 3], [12.99, 3], [13, 4], [16.99, 4], [17, 5], [21, 5]]) {
      expect(costWalkthroughChapterAt(time)).toBe(chapter)
    }
  })
})
