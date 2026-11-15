"use client"

import { useDeferredValue, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { acceptDecision, evidenceForDecision, needsReview, newId, removeRecord, searchEvidence, timestamp, validateWorkspace, type Decision, type Evidence, type Insight, type RecordKind, type Workspace } from './domain'
import { sampleWorkspace } from './seed'
import { download, evidenceCsv, loadWorkspace, saveWorkspace } from './storage'
import './trace.css'

type View = RecordKind | 'overview'
type Modal = { type: 'edit'; kind: RecordKind; id?: string; evidenceIds?: string[] } | { type: 'detail'; kind: RecordKind; id: string } | { type: 'delete'; kind: RecordKind; id: string } | { type: 'study' | 'import' | 'reset' | 'search' }
const names = { evidence: 'observation', insights: 'insight', decisions: 'decision' }
const icons = { evidence: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5', insights: 'M9 18h6M10 21h4M8 14a7 7 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2Z', decisions: 'm5 12 4 4 10-10M5 4H3v17h17v-2', overview: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', search: 'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm6-2 6 6', plus: 'M12 5v14M5 12h14', close: 'm6 6 12 12M18 6 6 18', export: 'M12 3v12m-4-4 4 4 4-4M4 15v6h16v-6', menu: 'M4 6h16M4 12h16M4 18h16', arrow: 'M4 12h16m-6-6 6 6-6 6', check: 'm5 12 4 4 10-10' }
function Icon({ name }: { name: keyof typeof icons }) { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]} /></svg> }
function Dialog({ title, children, onClose, drawer = false }: { title: string; children: ReactNode; onClose: () => void; drawer?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const d = ref.current!; d.showModal(); d.querySelector<HTMLInputElement | HTMLTextAreaElement>('input:not([type="checkbox"]):not([type="file"]), textarea')?.focus(); return () => { if (d.open) d.close() } }, [])
  return <dialog ref={ref} className={'trace-dialog' + (drawer ? ' trace-drawer' : '')} aria-label={title} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <div className="trace-dialog-inner"><header><h2>{title}</h2><button className="trace-icon-button" type="button" aria-label="Close dialog" onClick={onClose}><Icon name="close" /></button></header>{children}</div>
  </dialog>
}
function Pill({ children, tone = '' }: { children: ReactNode; tone?: string }) { return <span className={'trace-pill ' + tone}>{children}</span> }
const recordTitle = (w: Workspace, kind: RecordKind, id: string) => w[kind].find(r => r.id === id)?.title || 'Untitled'

