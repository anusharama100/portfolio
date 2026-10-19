import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import NeuraWalkthroughVideo, { neuraChapterAt, neuraTimestamp } from '@/portfolio/components/NeuraWalkthroughVideo'
import walkthroughs from '@/portfolio/components/neuraWalkthroughs.json'

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined)
})
afterEach(() => { cleanup(); vi.restoreAllMocks() })
const props = { label: 'Product workflow', ...walkthroughs.workflow, sources: [{ src: walkthroughs.workflow.src, type: 'video/mp4' }] }

describe('NeuraNote timestamped walkthroughs', () => {
  it('keeps both sets of chapters ordered inside the original recording duration', () => {
    for (const spec of Object.values(walkthroughs)) {
      expect(spec.chapters).toHaveLength(6)
      expect(spec.chapters[0].time).toBe(0)
      expect(new Set(spec.chapters.map(c => c.time)).size).toBe(6)
      spec.chapters.forEach((chapter, index) => {
        expect(chapter.time).toBeLessThan(spec.duration)
        if (index > 0) expect(chapter.time).toBeGreaterThan(spec.chapters[index - 1].time)
      })
    }
    expect(neuraTimestamp(5)).toBe('00:05')
    expect(neuraTimestamp(61)).toBe('01:01')
    expect(neuraChapterAt(walkthroughs.workflow.chapters, 26.9)).toBe(4)
    expect(neuraChapterAt(walkthroughs.workflow.chapters, 27)).toBe(5)
  })

  it('seeks and plays the selected chapter after metadata is available', () => {
    const { container } = render(<NeuraWalkthroughVideo {...props} />)
    const video = container.querySelector('video')!
    Object.defineProperty(video, 'readyState', { configurable: true, value: 1 })
    Object.defineProperty(video, 'duration', { configurable: true, value: 33.4 })
    fireEvent.click(screen.getByRole('button', { name: 'Watch Concept map at 00:19' }))
    expect(video.currentTime).toBe(19)
    expect(video.play).toHaveBeenCalledOnce()
    expect(screen.getByRole('button', { name: 'Watch Concept map at 00:19' })).toHaveAttribute('aria-pressed', 'true')
    expect(container.querySelector('.neura-video-current')).toHaveTextContent('inspect an individual node')
    expect(video.querySelector('track')).toHaveAttribute('src', walkthroughs.workflow.captions)
  })

  it('applies the latest pending chapter once metadata loads', () => {
    const { container } = render(<NeuraWalkthroughVideo {...props} />)
    const video = container.querySelector('video')!
    Object.defineProperty(video, 'readyState', { configurable: true, value: 0 })
    fireEvent.click(screen.getByRole('button', { name: 'Watch AI summary at 00:05' }))
    fireEvent.click(screen.getByRole('button', { name: 'Watch Start review at 00:23' }))
    expect(video.currentTime).toBe(0)
    Object.defineProperty(video, 'readyState', { configurable: true, value: 1 })
    fireEvent.loadedMetadata(video)
    expect(video.currentTime).toBe(23)
    video.currentTime = 28
    fireEvent.timeUpdate(video)
    expect(screen.getByRole('button', { name: 'Watch Practice recall at 00:27' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('keeps playback user-controlled and stops it when the player unmounts', async () => {
    const { container, unmount } = render(<NeuraWalkthroughVideo {...props} />)
    const video = container.querySelector('video')!
    expect(video).toHaveAttribute('controls')
    expect(video).not.toHaveAttribute('autoplay')
    expect(video).not.toHaveAttribute('loop')
    Object.defineProperty(video, 'paused', { configurable: true, value: false })
    await act(async () => unmount())
    expect(video.pause).toHaveBeenCalledOnce()
  })

  it('disables timestamp controls if the recording fails', () => {
    const { container } = render(<NeuraWalkthroughVideo {...props} />)
    fireEvent.error(container.querySelector('video')!)
    expect(screen.getByRole('group', { name: 'Product workflow' })).toHaveTextContent('currently unavailable')
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled()
  })
})
