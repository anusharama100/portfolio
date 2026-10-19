"use client"

import { useEffect, useState, useMemo } from 'react'
import { Link } from '@/portfolio/compat'
import { Image } from '@/portfolio/compat'
import CaseStudyNav from '@/portfolio/components/CaseStudyNav'
import EditorialCaseStudyCover from '@/portfolio/components/EditorialCaseStudyCover'
import NeuraWalkthroughVideo from '@/portfolio/components/NeuraWalkthroughVideo'
import NeuraUserFlows from '@/portfolio/components/NeuraUserFlows'
import neuraWalkthroughs from '@/portfolio/components/neuraWalkthroughs.json'

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
  { src: '/neuranote/neuranote-1.png', label: 'Landing Page' },
  { src: '/neuranote/neuranote-4.png', label: 'Dashboard' },
  { src: '/neuranote/neuranote-5.png', label: 'Concept Map' },
  { src: '/neuranote/neuranote-6.png', label: 'Review Mode' },
  { src: '/neuranote/neuranote-7.png', label: 'Insights' },
]

export default function NeuranNoteCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
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

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + demoImages.length) % demoImages.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % demoImages.length)
  }

  return (
    <main className="case-study-vibe case-study-neuranote relative min-h-screen bg-black text-white">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <CaseStudyNav showBackButton />

      <EditorialCaseStudyCover
        accent="purple"
        eyebrow="NeuraNote · AI learning system"
        headline="A learning system disguised as a note-taking app."
        description="I designed a calmer study space that turns scattered notes into connected concepts, useful review moments, and material that feels easy to return to."
        meta={[
          ['Role', 'UX Designer & Researcher'],
          ['Timeline', '6 weeks'],
          ['Platform', 'Web application'],
          ['Focus', 'Memory, review, and comprehension'],
        ]}
      />

      {/* Hero Section */}
      <section id="case-study-detail" hidden aria-hidden="true" className="relative min-h-screen flex items-center px-4 md:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Title and info */}
            <div>
              <p className={`text-[#a78bfa] text-sm tracking-[0.3em] uppercase mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Case Study
              </p>

              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                NeuraNote
              </h1>

              <p className={`text-lg md:text-xl text-white/50 mb-10 leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                A learning system disguised as a note-taking app.
              </p>

              {/* Project Meta */}
              <div className={`grid grid-cols-2 gap-x-8 gap-y-4 text-sm transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Role</p>
                  <p className="text-white/80">UX Designer & Researcher</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-white/80">6 weeks</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Tools</p>
                  <p className="text-white/80">Figma, Lovable, Cursor</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Platform</p>
                  <p className="text-white/80">Web Application</p>
                </div>
              </div>
            </div>

            {/* Right side - Laptop Mockup */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative group">
                {/* Laptop Frame */}
                <div className="relative">
                  {/* Screen lid - silver aluminum */}
                  <div className="relative bg-gradient-to-b from-[#e8e8e8] via-[#d4d4d4] to-[#c0c0c0] rounded-t-2xl p-[3px] shadow-lg">
                    {/* Inner black bezel */}
                    <div className="relative bg-[#1a1a1a] rounded-t-xl p-2.5 pb-2">
                      {/* Camera */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0a0a0a] ring-1 ring-[#2a2a2a]">
                        <div className="absolute inset-0.5 rounded-full bg-[#1a3a1a]"></div>
                      </div>

                      {/* Screen */}
                      <div className="relative aspect-[16/10] rounded overflow-hidden bg-black shadow-inner">
                        {/* Slideshow images */}
                        {demoImages.map((image, index) => (
                          <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-500 ${
                              activeSlide === index ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <Image
                              src={image.src}
                              alt={image.label}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 500px"
                            />
                          </div>
                        ))}

                        {/* Navigation arrows */}
                        <button
                          onClick={goToPrevSlide}
                          className="absolute left-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 touch-manipulation"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={goToNextSlide}
                          className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 touch-manipulation"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Slide dots - Hidden on mobile (auto-advance only) */}
                        <div className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 gap-1.5">
                          {demoImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveSlide(index)}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                activeSlide === index
                                  ? 'bg-white w-4'
                                  : 'bg-white/40 hover:bg-white/60'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Laptop bottom/keyboard area */}
                  <div className="relative">
                    {/* Hinge */}
                    <div className="h-1.5 bg-gradient-to-b from-[#a0a0a0] to-[#888888] rounded-b-sm shadow-md"></div>

                    {/* Bottom case */}
                    <div className="h-4 bg-gradient-to-b from-[#d4d4d4] via-[#c8c8c8] to-[#b8b8b8] rounded-b-2xl shadow-lg">
                      {/* Trackpad notch */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-b from-[#c0c0c0] to-[#a8a8a8] rounded-t-lg"></div>
                    </div>
                  </div>

                  {/* Shadow underneath */}
                  <div className="absolute -bottom-4 left-[10%] right-[10%] h-4 bg-black/20 blur-xl rounded-full"></div>
                </div>

                {/* Ambient reflection */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-white/5 via-transparent to-white/5 rounded-3xl -z-10"></div>
              </div>

              {/* Current slide label */}
              <p className="text-center text-white/40 text-sm mt-6">{demoImages[activeSlide].label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <Section id="case-study-content">
        <SectionLabel>01</SectionLabel>
        <SectionTitle>Overview</SectionTitle>
        <div className="neura-overview">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-8">
            Most note-taking apps help you organize. NeuraNote helps you actually learn.
          </p>
          <p className="text-lg text-white/50 leading-relaxed mb-12">
            I designed NeuraNote around <strong className="text-white/70">cognitive science principles</strong> (retrieval practice, spaced repetition, and concept mapping) to transform passive notes into <strong className="text-white/70">active learning</strong>. The goal: help students build <strong className="text-white/70">lasting understanding</strong>, not just forgotten files.
          </p>

          {/* Problem Statement Box */}
          <div className="neura-problem" aria-label="NeuraNote design question">
            {/* Label */}
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Problem Statement</p>

            <p className="text-xl md:text-2xl lg:text-[1.7rem] text-white/90 leading-relaxed font-light">
              How might I design a note-taking experience that helps learners{' '}
              <span className="text-[#c4b5fc]">capture</span>,{' '}
              <span className="text-[#c4b5fc]">connect</span>, and{' '}
              <span className="text-[#c4b5fc]">review</span>{' '}
              ideas in a way that supports{' '}
              <span className="text-[#c4b5fc]">deep understanding</span> and{' '}
              <span className="text-[#c4b5fc]">long-term memory</span> rather than passive information storage?
            </p>
          </div>
        </div>
      </Section>

      {/* Design Process Timeline */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Design Process</SectionTitle>
        <p className="neura-section-lede">June 2025 to July 2025</p>

        <p className="study-diagram-hint">Scroll horizontally to explore the six-week timeline.</p>
        <div className="neura-timeline" role="region" aria-label="NeuraNote six-week design timeline" tabIndex={0}>
          {/* Week labels */}
          <div className="neura-timeline-weeks grid grid-cols-6">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'].map((week, i) => (
              <div key={i} className="text-center">
                <span className="text-white/50 text-sm">{week}</span>
              </div>
            ))}
        </div>

          {/* Timeline with dotted lines */}
          <div className="relative">
            {/* Vertical dotted lines */}
            <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex justify-center">
                  <div
                    className="w-px h-full"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 50%, transparent 50%)',
                      backgroundSize: '1px 8px',
                    }}
                  />
                </div>
              ))}
        </div>

            {/* Timeline bars */}
            <div className="neura-timeline-bars relative">
              {/* User Research - Week 1 */}
              <div className="grid grid-cols-6">
                <div className="col-span-1 pr-2">
                  <div
                    className="rounded-full py-3 px-4 text-center text-sm text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(167,139,250,0.25) 0%, rgba(167,139,250,0.12) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(167,139,250,0.2), 0 4px 12px rgba(167,139,250,0.2)',
                      border: '1px solid rgba(167,139,250,0.3)',
                    }}
                  >
                    User Research
                  </div>
                </div>
              </div>

              {/* Lo-Fi and Mid-Fi - Week 2-3 */}
              <div className="grid grid-cols-6">
                <div className="col-start-2 col-span-2 px-2">
                  <div
                    className="rounded-full py-3 px-4 text-center text-sm text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(167,139,250,0.25) 0%, rgba(167,139,250,0.12) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(167,139,250,0.2), 0 4px 12px rgba(167,139,250,0.2)',
                      border: '1px solid rgba(167,139,250,0.3)',
                    }}
                  >
                    Lo-Fi & Mid-Fi Wireframes
                  </div>
                </div>
              </div>

              {/* Hi-Fi Prototypes - Week 3-4 */}
              <div className="grid grid-cols-6">
                <div className="col-start-3 col-span-2 px-2">
                  <div
                    className="rounded-full py-3 px-4 text-center text-sm text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(167,139,250,0.25) 0%, rgba(167,139,250,0.12) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(167,139,250,0.2), 0 4px 12px rgba(167,139,250,0.2)',
                      border: '1px solid rgba(167,139,250,0.3)',
                    }}
                  >
                    Hi-Fi Desktop Prototypes
                  </div>
                </div>
              </div>

              {/* Usability Testing - Week 4-5 */}
              <div className="grid grid-cols-6">
                <div className="col-start-4 col-span-2 px-2">
                  <div
                    className="rounded-full py-3 px-4 text-center text-sm text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(167,139,250,0.25) 0%, rgba(167,139,250,0.12) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(167,139,250,0.2), 0 4px 12px rgba(167,139,250,0.2)',
                      border: '1px solid rgba(167,139,250,0.3)',
                    }}
                  >
                    Usability Testing
                  </div>
                </div>
              </div>

              {/* Completion - Week 5-6 */}
              <div className="grid grid-cols-6">
                <div className="col-start-5 col-span-2 px-2">
                  <div
                    className="rounded-full py-3 px-4 text-center text-sm text-white/90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(167,139,250,0.25) 0%, rgba(167,139,250,0.12) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(167,139,250,0.2), 0 4px 12px rgba(167,139,250,0.2)',
                      border: '1px solid rgba(167,139,250,0.3)',
                    }}
                  >
                    Hi-Fi Prototype Completion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Research */}
      <Section>
        <SectionLabel>03</SectionLabel>
        <SectionTitle>Research</SectionTitle>

        <div className="neura-research-intro">
          <h3 className="text-xl md:text-2xl font-semibold text-[#c4b5fc] mb-6">Research Goals</h3>
          <p className="text-lg text-white/60 leading-relaxed">
            I started with a <strong className="text-white/80">hypothesis</strong>: existing note-taking tools prioritize speed and organization over actual learning. I wanted to understand <strong className="text-white/80">how students currently study</strong>, where they struggle, and what prevents knowledge from sticking, then design something that supports{' '}
            <span className="text-white font-medium">deep understanding</span> and{' '}
            <span className="text-white font-medium">long-term retention</span>{' '}
            without adding pressure.
          </p>
        </div>

        {/* User Surveys */}
        <div className="neura-survey-heading">
          <h3 className="text-xl md:text-2xl font-semibold text-[#c4b5fc] mb-8">User Surveys</h3>
          <p className="text-white/40 text-sm mb-12">Survey sample: n = 28 users</p>
        </div>

        <div className="neura-survey-grid">
          {/* Devices Used for Note-Taking */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Devices Used for Note-Taking</h4>
            <div className="space-y-4">
              {[
                { label: 'Laptop / Computer', value: 72, color: '#c9a9a9' },
                { label: 'Tablet', value: 48, color: '#d4b5b5' },
                { label: 'Phone', value: 44, color: '#dfc4c4' },
                { label: 'Paper', value: 29, color: '#e8d4d4' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-28 shrink-0">{item.label}</span>
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
              This informed a web-first experience optimized for longer writing sessions.
            </p>
          </div>

          {/* Primary Note-Taking Applications */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Primary Note-Taking Applications</h4>
            <div className="space-y-3">
              {[
                { label: 'Google Docs', value: 54, color: '#8a9a7c' },
                { label: 'Apple Notes', value: 25, color: '#9daa91' },
                { label: 'Notion', value: 22, color: '#a8b59e' },
                { label: 'GoodNotes', value: 18, color: '#b5c1ad' },
                { label: 'Notability', value: 15, color: '#c2cdbc' },
                { label: 'Other', value: 21, color: '#cfd9cb' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-20 shrink-0">{item.label}</span>
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
              This highlighted an opportunity to design beyond organization toward learning-focused workflows.
            </p>
        </div>

          {/* Note-Taking Purpose - Pie Chart */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Note-Taking Purpose</h4>
            <div className="flex items-center gap-6">
              {/* Pie Chart */}
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* School 55% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#8a9a7c"
                    strokeWidth="20"
                    strokeDasharray="138.2 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Work 20.5% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#a8b59e"
                    strokeWidth="20"
                    strokeDasharray="51.5 251.2"
                    strokeDashoffset="-138.2"
                  />
                  {/* Planning 12.8% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#c2cdbc"
                    strokeWidth="20"
                    strokeDasharray="32.2 251.2"
                    strokeDashoffset="-189.7"
                  />
                  {/* Other 12.8% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#dfe8da"
                    strokeWidth="20"
                    strokeDasharray="32.2 251.2"
                    strokeDashoffset="-221.9"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {[
                  { label: 'School', value: '55%', color: '#8a9a7c' },
                  { label: 'Work', value: '20.5%', color: '#a8b59e' },
                  { label: 'Planning', value: '12.8%', color: '#c2cdbc' },
                  { label: 'Other', value: '12.8%', color: '#dfe8da' },
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
              55% of users take notes primarily for <span className="text-white/50">school</span>.
            </p>
          </div>
        </div>

        {/* Survey Summary */}
        <div className="neura-note-block neura-survey-takeaways">
          <h4 className="text-[#c4b5fc] text-lg font-medium mb-4">Key Takeaways</h4>
          <div className="space-y-4 text-white/50 leading-relaxed">
            <p>
              <span className="text-white/70 font-medium">General-purpose tools dominate.</span>{' '}
              72% use laptops, and over half rely on Google Docs (built for documents, not learning). This revealed an opportunity to design for how students think, not just type.
            </p>
            <p>
              <span className="text-white/70 font-medium">School is the primary use case.</span>{' '}
              55% take notes for academics, so I focused on comprehension and retention features rather than workplace collaboration.
            </p>
            <p>
              <span className="text-white/70 font-medium">Capture ≠ retention.</span>{' '}
              Users consistently reported that despite detailed notes, they couldn't recall information when needed. This gap became my core design challenge.
            </p>
          </div>
        </div>

        {/* Competitive Analysis */}
        <div className="neura-chapter" id="neura-comparison" aria-labelledby="neura-comparison-title">
          <h3 id="neura-comparison-title" className="text-xl md:text-2xl font-semibold text-[#c4b5fc] mb-2">Competitive Analysis</h3>
          <p className="text-white/40 text-sm mb-10">Evaluating existing note-taking tools</p>
          <p className="study-comparison-hint">Scroll sideways to compare all five columns →</p>
          <div className="neura-comparison-table study-comparison-table" role="region" aria-label="Note-taking tools comparison" tabIndex={0}>
            {/* Comparison Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="text-white/40 text-xs uppercase tracking-wider">Tool</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Capture</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Organization</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Learning</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Gap</div>
            </div>

            {/* Notion */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="text-white font-medium">Notion</p>
                <p className="text-white/30 text-xs mt-1">Productivity</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">◐</span>
                <span className="text-white/50 text-sm">Slow setup</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Excellent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <p className="text-white/40 text-sm">Structure over retention</p>
            </div>

            {/* GoodNotes */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="text-white font-medium">GoodNotes</p>
                <p className="text-white/30 text-xs mt-1">Handwriting</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">◐</span>
                <span className="text-white/50 text-sm">Basic folders</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <p className="text-white/40 text-sm">No concept linking</p>
            </div>

            {/* Apple Notes */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="text-white font-medium">Apple Notes</p>
                <p className="text-white/30 text-xs mt-1">Quick capture</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">◐</span>
                <span className="text-white/50 text-sm">Folders only</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <p className="text-white/40 text-sm">Static after capture</p>
            </div>

            {/* Google Docs */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="text-white font-medium">Google Docs</p>
                <p className="text-white/30 text-xs mt-1">Collaboration</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">◐</span>
                <span className="text-white/50 text-sm">Document-first</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">◐</span>
                <span className="text-white/50 text-sm">Drive folders</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <p className="text-white/40 text-sm">Not built for learning</p>
            </div>

            {/* NeuraNote (The Solution) */}
            <div className="grid grid-cols-5 gap-4 py-5 bg-[#a78bfa]/5 rounded-xl px-4 mt-4 items-start">
              <div>
                <p className="text-[#a78bfa] font-medium">NeuraNote</p>
                <p className="text-[#a78bfa]/50 text-xs mt-1">Learning-first</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Quick + AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Auto-linked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Built-in</span>
              </div>
              <p className="text-[#a78bfa]/70 text-sm font-medium">NeuraNote closes this gap</p>
            </div>
          </div>

          {/* Key Finding */}
          <div className="neura-note-block">
            <p className="text-white/50 leading-relaxed mb-4">
              The research pointed to a gap: existing tools excel at either capture or organization, but <strong className="text-white/70">none prioritize learning</strong>. Spaced repetition, concept linking, and metacognitive prompts are absent across the board.
            </p>
            <p className="text-white/50 leading-relaxed">
              This <strong className="text-white/70">validated my hypothesis</strong>: there's room for a tool that bridges note-taking and understanding, treating notes as the <strong className="text-white/70">starting point for deeper learning</strong>.
            </p>
          </div>
        </div>

        {/* Affinity Mapping */}
        <div className="neura-chapter" id="neura-affinity" aria-labelledby="neura-affinity-title">
          <h3 id="neura-affinity-title" className="text-xl md:text-2xl font-semibold text-[#c4b5fc] mb-2">Affinity Mapping</h3>
            <p className="text-white/40 text-sm mb-6">Synthesizing Research Insights</p>

            <p className="text-white/50 leading-relaxed max-w-3xl mb-8">
              I synthesized survey and interview data through affinity mapping. Three themes emerged:
            </p>

            <div className="neura-affinity-themes">
              <p className="text-white/50 leading-relaxed">
                <span className="text-white/80 font-medium">Organization:</span> Quick access to notes and cross-subject connections without complex folder structures.
              </p>
              <p className="text-white/50 leading-relaxed">
                <span className="text-white/80 font-medium">Collaboration:</span> Easy sharing for study groups and team knowledge transfer.
              </p>
              <p className="text-white/50 leading-relaxed">
                <span className="text-white/80 font-medium">Efficiency:</span> Fast capture during lectures, effective review for retention.
              </p>
            </div>

          {/* Affinity Map Grid */}
          <div className="neura-affinity-grid">

            {/* Collaboration Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#c4b5fc] mb-8 text-center">Collaboration</h4>
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
                  <p className="text-gray-700 leading-snug">Takes shared notes during study groups or review sessions to align understanding and divide work.</p>
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
                  <p className="text-gray-700 leading-snug">Wants collaborators to see how ideas are connected, not just shared text blocks.</p>
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
                  <p className="text-gray-700 leading-snug">Collaborative notes become cluttered and difficult to review after the session ends.</p>
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
                  <p className="text-gray-700 leading-snug">No clear ownership or visibility into who added or edited specific concepts.</p>
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
                  <p className="text-gray-700 leading-snug">Collaboration should reduce cognitive load, not add coordination overhead.</p>
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
                  <p className="text-gray-700 leading-snug">Shared concept maps that visually represent relationships and show contributor ownership.</p>
                </div>
              </div>
            </div>

            {/* Organization Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#c4b5fc] mb-8 text-center">Organization</h4>
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
                  <p className="text-gray-700 leading-snug">Takes notes across multiple subjects and courses within the same app.</p>
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
                  <p className="text-gray-700 leading-snug">Wants notes grouped by conceptual meaning rather than folders or file location.</p>
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
                  <p className="text-gray-700 leading-snug">Hard to see relationships between topics when notes are separated by notebooks or files.</p>
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
                  <p className="text-gray-700 leading-snug">Over-organizing notes interrupts learning flow and attention during capture.</p>
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
                  <p className="text-gray-700 leading-snug">Organization should support sense-making, not just storage.</p>
                </div>
                {/* Opportunity - Orange (Highlighted) */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#ffe5d0',
                    boxShadow: '4px 4px 12px rgba(255,183,128,0.4)',
                    transform: 'rotate(0deg)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Auto-generated concept clusters and visual maps that organize notes based on meaning.</p>
                </div>
              </div>
            </div>

            {/* Efficiency / Speed Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#c4b5fc] mb-8 text-center">Efficiency / Speed</h4>
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
                  <p className="text-gray-700 leading-snug">Takes notes quickly during lectures to keep up with fast-paced information.</p>
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
                  <p className="text-gray-700 leading-snug">Wants to capture ideas without breaking focus or attention during learning.</p>
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
                  <p className="text-gray-700 leading-snug">Reviewing long, unstructured notes is time-consuming and inefficient.</p>
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
                  <p className="text-gray-700 leading-snug">Passive rereading of notes feels ineffective for long-term retention.</p>
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
                  <p className="text-gray-700 leading-snug">Speed should not sacrifice learning depth or understanding.</p>
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
                  <p className="text-gray-700 leading-snug">One-click conversion from notes to recall-based formats like flashcards or prompts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="neura-affinity-legend" role="group" aria-label="Affinity map color key">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(252,213,215,0.9)' }}></div>
              <span className="text-white/40 text-xs">User Behavior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(212,237,218,0.9)' }}></div>
              <span className="text-white/40 text-xs">Needs / Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(255,249,230,0.9)' }}></div>
              <span className="text-white/40 text-xs">Pain Point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(214,234,255,0.9)' }}></div>
              <span className="text-white/40 text-xs">UX Principle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(255,229,208,0.9)' }}></div>
              <span className="text-white/40 text-xs">Opportunity</span>
            </div>
          </div>

          {/* Synthesis */}
          <div className="neura-note-block">
            <h4 className="text-[#c4b5fc] text-lg font-medium mb-4">Key Insight</h4>
            <p className="text-white/50 leading-relaxed mb-4">
              A clear tension emerged from the research: <strong className="text-white/70">users prioritize speed when capturing notes, but that same speed undermines retention</strong>. Information accumulates, connections fade, and reviewing feels like a burden rather than a benefit.
            </p>
            <p className="text-white/50 leading-relaxed">
              This insight shaped the core design direction: <span className="text-white/70">automate the organization layer</span>. Instead of asking users to manually tag and categorize, NeuraNote intelligently surfaces relationships between concepts, transforming scattered notes into interconnected knowledge.
            </p>
          </div>
        </div>

        {/* Low Fidelity Designs */}
        <div className="neura-chapter" id="neura-lofi" aria-labelledby="neura-lofi-title">
          <h3 id="neura-lofi-title" className="text-xl md:text-2xl font-semibold text-[#c4b5fc] mb-2">Low Fidelity Designs</h3>
          <p className="text-white/40 text-sm mb-6">Early Explorations</p>

          <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
            I sketched initial concepts focusing on three journeys: <span className="text-white/70">note creation</span>, <span className="text-white/70">concept visualization</span>, and <span className="text-white/70">review for retention</span>. Each sketch was evaluated against research findings to ensure I was solving real problems.
          </p>

          {/* Lo-Fi Screenshots - Side by Side */}
          <div className="neura-sketch-grid">
            {/* Sketch 1 - User Flows */}
            <div
              className="rounded-xl p-5 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="text-white/60 text-xs mb-3 font-medium">User Flow Explorations</p>
              <a className="neura-artifact-link" href="/neuranote/lofi-sketches-1.png" target="_blank" rel="noreferrer" aria-label="Open user-flow sketches at full size">
                <Image
                  src="/neuranote/lofi-sketches-1.png"
                  alt="Low fidelity sketches - user flows"
                  width={1024}
                  height={1024}
                  className="w-full h-auto"
                  sizes="50vw"
                />
              </a>
              <p className="text-white/40 text-xs mt-3">Early sketches for flashcards, pins, and zoom controls.</p>
            </div>

            {/* Sketch 2 - Screen Layouts */}
            <div
              className="rounded-xl p-5 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="text-white/60 text-xs mb-3 font-medium">Core Screen Layouts</p>
              <a className="neura-artifact-link" href="/neuranote/lofi-sketches-2.png" target="_blank" rel="noreferrer" aria-label="Open screen-layout sketches at full size">
                <Image
                  src="/neuranote/lofi-sketches-2.png"
                  alt="Low fidelity sketches - screen layouts"
                  width={1012}
                  height={436}
                  className="w-full h-auto"
                  sizes="50vw"
                />
              </a>
              <p className="text-white/40 text-xs mt-3">Dashboard, Notes, Concept Map, Review, and Insights screens.</p>
            </div>
          </div>

          {/* Lo-Fi Summary */}
          <div className="neura-note-block">
            <h4 className="text-[#c4b5fc] text-lg font-medium mb-4">Key Decisions</h4>
            <div className="space-y-3 text-white/50 leading-relaxed">
              <p>
                <span className="text-white/70 font-medium">Persistent sidebar navigation:</span> Quick switching between notes, concept maps, review, and insights.
              </p>
              <p>
                <span className="text-white/70 font-medium">Concept map as core feature:</span> Interactive node-based map that auto-generates connections.
              </p>
              <p>
                <span className="text-white/70 font-medium">Active recall over flashcards:</span> Users explain concepts in their own words before seeing references.
              </p>
            </div>
          </div>
        </div>

        <NeuraUserFlows />
      </Section>

      {/* Core Features */}
      <Section>
        <SectionLabel>04</SectionLabel>
        <SectionTitle>Core Features</SectionTitle>
        <p className="neura-section-lede">
          Six integrated features that transform passive notes into active learning, from capture to mastery.
        </p>

        <div className="neura-feature-grid">
          {/* Feature 1: Smart Notes */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/[0.05]">
            <h3 className="text-white text-lg font-semibold mb-3">Smart Notes</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Capture ideas through typing, voice recording, PDF uploads, or photo imports. Notes are automatically formatted and searchable.
            </p>
          </div>

          {/* Feature 2: AI Concept Extraction */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/[0.05]">
            <h3 className="text-white text-lg font-semibold mb-3">AI Concept Extraction</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              One click extracts key concepts from your notes. AI identifies important terms, definitions, and relationships automatically.
            </p>
          </div>

          {/* Feature 3: AI Summarization */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/[0.05]">
            <h3 className="text-white text-lg font-semibold mb-3">AI Summarization</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Generate concise summaries of lengthy notes. Perfect for quick review sessions or sharing key takeaways with study groups.
            </p>
          </div>

          {/* Feature 4: Concept Map */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/[0.05]">
            <h3 className="text-white text-lg font-semibold mb-3">Concept Map</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Visualize how concepts connect across all your notes. Interactive node-based maps reveal relationships you might have missed.
            </p>
          </div>

          {/* Feature 5: Review Sessions */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/[0.05]">
            <h3 className="text-white text-lg font-semibold mb-3">Review Sessions</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              AI generates questions from your concepts. Practice active recall, get instant feedback, and rate your confidence to optimize retention.
            </p>
          </div>

          {/* Feature 6: Learning Insights */}
          <div className="group relative bg-white/[0.03] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/[0.05]">
            <h3 className="text-white text-lg font-semibold mb-3">Learning Insights</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Track your progress with AI-powered analytics. See strengths, focus areas, concept mastery levels, and personalized learning recommendations.
            </p>
          </div>
        </div>

        {/* Features Summary */}
        <div className="neura-feature-summary">
          <p className="text-white/50 leading-relaxed">
            Each feature works independently while amplifying the others. No forced workflow, just intelligent assistance when you want it.
          </p>
        </div>

        {/* Key Design Decision */}
        <div className="neura-note-block">
          <p className="text-[#a78bfa] text-xs font-semibold uppercase tracking-widest mb-4">Key Design Decision</p>
          <p className="text-white/70 text-lg leading-relaxed">
            I designed <strong className="text-white font-semibold">visual concept maps instead of folder hierarchies</strong> because research showed students struggle with categorization during capture. Spatial relationships reduce cognitive load and match how memory actually works.
          </p>
        </div>
      </Section>

      {/* Mid-Fidelity Prototypes */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>Mid-Fidelity Prototypes</SectionTitle>
        <p className="neura-section-lede">
          I developed mid-fi wireframes to refine layout, hierarchy, and interactions before high-fidelity, testing core functionality and gathering early feedback.
        </p>

        {/* Wireframes Grid */}
        <div className="neura-wireframe-stack">
          {/* Main Screens Overview - Full Width */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Core Screens</p>
            <a className="neura-artifact-link" href="/neuranote/midfi-wireframes.png" target="_blank" rel="noreferrer" aria-label="Open core wireframe screens at full size">
              <Image
                src="/neuranote/midfi-wireframes.png"
                alt="Mid-fidelity wireframes showing landing page, onboarding, dashboard, notes, and concept map screens"
                width={1758}
                height={520}
                className="w-full h-auto"
              />
            </a>
          </div>

          {/* Review Flow - Full Width */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Review Flow</p>
            <a className="neura-artifact-link" href="/neuranote/midfi-review.png" target="_blank" rel="noreferrer" aria-label="Open review wireframes at full size">
              <Image
                src="/neuranote/midfi-review.png"
                alt="Mid-fidelity wireframes showing the review session flow"
                width={1706}
                height={312}
                className="w-full h-auto"
              />
            </a>
          </div>
        </div>

        {/* Mid-Fi Summary */}
        <div className="neura-note-block">
          <h4 className="text-[#c4b5fc] text-lg font-medium mb-4">Key Refinements</h4>
          <div className="space-y-3 text-white/50 leading-relaxed">
            <p><span className="text-white/70 font-medium">Consistent sidebar:</span> Same navigation pattern across all screens.</p>
            <p><span className="text-white/70 font-medium">Progressive disclosure:</span> Review guides users from empty state to active recall with on-demand hints.</p>
            <p><span className="text-white/70 font-medium">Glanceable Insights:</span> AI coaching, strengths, and progress in one view.</p>
          </div>
        </div>
      </Section>

      {/* Usability Testing */}
      <Section>
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Usability Testing</SectionTitle>
        <p className="neura-section-lede">
          I conducted <strong className="text-white/70">moderated usability tests</strong> with <strong className="text-white/70">6 participants</strong> to validate mid-fi prototypes and identify friction points.
        </p>

        {/* Testing Stats */}
        <div className="neura-testing-stats">
          <div className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-3xl font-bold text-white mb-1">6</p>
            <p className="text-white/40 text-sm">Participants</p>
          </div>
          <div className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-3xl font-bold text-white mb-1">5</p>
            <p className="text-white/40 text-sm">Core Tasks</p>
          </div>
          <div className="text-center p-5 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-3xl font-bold text-white mb-1">92%</p>
            <p className="text-white/40 text-sm">Task Success</p>
          </div>
        </div>

        {/* Key Findings */}
        <div className="neura-testing-findings">
          <h4 className="text-[#c4b5fc] text-lg font-medium mb-5">Key Findings</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-4 px-5 py-4 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-green-400 text-lg flex-shrink-0">+</span>
              <p className="text-white/50 text-sm">
                <span className="text-white/70 font-medium">Navigation was intuitive.</span> All participants successfully located Notes, Concept Map, and Review without guidance.
              </p>
          </div>
            <div className="flex items-center gap-4 px-5 py-4 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-green-400 text-lg flex-shrink-0">+</span>
              <p className="text-white/50 text-sm">
                <span className="text-white/70 font-medium">Review flow felt natural.</span> Users appreciated the "explain in your own words" approach over simple flashcards.
              </p>
            </div>
            <div className="flex items-center gap-4 px-5 py-4 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-yellow-400 text-lg flex-shrink-0">~</span>
              <p className="text-white/50 text-sm">
                <span className="text-white/70 font-medium">Concept extraction needed clarity.</span> 3 participants weren't sure when AI would auto-extract vs. manual tagging.
              </p>
            </div>
            <div className="flex items-center gap-4 px-5 py-4 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-yellow-400 text-lg flex-shrink-0">~</span>
              <p className="text-white/50 text-sm">
                <span className="text-white/70 font-medium">Insights page was dense.</span> Users wanted a quicker summary before diving into detailed stats.
              </p>
            </div>
          </div>
        </div>

        {/* Iterations */}
        <div className="neura-note-block">
          <h4 className="text-[#c4b5fc] text-lg font-medium mb-4">Iterations</h4>
          <p className="text-white/50 leading-relaxed">
            Based on feedback: added clearer AI indicators, introduced a "Quick Summary" card in Insights, and refined concept extraction with explanatory tooltips.
          </p>
        </div>
      </Section>

      {/* Hi-Fi Prototyping */}
      <Section>
        <SectionLabel>07</SectionLabel>
        <SectionTitle>Design System</SectionTitle>
        <p className="neura-section-lede">
          I focused on <strong className="text-white/70">simplicity</strong>: black and white foundation with <strong className="text-white/70">customizable pastel accents</strong>. User interviews revealed that many organize information by assigning personal colors, so I designed accents to be <strong className="text-white/70">adaptable to individual workflows</strong>.
        </p>

        {/* Design System */}
        <div className="neura-design-grid">
          {/* Colors */}
          <div
            className="rounded-2xl p-8 border border-white/10"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            }}
          >
            <h5 className="text-white text-lg font-semibold mb-8">Colors</h5>

            {/* Background */}
            <div className="mb-8">
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Background</p>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-white shadow-lg shadow-white/20 ring-1 ring-white/30"></div>
                  <span className="text-white/60 text-xs font-mono">#FFFFFF</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-[#F5F5F5] shadow-lg shadow-white/10 ring-1 ring-white/20"></div>
                  <span className="text-white/60 text-xs font-mono">#F5F5F5</span>
                </div>
              </div>
            </div>

            {/* Primary */}
            <div className="mb-8">
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Primary</p>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-[#333333] shadow-lg ring-1 ring-white/10"></div>
                  <span className="text-white/60 text-xs font-mono">#333333</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-[#666666] shadow-lg ring-1 ring-white/10"></div>
                  <span className="text-white/60 text-xs font-mono">#666666</span>
                </div>
              </div>
            </div>

            {/* Secondary - Dashboard Colors */}
            <div className="mb-8">
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Secondary</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-[#E89A65] shadow-lg shadow-[#E89A65]/30"></div>
                  <span className="text-white/60 text-xs font-mono">#E89A65</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-[#90E199] shadow-lg shadow-[#90E199]/30"></div>
                  <span className="text-white/60 text-xs font-mono">#90E199</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-[#E8BD5A] shadow-lg shadow-[#E8BD5A]/30"></div>
                  <span className="text-white/60 text-xs font-mono">#E8BD5A</span>
                </div>
              </div>
            </div>

            {/* Tertiary - Feature Colors */}
          <div>
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Feature Accents</p>
              <div className="grid grid-cols-5 gap-3 study-feature-colors">
                <div className="w-11 h-11 rounded-xl bg-[#9C89CE] shadow-lg shadow-[#9C89CE]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#A0A5DC] shadow-lg shadow-[#A0A5DC]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#C9A090] shadow-lg shadow-[#C9A090]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#DA9D4A] shadow-lg shadow-[#DA9D4A]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#8E98DC] shadow-lg shadow-[#8E98DC]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#E8B4F0] shadow-lg shadow-[#E8B4F0]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#A5C5B3] shadow-lg shadow-[#A5C5B3]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#7ED9B0] shadow-lg shadow-[#7ED9B0]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#F5D76E] shadow-lg shadow-[#F5D76E]/25"></div>
                <div className="w-11 h-11 rounded-xl bg-[#7EC8D9] shadow-lg shadow-[#7EC8D9]/25"></div>
          </div>
            </div>
          </div>

          {/* Typography */}
          <div
            className="rounded-2xl p-8 border border-white/10"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            }}
          >
            <h5 className="text-white text-lg font-semibold mb-8">Typography</h5>

            <div className="space-y-0">
              {/* Heading */}
              <div className="flex items-center justify-between py-4 border-b border-white/10">
          <div>
                  <p className="text-white/80 text-sm font-medium">Heading</p>
                  <p className="text-white/40 text-xs mt-0.5">Poppins SemiBold · 30px</p>
          </div>
                <p className="text-white text-2xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Heading</p>
        </div>

              {/* Display / Cursive */}
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white/80 text-sm font-medium">Display</p>
                  <p className="text-white/40 text-xs mt-0.5">Playfair Display Italic · 28px</p>
                </div>
                <p className="text-white text-xl italic" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Learn Deeper</p>
              </div>

              {/* Heading 2 */}
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white/80 text-sm font-medium">Heading 2</p>
                  <p className="text-white/40 text-xs mt-0.5">Poppins SemiBold · 20px</p>
                </div>
                <p className="text-white text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>Heading 2</p>
              </div>

              {/* Subheading */}
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white/80 text-sm font-medium">Subheading</p>
                  <p className="text-white/40 text-xs mt-0.5">Poppins Medium · 18px</p>
                </div>
                <p className="text-white/90 text-lg font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Subheading</p>
              </div>

              {/* Body */}
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white/80 text-sm font-medium">Body</p>
                  <p className="text-white/40 text-xs mt-0.5">Poppins Regular · 14px</p>
                </div>
                <p className="text-white/80 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>Body text</p>
              </div>

              {/* Body 2 */}
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white/80 text-sm font-medium">Body 2</p>
                  <p className="text-white/40 text-xs mt-0.5">Poppins Regular · 12px</p>
                </div>
                <p className="text-white/70 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>Body 2</p>
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-white/80 text-sm font-medium">Caption</p>
                  <p className="text-white/40 text-xs mt-0.5">Poppins Regular · 10px</p>
                </div>
                <p className="text-white/60 text-[10px]" style={{ fontFamily: 'Poppins, sans-serif' }}>Caption</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Projected Impact */}
      <Section>
        <SectionLabel>08</SectionLabel>
        <SectionTitle>Impact & Results</SectionTitle>
        <p className="neura-section-lede">
          While NeuraNote is a concept project, the design decisions are grounded in cognitive science research and user testing feedback.
        </p>

        <div className="neura-impact-grid">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#a78bfa] mb-2">40%</p>
            <p className="text-white/50 text-sm">projected reduction in review time through spaced repetition</p>
                </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#a78bfa] mb-2">2x</p>
            <p className="text-white/50 text-sm">faster concept recall with visual mapping vs. linear notes</p>
              </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#a78bfa] mb-2">89%</p>
            <p className="text-white/50 text-sm">of testers said they'd switch from their current app</p>
            </div>
          </div>

        <div className="neura-note-block">
          <p className="text-[#a78bfa] text-xs font-medium uppercase tracking-wider mb-2">Based on Research</p>
          <p className="text-white/70 leading-relaxed">
            Studies show visual concept mapping improves retention by 25-30% compared to traditional note-taking. NeuraNote's AI-powered connections aim to make this approach accessible to everyone.
          </p>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <SectionLabel>09</SectionLabel>
      <SectionTitle>Reflection</SectionTitle>

        <div className="neura-reflection">
          <div className="neura-reflection-grid">
            <div>
              <h3 className="text-[#a78bfa] font-medium mb-3">What I Learned</h3>
              <ul className="reflection-list space-y-2 text-white/60 text-sm">
            <li>Designing for cognition, not just usability</li>
                <li>Positioning AI as collaborator, not authority</li>
                <li>Prioritizing learning over engagement metrics</li>
          </ul>
            </div>
            <div>
              <h3 className="text-[#a78bfa] font-medium mb-3">Challenges</h3>
              <ul className="reflection-list space-y-2 text-white/60 text-sm">
                <li>Balancing simplicity with powerful features</li>
                <li>Measuring learning retention in prototypes</li>
                <li>Advocating for user-first decisions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#a78bfa] font-medium mb-3">Next Time</h3>
              <ul className="reflection-list space-y-2 text-white/60 text-sm">
                <li>Test with real content earlier</li>
                <li>Include more diverse learners</li>
                <li>Build accessibility in from day one</li>
              </ul>
            </div>
          </div>

          <div className="neura-note-block">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-white font-medium">Key Insight:</span> Thoughtful AI can enhance human capability without creating dependency. The best learning tools question productivity norms rather than reinforce them.
            </p>
          </div>
        </div>
      </Section>

      {/* User Walkthrough */}
      <Section>
        <SectionLabel>10</SectionLabel>
        <SectionTitle>Product Walkthrough</SectionTitle>
        <p className="neura-section-lede">
          Explore the guided onboarding, then follow the actual note-to-review workflow. Use the timestamps to jump to a specific moment.
        </p>

        <div className="neura-walkthroughs">
          <figure>
            <h3>Guided onboarding</h3>
            <NeuraWalkthroughVideo label="NeuraNote guided onboarding" {...neuraWalkthroughs.onboarding}
              sources={[{ src: neuraWalkthroughs.onboarding.src, type: 'video/mp4' }]} />
            <figcaption>The original guided-tour recording, optimized for browser playback. No steps removed.</figcaption>
          </figure>
          <figure>
            <h3>Notes, concepts, and recall</h3>
            <NeuraWalkthroughVideo label="NeuraNote product workflow" {...neuraWalkthroughs.workflow}
              sources={[{ src: neuraWalkthroughs.workflow.src, type: 'video/mp4' }]} />
            <figcaption>The original final-prototype recording, optimized for browser playback. No steps removed.</figcaption>
          </figure>
        </div>
      </Section>

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
  return (
    <section
      id={id}
      className="legacy-case-section relative z-10"
    >
      <div className="neura-section-inner">
        {children}
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="legacy-section-number text-[#a78bfa]/60 text-sm font-mono mb-4">{children}</p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="legacy-section-title text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
  )
}

function Quote({ text }: { text: string }) {
  return (
    <p className="text-white/70 text-lg italic border-l-2 border-white/20 pl-6">
      "{text}"
    </p>
  )
}

function Insight({ number, finding, implication }: { number: string; finding: string; implication: string }) {
  return (
    <div className="grid lg:grid-cols-[1fr,2fr] gap-8 max-w-4xl">
      <div>
        <span className="text-white/20 text-6xl font-light">{number}</span>
      </div>
      <div>
        <p className="text-white/80 text-xl mb-4">{finding}</p>
        <p className="text-white/40">→ {implication}</p>
      </div>
    </div>
  )
}

function Principle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h4 className="text-white/80 mb-1">{title}</h4>
      <p className="text-white/40 text-sm">{description}</p>
    </div>
  )
}

function ProcessStage({ stage, description }: { stage: string; description: string }) {
  return (
    <div className="grid grid-cols-[100px,1fr] gap-8">
      <span className="text-white/30">{stage}</span>
      <p className="text-white/60">{description}</p>
    </div>
  )
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h4 className="text-white/80 mb-1">{title}</h4>
      <p className="text-white/40 text-sm">{description}</p>
    </div>
  )
}
