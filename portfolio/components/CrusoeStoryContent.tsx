"use client"

// Project framing is grounded in the existing Console artifacts and delivery notes.
// Performance figures are reported in the user's latest supplied résumé.
// It does not specify sample sizes, dates, or a study protocol; do not infer them.
export const crusoeNarratives = {
  'empty-state-system': {
    projectName: 'Empty-state system',
    metrics: [['60% → 72%', 'first-resource creation', 'Reported first-use outcome'], ['−20%', 'median setup time', 'Reported first-use outcome'], ['70% → 85%', 'correct next-step identification', 'Reported guidance outcome']],
    metricSource: 'Outcomes reported in the supplied résumé; sample sizes and measurement dates are not specified. Proposed V2 designs are shown separately.',
    additionalMetrics: [['80%', 'of in-scope surfaces adopted the patterns', 'Pattern adoption'], ['−25%', 'average design time per state', 'Design efficiency'], ['30% → 22%', 'onboarding drop-off', 'Reported first-use outcome']],
    processTitle: 'From first-run gaps to a reusable system.',
    process: [
      { title: 'Research', body: 'Audit first-run screens and compare cloud-product patterns.' },
      { title: 'Synthesize', body: 'Identify gaps in purpose, actions, and setup guidance.' },
      { title: 'Design', body: 'Build one pattern; adapt it to each resource.' },
      { title: 'Review', body: 'Refine with the team; separate V1 from proposed V2.' },
    ],
    collaborationTitle: 'Refining the guidance with the people building it.',
    collaboration: [
      { title: 'Agree on the first-run gaps', partner: 'Design + product', body: 'Review the audit together and focus the system on the explanations and next actions a new customer needs.' },
      { title: 'Separate V1 from V2', partner: 'Product + engineering', body: 'Keep the first-release pattern focused; document setup recommendations and state-aware guidance as a proposed next iteration.' },
      { title: 'Refine words and visuals', partner: 'Design + brand + writing', body: 'Review the illustration, terminology, and amount of guidance so each product feels consistent without losing its specific context.' },
      { title: 'Make the states buildable', partner: 'Design + engineering', body: 'Document product variants, actions, and edge cases so the handoff explains behavior as well as the final screen.' },
    ],
    audience: 'A customer setting up their first cloud resource in the Console.',
    challenge: 'An empty page could show what was missing without explaining the resource, its requirements, or the next step.',
    role: 'I audited first-run experiences, designed a reusable guidance pattern, and refined the content and scope with the team.',
    goal: 'Help new customers understand the resource and know what to do next.',
    takeaways: [
      { title: 'An empty state is a starting point.', body: 'Explain the resource, offer one action, and keep help nearby.' },
      { title: 'Consistency needs room for context.', body: 'Reuse the hierarchy, not identical copy for every product.' },
      { title: 'Separate the foundation from the future.', body: 'Keep V1 buildable; document richer setup guidance as V2.' },
    ],
    next: 'Break out creation, setup time, and drop-off by product and cohort; check whether the reported gains persist over time.',
  },
  'heuristic-evaluation': {
    projectName: 'Heuristic evaluation',
    metrics: [['75% → 85%', 'task completion', 'Across 3 reviewed workflows'], ['60% → 75%', 'error recovery', 'Across 3 reviewed workflows'], ['9', 'improvements shipped', 'Delivery outcome']],
    metricSource: 'Completion and recovery rates are reported in the supplied résumé across API keys, node monitoring, and billing. Sample sizes and measurement dates are not specified.',
    additionalMetrics: [],
    processTitle: 'From journey findings to shipped improvements.',
    process: [
      { title: 'Research', body: 'Walk through API keys, billing, and resource debugging.' },
      { title: 'Synthesize', body: 'Rank findings by severity and task impact.' },
      { title: 'Design', body: 'Explore safer defaults, cost context, and recovery paths.' },
      { title: 'Review', body: 'Scope Jira tickets and check implementation through QA.' },
    ],
    collaborationTitle: 'Turning evaluation findings into agreed fixes.',
    collaboration: [
      { title: 'Review the task, not just the screen', partner: 'Design + product', body: 'Discuss the cost, API-key, and debugging journeys in context and connect each finding to a concrete customer consequence.' },
      { title: 'Set a realistic scope', partner: 'Product + engineering', body: 'Rank recommendations by impact and effort, separating quick fixes from larger proposed directions.' },
      { title: 'Define the expected behavior', partner: 'Design + engineering', body: 'Translate recommendations into Jira tickets with the problem, proposed response, and clear acceptance criteria.' },
      { title: 'Review implementation through QA', partner: 'Design + engineering', body: 'Check normal, loading, empty, and error states against the original finding; distinguish the nine shipped improvements from additional proposals.' },
    ],
    audience: 'A Console customer checking a bill, creating an API key, or diagnosing an unhealthy resource.',
    challenge: 'The necessary screens existed, but inconsistent guidance, risky defaults, and lost context made complete tasks harder to follow.',
    role: 'I evaluated three journeys against ten usability principles, prioritized findings, wrote engineering tickets, and reviewed fixes with engineering through QA.',
    goal: 'Make critical tasks easier to find, safer to complete, and easier to recover from.',
    takeaways: [
      { title: 'A finding needs a design response.', body: 'Pair each observed problem with a specific, buildable recommendation.' },
      { title: 'Follow the task, not just the screen.', body: 'Defaults, context, and recovery matter across the whole journey.' },
      { title: 'The work continues through QA.', body: 'Track recommendations through implementation; label extra proposals separately.' },
    ],
    next: 'Break out task completion and recovery by journey, then check whether the gains persist. Evaluate additional proposals separately from shipped fixes.',
  },
  'usage-to-cost': {
    projectName: 'Usage → cost',
    metrics: [['5', 'connected product views', 'Design scope'], ['6', 'prototype screens shown', 'Design evidence'], ['Prototype', 'reviewed cross-functionally', 'Not measured impact']],
    metricSource: null,
    additionalMetrics: [],
    processTitle: 'From a cost question to a connected investigation.',
    process: [
      { title: 'Research', body: 'Map the path between usage, billing, analytics, and logs.' },
      { title: 'Synthesize', body: 'Identify where filters, units, and context break down.' },
      { title: 'Design', body: 'Connect the bill to product detail and request evidence.' },
      { title: 'Review', body: 'Walk through the prototype with product and engineering.' },
    ],
    collaborationTitle: 'Reviewing the connections between views—not just the views.',
    collaboration: [
      { title: 'Frame the investigation', partner: 'Design + product', body: 'Keep reviews anchored to the questions: what changed, which product contributed, and where should someone look next?' },
      { title: 'Surface constraints', partner: 'Product + engineering', body: 'Review measurement units, available detail, and filter behavior across Usage, Billing, Analytics, and logs.' },
      { title: 'Walk through the prototype', partner: 'Cross-functional reviews', body: 'Follow the connected path to inspect hierarchy, progressive detail, and whether the next investigative step is clear.' },
      { title: 'Document continuity', partner: 'Design + engineering', body: 'Specify selected scope and state behavior between views; treat the prototype as design evidence, not a measured customer outcome.' },
    ],
    audience: 'A developer or team member trying to understand an unexpected change in AI usage or cost.',
    challenge: 'Usage, Billing, Analytics, and logs held different parts of the answer, with repeated filters and different measurement units.',
    role: 'I mapped the investigation, designed the connected views, and prototyped how scope and context carry from one screen to the next.',
    goal: 'Connect a cost change to the product and activity behind it, without losing context.',
    takeaways: [
      { title: 'Start with the question, not the chart.', body: 'Give each view a job: compare, explain, or investigate.' },
      { title: 'Share patterns without flattening meaning.', body: 'Reuse layouts while keeping dollars, tokens, and response times distinct.' },
      { title: 'An investigation needs continuity.', body: 'Carry project, model, and date context between views.' },
    ],
    next: 'Measure whether someone can trace a sample cost change to the correct product and request, keep the intended project and dates, and choose an appropriate next action.',
  },
} as const

