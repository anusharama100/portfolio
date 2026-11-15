import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import NexusCaseStudy from '@/portfolio/pages/case-study-nexus'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'

vi.mock('@/portfolio/compat', () => ({ Link: (props: Record<string, unknown>) => <a {...props} />, Image: ({fill: _f, priority: _p, ...props}: Record<string, unknown>) => <img {...props} /> }))
afterEach(cleanup)
describe('Concise Nexus case study', () => {
  it('keeps the survey scope and three decisions without unsupported outcome claims', () => {
    const { container } = render(<NexusCaseStudy />)
    expect(container.querySelectorAll('.refined-chapter')).toHaveLength(3)
    expect(container.querySelectorAll('.refined-decisions article')).toHaveLength(3)
    expect(screen.getByText('48 survey respondents')).toBeInTheDocument()
    expect(container).toHaveTextContent('Agreement between models is not proof of correctness')
    expect(container).not.toHaveTextContent(/40%|85%|10,000|10k|2x/)
  })
  it('shows relevant captured UI and removes unrelated Figma exports', () => {
    const { container } = render(<NexusCaseStudy />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/narbl/narbl-9.png?v=5')
    expect(image.closest('a')).toHaveAttribute('href', image.getAttribute('src'))
    expect(container.querySelector('img[src*="figma-iteration"]')).toBeNull()
  })
  it('preserves the shared introduction and a working next-project destination', () => {
    const { container } = render(<CaseStudyExperience slug="nexus"><NexusCaseStudy /></CaseStudyExperience>)
    expect(container.querySelector('.study-meta')).toHaveTextContent('48 survey respondents')
    expect(container.querySelector('.study-project-actions')).toBeNull()
    expect(container.querySelector('.study-next')).toHaveAttribute('href', '/case-study/neuranote')
  })
})
