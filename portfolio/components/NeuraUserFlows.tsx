"use client"

import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

const journeys = [
  {
    title: 'Onboarding',
    content: (
        <Path label="Onboarding steps" steps={['Landing Page', 'Features', 'Try Free', 'Dashboard', 'Create Note']} />
    ),
  },
  {
    title: 'Create Note',
    content: <>
        <Path label="Create note steps" steps={['Dashboard', 'Notes Page', 'New Note', 'Write Content', 'Save']} />
        <Choices label="Other capture options" items={['Upload PDF', 'Import Photo', 'Voice Note']} />
    </>,
  },
  {
    title: 'AI Features',
    content: <>
        <Path label="Extract concepts" steps={['Note Content', 'Extract Concepts', 'AI Processing', 'Concepts Displayed']} />
        <Choices label="From a concept" items={['Click → Explanation', 'Save → Add to Map']} />
        <Path label="Summarize a note" steps={['Note Content', 'Summarize', 'AI Processing', 'Summary']} />
    </>,
  },
  {
    title: 'Concept Map',
    content: <>
        <Path label="Open the concept map" steps={['Dashboard', 'Concept Map', 'Has Concepts?']} />
        <Path label="With concepts" steps={['View Map', 'Click Node', 'See Connections']} />
        <Path label="Without concepts" steps={['Empty State', 'Create Notes']} />
    </>,
  },
  {
    title: 'Review Session',
    content: <>
        <Path label="Open review" steps={['Dashboard', 'Review Page', 'Has Concepts?']} />
        <Path label="Review a concept" steps={['Start', 'Question', 'Answer', 'Feedback', 'More?']} />
        <p className="neura-flow-repeat">Repeat for another concept, or finish the session.</p>
        <Path label="Finish review" steps={['Complete', 'View Insights']} />
    </>,
  },
  {
    title: 'Insights',
    content: <>
        <Path label="Open learning insights" steps={['Dashboard', 'Insights Page', 'Has Content?']} />
        <Choices label="With content" items={['AI Coach Summary', 'Strengths & Focus', 'Progress Bars', 'Weekly Reflection']} />
    </>,
  },
] as const

export default function NeuraUserFlows() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % journeys.length; break
      case 'ArrowLeft': next = (index - 1 + journeys.length) % journeys.length; break
      case 'Home': next = 0; break
      case 'End': next = journeys.length - 1; break
      default: return
    }
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus({ preventScroll: true })
  }

  return <div className="neura-chapter" id="neura-flows" aria-labelledby="neura-flows-title">
    <h3 id="neura-flows-title">User Flows & Core Features</h3>
    <p>Six core journeys mapped from research insights, from first visit to reviewing what you have learned. Choose a journey to view its steps.</p>
    <div className="neura-flow-tabs" role="tablist" aria-label="Choose a NeuraNote journey">
      {journeys.map((journey, index) => {
        const number = String(index + 1).padStart(2, '0')
        return <button key={journey.title} type="button" role="tab" id={`neura-flow-tab-${number}`} aria-selected={selected === index} aria-controls={`neura-flow-panel-${number}`} tabIndex={selected === index ? 0 : -1} ref={element => { tabs.current[index] = element }} onClick={() => setSelected(index)} onKeyDown={event => onTabKeyDown(event, index)}>
          <span>{number}</span><strong>{journey.title}</strong>
        </button>
      })}
    </div>
    <div className="neura-flow-stack">
      {journeys.map((journey, index) => {
        const number = String(index + 1).padStart(2, '0')
        return <section className="neura-journey" key={journey.title} id={`neura-flow-panel-${number}`} role="tabpanel" aria-labelledby={`neura-flow-tab-${number}`} hidden={selected !== index} tabIndex={0}>
          <header><span>{number}</span><h4>{journey.title}</h4></header>
          {journey.content}
        </section>
      })}
    </div>
    <div className="neura-note-block"><p>I mapped research insights to six user journeys, each designed to minimize friction while maximizing learning: capture quickly, see connections automatically, review effectively.</p></div>
  </div>
}

function Path({ label, steps }: { label: string; steps: string[] }) {
  return <div className="neura-flow-path">
    <p>{label}</p>
    <ol aria-label={label}>
      {steps.map((step, index) => <li key={step}>{step}{index < steps.length - 1 && <span aria-hidden="true">→</span>}</li>)}
    </ol>
  </div>
}

function Choices({ label, items }: { label: string; items: string[] }) {
  return <div className="neura-flow-options">
    <p>{label}</p>
    <ul aria-label={label}>{items.map(item => <li key={item}>{item}</li>)}</ul>
  </div>
}