type ProjectNarrative = (typeof crusoeNarratives)[keyof typeof crusoeNarratives]

type CrusoeMetric = readonly [value: string, description: string, context: string]

export function CrusoeMetricList({ metrics, label }: { metrics: readonly CrusoeMetric[]; label: string }) {
  return (
    <dl className="crusoe-story-metrics" aria-label={label}>
      {metrics.map(([value, description, context]) => {
        const [before, after] = value.split(' → ')
        return <div key={description}><dt>{context}</dt><dd><span className="crusoe-metric-value">{after && <small>{before} → </small>}<strong>{after ?? before}</strong></span><span className="crusoe-metric-label">{description}</span></dd></div>
      })}
    </dl>
  )
}

export function CrusoeProjectProcess({ story }: { story: ProjectNarrative }) {
  return (
    <section className="crusoe-project-process" aria-label={`${story.projectName} process`} data-study-reveal>
      <div className="crusoe-project-process-heading"><span>Process · {story.projectName}</span><h3>{story.processTitle}</h3></div>
      <ol className="crusoe-project-process-steps">
        {story.process.map((step, index) => (
          <li key={step.title}><span aria-hidden="true">0{index + 1}</span><h4>{step.title}</h4><p>{step.body}</p></li>
        ))}
      </ol>
    </section>
  )
}

