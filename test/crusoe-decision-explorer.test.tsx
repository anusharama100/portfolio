import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CrusoeDecisionExplorer from '@/portfolio/components/CrusoeDecisionExplorer'
import { crusoeDesignDecisions } from '@/portfolio/components/crusoeDesignDecisions'

afterEach(() => { cleanup(); vi.restoreAllMocks() })

describe('Crusoe decision explorer', () => {
  it('starts with the original evidence and shows the rationale and implementation checks', () => {
    render(<CrusoeDecisionExplorer decisions={crusoeDesignDecisions} />)
    expect(screen.getByRole('button', { name: 'Explore Safer API-key defaults' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('img', { name: 'Safer API-key defaults: Original problem' })).toHaveAttribute('src', '/images/crusoe/figma/api-create-before.png')
    expect(screen.getByText('Why this choice')).toBeInTheDocument()
    expect(screen.getByText('The constraint / tradeoff')).toBeInTheDocument()
    expect(screen.getByText('Implementation / QA checks')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous evidence' })).toBeDisabled()
    expect(screen.getByText('Audit evidence')).toBeInTheDocument()
  })

  it('steps from the problem through the design and engineering refinement without autoplay', () => {
    render(<CrusoeDecisionExplorer decisions={crusoeDesignDecisions} />)
    fireEvent.click(screen.getByRole('button', { name: 'Next evidence' }))
    expect(screen.getByRole('img', { name: 'Safer API-key defaults: Design direction' })).toBeInTheDocument()
    expect(screen.getByText('Proposed redesign')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next evidence' }))
    expect(screen.getByRole('img', { name: 'Safer API-key defaults: Engineering refinement' })).toHaveAttribute('src', '/images/crusoe/figma/api-create-refined.png')
    expect(screen.getByRole('button', { name: 'Next evidence' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Show Original problem' }))
    expect(screen.getByRole('button', { name: 'Previous evidence' })).toBeDisabled()
  })

  it('resets evidence on a new decision, announces the selection, and does not scroll', () => {
    const scroll = vi.spyOn(window, 'scrollTo')
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    render(<CrusoeDecisionExplorer decisions={crusoeDesignDecisions} />)
    fireEvent.click(screen.getByRole('button', { name: 'Show Engineering refinement' }))
    fireEvent.click(screen.getByRole('button', { name: 'Explore Explain a cost change' }))
    expect(screen.getByRole('region', { name: 'Explain a cost change design reasoning' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Inspect the breakdown, evidence 1 of 2')
    expect(screen.getByRole('button', { name: 'Previous evidence' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'Explore Recover without a detour' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next evidence' }))
    expect(screen.getByText('Proposed interaction')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Recover without a detour: In-place explanation' })).toBeInTheDocument()
    expect(scroll).not.toHaveBeenCalled()
    expect(scrollIntoView).not.toHaveBeenCalled()
  })
})
