"use client"

import { Image } from '@/portfolio/compat'
import CrusoeCostWalkthrough from './CrusoeCostWalkthrough'
import { CrusoeEvidenceChain, CrusoeProjectProcess, CrusoeProjectNextSteps, crusoeNarratives, usageToCostInsights } from './CrusoeStoryContent'

const imageRoot = '/images/crusoe/usage-to-cost/story-screen-only'
const questions = [
  ['01', 'What changed?', 'Compare the totals and dates, then inspect the daily pattern.'],
  ['02', 'Which product contributed?', 'Break the total into products, real pricing units, and inspectable detail.'],
  ['03', 'What should I investigate?', 'Move from aggregate usage to workload metrics, individual requests, and account activity.'],
] as const
const beforeFlow = ['Read the total', 'Find usage elsewhere', 'Rebuild the comparison', 'Infer the cause by hand']
const afterFlow = ['Compare spend', 'Inspect product pricing', 'Check usage and workload', 'Review requests and account activity']

type StoryShot = { file: string; step: number; title: string; alt: string; note: string }
function CostScreenshot({ file, step, title, alt, note }: StoryShot) {
  const src = `${imageRoot}/${file}.jpg`
  return (
    <figure className="crusoe-cost-story-shot" data-design-version="after" aria-label={`After redesign — Step ${step}: ${title}`} data-study-reveal>
      <header className="crusoe-cost-shot-header">
        <span className="crusoe-cost-version-badge">After · Proposed redesign</span>
        <span>Step {String(step).padStart(2, '0')} / 06</span>
      </header>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`Open ${title} screenshot at full size`}>
        <Image src={src} alt={`Proposed redesign: ${alt}`} width={1280} height={690} sizes="(max-width: 760px) 90vw, (max-width: 1440px) 43vw, 680px" />
        <span className="crusoe-cost-expand" aria-hidden="true">↗</span>
      </a>
      <figcaption><h4>{title}</h4><p>{note}</p></figcaption>
    </figure>
  )
}

function DecisionNote({ problem, decision, why }: { problem: string; decision: string; why: string }) {
  return <dl className="crusoe-cost-change-note" aria-label="Problem, design decision, and rationale"><div><dt>The problem</dt><dd>{problem}</dd></div><div><dt>My design decision</dt><dd>{decision}</dd></div><div><dt>Why it helps</dt><dd>{why}</dd></div></dl>
}