export function CrusoeProjectCollaboration({ story }: { story: ProjectNarrative }) {
  return (
    <section className="crusoe-project-collaboration" aria-label={`${story.projectName} collaboration`} data-study-reveal>
      <details className="crusoe-collaboration-details">
      <summary>Collaboration &amp; delivery notes</summary>
      <div className="crusoe-project-collaboration-heading"><span>Collaboration · {story.projectName}</span><h3>{story.collaborationTitle}</h3></div>
      <ul className="crusoe-project-collaboration-steps">
        {story.collaboration.map(step => (
          <li key={step.title}><span>{step.partner}</span><h4>{step.title}</h4><p>{step.body}</p></li>
        ))}
      </ul>
      </details>
    </section>
  )
}

export function CrusoeProjectBrief({ story, label = 'Project brief' }: { story: ProjectNarrative; label?: string }) {
  return (
    <div className="crusoe-narrative-opening" data-study-reveal>
      <CrusoeMetricList metrics={story.metrics} label={`${story.projectName} scope and outcomes`} />
      {story.metricSource && <p className="crusoe-metric-source" aria-label={`${story.projectName} metric source`}>{story.metricSource}</p>}
      <aside className="crusoe-narrative-goal" aria-label="Design goal"><span>Design goal</span><p>{story.goal}</p></aside>
      <details className="crusoe-project-context"><summary>Project context &amp; my role</summary>
      <dl className="crusoe-narrative-brief" aria-label={label}>
        <div><dt>Who this is for</dt><dd>{story.audience}</dd></div>
        <div><dt>The challenge</dt><dd>{story.challenge}</dd></div>
        <div><dt>My role</dt><dd>{story.role}</dd></div>
      </dl>
      </details>
    </div>
  )
}

export type CrusoeInsight = { observation: string; evidence: string; consequence: string; decision: string }

