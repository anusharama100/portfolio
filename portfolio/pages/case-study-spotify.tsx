"use client"

import { useEffect, useState, useMemo, useRef } from 'react'
import { Link } from '@/portfolio/compat'
import { Image } from '@/portfolio/compat'
import CaseStudyNav from '@/portfolio/components/CaseStudyNav'
import EditorialCaseStudyCover from '@/portfolio/components/EditorialCaseStudyCover'
import ViewportVideo from '@/portfolio/components/ViewportVideo'

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const demoImages = [
  { src: '/spotify/spotify-1.png', label: 'Your Threads' },
  { src: '/spotify/spotify-2.png', label: 'Listening Memory' },
  { src: '/spotify/spotify-3.png', label: 'Emotional Clusters' },
  { src: '/spotify/spotify-4.png', label: 'Thread Card' },
  { src: '/spotify/spotify-5.png', label: 'Thread Detail' },
  { src: '/spotify/spotify-6.png', label: 'Now Playing Memory' },
]

const researchSessions = Array.from({ length: 6 }, (_, index) => ({
  src: `/spotify/research/session-${index + 1}.mp4`,
  label: `Session ${String(index + 1).padStart(2, '0')}`,
}))

export default function SpotifyCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showBackButton, setShowBackButton] = useState(true)
  const footerRef = useRef<HTMLElement>(null)

  // Check for mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Hide back button when footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBackButton(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const particles: Particle[] = useMemo(() => {
    const count = isMobile ? 15 : 60 // Reduce particles on mobile
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, [isMobile]);

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % demoImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + demoImages.length) % demoImages.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % demoImages.length)
  }

  return (
    <main className="case-study-vibe case-study-spotify relative min-h-screen bg-black text-white">
      {/* Floating particles - Spotify green */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              backgroundColor: particle.id % 3 === 0 ? '#1db954' : '#ffffff',
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <CaseStudyNav showBackButton={showBackButton} />

      <EditorialCaseStudyCover
        accent="mint"
        eyebrow="Spotify Threads · Music memory concept"
        headline="Rediscover music through the life around it."
        description="I reimagined music discovery around mood, memory, and the personal context attached to what people play, not another feed of disconnected recommendations."
        meta={[
          ['Role', 'UX Designer'],
          ['Timeline', '2 weeks'],
          ['Platform', 'Mobile · iOS'],
          ['Focus', 'Listening memory and meaningful discovery'],
        ]}
      />

      <section className="spotify-single-device" aria-label="Spotify Threads prototype preview">
        <div className="spotify-single-device-inner">
          <div className="spotify-single-device-copy">
            <p>Final interaction</p>
            <h2>One clean view of the listening experience.</h2>
            <span>
              The prototype keeps the phone upright and lets the interface carry the story. No extra frames, overlap, or decorative device clutter.
            </span>
          </div>
          <div className="spotify-single-device-media">
            <ViewportVideo
              sources={[{ src: '/spotify/spotify-phone-prototype.webm', type: 'video/webm' }]}
              ariaLabel="Spotify Threads interactive phone prototype"
              poster="/spotify/spotify-1.png"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section id="case-study-detail" hidden aria-hidden="true" className="relative min-h-screen flex items-center px-4 md:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Title and info */}
            <div>
              <p className={`text-[#1db954] text-sm tracking-[0.3em] uppercase mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Case Study
              </p>

              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Spotify Redesign
              </h1>

              <p className={`text-lg md:text-xl text-white/50 mb-10 leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Reimagining music discovery through intention, memory, and personal meaning.
              </p>

              {/* Project Meta */}
              <div className={`grid grid-cols-2 gap-x-8 gap-y-4 text-sm transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Role</p>
                  <p className="text-white/80">UX Designer</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-white/80">2 weeks</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Tools</p>
                  <p className="text-white/80">Figma, Cursor, Lovable</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Platform</p>
                  <p className="text-white/80">Mobile (iOS)</p>
                </div>
              </div>
            </div>

            {/* Right side - Phone Mockup (Static) */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative max-w-[280px] mx-auto">
                {/* Phone Frame */}
                <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />

                  {/* Screen - Static first image */}
                  <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-[#121212]">
                        <Image
                      src={demoImages[0].src}
                      alt={demoImages[0].label}
                          fill
                          className="object-cover object-top"
                          sizes="280px"
                      priority
                    />
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gradient-to-t from-[#1db954]/20 via-transparent to-transparent rounded-3xl blur-2xl -z-10" />
              </div>

              {/* Static label */}
              <p className="text-center text-white/40 text-sm mt-6">{demoImages[0].label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section id="case-study-content">
        <SectionLabel>01</SectionLabel>
        <SectionTitle>Overview</SectionTitle>
        <div className="max-w-3xl">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-8">
            Spotify helps you find more music. But what if it helped you understand why you listen?
          </p>
          <p className="text-lg text-white/50 leading-relaxed mb-12">
            I noticed a pattern in my own listening: saved songs became forgotten archives, recommendations felt random, and music turned into background noise. This <strong className="text-white/70">concept redesign</strong> explores what Spotify could look like if it prioritized <strong className="text-white/70">meaningful listening</strong> over infinite discovery. I introduced a concept called <span className="text-[#1db954] font-medium">Listening Threads</span>: finite, <strong className="text-white/70">behavior-driven collections</strong> that explain why they exist and help you rediscover music that matters.
          </p>

          {/* Problem Statement Box */}
          <div
            className="study-callout relative rounded-3xl p-10 md:p-14"
            style={{
              background: 'linear-gradient(145deg, rgba(29,185,84,0.12) 0%, rgba(29,185,84,0.04) 100%)',
              boxShadow: `
                0 4px 24px -4px rgba(0,0,0,0.4),
                0 12px 48px -8px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 -1px 0 rgba(0,0,0,0.2)
              `,
              border: '1px solid rgba(29,185,84,0.2)',
            }}
          >
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Problem Statement</p>

            <p className="text-xl md:text-2xl lg:text-[1.7rem] text-white/90 leading-relaxed font-light">
              How might we transform music streaming from{' '}
              <span className="text-[#1db954]">passive consumption</span> into{' '}
              <span className="text-[#1db954]">active reflection</span>,{' '}
              helping listeners understand their emotional relationship with music while still enabling{' '}
              <span className="text-[#1db954]">effortless discovery</span>?
            </p>
          </div>
        </div>
      </Section>

      {/* Design Process Timeline */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Design Process</SectionTitle>
        <p className="text-white/40 text-sm mb-12">2-Week Sprint</p>

        <div className="relative max-w-5xl">
          {/* Week labels */}
          <div className="grid grid-cols-4 mb-8">
            {['Week 1', '', 'Week 2', ''].map((week, i) => (
              <div key={i} className="text-center">
                <span className="text-white/50 text-sm">{week}</span>
              </div>
            ))}
          </div>

          {/* Timeline with dotted lines */}
          <div className="relative">
            {/* Vertical dotted lines */}
            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex justify-center">
                  <div
                    className="w-px h-full"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, rgba(29,185,84,0.3) 50%, transparent 50%)',
                      backgroundSize: '1px 8px',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Timeline bars */}
            <div className="relative space-y-4 py-4">
              {/* User Research */}
              <div className="grid grid-cols-8">
                <div className="col-span-1 pr-1">
                  <div
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Research
                  </div>
                </div>
              </div>

              {/* Ideation */}
              <div className="grid grid-cols-8">
                <div className="col-start-1 col-span-2 px-1">
                  <div
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Ideation & Sketches
                  </div>
                </div>
              </div>

              {/* Lo-Fi Wireframes */}
              <div className="grid grid-cols-8">
                <div className="col-start-2 col-span-2 px-1">
                  <div
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Lo-Fi Wireframes
                  </div>
                </div>
              </div>

              {/* Mid-Fi Prototypes */}
              <div className="grid grid-cols-8">
                <div className="col-start-3 col-span-2 px-1">
                  <div
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Mid-Fi Prototypes
                  </div>
                </div>
              </div>

              {/* Hi-Fi Design */}
              <div className="grid grid-cols-8">
                <div className="col-start-4 col-span-3 px-1">
                  <div
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Hi-Fi Design & Iteration
                  </div>
                </div>
              </div>

              {/* Usability Testing */}
              <div className="grid grid-cols-8">
                <div className="col-start-6 col-span-2 px-1">
                  <div
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Usability Testing
                  </div>
                </div>
              </div>

              {/* Final Polish */}
              <div className="grid grid-cols-8">
                <div className="col-start-7 col-span-2 px-1">
                  <div
                    className="rounded-full py-3 px-3 text-center text-xs text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.3) 0%, rgba(29,185,84,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(29,185,84,0.2)',
                    }}
                  >
                    Polish
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Research Section */}
      <Section>
        <SectionLabel>03</SectionLabel>
        <SectionTitle>Research</SectionTitle>

        <div className="max-w-3xl mb-16">
          <h3 className="text-xl md:text-2xl font-semibold text-[#1db954] mb-6">Research Goals</h3>
          <p className="text-lg text-white/60 leading-relaxed">
            I wanted to understand how people actually feel about their relationship with music streaming. Not just what features they want, but <strong className="text-white/80">how streaming has changed the way they listen, remember, and connect</strong> with music.
          </p>
        </div>

        <div className="mb-20 overflow-hidden rounded-[2rem] border border-[#1db954]/20 bg-gradient-to-br from-[#1db954]/[0.09] via-white/[0.025] to-transparent p-6 md:p-10">
          <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#1db954]">Research framework</p>
              <h3 className="text-2xl font-semibold text-white/90 md:text-3xl">Three questions shaped the concept.</h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">
              The goal was to understand where music loses meaning between discovery, saving, and returning.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Return',
                question: 'What makes someone revisit a song after saving it?',
                focus: 'Saved-library behavior',
              },
              {
                number: '02',
                title: 'Context',
                question: 'What makes a recommendation feel personally relevant?',
                focus: 'Trust and explanation',
              },
              {
                number: '03',
                title: 'Intention',
                question: 'When does listening feel active instead of automatic?',
                focus: 'Mood and motivation',
              },
            ].map((item) => (
              <article key={item.number} className="flex min-h-56 flex-col bg-[#080a09] p-6 md:p-7">
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#1db954]">{item.number}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-white/35">{item.focus}</span>
                </div>
                <h4 className="mb-3 text-lg font-medium text-white/85">{item.title}</h4>
                <p className="mt-auto text-sm leading-relaxed text-white/50">{item.question}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="mb-20" aria-labelledby="spotify-research-sessions-title">
          <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/30">Recorded interviews</p>
              <h3 id="spotify-research-sessions-title" className="text-xl font-semibold text-[#1db954] md:text-2xl">Six conversations behind the concept</h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/45">The original research sessions show how everyday listening habits, memories, and frustrations informed the final direction.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {researchSessions.map((session) => (
              <figure key={session.src} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-2">
                <video
                  className="aspect-video w-full rounded-xl bg-[#101010] object-contain"
                  src={session.src}
                  controls
                  loop
                  playsInline
                  preload="metadata"
                />
                <figcaption className="flex items-center justify-between px-2 pb-1 pt-3 text-xs">
                  <span className="font-medium text-white/70">{session.label}</span>
                  <span className="text-white/30">Spotify Threads</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* User Surveys */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-white/30">Survey synthesis</p>
            <h3 className="text-xl font-semibold text-[#1db954] md:text-2xl">What listeners told me</h3>
          </div>
          <p className="w-fit rounded-full border border-white/10 px-4 py-2 text-xs text-white/45">24 Spotify users</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Listening Habits */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Listening Habits</h4>
            <div className="space-y-4">
              {[
                { label: 'Background listening', value: 72, color: '#1db954' },
                { label: 'Active discovery', value: 45, color: '#1ed760' },
                { label: 'Nostalgic replay', value: 38, color: '#2de26d' },
                { label: 'Mood-based', value: 62, color: '#4ade80' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-32 shrink-0">{item.label}</span>
                  <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-white/50 text-xs w-10 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              Most listening is passive, but users crave more intentional moments.
            </p>
          </div>

          {/* Pain Points */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Pain Points</h4>
            <div className="space-y-3">
              {[
                { label: 'Forgotten saves', value: 78, color: '#1db954' },
                { label: 'Opaque recs', value: 65, color: '#1ed760' },
                { label: 'Choice overload', value: 54, color: '#2de26d' },
                { label: 'Lost context', value: 48, color: '#4ade80' },
                { label: 'No memory', value: 42, color: '#86efac' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-28 shrink-0">{item.label}</span>
                  <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-white/50 text-xs w-8 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              Saved songs become forgotten. Users don't know why songs are recommended.
            </p>
          </div>

          {/* What Users Want */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Desired Features</h4>
            <div className="flex items-center gap-6">
              {/* Pie Chart */}
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Memory/Context 35% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#1db954"
                    strokeWidth="20"
                    strokeDasharray="87.9 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Better Recs 28% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#1ed760"
                    strokeWidth="20"
                    strokeDasharray="70.3 251.2"
                    strokeDashoffset="-87.9"
                  />
                  {/* Rediscovery 22% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#4ade80"
                    strokeWidth="20"
                    strokeDasharray="55.3 251.2"
                    strokeDashoffset="-158.2"
                  />
                  {/* Other 15% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#86efac"
                    strokeWidth="20"
                    strokeDasharray="37.7 251.2"
                    strokeDashoffset="-213.5"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {[
                  { label: 'Context', value: '35%', color: '#1db954' },
                  { label: 'Better Recs', value: '28%', color: '#1ed760' },
                  { label: 'Rediscovery', value: '22%', color: '#4ade80' },
                  { label: 'Other', value: '15%', color: '#86efac' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white/50 text-xs">{item.label}</span>
                    <span className="text-white/40 text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-white/30 text-xs mt-4 leading-relaxed">
              Users want to know why they listen, not just what to play.
            </p>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="max-w-3xl mt-16 pt-12 border-t border-white/10">
          <h4 className="text-[#1db954] text-lg font-medium mb-4">Key Takeaways</h4>
          <div className="space-y-4 text-white/50 leading-relaxed">
            <p>
              <span className="text-white/70 font-medium">Music has become wallpaper.</span>{' '}
              72% of listening is background noise. Users rarely engage actively with what's playing, missing the emotional connection music once provided.
            </p>
            <p>
              <span className="text-white/70 font-medium">Saved songs disappear.</span>{' '}
              78% said they forget songs they've saved. Spotify's library becomes a graveyard of good intentions rather than a living collection.
            </p>
            <p>
              <span className="text-white/70 font-medium">Recommendations feel random.</span>{' '}
              Users trust the algorithm but don't understand it. They want to know why a song was suggested, not just that it was.
            </p>
          </div>
        </div>

        {/* Affinity Mapping */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-xl md:text-2xl font-semibold text-[#1db954] mb-2">Affinity Mapping</h3>
          <p className="text-white/40 text-sm mb-6">Synthesizing Research Insights</p>

          <p className="text-white/50 leading-relaxed max-w-3xl mb-8">
            I organized the survey responses into an affinity map. Three themes emerged around how listeners want to reconnect with their music:
          </p>

          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Memory & Context:</span> Users want to remember why they saved songs and what moments they associate with them.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Intentional Listening:</span> Moving beyond passive background noise to meaningful musical experiences.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Personal Connection:</span> Understanding and organizing music by emotion, not just genre or artist.
            </p>
          </div>

          {/* Affinity Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Memory & Context Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#1db954] mb-8 text-center">Memory & Context</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fcd5d7',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Saves songs impulsively but rarely returns to them weeks later.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#d4edda',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants to remember where they first heard a song or why it mattered.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"I have 2000 liked songs and can't remember why I saved half of them."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">No way to attach memories or notes to songs in the current app.</p>
                </div>
                {/* UX Principle - Blue */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#d6eaff',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Context creates meaning. Songs with stories are songs that stick.</p>
                </div>
                {/* Opportunity - Orange */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#ffe5d0',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Listening Memory feature that captures when, where, and how often songs are played.</p>
                </div>
              </div>
            </div>

            {/* Intentional Listening Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#1db954] mb-8 text-center">Intentional Listening</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fcd5d7',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Defaults to playlists on shuffle while working or commuting.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#d4edda',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants dedicated time to actually listen and discover, not just have music on.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"I used to sit and listen to albums. Now music just plays in the background."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Choice overload makes it easier to just hit shuffle than pick something.</p>
                </div>
                {/* UX Principle - Blue */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#d6eaff',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Reduce friction to intentional moments. Make "listening" a distinct mode.</p>
                </div>
                {/* Opportunity - Orange */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#ffe5d0',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Curated "Threads" that guide listening experiences with narrative structure.</p>
                </div>
              </div>
            </div>

            {/* Personal Connection Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#1db954] mb-8 text-center">Personal Connection</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fcd5d7',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Creates playlists by mood or activity but struggles to organize them.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#d4edda',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants music organized by how it makes them feel, not alphabetically.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"Spotify knows my taste but doesn't know my feelings."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fff9e6',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Genre labels don't capture the emotional nuance of personal music taste.</p>
                </div>
                {/* UX Principle - Blue */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#d6eaff',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Emotional organization resonates more than categorical sorting.</p>
                </div>
                {/* Opportunity - Orange */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#ffe5d0',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Emotional Clusters that group songs by feeling with visual mood indicators.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Synthesis */}
          <div className="max-w-3xl mt-12">
            <h4 className="text-[#1db954] text-lg font-medium mb-4">Key Insight</h4>
            <p className="text-white/50 leading-relaxed mb-4">
              The research converged on one insight: <strong className="text-white/70">users have lost their personal relationship with music</strong>. Streaming made access effortless but stripped away the context, intention, and emotional connection that made listening meaningful.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/70 font-medium">The opportunity:</span> Transform Spotify from a music player into a <strong className="text-white/70">music memory system</strong> that helps users rediscover not just songs, but the feelings and moments attached to them.
            </p>
          </div>
        </div>
      </Section>

      {/* Before & After */}
      <Section>
        <SectionLabel>04</SectionLabel>
        <SectionTitle>Before & After</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Spotify's current discovery relies on algorithmic carousels that often feel impersonal. My redesign shifts the focus from <strong className="text-white/70">"what to play"</strong> to <strong className="text-white/70">"why you listen."</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {/* Before */}
          <div className="group">
            <div className="relative rounded-2xl overflow-hidden border border-red-500/20 bg-gradient-to-br from-red-500/[0.08] to-transparent p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-lg">✕</span>
                </div>
                <p className="text-red-400 text-sm font-semibold uppercase tracking-wider">Current Experience</p>
              </div>
              <ul className="space-y-4 text-white/50 text-sm">
                <li className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02]">
                  <span className="text-red-400/80 mt-0.5 text-lg">•</span>
                  <span>Endless carousels with no context on why songs are recommended</span>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02]">
                  <span className="text-red-400/80 mt-0.5 text-lg">•</span>
                  <span>Saved songs become forgotten in a growing library</span>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02]">
                  <span className="text-red-400/80 mt-0.5 text-lg">•</span>
                  <span>No way to attach memories or meaning to music</span>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02]">
                  <span className="text-red-400/80 mt-0.5 text-lg">•</span>
                  <span>Passive listening with little intentional engagement</span>
                </li>
              </ul>
            </div>
          </div>

          {/* After */}
          <div className="group">
            <div className="relative rounded-2xl overflow-hidden border border-[#1db954]/30 bg-gradient-to-br from-[#1db954]/[0.12] to-transparent p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#1db954]/20 flex items-center justify-center">
                  <span className="text-[#1db954] text-lg">✓</span>
                </div>
                <p className="text-[#1db954] text-sm font-semibold uppercase tracking-wider">Redesigned Experience</p>
              </div>
              <ul className="space-y-4 text-white/60 text-sm">
                <li className="flex items-start gap-4 p-3 rounded-lg bg-[#1db954]/[0.05] border border-[#1db954]/10">
                  <span className="text-[#1db954] mt-0.5 text-lg">→</span>
                  <span><strong className="text-white/90">Listening Memory</strong> shows when, where, and how often you play songs</span>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg bg-[#1db954]/[0.05] border border-[#1db954]/10">
                  <span className="text-[#1db954] mt-0.5 text-lg">→</span>
                  <span><strong className="text-white/90">Threads</strong> are curated collections that explain why each song matters</span>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg bg-[#1db954]/[0.05] border border-[#1db954]/10">
                  <span className="text-[#1db954] mt-0.5 text-lg">→</span>
                  <span><strong className="text-white/90">Emotional Clusters</strong> organize music by feeling, not just genre</span>
                </li>
                <li className="flex items-start gap-4 p-3 rounded-lg bg-[#1db954]/[0.05] border border-[#1db954]/10">
                  <span className="text-[#1db954] mt-0.5 text-lg">→</span>
                  <span>Intentional listening modes that bring back <strong className="text-white/90">active engagement</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Design Decision */}
        <div className="mt-12 p-8 rounded-2xl bg-white/[0.02] border border-white/10 max-w-3xl">
          <p className="text-[#1db954] text-xs font-semibold uppercase tracking-widest mb-4">Key Design Decision</p>
          <p className="text-white/70 text-lg leading-relaxed">
            I chose <strong className="text-white font-semibold">"Threads" over traditional playlists</strong> because user research showed people wanted narrative context, not just song collections. Threads tell a story about why songs belong together.
          </p>
        </div>
      </Section>

      {/* User Flows */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>User Flows</SectionTitle>
        <p className="text-white/40 text-sm mb-10">Core journeys through the redesigned experience</p>

        <div className="space-y-4">
          {/* Browse Threads Flow */}
          <div
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{
              background: 'linear-gradient(145deg, rgba(29,185,84,0.06) 0%, rgba(29,185,84,0.02) 100%)',
            }}
          >
            <p className="text-[#1db954] text-sm font-medium mb-5 tracking-wide">Browse & Play Threads</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#15803d] text-white">Home</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Your Threads</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Thread Card</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Thread Detail</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#fbbf24] text-white">Play</span>
            </div>
        </div>

          {/* Listening Memory Flow */}
          <div
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{
              background: 'linear-gradient(145deg, rgba(29,185,84,0.06) 0%, rgba(29,185,84,0.02) 100%)',
            }}
          >
            <p className="text-[#1db954] text-sm font-medium mb-5 tracking-wide">Explore Listening Memory</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#15803d] text-white">Home</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Memory Tab</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Emotional Clusters</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Weekly Patterns</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#fbbf24] text-white">Play Cluster</span>
          </div>
          </div>

          {/* Now Playing Context Flow */}
          <div
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{
              background: 'linear-gradient(145deg, rgba(29,185,84,0.06) 0%, rgba(29,185,84,0.02) 100%)',
            }}
          >
            <p className="text-[#1db954] text-sm font-medium mb-5 tracking-wide">Contextual Now Playing</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#15803d] text-white">Now Playing</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Memory Insight</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Related Tracks</span>
              <span className="text-white/30 text-sm">→</span>
              <div className="flex flex-col gap-1.5">
                <span className="px-3 py-1.5 rounded-md text-[11px] bg-[#a3a3a3] text-white border border-white/10">Add to Thread</span>
                <span className="px-3 py-1.5 rounded-md text-[11px] bg-[#a3a3a3] text-white border border-white/10">View Full Memory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#15803d]"></span>
            <span className="text-white/50">Entry Point</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-lg bg-[#06b6d4]"></span>
            <span className="text-white/50">Screen</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#fbbf24]"></span>
            <span className="text-white/50">Action</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-lg bg-[#a3a3a3]"></span>
            <span className="text-white/50">Option</span>
          </div>
        </div>

        <div className="max-w-3xl mt-12">
          <p className="text-white/50 leading-relaxed">
            Each flow prioritizes understanding over action. Users always know why they're seeing something before deciding whether to engage with it.
          </p>
        </div>
      </Section>

      {/* Lo-Fi Designs */}
      <Section>
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Lo-Fi Wireframes</SectionTitle>
        <p className="text-white/40 text-sm mb-6">Early Explorations</p>

        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          I started sketching user flows around three core concepts: <span className="text-white/70">Browsing Threads</span>, <span className="text-white/70">Exploring Memory</span>, and <span className="text-white/70">Contextual Playback</span>. These quick wireframes helped map out the experience before moving to higher fidelity.
        </p>

        {/* Lo-Fi Wireframe Flows - Hand-drawn Sketches */}
        <div className="rounded-xl overflow-hidden">
          <Image
            src="/spotify/spotify-lofi-wireframes.png"
            alt="Hand-drawn lo-fi wireframe sketches showing Spotify redesign user flows"
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>

        <p className="text-white/50 text-sm leading-relaxed max-w-2xl mt-6">
          Quick sketches mapping out the core flows: browsing threads, exploring memory clusters, selecting listening intent, and contextual playback. These helped test layout ideas before moving to higher fidelity.
        </p>
      </Section>

      {/* Mid-Fi Prototypes */}
      <Section>
        <SectionLabel>07</SectionLabel>
        <SectionTitle>Mid-Fidelity Prototypes</SectionTitle>
        <p className="text-white/40 text-sm mb-6">Refining the Experience</p>

        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Moving from sketches to Figma wireframes, I focused on information hierarchy, component structure, and establishing the visual system that would carry into hi-fi designs.
        </p>

        {/* Figma-style wireframe export */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Header bar - mimics Figma frame */}
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <p className="text-white/70 text-sm font-medium tracking-wide">Core Screens Overview</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <span className="text-white/30 text-xs">Figma Export</span>
            </div>
          </div>

          {/* Main content area */}
          <div className="p-4 md:p-10 overflow-x-auto scrollbar-hide">
            <div className="flex items-start gap-4 md:gap-6 min-w-[900px]">

              {/* Screen 1: Your Threads */}
              <div className="flex flex-col items-center">
                <p className="text-[#1db954] text-xs font-medium mb-3 tracking-wide">Your Threads</p>
                <div className="relative">
                  {/* Phone frame */}
                  <div className="w-[140px] bg-[#1a1a1a] rounded-[20px] p-2 border border-white/10">
                    <div className="bg-[#121212] rounded-[14px] overflow-hidden">
                      {/* Status bar */}
                      <div className="h-5 bg-[#121212] flex items-center justify-center">
                        <div className="w-16 h-[3px] bg-black rounded-full"></div>
                      </div>
                      {/* Content */}
                      <div className="p-2 space-y-2">
                        <p className="text-white text-[8px] font-semibold">Your Threads</p>
                        <p className="text-white/40 text-[5px]">Based on how you listen</p>

                        {/* Thread cards */}
                        {[
                          { name: 'Late Night Focus', songs: '12 songs', color: '#1db954', tag: 'When you need to focus' },
                          { name: 'Morning Energy', songs: '8 songs', color: '#f59e0b', tag: 'Upbeat start to day' },
                          { name: 'Chill Vibes', songs: '15 songs', color: '#a78bfa', tag: 'Relaxing evenings' },
                        ].map((thread, i) => (
                          <div key={i} className="bg-[#1a1a1a] rounded-lg p-1.5 flex gap-1.5">
                            <div className="w-8 h-8 rounded bg-[#282828] flex items-center justify-center">
                              <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: thread.color, opacity: 0.4 }}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-[6px] font-medium truncate">{thread.name}</p>
                              <p className="text-white/40 text-[4px]">{thread.songs}</p>
                              <div className="mt-0.5 px-1 py-0.5 rounded-full text-[4px] inline-block" style={{ backgroundColor: `${thread.color}15`, color: thread.color, border: `0.5px solid ${thread.color}30` }}>
                                {thread.tag}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Nav bar */}
                      <div className="h-6 bg-[#1a1a1a] flex items-center justify-center gap-6 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1db954]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center self-center mt-6">
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                  <path d="M0 6H28M28 6L23 1M28 6L23 11" stroke="#1db954" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Screen 2: Thread Detail */}
              <div className="flex flex-col items-center">
                <p className="text-[#1db954] text-xs font-medium mb-3 tracking-wide">Thread Detail</p>
                <div className="relative">
                  <div className="w-[140px] bg-[#1a1a1a] rounded-[20px] p-2 border border-white/10">
                    <div className="bg-[#121212] rounded-[14px] overflow-hidden">
                      <div className="h-5 bg-[#121212] flex items-center justify-center">
                        <div className="w-16 h-[3px] bg-black rounded-full"></div>
                      </div>
                      <div className="p-2 space-y-2">
                        <div className="flex items-center gap-1">
                          <span className="text-white/40 text-[6px]">←</span>
                          <p className="text-white text-[7px] font-medium">Late Night Focus</p>
                        </div>

                        {/* Hero card */}
                        <div className="bg-[#1a1a1a] rounded-lg p-2 flex items-center gap-2">
                          <div className="w-10 h-10 rounded bg-[#282828] flex items-center justify-center shrink-0">
                            <div className="w-6 h-4 rounded-sm bg-[#1db954]/30"></div>
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-[6px] font-semibold">Late Night Focus</p>
                            <p className="text-white/40 text-[4px]">12 songs · 45 min</p>
                          </div>
                          <div className="w-5 h-5 rounded-full bg-[#1db954] flex items-center justify-center shrink-0">
                            <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-black ml-0.5"></div>
                          </div>
                        </div>

                        {/* Why section */}
                        <div className="bg-[#0d1f0d] border border-[#1db954]/20 rounded p-1.5">
                          <p className="text-[#1db954] text-[4px] font-semibold">WHY THIS EXISTS</p>
                          <p className="text-white/50 text-[4px]">Songs you return to when you need deep focus</p>
                        </div>

                        {/* Track list */}
                        {['Midnight City', 'Intro', 'Electric Feel'].map((track, i) => (
                          <div key={i} className="bg-[#1a1a1a] rounded p-1.5 flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-[#282828]"></div>
                            <div>
                              <p className="text-white text-[5px]">{track}</p>
                              <p className="text-white/40 text-[4px]">{['M83', 'The xx', 'MGMT'][i]}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="h-6 bg-[#1a1a1a] flex items-center justify-center gap-6 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1db954]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center self-center mt-6">
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                  <path d="M0 6H28M28 6L23 1M28 6L23 11" stroke="#1db954" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Screen 3: Listening Memory */}
              <div className="flex flex-col items-center">
                <p className="text-[#1db954] text-xs font-medium mb-3 tracking-wide">Listening Memory</p>
                <div className="relative">
                  <div className="w-[140px] bg-[#1a1a1a] rounded-[20px] p-2 border border-white/10">
                    <div className="bg-[#121212] rounded-[14px] overflow-hidden">
                      <div className="h-5 bg-[#121212] flex items-center justify-center">
                        <div className="w-16 h-[3px] bg-black rounded-full"></div>
                      </div>
                      <div className="p-2 space-y-2">
                        <p className="text-white text-[8px] font-semibold">Your Memory</p>
                        <p className="text-white/40 text-[5px]">How music fits your life</p>

                        {/* Toggle */}
                        <div className="flex bg-[#282828] rounded-full p-0.5">
                          <span className="text-[4px] text-white/40 px-2 py-0.5">Week</span>
                          <span className="text-[4px] text-black bg-white rounded-full px-2 py-0.5 font-medium">Month</span>
                          <span className="text-[4px] text-white/40 px-2 py-0.5">Year</span>
                        </div>

                        {/* Insight card */}
                        <div className="bg-[#1a1a1a] rounded-lg p-2">
                          <p className="text-white/40 text-[4px]">THIS MONTH</p>
                          <p className="text-white text-[6px] font-medium">Deep Focus increased 40%</p>
                          <p className="text-white/40 text-[4px]">More ambient music than usual</p>
                        </div>

                        {/* Graph */}
                        <div className="bg-[#1a1a1a] rounded-lg p-2">
                          <p className="text-white/40 text-[4px] mb-2">HOW YOU'VE BEEN LISTENING</p>
                          <svg viewBox="0 0 100 40" className="w-full h-8">
                            <path d="M5 30 Q20 22, 35 28 Q55 15, 75 20 Q90 12, 95 16" stroke="#8b5cf6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                            <path d="M5 32 Q25 28, 40 35 Q60 22, 85 30 Q92 26, 95 28" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                            <path d="M5 35 Q30 32, 45 36 Q70 28, 88 34 Q93 32, 95 33" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                          </svg>
                        </div>

                        {/* Clusters */}
                        <div className="bg-[#1a1a1a] rounded-lg p-2">
                          <p className="text-white/40 text-[4px] mb-1">YOUR EMOTIONAL CLUSTERS</p>
                          <div className="flex flex-wrap gap-1">
                            <div className="flex items-center gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]"></div>
                              <span className="text-white text-[4px]">Deep Focus</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></div>
                              <span className="text-white text-[4px]">Night Drives</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></div>
                              <span className="text-white text-[4px]">Morning Energy</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-6 bg-[#1a1a1a] flex items-center justify-center gap-6 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1db954]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow 3 */}
              <div className="flex items-center self-center mt-6">
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                  <path d="M0 6H28M28 6L23 1M28 6L23 11" stroke="#1db954" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Screen 4: Intent Selector */}
              <div className="flex flex-col items-center">
                <p className="text-[#1db954] text-xs font-medium mb-3 tracking-wide">Intent Selector</p>
                <div className="relative">
                  <div className="w-[140px] bg-[#1a1a1a] rounded-[20px] p-2 border border-white/10">
                    <div className="bg-[#121212] rounded-[14px] overflow-hidden">
                      <div className="h-5 bg-[#121212] flex items-center justify-center">
                        <div className="w-16 h-[3px] bg-black rounded-full"></div>
                      </div>
                      <div className="p-2 space-y-2">
                        <p className="text-white text-[8px] font-semibold">What do you need?</p>
                        <p className="text-white/40 text-[5px]">We'll find the right music</p>

                        {/* Intent options */}
                        {[
                          { icon: '🎯', label: 'Focus deeply', sub: 'Concentration mode', selected: true },
                          { icon: '⚡', label: 'Get energized', sub: 'Upbeat and active', selected: false },
                          { icon: '😌', label: 'Wind down', sub: 'Relax and decompress', selected: false },
                          { icon: '🎲', label: 'Surprise me', sub: 'Based on your patterns', selected: false },
                        ].map((option, i) => (
                          <div
                            key={i}
                            className={`rounded-lg p-2 ${option.selected ? 'bg-[#1db954]/10 border border-[#1db954]/30' : 'bg-[#1a1a1a]'}`}
                          >
                            <p className={`text-[6px] font-medium ${option.selected ? 'text-[#1db954]' : 'text-white'}`}>
                              {option.icon} {option.label}
                            </p>
                            <p className="text-white/40 text-[4px]">{option.sub}</p>
                          </div>
                        ))}
                      </div>
                      <div className="h-6 bg-[#1a1a1a] flex items-center justify-center gap-6 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow 4 */}
              <div className="flex items-center self-center mt-6">
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                  <path d="M0 6H28M28 6L23 1M28 6L23 11" stroke="#1db954" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Screen 5: Now Playing */}
              <div className="flex flex-col items-center">
                <p className="text-[#1db954] text-xs font-medium mb-3 tracking-wide">Now Playing</p>
                <div className="relative">
                  <div className="w-[140px] bg-[#1a1a1a] rounded-[20px] p-2 border border-white/10">
                    <div className="bg-[#121212] rounded-[14px] overflow-hidden">
                      <div className="h-5 bg-[#121212] flex items-center justify-center">
                        <div className="w-16 h-[3px] bg-black rounded-full"></div>
                      </div>
                      <div className="p-2 flex flex-col items-center">
                        {/* Handle */}
                        <div className="w-8 h-1 bg-white/20 rounded-full mb-2"></div>

                        {/* Album art */}
                        <div className="w-24 h-24 rounded-lg bg-[#1a1a1a] flex items-center justify-center mb-3">
                          <div className="w-16 h-12 rounded bg-[#282828] flex items-center justify-center">
                            <div className="w-8 h-4 rounded-sm bg-[#1db954]/30"></div>
                          </div>
                        </div>

                        {/* Track info */}
                        <p className="text-white text-[8px] font-semibold">Midnight City</p>
                        <p className="text-white/40 text-[6px]">M83</p>

                        {/* Context badge */}
                        <div className="mt-2 px-2 py-1 rounded-full bg-[#0d1f0d] border border-[#1db954]/20">
                          <p className="text-[#1db954] text-[5px]">From: Late Night Focus</p>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full mt-3">
                          <div className="h-1 bg-[#282828] rounded-full">
                            <div className="h-1 w-1/3 bg-[#1db954] rounded-full"></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-white/40 text-[4px]">1:24</span>
                            <span className="text-white/40 text-[4px]">4:02</span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-4 mt-2">
                          <div className="w-5 h-5 rounded-full border border-white/20"></div>
                          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-black ml-0.5"></div>
                          </div>
                          <div className="w-5 h-5 rounded-full border border-white/20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer caption */}
          <div className="px-6 py-4 border-t border-white/[0.06]">
            <p className="text-white/40 text-xs italic">
              These wireframes refined layout and hierarchy. Key decisions: replace play counts with meaningful context, single primary action per screen, and "Why" always visible.
            </p>
          </div>
        </div>
      </Section>

      {/* Core Features */}
      <Section>
        <SectionLabel>08</SectionLabel>
        <SectionTitle>Core Features</SectionTitle>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Feature 1 */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-[#1db954]/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center mb-4 group-hover:bg-[#1db954]/20 transition-colors">
              <svg className="w-5 h-5 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Listening Threads</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Finite, behavior-driven collections with clear explanations. Maximum 3 threads shown at once to reduce overwhelm.
          </p>
        </div>

          {/* Feature 2 */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-[#1db954]/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center mb-4 group-hover:bg-[#1db954]/20 transition-colors">
              <svg className="w-5 h-5 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
          </div>
            <h3 className="text-white text-lg font-semibold mb-3">Why This Exists</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Every recommendation comes with a human-readable explanation. No more mystery algorithms.
            </p>
        </div>

          {/* Feature 3 */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-[#1db954]/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center mb-4 group-hover:bg-[#1db954]/20 transition-colors">
              <svg className="w-5 h-5 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Listening Memory</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Visual patterns of your emotional listening over time. See how music fits into your life.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-[#1db954]/20 transition-all duration-300 hover:bg-white/[0.05]">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center mb-4 group-hover:bg-[#1db954]/20 transition-colors">
              <svg className="w-5 h-5 text-[#1db954]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-3">Rediscovery Moments</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Resurface forgotten favorites with personal context. "You loved this during summer 2023."
            </p>
          </div>
        </div>
      </Section>

      {/* Design System */}
      <Section>
        <SectionLabel>09</SectionLabel>
        <SectionTitle>Design System</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Building on Spotify's established visual language while introducing new components for <strong className="text-white/70">memory</strong>, <strong className="text-white/70">context</strong>, and <strong className="text-white/70">intentional listening</strong>. Every element respects the existing brand while extending it meaningfully.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mb-12">
          {/* Colors */}
          <div
            className="rounded-2xl p-8 border border-[#1db954]/20"
            style={{
              background: 'linear-gradient(145deg, #0d1f0d 0%, #0a0a0a 100%)',
            }}
          >
            <h4 className="text-[#1db954] text-sm font-medium mb-8">Color Palette</h4>

            {/* Spotify Green */}
            <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Primary</p>
            <div className="flex gap-3 mb-8">
              {['#1db954', '#1ed760', '#4ade80', '#86efac'].map((color, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-14 h-14 rounded-xl mb-2"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 4px 16px ${color}40`
                    }}
                  />
                  <p className="text-white/30 text-[10px]">{color}</p>
                </div>
              ))}
            </div>

            {/* Backgrounds */}
            <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Backgrounds</p>
            <div className="flex gap-3 mb-8">
              {['#000000', '#121212', '#181818', '#282828'].map((color, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-14 h-14 rounded-xl border border-white/10 mb-2"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-white/30 text-[10px]">{color}</p>
                </div>
              ))}
            </div>

            {/* Emotional Accents */}
            <p className="text-white/40 text-xs mb-3 uppercase tracking-wider">Emotional Clusters</p>
            <div className="flex gap-3">
              {[
                { color: '#6366f1', label: 'Focus' },
                { color: '#ec4899', label: 'Energy' },
                { color: '#f59e0b', label: 'Nostalgia' },
                { color: '#ef4444', label: 'Passion' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-14 h-14 rounded-xl mb-2"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 4px 16px ${item.color}30`
                    }}
                  />
                  <p className="text-white/40 text-[10px]">{item.label}</p>
                </div>
              ))}
          </div>
        </div>

          {/* Typography */}
          <div
            className="rounded-2xl p-8 border border-[#1db954]/20"
            style={{
              background: 'linear-gradient(145deg, #0d1f0d 0%, #0a0a0a 100%)',
            }}
          >
            <h4 className="text-[#1db954] text-sm font-medium mb-8">Typography</h4>

            <div className="space-y-0">
              <div className="flex items-center justify-between py-5 border-b border-[#1db954]/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Display</p>
                  <p className="text-white/30 text-xs mt-1">Circular Std · Bold · 32px</p>
          </div>
                <p className="text-white text-2xl font-bold">Threads</p>
        </div>

              <div className="flex items-center justify-between py-5 border-b border-[#1db954]/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Heading</p>
                  <p className="text-white/30 text-xs mt-1">Circular Std · SemiBold · 18px</p>
                </div>
                <p className="text-white text-lg font-semibold">Memory</p>
              </div>

              <div className="flex items-center justify-between py-5 border-b border-[#1db954]/10">
                <div>
                  <p className="text-white/90 text-sm font-medium">Body</p>
                  <p className="text-white/30 text-xs mt-1">Circular Std · Regular · 14px</p>
                </div>
                <p className="text-white/70 text-sm">Song context</p>
        </div>

              <div className="flex items-center justify-between py-5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Context Label</p>
                  <p className="text-white/30 text-xs mt-1">Circular Std · Medium · 11px</p>
                </div>
                <span className="text-[#1db954] text-xs bg-[#1db954]/10 px-3 py-1.5 rounded-full">From: Late Night</span>
              </div>
            </div>
          </div>
        </div>

        {/* Components */}
        <div className="max-w-5xl">
          <h4 className="text-[#1db954] text-sm font-medium mb-6">Key Components</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white/80 text-sm font-medium mb-2">Thread Card</p>
              <p className="text-white/40 text-xs leading-relaxed">Curated playlists with visible context about why songs belong together</p>
          </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white/80 text-sm font-medium mb-2">Memory Badge</p>
              <p className="text-white/40 text-xs leading-relaxed">Small pill showing when and where you first discovered a track</p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white/80 text-sm font-medium mb-2">Cluster Bubble</p>
              <p className="text-white/40 text-xs leading-relaxed">Visual grouping of songs by emotional state or listening pattern</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Results */}
      <Section>
        <SectionLabel>10</SectionLabel>
        <SectionTitle>Impact & Results</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          While this is a concept redesign, I validated the designs through user testing sessions with Spotify users.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#1db954] mb-2">87%</p>
            <p className="text-white/50 text-sm">of users preferred Threads over current discovery</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#1db954] mb-2">4.6/5</p>
            <p className="text-white/50 text-sm">average rating for Listening Memory feature</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#1db954] mb-2">92%</p>
            <p className="text-white/50 text-sm">said they'd use Emotional Clusters regularly</p>
          </div>
        </div>

        {/* Key Decision */}
        <div className="study-callout p-6 rounded-2xl bg-gradient-to-r from-[#1db954]/10 to-transparent border-l-2 border-[#1db954] max-w-3xl">
          <p className="text-[#1db954] text-xs font-medium uppercase tracking-wider mb-2">Key Insight from Testing</p>
          <p className="text-white/70 leading-relaxed">
            Users described the redesign as making them feel like they were "rediscovering their own music." The most common feedback: <strong className="text-white">"This makes Spotify feel personal again."</strong>
          </p>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <SectionLabel>11</SectionLabel>
      <SectionTitle>Reflection</SectionTitle>

        <div className="legacy-reflection-content max-w-3xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-[#1db954] font-medium mb-3">What I Learned</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Questioning assumptions in iconic products</li>
                <li>Designing for emotions, not just tasks</li>
                <li>Making AI recommendations feel trustworthy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#1db954] font-medium mb-3">Challenges</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Redesigning deeply familiar interfaces</li>
                <li>Visualizing abstract emotional patterns</li>
                <li>Testing novel paradigms with users</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#1db954] font-medium mb-3">Next Time</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Social features for shared listening</li>
                <li>Mood-based contextual discovery</li>
                <li>Artist-listener emotional connections</li>
              </ul>
            </div>
          </div>

          <div className="study-callout p-5 bg-white/[0.03] rounded-xl border border-[#1db954]/20">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-[#1db954] font-medium">Key Insight:</span> The best experiences help users understand themselves, not just consume more. Finite choices feel more generous than infinite ones. Sometimes the most impactful design subtracts rather than adds.
            </p>
          </div>
        </div>
      </Section>

      {/* Product Walkthrough */}
      <Section>
        <SectionLabel>12</SectionLabel>
        <SectionTitle>Product Walkthrough</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">Explore the redesigned Spotify experience with auto-playing screens showcasing Threads, Listening Memory, and Emotional Clusters.</p>

        <div className="flex flex-col items-center">
          <div className="relative group" style={{ width: '300px' }}>
            {/* Phone Frame */}
            <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />

              {/* Screen */}
              <div className="relative rounded-[2.5rem] overflow-hidden bg-[#121212]" style={{ aspectRatio: '9/19.5' }}>
                {demoImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image.src}
                    alt={image.label}
                    fill
                    className={`object-cover object-top transition-opacity duration-500 ${
                      activeSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="300px"
                  />
                ))}

                {/* Navigation arrows */}
                <button
                  onClick={goToPrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all z-10 touch-manipulation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all z-10 touch-manipulation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Slide dots - Hidden on mobile (auto-advance only) */}
                <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-2 z-10">
                  {demoImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all touch-manipulation ${
                        activeSlide === index
                          ? 'bg-[#1db954] w-5'
                          : 'bg-white/40 w-2 hover:bg-white/60'
                      }`}
                    />
                  ))}
          </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-12 bg-gradient-to-t from-[#1db954]/25 via-[#1db954]/10 to-transparent rounded-3xl blur-3xl -z-10" />
          </div>

          {/* Current slide label */}
          <p className="text-center text-white/60 text-lg mt-8 font-medium">{demoImages[activeSlide].label}</p>
          <p className="text-center text-white/30 text-sm mt-2">Auto-advances every 4 seconds</p>
        </div>
      </Section>

      {/* Footer */}
      <section ref={footerRef} className="relative py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-6">
            <Link
              href="/"
              className="relative z-30 inline-flex items-center gap-3 px-6 py-3 bg-[#1db954] hover:bg-[#1ed760] text-black font-semibold rounded-full transition-all touch-manipulation"
            >
              Back to Portfolio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </main>
  )
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className={`legacy-case-section relative py-16 md:py-24 px-4 md:px-8 border-t border-white/5 transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="legacy-section-number text-[#1db954]/60 text-sm font-mono mb-4">{children}</p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="legacy-section-title text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
  )
}
