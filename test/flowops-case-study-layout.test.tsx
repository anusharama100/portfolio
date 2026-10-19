import type { ComponentProps } from 'react'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FlowOpsCaseStudy from '@/portfolio/pages/case-study-flowops'

vi.mock('@/portfolio/compat', () => ({
  Image: ({ fill, priority, ...props }: ComponentProps<'img'> & { fill?: boolean; priority?: boolean }) => <img {...props} />,
}))
vi.mock('@/portfolio/components/EditorialCaseStudyCover', () => ({ default: () => null }))
afterEach(() => cleanup())

describe('FlowOps refined case-study layout', () => {
  it('keeps all twelve sections in the shared centered shell with numbers above titles', () => {
    const { container } = render(<FlowOpsCaseStudy />)
    const sections = [...container.querySelectorAll('.legacy-case-section')]
    expect(sections).toHaveLength(12)
    for (const [index, section] of sections.entries()) {
      const shell = section.firstElementChild!
      expect(shell).toHaveClass('flowops-section-inner')
      expect(shell.children[0]).toHaveClass('legacy-section-number')
      expect(shell.children[0]).toHaveTextContent(String(index + 1).padStart(2, '0'))
      expect(shell.children[1]).toHaveClass('legacy-section-title')
    }
    expect(screen.getByRole('group', { name: 'FlowOps design challenge' })).not.toHaveAttribute('style')
    expect(screen.queryByRole('link', { name: 'Back to Portfolio' })).not.toBeInTheDocument()
  })

  it('preserves all roles, twelve affinity notes, and separated research chapters', () => {
    const { container } = render(<FlowOpsCaseStudy />)
    expect(container.querySelector('.flowops-role-list')?.children).toHaveLength(4)
    expect(container.querySelectorAll('.flowops-affinity-grid [class*="aspect-square"]')).toHaveLength(12)
    for (const id of ['flowops-affinity', 'flowops-role-flows', 'flowops-lofi']) expect(container.querySelector(`#${id}`)).toHaveClass('flowops-chapter')
    expect(screen.getByRole('group', { name: 'Affinity map color key' }).children).toHaveLength(4)
    expect(screen.getByRole('group', { name: 'Workflow color key' }).children).toHaveLength(4)
    const wireframe = screen.getByRole('region', { name: 'FlowOps early wireframe' })
    expect(wireframe).toHaveAttribute('tabindex', '0')
    expect(wireframe.querySelector('svg')).toHaveAttribute('viewBox', '0 0 800 400')
  })

  it('keeps all eight ordered workflows, including the approver branches and recovery loop', () => {
    const { container } = render(<FlowOpsCaseStudy />)
    expect(container.querySelectorAll('.flowops-journey')).toHaveLength(8)
    for (const [title, count] of [
      ['Requester: Submit & Track', 6], ['Approver: Review & Decide', 3],
      ['Agent: Triage & Resolve', 6], ['Admin: Configure System', 5],
      ['Create → Approve → Resolve (Happy Path)', 6], ['Agent Triage & Assignment', 4],
      ['“Needs Info” Loop', 5], ['SLA At-Risk Escalation', 4],
    ] as const) {
      const journey = screen.getByRole('region', { name: title })
      expect(journey.querySelectorAll('ol > li')).toHaveLength(count)
    }
    const choices = screen.getByRole('list', { name: 'Approver decision options' })
    expect(within(choices).getAllByRole('listitem').map(item => item.textContent)).toEqual(['Approve', 'Reject', 'Need Info'])
    expect(screen.getByRole('region', { name: '“Needs Info” Loop' })).toHaveTextContent('Back to review')
    expect(screen.getByText(/These are projected outcomes/)).toBeInTheDocument()
  })

  it('shows one uncropped, full-size-linked screenshot with user-controlled selection', () => {
    render(<FlowOpsCaseStudy />)
    const gallery = screen.getByRole('region', { name: 'FlowOps final product screens' })
    expect(within(gallery).getAllByRole('img')).toHaveLength(1)
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', '/flowops1.png')
    expect(within(gallery).getByRole('img')).not.toHaveAttribute('style')
    expect(within(gallery).getByRole('link', { name: 'Open Request Dashboard at full size' })).toHaveAttribute('href', '/flowops1.png')
    fireEvent.click(within(gallery).getByRole('button', { name: 'Next FlowOps screen' }))
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', '/flowops2.png')
    expect(within(gallery).getByRole('button', { name: '02 Request Detail View' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(within(gallery).getByRole('button', { name: '04 Workflow Management' }))
    expect(within(gallery).getByRole('img')).toHaveAttribute('height', '1412')
    fireEvent.keyDown(gallery, { key: 'ArrowRight' })
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', '/flowops1.png')
    fireEvent.keyDown(gallery, { key: 'ArrowLeft' })
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', '/flowops4.png')
    fireEvent.click(within(gallery).getByRole('button', { name: 'Previous FlowOps screen' }))
    expect(within(gallery).getByRole('img')).toHaveAttribute('src', '/flowops3.png')
  })
})
