'use client'

import type { Evidence, Insight } from './domain'
import { Icon, recordDate, recordReference } from './TracePrimitives'

export type EvidenceLayout = 'list' | 'cards'
export type EvidenceSort = 'newest' | 'oldest' | 'title'

type Props = {
  records: Evidence[]
  insights: Insight[]
  layout: EvidenceLayout
  selected: string[]
  onSelect: (ids: string[]) => void
  onOpen: (id: string) => void
  onTag: (tag: string) => void
}

export default function EvidenceLibrary({
  records,
  insights,
  layout,
  selected,
  onSelect,
  onOpen,
  onTag,
}: Props) {
  const allVisibleSelected =
    records.length > 0 &&
    records.every((record) => selected.includes(record.id))
  const toggleVisible = (checked: boolean) => {
    const visibleIds = new Set(records.map((record) => record.id))
    onSelect(
      checked
        ? [...new Set([...selected, ...visibleIds])]
        : selected.filter((id) => !visibleIds.has(id)),
    )
  }
  return (
    <div className={'trace-evidence-collection trace-evidence-' + layout}>
      <div className="trace-list-heading">
        <label>
          <input
            type="checkbox"
            aria-label="Select all visible observations"
            checked={allVisibleSelected}
            onChange={(event) => toggleVisible(event.target.checked)}
          />
          <span>Observation</span>
        </label>
        <span>Source</span>
        <span>Connections</span>
        <span>Updated</span>
      </div>
      <div className="trace-evidence-grid">
        {records.map((record) => {
          const connections = insights.filter((insight) =>
            insight.evidenceIds.includes(record.id),
          ).length
          return (
            <article
              className={
                'trace-evidence-card' +
                (selected.includes(record.id) ? ' is-selected' : '')
              }
              key={record.id}
            >
              <label className="trace-observation-select">
                <input
                  type="checkbox"
                  aria-label={'Select ' + record.title}
                  checked={selected.includes(record.id)}
                  onChange={(event) =>
                    onSelect(
                      event.target.checked
                        ? [...selected, record.id]
                        : selected.filter((id) => id !== record.id),
                    )
                  }
                />
              </label>
              <div className="trace-observation-content">
                <button
                  className="trace-card-open"
                  onClick={() => onOpen(record.id)}
                >
                  <span className="trace-record-reference">
                    {recordReference('evidence', record.id)}
                  </span>
                  <h2>{record.title}</h2>
                  <p>{record.body}</p>
                </button>
                <div className="trace-tag-list">
                  {record.tags.map((tag) => (
                    <button
                      className="trace-tag"
                      key={tag}
                      onClick={() => onTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="trace-observation-source">
                <span className="trace-cell-label">Source</span>
                <Icon name="evidence" />
                <span>{record.source}</span>
              </div>
              <button
                className={
                  'trace-connection-count' + (connections ? ' is-linked' : '')
                }
                onClick={() => onOpen(record.id)}
                aria-label={`View ${record.title}: ${connections} linked insights`}
              >
                <span className="trace-cell-label">Connections</span>
                <Icon name="insights" />
                <span>
                  {connections
                    ? `${connections} ${connections === 1 ? 'insight' : 'insights'}`
                    : 'Not linked'}
                </span>
              </button>
              <time
                className="trace-observation-date"
                dateTime={record.updatedAt}
                title={new Date(record.updatedAt).toLocaleString()}
              >
                <span className="trace-cell-label">Updated</span>
                {recordDate(record.updatedAt)}
              </time>
            </article>
          )
        })}
      </div>
    </div>
  )
}
