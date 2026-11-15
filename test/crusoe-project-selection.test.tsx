import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CrusoeCaseStudy from '@/portfolio/pages/case-study-crusoe'

vi.mock('@/portfolio/compat', () => ({ Link: (props: Record<string, unknown>) => <a {...props} />, Image: ({fill: _f, priority: _p, ...props}: Record<string, unknown>) => <img {...props} /> }))
beforeEach(() => { window.history.replaceState({}, '', '/case-study/crusoe/'); vi.stubGlobal('IntersectionObserver', class { observe() {} unobserve() {} disconnect() {} }) })
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })
const projects = [['01', 'Empty-state system', 'Empty-state system project', 'empty-state-system'], ['02', 'Heuristic evaluation', 'Heuristic evaluation project', 'heuristic-evaluation'], ['03', 'Usage → cost', 'Usage-to-cost project', 'usage-to-cost']] as const
describe('Crusoe project selection', () => {
  it('starts on the primary story and exposes only one selected project', () => {
    render(<CrusoeCaseStudy />)
    expect(screen.getByRole('heading', { name: 'A first step for customers starting with nothing.' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^Read project/ })).toHaveLength(3)
    for (const [number, name, panel, hash] of projects) {
      const button = screen.getByRole('button', { name: `Read project ${number}: ${name}` })
      fireEvent.click(button)
      expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
      expect(screen.getByRole('tabpanel', { name: panel })).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-pressed', 'true')
      expect(window.location.hash).toBe(`#${hash}`)
    }
  })
  it('does not scroll when switching or reselecting a project', async () => {
    const scroll = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    render(<CrusoeCaseStudy />)
    for (const [number, name] of [...projects, projects[0]]) {
      fireEvent.click(screen.getByRole('button', { name: `Read project ${number}: ${name}` }))
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
      expect(scroll).not.toHaveBeenCalled()
    }
  })
  it('honors incoming project and subsection links', async () => {
    const scroll = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    window.history.replaceState({}, '', '/case-study/crusoe/#usage-to-cost')
    render(<CrusoeCaseStudy />)
    expect(screen.getByRole('tabpanel', { name: 'Usage-to-cost project' })).toBeInTheDocument()
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' }))
    cleanup()
    window.history.replaceState({}, '', '/case-study/crusoe/#crusoe-he-method-title-section')
    render(<CrusoeCaseStudy />)
    expect(screen.getByRole('tabpanel', { name: 'Heuristic evaluation project' })).toBeInTheDocument()
  })
})
