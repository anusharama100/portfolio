import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import NeuraNoteCaseStudy from '@/portfolio/pages/case-study-neuranote'
afterEach(cleanup)
describe('Supporting NeuraNote story', () => {
  it('connects the research count to a specific iteration and limits its outcome claim', () => {
    const { container } = render(<NeuraNoteCaseStudy />)
    expect(container).toHaveTextContent('28 respondents')
    expect(container).toHaveTextContent('6 participants')
    expect(container).toHaveTextContent('Three were unsure')
    expect(container).toHaveTextContent('do not establish improved memory')
    expect(container).not.toHaveTextContent(/92%|89%|40%|2x/)
  })
  it('retains selectable final screens and reader-controlled chaptered recordings', () => {
    const { container } = render(<NeuraNoteCaseStudy />)
    fireEvent.click(screen.getByRole('button', { name: 'Concept map' }))
    expect(screen.getByRole('img', { name: 'NeuraNote Concept map final design' })).toHaveAttribute('src', '/neuranote/neuranote-5.png')
    fireEvent.click(screen.getByText('Watch the timestamped design walkthroughs'))
    const videos = [...container.querySelectorAll('video')]
    expect(videos).toHaveLength(2)
    for (const video of videos) { expect(video).toHaveAttribute('controls'); expect(video).not.toHaveAttribute('autoplay') }
  })
})
