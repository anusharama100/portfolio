import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import ViewportVideo from '@/portfolio/components/ViewportVideo'

beforeEach(() => vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue())
afterEach(() => { cleanup(); vi.restoreAllMocks() })

it('shows a useful screenshot and explanation when a hosted preview cannot load', () => {
  const { container } = render(<ViewportVideo sources={[{ src: '/hosted-preview.mp4', type: 'video/mp4' }]} ariaLabel="Product interaction" poster="/product.png" />)
  fireEvent.error(container.querySelector('source')!)
  expect(screen.getByRole('img', { name: 'Product interaction screenshot' })).toHaveAttribute('src', '/product.png')
  expect(screen.getByText('Video unavailable. Product screenshot shown instead.')).toBeInTheDocument()
})

it('tries the remaining source before falling back', () => {
  const { container } = render(<ViewportVideo sources={[{ src: '/preview.mp4', type: 'video/mp4' }, { src: '/preview.webm', type: 'video/webm' }]} />)
  fireEvent.error(container.querySelector('source')!)
  expect(container.querySelector('video')).toBeInTheDocument()
  expect(screen.queryByText(/unavailable/)).not.toBeInTheDocument()
})
