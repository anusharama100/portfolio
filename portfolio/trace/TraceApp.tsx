'use client'

import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import {
  acceptDecision,
  evidenceForDecision,
  needsReview,
  newId,
  removeRecord,
  searchEvidence,
  timestamp,
  validateWorkspace,
  type Decision,
  type Evidence,
  type Insight,
  type RecordKind,
  type Workspace,
} from './domain'
import { sampleWorkspace } from './seed'
import { download, evidenceCsv, loadWorkspace, saveWorkspace } from './storage'
import EvidenceLibrary, {
  type EvidenceLayout,
  type EvidenceSort,
} from './EvidenceLibrary'
import StudyOverview from './StudyOverview'
import {
  BrandMark,
  Dialog,
  Empty,
  Icon,
  Pill,
  SourceButton,
  recordReference,
} from './TracePrimitives'
import './trace.css'

type View = RecordKind | 'overview'
type Modal =
  | { type: 'edit'; kind: RecordKind; id?: string; evidenceIds?: string[] }
  | { type: 'detail'; kind: RecordKind; id: string }
  | { type: 'delete'; kind: RecordKind; id: string }
  | { type: 'study' | 'import' | 'reset' | 'search' }
const names = {
  evidence: 'observation',
  insights: 'insight',
  decisions: 'decision',
}
const recordTitle = (w: Workspace, kind: RecordKind, id: string) =>
  w[kind].find((r) => r.id === id)?.title || 'Untitled'

