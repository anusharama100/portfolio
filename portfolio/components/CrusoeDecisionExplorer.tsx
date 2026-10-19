"use client"

import { useState } from 'react'
import { Image } from '@/portfolio/compat'

export type CrusoeDecision = {
  id: string
  label: string
  question: string
  decision: string
  why: string
  tradeoff: string
  check: string
  steps: Array<{
    label: string
    shortLabel: string
    status: string
    caption: string
    src: string
    width: number
    height: number
  }>
}

export default function CrusoeDecisionExplorer({ decisions }: { decisions: CrusoeDecision[] }) {
  const [decisionIndex, setDecisionIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const decision = decisions[decisionIndex]
  const step = decision.steps[stepIndex]

  return (
    <section className="crusoe-decision-explorer" aria-labelledby="crusoe-decision-explorer-title">
      <header className="crusoe-decision-heading">
        <span>Inside the decisions</span>
        <h4 id="crusoe-decision-explorer-title">Explore the reasoning, not just the final screens.</h4>
        <p>Choose a design decision, then step through its evidence. Each story connects what I found, what I changed, and the constraints behind the choice.</p>
      </header>

      <div className="crusoe-decision-choices" role="group" aria-label="Choose a design decision">
        {decisions.map((item, index) => (
          <button key={item.id} type="button" aria-label={`Explore ${item.label}`} aria-pressed={index === decisionIndex} aria-controls="crusoe-active-decision" onClick={() => { setDecisionIndex(index); setStepIndex(0) }}>
            <span>0{index + 1}</span><strong>{item.label}</strong><small>{item.question}</small>
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">Showing {decision.label}: {step.label}, evidence {stepIndex + 1} of {decision.steps.length}.</p>
      <div id="crusoe-active-decision" className="crusoe-active-decision" role="region" aria-label={`${decision.label} design reasoning`}>
        <div className="crusoe-decision-intro"><span>Decision 0{decisionIndex + 1}</span><h5>{decision.decision}</h5></div>
        <div className="crusoe-decision-body">
          <div className="crusoe-decision-evidence">
            <div className="crusoe-decision-stage-heading"><strong>{step.label}</strong><span>{step.status}</span></div>
            <figure>
              <a className="crusoe-decision-image" href={step.src} target="_blank" rel="noreferrer" aria-label={`Open ${step.label} evidence at full size`}>
                <Image src={step.src} alt={`${decision.label}: ${step.label}`} width={step.width} height={step.height} sizes="(max-width: 900px) 90vw, 780px" />
              </a>
              <figcaption><p>{step.caption}</p><a href={step.src} target="_blank" rel="noreferrer">Open full frame ↗</a></figcaption>
            </figure>
            <div className="crusoe-decision-step-controls" role="group" aria-label="Step through decision evidence">
              <button type="button" aria-label="Previous evidence" disabled={stepIndex === 0} onClick={() => setStepIndex(index => index - 1)}>←</button>
              <div>{decision.steps.map((item, index) => <button key={item.label} type="button" aria-label={`Show ${item.label}`} aria-pressed={index === stepIndex} onClick={() => setStepIndex(index)}><span className="crusoe-step-number">{index + 1}</span><span className="crusoe-step-full">{item.label}</span><span className="crusoe-step-short" aria-hidden="true">{item.shortLabel}</span></button>)}</div>
              <span className="crusoe-decision-count" aria-hidden="true">{stepIndex + 1} / {decision.steps.length}</span>
              <button type="button" aria-label="Next evidence" disabled={stepIndex === decision.steps.length - 1} onClick={() => setStepIndex(index => index + 1)}>→</button>
            </div>
          </div>
          <dl className="crusoe-decision-reasoning">
            <div><dt>Why this choice</dt><dd>{decision.why}</dd></div>
            <div><dt>The constraint / tradeoff</dt><dd>{decision.tradeoff}</dd></div>
            <div><dt>Implementation / QA checks</dt><dd>{decision.check}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
