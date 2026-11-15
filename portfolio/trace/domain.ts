export type Evidence = { id: string; studyId: string; title: string; body: string; source: string; tags: string[]; createdAt: string; updatedAt: string }
export type Insight = { id: string; studyId: string; title: string; summary: string; evidenceIds: string[]; status: 'draft' | 'ready'; createdAt: string; updatedAt: string }
export type Decision = { id: string; studyId: string; title: string; rationale: string; alternative: string; insightIds: string[]; status: 'proposed' | 'accepted'; reviewedAt?: string; createdAt: string; updatedAt: string }
export type Study = { id: string; title: string; description: string; createdAt: string }
export type Workspace = { version: 1; studies: Study[]; evidence: Evidence[]; insights: Insight[]; decisions: Decision[]; updatedAt: string }
export type RecordKind = 'evidence' | 'insights' | 'decisions'

export const timestamp = () => new Date().toISOString()
export const newId = () => crypto.randomUUID()

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected a workspace record.')
  return value as Record<string, unknown>
}
function text(value: unknown, label: string, max = 160, required = true): string {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(label + ' must be ' + (required ? 'nonempty text' : 'text') + ' under ' + max + ' characters.')
  return value.trim()
}
function id(value: unknown): string {
  const result = text(value, 'Record ID', 80)
  if (!/^[a-zA-Z0-9_-]+$/.test(result)) throw new Error('A record has an invalid ID.')
  return result
}
function date(value: unknown): string {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) throw new Error('A record has an invalid date.')
  return value
}
function list<T>(value: unknown, max: number, parse: (v: unknown) => T): T[] {
  if (!Array.isArray(value) || value.length > max) throw new Error('The workspace contains too many records or an invalid list.')
  return value.map(parse)
}
const ids = (value: unknown) => [...new Set(list(value, 500, id))]
const unique = (rows: { id: string }[]) => {
  if (new Set(rows.map(row => row.id)).size !== rows.length) throw new Error('Duplicate record IDs are not allowed.')
}

/** Imports are validated before replacing any saved data. Cross-study references are rejected. */
export function validateWorkspace(input: unknown): Workspace {
  const w = object(input)
  if (w['version'] !== 1) throw new Error('This file is not a supported Trace workspace (version 1).')
  const studies = list(w['studies'], 50, value => {
    const r = object(value)
    return { id: id(r['id']), title: text(r['title'], 'Study title'), description: text(r['description'], 'Study description', 1000, false), createdAt: date(r['createdAt']) }
  })
  if (!studies.length) throw new Error('A workspace needs at least one study.')
  const evidence = list(w['evidence'], 500, value => {
    const r = object(value)
    return { id: id(r['id']), studyId: id(r['studyId']), title: text(r['title'], 'Observation title'), body: text(r['body'], 'Observation', 12000), source: text(r['source'], 'Source', 160), tags: [...new Set(list(r['tags'], 8, v => text(v, 'Tag', 32)))], createdAt: date(r['createdAt']), updatedAt: date(r['updatedAt']) }
  })
  const insights = list(w['insights'], 200, value => {
    const r = object(value)
    if (r['status'] !== 'draft' && r['status'] !== 'ready') throw new Error('An insight has an invalid status.')
    return { id: id(r['id']), studyId: id(r['studyId']), title: text(r['title'], 'Insight title'), summary: text(r['summary'], 'Insight summary', 12000), evidenceIds: ids(r['evidenceIds']), status: r['status'] as Insight['status'], createdAt: date(r['createdAt']), updatedAt: date(r['updatedAt']) }
  })
  const decisions = list(w['decisions'], 200, value => {
    const r = object(value)
    if (r['status'] !== 'proposed' && r['status'] !== 'accepted') throw new Error('A decision has an invalid status.')
    return { id: id(r['id']), studyId: id(r['studyId']), title: text(r['title'], 'Decision title'), rationale: text(r['rationale'], 'Rationale', 12000), alternative: text(r['alternative'], 'Alternative', 6000, false), insightIds: ids(r['insightIds']), status: r['status'] as Decision['status'], ...(r['reviewedAt'] ? { reviewedAt: date(r['reviewedAt']) } : {}), createdAt: date(r['createdAt']), updatedAt: date(r['updatedAt']) }
  })
  ;[studies, evidence, insights, decisions].forEach(unique)
  const studyIds = new Set(studies.map(s => s.id))
  for (const r of [...evidence, ...insights, ...decisions]) if (!studyIds.has(r['studyId'])) throw new Error('A record points to a missing study.')
  for (const insight of insights) {
    if (insight.evidenceIds.some(key => !evidence.some(e => e.id === key && e.studyId === insight.studyId))) throw new Error('An insight points to missing evidence or another study.')
    if (insight.status === 'ready' && !insight.evidenceIds.length) throw new Error('A ready insight needs supporting evidence.')
  }
  for (const decision of decisions) {
    if (decision.insightIds.some(key => !insights.some(i => i.id === key && i.studyId === decision.studyId))) throw new Error('A decision points to a missing insight or another study.')
    if (decision.status === 'accepted' && (!decision.reviewedAt || !decision.insightIds.some(key => insights.find(i => i.id === key)?.evidenceIds.length))) throw new Error('An accepted decision needs supporting evidence and a review date.')
  }
  return { version: 1, studies, evidence, insights, decisions, updatedAt: date(w['updatedAt']) }
}