export default function TraceApp() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [bootError, setBootError] = useState('')
  const [temporary, setTemporary] = useState(false)
  const [saveState, setSaveState] = useState<'saving' | 'saved' | 'error'>(
    'saved',
  )
  const [studyId, setStudyId] = useState('study-sample')
  const [view, setView] = useState<View>('evidence')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [tag, setTag] = useState('')
  const [unlinked, setUnlinked] = useState(false)
  const [layout, setLayout] = useState<EvidenceLayout>('list')
  const [sort, setSort] = useState<EvidenceSort>('newest')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [modal, setModal] = useState<Modal | null>(null)
  const [history, setHistory] = useState<Workspace[]>([])
  const [notice, setNotice] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const importFile = useRef<Workspace | null>(null)
  const [importMessage, setImportMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [commandQuery, setCommandQuery] = useState('')

  const boot = async () => {
    setBootError('')
    try {
      const w = (await loadWorkspace()) || sampleWorkspace()
      setStudyId(w.studies[0].id)
      setWorkspace(w)
    } catch (e) {
      setBootError(
        e instanceof Error
          ? e.message
          : 'The saved workspace could not be opened.',
      )
    }
  }
  useEffect(() => {
    void boot()
  }, [])
  useEffect(() => {
    if (!workspace || temporary) return
    let cancelled = false
    setSaveState('saving')
    void saveWorkspace(workspace)
      .then(() => {
        if (!cancelled) setSaveState('saved')
      })
      .catch(() => {
        if (!cancelled) setSaveState('error')
      })
    return () => {
      cancelled = true
    }
  }, [workspace, temporary])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const typing =
        e.target instanceof HTMLElement &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
          e.target.isContentEditable)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (!modal || modal.type === 'search') {
          setCommandQuery('')
          setModal({ type: 'search' })
        }
      }
      if (e.key === 'Escape') setMobileNav(false)
      if (
        !modal &&
        !typing &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        e.key.toLowerCase() === 'n'
      ) {
        e.preventDefault()
        setFormError('')
        setModal({ type: 'edit', kind: 'evidence' })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modal])
  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 6500)
    return () => clearTimeout(timer)
  }, [notice])

  const change = (next: Workspace, message: string) => {
    const valid = validateWorkspace(next)
    if (workspace) setHistory((h) => [...h.slice(-9), workspace])
    setWorkspace(valid)
    setNotice(message)
    setSelected([])
  }
  const undo = () => {
    const previous = history.at(-1)
    if (!previous) return
    setWorkspace(previous)
    setHistory((h) => h.slice(0, -1))
    setNotice('Change undone.')
    setSelected([])
  }
  const open = (next: Modal) => {
    setMobileNav(false)
    setFormError('')
    setImportMessage('')
    importFile.current = null
    setModal(next)
  }
  const go = (next: View) => {
    setView(next)
    setQuery('')
    setSelected([])
    setTag('')
    setUnlinked(false)
    setStatusFilter('')
    setMobileNav(false)
  }
  const exportWorkspace = () => {
    if (workspace)
      download('trace-workspace.json', JSON.stringify(workspace, null, 2))
  }

  if (!workspace)
    return (
      <main className="trace-app trace-boot">
        <div className="trace-brand">
          <BrandMark />
          Trace
        </div>
        {bootError ? (
          <>
            <h1>Your workspace could not be opened.</h1>
            <p>{bootError}</p>
            <div>
              <button className="trace-primary" onClick={() => void boot()}>
                Retry
              </button>
              <button
                className="trace-secondary"
                onClick={() => {
                  setTemporary(true)
                  setWorkspace(sampleWorkspace())
                  setBootError('')
                }}
              >
                Use a temporary demo
              </button>
            </div>
            <p>Your saved workspace will not be overwritten.</p>
          </>
        ) : (
          <>
            <h1>Opening your workspace</h1>
            <p>Getting your evidence and decisions ready.</p>
          </>
        )}
      </main>
    )
  const w = workspace
  const study = w.studies.find((s) => s.id === studyId) || w.studies[0]
  const currentStudyId = study.id
  const observations = w.evidence.filter((e) => e.studyId === currentStudyId)
  const insights = w.insights.filter((i) => i.studyId === currentStudyId)
  const decisions = w.decisions.filter((d) => d.studyId === currentStudyId)
  const tags = [...new Set(observations.flatMap((e) => e.tags))].sort()
  const linkedEvidence = new Set(insights.flatMap((i) => i.evidenceIds))
  const visibleEvidence = searchEvidence(
    w,
    currentStudyId,
    deferredQuery,
    tag,
    unlinked,
  ).sort((a, b) =>
    sort === 'title'
      ? a.title.localeCompare(b.title)
      : sort === 'oldest'
        ? Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
        : Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  )
  const matching = (s: string) =>
    s.toLocaleLowerCase().includes(deferredQuery.toLocaleLowerCase().trim())
  const shownInsights = insights.filter(
    (i) =>
      matching(i.title + ' ' + i.summary) &&
      (!statusFilter || i.status === statusFilter),
  )
  const shownDecisions = decisions.filter(
    (d) =>
      matching(d.title + ' ' + d.rationale) &&
      (!statusFilter ||
        (statusFilter === 'review'
          ? needsReview(w, d)
          : d.status === statusFilter)),
  )
  const needsAttention = decisions.filter((d) => needsReview(w, d))
  const counts = {
    evidence: observations.length,
    insights: insights.length,
    decisions: decisions.length,
    overview: undefined,
  }
  const edited =
    modal?.type === 'edit' && modal.id
      ? w[modal.kind].find((r) => r.id === modal.id)
      : undefined

  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (modal?.type !== 'edit') return
    const f = new FormData(event.currentTarget)
    const now = timestamp(),
      id = modal.id || newId()
    const common = {
      id,
      studyId: currentStudyId,
      title: String(f.get('title') || ''),
      createdAt: edited?.createdAt || now,
      updatedAt: now,
    }
    try {
      let next: Workspace = { ...w, updatedAt: now }
      if (modal.kind === 'evidence') {
        const e: Evidence = {
          ...common,
          body: String(f.get('body') || ''),
          source: String(f.get('source') || ''),
          tags: String(f.get('tags') || '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }
        next = {
          ...next,
          evidence: [...w.evidence.filter((r) => r.id !== id), e],
        }
      } else if (modal.kind === 'insights') {
        const i: Insight = {
          ...common,
          summary: String(f.get('body') || ''),
          evidenceIds: f.getAll('reference').map(String),
          status: f.get('status') as Insight['status'],
        }
        next = {
          ...next,
          insights: [...w.insights.filter((r) => r.id !== id), i],
        }
      } else {
        const d: Decision = {
          ...common,
          rationale: String(f.get('body') || ''),
          alternative: String(f.get('alternative') || ''),
          insightIds: f.getAll('reference').map(String),
          status: 'proposed',
        }
        next = {
          ...next,
          decisions: [...w.decisions.filter((r) => r.id !== id), d],
        }
        if (f.get('status') === 'accepted') next = acceptDecision(next, id, now)
      }
      change(
        next,
        names[modal.kind][0].toUpperCase() +
          names[modal.kind].slice(1) +
          ' saved.',
      )
      go(modal.kind)
      setModal({ type: 'detail', kind: modal.kind, id })
    } catch (e) {
      setFormError(
        e instanceof Error ? e.message : 'Check the fields and try again.',
      )
    }
  }
  const referenceIds =
    modal?.type === 'edit'
      ? modal.kind === 'insights'
        ? (edited as Insight | undefined)?.evidenceIds ||
          modal.evidenceIds ||
          []
        : (edited as Decision | undefined)?.insightIds || []
      : []
  const commandResults = [
    ...observations.map((r) => ({
      kind: 'evidence' as const,
      id: r.id,
      title: r.title,
      searchText:
        r.title + ' ' + r.body + ' ' + r.source + ' ' + r.tags.join(' '),
    })),
    ...insights.map((r) => ({
      kind: 'insights' as const,
      id: r.id,
      title: r.title,
      searchText: r.title + ' ' + r.summary,
    })),
    ...decisions.map((r) => ({
      kind: 'decisions' as const,
      id: r.id,
      title: r.title,
      searchText: r.title + ' ' + r.rationale,
    })),
  ]
    .filter((r) =>
      commandQuery
        .toLocaleLowerCase()
        .trim()
        .split(/\s+/)
        .every((word) =>
          (r.searchText + ' ' + recordReference(r.kind, r.id))
            .toLocaleLowerCase()
            .includes(word),
        ),
    )
    .slice(0, 12)
  const detailRecord =
    modal?.type === 'detail'
      ? w[modal.kind].find((r) => r.id === modal.id)
      : undefined

  const viewTitle = {
    overview: 'Study overview',
    evidence: 'Evidence library',
    insights: 'Insights',
    decisions: 'Decisions',
  }[view]
  const viewDescription = {
    overview: 'A record of what you collected, learned, and decided.',
    evidence: 'Keep each observation connected to the source it came from.',
    insights:
      'Turn observations into a finding. Keep the supporting evidence attached.',
    decisions:
      'Document a choice, its alternative, and the evidence behind it.',
  }[view]
  const resultCount =
    view === 'evidence'
      ? visibleEvidence.length
      : view === 'insights'
        ? shownInsights.length
        : shownDecisions.length
  const clearFilters = () => {
    setQuery('')
    setTag('')
    setUnlinked(false)
    setStatusFilter('')
  }

  return (
    <div className="trace-app">
      <aside
        className={'trace-sidebar' + (mobileNav ? ' is-open' : '')}
        aria-label="Workspace navigation"
        id="trace-workspace-nav"
      >
        <a className="trace-brand" href="/lab/trace/">
          <BrandMark />
          <span>
            Trace<small>Research workspace</small>
          </span>
        </a>
        <div className="trace-study-picker">
          <label htmlFor="trace-study">Current study</label>
          <select
            id="trace-study"
            value={currentStudyId}
            onChange={(e) => {
              setStudyId(e.target.value)
              go('evidence')
            }}
          >
            {w.studies.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          <button onClick={() => open({ type: 'study' })}>
            <Icon name="plus" />
            New study
          </button>
        </div>
        <nav aria-label="Study views">
          {(['overview', 'evidence', 'insights', 'decisions'] as View[]).map(
            (item) => (
              <button
                key={item}
                className={view === item ? 'is-active' : ''}
                aria-current={view === item ? 'page' : undefined}
                onClick={() => go(item)}
              >
                <Icon name={item} />
                <span>
                  {item === 'evidence'
                    ? 'Evidence library'
                    : item === 'overview'
                      ? 'Overview'
                      : item[0].toUpperCase() + item.slice(1)}
                </span>
                {counts[item] !== undefined && <small>{counts[item]}</small>}
              </button>
            ),
          )}
        </nav>
        <div className="trace-sidebar-note">
          <span className="trace-live-dot" />
          <div>
            <strong>Local workspace</strong>
            <p>Saved in this browser. Export a copy to keep a backup.</p>
          </div>
        </div>
        <div className="trace-sidebar-bottom">
          <div>
            <button onClick={exportWorkspace}>
              <Icon name="export" />
              Export workspace
            </button>
            <button onClick={() => open({ type: 'import' })}>
              Import a workspace
            </button>
          </div>
          <a href="/case-study/trace/">
            Design &amp; engineering <span>↗</span>
          </a>
          <a href="/">
            Anusha’s portfolio <span>↗</span>
          </a>
        </div>
      </aside>
      {mobileNav && (
        <button
          className="trace-nav-scrim"
          aria-label="Close workspace menu"
          onClick={() => setMobileNav(false)}
        />
      )}
      <div className="trace-shell">
        <header className="trace-topbar">
          <button
            className="trace-icon-button trace-mobile-menu"
            aria-label="Toggle workspace menu"
            aria-expanded={mobileNav}
            aria-controls="trace-workspace-nav"
            onClick={() => setMobileNav((v) => !v)}
          >
            <Icon name="menu" />
          </button>
          <div className="trace-breadcrumb">
            Studies <span>/</span>
            <strong>{study.title}</strong>
          </div>
          <button
            className="trace-search-trigger"
            aria-label="Search study"
            title="Search this study (⌘ / Ctrl K)"
            onClick={() => {
              setCommandQuery('')
              open({ type: 'search' })
            }}
          >
            <Icon name="search" />
            <span>Search study</span>
            <kbd>⌘ K</kbd>
          </button>
          <a className="trace-about-link" href="/case-study/trace/">
            About this build <span>↗</span>
          </a>
        </header>
        <main className="trace-main" id="trace-main">
          {currentStudyId === 'study-sample' && (
            <div className="trace-study-context">
              <span className="trace-sample-label">Sample study</span>
              <p>
                All observations are fictional. Everything here is editable.
              </p>
              <button onClick={() => open({ type: 'study' })}>
                Start a study <Icon name="arrow" />
              </button>
            </div>
          )}
          <div className="trace-page-heading">
            <div>
              <h1>{viewTitle}</h1>
              <p>{viewDescription}</p>
            </div>
            {view !== 'overview' && (
              <button
                className="trace-primary"
                onClick={() => open({ type: 'edit', kind: view })}
              >
                <Icon name="plus" />
                {view === 'evidence' ? 'Add observation' : 'New ' + names[view]}
              </button>
            )}
          </div>
          {(saveState === 'error' || temporary) && (
            <div className="trace-storage-error" role="alert">
              <strong>
                {temporary
                  ? 'Temporary workspace'
                  : 'Changes could not be saved.'}
              </strong>
              <span>
                {temporary
                  ? 'This session is not saved. Export a copy before closing.'
                  : 'Your changes are still on screen. Export a copy or retry saving.'}
              </span>
              <button onClick={exportWorkspace}>Export a copy</button>
              {!temporary && (
                <button
                  onClick={() => {
                    setSaveState('saving')
                    void saveWorkspace(w)
                      .then(() => setSaveState('saved'))
                      .catch(() => setSaveState('error'))
                  }}
                >
                  Retry
                </button>
              )}
            </div>
          )}
          {view === 'overview' ? (
            <StudyOverview
              workspace={w}
              study={study}
              onDecision={(id) =>
                open({ type: 'detail', kind: 'decisions', id })
              }
              onView={(nextView, filter) => {
                go(nextView)
                if (filter === 'unlinked') setUnlinked(true)
                else if (filter) setStatusFilter(filter)
              }}
            />
          ) : (
            <>
              <div className="trace-toolbar">
                <label className="trace-inline-search">
                  <Icon name="search" />
                  <input
                    aria-label={'Search ' + view}
                    placeholder={
                      view === 'evidence'
                        ? 'Search observations, sources, or tags'
                        : 'Search ' + view
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                {view === 'evidence' ? (
                  <>
                    <select
                      aria-label="Filter by tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    >
                      <option value="">All tags</option>
                      {tags.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <label className="trace-check-filter">
                      <input
                        type="checkbox"
                        checked={unlinked}
                        onChange={(e) => setUnlinked(e.target.checked)}
                      />
                      Unlinked only
                    </label>
                  </>
                ) : (
                  <select
                    aria-label="Filter by status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All statuses</option>
                    {view === 'insights' ? (
                      <>
                        <option value="draft">Draft</option>
                        <option value="ready">Ready</option>
                      </>
                    ) : (
                      <>
                        <option value="proposed">Proposed</option>
                        <option value="accepted">Accepted</option>
                        <option value="review">Needs review</option>
                      </>
                    )}
                  </select>
                )}
                {(query || tag || unlinked || statusFilter) && (
                  <button className="trace-text-button" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </div>
              <div className="trace-results-toolbar">
                <p>
                  {resultCount}{' '}
                  {view === 'evidence'
                    ? resultCount === 1
                      ? 'observation'
                      : 'observations'
                    : view}
                  {view === 'evidence' && (
                    <span>
                      {' '}
                      ·{' '}
                      {
                        new Set(visibleEvidence.map((record) => record.source))
                          .size
                      }{' '}
                      sources
                    </span>
                  )}
                </p>
                {view === 'evidence' && (
                  <div>
                    <select
                      aria-label="Sort observations"
                      value={sort}
                      onChange={(event) =>
                        setSort(event.target.value as EvidenceSort)
                      }
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                      <option value="title">Title A–Z</option>
                    </select>
                    <div
                      className="trace-view-switch"
                      role="group"
                      aria-label="Evidence layout"
                    >
                      <button
                        aria-label="List view"
                        aria-pressed={layout === 'list'}
                        onClick={() => setLayout('list')}
                      >
                        <Icon name="list" />
                        <span>List</span>
                      </button>
                      <button
                        aria-label="Card view"
                        aria-pressed={layout === 'cards'}
                        onClick={() => setLayout('cards')}
                      >
                        <Icon name="cards" />
                        <span>Cards</span>
                      </button>
                    </div>
                    <button
                      className="trace-text-button trace-csv-export"
                      onClick={() =>
                        download(
                          'trace-observations.csv',
                          evidenceCsv(w, currentStudyId),
                          'text/csv',
                        )
                      }
                    >
                      <Icon name="export" />
                      Export CSV
                    </button>
                  </div>
                )}
              </div>
              {!!selected.length && view === 'evidence' && (
                <div className="trace-selection-bar">
                  <span>{selected.length} selected</span>
                  <button
                    onClick={() =>
                      open({
                        type: 'edit',
                        kind: 'insights',
                        evidenceIds: selected,
                      })
                    }
                  >
                    Create insight from selection <Icon name="arrow" />
                  </button>
                  <button
                    onClick={() => setSelected([])}
                    aria-label="Clear selection"
                  >
                    <Icon name="close" />
                  </button>
                </div>
              )}
              {view === 'evidence' &&
                (visibleEvidence.length ? (
                  <EvidenceLibrary
                    records={visibleEvidence}
                    insights={insights}
                    layout={layout}
                    selected={selected}
                    onSelect={setSelected}
                    onOpen={(id) =>
                      open({ type: 'detail', kind: 'evidence', id })
                    }
                    onTag={setTag}
                  />
                ) : (
                  <Empty
                    title={
                      observations.length
                        ? 'No observations match.'
                        : 'Start with one observation.'
                    }
                    body={
                      observations.length
                        ? 'Try another search or clear your filters.'
                        : 'Capture a quote or observation, then add its source and a few tags.'
                    }
                    action={
                      observations.length ? 'Clear filters' : 'Add observation'
                    }
                    onAction={() =>
                      observations.length
                        ? clearFilters()
                        : open({ type: 'edit', kind: 'evidence' })
                    }
                  />
                ))}
              {view === 'insights' &&
                (shownInsights.length ? (
                  <div className="trace-record-list">
                    {shownInsights.map((i) => (
                      <button
                        className="trace-record-row"
                        key={i.id}
                        onClick={() =>
                          open({ type: 'detail', kind: 'insights', id: i.id })
                        }
                      >
                        <span className="trace-record-content">
                          <small className="trace-record-reference">
                            {recordReference('insights', i.id)}
                          </small>
                          <strong>{i.title}</strong>
                          <span>{i.summary}</span>
                          <small>
                            {i.evidenceIds.length} supporting observations
                          </small>
                        </span>
                        <Pill tone={i.status === 'ready' ? 'green' : ''}>
                          {i.status}
                        </Pill>
                        <Icon name="arrow" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <Empty
                    title={
                      insights.length
                        ? 'No insights match.'
                        : 'Create your first insight.'
                    }
                    body={
                      insights.length
                        ? 'Try another search or status.'
                        : 'Group observations and explain what they suggest.'
                    }
                    action={insights.length ? 'Clear filters' : 'New insight'}
                    onAction={() =>
                      insights.length
                        ? clearFilters()
                        : open({ type: 'edit', kind: 'insights' })
                    }
                  />
                ))}
              {view === 'decisions' &&
                (shownDecisions.length ? (
                  <div className="trace-record-list">
                    {shownDecisions.map((d) => (
                      <button
                        className="trace-record-row"
                        key={d.id}
                        onClick={() =>
                          open({ type: 'detail', kind: 'decisions', id: d.id })
                        }
                      >
                        <span className="trace-record-content">
                          <small className="trace-record-reference">
                            {recordReference('decisions', d.id)}
                          </small>
                          <strong>{d.title}</strong>
                          <span>{d.rationale}</span>
                          <small>
                            {d.insightIds.length} insights ·{' '}
                            {evidenceForDecision(w, d).length} observations
                          </small>
                        </span>
                        <Pill
                          tone={
                            needsReview(w, d)
                              ? 'amber'
                              : d.status === 'accepted'
                                ? 'green'
                                : ''
                          }
                        >
                          {needsReview(w, d) ? 'Needs review' : d.status}
                        </Pill>
                        <Icon name="arrow" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <Empty
                    title={
                      decisions.length
                        ? 'No decisions match.'
                        : 'Record your first decision.'
                    }
                    body={
                      decisions.length
                        ? 'Try another search or status.'
                        : 'Document the choice, alternative, and supporting insights.'
                    }
                    action={decisions.length ? 'Clear filters' : 'New decision'}
                    onAction={() =>
                      decisions.length
                        ? clearFilters()
                        : open({ type: 'edit', kind: 'decisions' })
                    }
                  />
                ))}
            </>
          )}
          <footer className="trace-workspace-footer">
            <span role="status">
              <span className={'trace-save-dot ' + saveState} />
              {temporary
                ? 'Temporary session'
                : saveState === 'saving'
                  ? 'Saving changes…'
                  : saveState === 'error'
                    ? 'Changes not saved'
                    : 'Saved on this device'}
            </span>
            <button disabled={!history.length} onClick={undo}>
              Undo last change
            </button>
            <button onClick={() => open({ type: 'reset' })}>
              Restore sample workspace
            </button>
          </footer>
        </main>
      </div>
      {notice && (
        <div className="trace-toast" role="status">
          <Icon name="check" />
          <span>{notice}</span>
          {history.length > 0 && <button onClick={undo}>Undo</button>}
          <button
            className="trace-icon-button"
            aria-label="Dismiss notification"
            onClick={() => setNotice('')}
          >
            <Icon name="close" />
          </button>
        </div>
      )}
      {modal?.type === 'edit' && (
        <Dialog
          key={'edit-' + modal.kind + '-' + (modal.id || 'new')}
          title={(modal.id ? 'Edit ' : 'New ') + names[modal.kind]}
          onClose={() => setModal(null)}
        >
          <form onSubmit={saveForm} className="trace-form">
            <label>
              Title
              <input
                name="title"
                defaultValue={edited?.title}
                required
                maxLength={160}
                autoFocus
                placeholder={
                  modal.kind === 'evidence'
                    ? 'What did you observe?'
                    : 'Give this a clear point of view'
                }
              />
            </label>
            {modal.kind === 'evidence' && (
              <label>
                Source
                <input
                  name="source"
                  defaultValue={(edited as Evidence)?.source}
                  required
                  maxLength={160}
                  placeholder="Session, document, or observation source"
                />
              </label>
            )}
            <label>
              {modal.kind === 'evidence'
                ? 'Observation or quote'
                : modal.kind === 'insights'
                  ? 'What does the evidence suggest?'
                  : 'Why this decision?'}
              <textarea
                name="body"
                defaultValue={
                  modal.kind === 'evidence'
                    ? (edited as Evidence)?.body
                    : modal.kind === 'insights'
                      ? (edited as Insight)?.summary
                      : (edited as Decision)?.rationale
                }
                required
                maxLength={12000}
                rows={5}
                placeholder="Keep the context with the finding."
              />
            </label>
            {modal.kind === 'evidence' && (
              <label>
                Tags <small>Separate with commas; up to 8</small>
                <input
                  name="tags"
                  defaultValue={(edited as Evidence)?.tags.join(', ')}
                  placeholder="Navigation, comprehension, trust"
                />
              </label>
            )}
            {modal.kind === 'decisions' && (
              <label>
                Alternative considered
                <textarea
                  name="alternative"
                  defaultValue={(edited as Decision)?.alternative}
                  maxLength={6000}
                  rows={3}
                  placeholder="What else could you do, and why choose this direction?"
                />
              </label>
            )}
            {modal.kind !== 'evidence' && (
              <>
                <fieldset className="trace-reference-picker">
                  <legend>
                    {modal.kind === 'insights'
                      ? 'Supporting observations'
                      : 'Supporting insights'}
                  </legend>
                  <p>
                    {modal.kind === 'insights'
                      ? 'Keep the original sources attached.'
                      : 'Ready insights with evidence are required before acceptance.'}
                  </p>
                  {(modal.kind === 'insights' ? observations : insights)
                    .length ? (
                    (modal.kind === 'insights' ? observations : insights).map(
                      (r) => (
                        <label key={r.id}>
                          <input
                            type="checkbox"
                            name="reference"
                            value={r.id}
                            defaultChecked={referenceIds.includes(r.id)}
                          />
                          <span>
                            {r.title}
                            <small>
                              {'source' in r
                                ? r.source
                                : r.evidenceIds.length +
                                  ' observations · ' +
                                  r.status}
                            </small>
                          </span>
                        </label>
                      ),
                    )
                  ) : (
                    <p>
                      No{' '}
                      {modal.kind === 'insights' ? 'observations' : 'insights'}{' '}
                      yet. You can save a draft and link them later.
                    </p>
                  )}
                </fieldset>
                <label>
                  Status
                  <select
                    name="status"
                    defaultValue={
                      (edited as Insight | Decision)?.status ||
                      (modal.kind === 'insights' ? 'draft' : 'proposed')
                    }
                  >
                    {modal.kind === 'insights' ? (
                      <>
                        <option value="draft">Draft</option>
                        <option value="ready">Ready</option>
                      </>
                    ) : (
                      <>
                        <option value="proposed">Proposed</option>
                        <option value="accepted">
                          Accepted — review evidence on save
                        </option>
                      </>
                    )}
                  </select>
                </label>
              </>
            )}
            {formError && (
              <p className="trace-form-error" role="alert">
                {formError}
              </p>
            )}
            <div className="trace-dialog-actions">
              <button
                type="button"
                className="trace-secondary"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button className="trace-primary" type="submit">
                Save {names[modal.kind]}
              </button>
            </div>
          </form>
        </Dialog>
      )}
      {modal?.type === 'detail' && detailRecord && (
        <Dialog
          key={'detail-' + modal.kind + '-' + modal.id}
          title={
            names[modal.kind][0].toUpperCase() + names[modal.kind].slice(1)
          }
          drawer
          onClose={() => setModal(null)}
        >
          <div className="trace-detail">
            <p className="trace-eyebrow">
              {recordReference(modal.kind, modal.id)}{' '}
              <span> / {study.title}</span>
            </p>
            <h3>{detailRecord.title}</h3>
            {'body' in detailRecord ? (
              <>
                <Pill>{detailRecord.source}</Pill>
                <blockquote>{detailRecord.body}</blockquote>
                <div className="trace-tag-list">
                  {detailRecord.tags.map((t) => (
                    <span className="trace-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <h4>Connected insights</h4>
                {insights
                  .filter((i) => i.evidenceIds.includes(detailRecord.id))
                  .map((i) => (
                    <SourceButton
                      key={i.id}
                      title={i.title}
                      meta={
                        recordReference('insights', i.id) +
                        ' · ' +
                        i.evidenceIds.length +
                        ' observations'
                      }
                      onClick={() =>
                        open({ type: 'detail', kind: 'insights', id: i.id })
                      }
                    />
                  ))}
                {!linkedEvidence.has(detailRecord.id) && (
                  <p>This observation has not been linked to an insight.</p>
                )}
                <button
                  className="trace-secondary"
                  onClick={() =>
                    open({
                      type: 'edit',
                      kind: 'insights',
                      evidenceIds: [detailRecord.id],
                    })
                  }
                >
                  Create an insight from this
                </button>
              </>
            ) : 'summary' in detailRecord ? (
              <>
                <Pill tone={detailRecord.status === 'ready' ? 'green' : ''}>
                  {detailRecord.status}
                </Pill>
                <p>{detailRecord.summary}</p>
                <h4>
                  Supporting observations · {detailRecord.evidenceIds.length}
                </h4>
                {detailRecord.evidenceIds.map((id) => {
                  const e = w.evidence.find((r) => r.id === id)!
                  return (
                    <SourceButton
                      key={id}
                      title={e.body}
                      meta={
                        recordReference('evidence', e.id) + ' · ' + e.source
                      }
                      onClick={() =>
                        open({ type: 'detail', kind: 'evidence', id })
                      }
                    />
                  )
                })}
                {!detailRecord.evidenceIds.length && (
                  <p>
                    No evidence linked yet. Edit this insight to attach its
                    sources.
                  </p>
                )}
                <h4>Decisions using this insight</h4>
                {decisions
                  .filter((d) => d.insightIds.includes(detailRecord.id))
                  .map((d) => (
                    <SourceButton
                      key={d.id}
                      title={d.title}
                      meta={
                        recordReference('decisions', d.id) + ' · ' + d.status
                      }
                      onClick={() =>
                        open({ type: 'detail', kind: 'decisions', id: d.id })
                      }
                    />
                  ))}
              </>
            ) : (
              <>
                <Pill tone={detailRecord.status === 'accepted' ? 'green' : ''}>
                  {detailRecord.status}
                </Pill>
                <p>{detailRecord.rationale}</p>
                {detailRecord.alternative && (
                  <div className="trace-alternative">
                    <h4>Alternative considered</h4>
                    <p>{detailRecord.alternative}</p>
                  </div>
                )}
                {needsReview(w, detailRecord) && (
                  <div className="trace-review-alert">
                    <strong>The evidence has changed.</strong>
                    <p>
                      Review the linked sources before relying on this decision.
                    </p>
                    <button
                      className="trace-secondary"
                      onClick={() => {
                        try {
                          change(
                            acceptDecision(w, detailRecord.id),
                            'Decision reviewed.',
                          )
                          setFormError('')
                        } catch (e) {
                          setFormError((e as Error).message)
                        }
                      }}
                    >
                      Mark reviewed
                    </button>
                  </div>
                )}
                <h4>Supporting insights · {detailRecord.insightIds.length}</h4>
                {detailRecord.insightIds.map((id) => {
                  const i = w.insights.find((r) => r.id === id)!
                  return (
                    <SourceButton
                      key={id}
                      title={i.title}
                      meta={
                        i.evidenceIds.length + ' observations · ' + i.status
                      }
                      onClick={() =>
                        open({ type: 'detail', kind: 'insights', id })
                      }
                    />
                  )
                })}
                <h4>
                  Original observations ·{' '}
                  {evidenceForDecision(w, detailRecord).length}
                </h4>
                {evidenceForDecision(w, detailRecord).map((e) => (
                  <SourceButton
                    key={e.id}
                    title={e.body}
                    meta={recordReference('evidence', e.id) + ' · ' + e.source}
                    onClick={() =>
                      open({ type: 'detail', kind: 'evidence', id: e.id })
                    }
                  />
                ))}
                {detailRecord.status === 'proposed' && (
                  <button
                    className="trace-primary"
                    onClick={() => {
                      try {
                        change(
                          acceptDecision(w, detailRecord.id),
                          'Decision accepted.',
                        )
                        setFormError('')
                      } catch (e) {
                        setFormError((e as Error).message)
                      }
                    }}
                  >
                    Accept decision
                  </button>
                )}
              </>
            )}
            {formError && (
              <p className="trace-form-error" role="alert">
                {formError}
              </p>
            )}
            <div className="trace-detail-meta">
              Updated{' '}
              {new Date(detailRecord.updatedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="trace-dialog-actions">
              <button
                className="trace-danger-button"
                onClick={() =>
                  open({ type: 'delete', kind: modal.kind, id: modal.id })
                }
              >
                Delete
              </button>
              <button
                className="trace-primary"
                onClick={() =>
                  open({ type: 'edit', kind: modal.kind, id: modal.id })
                }
              >
                Edit {names[modal.kind]}
              </button>
            </div>
          </div>
        </Dialog>
      )}
      {modal?.type === 'delete' && (
        <Dialog
          title={'Delete ' + names[modal.kind] + '?'}
          onClose={() => setModal(null)}
        >
          <p className="trace-dialog-description">
            “{recordTitle(w, modal.kind, modal.id)}” will be removed. Its
            connections will be updated. You can undo this change.
          </p>
          <div className="trace-dialog-actions">
            <button className="trace-secondary" onClick={() => setModal(null)}>
              Keep it
            </button>
            <button
              className="trace-danger"
              onClick={() => {
                change(removeRecord(w, modal.kind, modal.id), 'Record deleted.')
                setModal(null)
              }}
            >
              Delete {names[modal.kind]}
            </button>
          </div>
        </Dialog>
      )}
      {modal?.type === 'study' && (
        <Dialog title="New study" onClose={() => setModal(null)}>
          <form
            className="trace-form"
            onSubmit={(e) => {
              e.preventDefault()
              const f = new FormData(e.currentTarget)
              const now = timestamp(),
                id = newId()
              try {
                change(
                  {
                    ...w,
                    updatedAt: now,
                    studies: [
                      ...w.studies,
                      {
                        id,
                        title: String(f.get('title')),
                        description: String(f.get('description') || ''),
                        createdAt: now,
                      },
                    ],
                  },
                  'Study created.',
                )
                setStudyId(id)
                go('evidence')
                setTag('')
                setUnlinked(false)
                setModal(null)
              } catch (error) {
                setFormError((error as Error).message)
              }
            }}
          >
            <label>
              Study title
              <input
                name="title"
                required
                maxLength={160}
                autoFocus
                placeholder="What are you trying to understand?"
              />
            </label>
            <label>
              Research focus
              <textarea
                name="description"
                maxLength={1000}
                rows={3}
                placeholder="A short description of the question or task."
              />
            </label>
            {formError && (
              <p className="trace-form-error" role="alert">
                {formError}
              </p>
            )}
            <div className="trace-dialog-actions">
              <button
                type="button"
                className="trace-secondary"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button className="trace-primary">Create study</button>
            </div>
          </form>
        </Dialog>
      )}
      {modal?.type === 'import' && (
        <Dialog title="Import a workspace" onClose={() => setModal(null)}>
          <div className="trace-form">
            <p>
              Import a Trace JSON export. The file is checked before any saved
              work is replaced. Importing stays in your browser.
            </p>
            <button className="trace-text-button" onClick={exportWorkspace}>
              Export your current workspace first
            </button>
            <label>
              Workspace file
              <input
                type="file"
                accept=".json,application/json"
                onChange={async (e) => {
                  importFile.current = null
                  const file = e.target.files?.[0]
                  if (!file) return
                  try {
                    if (file.size > 20000000)
                      throw new Error('Choose a workspace file under 20 MB.')
                    const imported = validateWorkspace(
                      JSON.parse(await file.text()),
                    )
                    importFile.current = imported
                    setImportMessage(
                      imported.studies.length +
                        ' studies and ' +
                        imported.evidence.length +
                        ' observations ready to import.',
                    )
                    setFormError('')
                  } catch (error) {
                    setImportMessage('')
                    setFormError((error as Error).message)
                  }
                }}
              />
            </label>
            {importMessage && <p role="status">{importMessage}</p>}
            {formError && (
              <p className="trace-form-error" role="alert">
                {formError}
              </p>
            )}
            <div className="trace-dialog-actions">
              <button
                className="trace-secondary"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button
                className="trace-primary"
                disabled={!importMessage}
                onClick={() => {
                  if (importFile.current) {
                    change(importFile.current, 'Workspace imported.')
                    setStudyId(importFile.current.studies[0].id)
                    go('evidence')
                    setModal(null)
                  }
                }}
              >
                Replace workspace
              </button>
            </div>
          </div>
        </Dialog>
      )}
      {modal?.type === 'reset' && (
        <Dialog
          title="Restore the sample workspace?"
          onClose={() => setModal(null)}
        >
          <p className="trace-dialog-description">
            This replaces the current workspace with the original fictional
            sample. Export a copy first if you want to keep your edits. Undo
            remains available after the change.
          </p>
          <div className="trace-dialog-actions">
            <button className="trace-secondary" onClick={exportWorkspace}>
              Export a copy
            </button>
            <button
              className="trace-primary"
              onClick={() => {
                change(sampleWorkspace(), 'Sample workspace restored.')
                setStudyId('study-sample')
                go('evidence')
                setTag('')
                setUnlinked(false)
                setModal(null)
              }}
            >
              Restore sample
            </button>
          </div>
        </Dialog>
      )}
      {modal?.type === 'search' && (
        <Dialog title="Search this study" onClose={() => setModal(null)}>
          <div className="trace-command-search">
            <Icon name="search" />
            <input
              aria-label="Search observations, insights, and decisions"
              value={commandQuery}
              autoFocus
              onChange={(e) => setCommandQuery(e.target.value)}
              placeholder="Find an observation, insight, or decision…"
            />
          </div>
          <div className="trace-command-results">
            {commandResults.map((r) => (
              <button
                key={r.kind + r.id}
                onClick={() => {
                  go(r.kind)
                  open({ type: 'detail', kind: r.kind, id: r.id })
                }}
              >
                <Icon name={r.kind} />
                <span>
                  {r.title}
                  <small>
                    {recordReference(r.kind, r.id)} · {names[r.kind]}
                  </small>
                </span>
                <Icon name="arrow" />
              </button>
            ))}
            {!commandResults.length && <p>No matches. Try a different word.</p>}
          </div>
        </Dialog>
      )}
    </div>
  )
}
