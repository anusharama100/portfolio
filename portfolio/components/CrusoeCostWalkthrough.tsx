"use client"

import { useRef, useState } from 'react'

export const costWalkthroughChapters = [
  {
    time: 0, label: 'Bill comparison', question: 'Did the bill change?',
    screen: 'The Billing overview shows current and previous totals, their dates, and a daily spend chart.',
    decision: 'I put the comparison and its date coverage together, before the product breakdown.',
    why: 'The customer can check what each amount covers before interpreting the difference. A partial month is not the same as a full month.',
  },
  {
    time: 1, label: 'Product charges', question: 'What makes up this product’s charge?',
    screen: 'Product cards break down spend by service. Opening one reveals deployments, GPU hours, hourly rates, and line-item costs.',
    decision: 'I kept the overview simple and made the pricing breakdown available on demand.',
    why: 'The customer can inspect how a product is charged without leaving Billing. This explains a charge—not yet why it changed over time.',
  },
  {
    time: 5, label: 'Usage totals', question: 'How much was actually used?',
    screen: 'The Usage view switches between input, output, and cached tokens—the units of text processed by the model.',
    decision: 'I reused the dated comparison and chart layout, but kept the selected usage unit visible.',
    why: 'The customer can compare consumption without mistaking token counts for dollars. Usage and price are separate parts of the explanation.',
  },
  {
    time: 9, label: 'Traffic & performance', question: 'How was the service performing?',
    screen: 'Analytics shows request traffic, processing volume, and response-time charts for a model.',
    decision: 'I added a path from the usage summary into operational detail instead of putting every metric on Billing.',
    why: 'The charts help the customer choose a time or pattern to inspect. They provide context; response time is not a dollar amount.',
  },
  {
    time: 13, label: 'Request logs', question: 'What happened in individual requests?',
    screen: 'The Event logs table lists individual requests with their model, token counts, status, and timing.',
    decision: 'I included request-level evidence so the investigation does not stop at an aggregate chart.',
    why: 'The customer can narrow the search to particular requests and inspect what ran, rather than guessing from a spike alone.',
  },
  {
    time: 17, label: 'Account activity', question: 'What changed in the account?',
    screen: 'The Activity log lists model updates and endpoint actions with their timestamps.',
    decision: 'I separated account changes from request logs: one shows what changed; the other shows what ran.',
    why: 'The customer gets another clue to investigate. A nearby update is not proof of the cause of a cost change.',
  },
] as const

export function costWalkthroughChapterAt(time: number) {
  return costWalkthroughChapters.reduce((active, chapter, index) => time >= chapter.time ? index : active, 0)
}

export default function CrusoeCostWalkthrough() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const pendingTime = useRef<number | null>(null)
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(false)
  const chapter = costWalkthroughChapters[active]

  function jumpTo(index: number) {
    const video = videoRef.current
    if (!video) return
    // A small offset avoids pausing on the preceding shot at an edit boundary.
    const time = costWalkthroughChapters[index].time + 0.08
    video.pause()
    setActive(index)
    if (video.readyState >= 1) video.currentTime = time
    else pendingTime.current = time
  }

  return (
    <figure className="crusoe-cost-walkthrough" data-design-version="after" aria-label="21-second usage-to-cost walkthrough">
      <header className="crusoe-cost-video-version">
        <span className="crusoe-cost-version-badge">After · Proposed redesign</span>
        <span>Six sample views · not one customer session</span>
      </header>
      <div className="crusoe-cost-walkthrough-media">
        {failed ? (
          <div className="crusoe-cost-walkthrough-fallback" role="status">
            <img src="/images/crusoe/usage-to-cost/story-screen-only/walkthrough-poster-trimmed.jpg" alt="Billing period comparison from the redesigned prototype" />
            <p>The video could not load. All six moments are shown as screenshots below.</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            aria-label="21-second edited usage-to-cost prototype highlights"
            controls
            playsInline
            width={1280}
            height={802}
            preload="metadata"
            poster="/images/crusoe/usage-to-cost/story-screen-only/walkthrough-poster-trimmed.jpg"
            onLoadedMetadata={() => {
              if (videoRef.current && pendingTime.current !== null) {
                videoRef.current.currentTime = pendingTime.current
                pendingTime.current = null
              }
            }}
            onTimeUpdate={event => setActive(costWalkthroughChapterAt(event.currentTarget.currentTime))}
            onError={() => setFailed(true)}
          >
            <source src="/crusoe/usage-cost-highlights-trimmed.mp4" type="video/mp4" onError={() => setFailed(true)} />
            <track kind="captions" src="/crusoe/usage-cost-highlights-trimmed.vtt" srcLang="en" label="English descriptions" />
            Your browser does not support video. Read the screenshot walkthrough below.
          </video>
        )}
      </div>
      <figcaption>
        <div className="crusoe-cost-edit-meta"><strong>A 21-second tour of the proposed design</strong><span>No autoplay</span></div>
        <p className="crusoe-cost-chapter-help">Select a timestamp to pause on that screen and read the explanation. Use the video’s play button to watch the full sequence.</p>
        <div className="crusoe-cost-chapters" role="group" aria-label="Walkthrough chapters">
          {costWalkthroughChapters.map((chapter, index) => (
            <button key={chapter.time} type="button" aria-label={`Show ${chapter.label} at 00:${String(chapter.time).padStart(2, '0')}`} aria-controls="crusoe-cost-moment-explanation" aria-pressed={active === index} disabled={failed} onClick={() => jumpTo(index)}>
              <span>00:{String(chapter.time).padStart(2, '0')}</span><strong>{chapter.label}</strong>
            </button>
          ))}
        </div>
        <section id="crusoe-cost-moment-explanation" className="crusoe-cost-current-chapter" aria-label="Explanation of the selected video moment">
          <p className="crusoe-cost-moment-number">00:{String(chapter.time).padStart(2, '0')} · Step {String(active + 1).padStart(2, '0')} of 06</p>
          <h4>{chapter.question}</h4>
          <dl className="crusoe-cost-moment-details">
            <div><dt>What you’re seeing</dt><dd>{chapter.screen}</dd></div>
            <div><dt>My design decision</dt><dd>{chapter.decision}</dd></div>
            <div><dt>Why it helps</dt><dd>{chapter.why}</dd></div>
          </dl>
        </section>
        <p className="crusoe-cost-evidence-note"><strong>What this demonstrates:</strong> a proposed path from a bill to the evidence a customer could inspect. These are edited prototype examples with different dates and sample data—not a before/after comparison, one continuous session, or proof of what caused an actual cost increase.</p>
      </figcaption>
    </figure>
  )
}