export function evidenceForDecision(w: Workspace, decision: Decision): Evidence[] {
  const keys = new Set(w['insights'].filter(i => decision.insightIds.includes(i.id)).flatMap(i => i.evidenceIds))
  return w['evidence'].filter(e => keys.has(e.id))
}

export function needsReview(w: Workspace, decision: Decision): boolean {
  if (decision.status !== 'accepted' || !decision.reviewedAt) return false
  const reviewed = Date.parse(decision.reviewedAt)
  return [decision, ...w['insights'].filter(i => decision.insightIds.includes(i.id)), ...evidenceForDecision(w, decision)]
    .some(record => Date.parse(record.updatedAt) > reviewed)
}

export function acceptDecision(w: Workspace, key: string, now = timestamp()): Workspace {
  const decision = w['decisions'].find(d => d.id === key)
  if (!decision) throw new Error('This decision no longer exists.')
  const supporting = w['insights'].filter(i => decision.insightIds.includes(i.id))
  if (!supporting.length || supporting.some(i => i.status !== 'ready') || !evidenceForDecision(w, decision).length) throw new Error('Link at least one ready insight with evidence before accepting this decision.')
  return validateWorkspace({ ...w, updatedAt: now, decisions: w['decisions'].map(d => d.id === key ? { ...d, status: 'accepted', reviewedAt: now, updatedAt: now } : d) })
}

/** Keep the graph coherent when a source is removed; the UI keeps a snapshot for undo. */
export function removeRecord(w: Workspace, kind: RecordKind, key: string, now = timestamp()): Workspace {
  const evidence = w['evidence'].filter(e => kind !== 'evidence' || e.id !== key)
  const insights = w['insights'].filter(i => kind !== 'insights' || i.id !== key).map(i => {
    if (kind !== 'evidence' || !i.evidenceIds.includes(key)) return i
    const evidenceIds = i.evidenceIds.filter(e => e !== key)
    return { ...i, evidenceIds, status: evidenceIds.length ? i.status : 'draft' as const, updatedAt: now }
  })
  const decisions = w['decisions'].filter(d => kind !== 'decisions' || d.id !== key).map(d => {
    const insightIds = d.insightIds.filter(i => insights.some(existing => existing.id === i))
    const hasEvidence = insightIds.some(i => insights.find(existing => existing.id === i)?.evidenceIds.length)
    if (insightIds.length !== d.insightIds.length || (d.status === 'accepted' && !hasEvidence)) {
      return { ...d, insightIds, status: hasEvidence ? d.status : 'proposed' as const, updatedAt: now, ...(hasEvidence ? {} : { reviewedAt: undefined }) }
    }
    return d
  })
  return validateWorkspace({ ...w, evidence, insights, decisions, updatedAt: now })
}

export function searchEvidence(w: Workspace, studyId: string, query: string, tag: string, unlinked: boolean): Evidence[] {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean)
  const linked = new Set(w['insights'].flatMap(i => i.evidenceIds))
  return w['evidence'].filter(e => e.studyId === studyId && (!tag || e.tags.includes(tag)) && (!unlinked || !linked.has(e.id)) && words.every(word => [e.title, e.body, e.source, ...e.tags].join(' ').toLocaleLowerCase().includes(word)))
}
