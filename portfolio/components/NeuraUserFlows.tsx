"use client"

export default function NeuraUserFlows() {
  return <div className="neura-chapter" id="neura-flows" aria-labelledby="neura-flows-title">
    <h3 id="neura-flows-title">User Flows & Core Features</h3>
    <p>Six core journeys mapped from research insights, from first visit to reviewing what you have learned.</p>
    <div className="neura-flow-stack">
      <Journey number="01" title="Onboarding">
        <Path label="Onboarding steps" steps={['Landing Page', 'Features', 'Try Free', 'Dashboard', 'Create Note']} />
      </Journey>
      <Journey number="02" title="Create Note">
        <Path label="Create note steps" steps={['Dashboard', 'Notes Page', 'New Note', 'Write Content', 'Save']} />
        <Choices label="Other capture options" items={['Upload PDF', 'Import Photo', 'Voice Note']} />
      </Journey>
      <Journey number="03" title="AI Features">
        <Path label="Extract concepts" steps={['Note Content', 'Extract Concepts', 'AI Processing', 'Concepts Displayed']} />
        <Choices label="From a concept" items={['Click → Explanation', 'Save → Add to Map']} />
        <Path label="Summarize a note" steps={['Note Content', 'Summarize', 'AI Processing', 'Summary']} />
      </Journey>
      <Journey number="04" title="Concept Map">
        <Path label="Open the concept map" steps={['Dashboard', 'Concept Map', 'Has Concepts?']} />
        <Path label="With concepts" steps={['View Map', 'Click Node', 'See Connections']} />
        <Path label="Without concepts" steps={['Empty State', 'Create Notes']} />
      </Journey>
      <Journey number="05" title="Review Session">
        <Path label="Open review" steps={['Dashboard', 'Review Page', 'Has Concepts?']} />
        <Path label="Review a concept" steps={['Start', 'Question', 'Answer', 'Feedback', 'More?']} />
        <p className="neura-flow-repeat">Repeat for another concept, or finish the session.</p>
        <Path label="Finish review" steps={['Complete', 'View Insights']} />
      </Journey>
      <Journey number="06" title="Insights">
        <Path label="Open learning insights" steps={['Dashboard', 'Insights Page', 'Has Content?']} />
        <Choices label="With content" items={['AI Coach Summary', 'Strengths & Focus', 'Progress Bars', 'Weekly Reflection']} />
      </Journey>
    </div>
    <div className="neura-note-block"><p>I mapped research insights to six user journeys, each designed to minimize friction while maximizing learning: capture quickly, see connections automatically, review effectively.</p></div>
  </div>
}

function Journey({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  const id = `neura-journey-${number}`
  return <section className="neura-journey" aria-labelledby={id}>
    <header><span>{number}</span><h4 id={id}>{title}</h4></header>
    {children}
  </section>
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