export default function TraceApp() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [bootError, setBootError] = useState('')
  const [temporary, setTemporary] = useState(false)
  const [saveState, setSaveState] = useState<'saving' | 'saved' | 'error'>('saved')
  const [studyId, setStudyId] = useState('study-sample')
  const [view, setView] = useState<View>('evidence')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [tag, setTag] = useState('')
  const [unlinked, setUnlinked] = useState(false)
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
    try { const w = await loadWorkspace() || sampleWorkspace(); setStudyId(w.studies[0].id); setWorkspace(w) }
    catch (e) { setBootError(e instanceof Error ? e.message : 'The saved workspace could not be opened.') }
  }
  useEffect(() => { void boot() }, [])
  useEffect(() => {
    if (!workspace || temporary) return
    let cancelled = false
    setSaveState('saving')
    void saveWorkspace(workspace).then(() => { if (!cancelled) setSaveState('saved') }).catch(() => { if (!cancelled) setSaveState('error') })
    return () => { cancelled = true }
  }, [workspace, temporary])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCommandQuery(''); setModal({ type: 'search' }) }
      if (!modal && !typing && e.key.toLowerCase() === 'n') { e.preventDefault(); setFormError(''); setModal({ type: 'edit', kind: 'evidence' }) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modal])
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 6500); return () => clearTimeout(timer) }, [notice])

  const change = (next: Workspace, message: string) => {
    const valid = validateWorkspace(next)
    if (workspace) setHistory(h => [...h.slice(-9), workspace])
    setWorkspace(valid); setNotice(message); setSelected([])
  }
  const undo = () => { const previous = history.at(-1); if (!previous) return; setWorkspace(previous); setHistory(h => h.slice(0, -1)); setNotice('Change undone.'); setSelected([]) }
  const open = (next: Modal) => { setFormError(''); setImportMessage(''); importFile.current = null; setModal(next) }
  const go = (next: View) => { setView(next); setQuery(''); setSelected([]); setTag(''); setUnlinked(false); setMobileNav(false) }
  const exportWorkspace = () => { if (workspace) download('trace-workspace.json', JSON.stringify(workspace, null, 2)) }

  if (!workspace) return <main className="trace-app trace-boot"><div className="trace-brand"><span>t.</span>Trace</div>{bootError ? <><h1>Your workspace could not be opened.</h1><p>{bootError}</p><div><button className="trace-primary" onClick={() => void boot()}>Retry</button><button className="trace-secondary" onClick={() => { setTemporary(true); setWorkspace(sampleWorkspace()); setBootError('') }}>Use a temporary demo</button></div><p>Your saved workspace will not be overwritten.</p></> : <><h1>Opening your workspace</h1><p>Getting your evidence and decisions ready.</p></>}</main>
  const w = workspace
  const study = w.studies.find(s => s.id === studyId) || w.studies[0]
  const currentStudyId = study.id
  const observations = w.evidence.filter(e => e.studyId === currentStudyId)
  const insights = w.insights.filter(i => i.studyId === currentStudyId)
  const decisions = w.decisions.filter(d => d.studyId === currentStudyId)
  const tags = [...new Set(observations.flatMap(e => e.tags))].sort()
  const linkedEvidence = new Set(insights.flatMap(i => i.evidenceIds))
  const visibleEvidence = searchEvidence(w, currentStudyId, deferredQuery, tag, unlinked)
  const matching = (s: string) => s.toLocaleLowerCase().includes(deferredQuery.toLocaleLowerCase().trim())
  const shownInsights = insights.filter(i => matching(i.title + ' ' + i.summary))
  const shownDecisions = decisions.filter(d => matching(d.title + ' ' + d.rationale))
  const needsAttention = decisions.filter(d => needsReview(w, d))
  const counts = { evidence: observations.length, insights: insights.length, decisions: decisions.length, overview: undefined }
  const edited = modal?.type === 'edit' && modal.id ? w[modal.kind].find(r => r.id === modal.id) : undefined

  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (modal?.type !== 'edit') return
    const f = new FormData(event.currentTarget)
    const now = timestamp(), id = modal.id || newId()
    const common = { id, studyId: currentStudyId, title: String(f.get('title') || ''), createdAt: edited?.createdAt || now, updatedAt: now }
    try {
      let next: Workspace = { ...w, updatedAt: now }
      if (modal.kind === 'evidence') {
        const e: Evidence = { ...common, body: String(f.get('body') || ''), source: String(f.get('source') || ''), tags: String(f.get('tags') || '').split(',').map(t => t.trim()).filter(Boolean) }
        next = { ...next, evidence: [...w.evidence.filter(r => r.id !== id), e] }
      } else if (modal.kind === 'insights') {
        const i: Insight = { ...common, summary: String(f.get('body') || ''), evidenceIds: f.getAll('reference').map(String), status: f.get('status') as Insight['status'] }
        next = { ...next, insights: [...w.insights.filter(r => r.id !== id), i] }
      } else {
        const d: Decision = { ...common, rationale: String(f.get('body') || ''), alternative: String(f.get('alternative') || ''), insightIds: f.getAll('reference').map(String), status: 'proposed' }
        next = { ...next, decisions: [...w.decisions.filter(r => r.id !== id), d] }
        if (f.get('status') === 'accepted') next = acceptDecision(next, id, now)
      }
      change(next, names[modal.kind][0].toUpperCase() + names[modal.kind].slice(1) + ' saved.')
      setView(modal.kind); setModal({ type: 'detail', kind: modal.kind, id })
    } catch (e) { setFormError(e instanceof Error ? e.message : 'Check the fields and try again.') }
  }
  const referenceIds = modal?.type === 'edit' ? modal.kind === 'insights' ? (edited as Insight | undefined)?.evidenceIds || modal.evidenceIds || [] : (edited as Decision | undefined)?.insightIds || [] : []
  const commandResults = [
    ...observations.map(r => ({ kind: 'evidence' as const, id: r.id, title: r.title })),
    ...insights.map(r => ({ kind: 'insights' as const, id: r.id, title: r.title })),
    ...decisions.map(r => ({ kind: 'decisions' as const, id: r.id, title: r.title })),
  ].filter(r => r.title.toLocaleLowerCase().includes(commandQuery.toLocaleLowerCase())).slice(0, 12)
  const detailRecord = modal?.type === 'detail' ? w[modal.kind].find(r => r.id === modal.id) : undefined

  return <div className="trace-app">
    <aside className={'trace-sidebar' + (mobileNav ? ' is-open' : '')} aria-label="Workspace navigation">
      <a className="trace-brand" href="/lab/trace/"><span>t.</span>Trace<small>RESEARCH WORKSPACE</small></a>
      <div className="trace-study-picker"><label htmlFor="trace-study">CURRENT STUDY</label><select id="trace-study" value={currentStudyId} onChange={e => { setStudyId(e.target.value); setSelected([]); setQuery(''); setTag(''); setUnlinked(false); setMobileNav(false) }}>{w.studies.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}</select><button onClick={() => open({ type: 'study' })}><Icon name="plus" />New study</button></div>
      <nav aria-label="Study views">{(['overview', 'evidence', 'insights', 'decisions'] as View[]).map(item => <button key={item} className={view === item ? 'is-active' : ''} aria-current={view === item ? 'page' : undefined} onClick={() => go(item)}><Icon name={item} /><span>{item === 'evidence' ? 'Evidence library' : item[0].toUpperCase() + item.slice(1)}</span>{counts[item] !== undefined && <small>{counts[item]}</small>}</button>)}</nav>
      <div className="trace-sidebar-note"><span className="trace-live-dot" /><div><strong>Your own workspace</strong><p>Edits stay in this browser. Export a copy to keep or move your work.</p></div></div>
      <div className="trace-sidebar-bottom"><button onClick={exportWorkspace}><Icon name="export" />Export workspace</button><button onClick={() => open({ type: 'import' })}>Import a workspace</button><a href="/case-study/trace/">The design &amp; build <span>↗</span></a><a href="/">Anusha’s portfolio <span>↗</span></a></div>
    </aside>
    <div className="trace-shell">
      <header className="trace-topbar"><button className="trace-icon-button trace-mobile-menu" aria-label="Toggle workspace menu" aria-expanded={mobileNav} onClick={() => setMobileNav(v => !v)}><Icon name="menu" /></button><div className="trace-breadcrumb">Workspace <span>/</span> <strong>{study.title}</strong></div><button className="trace-search-trigger" aria-label="Search workspace" onClick={() => { setCommandQuery(''); open({ type: 'search' }) }}><Icon name="search" /><span>Search workspace</span><kbd>⌘ K</kbd></button><a className="trace-avatar" href="/case-study/trace/" aria-label="About Trace, designed and built by Anusha">AR</a></header>
      <main className="trace-main" id="trace-main">
        <div className="trace-study-context"><Pill tone="violet">{currentStudyId === 'study-sample' ? 'Sample project' : 'Your study'}</Pill><span>{currentStudyId === 'study-sample' ? 'Fictional observations. Real, editable workspace.' : study.description || 'Connect observations to the decisions they support.'}</span></div>
        <div className="trace-page-heading"><div><p className="trace-eyebrow">{study.title}</p><h1>{view === 'evidence' ? 'Every finding starts somewhere.' : view === 'insights' ? 'Find the patterns worth acting on.' : view === 'decisions' ? 'Keep the reasoning with the decision.' : 'From what you heard to what you do.'}</h1><p>{view === 'evidence' ? 'Capture an observation. Keep its source. Connect it to what comes next.' : view === 'insights' ? 'Bring observations together without losing the evidence behind them.' : view === 'decisions' ? 'Record the choice, the alternative, and the insights that support it.' : 'A clear view of the evidence, insights, and decisions in this study.'}</p></div>{view !== 'overview' && <button className="trace-primary" onClick={() => open({ type: 'edit', kind: view })}><Icon name="plus" />{view === 'evidence' ? 'Add observation' : 'New ' + names[view]}</button>}</div>
        {(saveState === 'error' || temporary) && <div className="trace-storage-error" role="alert"><strong>{temporary ? 'Temporary workspace' : 'Changes could not be saved.'}</strong><span>{temporary ? 'This session is not saved. Export a copy before closing.' : 'Your changes are still on screen. Export a copy or retry saving.'}</span><button onClick={exportWorkspace}>Export a copy</button>{!temporary && <button onClick={() => { setSaveState('saving'); void saveWorkspace(w).then(() => setSaveState('saved')).catch(() => setSaveState('error')) }}>Retry</button>}</div>}
        {view === 'overview' ? <>
          <div className="trace-summary-grid">{(['evidence', 'insights', 'decisions'] as const).map(kind => <button key={kind} onClick={() => go(kind)}><Icon name={kind} /><span>{kind === 'evidence' ? 'Observations' : kind[0].toUpperCase() + kind.slice(1)}</span><strong>{counts[kind]}</strong><small>Explore {kind} <Icon name="arrow" /></small></button>)}</div>
          <section className="trace-overview-section"><div><p className="trace-eyebrow">THE THREAD</p><h2>One decision. The evidence behind it.</h2><p>Select a decision to follow its insights back to the original observations.</p></div><div>{decisions.length ? decisions.slice(0, 3).map(d => <button className="trace-thread-row" key={d.id} onClick={() => open({ type: 'detail', kind: 'decisions', id: d.id })}><Icon name="decisions" /><span><strong>{d.title}</strong><small>{d.insightIds.length} insights · {evidenceForDecision(w, d).length} observations</small></span><Icon name="arrow" /></button>) : <div className="trace-empty-inline">Your first decision will appear here.</div>}</div></section>
          <section className="trace-overview-section"><div><p className="trace-eyebrow">NEXT TO REVIEW</p><h2>Keep the work moving.</h2></div><div className="trace-review-rows"><button onClick={() => { go('evidence'); setUnlinked(true) }}><span>Observations without an insight</span><strong>{observations.filter(e => !linkedEvidence.has(e.id)).length}</strong></button><button onClick={() => go('insights')}><span>Draft insights</span><strong>{insights.filter(i => i.status === 'draft').length}</strong></button><button onClick={() => go('decisions')}><span>Accepted decisions with changed evidence</span><strong>{needsAttention.length}</strong></button></div></section>
        </> : <>
          <div className="trace-toolbar"><div className="trace-inline-search"><Icon name="search" /><input aria-label={'Search ' + view} placeholder={'Search ' + view + '…'} value={query} onChange={e => setQuery(e.target.value)} /></div>{view === 'evidence' && <><select aria-label="Filter by tag" value={tag} onChange={e => setTag(e.target.value)}><option value="">All tags</option>{tags.map(t => <option key={t}>{t}</option>)}</select><label className="trace-check-filter"><input type="checkbox" checked={unlinked} onChange={e => setUnlinked(e.target.checked)} />Unlinked only</label><button className="trace-text-button" onClick={() => download('trace-observations.csv', evidenceCsv(w, currentStudyId), 'text/csv')}>Export CSV</button></>}<span className="trace-results-count">{view === 'evidence' ? visibleEvidence.length : view === 'insights' ? shownInsights.length : shownDecisions.length} results</span></div>
          {!!selected.length && view === 'evidence' && <div className="trace-selection-bar"><span>{selected.length} selected</span><button onClick={() => open({ type: 'edit', kind: 'insights', evidenceIds: selected })}>Create insight from selection <Icon name="arrow" /></button><button onClick={() => setSelected([])} aria-label="Clear selection"><Icon name="close" /></button></div>}
          {view === 'evidence' && (visibleEvidence.length ? <div className="trace-evidence-grid">{visibleEvidence.map(e => <article className="trace-evidence-card" key={e.id}><header><Pill>{e.source}</Pill><input type="checkbox" aria-label={'Select ' + e.title} checked={selected.includes(e.id)} onChange={event => setSelected(ids => event.target.checked ? [...ids, e.id] : ids.filter(id => id !== e.id))} /></header><button className="trace-card-open" onClick={() => open({ type: 'detail', kind: 'evidence', id: e.id })}><h2>{e.title}</h2><p>{e.body}</p></button><footer><div>{e.tags.map(t => <button className="trace-tag" key={t} onClick={() => setTag(t)}>{t}</button>)}</div><span className={linkedEvidence.has(e.id) ? 'trace-linked' : ''}>{linkedEvidence.has(e.id) ? 'Linked to insight' : 'Not linked yet'}</span></footer></article>)}</div> : <Empty title={observations.length ? 'No observations match.' : 'Start with one observation.'} body={observations.length ? 'Try another search or clear your filters.' : 'Capture a quote or observation, then add its source and a few tags.'} action={observations.length ? 'Clear filters' : 'Add observation'} onAction={() => observations.length ? (setQuery(''), setTag(''), setUnlinked(false)) : open({ type: 'edit', kind: 'evidence' })} />)}
          {view === 'insights' && (shownInsights.length ? <div className="trace-record-list">{shownInsights.map(i => <button className="trace-record-row" key={i.id} onClick={() => open({ type: 'detail', kind: 'insights', id: i.id })}><span className="trace-record-symbol"><Icon name="insights" /></span><span className="trace-record-content"><strong>{i.title}</strong><span>{i.summary}</span><small>{i.evidenceIds.length} supporting observations</small></span><Pill tone={i.status === 'ready' ? 'green' : ''}>{i.status}</Pill><Icon name="arrow" /></button>)}</div> : <Empty title={insights.length ? "No insights match." : "Give the observations a point of view."} body={insights.length ? "Try another search." : "Create an insight and attach the evidence that supports it."} action={insights.length ? "Clear search" : "New insight"} onAction={() => insights.length ? setQuery('') : open({ type: 'edit', kind: 'insights' })} />)}
          {view === 'decisions' && (shownDecisions.length ? <div className="trace-record-list">{shownDecisions.map(d => <button className="trace-record-row" key={d.id} onClick={() => open({ type: 'detail', kind: 'decisions', id: d.id })}><span className="trace-record-symbol"><Icon name="decisions" /></span><span className="trace-record-content"><strong>{d.title}</strong><span>{d.rationale}</span><small>{d.insightIds.length} insights · {evidenceForDecision(w, d).length} observations</small></span><Pill tone={needsReview(w, d) ? 'amber' : d.status === 'accepted' ? 'green' : ''}>{needsReview(w, d) ? 'Review evidence' : d.status}</Pill><Icon name="arrow" /></button>)}</div> : <Empty title={decisions.length ? "No decisions match." : "Make the reasoning visible."} body={decisions.length ? "Try another search." : "Record a choice and connect the insights that informed it."} action={decisions.length ? "Clear search" : "New decision"} onAction={() => decisions.length ? setQuery('') : open({ type: 'edit', kind: 'decisions' })} />)}
        </>}
        <footer className="trace-workspace-footer"><span role="status"><span className={'trace-save-dot ' + saveState} />{temporary ? 'Temporary session' : saveState === 'saving' ? 'Saving changes…' : saveState === 'error' ? 'Changes not saved' : 'Saved on this device'}</span><button disabled={!history.length} onClick={undo}>Undo last change</button><button onClick={() => open({ type: 'reset' })}>Restore sample workspace</button><a href="/case-study/trace/#engineering">How Trace works ↗</a></footer>
      </main>
    </div>
    {notice && <div className="trace-toast" role="status"><Icon name="check" /><span>{notice}</span>{history.length > 0 && <button onClick={undo}>Undo</button>}<button className="trace-icon-button" aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" /></button></div>}
    {modal?.type === 'edit' && <Dialog key={'edit-' + modal.kind + '-' + (modal.id || 'new')} title={(modal.id ? 'Edit ' : 'New ') + names[modal.kind]} onClose={() => setModal(null)}>
      <form onSubmit={saveForm} className="trace-form">
        <label>Title<input name="title" defaultValue={edited?.title} required maxLength={160} autoFocus placeholder={modal.kind === 'evidence' ? 'What did you observe?' : 'Give this a clear point of view'} /></label>
        {modal.kind === 'evidence' && <label>Source<input name="source" defaultValue={(edited as Evidence)?.source} required maxLength={160} placeholder="Session, document, or observation source" /></label>}
        <label>{modal.kind === 'evidence' ? 'Observation or quote' : modal.kind === 'insights' ? 'What does the evidence suggest?' : 'Why this decision?'}<textarea name="body" defaultValue={modal.kind === 'evidence' ? (edited as Evidence)?.body : modal.kind === 'insights' ? (edited as Insight)?.summary : (edited as Decision)?.rationale} required maxLength={12000} rows={5} placeholder="Keep the context with the finding." /></label>
        {modal.kind === 'evidence' && <label>Tags <small>Separate with commas; up to 8</small><input name="tags" defaultValue={(edited as Evidence)?.tags.join(', ')} placeholder="Navigation, comprehension, trust" /></label>}
        {modal.kind === 'decisions' && <label>Alternative considered<textarea name="alternative" defaultValue={(edited as Decision)?.alternative} maxLength={6000} rows={3} placeholder="What else could you do, and why choose this direction?" /></label>}
        {modal.kind !== 'evidence' && <><fieldset className="trace-reference-picker"><legend>{modal.kind === 'insights' ? 'Supporting observations' : 'Supporting insights'}</legend><p>{modal.kind === 'insights' ? 'Keep the original sources attached.' : 'Ready insights with evidence are required before acceptance.'}</p>{(modal.kind === 'insights' ? observations : insights).length ? (modal.kind === 'insights' ? observations : insights).map(r => <label key={r.id}><input type="checkbox" name="reference" value={r.id} defaultChecked={referenceIds.includes(r.id)} /><span>{r.title}<small>{'source' in r ? r.source : r.evidenceIds.length + ' observations · ' + r.status}</small></span></label>) : <p>No {modal.kind === 'insights' ? 'observations' : 'insights'} yet. You can save a draft and link them later.</p>}</fieldset><label>Status<select name="status" defaultValue={(edited as Insight | Decision)?.status || (modal.kind === 'insights' ? 'draft' : 'proposed')}>{modal.kind === 'insights' ? <><option value="draft">Draft</option><option value="ready">Ready</option></> : <><option value="proposed">Proposed</option><option value="accepted">Accepted — review evidence on save</option></>}</select></label></>}
        {formError && <p className="trace-form-error" role="alert">{formError}</p>}
        <div className="trace-dialog-actions"><button type="button" className="trace-secondary" onClick={() => setModal(null)}>Cancel</button><button className="trace-primary" type="submit">Save {names[modal.kind]}</button></div>
      </form>
    </Dialog>}
    {modal?.type === 'detail' && detailRecord && <Dialog key={'detail-' + modal.kind + '-' + modal.id} title={names[modal.kind][0].toUpperCase() + names[modal.kind].slice(1)} drawer onClose={() => setModal(null)}>
      <div className="trace-detail"><p className="trace-eyebrow">{study.title}</p><h3>{detailRecord.title}</h3>
        {'body' in detailRecord ? <><Pill>{detailRecord.source}</Pill><blockquote>{detailRecord.body}</blockquote><div className="trace-tag-list">{detailRecord.tags.map(t => <span className="trace-tag" key={t}>{t}</span>)}</div><h4>Connected insights</h4>{insights.filter(i => i.evidenceIds.includes(detailRecord.id)).map(i => <SourceButton key={i.id} title={i.title} meta={i.evidenceIds.length + ' observations'} onClick={() => open({ type: 'detail', kind: 'insights', id: i.id })} />)}{!linkedEvidence.has(detailRecord.id) && <p>This observation has not been linked to an insight.</p>}<button className="trace-secondary" onClick={() => open({ type: 'edit', kind: 'insights', evidenceIds: [detailRecord.id] })}>Create an insight from this</button></> :
        'summary' in detailRecord ? <><Pill tone={detailRecord.status === 'ready' ? 'green' : ''}>{detailRecord.status}</Pill><p>{detailRecord.summary}</p><h4>Supporting observations · {detailRecord.evidenceIds.length}</h4>{detailRecord.evidenceIds.map(id => { const e = w.evidence.find(r => r.id === id)!; return <SourceButton key={id} title={e.body} meta={e.source} onClick={() => open({ type: 'detail', kind: 'evidence', id })} /> })}{!detailRecord.evidenceIds.length && <p>No evidence linked yet. Edit this insight to attach its sources.</p>}<h4>Decisions using this insight</h4>{decisions.filter(d => d.insightIds.includes(detailRecord.id)).map(d => <SourceButton key={d.id} title={d.title} meta={d.status} onClick={() => open({ type: 'detail', kind: 'decisions', id: d.id })} />)}</> :
        <><Pill tone={detailRecord.status === 'accepted' ? 'green' : ''}>{detailRecord.status}</Pill><p>{detailRecord.rationale}</p>{detailRecord.alternative && <div className="trace-alternative"><h4>Alternative considered</h4><p>{detailRecord.alternative}</p></div>}{needsReview(w, detailRecord) && <div className="trace-review-alert"><strong>The evidence has changed.</strong><p>Review the linked sources before relying on this decision.</p><button className="trace-secondary" onClick={() => { try { change(acceptDecision(w, detailRecord.id), 'Decision reviewed.'); setFormError('') } catch (e) { setFormError((e as Error).message) } }}>Mark reviewed</button></div>}<h4>Supporting insights · {detailRecord.insightIds.length}</h4>{detailRecord.insightIds.map(id => { const i = w.insights.find(r => r.id === id)!; return <SourceButton key={id} title={i.title} meta={i.evidenceIds.length + ' observations · ' + i.status} onClick={() => open({ type: 'detail', kind: 'insights', id })} /> })}<h4>Original observations · {evidenceForDecision(w, detailRecord).length}</h4>{evidenceForDecision(w, detailRecord).map(e => <SourceButton key={e.id} title={e.body} meta={e.source} onClick={() => open({ type: 'detail', kind: 'evidence', id: e.id })} />)}{detailRecord.status === 'proposed' && <button className="trace-primary" onClick={() => { try { change(acceptDecision(w, detailRecord.id), 'Decision accepted.'); setFormError('') } catch (e) { setFormError((e as Error).message) } }}>Accept decision</button>}</>}
        {formError && <p className="trace-form-error" role="alert">{formError}</p>}
        <div className="trace-detail-meta">Updated {new Date(detailRecord.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div><div className="trace-dialog-actions"><button className="trace-danger-button" onClick={() => open({ type: 'delete', kind: modal.kind, id: modal.id })}>Delete</button><button className="trace-primary" onClick={() => open({ type: 'edit', kind: modal.kind, id: modal.id })}>Edit {names[modal.kind]}</button></div>
      </div>
    </Dialog>}
    {modal?.type === 'delete' && <Dialog title={'Delete ' + names[modal.kind] + '?'} onClose={() => setModal(null)}><p className="trace-dialog-description">“{recordTitle(w, modal.kind, modal.id)}” will be removed. Its connections will be updated. You can undo this change.</p><div className="trace-dialog-actions"><button className="trace-secondary" onClick={() => setModal(null)}>Keep it</button><button className="trace-danger" onClick={() => { change(removeRecord(w, modal.kind, modal.id), 'Record deleted.'); setModal(null) }}>Delete {names[modal.kind]}</button></div></Dialog>}
    {modal?.type === 'study' && <Dialog title="New study" onClose={() => setModal(null)}><form className="trace-form" onSubmit={e => { e.preventDefault(); const f = new FormData(e.currentTarget); const now = timestamp(), id = newId(); try { change({ ...w, updatedAt: now, studies: [...w.studies, { id, title: String(f.get('title')), description: String(f.get('description') || ''), createdAt: now }] }, 'Study created.'); setStudyId(id); go('evidence'); setTag(''); setUnlinked(false); setModal(null) } catch (error) { setFormError((error as Error).message) } }}><label>Study title<input name="title" required maxLength={160} autoFocus placeholder="What are you trying to understand?" /></label><label>Research focus<textarea name="description" maxLength={1000} rows={3} placeholder="A short description of the question or task." /></label>{formError && <p className="trace-form-error" role="alert">{formError}</p>}<div className="trace-dialog-actions"><button type="button" className="trace-secondary" onClick={() => setModal(null)}>Cancel</button><button className="trace-primary">Create study</button></div></form></Dialog>}
    {modal?.type === 'import' && <Dialog title="Import a workspace" onClose={() => setModal(null)}><div className="trace-form"><p>Import a Trace JSON export. The file is checked before any saved work is replaced. Importing stays in your browser.</p><button className="trace-text-button" onClick={exportWorkspace}>Export your current workspace first</button><label>Workspace file<input type="file" accept=".json,application/json" onChange={async e => { importFile.current = null; const file = e.target.files?.[0]; if (!file) return; try { if (file.size > 20000000) throw new Error('Choose a workspace file under 20 MB.'); const imported = validateWorkspace(JSON.parse(await file.text())); importFile.current = imported; setImportMessage(imported.studies.length + ' studies and ' + imported.evidence.length + ' observations ready to import.'); setFormError('') } catch (error) { setImportMessage(''); setFormError((error as Error).message) } }} /></label>{importMessage && <p role="status">{importMessage}</p>}{formError && <p className="trace-form-error" role="alert">{formError}</p>}<div className="trace-dialog-actions"><button className="trace-secondary" onClick={() => setModal(null)}>Cancel</button><button className="trace-primary" disabled={!importMessage} onClick={() => { if (importFile.current) { change(importFile.current, 'Workspace imported.'); setStudyId(importFile.current.studies[0].id); setTag(''); setUnlinked(false); setModal(null) } }}>Replace workspace</button></div></div></Dialog>}
    {modal?.type === 'reset' && <Dialog title="Restore the sample workspace?" onClose={() => setModal(null)}><p className="trace-dialog-description">This replaces the current workspace with the original fictional sample. Export a copy first if you want to keep your edits. Undo remains available after the change.</p><div className="trace-dialog-actions"><button className="trace-secondary" onClick={exportWorkspace}>Export a copy</button><button className="trace-primary" onClick={() => { change(sampleWorkspace(), 'Sample workspace restored.'); setStudyId('study-sample'); go('evidence'); setTag(''); setUnlinked(false); setModal(null) }}>Restore sample</button></div></Dialog>}
    {modal?.type === 'search' && <Dialog title="Search this study" onClose={() => setModal(null)}><div className="trace-command-search"><Icon name="search" /><input aria-label="Search observations, insights, and decisions" value={commandQuery} autoFocus onChange={e => setCommandQuery(e.target.value)} placeholder="Find an observation, insight, or decision…" /></div><div className="trace-command-results">{commandResults.map(r => <button key={r.kind + r.id} onClick={() => { setView(r.kind); open({ type: 'detail', kind: r.kind, id: r.id }) }}><Icon name={r.kind} /><span>{r.title}<small>{names[r.kind]}</small></span><Icon name="arrow" /></button>)}{!commandResults.length && <p>No matches. Try a different word.</p>}</div></Dialog>}
  </div>
}
function SourceButton({ title, meta, onClick }: { title: string; meta: string; onClick: () => void }) { return <button className="trace-source-link" onClick={onClick}><span><strong>{title}</strong><small>{meta}</small></span><Icon name="arrow" /></button> }
function Empty({ title, body, action, onAction }: { title: string; body: string; action: string; onAction: () => void }) { return <div className="trace-empty"><span><Icon name="evidence" /></span><h2>{title}</h2><p>{body}</p><button className="trace-secondary" onClick={onAction}>{action}</button></div> }
