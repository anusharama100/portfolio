"use client"

type Step = { label: string; kind?: 'entry' | 'action' | 'config' | 'success' }
type Journey = { title: string; steps: Step[]; choices?: string[]; focus?: string }

const roleJourneys: Journey[] = [
  { title: 'Requester: Submit & Track', steps: [
    { label: 'Login', kind: 'entry' }, { label: 'My Requests', kind: 'entry' },
    { label: 'New Request' }, { label: 'Fill Form' }, { label: 'Submit' },
    { label: 'Track Status', kind: 'success' },
  ] },
  { title: 'Approver: Review & Decide', steps: [
    { label: 'Pending Queue', kind: 'entry' }, { label: 'View Details' }, { label: 'Review Context' },
  ], choices: ['Approve', 'Reject', 'Need Info'] },
  { title: 'Agent: Triage & Resolve', steps: [
    { label: 'Triage Queue', kind: 'entry' }, { label: 'Priority Sort', kind: 'config' },
    { label: 'Claim Request' }, { label: 'Work on It' }, { label: 'Add Notes' },
    { label: 'Resolve', kind: 'success' },
  ] },
  { title: 'Admin: Configure System', steps: [
    { label: 'Admin Panel', kind: 'entry' }, { label: 'Request Types', kind: 'config' },
    { label: 'SLA Policies', kind: 'config' }, { label: 'Workflows', kind: 'config' },
    { label: 'Save & Deploy', kind: 'success' },
  ] },
]

const keyWorkflows: Journey[] = [
  { title: 'Create → Approve → Resolve (Happy Path)', steps: [
    { label: 'Requester submits', kind: 'entry' }, { label: 'Manager reviews' },
    { label: 'Manager approves' }, { label: 'Agent picks up' }, { label: 'Agent resolves' },
    { label: 'Requester closes', kind: 'success' },
  ], focus: 'Clear status indicators at each stage so requester always knows where their request stands.' },
  { title: 'Agent Triage & Assignment', steps: [
    { label: 'Queue shows prioritized list', kind: 'entry' }, { label: 'SLA badges highlight urgency' },
    { label: 'Agent claims request' }, { label: 'Internal notes for context', kind: 'success' },
  ], focus: 'Triage scoring surfaces highest-priority items automatically; bulk actions for efficiency.' },
  { title: '“Needs Info” Loop', steps: [
    { label: 'Approver needs clarification', kind: 'entry' }, { label: 'Status → Needs Info' },
    { label: 'Requester notified' }, { label: 'Requester responds' }, { label: 'Back to review', kind: 'success' },
  ], focus: 'Prevent requests from stalling invisibly; clear prompts for what info is needed.' },
  { title: 'SLA At-Risk Escalation', steps: [
    { label: 'SLA: On Track', kind: 'entry' }, { label: 'Warning: At Risk' },
    { label: 'Badge turns red' }, { label: 'Manager sees escalation', kind: 'success' },
  ], focus: 'Visual escalation before breach; dashboard surfaces at-risk items without manual checks.' },
]

export default function FlowOpsFlows({ type }: { type: 'roles' | 'workflows' }) {
  const journeys = type === 'roles' ? roleJourneys : keyWorkflows
  return (
    <div className="flowops-flow-stack">
      {journeys.map((journey, index) => (
        <section className="flowops-journey" aria-label={journey.title} key={journey.title}>
          <header>
            <span>{type === 'roles' ? 'Role' : 'Flow'} {String(index + 1).padStart(2, '0')}</span>
            <h4>{journey.title}</h4>
          </header>
          <ol className="flowops-flow-path" aria-label={`${journey.title} steps`}>
            {journey.steps.map((step, stepIndex) => (
              <li data-step-kind={step.kind ?? 'action'} key={step.label}>
                {step.label}
                {stepIndex < journey.steps.length - 1 && <span aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
          {journey.choices && (
            <div className="flowops-flow-choices">
              <p>Choose the appropriate decision</p>
              <ul aria-label="Approver decision options">
                {journey.choices.map(choice => <li key={choice}>{choice}</li>)}
              </ul>
            </div>
          )}
          {journey.focus && <p className="flowops-flow-focus"><strong>Design focus:</strong> {journey.focus}</p>}
        </section>
      ))}
      {type === 'roles' && (
        <div className="flowops-flow-legend" role="group" aria-label="Workflow color key">
          {(['Entry point', 'Action', 'Configuration', 'Success'] as const).map((label, index) => (
            <span key={label}><i data-step-kind={['entry', 'action', 'config', 'success'][index]} aria-hidden="true" />{label}</span>
          ))}
        </div>
      )}
    </div>
  )
}
