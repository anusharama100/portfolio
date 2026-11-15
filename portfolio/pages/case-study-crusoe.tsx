"use client"

import CrusoeFocusedStory from '@/portfolio/components/CrusoeFocusedStory'
import { Image } from '@/portfolio/compat'
import { Link } from '@/portfolio/compat'
import { useEffect, useRef, useState } from 'react'
import CrusoeUsageCostStory from '@/portfolio/components/CrusoeUsageCostStory'
import CrusoeDecisionExplorer from '@/portfolio/components/CrusoeDecisionExplorer'
import { crusoeDesignDecisions } from '@/portfolio/components/crusoeDesignDecisions'
import { useCaseStudyMotion } from '@/portfolio/components/useCaseStudyMotion'
import { CrusoeEvidenceChain, CrusoeProjectBrief, CrusoeProjectProcess, CrusoeProjectCollaboration, CrusoeProjectNextSteps, CrusoeProjectReflection, crusoeNarratives, heuristicInsights } from '@/portfolio/components/CrusoeStoryContent'

const heuristicMethod = [
  ['01', 'Follow the complete task', 'Walked through each journey from the first click to completion, including requirements, errors, and help documentation.'],
  ['02', 'Explain each problem', 'Recorded what happened, why it broke a usability principle, how it affected users, and how serious it was.'],
  ['03', 'Turn findings into fixes', 'Wrote the highest-priority changes as Jira tickets, defined edge cases, and stayed through implementation and QA.'],
] as const

const heuristicJourneys = [
  {
    id: 'api-keys',
    number: '01',
    title: 'API keys',
    focus: 'Access + setup',
    goal: 'Find, create, and use an API key in the correct account context.',
    path: ['Find API keys', 'Create securely', 'Continue setup'],
    friction: 'API keys were hard to find, the product used several names for the same thing, and the creation flow did not clearly explain what to do after making a key.',
    heuristics: [
      ['H2', 'Match between system and the real world'],
      ['H4', 'Consistency and standards'],
      ['H5', 'Error prevention'],
      ['H6', 'Recognition rather than recall'],
      ['H10', 'Help and documentation'],
    ],
    shipped: [
      'Moved “API Keys” into expected account navigation and added a repeat-user shortcut.',
      'Kept account context visible and standardized terminology across the Console and documentation.',
      'Added validation and creation feedback, then connected the new credential directly to CLI setup.',
    ],
    jira: 'Navigation · credential validation · setup handoff',
    result: 'A safer setup flow that is easier to find and guides users through the key’s first use.',
  },
  {
    id: 'cost-monitoring',
    number: '02',
    title: 'Cost monitoring',
    focus: 'Attribution + control',
    goal: 'Understand a change in spend, trace it to the responsible usage, and decide what to do next.',
    path: ['See spend change', 'Trace the driver', 'Take action'],
    friction: 'Billing showed totals without explaining what caused them. Users lost their project and date filters as they moved between screens, then had to compare cost and infrastructure activity by hand.',
    heuristics: [
      ['H1', 'Visibility of system status'],
      ['H2', 'Match between system and the real world'],
      ['H6', 'Recognition rather than recall'],
      ['H8', 'Aesthetic and minimalist design'],
    ],
    shipped: [
      'Reorganized billing from overview to breakdown to resource-level detail.',
      'Kept the billing period and organizational scope visible throughout an investigation.',
      'Connected spend changes to the infrastructure activity behind them and surfaced the next useful action.',
    ],
    jira: 'Cost hierarchy · scope controls · usage attribution',
    result: 'Users can trace a bill increase to the project and activity behind it without rebuilding the search across separate tools.',
  },
  {
    id: 'monitoring-debugging',
    number: '03',
    title: 'Monitoring + debugging',
    focus: 'Diagnosis + recovery',
    goal: 'Move from a resource issue to the right metrics and logs, identify the cause, and recover.',
    path: ['Notice an issue', 'Inspect signals', 'Resolve the cause'],
    friction: 'Health, metrics, and logs lived on separate screens. Moving between them could reset the selected resource and time range, while blank states did not explain whether there was no data or something had failed.',
    heuristics: [
      ['H1', 'Visibility of system status'],
      ['H4', 'Consistency and standards'],
      ['H6', 'Recognition rather than recall'],
      ['H9', 'Recognize, diagnose, and recover from errors'],
    ],
    shipped: [
      'Created a direct route from an affected resource to its relevant metrics and logs.',
      'Preserved the resource, time range, and filters as users moved between signals.',
      'Separated loading, no-data, and error states and gave each state a specific recovery action.',
    ],
    jira: 'Observability routing · context persistence · state handling',
    result: 'Users can move from a resource problem to the right evidence and next action with less backtracking.',
  },
] as const

