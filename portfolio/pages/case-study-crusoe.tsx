"use client"

import { Image } from '@/portfolio/compat'
import { Link } from '@/portfolio/compat'
import { useEffect, useRef, useState } from 'react'
import ViewportVideo from '@/portfolio/components/ViewportVideo'
import CrusoeUsageCostStory from '@/portfolio/components/CrusoeUsageCostStory'
import CrusoeDecisionExplorer from '@/portfolio/components/CrusoeDecisionExplorer'
import { crusoeDesignDecisions } from '@/portfolio/components/crusoeDesignDecisions'
import { useCaseStudyMotion } from '@/portfolio/components/useCaseStudyMotion'
import { CrusoeEvidenceChain, CrusoeProjectBrief, CrusoeProjectProcess, CrusoeProjectCollaboration, CrusoeProjectNextSteps, CrusoeProjectReflection, crusoeNarratives, heuristicInsights } from '@/portfolio/components/CrusoeStoryContent'

type VisualPlaceholderProps = {
  number: string
  title: string
  note: string
  format?: 'wide' | 'square' | 'portrait'
}

function VisualPlaceholder({ number, title, note, format = 'wide' }: VisualPlaceholderProps) {
  return (
    <div className={`crusoe-visual-placeholder ${format}`}>
      <span>{number}</span>
      <div>
        <strong>{title}</strong>
        <small>{note}</small>
      </div>
      <i aria-hidden="true" />
    </div>
  )
}


const currentEmptyStateScreens = [
  { label: 'Instance templates', src: '/images/crusoe/current-instances-empty.png', width: 809, height: 376 },
  { label: 'Slurm clusters', src: '/images/crusoe/current-orchestration-empty.png', width: 1117, height: 421 },
  { label: 'Buckets', src: '/images/crusoe/current-observability-empty.png', width: 1119, height: 466 },
  { label: 'Kubernetes clusters', src: '/images/crusoe/current-security-empty.png', width: 1258, height: 431 },
  { label: 'Disks', src: '/images/crusoe/current-cluster-empty.png', width: 1389, height: 348 },
  { label: 'Missing prerequisite', src: '/images/crusoe/current-modal-empty.png', width: 583, height: 369 },
] as const

