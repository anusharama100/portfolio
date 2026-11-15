import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import HabitatCaseStudy from '@/portfolio/pages/case-study-habitat'

afterEach(cleanup)

describe('HABITat case-study exploration', () => {
  it('shows one coherent journey at a time when the reader changes their selection', () => {
    render(<HabitatCaseStudy />)
    const choices = screen.getByRole('group', { name: 'Choose a HABITat journey' })
    fireEvent.click(within(choices).getByRole('button', { name: /Create a habit/ }))
    const createFlow = screen.getByRole('list', { name: 'Create a habit steps' })
    expect(within(createFlow).getByText('Set frequency')).toBeInTheDocument()
    expect(within(createFlow).getByText('Save')).toBeInTheDocument()
    expect(screen.queryByRole('list', { name: 'Onboarding steps' })).not.toBeInTheDocument()

    fireEvent.click(within(choices).getByRole('button', { name: /Shared habits/ }))
    expect(screen.getByRole('list', { name: 'Shared habits steps' })).toHaveTextContent('Send reminder')
    expect(within(choices).getByRole('button', { name: /Shared habits/ })).toHaveAttribute('aria-pressed', 'true')
    expect(within(choices).getByRole('button', { name: /Create a habit/ })).toHaveAttribute('aria-pressed', 'false')
  })

  it('keeps the selected final image, explanation, and full-size destination together', () => {
    render(<HabitatCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: /Shared progress/ }))
    const panel = screen.getByRole('region', { name: /Shared progress/ })
    expect(within(panel).getByRole('img')).toHaveAttribute('src', '/habitat/shared-habits.jpeg')
    expect(within(panel).getByRole('heading', { name: 'Show both sides of a shared routine.' })).toBeInTheDocument()
    expect(within(panel).getByRole('link', { name: 'Open full image' })).toHaveAttribute('href', '/habitat/shared-habits.jpeg')
  })

  it('lets the reader start the walkthrough without autoplay or an eager video download', () => {
    const { container } = render(<HabitatCaseStudy />)
    const video = container.querySelector('video')!
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('preload', 'none')
    expect(video).not.toHaveAttribute('autoplay')
    expect(video).not.toHaveAttribute('loop')
  })
})
