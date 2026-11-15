"use client"

import { useState } from 'react'
import NeuraUserFlows from '@/portfolio/components/NeuraUserFlows'
import NeuraWalkthroughVideo from '@/portfolio/components/NeuraWalkthroughVideo'
import neuraWalkthroughs from '@/portfolio/components/neuraWalkthroughs.json'

const screens = [
  ['Dashboard', '/neuranote/neuranote-4.png', 'Notes, concept maps, and review share one learning workspace.'],
  ['Concept map', '/neuranote/neuranote-5.png', 'Connections make relationships between ideas visible.'],
  ['Review', '/neuranote/neuranote-6.png', 'Recall prompts turn saved information into an active task.'],
] as const
export default function NeuraNoteCaseStudy() {
  const [screen, setScreen] = useState(0)
  const current = screens[screen]!
  return <main className="refined-story neura-focused-story">
    <section className="refined-chapter"><div className="refined-heading"><p className="refined-kicker">01 / Research</p><h2>Saving notes is easier than returning to learn from them.</h2><p>NeuraNote is an independent learning concept informed by cognitive science. I explored how note capture, concept mapping, and active review could work together in a calmer study space.</p></div>
      <dl className="refined-facts"><div><dt>Survey</dt><dd>28 respondents</dd></div><div><dt>Usability sessions</dt><dd>6 participants</dd></div><div><dt>My work</dt><dd>Research, synthesis, flows, interface design, and frontend prototyping.</dd></div></dl>
      <div className="refined-note neura-problem"><strong>The opportunity</strong><p>Keep capture simple, make connections visible, and give people a clear way back into review.</p></div>
      <p>The research informed a study-focused workflow rather than a general document editor. I organized the concept around finding related material and returning to it through recall prompts.</p>
    </section>
    <section className="refined-chapter"><div className="refined-heading"><p className="refined-kicker">02 / Prototype &amp; test</p><h3>Make the transition from a note to a concept explicit.</h3><p>I tested the mid-fidelity prototype in moderated sessions with six participants. Three were unsure when concepts would be extracted automatically versus added manually. That finding led me to distinguish those actions more clearly.</p></div>
      <figure className="refined-figure"><a href="/neuranote/midfi-wireframes.png" target="_blank" rel="noreferrer"><img src="/neuranote/midfi-wireframes.png" alt="NeuraNote mid-fidelity workspace and note-taking wireframes" loading="lazy" /></a><figcaption>Iteration artifact · Mid-fidelity workspace used to explore the flow.</figcaption></figure>
      <div className="refined-two"><article><h4>Design judgment</h4><p>Automating extraction can reduce effort, but hidden behavior makes the system harder to understand. Keep the trigger and resulting concepts visible.</p></article><article><h4>Study limitation</h4><p>These sessions identify usability issues. They do not establish improved memory, faster recall, or long-term learning outcomes.</p></article></div>
    </section>
    <section className="refined-chapter"><div className="refined-heading"><p className="refined-kicker">03 / Explore the design</p><h3>One workspace. A few clear learning tasks.</h3><p>Choose a journey to see its steps, then explore the final interfaces.</p></div>
      <NeuraUserFlows />
      <div className="refined-gallery-controls" role="group" aria-label="NeuraNote final screens">{screens.map(([label], index) => <button key={label} aria-pressed={screen === index} onClick={() => setScreen(index)}>{label}</button>)}</div>
      <figure className="refined-figure"><a href={current[1]} target="_blank" rel="noreferrer"><img src={current[1]} alt={`NeuraNote ${current[0]} final design`} loading="lazy" /></a><figcaption>{current[2]}</figcaption></figure>
    </section>
    <section className="refined-chapter"><div className="refined-heading"><p className="refined-kicker">04 / Walkthrough &amp; implementation</p><h3>Inspect the flow, then try the browser prototype.</h3><p>The recordings demonstrate the designed onboarding and study flow. The linked browser prototype supports local notes and study tools; it is a frontend demonstration with browser-local data.</p></div>
      <details className="refined-details"><summary>Watch the timestamped design walkthroughs</summary>{(['onboarding', 'workflow'] as const).map(key => { const v = neuraWalkthroughs[key]; return <div key={key}><h4>{key === 'onboarding' ? 'Onboarding' : 'Notes to review'}</h4><NeuraWalkthroughVideo label={`NeuraNote ${key} walkthrough`} poster={v.poster} sources={[{ src: v.src, type: 'video/mp4' }]} chapters={v.chapters} captions={v.captions} width={v.width} height={v.height} /></div> })}</details>
      <div className="refined-note neura-note-block"><strong>What I would validate next</strong><p>Test whether people understand concept extraction without guidance. Then run a longer study comparing review habits and recall before making a learning-impact claim.</p></div>
    </section>
  </main>
}