export const heuristicInsights: CrusoeInsight[] = [
  {
    observation: 'Guidance arrived after the risky decision.',
    evidence: 'The API-key modal allowed unnamed keys and permanent access by default; the warning appeared afterward.',
    consequence: 'A customer could confirm a credential before understanding how to identify or limit it.',
    decision: 'Move naming, expiration guidance, and the opt-out warning into the creation decision itself.',
  },
  {
    observation: 'A cost total did not explain its driver.',
    evidence: 'Billing totals and infrastructure activity were separate, and investigation context could be lost between screens.',
    consequence: 'The customer had to reconstruct the comparison instead of following the evidence.',
    decision: 'Keep the selected scope visible, expose cost detail on demand, and provide a next action.',
  },
  {
    observation: 'An unhealthy status was not a recovery path.',
    evidence: 'A badge could identify a problem without explaining the reason or connecting it to the relevant signals.',
    consequence: 'The customer still had to work out what the status meant and where to investigate.',
    decision: 'Explain the immediate condition in context, then link to the right resource details, metrics, or logs.',
  },
]

export const usageToCostInsights: CrusoeInsight[] = [
  {
    observation: 'Measurements were related, but not interchangeable.',
    evidence: 'Text usage, video duration, dollars, traffic, and response time describe different parts of the same workload.',
    consequence: 'Combining them into a single generic measure would hide how the bill was calculated.',
    decision: 'Use a consistent layout while preserving each product’s real unit and pricing context.',
  },
  {
    observation: 'Moving screens could break the comparison.',
    evidence: 'The earlier investigation required selecting the same project and dates again across tools.',
    consequence: 'A customer could spend time rebuilding scope—or accidentally compare different periods.',
    decision: 'Carry the project, model, and date range through the investigation instead of resetting them.',
  },
  {
    observation: 'The total was only the beginning of the question.',
    evidence: 'The cause could be a product, a request pattern, or a model or endpoint change.',
    consequence: 'A higher bill alone did not indicate what to inspect or change.',
    decision: 'Connect period change → daily trend → product attribution → request and activity evidence.',
  },
]

export function CrusoeEvidenceChain({ rows, caption }: { rows: CrusoeInsight[]; caption: string }) {
  return (
    <div className="crusoe-research-summary" role="region" aria-label={`${caption} summary`} data-study-reveal>
      <div className="crusoe-research-cards">
        {rows.map((row, index) => <article key={row.observation}><span>Finding 0{index + 1}</span><h4>{row.observation}</h4><p>{row.decision}</p></article>)}
      </div>
      <details className="crusoe-research-detail"><summary>View the evidence and rationale</summary>
    <table className="crusoe-evidence-chain" data-study-reveal>
      <caption>{caption}</caption>
      <thead><tr><th scope="col">What the evidence showed</th><th scope="col">Why it mattered</th><th scope="col">What I changed</th></tr></thead>
      <tbody>{rows.map(row => (
        <tr key={row.observation}>
          <th scope="row" data-label="What the evidence showed"><strong>{row.observation}</strong><p>{row.evidence}</p></th>
          <td data-label="Why it mattered">{row.consequence}</td>
          <td data-label="What I changed">{row.decision}</td>
        </tr>
      ))}</tbody>
    </table>
      </details>
    </div>
  )
}

export function CrusoeProjectNextSteps({ story }: { story: ProjectNarrative }) {
  return (
    <aside className="crusoe-project-next-steps" aria-label="What I would measure next" data-study-reveal>
      <h4>What I would measure next</h4><p>{story.next}</p>
    </aside>
  )
}

export function CrusoeProjectReflection({ story }: { story: ProjectNarrative }) {
  return (
    <section className="crusoe-case-section crusoe-project-reflection" aria-label={`${story.projectName} takeaways`} data-study-reveal>
      <p className="crusoe-project-reflection-label">Reflection · {story.projectName}</p>
      <h2>What I’m taking with me.</h2>
      <ol className="crusoe-project-takeaways">
        {story.takeaways.map((takeaway, index) => (
          <li key={takeaway.title}><span aria-hidden="true">0{index + 1}</span><h3>{takeaway.title}</h3><p>{takeaway.body}</p></li>
        ))}
      </ol>
    </section>
  )
}