function CrusoeAuditArtifact() {
  const figJamArtifacts = [
    {
      number: '01',
      title: 'Frame the first-time gap',
      description: 'Synthesized the missing guidance, assumed technical familiarity, and unclear next steps affecting brand-new users.',
      image: '/images/crusoe/figjam-research-synthesis.png',
      width: 1220,
      height: 820,
    },
    {
      number: '02',
      title: 'Walk the first-run journey',
      description: 'Followed a fresh account through Compute, Storage, Networking, Orchestration, and Observability to surface repeated dead ends.',
      image: '/images/crusoe/figjam-first-time-journey.png',
      width: 1450,
      height: 1300,
    },
    {
      number: '03',
      title: 'Connect patterns across products',
      description: 'Mapped recurring behaviors across resource types to show that the issue was systemic, not a collection of isolated empty screens.',
      image: '/images/crusoe/figjam-pattern-map.png',
      width: 1800,
      height: 1450,
    },
  ] as const

  return (
    <figure className="crusoe-artifact-card crusoe-audit-artifact">
      <div className="crusoe-artifact-heading">
        <span>02A · Research audit</span>
        <strong>Where first-time users got stuck</strong>
      </div>

      <div className="crusoe-audit-images">
        <Image
          className="crusoe-audit-overview"
          src="/images/crusoe/empty-state-first-time-flow.png"
          alt="Annotated Crusoe first-time experience audit with user needs, gaps, and empty-state screens"
          width={3168}
          height={3184}
          sizes="(max-width: 900px) 88vw, 42vw"
        />
        <Image
          className="crusoe-audit-detail"
          src="/images/crusoe/empty-state-problem-framing.png"
          alt="Problem-framing board summarizing the current empty-state experience"
          width={1040}
          height={1040}
          sizes="(max-width: 900px) 44vw, 20vw"
        />
      </div>

      <section className="crusoe-figjam-story" aria-labelledby="crusoe-figjam-title">
        <div className="crusoe-figjam-heading">
          <span>FigJam synthesis</span>
          <div>
            <h3 id="crusoe-figjam-title">Turning scattered evidence into a system-level problem.</h3>
            <p>Before designing UI, I used FigJam to connect first-time needs, repeated journey breakdowns, and patterns appearing across the Console.</p>
          </div>
        </div>

        <div className="crusoe-figjam-grid">
          {figJamArtifacts.map((artifact) => (
            <figure key={artifact.image}>
              <Image
                src={artifact.image}
                alt={`${artifact.title} FigJam artifact`}
                width={artifact.width}
                height={artifact.height}
                sizes="(max-width: 900px) 88vw, 58vw"
              />
              <figcaption>
                <span>{artifact.number}</span>
                <div>
                  <strong>{artifact.title}</strong>
                  <p>{artifact.description}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="crusoe-evidence-heading">
        <span>Representative Console evidence</span>
        <p>Six examples from the broader 12-surface audit.</p>
      </div>

      <div className="crusoe-current-state-gallery" aria-label="Current Crusoe Console empty-state inventory">
        {currentEmptyStateScreens.map(({ label, src, width, height }) => (
          <figure key={src}>
            <Image src={src} alt={`${label} empty-state audit screen`} width={width} height={height} sizes="(max-width: 700px) 78vw, 36vw" />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>

      <figcaption>12 audited surfaces · FigJam synthesis · six representative Console examples</figcaption>
    </figure>
  )
}

const futureEdgeCases = [
  {
    state: 'In progress',
    title: 'Provisioning without duplicate actions',
    description: 'An informational banner confirms that the request is working, sets a time expectation, and disables actions that would create a duplicate resource.',
    image: '/images/crusoe/final-instances-provisioning.png',
    width: 1440,
    height: 900,
  },
  {
    state: 'Failure',
    title: 'A specific error with a recovery path',
    description: 'The banner names what failed, explains the likely cause, and keeps retry or an alternate configuration close to the problem.',
    image: '/images/crusoe/final-kubernetes-error.png',
    width: 1440,
    height: 940,
  },
  {
    state: 'Retry',
    title: 'Recovery without losing context',
    description: 'A failed creation attempt stays attached to the empty state, so users can try again while the recommended setup cards remain available.',
    image: '/images/crusoe/final-buckets-error.png',
    width: 1440,
    height: 900,
  },
  {
    state: 'Ready',
    title: 'The next step after success',
    description: 'Once the resource is ready, the banner changes from status reporting to the next required action, in this case downloading the kubeconfig.',
    image: '/images/crusoe/final-kubernetes-kubeconfig.png',
    width: 1440,
    height: 940,
  },
] as const

const finalEmptyStateVideos = [
  ['Console overview', '/crusoe/empty-state-instances.mp4', 'The first-run system shown in context with the complete Console navigation.'],
  ['Kubernetes', '/crusoe/empty-state-kubernetes.mp4', 'Clear guidance and a primary action for creating a first cluster.'],
  ['Managed Logs', '/crusoe/empty-state-managed-logs.mp4', 'A focused starting point for configuring the first managed log source.'],
  ['Reservations', '/crusoe/empty-state-reservations.mp4', 'An approachable entry into creating and managing capacity reservations.'],
] as const

function CrusoeFinalSystemArtifact() {
  return (
    <figure className="crusoe-artifact-card crusoe-final-artifact">
      <div className="crusoe-artifact-heading">
        <span>05A · Release progression</span>
        <strong>One foundation, two release horizons</strong>
      </div>
      <div className="crusoe-release-visual-comparison">
        <section className="crusoe-release-block crusoe-v1-release">
          <div className="crusoe-release-heading">
            <span>V1 · Shippable foundation</span>
            <p>A focused empty state with concise guidance, one primary action, and a documentation path.</p>
          </div>
          <figure>
            <Image
              src="/images/crusoe/final-instances-empty.png"
              alt="Final V1 Crusoe Console empty state for instances"
              width={838}
              height={768}
              sizes="(max-width: 900px) 88vw, 42vw"
            />
            <figcaption>V1 · Consistent empty-state foundation</figcaption>
          </figure>
        </section>

        <section className="crusoe-release-block crusoe-v2-release">
          <div className="crusoe-release-heading">
            <span>V2 · Future release system</span>
            <p>Contextual cards recommend useful starting configurations; state-aware banners handle prerequisites, progress, failure, recovery, and the next step.</p>
          </div>
          <figure>
            <Image
              src="/images/crusoe/final-kubernetes-empty.png"
              alt="Future Crusoe Kubernetes empty state with recommendation cards and a provisioning banner"
              width={1440}
              height={940}
              sizes="(max-width: 900px) 88vw, 42vw"
            />
            <figcaption>V2 · Guidance cards + state-aware banner</figcaption>
          </figure>
        </section>
      </div>
      <figcaption>V1 final system and V2 future-release direction shown once, side by side</figcaption>
    </figure>
  )
}

function CrusoeEdgeCaseArtifact() {
  return (
    <section className="crusoe-edge-cases" aria-labelledby="crusoe-edge-cases-title">
      <div className="crusoe-edge-heading">
        <span>06 · Edge cases</span>
        <div>
          <h3 id="crusoe-edge-cases-title">The cards guide the first choice. The banners carry every state after it.</h3>
          <p>The future release was designed as a connected system: recommendation cards reduce first-run decision load, while persistent banners keep users oriented as the product moves through prerequisites, provisioning, failure, recovery, and success.</p>
        </div>
      </div>

      <div className="crusoe-edge-model" aria-label="Future release edge-case model">
        <article><span>01</span><strong>Missing prerequisite</strong><p>Explain what must exist first and provide the action or documentation needed to resolve it.</p></article>
        <article><span>02</span><strong>Provisioning</strong><p>Confirm the request, set a time expectation, and prevent accidental duplicate actions.</p></article>
        <article><span>03</span><strong>Failure + recovery</strong><p>Name the failure, preserve context, and offer retry, an alternate path, or support.</p></article>
        <article><span>04</span><strong>Ready + next step</strong><p>Replace passive success messaging with the next action required to use the resource.</p></article>
      </div>

      <div className="crusoe-edge-gallery">
        {futureEdgeCases.map((edgeCase) => (
          <figure key={edgeCase.image}>
            <Image
              src={edgeCase.image}
              alt={`${edgeCase.title} shown through a future-release Crusoe banner`}
              width={edgeCase.width}
              height={edgeCase.height}
              sizes="(max-width: 900px) 88vw, 42vw"
            />
            <figcaption>
              <span>{edgeCase.state}</span>
              <div>
                <strong>{edgeCase.title}</strong>
                <p>{edgeCase.description}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

const emptyStateOutputs = [
  'A cross-Console audit spanning pages, tables, charts, cards, dropdowns, and modals',
  'A shippable V1 pattern with clear titles, descriptions, actions, docs, and next steps',
  'A scalable illustration direction for Compute, Orchestration, Storage, Metrics, and Access',
  'Future-state onboarding concepts for prerequisites, CLI actions, and suggested configurations',
]

const emptyStateWork = [
  {
    number: '01',
    title: 'Inventory the system',
    body: 'Reviewed pages, tables, charts, cards, dropdowns, and modals across the Console, not just the most visible product screens.',
    output: 'Cross-Console audit',
  },
  {
    number: '02',
    title: 'Trace the first run',
    body: 'Walked a brand-new account through Compute, Storage, Networking, Orchestration, and Observability to find repeated dead ends.',
    output: 'First-time journey map',
  },
  {
    number: '03',
    title: 'Separate the states',
    body: 'Distinguished truly empty moments from missing prerequisites, provisioning, errors, and recovery so one message was not forced onto every condition.',
    output: 'State model + edge cases',
  },
  {
    number: '04',
    title: 'Build the pattern',
    body: 'Defined a repeatable hierarchy for illustration, title, supporting guidance, primary action, and documentation across product contexts.',
    output: 'Reusable component anatomy',
  },
  {
    number: '05',
    title: 'Design two horizons',
    body: 'Kept the near-term release intentionally focused, then explored a richer onboarding layer without making V1 dependent on future platform work.',
    output: 'V1 system + V2 direction',
  },
  {
    number: '06',
    title: 'Prepare the handoff',
    body: 'Documented behavior, content intent, variants, and product-specific examples so teams could apply the system beyond a single mockup.',
    output: 'Implementation-ready guidance',
  },
] as const

const emptyStateRules = [
  ['Explain the resource', 'Because a status alone does not explain the product, a specific title and short description give the page a purpose.'],
  ['Make the first step obvious', 'Because an empty table offers little direction, one primary “Create Instance” action anchors the starting point.'],
  ['Put help beside the action', 'Because some customers need more detail before starting, “View docs” provides a secondary path without adding a wall of instructions.'],
] as const

const versionComparison = [
  ['Goal', 'Make empty moments clear and actionable now.', 'Turn first-run moments into contextual onboarding.'],
  ['Experience', 'A concise message, one primary action, and a documentation path.', 'Guided cards, recommended configurations, templates, and progressive next steps.'],
  ['States covered', 'The core “no resources yet” state across priority products.', 'Prerequisites, provisioning, success feedback, errors, and recovery.'],
  ['Technical lift', 'Fits the existing Console architecture and available product data.', 'Depends on richer state awareness, product logic, and orchestration.'],
  ['Why it matters', 'A consistent foundation the team could implement without waiting.', 'A clear roadmap that preserves the ambition without blocking the release.'],
] as const

const aiWorkflow = [
  {
    number: '01',
    title: 'Synthesize',
    ai: 'Used AI to cluster repeated audit observations and surface language patterns across a large set of screens.',
    human: 'I checked every theme against the source artifacts and decided which patterns were meaningful.',
  },
  {
    number: '02',
    title: 'Explore',
    ai: 'Generated alternate content structures and edge-case prompts for empty, prerequisite, provisioning, and failure states.',
    human: 'I selected, rewrote, and designed the directions that matched the product and user context.',
  },
  {
    number: '03',
    title: 'Pressure-test',
    ai: 'Used AI as a critique partner to look for inconsistent terminology, missing scenarios, and unclear next steps.',
    human: 'The team validated technical accuracy, feasibility, tone, and the final product decisions.',
  },
] as const

const emptyStatePartners = [
  ['Design critique', 'Pressure-tested hierarchy, density, and how the pattern should flex across products.'],
  ['Product', 'Prioritized the surfaces that mattered most and kept the first release focused.'],
  ['Engineering', 'Validated available states, prerequisites, actions, and what the Console could support in V1.'],
  ['Brand', 'Aligned the illustration direction with Crusoe’s visual language without letting art overpower guidance.'],
  ['Technical writing', 'Refined titles, descriptions, terminology, and the relationship between in-product help and documentation.'],
] as const

const cleanAuditFindings = [
  ['Explanations varied by product', 'Some pages explained the resource; others only named what was missing.', 'Use one anatomy with resource-specific copy.'],
  ['Actions appeared before guidance', 'A create button did not consistently explain requirements or what would happen next.', 'Keep the explanation, primary action, and docs together.'],
  ['Different situations needed different help', 'No resources, missing prerequisites, and provisioning required different guidance.', 'Separate the first-run pattern from state-aware V2 guidance.'],
] as const

const futureBannerCases = [
  ['Provisioning', 'Confirm the request, set a time expectation, and prevent duplicate actions.', '/images/crusoe/edge-banner-provisioning.png'],
  ['Failure', 'Name what failed, explain the cause, and offer a concrete recovery path.', '/images/crusoe/edge-banner-failure.png'],
  ['Retry', 'Preserve context after a failed attempt so users can recover without starting over.', '/images/crusoe/edge-banner-retry.png'],
  ['Ready', 'Replace passive success messaging with the next action required to use the resource.', '/images/crusoe/edge-banner-ready.png'],
] as const

const heuristicScope = [
  ['3', 'critical journeys reviewed'],
  ['10', 'usability principles applied'],
  ['9', 'improvements shipped'],
] as const

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
      <nav className="crusoe-case-nav" aria-label="Case study navigation">
        <Link href="/#work">← Back to work</Link>
        <span>Crusoe · Product Design Internship</span>
        <a href="mailto:anusharama100@gmail.com">Let&apos;s talk</a>
      </nav>

      <header className="crusoe-case-hero">
        <div className="crusoe-orbit orbit-one" aria-hidden="true" />
        <div className="crusoe-orbit orbit-two" aria-hidden="true" />
        <div className="crusoe-hero-copy">
          <p className="crusoe-eyebrow">Most recent internship · Cloud infrastructure</p>
          <h1>Making complex cloud workflows feel clear.</h1>
          <p className="crusoe-lede">
            Crusoe provides the computing power that AI teams need to build and run products. I worked on the Console, the
            web app where customers create resources, monitor them, and understand what they cost. This case study covers
            three projects: first-time guidance, a usability review, and a clearer connection between usage and billing.
          </p>
        </div>

        <div className="crusoe-hero-meta">
          <div><span>Role</span><strong>Product Design Intern</strong></div>
          <div><span>Timeline</span><strong>2026 internship</strong></div>
          <div><span>Team</span><strong>Design, PM, Eng, Brand, Writing</strong></div>
          <div><span>Tools</span><strong>Figma, FigJam, Claude Code</strong></div>
        </div>

        <figure className="crusoe-hero-visual">
          <div className="crusoe-hero-visual-media">
            <Image
              src="/images/crusoe/crusoe-data-center-hero.jpg"
              alt="Aerial view of a Crusoe AI data center campus"
              width={1280}
              height={622}
              sizes="(max-width: 900px) 94vw, 1400px"
              priority
            />
            <div className="crusoe-hero-visual-copy">
              <span>00 · Context</span>
              <strong>Infrastructure at the scale behind the Console.</strong>
            </div>
          </div>
          <figcaption>
            <span>Crusoe AI data center</span>
            <a href="https://www.crusoe.ai/data-centers" target="_blank" rel="noreferrer">Official Crusoe imagery ↗</a>
          </figcaption>
        </figure>
        <p className="crusoe-disclosure">Selected internship work is presented at an appropriate level of detail.</p>
      </header>

      <section className="crusoe-project-intro study-width" aria-labelledby="crusoe-projects-title">
        <h2 id="crusoe-projects-title">Explore the three projects.</h2>
        <p>Start with the empty-state system, or switch projects to explore the other work.</p>
        <p className="crusoe-study-methods">Methods across the work: interface audits, workflow walkthroughs, cross-functional design reviews, and engineering QA.</p>
      </section>

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

        {activeProject === 'empty-state-system' && (
      <section
        id="crusoe-panel-empty-state-system"
        role="tabpanel"
        aria-label="Empty-state system project"
        className="crusoe-case-section project-section green-section crusoe-project-panel crusoe-empty-story"
      >
        <div className="crusoe-section-label"><span>Project overview</span><strong>Console empty states</strong></div>
        <div className="crusoe-project-heading">
          <h2>Turn an empty screen into a useful starting point.</h2>
          <p>
            The Crusoe Console is the dashboard customers use to set up and manage cloud computing resources.
            On a first visit, there may be no resources or data yet. The screen shown at that moment is an <strong>empty state</strong>.
            I redesigned these first-run screens to explain the product and make the next step clearer.
          </p>
        </div>

        <CrusoeProjectBrief story={crusoeNarratives['empty-state-system']} label="Who this project helps and what I designed" />
        <CrusoeProjectProcess story={crusoeNarratives['empty-state-system']} />
        <CrusoeProjectCollaboration story={crusoeNarratives['empty-state-system']} />

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-problem-title">
          <div className="crusoe-clean-heading">
            <span>01 · The problem</span>
            <div>
              <h3 id="crusoe-clean-problem-title">A create button did not explain how to get started.</h3>
              <p>Consider the Instances page. An instance is a virtual computer a customer can run in the cloud. Before creating one, the customer saw an empty table and a create button, with little explanation of what belonged here or where to learn more.</p>
            </div>
          </div>
          <div className="crusoe-story-before">
            <figure className="crusoe-story-figure">
              <a className="crusoe-story-annotated" href="/images/crusoe/current-resource-empty.png" target="_blank" rel="noreferrer" aria-label="Open the original Instances screenshot at full size">
                <Image src="/images/crusoe/current-resource-empty.png" alt="Original Instances page showing an empty table, a No instances message, and Create Instance buttons" width={1045} height={431} sizes="(max-width: 900px) 90vw, 600px" />
                <span className="crusoe-story-pin pin-purpose" aria-hidden="true">1</span>
                <span className="crusoe-story-pin pin-action" aria-hidden="true">2</span>
              </a>
              <figcaption><span>Before · existing Instances page</span><a href="/images/crusoe/current-resource-empty.png" target="_blank" rel="noreferrer">Full-size image ↗</a></figcaption>
            </figure>
            <ol className="crusoe-story-observations" aria-label="What to notice in the original screen">
              <li><span aria-hidden="true">1</span><div><h4>A status, but little context</h4><p>“No instances” describes what is missing. It does not explain what an instance is or what the customer can do with one.</p></div></li>
              <li><span aria-hidden="true">2</span><div><h4>An action without nearby help</h4><p>“Create Instance” is available, but there is no first-run explanation or documentation link beside the empty message.</p></div></li>
            </ol>
          </div>
          <div className="crusoe-story-takeaway"><span>What the screen needed to do</span><p>Explain the resource, make the first action understandable, and offer help before asking the customer to commit to setup.</p></div>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-audit-title">
          <div className="crusoe-clean-heading">
            <span>02 · Investigation &amp; findings</span>
            <div>
              <h3 id="crusoe-clean-audit-title">Was this one screen, or a pattern across the Console?</h3>
              <p>I reviewed twelve screens and interface patterns, then walked a fresh account through five product areas. I asked the same questions each time: does this page explain the resource, is the next action clear, and can the customer understand what is required to continue?</p>
            </div>
          </div>
          <div className="crusoe-story-research-note" id="crusoe-clean-competitive-title-section">
            <h4 id="crusoe-clean-competitive-title">What I looked for in comparable products</h4>
            <p>I compared how other cloud products introduce resources, recommend a starting point, and make documentation available. That comparison helped me separate a useful first step from the longer tutorial the empty page should not become.</p>
          </div>
          <div className="crusoe-clean-audit-layout">
            <figure>
              <Image src="/images/crusoe/figjam-research-synthesis.png" alt="FigJam synthesis of first-time Crusoe Console gaps and user needs" width={1220} height={820} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 900px) 564px, (max-width: 1260px) 44vw, 564px" />
              <figcaption>Supporting artifact · notes from the first-run Console audit</figcaption>
            </figure>
            <div className="crusoe-clean-findings">
              {cleanAuditFindings.map(([title, body, implication], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h4>{title}</h4>
                  <p>{body}</p>
                  <p className="crusoe-insight-implication"><strong>Design implication</strong>{implication}</p>
                </article>
              ))}
            </div>
          </div>

          <details className="crusoe-story-evidence">
            <summary>Explore the original screens and problem-framing notes</summary>
            <div className="crusoe-story-evidence-body">
            <div className="crusoe-before-evidence-heading">
              <div>
                <h4 id="crusoe-before-evidence-title">Six examples from the broader audit</h4>
                <p>These original screens show how the guidance varied by product. They are supporting evidence, not separate redesign projects.</p>
              </div>
            </div>

            <div className="crusoe-before-screen-grid" aria-label="Examples of Crusoe Console empty states before the redesign">
              {currentEmptyStateScreens.map(({ label, src, width, height }, index) => (
                <figure key={`before-${src}`}>
                  <div className="crusoe-before-screen-media">
                    <Image
                      src={src}
                      alt={`${label} empty state before the redesign`}
                      width={width}
                      height={height}
                      sizes="(max-width: 760px) 90vw, 42vw"
                    />
                  </div>
                  <figcaption><span>0{index + 1}</span><strong>{label}</strong></figcaption>
                </figure>
              ))}
            </div>

            <figure className="crusoe-story-figure crusoe-story-support-board">
              <Image src="/images/crusoe/empty-state-problem-framing.png" alt="FigJam problem-framing board for Crusoe empty states" width={1040} height={1040} sizes="(max-width: 600px) 90vw, 480px" />
              <figcaption>Working notes · translating the audit into a design challenge</figcaption>
            </figure>
            </div>
          </details>
          <div className="crusoe-story-takeaway"><span>What the audit changed</span><p>The answer was not to write a different explanation for every blank table. It was to define one guidance pattern that could adapt to each resource and state.</p></div>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-v1-title">
          <div className="crusoe-clean-heading">
            <span>03 · Design decisions</span>
            <div>
              <h3 id="crusoe-clean-v1-title">The same task, with a clearer starting point.</h3>
              <p>For the first-release design, I replaced the empty table with a resource-specific illustration, a clear title, a short explanation, one primary action, and a documentation link. The progression below compares the original Instances page, V1, and the proposed V2 with setup options and progress feedback.</p>
            </div>
          </div>
          <div className="crusoe-story-comparison crusoe-story-comparison-three" aria-label="Instances empty-state progression: Before, V1, and V2">
            <figure className="crusoe-story-figure">
              <div className="crusoe-story-comparison-label"><span>Before</span><strong>A status and a create button</strong></div>
              <a className="crusoe-story-comparison-media" href="/images/crusoe/current-resource-empty.png" target="_blank" rel="noreferrer" aria-label="Open the before Instances screenshot at full size">
                <Image src="/images/crusoe/current-resource-empty.png" alt="Before redesign: Instances page with an empty table and Create Instance action" width={1045} height={431} sizes="(max-width: 760px) 90vw, 650px" />
              </a>
              <figcaption>Existing Console · Instances</figcaption>
            </figure>
            <figure className="crusoe-story-figure">
              <div className="crusoe-story-comparison-label"><span>Designed · V1</span><strong>Purpose, action, and help together</strong></div>
              <a className="crusoe-story-comparison-media" href="/images/crusoe/final-instances-empty.png" target="_blank" rel="noreferrer" aria-label="Open the redesigned Instances screenshot at full size">
                <Image src="/images/crusoe/final-instances-empty.png" alt="Redesigned Instances empty state with a resource explanation, Create Instance button, and View docs link" width={838} height={768} sizes="(max-width: 760px) 90vw, 450px" />
              </a>
              <figcaption>First-release design · Instances</figcaption>
            </figure>
            <figure className="crusoe-story-figure">
              <div className="crusoe-story-comparison-label"><span>Proposed · V2</span><strong>Setup options and progress in context</strong></div>
              <a className="crusoe-story-comparison-media" href="/images/crusoe/final-instances-provisioning.png" target="_blank" rel="noreferrer" aria-label="Open the proposed V2 Instances screenshot at full size">
                <Image src="/images/crusoe/final-instances-provisioning.png" alt="Proposed V2 Instances experience with configuration cards, resource guidance, and an instance provisioning status banner" width={1440} height={900} sizes="(max-width: 760px) 90vw, (max-width: 1100px) 680px, 30vw" />
              </a>
              <figcaption>Proposed next iteration · Instances</figcaption>
            </figure>
          </div>
          <div className="crusoe-story-design-decisions" aria-label="How the redesign responds to the audit">
            {emptyStateRules.map(([title, body], index) => (
              <article key={title}><span>0{index + 1}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-collaboration-title">
          <div className="crusoe-clean-heading">
            <span>04 · Review &amp; iteration</span>
            <div>
              <h3 id="crusoe-clean-collaboration-title">Make the foundation usable without waiting for every future feature.</h3>
              <p>I used design critique to review hierarchy and density, product review to prioritize the first release, and engineering review to check available actions and states. Brand and technical writing refined the illustrations and terminology. Those reviews helped separate the foundation from the more ambitious onboarding direction.</p>
            </div>
          </div>
          <div className="crusoe-story-release-scope">
            <article><span>First-release design · V1</span><h4>Explain the empty page.</h4><p>A consistent illustration, title, description, primary action, and documentation path that fit the existing Console.</p></article>
            <article><span>Proposed next iteration · V2</span><h4>Guide the wider setup journey.</h4><p>Recommended configurations and state-aware messages require richer product logic, so I kept them separate from the foundation.</p></article>
          </div>
          <div className="crusoe-story-takeaway"><span>The tradeoff</span><p>Keep the immediate design simple enough to implement, while documenting how the same pattern could support more complex situations later.</p></div>
        </section>

        <section className="crusoe-clean-section" aria-labelledby="crusoe-clean-v2-title">
          <div className="crusoe-clean-heading">
            <span>05 · Future direction</span>
            <div>
              <h3 id="crusoe-clean-v2-title">Help before creation, and feedback after it.</h3>
              <p>The proposed second version extends the pattern beyond “nothing exists yet.” It helps customers choose a setup, then explains what is happening as that resource is created.</p>
            </div>
          </div>
          <div className="crusoe-story-future">
            <figure className="crusoe-story-figure">
              <Image src="/images/crusoe/final-kubernetes-empty.png" alt="Proposed Kubernetes experience with recommended setup cards and a provisioning status message" width={1440} height={940} sizes="(max-width: 900px) 90vw, 650px" />
              <figcaption>Proposed V2 · Kubernetes setup guidance</figcaption>
            </figure>
            <div>
              <h4>Before creation: choose a setup.</h4><p>Configuration cards offer starting options instead of making every customer begin with a blank setup.</p>
              <h4>After starting: follow progress.</h4><p>Status messages confirm progress, explain a failure, support a retry, or point to the next step once the resource is ready.</p>
            </div>
          </div>
          <section className="crusoe-story-edge-cases" aria-labelledby="crusoe-edge-cases-title">
            <h4 id="crusoe-edge-cases-title">Edge cases &amp; state transitions</h4>
            <p>These proposed V2 edge-case designs cover provisioning, failure, retry, and the ready state. Each message explains what is happening and gives the user a clear next step, including how to recover when something goes wrong.</p>
          <div className="crusoe-clean-banner-grid crusoe-story-banners" aria-label="Four proposed V2 edge cases and state transitions">
            {futureBannerCases.map(([title, body, image]) => (
              <figure key={image}>
                <Image src={image} alt={`${title} status message from the proposed second version`} width={1210} height={115} sizes="(max-width: 760px) 90vw, 650px" />
                <figcaption><strong>{title === 'Provisioning' ? 'Creating the resource' : title}</strong><span>{body}</span></figcaption>
              </figure>
            ))}
          </div>
          </section>
        </section>

        <section className="crusoe-clean-section crusoe-clean-outcome-section" aria-labelledby="crusoe-clean-outcome-title">
          <div className="crusoe-clean-heading">
            <span>06 · Outcome &amp; next steps</span>
            <div>
              <h3 id="crusoe-clean-outcome-title">One documented pattern, ready to reuse.</h3>
              <p>I delivered the first-release design, product-specific examples, and implementation guidance, with the more advanced direction documented separately. The outcome presented here is the design system and handoff, rather than a measured change in onboarding performance.</p>
            </div>
          </div>
          <dl className="crusoe-story-context crusoe-story-deliverables" aria-label="Project deliverables and status">
            <div><dt>Delivered</dt><dd>A reusable first-release empty-state pattern and product examples</dd></div>
            <div><dt>Documented for implementation</dt><dd>Content hierarchy, actions, variants, and behavior notes</dd></div>
            <div><dt>Proposed next</dt><dd>Configuration recommendations and state-aware guidance</dd></div>
          </dl>
          <details className="crusoe-story-evidence" open>
            <summary>Watch the empty-state design walkthroughs</summary>
            <div className="crusoe-motion-grid crusoe-clean-motion-grid crusoe-story-evidence-body">
            {finalEmptyStateVideos.map(([title, src, description]) => (
              <figure key={src}>
                <ViewportVideo
                  sources={[{ src, type: 'video/mp4' }]}
                  ariaLabel={`${title} empty state walkthrough`}
                />
                <figcaption><strong>{title}</strong><span>{description}</span></figcaption>
              </figure>
            ))}
          </div>
          </details>
          <CrusoeProjectNextSteps story={crusoeNarratives['empty-state-system']} />
        </section>
      </section>
        )}

        {activeProject === 'heuristic-evaluation' && (
      <section
        id="crusoe-panel-heuristic-evaluation"
        role="tabpanel"
        aria-label="Heuristic evaluation project"
        className="crusoe-case-section project-section blue-section crusoe-project-panel crusoe-interactive-study"
      >
        <div className="crusoe-section-label"><span>Project overview</span><strong>Cloud Console usability evaluation</strong></div>
        <div className="crusoe-project-heading">
          <h2>A structured usability review became nine shipped improvements.</h2>
          <p>
            A heuristic evaluation is a structured way to find usability problems. I reviewed three important tasks: checking
            costs, setting up an API key, and debugging a resource. I then turned the most serious findings into Jira tickets
            and worked with engineering through implementation and QA.
          </p>
        </div>

        <div className="crusoe-he-scope" aria-label="Heuristic evaluation scope">
          {heuristicScope.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
        <CrusoeProjectBrief story={crusoeNarratives['heuristic-evaluation']} />
        <CrusoeProjectProcess story={crusoeNarratives['heuristic-evaluation']} />
        <CrusoeProjectCollaboration story={crusoeNarratives['heuristic-evaluation']} />

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-method-title">
          <div className="crusoe-clean-heading">
            <span>01 · How I investigated</span>
            <div>
              <h3 id="crusoe-he-method-title">Every finding needed to lead to a clear fix.</h3>
              <p>For the heuristic evaluation, I walked through the complete tasks and compared what happened against ten usability principles. Each finding recorded the behavior, its user consequence, severity, and a possible response. I kept each observation linked to the screen and task that demonstrated it.</p>
            </div>
          </div>

          <div className="crusoe-he-method-grid">
            {heuristicMethod.map(([number, title, body]) => (
              <article key={number}><span>{number}</span><h4>{title}</h4><p>{body}</p></article>
            ))}
          </div>

          <div className="crusoe-he-principle-band">
            <span>Evaluation logic</span>
            <p>I did not stop at naming a principle. Every finding followed the same path: <strong>what happened → why it was a problem → how it affected users → what should change.</strong></p>
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
            <div><h3 id="crusoe-he-insights-title">Three recurring problems shaped the recommendations.</h3><p>The review mattered when a finding could be traced to a customer consequence and a specific design response. These examples connect the evaluation to the screens and iterations that follow.</p></div>
          </div>
          <CrusoeEvidenceChain rows={heuristicInsights} caption="From evaluation evidence to a design response" />
        </section>

        <section className="crusoe-clean-section crusoe-he-section" aria-labelledby="crusoe-he-findings-title">
          <div className="crusoe-clean-heading">
            <span>03 · Design decisions &amp; iterations</span>
            <div>
              <h3 id="crusoe-he-findings-title">The important work was deciding what should change, and why.</h3>
              <p>These three decisions show how an observation became a design response and a buildable scope. Nine improvements shipped across the evaluation; the supporting frames also include proposed and longer-term directions, labeled separately below.</p>
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
