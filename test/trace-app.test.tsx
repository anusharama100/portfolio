import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TraceApp from '@/portfolio/trace/TraceApp'
import { sampleWorkspace } from '@/portfolio/trace/seed'
import { loadWorkspace, saveWorkspace } from '@/portfolio/trace/storage'
vi.mock('@/portfolio/trace/storage', () => ({loadWorkspace:vi.fn(),saveWorkspace:vi.fn(),download:vi.fn(),evidenceCsv:vi.fn()}))
beforeEach(() => { vi.mocked(loadWorkspace).mockResolvedValue(sampleWorkspace()); vi.mocked(saveWorkspace).mockResolvedValue(undefined) })
afterEach(() => { cleanup(); vi.resetAllMocks() })
describe('Trace persistence feedback', () => {
  it('does not overwrite a workspace that cannot be read', async () => {
    vi.mocked(loadWorkspace).mockRejectedValue(new Error('Stored data is invalid.'))
    render(<TraceApp />)
    await screen.findByRole('heading', {name:'Your workspace could not be opened.'})
    expect(saveWorkspace).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', {name:'Use a temporary demo'}))
    await screen.findByRole('heading',{name:'Every finding starts somewhere.'})
    expect(screen.getByRole('alert')).toHaveTextContent('This session is not saved')
    expect(saveWorkspace).not.toHaveBeenCalled()
  })
  it('shows a failed save and retries without discarding the on-screen workspace', async () => {
    vi.mocked(saveWorkspace).mockRejectedValueOnce(new Error('Quota exceeded'))
    render(<TraceApp />)
    await screen.findByRole('alert')
    expect(screen.getByRole('alert')).toHaveTextContent('Changes could not be saved')
    expect(screen.getByRole('heading',{name:'The first action needs an explanation'})).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button',{name:'Retry'}))
    await waitFor(()=>expect(screen.queryByRole('alert')).toBeNull())
    expect(saveWorkspace).toHaveBeenCalledTimes(2)
  })
})
