import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Image } from '@/portfolio/compat'

afterEach(cleanup)

it('reserves a screenshot’s natural proportions before its lazy-loaded image arrives', () => {
  render(<Image src="/images/crusoe/current-modal-empty.png" alt="Full modal screenshot" width={583} height={369} />)
  const image = screen.getByRole('img', { name: 'Full modal screenshot' })
  expect(image.style.aspectRatio).toBe('auto 583 / 369')
  expect(image).toHaveAttribute('loading', 'lazy')
})

it('preserves explicit styling and fill-based product mockup viewports', () => {
  const { rerender } = render(<Image src="/screen.png" alt="Product screen" width={800} height={600} style={{ aspectRatio: '16 / 10' }} />)
  expect(screen.getByRole('img').style.aspectRatio).toBe('16 / 10')
  rerender(<Image src="/screen.png" alt="Product screen" fill />)
  expect(screen.getByRole('img')).toHaveStyle({ position: 'absolute', width: '100%', height: '100%' })
})
