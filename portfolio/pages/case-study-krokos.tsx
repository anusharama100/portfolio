"use client"

import { useRef, useState } from 'react'
import { useCaseStudyMotion } from '@/portfolio/components/useCaseStudyMotion'
import KrokosScrollableSite from '@/portfolio/components/KrokosScrollableSite'

const homepageVersions = {
  before: {
    label: 'Original site',
    src: '/krokos/original-sections/opening.jpg',
    caption: 'Before · Archived sections of the original Squarespace homepage.',
    title: 'The content was there. The presentation needed a new rhythm.',
    body: 'The earlier homepage introduced the company and moved quickly into a newsletter sign-up. The science, supply-chain context, and production approach appeared farther down the page.',
    points: ['An existing scientific message to preserve.', 'A familiar logo and warm botanical palette.', 'An opportunity to make the reading path more deliberate.'],
  },
  after: {
    label: 'Redesign',
    src: '/krokos/redesign-landing-full.jpg',
    caption: 'After · Published homepage, captured from the Squarespace redesign.',
    title: 'A clearer invitation into the company’s story.',
    body: 'The new opening connects the botanical ingredients to the science behind them. An explicit Explore action leads into the supply-chain problem, followed by the plant science and the company’s approach.',
    points: ['A more distinctive hierarchy for the same core message.', 'Visible paths to the story, approach, product, team, and press.', 'A visual connection between nature and the laboratory.'],
  },
} as const

export function KrokosHomepageComparison() {
  const [version, setVersion] = useState<keyof typeof homepageVersions>('before')
  const current = homepageVersions[version]

  return (
    <div className="krokos-comparison" data-study-reveal>
      <div className="krokos-comparison-evidence">
        <div className="krokos-comparison-controls" role="group" aria-label="Compare the original and redesigned Krokos homepage">
          {(['before', 'after'] as const).map(key => (
            <button key={key} type="button" aria-pressed={version === key} aria-controls="krokos-comparison-media" onClick={() => setVersion(key)}>
              <span>{key === 'before' ? '01' : '02'}</span> {homepageVersions[key].label}
            </button>
          ))}
        </div>
        <div id="krokos-comparison-media">
          <KrokosScrollableSite key={version} version={version} />
        </div>
        <p className="krokos-comparison-still-link"><span>{current.caption}</span><a href={current.src} target="_blank" rel="noreferrer" aria-label={`Open ${current.label.toLowerCase()} ${version === 'before' ? 'opening capture' : 'full-page capture'}`}>{version === 'before' ? 'Open opening capture ↗' : 'Open full-page capture ↗'}</a></p>
      </div>
      <div className="krokos-comparison-reasoning">
        <div>
          <p className="krokos-kicker">{version === 'before' ? 'The starting point' : 'The design response'}</p>
          <h3>{current.title}</h3>
          <p>{current.body}</p>
        </div>
        <ul>{current.points.map(point => <li key={point}>{point}</li>)}</ul>
      </div>
      <span className="krokos-sr-only" role="status">Showing {current.label.toLowerCase()}.</span>
    </div>
  )
}

const readingPath = [
  ['The need', 'Why should sourcing botanicals change?', 'Start with the supply-chain problem, not a technical definition.'],
  ['The mechanism', 'How does plant cell culture work?', 'Move from a familiar plant to the science behind production.'],
  ['The application', 'What is Krokos building first?', 'Make the platform tangible through its initial saffron focus.'],
  ['The credibility', 'Who is behind the work?', 'Connect the story to the team and independent press coverage.'],
  ['The next step', 'How can I learn more or connect?', 'Keep contact and newsletter paths easy to find.'],
] as const

const productionDecisions = [
  ['Fit the existing hosting plan', 'The deployed version uses HTML and CSS rather than requiring a Squarespace plan upgrade for custom JavaScript.'],
  ['Keep navigation native', 'A native details/summary menu keeps mobile navigation operable without a separate script.'],
  ['Protect the surrounding site', 'Page-scoped styling avoids changing unrelated Squarespace pages, and existing article and contact destinations remain connected.'],
] as const

// Actual captures of the published site at a 390px viewport, November 5, 2026.
// Keep the full page images intact; the phone frames are user-controlled scrollers.
const mobileLayouts = [
  { id: 'homepage', title: 'Homepage', description: 'A clear opening and one Explore action.', height: 13635, scrollable: true },
  { id: 'navigation', title: 'Navigation', description: 'A compact menu with clear, tappable destinations.', height: 844, scrollable: false },
  { id: 'press', title: 'Press page', description: 'Coverage cards become a single reading column.', height: 2652, scrollable: true },
] as const

