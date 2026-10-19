"use client"

import { Image } from '@/portfolio/compat'
import { useEffect, useRef, useState } from 'react'

const productSlides = [
  {
    src: '/tonipr/case-study/product-dashboard.png',
    title: 'Dashboard',
    description: 'The signed-in home base makes the next interview and every generated format immediately visible.',
    alt: 'ToniPR signed-in dashboard with interview credits, content formats, and a start interview action',
  },
  {
    src: '/tonipr/case-study/interview-focus.png',
    title: 'Interview direction',
    description: 'Goal-aware prompts help the user decide what this conversation should uncover before recording begins.',
    alt: 'ToniPR interview setup asking the user what the conversation should focus on',
  },
  {
    src: '/tonipr/case-study/interview-tone.png',
    title: 'Voice and tone',
    description: 'A short set of plain-language choices shapes the output without asking the user to write a prompt.',
    alt: 'ToniPR interview setup with professional, casual, story-driven, insightful, and inspirational tone choices',
  },
  {
    src: '/tonipr/case-study/camera-setup.png',
    title: 'Recording setup',
    description: 'Framing, microphone feedback, and clip-safe guidance prepare the user for a usable interview.',
    alt: 'ToniPR camera and microphone setup with a clip-safe framing guide',
  },
  {
    src: '/tonipr/case-study/content-kit.png',
    title: 'Finished content kit',
    description: 'Channel-ready outputs stay connected to the original conversation, ready to review, edit, and publish.',
    alt: 'ToniPR finished content kit showing interview clips and an editable long-form narrative',
  },
]

export default function ToniProductReel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const reelRef = useRef<HTMLElement>(null)
  const active = productSlides[activeSlide]

  useEffect(() => {
    const reel = reelRef.current
    if (!reel) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio >= .88),
      { threshold: [.25, .5, .75, .88, 1] },
    )

    observer.observe(reel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % productSlides.length)
    }, 4600)

    return () => window.clearInterval(interval)
  }, [isVisible])

  return (
    <figure ref={reelRef} className="toni-walkthrough toni-final-walkthrough toni-product-reel">
      <div className="toni-product-reel-viewport" aria-live="polite">
        {productSlides.map((slide, index) => (
          <div
            className={`toni-product-reel-frame${index === activeSlide ? ' is-active' : ''}`}
            key={slide.src}
            aria-hidden={index !== activeSlide}
          >
            <Image
              src={slide.src}
              alt={index === activeSlide ? slide.alt : ''}
              fill
              priority={index === 0}
              sizes="(max-width: 900px) 100vw, 1440px"
            />
          </div>
        ))}

        <div className="toni-product-reel-marker">
          <span>{String(activeSlide + 1).padStart(2, '0')}</span>
          <strong>{active.title}</strong>
        </div>
      </div>

      <figcaption className="toni-product-reel-caption">
        <div>
          <span>{active.title}</span>
          <small>{active.description}</small>
        </div>

        <div className="toni-product-reel-controls" aria-label="Choose a product screen">
          {productSlides.map((slide, index) => (
            <button
              type="button"
              className={index === activeSlide ? 'is-active' : ''}
              key={slide.title}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${slide.title}`}
              aria-pressed={index === activeSlide}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  )
}