export default function CrusoeUsageCostStory() {
  return (
    <section id="crusoe-panel-usage-to-cost" role="tabpanel" aria-label="Usage-to-cost project" className="crusoe-case-section project-section coral-section crusoe-project-panel crusoe-cost-story">
      <div className="crusoe-section-label"><span>Project 03</span><strong>Intelligence Foundry · Usage &amp; billing</strong></div>
      <div className="crusoe-project-heading crusoe-project-heading-visual">
        <h2>Help teams understand what is behind an AI bill.</h2>
        <p>I designed a path from a billing total to product charges, consumption, and request evidence. The goal was to make the next investigative step clear while keeping project, dates, and units in view.</p>
        <figure className="crusoe-opening-preview">
          <a href={`${imageRoot}/billing-comparison.jpg`} target="_blank" rel="noreferrer" aria-label="Open the proposed Billing overview preview">
            <Image src={`${imageRoot}/billing-comparison.jpg`} alt="Proposed Billing overview with dated period totals and daily spending" width={1280} height={690} sizes="(max-width: 900px) 90vw, 520px" />
          </a>
          <figcaption>Proposed · Billing overview <span aria-hidden="true">↗</span></figcaption>
        </figure>
      </div>
      <dl className="refined-facts crusoe-cost-brief" aria-label="Usage and billing project brief">
        <div><dt>The customer</dt><dd>A developer or team member investigating an unexpected AI usage or cost change.</dd></div>
        <div><dt>My contribution</dt><dd>Workflow mapping, information hierarchy, interaction design, connected prototype, and cross-functional review.</dd></div>
        <div><dt>What I delivered</dt><dd>A proposed experience across Billing, Usage, Analytics, event logs, and account activity.</dd></div>
      </dl>
      <aside className="refined-note" aria-label="Design goal"><strong>Design goal</strong><p>Let a customer follow a cost question without rebuilding the comparison at every step.</p></aside>
      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-problem-title">
        <div className="crusoe-clean-heading"><span>01 / Research &amp; framing</span><div><h3 id="crusoe-cost-problem-title">The customer had to assemble the explanation.</h3><p>I mapped the existing workflow across billing, usage, analytics, and logs. The recurring issue was continuity: each view held a useful fragment, but moving between them meant rebuilding scope and interpreting different measures.</p></div></div>
        <div className="crusoe-cost-flow-comparison" aria-label="Cost investigation before and after">
          <div className="crusoe-cost-workflow-before"><span>Before · Previous workflow</span><h4>The customer connected the evidence by hand.</h4><ol>{beforeFlow.map(step => <li key={step}>{step}</li>)}</ol><p>Workflow summary of the documented problem. This is not a screenshot of the old interface.</p></div>
          <div className="crusoe-cost-workflow-after"><span>After · Proposed redesign</span><h4>Each question leads to the next relevant view.</h4><ol>{afterFlow.map(step => <li key={step}>{step}</li>)}</ol><p>The video and all six screenshots below demonstrate this proposed direction.</p></div>
        </div>
        <CrusoeEvidenceChain rows={usageToCostInsights} caption="How the workflow analysis shaped the design" />
      </section>

      <CrusoeProjectProcess story={crusoeNarratives['usage-to-cost']} />

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-process-title">
        <div className="crusoe-clean-heading"><span>02 / Structure the investigation</span><div><h3 id="crusoe-cost-process-title">Give each view one question to answer.</h3><p>I kept Billing focused on charges, Usage on consumption, and Analytics and logs on investigation. This makes detail available progressively instead of turning the billing overview into an operational dashboard.</p></div></div>
        <div className="crusoe-research-questions" aria-label="Questions guiding the investigation">{questions.map(([number, title, body]) => <article key={number}><span>{number}</span><h4>{title}</h4><p>{body}</p></article>)}</div>
        <p className="crusoe-cost-tradeoff"><strong>The tradeoff:</strong> one large dashboard would put every signal in reach, but make the first cost question harder to answer. I chose connected, focused views; carrying scope between them becomes an explicit interaction requirement.</p>
        <CrusoeCostWalkthrough />
        <details className="crusoe-story-evidence"><summary>How I mapped and reviewed the investigation</summary><div className="crusoe-story-evidence-body"><p>I mapped the customer’s questions to the evidence on each screen, explored the connected path in a prototype, and refined it through cross-functional reviews. Tokens, seconds, dollars, request counts, and response times needed to connect without becoming one generic measure. This work is supported by workflow analysis and prototype review; no new customer study is claimed.</p></div></details>
      </section>

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-billing-title">
        <div className="crusoe-clean-heading"><span>03 / Decision · Billing hierarchy</span><div><h3 id="crusoe-cost-billing-title">Orient first. Explain the charge on demand.</h3><p>I placed dated totals and daily spend before product detail. A customer can establish the period, choose a product, and inspect its pricing without starting a new investigation.</p></div></div>
        <DecisionNote problem="The customer had to assemble the explanation behind a total." decision="Show period totals and daily spend, then reveal product pricing on demand." why="Start with the comparison; let the customer choose which product to inspect next." />
        <div className="crusoe-cost-still-grid" role="group" aria-label="After redesign: Billing overview, then product detail">
          <CostScreenshot file="billing-comparison" step={1} title="Check what each total covers" alt="Billing view showing current and previous month totals with explicit dates and a daily spend chart" note="Dates sit beside the totals. The captured current month is partial, so these amounts need period context before someone interprets the difference." />
          <CostScreenshot file="product-detail" step={2} title="Open the product’s pricing detail" alt="Product cost detail panel with usage, unit costs, and line-item prices" note="Next: open a product card from Billing to inspect its usage and pricing. The detail panel keeps the investigation within the same flow." />
        </div>
      </section>

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-usage-title">
        <div className="crusoe-clean-heading"><span>04 / Decision · Measurement clarity</span><div><h3 id="crusoe-cost-usage-title">Reuse the pattern. Preserve the meaning of the number.</h3><p>I reused comparison cards and chart interactions for Usage, while keeping the consumption unit explicit. Analytics then adds traffic and response-time context. Consistency should help the reader navigate, not suggest that every metric is a billing unit.</p></div></div>
        <DecisionNote problem="Different measures were difficult to interpret across separate screens." decision="Reuse comparison and chart patterns, but keep each view’s units explicit." why="Consumption explains usage; workload metrics guide investigation. They are related evidence, not interchangeable billing units." />
        <div className="crusoe-cost-still-grid" role="group" aria-label="After redesign: Usage comparison, then workload analytics">
          <CostScreenshot file="usage-comparison" step={3} title="Check the usage measure" alt="Usage view with input, output, and cached token tabs above comparison cards and a daily chart" note="Choose the usage measure and read it with the selected dates. The comparison pattern stays familiar as the units change." />
          <CostScreenshot file="workload-analytics" step={4} title="Inspect the workload" alt="Operational analytics showing request rate, throughput, token volume, and response time" note="Continue into Analytics to inspect traffic and performance. Usage explains consumption; this view adds operational context to investigate." />
        </div>
      </section>

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-investigation-title">
        <div className="crusoe-clean-heading"><span>05 / Decision · Evidence &amp; next actions</span><div><h3 id="crusoe-cost-investigation-title">Give the investigation somewhere useful to go.</h3><p>A chart can show where to look, but not explain a cause by itself. I separated request logs from account activity so the customer can inspect what ran and what changed, without confusing correlation with an explanation.</p></div></div>
        <DecisionNote problem="Customers had to connect summary charts with request and account evidence by hand." decision="Include request-level logs and account activity in the investigation path." why="Separate workload behavior from configuration changes. A nearby model update is context to examine, not proof that it caused the bill." />
        <div className="crusoe-cost-still-grid" role="group" aria-label="After redesign: Request logs, then account activity">
          <CostScreenshot file="request-evidence" step={5} title="Read individual requests" alt="Event logs with request rows, model and version, token counts, timing, status codes, search, and export" note="Use status, token counts, timing, and search to narrow the request evidence. Export supports a closer investigation." />
          <CostScreenshot file="activity-history" step={6} title="Check account activity" alt="Activity history with model checkpoint updates, endpoint changes, timestamps, and activity filters" note="Review model updates and endpoint actions separately from requests. This adds context; it does not establish what caused the cost change." />
        </div>
      </section>

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-decisions-title">
        <div className="crusoe-clean-heading"><span>06 / Delivery &amp; evaluation</span><div><h3 id="crusoe-cost-decisions-title">Design the connections as carefully as the screens.</h3><p>My deliverable was the connected design and prototype, refined in cross-functional reviews. The engineering discussion needed to cover retained scope, comparable periods, available data, and recovery states—not just the appearance of each screen.</p></div></div>
        <dl className="crusoe-story-context crusoe-story-deliverables" aria-label="Usage-to-cost outcomes">
          <div><dt>Delivered</dt><dd>A connected design and prototype spanning usage, billing, workload metrics, and logs</dd></div>
          <div><dt>Design decisions</dt><dd>Progressive cost detail, explicit measurement units, and a route from overview to operational evidence</dd></div>
          <div><dt>Outcome status</dt><dd>Prototype direction reviewed cross-functionally; customer impact has not been measured</dd></div>
        </dl>
        <div className="crusoe-cost-review" aria-label="Cross-functional review priorities"><h4>What I would check before release</h4><ul><li><strong>Period and pricing integrity.</strong> Reconcile line items, subtotals, and rates; distinguish partial from complete periods.</li><li><strong>Preserved context.</strong> Verify the selected project, model, and dates across each view; make scope changes visible.</li><li><strong>Unavailable evidence.</strong> Distinguish no activity from missing or delayed data, with a useful recovery action.</li></ul><p>The prototype captures use different sample dates and amounts. They establish the interaction direction, not a reconciled billing dataset or a verified production integration.</p></div>
        <CrusoeProjectNextSteps story={crusoeNarratives['usage-to-cost']} />
      </section>
    </section>
  )
}
