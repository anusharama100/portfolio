import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TraceApp from '@/portfolio/trace/TraceApp'
import { sampleWorkspace } from '@/portfolio/trace/seed'
import { loadWorkspace, saveWorkspace } from '@/portfolio/trace/storage'
vi.mock('@/portfolio/trace/storage', () => ({
  loadWorkspace: vi.fn(),
  saveWorkspace: vi.fn(),
  download: vi.fn(),
  evidenceCsv: vi.fn(),
}))
beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.setAttribute('open', '')
    },
  })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.removeAttribute('open')
    },
  })
  vi.mocked(loadWorkspace).mockResolvedValue(sampleWorkspace())
  vi.mocked(saveWorkspace).mockResolvedValue(undefined)
})
afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})
describe('Trace persistence feedback', () => {
  it('does not overwrite a workspace that cannot be read', async () => {
    vi.mocked(loadWorkspace).mockRejectedValue(
      new Error('Stored data is invalid.'),
    )
    render(<TraceApp />)
    await screen.findByRole('heading', {
      name: 'Your workspace could not be opened.',
    })
    expect(saveWorkspace).not.toHaveBeenCalled()
    fireEvent.click(
      screen.getByRole('button', { name: 'Use a temporary demo' }),
    )
    await screen.findByRole('heading', { name: 'Evidence library', level: 1 })
    expect(screen.getByRole('alert')).toHaveTextContent(
      'This session is not saved',
    )
    expect(saveWorkspace).not.toHaveBeenCalled()
  })
  it('shows a failed save and retries without discarding the on-screen workspace', async () => {
    vi.mocked(saveWorkspace).mockRejectedValueOnce(new Error('Quota exceeded'))
    render(<TraceApp />)
    await screen.findByRole('alert')
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Changes could not be saved',
    )
    expect(
      screen.getByRole('heading', {
        name: 'The first action needs an explanation',
      }),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(screen.queryByRole('alert')).toBeNull())
    expect(saveWorkspace).toHaveBeenCalledTimes(2)
  })
  it('turns selected filtered evidence into a ready insight without losing the references', async () => {
    render(<TraceApp />)
    await screen.findByRole('heading', { name: 'Evidence library', level: 1 })
    fireEvent.click(screen.getByRole('checkbox', { name: 'Unlinked only' }))
    await waitFor(() =>
      expect(
        screen.queryByRole('heading', {
          name: 'The first action needs an explanation',
        }),
      ).toBeNull(),
    )
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Select all visible observations' }),
    )
    fireEvent.click(
      screen.getByRole('button', { name: /Create insight from selection/ }),
    )
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), {
      target: { value: 'Preserve repeated choices' },
    })
    fireEvent.change(
      screen.getByRole('textbox', { name: 'What does the evidence suggest?' }),
      { target: { value: 'Going back should preserve setup choices.' } },
    )
    fireEvent.change(screen.getByRole('combobox', { name: 'Status' }), {
      target: { value: 'ready' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save insight' }))
    await screen.findByRole('heading', { name: 'Preserve repeated choices' })
    await waitFor(() =>
      expect(
        vi
          .mocked(saveWorkspace)
          .mock.calls.at(-1)?.[0]
          .insights.find((i) => i.title === 'Preserve repeated choices'),
      ).toMatchObject({ evidenceIds: ['e8'], status: 'ready' }),
    )
  })

  it('flags changed evidence and filters the overview action to decisions needing review', async () => {
    render(<TraceApp />)
    const original = await screen.findByRole('heading', {
      name: 'The first action needs an explanation',
    })
    fireEvent.click(original.closest('button')!)
    fireEvent.click(screen.getByRole('button', { name: 'Edit observation' }))
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Observation or quote' }),
      { target: { value: 'The revised observation adds a requirement.' } },
    )
    fireEvent.click(screen.getByRole('button', { name: 'Save observation' }))
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    fireEvent.click(screen.getByRole('button', { name: 'Overview' }))
    fireEvent.click(
      screen.getByRole('button', { name: /Decisions to revisit/ }),
    )
    expect(
      screen.getByRole('combobox', { name: 'Filter by status' }),
    ).toHaveValue('review')
    expect(
      screen.getByRole('button', {
        name: /Put requirements beside the first action/,
      }),
    ).toHaveTextContent('Needs review')
    expect(
      screen.queryByText('Offer contextual help in the workspace'),
    ).toBeNull()
  })

  it('preserves selection when switching the evidence view and sorting', async () => {
    render(<TraceApp />)
    await screen.findByRole('heading', { name: 'Evidence library', level: 1 })
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: 'Select Requirements appear too late',
      }),
    )
    fireEvent.click(screen.getByRole('button', { name: 'Card view' }))
    fireEvent.change(
      screen.getByRole('combobox', { name: 'Sort observations' }),
      { target: { value: 'title' } },
    )
    expect(
      screen.getByRole('checkbox', {
        name: 'Select Requirements appear too late',
      }),
    ).toBeChecked()
    expect(screen.getByRole('button', { name: 'Card view' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    const observations = screen.getAllByRole('article')
    expect(observations[0]).toHaveTextContent('A status needs a next step')
  })

  it('blocks accepting a decision without supporting ready insights', async () => {
    render(<TraceApp />)
    await screen.findByRole('heading', { name: 'Evidence library', level: 1 })
    fireEvent.click(screen.getByRole('button', { name: 'Decisions 2' }))
    fireEvent.click(screen.getByRole('button', { name: 'New decision' }))
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), {
      target: { value: 'An unsupported choice' },
    })
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Why this decision?' }),
      { target: { value: 'This choice has no evidence yet.' } },
    )
    fireEvent.change(screen.getByRole('combobox', { name: 'Status' }), {
      target: { value: 'accepted' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save decision' }))
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Link at least one ready insight',
    )
    expect(
      vi.mocked(saveWorkspace).mock.calls.at(-1)?.[0].decisions,
    ).toHaveLength(2)
  })
})