const apiKeyFigmaArtifacts = [
  {
    number: '01',
    title: 'Finding the API-key path',
    description: 'The evaluated path, violated heuristics, observed behavior, and recommendation in one decision-ready frame.',
    src: '/images/crusoe/figma/api-finding.png',
    width: 1440,
    height: 900,
    featured: true,
  },
  {
    number: '02',
    title: 'First-key onboarding',
    description: 'A proposed Console banner that makes the prerequisite visible at the moment users need it.',
    src: '/images/crusoe/figma/api-onboarding-banner.png',
    width: 1500,
    height: 1100,
    featured: false,
  },
  {
    number: '03',
    title: 'Secure credential export',
    description: 'A longer-term MFA-gated download state that handles the risk and recovery details around key creation.',
    src: '/images/crusoe/figma/api-secure-export.png',
    width: 1060,
    height: 800,
    featured: false,
  },
] as const

const apiSecureCreationSteps = [
  {
    label: 'Before · Current behavior',
    title: 'The easiest option was also the riskiest.',
    summary: 'The default settings encouraged permanent, unlabeled API keys that would be hard to manage later.',
    bullets: [
      'Names were optional even though a key could not be renamed later.',
      '“Never expires” was the default, with no explanation of the risk.',
      'The warning appeared only after creation, when changing the choice meant deleting the key and starting over.',
    ],
    src: '/images/crusoe/figma/api-create-before.png',
    width: 1440,
    height: 900,
  },
  {
    label: 'After · Secure-by-default direction',
    title: 'The safer option became the default.',
    summary: 'Security guidance now appears while users can still change the decision.',
    bullets: [
      'A clear name is required so teams can identify, replace, or revoke a key later.',
      'Keys expire after 90 days by default, with reminders before the date.',
      'Users can still create a permanent key, but they see the risk before confirming.',
    ],
    src: '/images/crusoe/figma/api-create-after.png',
    width: 1560,
    height: 840,
  },
  {
    label: 'Engineering refinement',
    title: 'Engineering helped simplify the change.',
    summary: 'We kept the Console’s existing date picker instead of adding a new control.',
    bullets: [
      'The existing calendar now opens with a recommended expiration date already selected.',
      'The build required a safer default, name validation, an opt-out warning, and reminder emails rather than a new flow.',
      'The security improvement stayed intact while the implementation became smaller and more consistent.',
    ],
    src: '/images/crusoe/figma/api-create-refined.png',
    width: 1000,
    height: 840,
  },
] as const

const monitoringEngineeringRecommendations = [
  ['01', 'Confirm scope, impact, and intent before the change.'],
  ['02', 'Make scale-down risk explicit at the decision point.'],
  ['03', 'Save the operational reason and keep it visible afterward.'],
  ['04', 'Show progress and completion while asynchronous work runs.'],
  ['05', 'Keep Console and CLI confirmation language aligned.'],
] as const

const monitoringFigmaArtifacts = [
  {
    number: '01',
    title: 'Journey-level diagnosis',
    description: 'The scale-out journey summarized by severity, user consequence, and the operational gaps that shaped the Jira scope.',
    src: '/images/crusoe/figma/monitoring-journey-overview.png',
    width: 1440,
    height: 900,
  },
  {
    number: '02',
    title: 'Unhealthy-state recovery',
    description: 'A proposed in-context explanation that shows what failed, how long it has been failing, and where to continue debugging.',
    src: '/images/crusoe/figma/monitoring-unhealthy-tooltip.png',
    width: 1240,
    height: 760,
  },
] as const

