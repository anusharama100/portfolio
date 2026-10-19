"use client"

// Project framing is grounded in the existing Console artifacts and delivery notes.
// Validation involved cross-functional reviews and QA, not customer interviews or usability tests.
export const crusoeNarratives = {
  'empty-state-system': {
    projectName: 'Empty-state system',
    processTitle: 'From first-run gaps to a reusable system.',
    process: [
      { title: 'Understand', body: 'Audit the Console, follow a fresh account through the first-run experience, and study comparable cloud products.' },
      { title: 'Frame', body: 'Connect repeated gaps to what a new customer needs: a resource explanation, requirements, and a useful next action.' },
      { title: 'Design', body: 'Define the V1 illustration, content, action, and documentation pattern; explore setup cards and state-aware guidance as V2.' },
      { title: 'Align + hand off', body: 'Refine scope with product, engineering, brand, and writing; document product variants, edge cases, and behavior.' },
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
    goal: 'Help a first-time customer understand the resource and take a useful first step, without turning the page into a tutorial.',
    takeaways: [
      { title: 'An empty state is a starting point.', body: 'The important change was not adding an illustration. It was explaining the resource, offering a useful first action, and keeping help close by.' },
      { title: 'Consistency needs room for context.', body: 'Instances, clusters, and storage need different explanations and prerequisites. I learned to reuse the hierarchy without forcing every product into the same message.' },
      { title: 'Separate the foundation from the future.', body: 'V1 focused on the empty page. Documenting setup recommendations and state-aware guidance as V2 kept the immediate scope clear without losing the wider direction.' },
    ],
    next: 'Measure whether first-time customers can explain the resource, identify its requirements, and start creating it without assistance. Track where documentation helps and where setup still breaks down.',
  },
  'heuristic-evaluation': {
    projectName: 'Heuristic evaluation',
    processTitle: 'From journey findings to shipped improvements.',
    process: [
      { title: 'Understand', body: 'Walk through three complete customer tasks: monitoring costs, creating API keys, and debugging resources.' },
      { title: 'Frame', body: 'Evaluate the journeys against ten usability principles and connect each finding to its consequence and severity.' },
      { title: 'Design', body: 'Recommend clearer cost context, safer credential defaults, and useful explanations and recovery paths.' },
      { title: 'Align + hand off', body: 'Prioritize Jira tickets with engineering, define acceptance criteria, and review implementation through QA.' },
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
    goal: 'Make each critical task easier to find, safer to complete, and easier to recover from—not simply make individual screens look more consistent.',
    takeaways: [
      { title: 'A finding needs a design response.', body: 'Naming a usability principle was not enough. Connecting the observed behavior, its consequence, and a specific recommendation made the evaluation useful to the team.' },
      { title: 'Follow the task, not just the screen.', body: 'The billing, API-key, and debugging journeys showed why defaults, retained context, and recovery matter across multiple steps—not only within an individual interface.' },
      { title: 'The work continues through QA.', body: 'Prioritized tickets, engineering discussions, and implementation review connected the recommendations to nine shipped improvements. Proposed frames still needed to be distinguished from shipped behavior.' },
    ],
    next: 'Measure unassisted task completion, repeated navigation, and recovery after an error. Check the shipped fixes separately from the proposed directions shown in the design evidence.',
  },
  'usage-to-cost': {
    projectName: 'Usage → cost',
    processTitle: 'From a cost question to a connected investigation.',
    process: [
      { title: 'Understand', body: 'Map how a team moves between Usage, Billing, workload metrics, request logs, and account activity.' },
      { title: 'Frame', body: 'Organize the investigation around what changed, which product contributed, and what evidence to inspect next.' },
      { title: 'Design', body: 'Prototype comparison views, progressive product detail, and operational evidence while keeping units and scope explicit.' },
      { title: 'Align + hand off', body: 'Use cross-functional reviews and prototype walkthroughs to refine the connected path, constraints, and state behavior.' },
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
    goal: 'Let someone move from a change in their bill to the contributing product and underlying activity without rebuilding the investigation on every screen.',
    takeaways: [
      { title: 'Start with the question, not the chart.', body: 'A total is only the beginning. Designing around what changed, which product contributed, and where to investigate gave each view a reason to exist.' },
      { title: 'Share patterns without flattening meaning.', body: 'Tokens, video seconds, dollars, and response times answer different questions. A consistent layout should reduce relearning while keeping those units and their context explicit.' },
      { title: 'An investigation needs continuity.', body: 'Project, model, and date context matter as much as the individual screens. Reviewing the connected prototype helped frame that handoff; a measured improvement would still need follow-up evidence.' },
    ],
    next: 'Measure whether someone can trace a sample cost change to the correct product and request, keep the intended project and dates, and choose an appropriate next action.',
  },
} as const

type ProjectNarrative = (typeof crusoeNarratives)[keyof typeof crusoeNarratives]

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
      <div className="crusoe-project-collaboration-heading"><span>Collaboration · {story.projectName}</span><h3>{story.collaborationTitle}</h3></div>
      <ul className="crusoe-project-collaboration-steps">
        {story.collaboration.map(step => (
          <li key={step.title}><span>{step.partner}</span><h4>{step.title}</h4><p>{step.body}</p></li>
        ))}
      </ul>
    </section>
  )
}

export function CrusoeProjectBrief({ story, label = 'Project brief' }: { story: ProjectNarrative; label?: string }) {
  return (
    <div className="crusoe-narrative-opening" data-study-reveal>
      <dl className="crusoe-narrative-brief" aria-label={label}>
        <div><dt>Who this is for</dt><dd>{story.audience}</dd></div>
        <div><dt>The challenge</dt><dd>{story.challenge}</dd></div>
        <div><dt>My role</dt><dd>{story.role}</dd></div>
      </dl>
      <aside className="crusoe-narrative-goal" aria-label="Design goal"><span>Design goal</span><p>{story.goal}</p></aside>
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
