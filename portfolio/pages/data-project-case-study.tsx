import { dataProjects, dataProjectStories, type DataProjectSlug } from '../components/dataProjects'

export function DataProjectPreview({ slug }: { slug: DataProjectSlug }) {
  const project = dataProjects[slug]
  return <figure className="study-product-stage study-width"><img src={project.image} alt={project.imageAlt} fetchPriority="high" /><figcaption><span>{project.image.endsWith('.svg') ? 'Pipeline schematic · Project structure' : 'Dashboard capture · Local application'}</span><a href="#study-summary">Read the overview ↓</a></figcaption></figure>
}

export default function DataProjectCaseStudy({ slug }: { slug: DataProjectSlug }) {
  const project = dataProjects[slug]
  const story = dataProjectStories[slug]
  return <main className="refined-story data-project-story">
    <section className="refined-chapter" id="problem-and-data">
      <div className="refined-heading"><p className="refined-kicker">01 / Problem &amp; data</p><h2>{story.question}</h2><p>{story.source}</p></div>
      <div className="refined-note"><strong>My contribution</strong><p>{project.summary[1][1]}</p></div>
    </section>
    <section className="refined-chapter" id="implementation">
      <div className="refined-heading"><p className="refined-kicker">02 / Implementation</p><h3>Follow the data through the product.</h3></div>
      <ol className="data-project-pipeline" aria-label={`${project.name} data flow`}>{story.pipeline.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol>
      <div className="refined-decisions">{story.decisions.map((decision, index) => <article key={decision.title}><span>Decision {String(index + 1).padStart(2, '0')}</span><h4>{decision.title}</h4><p>{decision.body}</p></article>)}</div>
    </section>
    <section className="refined-chapter" id="evidence-and-next-steps">
      <div className="refined-heading"><p className="refined-kicker">03 / Evidence &amp; reflection</p><h3>What the work demonstrates.</h3><p>{story.result}</p></div>
      {story.evidence && <div className="data-project-evidence">{story.evidence.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
      <div className="refined-note"><strong>Next iteration</strong><p>{story.next}</p></div>
    </section>
  </main>
}
