import { describe, expect, it } from 'vitest'
import { acceptDecision, evidenceForDecision, needsReview, removeRecord, searchEvidence, validateWorkspace } from '@/portfolio/trace/domain'
import { sampleWorkspace } from '@/portfolio/trace/seed'
import { evidenceCsv } from '@/portfolio/trace/storage'

describe('Trace evidence integrity', () => {
  it('loads a valid sample and follows a decision back to its original observations', () => {
    const w = sampleWorkspace()
    expect(validateWorkspace(w)).toEqual(w)
    expect(evidenceForDecision(w, w.decisions[0]).map(e => e.id)).toEqual(['e1', 'e2', 'e3'])
    expect(needsReview(w, w.decisions[0])).toBe(false)
  })
  it('rejects unsupported versions and invalid imports before replacing records', () => {
    expect(() => validateWorkspace({ version: 2 })).toThrow('supported Trace workspace')
    expect(() => validateWorkspace({ ...sampleWorkspace(), evidence: 'invalid' })).toThrow('invalid list')
  })
  it('rejects duplicate IDs and dangling evidence', () => {
    const w = sampleWorkspace()
    expect(() => validateWorkspace({ ...w, evidence: [...w.evidence, w.evidence[0]] })).toThrow('Duplicate')
    expect(() => validateWorkspace({ ...w, evidence: w.evidence.filter(e => e.id !== 'e1') })).toThrow('missing evidence')
  })
  it('prevents a source from being linked across studies', () => {
    const w = sampleWorkspace()
    w.studies.push({ ...w.studies[0], id: 'other-study' })
    w.evidence[0].studyId = 'other-study'
    expect(() => validateWorkspace(w)).toThrow('another study')
  })
  it('requires actual evidence before an insight is ready', () => {
    const w = sampleWorkspace()
    w.insights[0].evidenceIds = []
    expect(() => validateWorkspace(w)).toThrow('ready insight needs')
  })
  it('requires ready supporting insights before accepting a decision', () => {
    const w = sampleWorkspace()
    w.decisions[1].insightIds = ['i2']
    expect(() => acceptDecision(w, 'd2')).toThrow('ready insight')
    const accepted = acceptDecision(sampleWorkspace(), 'd2', '2026-11-05T12:00:00Z')
    expect(accepted.decisions[1].status).toBe('accepted')
    expect(needsReview(accepted, accepted.decisions[1])).toBe(false)
  })
  it('flags an accepted decision when its source changes, but ignores unrelated edits', () => {
    const w = sampleWorkspace()
    w.evidence.find(e => e.id === 'e8')!.updatedAt = '2026-11-02T12:00:00Z'
    expect(needsReview(w, w.decisions[0])).toBe(false)
    w.evidence[0].updatedAt = '2026-11-03T12:00:00Z'
    expect(needsReview(w, w.decisions[0])).toBe(true)
    const reviewed = acceptDecision(w, 'd1', '2026-11-04T12:00:00Z')
    expect(needsReview(reviewed, reviewed.decisions[0])).toBe(false)
  })
  it('removes references coherently and reopens decisions that have lost their support', () => {
    const w = sampleWorkspace()
    const removedInsight = removeRecord(w, 'insights', 'i1', '2026-11-04T12:00:00Z')
    expect(removedInsight.decisions[0].insightIds).toEqual([])
    expect(removedInsight.decisions[0].status).toBe('proposed')
    expect(validateWorkspace(removedInsight)).toEqual(removedInsight)
    const removedSource = removeRecord(w, 'evidence', 'e1', '2026-11-04T12:00:00Z')
    expect(removedSource.insights[0].evidenceIds).not.toContain('e1')
    expect(needsReview(removedSource, removedSource.decisions[0])).toBe(true)
    expect(w.evidence[0].id).toBe('e1')
  })
  it('applies search terms, tags, and unlinked filtering together', () => {
    const w = sampleWorkspace()
    expect(searchEvidence(w, 'study-sample', 'setup requirements', 'Comprehension', false).map(e => e.id)).toEqual(['e2'])
    expect(searchEvidence(w, 'study-sample', '', '', true).map(e => e.id)).toEqual(['e8'])
    expect(searchEvidence(w, 'study-sample', '<script>', '', false)).toEqual([])
  })
  it('escapes quotes, line breaks, and spreadsheet formulas in CSV exports', () => {
    const w = sampleWorkspace()
    w.evidence[0].title = '=1+1'
    w.evidence[0].body = 'A "quoted" observation\nwith another line'
    const csv = evidenceCsv(w, 'study-sample')
    expect(csv).toContain('"\'=1+1"')
    expect(csv).toContain('A ""quoted"" observation\nwith another line')
  })
})
