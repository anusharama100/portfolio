"use client"

const Screenshot = ({ src, alt, label }: { src: string; alt: string; label: string }) => <figure className="refined-figure"><a href={src} target="_blank" rel="noreferrer"><img src={src} alt={alt} loading="lazy" /></a><figcaption>{label} <span aria-hidden="true">↗</span></figcaption></figure>

export default function CrusoeFocusedStory() {
  return <section id="crusoe-panel-empty-state-system" role="tabpanel" aria-label="Empty-state system project" className="crusoe-case-section crusoe-project-panel refined-story crusoe-focused-story">
    <header className="refined-heading"><p className="refined-kicker">Primary project / Console empty states</p><h2>A first step for customers starting with nothing.</h2><p>Before a customer creates their first cloud resource, there is no data to show. I redesigned that moment to explain the resource, offer a useful action, and keep help within reach.</p></header>
    <dl className="refined-facts"><div><dt>My responsibility</dt><dd>Audit, synthesis, interaction design, product variants, and handoff.</dd></div><div><dt>Partners</dt><dd>Design, product, engineering, brand, and writing.</dd></div><div><dt>Delivery</dt><dd>First-release guidance pattern; richer setup guidance explored separately.</dd></div></dl>

    <section className="refined-chapter" id="crusoe-clean-problem-title-section"><div className="refined-heading"><p className="refined-kicker">01 / Understand</p><h3>A create button assumed the customer was ready.</h3><p>The original Instances page named what was missing. It gave little explanation of what an instance does or where a first-time customer could learn more.</p></div>
      <Screenshot src="/images/crusoe/current-resource-empty.png" alt="Before: original Instances page with an empty table, No instances message, and Create Instance buttons" label="Before · Existing Instances page" />
      <div className="refined-note"><strong>Research question</strong><p>Was this an isolated screen, or a repeated gap in the first-run experience?</p></div>
      <p>I reviewed first-run screens and patterns across five product areas, followed a fresh account through setup, and compared how other cloud products introduce unfamiliar resources. This was an interface audit and workflow review; it was not a controlled customer study.</p>
      <details className="refined-details"><summary>See the research synthesis</summary><Screenshot src="/images/crusoe/figjam-research-synthesis.png" alt="FigJam audit notes organizing gaps in resource explanations, next actions, and setup requirements" label="Research artifact · First-run audit synthesis" /></details>
    </section>

    <section className="refined-chapter" id="crusoe-clean-design-title-section"><div className="refined-heading"><p className="refined-kicker">02 / Decide</p><h3>Reuse the hierarchy. Keep the product-specific explanation.</h3><p>The recurring gap was orientation. I made the resource explanation, primary action, and documentation a consistent pattern, then adapted the wording and illustration for each product.</p></div>
      <div className="refined-split"><Screenshot src="/images/crusoe/final-instances-empty.png" alt="After: V1 Instances empty state with resource explanation, one create action, and documentation" label="After · Designed V1 guidance pattern" /><div className="refined-decisions"><article><span>01</span><h4>Explain before asking.</h4><p>A short description establishes what the resource is for before asking someone to create it.</p></article><article><span>02</span><h4>Give the action priority.</h4><p>One primary action keeps the next step visible. Documentation supports customers who need more context.</p></article><article><span>03</span><h4>Make consistency adaptable.</h4><p>The structure stays familiar across products; the explanation and requirements stay specific.</p></article></div></div>
      <p><strong>The tradeoff:</strong> a detailed setup checklist could answer more questions, but would also add content and configuration logic to a simple first encounter. I kept the first-release pattern focused and explored that extra guidance as V2.</p>
    </section>

    <section className="refined-chapter" id="crusoe-clean-v2-title-section"><div className="refined-heading"><p className="refined-kicker">03 / Review &amp; hand off</p><h3>Keep the foundation buildable.</h3><p>Reviews with product and engineering helped separate the initial pattern from the next iteration. With brand and writing, I refined the illustration, terminology, and amount of guidance.</p></div>
      <Screenshot src="/images/crusoe/final-instances-provisioning.png" alt="Proposed V2 Instances experience with more contextual setup and provisioning guidance" label="Proposed V2 · Contextual setup and provisioning guidance" />
      <div className="refined-two"><article><h4>What I delivered</h4><p>Reusable layouts, product-specific content, actions, and state notes so the handoff described behavior as well as appearance.</p></article><article><h4>What I would measure next</h4><p>Whether a new customer can explain the resource, choose the right first action, and complete setup. Compare by product and cohort before claiming an improvement.</p></article></div>
      <div className="refined-note"><strong>Result</strong><p>A documented first-run guidance system and a clear boundary between the initial release and proposed V2. The evidence here demonstrates design and delivery work; verified customer outcome data is not available.</p></div>
    </section>
  </section>
}
