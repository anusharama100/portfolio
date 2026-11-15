'use client'

import {
  evidenceForDecision,
  needsReview,
  type Workspace,
  type Study,
  type RecordKind,
} from './domain'
import { Icon, Pill, recordReference } from './TracePrimitives'

export default function StudyOverview({
  workspace,
  study,
  onView,
  onDecision,
}: {
  workspace: Workspace
  study: Study
  onView: (view: RecordKind, filter?: string) => void
  onDecision: (id: string) => void
}) {
  const observations = workspace.evidence.filter(
    (record) => record.studyId === study.id,
  )
  const insights = workspace.insights.filter(
    (record) => record.studyId === study.id,
  )
  const decisions = workspace.decisions.filter(
    (record) => record.studyId === study.id,
  )
  const linked = new Set(insights.flatMap((insight) => insight.evidenceIds))
  const reviewCount = decisions.filter((decision) =>
    needsReview(workspace, decision),
  ).length
  return (
    <div className="trace-overview">
      <section className="trace-study-brief">
        <p className="trace-section-label">Research focus</p>
        <h2>{study.title}</h2>
        <p>
          {study.description ||
            'Add observations, connect the findings, and document the choices they inform.'}
        </p>
        <div className="trace-study-flow">
          {(
            [
              {
                key: 'evidence',
                label: 'Observations',
                count: observations.length,
              },
              { key: 'insights', label: 'Insights', count: insights.length },
              { key: 'decisions', label: 'Decisions', count: decisions.length },
            ] as const
          ).map((item) => (
            <button key={item.key} onClick={() => onView(item.key)}>
              <Icon name={item.key} />
              <span>{item.label}</span>
              <strong>{item.count}</strong>
              <Icon name="arrow" />
            </button>
          ))}
        </div>
      </section>
      <div className="trace-overview-columns">
        <section className="trace-overview-section">
          <header>
            <div>
              <p className="trace-section-label">Decision record</p>
              <h2>What this study informs</h2>
            </div>
            <button
              className="trace-text-button"
              onClick={() => onView('decisions')}
            >
              View all <Icon name="arrow" />
            </button>
          </header>
          <div>
            {decisions.length ? (
              decisions.map((decision) => (
                <button
                  className="trace-thread-row"
                  key={decision.id}
                  onClick={() => onDecision(decision.id)}
                >
                  <span>
                    <small>{recordReference('decisions', decision.id)}</small>
                    <strong>{decision.title}</strong>
                    <span>
                      {decision.insightIds.length} insights ·{' '}
                      {evidenceForDecision(workspace, decision).length}{' '}
                      observations
                    </span>
                  </span>
                  <Pill
                    tone={
                      needsReview(workspace, decision)
                        ? 'amber'
                        : decision.status === 'accepted'
                          ? 'green'
                          : ''
                    }
                  >
                    {needsReview(workspace, decision)
                      ? 'Needs review'
                      : decision.status}
                  </Pill>
                  <Icon name="arrow" />
                </button>
              ))
            ) : (
              <p className="trace-empty-inline">
                No decisions yet. Start by connecting evidence to an insight.
              </p>
            )}
          </div>
        </section>
        <section className="trace-overview-section">
          <header>
            <div>
              <p className="trace-section-label">Next actions</p>
              <h2>Needs attention</h2>
            </div>
          </header>
          <div className="trace-review-rows">
            <button onClick={() => onView('evidence', 'unlinked')}>
              <span>
                Unlinked observations
                <small>Find evidence that has not informed an insight.</small>
              </span>
              <strong>
                {observations.filter((record) => !linked.has(record.id)).length}
              </strong>
              <Icon name="arrow" />
            </button>
            <button onClick={() => onView('insights', 'draft')}>
              <span>
                Draft insights
                <small>Review the interpretation and supporting sources.</small>
              </span>
              <strong>
                {
                  insights.filter((insight) => insight.status === 'draft')
                    .length
                }
              </strong>
              <Icon name="arrow" />
            </button>
            <button onClick={() => onView('decisions', 'review')}>
              <span>
                Decisions to revisit
                <small>
                  Accepted decisions with changes to their evidence.
                </small>
              </span>
              <strong>{reviewCount}</strong>
              <Icon name="arrow" />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
