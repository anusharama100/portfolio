"use client"

import ToniProductSlideshow from '@/portfolio/components/ToniProductSlideshow'

function Screen({ src, alt, caption }: { src: string; alt: string; caption: string }) { return <figure className="refined-figure"><a href={src} target="_blank" rel="noreferrer"><img src={src} alt={alt} loading="lazy" /></a><figcaption>{caption}<span aria-hidden="true">↗</span></figcaption></figure> }
export default function ToniPRCaseStudy() {
  return <main className="refined-story toni-focused-story">
    <section className="refined-chapter" id="service-framing"><div className="refined-heading"><p className="refined-kicker">01 / Frame the service</p><h2>Make the commitment clear before the interview.</h2><p>ToniPR asks founders to share their expertise in a short interview, then turns that conversation into content for different channels. I worked with the founder and engineering on the website and signed-in product journey.</p></div>
      <div className="toni-thesis-band refined-note"><strong>The design problem</strong><p>Explain what someone will receive and what they need to do, before asking them to record.</p></div>
      <Screen src="/tonipr/previews/three-step-workflow.jpg" alt="ToniPR website explaining set your goal, chat with Toni, and get your content kit" caption="Decision 01 · A three-step explanation connects the effort to the deliverable." />
      <div className="refined-two"><article><h4>Why this approach</h4><p>Leading with the content kit gives users a concrete outcome. Showing the steps makes an unfamiliar service easier to evaluate.</p></article><article><h4>The tradeoff</h4><p>A character brings warmth, but cannot carry the explanation alone. Clear labels and the time commitment do the practical work.</p></article></div>
    </section>
    <section className="refined-chapter" id="interview-design"><div className="refined-heading"><p className="refined-kicker">02 / Prepare the conversation</p><h3>Help users give useful input without writing a brief.</h3><p>I designed the dashboard and setup around a sequence of bounded choices: goal, focus, voice, and recording conditions. The selected direction gives the interview structure while keeping the person’s own expertise central.</p></div>
      <ToniProductSlideshow />
      <div className="toni-edge-strip refined-note"><strong>Interaction decisions</strong><p>Make camera and microphone readiness explicit. Distinguish listening, thinking, and completion. Explain interruptions and give users a recovery path.</p></div>
      <p><strong>Implementation scope:</strong> the linked HTML, CSS, and JavaScript prototype demonstrates navigation and interface states. Interview generation, payments, and production infrastructure are outside that demo.</p>
    </section>
    <section className="refined-chapter" id="content-system"><div className="refined-heading"><p className="refined-kicker">03 / Review the output</p><h3>Keep the source beside the story.</h3><p>A polished draft still needs review. I connected the original interview with the narrative so users can judge whether the content reflects what they said before adapting it for a channel.</p></div>
      <Screen src="/tonipr/previews/source-and-story.jpg" alt="ToniPR public demonstration pairing a source interview clip with its long-form narrative" caption="Decision 03 · Source interview and narrative appear together for review." />
      <div className="toni-format-strip refined-note"><strong>One interview, multiple formats</strong><p>Organize the kit by the place the content will be used. Keep reviewing and editing distinct from publishing.</p></div>
    </section>
    <section className="refined-chapter" id="collaboration"><div className="refined-heading"><p className="refined-kicker">Delivery / My contribution</p><h3>Connect the product promise to buildable behavior.</h3><p>I owned visual and interaction design across the public website, onboarding, interview setup, and content review. With the founder, I aligned the service story; with engineering, I used flows and screen states to discuss permissions, progress, interruptions, and responsive behavior.</p></div>
      <p className="toni-collaboration-takeaway">The delivered evidence is the journey, interface designs, and working frontend prototype. Verified acquisition, conversion, and completion analytics are not available.</p>
      <div className="refined-two"><article><h4>What I learned</h4><p>Personality makes a service approachable. Clear expectations and visible source material make it inspectable.</p></article><article><h4>Next validation</h4><p>Observe a founder completing setup and reviewing a kit. Check where they hesitate and whether they can trace a claim back to the interview.</p></article></div>
    </section>
  </main>
}
