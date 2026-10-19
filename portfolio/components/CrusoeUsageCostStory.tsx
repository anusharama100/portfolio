"use client"

import { Image } from '@/portfolio/compat'
import CrusoeCostWalkthrough from './CrusoeCostWalkthrough'
import { CrusoeEvidenceChain, CrusoeProjectBrief, CrusoeProjectProcess, CrusoeProjectCollaboration, CrusoeProjectNextSteps, crusoeNarratives, usageToCostInsights } from './CrusoeStoryContent'

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
      <div className="crusoe-section-label"><span>Project overview</span><strong>Intelligence Foundry · Usage &amp; billing</strong></div>
      <div className="crusoe-project-heading">
        <h2>Turn a cost total into a clear next step.</h2>
        <p>When an AI bill changes, a team needs more than a number. They need to know which product contributed, what the workload did, and where to investigate. I designed a path connecting those questions instead of treating Usage, Billing, and logs as isolated pages.</p>
      </div>
      <CrusoeProjectBrief story={crusoeNarratives['usage-to-cost']} />
      <aside className="crusoe-cost-reading-guide" aria-label="How to read the design evidence">
        <h3>All visuals below show the proposed redesign.</h3>
        <p><strong>Before:</strong> the previous investigation is explained as a workflow summary, not an original interface capture.</p>
        <p><strong>After:</strong> every screenshot and the video show my proposed redesign. Images shown together are different steps in that same design—not before/after pairs.</p>
      </aside>
      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-problem-title">
        <div className="crusoe-clean-heading"><span>01 · The problem, then the change</span><div><h3 id="crusoe-cost-problem-title">Seeing the bill was not the same as understanding it.</h3><p>Intelligence Foundry lets developers run hosted AI models. Text usage is measured in tokens—pieces of processed text—while video usage is measured in generation time. A dollar total cannot explain those different activities on its own.</p></div></div>
        <div className="crusoe-cost-flow-comparison" aria-label="Cost investigation before and after">
          <div className="crusoe-cost-workflow-before"><span>Before · Previous workflow</span><h4>The customer connected the evidence by hand.</h4><ol>{beforeFlow.map(step => <li key={step}>{step}</li>)}</ol><p>Workflow summary of the documented problem. This is not a screenshot of the old interface.</p></div>
          <div className="crusoe-cost-workflow-after"><span>After · Proposed redesign</span><h4>Each question leads to the next relevant view.</h4><ol>{afterFlow.map(step => <li key={step}>{step}</li>)}</ol><p>The video and all six screenshots below demonstrate this proposed direction.</p></div>
        </div>
        <p className="crusoe-cost-evidence-note">The change is in the investigation path: compare spend → inspect a product → check usage → review requests and account activity.</p>
        <div className="crusoe-research-questions" aria-label="Questions guiding the investigation">{questions.map(([number, title, body]) => <article key={number}><span>{number}</span><h4>{title}</h4><p>{body}</p></article>)}</div>
      </section>

      <CrusoeProjectProcess story={crusoeNarratives['usage-to-cost']} />
      <CrusoeProjectCollaboration story={crusoeNarratives['usage-to-cost']} />

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-process-title">
        <div className="crusoe-clean-heading"><span>02 · After / The redesigned journey</span><div><h3 id="crusoe-cost-process-title">How the redesign helps investigate a bill.</h3><p>The idea is to move from “What am I paying?” to “What should I inspect?” The clip shows the proposed screens for that investigation: the bill, product charges, usage, performance, and logs. Each timestamp below explains what is on screen and why I designed it that way.</p></div></div>
        <CrusoeCostWalkthrough />
        <details className="crusoe-story-evidence"><summary>How I mapped and reviewed the investigation</summary><div className="crusoe-story-evidence-body"><p>I mapped the customer’s questions to the evidence on each screen, explored the connected path in a prototype, and refined it through cross-functional reviews. One constraint shaped the design: tokens, seconds, dollars, request counts, and response times needed to connect without being treated as the same measure.</p><CrusoeEvidenceChain rows={usageToCostInsights} caption="How the workflow analysis shaped the design" /></div></details>
      </section>

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-billing-title">
        <div className="crusoe-clean-heading"><span>03 · After / Decision 01 / Billing</span><div><h3 id="crusoe-cost-billing-title">Start with the bill, then reveal the product costs.</h3><p>These are two moments in the redesign: the Billing overview, then a product’s detail panel. I placed dates and period totals first so the customer has context before opening the pricing breakdown.</p></div></div>
        <DecisionNote problem="The customer had to assemble the explanation behind a total." decision="Show period totals and daily spend, then reveal product pricing on demand." why="Start with the comparison; let the customer choose which product to inspect next." />
        <div className="crusoe-cost-still-grid" role="group" aria-label="After redesign: Billing overview, then product detail">
          <CostScreenshot file="billing-comparison" step={1} title="Compare the periods" alt="Billing view showing current and previous month totals with explicit dates and a daily spend chart" note="Start here: read the dates and totals, then inspect the daily spend pattern. This is the redesigned Billing overview." />
          <CostScreenshot file="product-detail" step={2} title="Open the product’s pricing detail" alt="Product cost detail panel with usage, unit costs, and line-item prices" note="Next: open a product card from Billing to inspect its usage and pricing. The detail panel keeps the investigation within the same flow." />
        </div>
      </section>

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-usage-title">
        <div className="crusoe-clean-heading"><span>04 · After / Decision 02 / Usage &amp; workload</span><div><h3 id="crusoe-cost-usage-title">Separate what was used from how it performed.</h3><p>The Usage screen explains consumption; Analytics adds workload and performance context. Both are redesigned views. Their shared layout reduces relearning, while explicit units keep tokens, seconds, and response times distinct.</p></div></div>
        <DecisionNote problem="Different measures were difficult to interpret across separate screens." decision="Reuse comparison and chart patterns, but keep each view’s units explicit." why="Consumption explains usage; workload metrics guide investigation. They are related evidence, not interchangeable billing units." />
        <div className="crusoe-cost-still-grid" role="group" aria-label="After redesign: Usage comparison, then workload analytics">
          <CostScreenshot file="usage-comparison" step={3} title="Check the usage measure" alt="Usage view with input, output, and cached token tabs above comparison cards and a daily chart" note="Choose the usage measure and read it with the selected dates. The comparison pattern stays familiar as the units change." />
          <CostScreenshot file="workload-analytics" step={4} title="Inspect the workload" alt="Operational analytics showing request rate, throughput, token volume, and response time" note="Continue into Analytics to inspect traffic and performance. Usage explains consumption; this view adds operational context to investigate." />
        </div>
      </section>

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-investigation-title">
        <div className="crusoe-clean-heading"><span>05 · After / Decision 03 / Investigation</span><div><h3 id="crusoe-cost-investigation-title">Inspect requests, then check account changes.</h3><p>Event logs show what ran. Activity history shows what changed in the system. I kept them as separate views in the redesign so a customer can examine both without treating a nearby change as proof of the cause.</p></div></div>
        <DecisionNote problem="Customers had to connect summary charts with request and account evidence by hand." decision="Include request-level logs and account activity in the investigation path." why="Separate workload behavior from configuration changes. A nearby model update is context to examine, not proof that it caused the bill." />
        <div className="crusoe-cost-still-grid" role="group" aria-label="After redesign: Request logs, then account activity">
          <CostScreenshot file="request-evidence" step={5} title="Read individual requests" alt="Event logs with request rows, model and version, token counts, timing, status codes, search, and export" note="Use status, token counts, timing, and search to narrow the request evidence. Export supports a closer investigation." />
          <CostScreenshot file="activity-history" step={6} title="Check account activity" alt="Activity history with model checkpoint updates, endpoint changes, timestamps, and activity filters" note="Review model updates and endpoint actions separately from requests. This adds context; it does not establish what caused the cost change." />
        </div>
      </section>

      <section className="crusoe-clean-section crusoe-cost-section" aria-labelledby="crusoe-cost-decisions-title">
        <div className="crusoe-clean-heading"><span>06 · Review, outcome &amp; next steps</span><div><h3 id="crusoe-cost-decisions-title">From isolated views to a guided investigation.</h3><p>I delivered a design and prototype across Usage, Billing, Analytics, event logs, and activity history. The captures demonstrate the design direction; they are not evidence of a measured reduction in cost or investigation time.</p></div></div>
        <dl className="crusoe-story-context crusoe-story-deliverables" aria-label="Usage-to-cost outcomes">
          <div><dt>Delivered</dt><dd>A connected design and prototype spanning usage, billing, workload metrics, and logs</dd></div>
          <div><dt>Design decisions</dt><dd>Progressive cost detail, explicit measurement units, and a route from overview to operational evidence</dd></div>
          <div><dt>Outcome status</dt><dd>Prototype direction reviewed cross-functionally; customer impact has not been measured</dd></div>
        </dl>
        <div className="crusoe-cost-review" aria-label="Cross-functional review priorities"><h4>What matters in cross-functional review</h4><ul><li><strong>Comparable periods.</strong> Check date lengths and baselines before interpreting a change.</li><li><strong>Preserved context.</strong> Confirm the project, model, and dates carry across each handoff between views.</li><li><strong>Clear states and next actions.</strong> Review empty, loading, error, and unavailable-data cases alongside the happy path.</li></ul></div>
        <CrusoeProjectNextSteps story={crusoeNarratives['usage-to-cost']} />
      </section>
    </section>
  )
}
