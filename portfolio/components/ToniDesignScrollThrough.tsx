"use client"

import { useState } from 'react'

export const toniDesignGroups = [
  {
    id: 'landing',
    title: 'Landing page',
    description: 'Selected website sections, including stills of Toni’s scroll animation.',
    screens: [
      { title: 'Opening', src: '/tonipr/case-study/public-hero.png', width: 1432, height: 895, alt: 'ToniPR landing page introducing the content-kit promise and call to action' },
      { title: 'The customer problem', src: '/tonipr/previews/landing-problem.jpg', width: 1440, height: 700, alt: 'Toni thinking beside the landing-page explanation of the customer’s visibility problem' },
      { title: 'The interview solution', src: '/tonipr/previews/landing-solution.jpg', width: 1440, height: 700, alt: 'Toni presenting the guided interview solution in a still from the landing-page scroll animation' },
      { title: 'The finished content kit', src: '/tonipr/previews/landing-transformation.jpg', width: 1440, height: 700, alt: 'Toni giving a thumbs-up beside the content formats produced from one conversation' },
      { title: 'How it works', src: '/tonipr/previews/three-step-workflow.jpg', width: 1180, height: 551, alt: 'The three website steps: set your goal, chat with Toni, and get your content kit' },
    ],
  },
  {
    id: 'product',
    title: 'Product flow',
    description: 'From the dashboard through interview preparation, followed by a public example of the output.',
    screens: [
      { title: 'Dashboard', src: '/tonipr/previews/dashboard-overview.jpg', width: 1600, height: 707, alt: 'ToniPR dashboard showing interview credits, Start Interview, and available content formats' },
      { title: 'Interview direction', src: '/tonipr/previews/interview-direction.jpg', width: 1600, height: 950, alt: 'ToniPR interview setup asking the user to choose a focus for the conversation' },
      { title: 'Voice and tone', src: '/tonipr/previews/voice-selection.jpg', width: 1400, height: 870, alt: 'ToniPR voice question with five complete tone choices' },
      { title: 'Recording preparation', src: '/tonipr/previews/recording-preparation.jpg', width: 1600, height: 1215, alt: 'ToniPR camera and microphone preparation with a clip-safe framing guide' },
      { title: 'Public content-kit demo', src: '/tonipr/previews/source-and-story.jpg', width: 1175, height: 625, alt: 'Public ToniPR demo pairing a source interview clip with its long-form narrative' },
    ],
  },
] as const

export default function ToniDesignScrollThrough() {
  const [view, setView] = useState<'live' | 'landing' | 'product'>('live')
  const live = view === 'live'
  const group = toniDesignGroups[view === 'product' ? 1 : 0]

  return (
    <figure className="toni-design-scrollthrough" aria-label="ToniPR scroll-through design preview">
      <header className="toni-scroll-heading">
        <strong>Explore the design at your own pace.</strong>
        <p id="toni-scroll-help">{live
          ? 'Scroll inside the live website to see Toni’s animations. Switch to Product flow to explore the signed-in screens.'
          : 'Scroll inside the frame to explore the captured screens. You can also focus the frame and use the arrow keys.'}</p>
        <div className="toni-scroll-view-controls" role="group" aria-label="Choose a ToniPR preview">
          <button type="button" aria-pressed={view !== 'product'} aria-controls="toni-preview-content" onClick={() => setView('live')}><span>01</span> Landing page</button>
          <button type="button" aria-pressed={view === 'product'} aria-controls="toni-preview-content" onClick={() => setView('product')}><span>02</span> Product flow</button>
        </div>
      </header>
      <div id="toni-preview-content">
        {live ? (
          <div className="toni-live-site" role="region" aria-label="ToniPR live website preview" aria-describedby="toni-scroll-help">
            <iframe
              src="https://tonipr.com/"
              title="ToniPR live landing page with scroll animations"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
              allow="camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div key={view} className="toni-design-scroll" role="region" aria-label="ToniPR design screens" aria-describedby="toni-scroll-help" tabIndex={0}>
            <section className="toni-scroll-phase" key={group.id} aria-labelledby={`toni-scroll-${group.id}`}>
              <header className="toni-scroll-phase-heading">
                <h3 id={`toni-scroll-${group.id}`}><span>{view === 'product' ? '02' : '01'}</span> {group.title}</h3>
                <p>{group.description}</p>
              </header>
              <ol className="toni-scroll-screens" aria-label={`${group.title} captures`}>
                {group.screens.map((screen, index) => (
                  <li key={screen.src}>
                    <figure className="toni-scroll-screen">
                      <figcaption><span>{String(index + 1).padStart(2, '0')}</span> {screen.title}</figcaption>
                      <img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                    </figure>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        )}
      </div>
      <figcaption className="toni-scroll-note">
        <p>{live
          ? 'Live public website: scroll animations run inside this frame. The current site may change over time.'
          : 'Selected static captures in journey order, not a continuous full-page screenshot. Pictured controls are not interactive.'}</p>
        <div className="toni-scroll-preview-links">
          <a href="https://tonipr.com/" target="_blank" rel="noreferrer">Open ToniPR in a new tab ↗</a>
          {view !== 'product' && <button type="button" onClick={() => setView(live ? 'landing' : 'live')}>{live ? 'View captured version instead' : 'Return to live animations'}</button>}
        </div>
      </figcaption>
    </figure>
  )
}
