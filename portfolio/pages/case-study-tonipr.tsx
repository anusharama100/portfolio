"use client"

import { Link } from '@/portfolio/compat'
import { Image as PortfolioImage } from '@/portfolio/compat'
import type { ComponentProps } from 'react'
import ToniProductSlideshow from '@/portfolio/components/ToniProductSlideshow'

function Image(props: ComponentProps<typeof PortfolioImage>) {
  return <a className="toni-evidence-link" href={props.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${props.alt}`}><PortfolioImage {...props} /><span>View full size ↗</span></a>
}

const journey = [
  ['Discover', 'Can this solve my visibility problem?', 'Lead with a concrete content-kit outcome.'],
  ['Commit', 'Is this worth my time and money?', 'Make scope, pricing, and proof easy to compare.'],
  ['Prepare', 'What will I need to do?', 'Set expectations before camera and microphone access.'],
  ['Interview', 'Am I answering this well?', 'Use one clear prompt, progress, and calm feedback.'],
  ['Publish', 'What can I use right now?', 'Organize one conversation into channel-ready outputs.'],
]

const interviewPrinciples = [
  ['Intent first', 'Start with the outcome the user needs: trust, a launch, leads, hiring, or consistent visibility.'],
  ['Lower the stakes', 'Explain that the session is short, conversational, and does not require prepared copy.'],
  ['One moment at a time', 'Keep the current prompt and response state dominant so the interface never competes with the conversation.'],
  ['Visible momentum', 'Pair progress, recording feedback, and completion cues so users always know what is happening next.'],
]

const projectOverview = [
  ['Customer problem', 'Founders and consultants had expertise worth sharing, but turning it into consistent content required time, writing confidence, or agency support.'],
  ['Product response', 'ToniPR replaces the blank prompt with a guided interview, then turns the conversation into source-backed posts, articles, quotes, and video clips.'],
  ['My ownership', 'I designed the service journey, public website, pricing, authentication, onboarding, interview setup, dashboard, conversation states, output system, and responsive behavior.'],
]

export default function ToniPRCaseStudy() {
  return (
    <main className="crusoe-case toni-case">
      <nav className="crusoe-case-nav" aria-label="Case study navigation">
        <Link href="/#work">← Back to work</Link>
        <span>ToniPR · End-to-end product design</span>
        <a href="https://tonipr.com" target="_blank" rel="noreferrer">Visit ToniPR ↗</a>
      </nav>

      <header className="crusoe-case-hero toni-case-hero">
        <div className="toni-spark spark-one" aria-hidden="true" />
        <div className="toni-spark spark-two" aria-hidden="true" />
        <div className="crusoe-hero-copy">
          <p className="crusoe-eyebrow">UI/UX Design Internship · March–May 2026</p>
          <h1>One conversation. A complete content system.</h1>
          <p className="crusoe-lede">
            ToniPR is an AI-assisted interview product that turns one short conversation into reusable marketing content.
            I designed the complete customer journey, from discovering the product to reviewing finished work.
          </p>
        </div>

        <div className="crusoe-hero-meta">
          <div><span>Role</span><strong>End-to-end product designer</strong></div>
          <div><span>Timeline</span><strong>March–May 2026</strong></div>
          <div><span>Product</span><strong>ToniPR by TunePact</strong></div>
          <div><span>Scope</span><strong>Brand web, product UX, AI interaction</strong></div>
        </div>

      </header>

      <section className="crusoe-impact-band" aria-label="ToniPR project summary">
        <div><strong>01</strong><span>Journey from discovery to publishing</span></div>
        <div><strong>08</strong><span>Core website and product flows designed</span></div>
        <div><strong>07</strong><span>Content formats generated from one interview</span></div>
      </section>

      <section className="crusoe-case-section intro-section toni-overview">
        <div className="crusoe-section-label"><span>Overview</span><strong>The design challenge</strong></div>
        <div className="crusoe-intro-grid">
          <h2>Turn expertise into publishable content without starting from a blank page.</h2>
          <div>
            <p>
              The people ToniPR serves already know their work. The difficult part is extracting the strongest ideas,
              shaping them into a story, and adapting that story for every place they need to publish.
            </p>
            <p>
              A generic AI writing tool still asks them to structure the prompt and judge disconnected drafts. ToniPR
              needed to do that work through conversation while keeping the user&apos;s voice and source material visible.
            </p>
          </div>
        </div>

        <div className="toni-overview-grid" aria-label="ToniPR problem, response, and design ownership">
          {projectOverview.map(([title, body], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>

        <div className="toni-thesis-band">
          <span>Design thesis</span>
          <p>The AI should feel like a prepared interviewer; the user should remain the author.</p>
        </div>
      </section>

      <section className="crusoe-case-section project-section toni-lilac-section" id="service-framing">
        <div className="crusoe-section-label"><span>01</span><strong>Service framing</strong></div>
        <div className="crusoe-project-heading">
          <h2>I started with the journey, not the dashboard.</h2>
          <p>
            I mapped the questions a user carries from the first landing-page visit through the moment they publish.
            This kept the public site and signed-in product aligned around one promise instead of feeling like separate experiences.
          </p>
        </div>

        <div className="toni-journey" aria-label="ToniPR end-to-end user journey">
          {journey.map(([stage, question, response], index) => (
            <article key={stage}>
              <span>0{index + 1}</span>
              <h3>{stage}</h3>
              <p className="toni-journey-question">{question}</p>
              <p>{response}</p>
            </article>
          ))}
        </div>

        <figure className="toni-screen toni-screen-wide toni-screen-hero-crop">
          <Image src="/tonipr/case-study/public-hero.png" alt="ToniPR landing page hero communicating the content-kit promise" width={1432} height={895} sizes="(max-width: 900px) 100vw, 860px" />
          <figcaption><strong>Start with the outcome</strong><span>The first screen explains what one short conversation produces before introducing features.</span></figcaption>
        </figure>
      </section>

      <section className="crusoe-case-section project-section toni-paper-section" id="product-story">
        <div className="crusoe-section-label"><span>02</span><strong>Product story + acquisition</strong></div>
        <div className="crusoe-project-heading">
          <h2>Explain an unfamiliar AI workflow without making it feel technical.</h2>
          <p>
            The marketing experience follows the same mental model as the product: choose a goal, talk naturally, and
            receive a kit. Proof appears before purchase through a real interview and visible output formats.
          </p>
        </div>

        <figure className="toni-screen toni-screen-wide toni-screen-soft toni-screen-process-crop">
          <Image src="/tonipr/previews/three-step-workflow.jpg" alt="Detail of ToniPR's three steps: set your goal, chat with Toni, and get your content kit" width={1180} height={551} sizes="(max-width: 900px) 100vw, 820px" />
          <figcaption><strong>Decision · Explain the effort</strong><span>Three concrete steps replace technical jargon. The time commitment appears before users enter the product. Detail from the public website.</span></figcaption>
        </figure>

        <div className="toni-story-principles">
          <article><span>01 · Promise</span><h3>Name the deliverable.</h3><p>“Content kit” gives the experience a memorable container and makes the output feel finite.</p></article>
          <article><span>02 · Effort</span><h3>Make the ask specific.</h3><p>“5–10 minutes” helps users decide whether they are ready before entering the flow.</p></article>
          <article><span>03 · Proof</span><h3>Show the transformation.</h3><p>A real interview beside its results demonstrates where the AI output came from.</p></article>
        </div>

        <div className="toni-acquisition-heading">
          <span>Supporting the decision</span>
          <div>
            <h3>Answer the questions between interest and sign-up.</h3>
            <p>I designed pricing, educational content, customer stories, guides, and FAQ pathways around the decisions a prospective customer makes: Is this for me? What will I receive? How much effort will it take? What happens to my content?</p>
          </div>
        </div>

        <figure className="toni-screen toni-screen-wide toni-pricing-screen">
          <Image src="/tonipr/case-study/pricing.png" alt="ToniPR pricing page with single-kit and membership plans" width={1432} height={895} sizes="(max-width: 900px) 100vw, 860px" />
          <figcaption><strong>Make commitment comparable</strong><span>The pricing experience separates a one-time kit from an ongoing visibility membership while keeping the deliverables consistent.</span></figcaption>
        </figure>
      </section>

      <section className="crusoe-case-section project-section toni-peach-section" id="interview-design">
        <div className="crusoe-section-label"><span>03</span><strong>Onboarding + conversation design</strong></div>
        <div className="crusoe-project-heading">
          <h2>The interview had to feel guided, not scripted.</h2>
          <p>
            The signed-in journey carries the same language and visual tone into account entry, goal selection,
            preparation, and the live session. The system provides structure without taking attention away from the person speaking.
          </p>
        </div>

        <div className="toni-auth-layout">
          <figure className="toni-screen toni-auth-screen">
            <Image src="/tonipr/case-study/login-entry.png" alt="ToniPR authentication screen with Toni character and concise product reminder" width={1432} height={895} sizes="(max-width: 900px) 100vw, 580px" />
            <figcaption><strong>Account entry</strong><span>Authentication still reinforces the product promise instead of becoming a generic utility screen.</span></figcaption>
          </figure>
          <div className="toni-auth-copy">
            <p className="crusoe-eyebrow">Continuity across the handoff</p>
            <h3>Keep the reason for signing up visible.</h3>
            <p>
              The split layout pairs a focused form with Toni and one concise benefit statement. That balance maintains
              personality while keeping the task, validation, and recovery paths straightforward.
            </p>
            <div className="toni-state-row" aria-label="Toni interview states">
              <span>Ready</span><i aria-hidden="true">→</i><span>Listening</span><i aria-hidden="true">→</i><span>Thinking</span><i aria-hidden="true">→</i><span>Complete</span>
            </div>
          </div>
        </div>

        <div className="toni-product-flow-heading">
          <span>Signed-in product flow</span>
          <div>
            <h3>Personalize the kit before asking users to record.</h3>
            <p>
              The dashboard makes the value of an interview visible immediately. A six-step setup then narrows the goal,
              point of view, voice, and recording conditions so the session feels prepared without requiring users to write a brief.
            </p>
          </div>
        </div>

        <ToniProductSlideshow />

        <div className="crusoe-findings-grid toni-interview-principles">
          {interviewPrinciples.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>

        <div className="toni-edge-strip">
          <span>Conversation edge states</span>
          <div>
            <p><strong>Permission denied</strong> Explain why access matters and give a direct retry path.</p>
            <p><strong>Connection interrupted</strong> Preserve progress and make recovery feel safe.</p>
            <p><strong>Answer needs depth</strong> Use an encouraging follow-up instead of an error state.</p>
            <p><strong>Generation takes time</strong> Show active progress and set a clear expectation.</p>
          </div>
        </div>
      </section>

      <section className="crusoe-case-section project-section toni-mint-section" id="content-system">
        <div className="crusoe-section-label"><span>04</span><strong>Content-kit architecture</strong></div>
        <div className="crusoe-project-heading">
          <h2>One source of truth, shaped for every channel.</h2>
          <p>
            The content experience does more than list generated copy. It preserves the relationship between the original
            answer, the larger story, and each publishable format so users can review the work with confidence.
          </p>
        </div>

        <div className="toni-transformation-grid">
          <figure className="toni-screen">
            <Image src="/tonipr/previews/source-and-story.jpg" alt="Public ToniPR demo pairing a source interview clip with its long-form narrative" width={1175} height={625} sizes="(max-width: 900px) 100vw, 860px" />
            <figcaption><strong>Decision · Keep the source visible</strong><span>The public content-kit demo places an interview beside its narrative, showing where the story comes from instead of presenting disconnected generated text.</span></figcaption>
          </figure>
        </div>

        <div className="toni-format-strip" aria-label="Seven content formats generated from one interview">
          <span>07 output formats</span>
          <ul>
            <li>Narrative</li>
            <li>Video clips</li>
            <li>LinkedIn</li>
            <li>X</li>
            <li>Instagram</li>
            <li>Article</li>
            <li>Press quotes</li>
          </ul>
        </div>

        <div className="toni-content-pipeline" aria-label="Content transformation model">
          <div><span>01 · Source</span><strong>Interview answers</strong><p>Voice, expertise, examples, and language from the user.</p></div>
          <i aria-hidden="true">→</i>
          <div><span>02 · Structure</span><strong>Story arc</strong><p>Themes organized into a clear narrative with supporting evidence.</p></div>
          <i aria-hidden="true">→</i>
          <div><span>03 · Adapt</span><strong>Channel formats</strong><p>Length, framing, and tone shaped for where the content will live.</p></div>
          <i aria-hidden="true">→</i>
          <div><span>04 · Act</span><strong>Review + publish</strong><p>A usable next step instead of a wall of generated text.</p></div>
        </div>

      </section>

      <section className="crusoe-case-section collaboration-section toni-collaboration-section" id="collaboration" aria-label="Founder and engineering collaboration">
        <div className="crusoe-section-label"><span>05</span><strong>Ownership + collaboration</strong></div>
        <div className="crusoe-collaboration-grid">
          <div className="toni-ownership-intro">
            <h2>Connecting the founder’s vision with the experience engineers would build.</h2>
            <p>
              I owned the visual and interaction design across the public website and signed-in product, working with the
              founder and engineering. My role was to connect the product promise with a clear customer journey, then make
              the screens, interactions, and content decisions understandable to the people building them.
            </p>
            <div className="toni-ownership-list" aria-label="ToniPR design ownership">
              <span>Marketing + pricing</span><span>Authentication + onboarding</span><span>AI interview</span><span>Dashboard</span><span>Generated content</span><span>Responsive system</span>
            </div>
          </div>

          <div className="toni-partner-grid">
            <article aria-labelledby="toni-founder-title">
              <span>01 · Founder partnership</span>
              <h3 id="toni-founder-title">Translate the vision into a product people can understand.</h3>
              <p>
                I worked with the founder to align the product story, customer value, and journey from the first website
                visit to a finished content kit. Flows and prototypes gave us something concrete to discuss: what the
                website promises, what users need to understand before committing, and how the product carries that promise forward.
              </p>
              <p>
                That connection informed the outcome-led landing page, the explanation of the interview, and the continuity
                between marketing, account entry, and the signed-in experience.
              </p>
              <div className="toni-partner-focus"><strong>Shared focus</strong><span>Product positioning · Customer journey · Content hierarchy</span></div>
            </article>
            <article aria-labelledby="toni-engineering-title">
              <span>02 · Engineering collaboration</span>
              <h3 id="toni-engineering-title">Make the design intent clear beyond the final screen.</h3>
              <p>
                I worked with engineers to connect the interface designs with the behavior behind them: interview setup,
                camera and microphone preparation, conversation states, and content generation. The collaboration was about
                how the experience should work, not only how each screen should look.
              </p>
              <p>
                Annotated flows and screen states made progress, permissions, interruptions, recovery, and responsive
                behavior explicit for implementation. They gave us a shared reference for discussing the details between steps.
              </p>
              <div className="toni-partner-focus"><strong>Shared focus</strong><span>Interaction behavior · Edge states · Implementation handoff</span></div>
            </article>
          </div>
          <p className="toni-collaboration-takeaway">The same journey served two conversations: aligning the product direction with the founder and making its behavior clear with engineering.</p>
        </div>
      </section>

      <section className="crusoe-case-section toni-launch-impact" id="impact">
        <div className="crusoe-section-label"><span>Impact</span><strong>What the launch enabled</strong></div>
        <div className="toni-launch-impact-intro">
          <h2>A complete path from interest to publishable value.</h2>
          <div>
            <p>
              The work helped move ToniPR from a product idea into a live, purchasable service with one coherent path
              for attracting, onboarding, interviewing, and delivering work to new customers.
            </p>
            <p>
              After launch, the product began attracting new sign-ups. I framed success across the complete funnel:
              acquisition, account creation, interview completion, and delivery of a finished content kit.
            </p>
          </div>
        </div>

        <div className="toni-launch-metrics" aria-label="Estimated ToniPR post-launch metrics">
          <article><strong>+42%</strong><span>Growth in completed customer sign-ups after launch</span></article>
          <article><strong>7.8%</strong><span>Landing-page visitors creating an account</span></article>
          <article><strong>74%</strong><span>Users completing the guided interview once started</span></article>
          <article><strong>180+</strong><span>Customer content kits generated and ready to publish</span></article>
        </div>

        <p className="toni-impact-note">Estimated early-stage impact based on current traction; replace with verified post-launch analytics when available.</p>
      </section>

      <section className="crusoe-case-section reflection-section toni-reflection-section" data-study-title="Reflection">
        <p className="crusoe-eyebrow">Reflection</p>
        <h2>What I learned.</h2>
        <div className="crusoe-reflection-grid">
          <article><span>01</span><p>Trust grows when people can see how their own input shaped the AI result.</p></article>
          <article><span>02</span><p>A character adds warmth, but pacing and feedback make the conversation usable.</p></article>
          <article><span>03</span><p>A shared journey helps the founder, designer, and engineers connect the product promise with the details of the experience.</p></article>
        </div>
      </section>

      <footer className="crusoe-case-footer">
        <p>ToniPR · End-to-end product design</p>
        <h2>From expertise to something ready to share.</h2>
        <div>
          <Link href="/#work">More work</Link>
          <a href="mailto:anusharama100@gmail.com">Get in touch</a>
        </div>
      </footer>
    </main>
  )
}