const billingEngineeringWorkstreams = [
  ['01', 'Find billing', 'Make the billing entry point discoverable from the places users already manage infrastructure.'],
  ['02', 'Filter spend', 'Compare cost by time range, project, account, and resource without losing scope.'],
  ['03', 'Export data', 'Let teams carry detailed cost data into their reporting and operational workflows.'],
  ['04', 'Billing dashboard', 'Bring totals, trends, scope, and important changes into one clear starting view.'],
  ['05', 'Cost breakdowns', 'Expose the services and resources driving a change instead of showing only a total.'],
  ['06', 'Budget alerts', 'Set thresholds and surface exceptions early enough for teams to act.'],
] as const

const billingFigmaArtifacts = [
  {
    number: '01',
    title: 'Complete billing dashboard',
    description: 'One reconciling view for totals, scope, trends, filters, product costs, and inference usage.',
    src: '/images/crusoe/figma/billing-dashboard.png',
    width: 1440,
    height: 2048,
    featured: true,
  },
  {
    number: '02',
    title: 'Cost breakdown interaction',
    description: 'A focused chart state for comparing cost, retaining filters, and understanding the price behind a data point.',
    src: '/images/crusoe/figma/billing-cost-breakdown.png',
    width: 1440,
    height: 720,
    featured: false,
  },
  {
    number: '03',
    title: 'Budget-alert setup',
    description: 'A guided threshold flow that turns cost monitoring into a preventive action, not a retrospective report.',
    src: '/images/crusoe/figma/billing-budget-alerts.png',
    width: 1440,
    height: 820,
    featured: false,
  },
] as const

const heuristicScience = [
  ['Working memory', 'Keep options and context visible so users do not have to remember information across screens.'],
  ['Mental models', 'Use familiar infrastructure language and place actions where users already expect to find them.'],
  ['Error recovery', 'Assume mistakes will happen; explain what failed, preserve context, and provide a clear way forward.'],
] as const

const heuristicDelivery = [
  ['Write a clear ticket', 'Each Jira ticket showed where the problem happened, how it affected users, the proposed fix, and the states engineering needed to cover.'],
  ['Set scope with engineering', 'We separated quick fixes from larger changes and agreed on clear acceptance criteria.'],
  ['Stay involved during the build', 'I answered design and content questions and adjusted the work when technical constraints changed the best approach.'],
  ['Review the finished experience', 'With engineering, I reviewed normal, loading, empty, and error states in QA and checked each shipped change against the original problem.'],
] as const


const crusoeProjects = [
  {
    id: 'empty-state-system',
    number: '01',
    tabLabel: 'Empty-state system',
    title: 'Console empty states',
    description: 'A reusable first-run system spanning Compute, Orchestration, Storage, Metrics, and Access.',
  },
  {
    id: 'heuristic-evaluation',
    number: '02',
    tabLabel: 'Heuristic evaluation',
    title: 'IaaS Console evaluation',
    description: 'An end-to-end audit of critical journeys, scored and translated into prioritized recommendations.',
  },
  {
    id: 'usage-to-cost',
    number: '03',
    tabLabel: 'Usage → cost',
    title: 'Intelligence Foundry billing',
    description: 'A clearer model connecting operational infrastructure usage to billing and cost investigation.',
  },
] as const

type CrusoeProjectId = (typeof crusoeProjects)[number]['id']

