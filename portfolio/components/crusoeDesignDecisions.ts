import type { CrusoeDecision } from './CrusoeDecisionExplorer'

// These are explanations of the existing evaluation artifacts, not new research results.
export const crusoeDesignDecisions: CrusoeDecision[] = [
  {
    id: 'api-defaults',
    label: 'Safer API-key defaults',
    question: 'When should the product explain risk?',
    decision: 'Explain the risk while someone can still change the decision.',
    why: 'The old modal allowed unnamed keys and defaulted to permanent access. The warning came after creation. I moved the guidance into the decision itself: require a name, recommend expiration, and explain the permanent-access option before confirmation.',
    tradeoff: 'A new set of expiration controls was not necessary. The engineering refinement kept the existing calendar and changed the default, validation, warning, and reminders instead. Permanent keys remained possible rather than being blocked.',
    check: 'Required-name validation; expiration enabled by default; the warning when expiration is disabled; and the reminder behavior. These checks belong in the ticket and QA, not just the mockup.',
    steps: [
      { label: 'Original problem', shortLabel: 'Before', status: 'Audit evidence', caption: 'The evaluation connects the optional alias and never-expires default to specific error-prevention risks.', src: '/images/crusoe/figma/api-create-before.png', width: 1440, height: 900 },
      { label: 'Design direction', shortLabel: 'Design', status: 'Proposed redesign', caption: 'The design makes naming and expiration explicit, with an advance warning when someone chooses permanent access.', src: '/images/crusoe/figma/api-create-after.png', width: 1560, height: 840 },
      { label: 'Engineering refinement', shortLabel: 'Refine', status: 'Refined proposal', caption: 'The existing date picker stays. The change is concentrated on the safer default and the behaviors around it, reducing the implementation scope.', src: '/images/crusoe/figma/api-create-refined.png', width: 1000, height: 840 },
    ],
  },
  {
    id: 'cost-comparison',
    label: 'Explain a cost change',
    question: 'How can a chart lead to an action?',
    decision: 'Make the cost behind a chart segment inspectable, then provide a way to respond.',
    why: 'A total can show that spend changed without revealing its cause. I proposed inspecting an individual chart segment for its exact price and filtering categories to compare the services that matter, including smaller ones hidden by larger totals.',
    tradeoff: 'Keep the overview readable without sending every investigation to a separate report. Detailed values appear on demand; category filters narrow the comparison. Budget alerts are a separate next action, not more information crowded into the chart.',
    check: 'The value and category shown for a selected segment; category filtering; the retained time range; and the alert threshold and notification states. The frames show design intent, not a measured reduction in spend.',
    steps: [
      { label: 'Inspect the breakdown', shortLabel: 'Chart', status: 'Proposed redesign', caption: 'The chart inspection is represented in this design frame: a category and exact daily cost are revealed, while filters support comparison.', src: '/images/crusoe/figma/billing-cost-breakdown.png', width: 1440, height: 720 },
      { label: 'Act on the finding', shortLabel: 'Alerts', status: 'Proposed redesign', caption: 'The alert setup extends the investigation into a preventive action, with a threshold and notification path.', src: '/images/crusoe/figma/billing-budget-alerts.png', width: 1440, height: 820 },
    ],
  },
  {
    id: 'recovery-context',
    label: 'Recover without a detour',
    question: 'What should “Unhealthy” help someone do?',
    decision: 'Explain the immediate problem in place; reserve navigation for deeper diagnosis.',
    why: 'An Unhealthy badge names a condition but does not explain it. The proposed explanation adds the number of ready nodes, a reason, and duration so someone can judge the situation before leaving the resource list.',
    tradeoff: 'A compact explanation can support triage, but it should not try to replace metrics and logs. A contextual link provides the route to detailed evidence. The design reuses the ready-node count already present in the table.',
    check: 'Healthy, unhealthy, and missing-reason cases; the ready-node count and duration; and whether the details link keeps the correct resource context. The in-place explanation is a proposed direction in the evidence shown here.',
    steps: [
      { label: 'Journey diagnosis', shortLabel: 'Audit', status: 'Evaluation artifact', caption: 'The evaluation frames the operational task and the consequences that informed the recommendation and engineering scope.', src: '/images/crusoe/figma/monitoring-journey-overview.png', width: 1440, height: 900 },
      { label: 'In-place explanation', shortLabel: 'Concept', status: 'Proposed interaction', caption: 'The low-fidelity frame explains the unhealthy state beside the badge, with an exit to node details for deeper investigation.', src: '/images/crusoe/figma/monitoring-unhealthy-tooltip.png', width: 1240, height: 760 },
    ],
  },
]