export function KrokosMobileLayouts() {
  return (
    <section className="crusoe-case-section krokos-section" id="krokos-mobile" aria-labelledby="krokos-mobile-title" data-study-title="Mobile layouts">
      <div className="krokos-section-heading" data-study-reveal>
        <p className="krokos-kicker">04 / Mobile layouts</p>
        <h2 id="krokos-mobile-title">The same story, on a smaller screen.</h2>
        <p>Actual mobile captures of the published redesign—not scaled-down desktop screens.</p>
      </div>
      <p className="krokos-mobile-help" id="krokos-mobile-help">Scroll inside the homepage and Press previews to explore. You can also focus a preview and use the arrow keys.</p>
      <div className="krokos-mobile-layouts">
        {mobileLayouts.map((layout, index) => (
          <figure key={layout.id} className="krokos-mobile-layout" data-study-reveal>
            <div className="krokos-mobile-device">
              <div className="krokos-mobile-screen" {...(layout.scrollable ? { role: 'region', tabIndex: 0, 'aria-label': `Mobile ${layout.title.toLowerCase()} capture`, 'aria-describedby': 'krokos-mobile-help' } : {})}>
                <img src={`/krokos/mobile/${layout.id}.png`} alt={`Published Krokos ${layout.title.toLowerCase()} at phone width`} width={390} height={layout.height} loading="lazy" />
              </div>
            </div>
            <figcaption>
              <span className="krokos-mobile-number">0{index + 1}</span>
              <h3>{layout.title}</h3>
              <p>{layout.description}</p>
              <a href={`/krokos/mobile/${layout.id}.png`} target="_blank" rel="noreferrer" aria-label={`Open mobile ${layout.title.toLowerCase()} capture at full size`}>Open full capture ↗</a>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="krokos-mobile-source">Published site · Captured at a 390px viewport</p>
    </section>
  )
}

export default function KrokosCaseStudy() {
  const root = useRef<HTMLElement>(null)
  useCaseStudyMotion(root, 'krokos')

  return (
    <main className="krokos-case" ref={root}>
      <section className="crusoe-case-section krokos-section" id="krokos-before-after" aria-labelledby="krokos-brief-title" data-study-title="The brief and transformation">
        <div className="krokos-section-heading">
          <p className="krokos-kicker">01 / The brief</p>
          <h2 id="krokos-brief-title">Keep the science. Change how people encounter it.</h2>
          <p>The brief was a complete visual refresh, not a rewrite of the company’s scientific message. I kept the existing copy, logo, and earthy color direction, then rebuilt the hierarchy, imagery, and rhythm around them.</p>
        </div>
        <KrokosHomepageComparison />
        <p className="krokos-design-question"><span>The design question</span>How can a biotechnology website feel credible and precise without feeling cold or difficult to enter?</p>
      </section>

      <section className="crusoe-case-section krokos-section" id="krokos-story" aria-labelledby="krokos-story-title" data-study-title="Content and storytelling">
        <div className="krokos-section-heading" data-study-reveal>
          <p className="krokos-kicker">02 / Content hierarchy</p>
          <h2 id="krokos-story-title">Give readers one question at a time.</h2>
          <p>Plant cell culture is unfamiliar to many visitors. I organized the page as a progression: establish the need, explain the mechanism, make the product concrete, then introduce the people and the next step.</p>
        </div>
        <ol className="krokos-reading-path" aria-label="The redesigned website’s reading path" data-study-reveal>
          {readingPath.map(([label, question, decision], index) => (
            <li key={label}>
              <span className="krokos-reading-step" aria-hidden="true">0{index + 1}</span>
              <div className="krokos-reading-question"><span>{label}</span><h3>{question}</h3></div>
              <p>{decision}</p>
            </li>
          ))}
        </ol>
        <figure className="krokos-landing-flow" data-study-reveal>
          <a href="/krokos/redesign-landing-flow.jpg" target="_blank" rel="noreferrer" aria-label="Open the landing-page flow overview at full size">
            <img src="/krokos/redesign-landing-flow.jpg" alt="Six actual website sections in order: opening, supply-chain problem, approach, saffron product, team, and contact" width={1600} height={1000} loading="lazy" />
          </a>
          <figcaption>Selected sections of the published landing page, in reading order. <a href="/krokos/redesign-landing-flow.jpg" target="_blank" rel="noreferrer">Open overview ↗</a></figcaption>
        </figure>
        <div className="krokos-science-evidence" data-study-reveal>
          <div>
            <h3>Explain the mechanism in the page—not just in a photograph.</h3>
            <p>The actual approach section brings the headline, explanation, and three-step sequence together. Readers can follow plant cells → cell culture → botanical ingredients, with a darker chapter marking the transition from the problem to the solution.</p>
            <a className="krokos-text-link" href="https://krokos.bio/#approach" target="_blank" rel="noreferrer">See the live approach section ↗</a>
          </div>
          <figure className="krokos-screen-evidence">
            <a href="/krokos/redesign-approach.jpg" target="_blank" rel="noreferrer" aria-label="Open the actual approach-section design at full size"><img src="/krokos/redesign-approach.jpg" alt="Published Krokos approach section with its headline, explanation, and three-step plant-cell-culture sequence" width={1280} height={757} loading="lazy" /></a>
            <figcaption>The published approach section, including the typography, spacing, and visual sequence. <a href="/krokos/redesign-approach.jpg" target="_blank" rel="noreferrer">Open full image ↗</a></figcaption>
          </figure>
        </div>
      </section>

      <section className="crusoe-case-section krokos-section" id="krokos-visual-system" aria-labelledby="krokos-visual-title" data-study-title="Visual design decisions">
        <div className="krokos-section-heading" data-study-reveal>
          <p className="krokos-kicker">03 / Visual direction</p>
          <h2 id="krokos-visual-title">Warm enough to invite. Clear enough to explain.</h2>
          <p>I kept the botanical identity recognizable while giving it a more editorial expression. The design balances organic imagery and warm color with a more deliberate type hierarchy and consistent section structure.</p>
        </div>
        <div className="krokos-visual-row" data-study-reveal>
          <figure className="krokos-screen-evidence"><a href="/krokos/redesign-press-full.jpg" target="_blank" rel="noreferrer" aria-label="Open the complete Press-page design"><img src="/krokos/redesign-press-coverage.jpg" alt="Published Krokos Press page coverage layout with publisher labels, publication dates, editorial headlines, descriptions, and article links" width={1280} height={1019} loading="lazy" /></a><figcaption>The Press page carries the visual system into an editorial coverage layout. <a href="/krokos/redesign-press-full.jpg" target="_blank" rel="noreferrer">Open complete Press page ↗</a></figcaption></figure>
          <dl className="krokos-design-reasons">
            <div><dt>Give every story a clear hierarchy</dt><dd>Publisher and date establish context; the headline and short description explain the story; a consistent Read the story action leads to the source.</dd></div>
            <div><dt>Editorial headlines, straightforward reading</dt><dd>Instrument Serif gives the headlines an organic character. DM Sans carries navigation, body text, and scientific explanations with a quieter rhythm.</dd></div>
            <div><dt>A familiar palette, used with more restraint</dt><dd>Olive, cream, and saffron-inspired accents preserve the brand’s warmth. Alternating surfaces give the long page a clearer sense of chapters.</dd></div>
          </dl>
        </div>
        <ul className="krokos-palette" aria-label="Colors used in the redesign">
          <li><span className="krokos-swatch krokos-swatch-olive" aria-hidden="true" /><span>Botanical olive<small>Structure & contrast</small></span></li>
          <li><span className="krokos-swatch krokos-swatch-cream" aria-hidden="true" /><span>Warm cream<small>Reading surfaces</small></span></li>
          <li><span className="krokos-swatch krokos-swatch-clay" aria-hidden="true" /><span>Terracotta<small>Organic accents</small></span></li>
          <li><span className="krokos-swatch krokos-swatch-saffron" aria-hidden="true" /><span>Saffron<small>Botanical warmth</small></span></li>
        </ul>
      </section>

      <KrokosMobileLayouts />

      <section className="crusoe-case-section krokos-section" id="krokos-delivery" aria-labelledby="krokos-delivery-title" data-study-title="Implementation and tradeoffs">
        <div className="krokos-section-heading" data-study-reveal>
          <p className="krokos-kicker">05 / Making it work in production</p>
          <h2 id="krokos-delivery-title">The finished experience had to fit the platform.</h2>
          <p>The richer prototype explored scroll sequences and pointer interactions. The live Squarespace plan did not support that custom JavaScript, so the published version prioritizes the design, the content, and reliable navigation without requiring an upgrade.</p>
        </div>
        <dl className="krokos-production-decisions" data-study-reveal>
          {productionDecisions.map(([choice, reason], index) => <div key={choice}><dt><span>0{index + 1}</span>{choice}</dt><dd>{reason}</dd></div>)}
        </dl>
        <aside className="krokos-implementation-note"><span>The tradeoff</span><p>CSS movement and hover feedback remain where supported, with reduced-motion handling. The more elaborate scripted effects are prototype explorations—not a claim about the published site.</p></aside>
      </section>

      <section className="crusoe-case-section krokos-section krokos-outcome" id="krokos-outcome" aria-labelledby="krokos-outcome-title" data-study-title="The live outcome">
        <div className="krokos-section-heading" data-study-reveal>
          <p className="krokos-kicker">06 / The outcome</p>
          <h2 id="krokos-outcome-title">A new presence, rooted in the same company.</h2>
          <p>The redesign is live on Krokos Bio’s existing Squarespace site. The homepage and Press page share the refreshed visual language, while established content, contact, and newsletter destinations remain part of the experience.</p>
        </div>
        <div className="krokos-live-links"><a href="https://krokos.bio/" target="_blank" rel="noreferrer">Explore the live website <span aria-hidden="true">↗</span></a><a href="https://krokos.bio/press" target="_blank" rel="noreferrer">View the Press page <span aria-hidden="true">↗</span></a></div>
        <p className="krokos-measurement-note">The outcome shown here is the shipped website. Contact engagement and newsletter completion would be useful next measures; no conversion lift is claimed.</p>
      </section>
    </main>
  )
}