export default function CrusoeCaseStudy() {
  const [activeProject, setActiveProject] = useState<CrusoeProjectId>('empty-state-system')
  const initialHashScroll = useRef(true)
  const motionRoot = useRef<HTMLElement>(null)
  useCaseStudyMotion(motionRoot, activeProject)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const project = crusoeProjects.find(project => project.id === hash || `crusoe-panel-${project.id}` === hash)
    if (project) setActiveProject(project.id)
    else if (hash.startsWith('crusoe-clean-')) setActiveProject('empty-state-system')
    else if (hash.startsWith('crusoe-he-')) setActiveProject('heuristic-evaluation')
    else if (hash.startsWith('crusoe-cost-')) setActiveProject('usage-to-cost')
  }, [])

  useEffect(() => {
    // Honor an incoming deep link once, but never scroll when switching projects.
    if (!initialHashScroll.current) return
    const frame = window.requestAnimationFrame(() => {
      if (!initialHashScroll.current) return
      const hash = window.location.hash.slice(1)
      const target = document.getElementById(hash === activeProject ? `crusoe-panel-${activeProject}` : hash)
      target?.scrollIntoView({ behavior: 'instant', block: 'start' })
      initialHashScroll.current = false
    })
    return () => window.cancelAnimationFrame(frame)
  }, [activeProject])

  const selectProject = (projectId: CrusoeProjectId) => {
    initialHashScroll.current = false
    window.history.replaceState(window.history.state, '', `#${projectId}`)
    setActiveProject(projectId)
  }

  return (
    <main ref={motionRoot} className="crusoe-case crusoe-cloud-case">
      <nav className="crusoe-impact-band crusoe-project-shortcuts" aria-label="Choose a Crusoe project">
        {crusoeProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            aria-label={`Read project ${project.number}: ${project.tabLabel}`}
            aria-controls={`crusoe-panel-${project.id}`}
            aria-pressed={activeProject === project.id}
            onClick={() => selectProject(project.id)}
          >
            <strong>{project.number}</strong>
            <span>{project.tabLabel}</span>
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </nav>

      {activeProject && <section className="crusoe-project-workspace" aria-label="Crusoe internship project details">

        {activeProject === 'empty-state-system' && <CrusoeFocusedStory />}

        {activeProject === 'heuristic-evaluation' && (
      <section
        id="crusoe-panel-heuristic-evaluation"
        role="tabpanel"
        aria-label="Heuristic evaluation project"
        className="crusoe-case-section project-section blue-section crusoe-project-panel crusoe-interactive-study"
      >
        <div className="crusoe-section-label"><span>Project overview</span><strong>Cloud Console usability evaluation</strong></div>
        <div className="crusoe-project-heading crusoe-project-heading-visual">
          <h2>A structured usability review became implemented improvements.</h2>
          <p>
            I reviewed API keys, billing, and resource debugging, then worked with engineering to turn priority findings into fixes.
          </p>
          <figure className="crusoe-opening-preview">
            <a href="/images/crusoe/figma/api-create-before.png" target="_blank" rel="noreferrer" aria-label="Open the API-key evaluation preview">
              <Image src="/images/crusoe/figma/api-create-before.png" alt="API-key creation screen used as audit evidence in the heuristic evaluation" width={1440} height={900} sizes="(max-width: 900px) 90vw, 520px" />
            </a>
            <figcaption>Audit evidence · API-key creation <span aria-hidden="true">↗</span></figcaption>
          </figure>
        </div>

        <CrusoeProjectBrief story={crusoeNarratives['heuristic-evaluation']} />
        <CrusoeProjectProcess story={crusoeNarratives['heuristic-evaluation']} />
        <CrusoeProjectCollaboration story={crusoeNarratives['heuristic-evaluation']} />

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-method-title">
          <div className="crusoe-clean-heading">
            <span>01 · How I investigated</span>
            <div>
              <h3 id="crusoe-he-method-title">Every finding needed to lead to a clear fix.</h3>
              <p>I evaluated each complete task against ten usability principles, recording the issue, its consequence, severity, and a possible fix.</p>
            </div>
          </div>

          <div className="crusoe-he-method-grid">
            {heuristicMethod.map(([number, title, body]) => (
              <article key={number}><span>{number}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>

          <div className="crusoe-he-principle-band">
            <span>Evaluation logic</span>
            <p><strong>Observation → user consequence → severity → design response.</strong></p>
          </div>

          <details className="crusoe-study-support" open>
            <summary>How usability principles informed the review</summary>
            <div className="crusoe-he-science-strip" aria-label="Cognitive-science lenses used in the evaluation">
            {heuristicScience.map(([title, body], index) => (
              <article key={title}><span>0{index + 1}</span><div><h4>{title}</h4><p>{body}</p></div></article>
            ))}
          </div>
          </details>
        </section>

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-insights-title">
          <div className="crusoe-clean-heading">
            <span>02 · Findings</span>
            <div><h3 id="crusoe-he-insights-title">Three recurring problems shaped the recommendations.</h3><p>Each research finding led to a specific design decision.</p></div>
          </div>
          <CrusoeEvidenceChain rows={heuristicInsights} caption="From evaluation evidence to a design response" />
        </section>

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-findings-title">
          <div className="crusoe-clean-heading">
            <span>03 · Design decisions &amp; iterations</span>
            <div>
              <h3 id="crusoe-he-findings-title">The important work was deciding what should change, and why.</h3>
              <p>Choose a decision to explore the design. Additional proposals are labeled separately from the implemented improvements.</p>
            </div>
          </div>

          <CrusoeDecisionExplorer decisions={crusoeDesignDecisions} />

          <div className="crusoe-journey-notes-heading"><h4>The full journey notes</h4><p>Open a journey for its task path, usability findings, design frames, and delivery details.</p></div>

          <div className="crusoe-he-journeys">
            {heuristicJourneys.map((journey) => (
              <details key={journey.number} className="crusoe-journey-dossier">
                <summary><span>Journey {journey.number}</span><strong>{journey.title}</strong><span>Evidence &amp; delivery notes</span></summary>
              <article className="crusoe-he-journey-card">
                <header>
                  <div className="crusoe-he-journey-number">Journey {journey.number}</div>
                  <div>
                    <h4>{journey.title}</h4>
                    <p><strong>User goal:</strong> {journey.goal}</p>
                  </div>
                  <span>{journey.focus}</span>
                </header>

                <ol className="crusoe-he-journey-path" aria-label={`${journey.title} evaluated path`}>
                  {journey.path.map((step, index) => (
                    <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>
                  ))}
                </ol>

                <div className="crusoe-he-journey-body">
                  <section className="crusoe-he-journey-friction">
                    <span>Observed friction</span>
                    <p>{journey.friction}</p>
                  </section>

                  <section className="crusoe-he-journey-violations">
                    <span>Heuristic violations</span>
                    <ul>
                      {journey.heuristics.map(([code, name]) => (
                        <li key={code}><strong>{code}</strong><p>{name}</p></li>
                      ))}
                    </ul>
                  </section>

                  <section className="crusoe-he-journey-response">
                    <span>Design response</span>
                    <ul className="crusoe-he-changes">
                      {journey.shipped.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                    </ul>
                    <div className="crusoe-he-ticket-track"><span>Jira delivery track</span><strong>{journey.jira}</strong></div>
                    <footer><strong>Intended user benefit</strong><p>{journey.result}</p></footer>
                  </section>
                </div>

                {journey.id === 'api-keys' && (
                  <section className="crusoe-he-figma-evidence" aria-labelledby="crusoe-api-key-scenarios-title">
                    <div className="crusoe-he-figma-evidence-copy">
                      <span>Evaluation evidence</span>
                      <h5 id="crusoe-api-key-scenarios-title">From a hidden entry point to a safer first-key experience.</h5>
                      <p>The evaluation shows where the API-key task broke down. The proposed screens show how the fix made the path easier to find and safer to complete.</p>
                    </div>

                    <div className="crusoe-he-figma-evidence-grid">
                      {apiKeyFigmaArtifacts.map((artifact) => (
                        <figure key={artifact.title} className={artifact.featured ? 'is-featured' : undefined}>
                          <div className="crusoe-he-figma-evidence-media">
                            <a href={artifact.src} target="_blank" rel="noreferrer" aria-label={`Open ${artifact.title} full size`}>
                              <Image
                                src={artifact.src}
                                alt={`${artifact.title} frame from the Crusoe heuristic evaluation`}
                                width={artifact.width}
                                height={artifact.height}
                                sizes={artifact.featured ? '(max-width: 900px) 90vw, 78vw' : '(max-width: 760px) 90vw, 42vw'}
                              />
                            </a>
                          </div>
                          <figcaption><span>{artifact.number}</span><div><strong>{artifact.title}</strong><p>{artifact.description}</p><a href={artifact.src} target="_blank" rel="noreferrer">Open full frame ↗</a></div></figcaption>
                        </figure>
                      ))}
                    </div>

                    <section className="crusoe-he-secure-creation" aria-labelledby="crusoe-api-secure-creation-title">
                      <header>
                        <span>Secure creation · before → after</span>
                        <div>
                          <h6 id="crusoe-api-secure-creation-title">Security guidance needed to appear before the key was created.</h6>
                          <p>The old modal made unnamed, permanent keys easy to create and explained the risk only afterward. I changed the flow so users name the key, choose an expiration date, and understand the risk before confirming.</p>
                        </div>
                      </header>

                      <div className="crusoe-he-secure-creation-decision">
                        <span>Design decision</span>
                        <strong>Make the safer choice the default, while still allowing permanent access when someone knowingly needs it.</strong>
                      </div>

                      <div className="crusoe-he-secure-creation-steps">
                        {apiSecureCreationSteps.map((step, index) => (
                          <article key={step.label}>
                            <div className="crusoe-he-secure-creation-copy">
                              <span>{step.label}</span>
                              <h6>{step.title}</h6>
                              <p>{step.summary}</p>
                              <ul>
                                {step.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                              </ul>
                            </div>
                            <figure>
                              <div className="crusoe-he-figma-evidence-media">
                                <a href={step.src} target="_blank" rel="noreferrer" aria-label={`Open ${step.label} secure API-key creation frame full size`}>
                                  <Image
                                    src={step.src}
                                    alt={`${step.label} secure API-key creation design from the Crusoe heuristic evaluation`}
                                    width={step.width}
                                    height={step.height}
                                    sizes="(max-width: 900px) 90vw, 78vw"
                                  />
                                </a>
                              </div>
                              <figcaption><span>0{index + 1}</span><a href={step.src} target="_blank" rel="noreferrer">Open full frame ↗</a></figcaption>
                            </figure>
                          </article>
                        ))}
                      </div>

                      <footer>
                        <span>What changed</span>
                        <p><strong>Before:</strong> optional naming, indefinite access by default, and a warning after creation. <strong>After:</strong> required identity, expiry by default, advance alerts, and an explicit warning before opting out.</p>
                      </footer>
                    </section>
                  </section>
                )}

                {journey.id === 'monitoring-debugging' && (
                  <section className="crusoe-he-ops-artifact" aria-labelledby="crusoe-monitoring-recommendations-title">
                    <div className="crusoe-he-ops-artifact-copy">
                      <span>Five scoped recommendations</span>
                      <h5 id="crusoe-monitoring-recommendations-title">Users needed to understand the effect of a change before and after they made it.</h5>
                      <p>For each recommendation, I showed the expected behavior, the necessary screen states, and the details engineering needed to build it.</p>

                      <ol>
                        {monitoringEngineeringRecommendations.map(([number, recommendation]) => (
                          <li key={number}><span>{number}</span><p>{recommendation}</p></li>
                        ))}
                      </ol>
                    </div>

                    <div className="crusoe-he-ops-figma-stack">
                      {monitoringFigmaArtifacts.map((artifact) => (
                        <figure key={artifact.title}>
                          <div className="crusoe-he-figma-evidence-media">
                            <a href={artifact.src} target="_blank" rel="noreferrer" aria-label={`Open ${artifact.title} full size`}>
                              <Image
                                src={artifact.src}
                                alt={`${artifact.title} frame from the Crusoe monitoring evaluation`}
                                width={artifact.width}
                                height={artifact.height}
                                sizes="(max-width: 900px) 90vw, 78vw"
                              />
                            </a>
                          </div>
                          <figcaption><span>{artifact.number}</span><div><strong>{artifact.title}</strong><p>{artifact.description}</p><a href={artifact.src} target="_blank" rel="noreferrer">Open full frame ↗</a></div></figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

                {journey.id === 'cost-monitoring' && (
                  <section className="crusoe-he-billing-artifact" aria-labelledby="crusoe-billing-workstreams-title">
                    <div className="crusoe-he-billing-artifact-copy">
                      <span>Six billing workstreams</span>
                      <h5 id="crusoe-billing-workstreams-title">Six connected improvements made costs easier to find, explain, and control.</h5>
                      <p>The work connected billing entry points, filters, reports, cost breakdowns, and alerts around one goal: helping teams understand and manage spend.</p>

                      <div className="crusoe-he-billing-workstream-grid">
                        {billingEngineeringWorkstreams.map(([number, title, description]) => (
                          <article key={title}>
                            <span>{number}</span>
                            <div><h6>{title}</h6><p>{description}</p></div>
                          </article>
                        ))}
                      </div>
                    </div>

                    <div className="crusoe-he-figma-evidence-grid crusoe-he-billing-figma-grid">
                      {billingFigmaArtifacts.map((artifact) => (
                        <figure key={artifact.title} className={artifact.featured ? 'is-featured' : undefined}>
                          <div className="crusoe-he-figma-evidence-media">
                            <a href={artifact.src} target="_blank" rel="noreferrer" aria-label={`Open ${artifact.title} full size`}>
                              <Image
                                src={artifact.src}
                                alt={`${artifact.title} frame from the Crusoe cost-monitoring evaluation`}
                                width={artifact.width}
                                height={artifact.height}
                                sizes={artifact.featured ? '(max-width: 900px) 90vw, 78vw' : '(max-width: 760px) 90vw, 42vw'}
                              />
                            </a>
                          </div>
                          <figcaption><span>{artifact.number}</span><div><strong>{artifact.title}</strong><p>{artifact.description}</p><a href={artifact.src} target="_blank" rel="noreferrer">Open full frame ↗</a></div></figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

              </article>
              </details>
            ))}
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-output-title">
          <div className="crusoe-clean-heading">
            <span>04 · Implementation &amp; QA</span>
            <div>
              <h3 id="crusoe-he-output-title">I stayed involved until the improvements shipped.</h3>
              <p>I wrote the priority findings as Jira tickets, set scope with engineers, answered questions during the build, and reviewed normal, loading, empty, and error states in QA.</p>
            </div>
          </div>

          <div className="crusoe-he-output-grid">
            {heuristicDelivery.map(([title, body], index) => (
              <article key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>

          <div className="crusoe-he-final-note">
            <span>What I checked</span>
            <p>Whether the implemented behavior addressed the original finding, preserved account and resource context, and handled normal, loading, empty, and error states.</p>
          </div>
        </section>

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-outcome-title">
          <div className="crusoe-clean-heading">
            <span>05 · Outcome &amp; next steps</span>
            <div><h3 id="crusoe-he-outcome-title">The evaluation became work the team could act on.</h3><p>Nine improvements shipped across the evaluation. My contribution included the prioritized findings, design recommendations, Jira scope, implementation support, and QA. The proposed frames in this story show additional design exploration; they are not all presented as shipped screens.</p></div>
          </div>
          <dl className="crusoe-story-context crusoe-story-deliverables" aria-label="Heuristic evaluation outcomes">
            <div><dt>Shipped</dt><dd>Nine improvements across the three evaluated Console journeys</dd></div>
            <div><dt>My contribution</dt><dd>Prioritized findings, design recommendations, Jira tickets, and implementation review with engineering</dd></div>
            <div><dt>Additional exploration</dt><dd>Proposed design frames are labeled separately from the shipped improvements</dd></div>
          </dl>
          <CrusoeProjectNextSteps story={crusoeNarratives['heuristic-evaluation']} />
        </section>
      </section>
        )}

        {activeProject === 'usage-to-cost' && <CrusoeUsageCostStory />}
      </section>}

      <CrusoeProjectReflection story={crusoeNarratives[activeProject]} />

      <footer className="crusoe-case-footer">
        <p>Crusoe · Product Design Internship</p>
        <h2>Thanks for taking a look.</h2>
        <div>
          <Link href="/#work">More work</Link>
          <a href="mailto:anusharama100@gmail.com">Get in touch</a>
        </div>
      </footer>
    </main>
  )
}
