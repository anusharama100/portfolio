"use client"

import { useState, type KeyboardEvent } from 'react'
import { Image } from '@/portfolio/compat'
import { ArrowLeft, ArrowRight } from './LandingIcons'

export const toniProductSlides = [
  {
    label: 'Dashboard', title: 'Make the next step clear',
    src: '/tonipr/previews/dashboard-overview.jpg', width: 1600, height: 707,
    alt: 'ToniPR dashboard detail showing interview credits, output formats, and the start interview action',
    detail: 'The main dashboard overview connects Start Interview with the formats it unlocks, so users see both the action and its value.',
  },
  {
    label: 'Focus', title: 'Focus the conversation',
    src: '/tonipr/previews/interview-direction.jpg', width: 1600, height: 950,
    alt: 'ToniPR interview setup asking the user to select a focus for the content',
    detail: 'Goal-aware choices replace a blank brief. One question, visible progress, and Back / Next controls keep the task bounded.',
  },
  {
    label: 'Voice', title: 'Make voice selectable',
    src: '/tonipr/previews/voice-selection.jpg', width: 1400, height: 870,
    alt: 'Detail of ToniPR’s voice question and five complete tone choices',
    detail: 'Named qualities and short descriptions help users express their tone without having to invent instructions for the AI.',
  },
  {
    label: 'Recording', title: 'Prepare before recording',
    src: '/tonipr/previews/recording-preparation.jpg', width: 1600, height: 1215,
    alt: 'ToniPR camera and microphone preparation screen with a clip-safe framing guide',
    detail: 'The clip-safe zone makes the future video crop visible. Camera selection and the microphone meter let users check their setup before the live session.',
  },
] as const

export default function ToniProductSlideshow() {
  const [active, setActive] = useState(0)
  const slide = toniProductSlides[active]
  const move = (direction: number) => setActive(current => (current + direction + toniProductSlides.length) % toniProductSlides.length)

  function handleKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -1 : 1)
  }

  return (
    <section className="toni-product-slideshow" role="region" aria-roledescription="carousel" aria-label="ToniPR interview setup slideshow" onKeyDown={handleKeys}>
      <div className="toni-product-slide-steps" role="group" aria-label="Choose a ToniPR product screen">
        {toniProductSlides.map((item, index) => (
          <button type="button" key={item.src} aria-label={`Show ToniPR ${item.label.toLowerCase()} screen`} aria-pressed={active === index} onClick={() => setActive(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
          </button>
        ))}
      </div>
      <figure className="toni-product-slide" role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${toniProductSlides.length}: ${slide.label}`}>
        <div className="toni-product-slide-stage">
          <Image src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} sizes="(max-width: 760px) 100vw, 980px" />
        </div>
        <figcaption>
          <div className="toni-product-slide-copy" aria-live="polite" aria-atomic="true">
            <h4>{slide.title}</h4>
            <p>{slide.detail}</p>
            <a href={slide.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${slide.alt}`}>Open full image <span aria-hidden="true">↗</span></a>
          </div>
          <div className="toni-product-slide-controls" role="group" aria-label="ToniPR product slideshow controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous ToniPR product screen"><ArrowLeft size={20} /></button>
            <span aria-label={`Image ${active + 1} of ${toniProductSlides.length}`}>{String(active + 1).padStart(2, '0')} / {String(toniProductSlides.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => move(1)} aria-label="Next ToniPR product screen"><ArrowRight size={20} /></button>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}
