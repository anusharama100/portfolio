"use client"

import { useEffect, useState, useMemo } from 'react'
import { Link } from '@/portfolio/compat'
import { Image } from '@/portfolio/compat'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import CaseStudyNav from '@/portfolio/components/CaseStudyNav'
import EditorialCaseStudyCover from '@/portfolio/components/EditorialCaseStudyCover'

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
  { src: '/narbl/narbl-1.png', label: 'Everything You Need. One Nexus.', width: 2044, height: 992 },
  { src: '/narbl/narbl-3.png', label: 'Smarter Homework, Faster Results', width: 2450, height: 1208 },
  { src: '/narbl/narbl-4.png', label: 'Homework Intelligence', width: 2450, height: 1208 },
  { src: '/narbl/narbl-5.png', label: 'Success Stories', width: 2450, height: 1208 },
  { src: '/narbl/narbl-6.png', label: 'Trusted by Top Students', width: 2450, height: 1208 },
  { src: '/narbl/narbl-7.png', label: 'Seamless Integrations', width: 2450, height: 1208 },
  { src: '/narbl/narbl-8.png', label: 'Why Choose Nexus', width: 2450, height: 1208 },
  { src: '/narbl/narbl-9.png?v=5', label: 'Final Platform', width: 1024, height: 497 },
]

export default function NexusCaseStudy() {
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
    <main className="case-study-vibe case-study-nexus nexus-theme relative min-h-screen bg-[#f7f7f2] text-slate-900">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-[#93c5fd]"
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
        accent="blue"
        eyebrow="Nexus · Multi-model research platform"
        headline="One question. Multiple models. A clearer answer."
        description="I designed an AI research experience that compares multiple model responses behind the scenes and gives students one focused answer they can understand, verify, and act on."
        meta={[
          ['Role', 'Product Designer'],
          ['Timeline', '10 weeks'],
          ['Research', '48 users'],
          ['Scope', 'Research, product UX, and visual system'],
        ]}
      />

      {/* Hero Section */}
      <section id="case-study-detail" hidden aria-hidden="true" className="relative min-h-screen flex items-center px-4 md:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Title and info */}
            <div>
              <p className={`mb-6 text-sm uppercase tracking-[0.3em] text-[#2563EB] transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Case Study
              </p>

              <h1 className={`mb-6 text-5xl font-black tracking-tight text-slate-950 transition-all duration-700 delay-200 md:text-6xl lg:text-7xl ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Nexus
              </h1>

              <p className={`mb-10 text-lg leading-relaxed text-slate-600 transition-all duration-700 delay-300 md:text-xl ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Ask once. Get one answer backed by multiple AI models.
              </p>

              {/* Project Meta */}
              <div className={`grid grid-cols-2 gap-x-8 gap-y-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-sm shadow-[0_16px_36px_-28px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div>
                  <p className="mb-1 uppercase tracking-wider text-slate-500">Role</p>
                  <p className="text-slate-900">Product Designer</p>
                </div>
                <div>
                  <p className="mb-1 uppercase tracking-wider text-slate-500">Duration</p>
                  <p className="text-slate-900">10 weeks</p>
                </div>
                <div>
                  <p className="mb-1 uppercase tracking-wider text-slate-500">Tools</p>
                  <p className="text-slate-900">Figma, Cursor, Lovable</p>
                </div>
                <div>
                  <p className="mb-1 uppercase tracking-wider text-slate-500">Context</p>
                  <p className="text-slate-900">Internship Project</p>
                </div>
              </div>
            </div>

            {/* Right side - Laptop Mockup */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative group">
                {/* Laptop Frame */}
                <div className="relative">
                  {/* Screen lid - dark frame to blend with images */}
                  <div className="relative bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] rounded-t-2xl p-[3px] shadow-lg">
                    {/* Inner black bezel */}
                    <div className="relative bg-[#0a0a0a] rounded-t-xl p-2.5 pb-2">
                      {/* Camera */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#050505] ring-1 ring-[#1a1a1a]">
                        <div className="absolute inset-0.5 rounded-full bg-[#0a1a0a]"></div>
                      </div>

                      {/* Screen */}
                      <div className="relative aspect-[16/10] rounded overflow-hidden bg-[#0a0a0f] shadow-inner">
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

                        {/* Navigation arrows - visible on mobile, hover on desktop */}
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
                    <div className="h-1.5 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-sm shadow-md"></div>

                    {/* Bottom case */}
                    <div className="h-4 bg-gradient-to-b from-[#1a1a1a] via-[#151515] to-[#0a0a0a] rounded-b-2xl shadow-lg">
                      {/* Trackpad notch */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-b from-[#252525] to-[#1a1a1a] rounded-t-lg"></div>
                    </div>
                  </div>

                  {/* Shadow underneath */}
                  <div className="absolute -bottom-4 left-[10%] right-[10%] h-4 bg-black/20 blur-xl rounded-full"></div>
                </div>

                {/* Ambient reflection */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 rounded-3xl -z-10"></div>
              </div>

              {/* Current slide label */}
              <p className="mt-6 text-center text-sm text-slate-500">{demoImages[activeSlide].label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <Section>
        <SectionLabel>01</SectionLabel>
        <SectionTitle>Overview</SectionTitle>
        <div className="nexus-overview-content">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-8">
            Nexus saves students time by running multiple AI models behind the scenes and surfacing only the best answer.
          </p>
          <p className="text-lg text-white/50 leading-relaxed mb-12">
            I designed Nexus during my internship as a unified AI platform for students. One question, one place. Multiple AIs run in parallel and compare responses; the strongest answer wins. No more tab hopping between ChatGPT, Claude, and Gemini.
          </p>

          {/* Problem Statement Box */}
          <div className="nexus-problem-statement" aria-label="Nexus design question">
            {/* Label */}
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Problem Statement</p>

            <p className="text-xl md:text-2xl lg:text-[1.7rem] text-white/90 leading-relaxed font-light">
              How might we give students one accurate answer by aggregating and comparing responses from multiple AI models?
            </p>
          </div>
        </div>
      </Section>

      {/* Design Process Timeline */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Design Process</SectionTitle>
        <p className="nexus-section-lede">10-Week Timeline</p>

        <p className="study-diagram-hint">Scroll horizontally to explore the 10-week timeline.</p>
        <div className="relative max-w-5xl nexus-timeline" role="region" aria-label="Nexus 10-week design timeline" tabIndex={0}>
          {/* Week labels */}
          <div className="nexus-timeline-weeks grid grid-cols-10">
            {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'].map((week, i) => (
              <div key={i} className="text-center">
                <span className="text-white/50 text-xs">{week}</span>
              </div>
            ))}
          </div>

          {/* Timeline with dotted lines */}
          <div className="relative">
            {/* Vertical dotted lines */}
            <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="flex justify-center">
                  <div
                    className="w-px h-full"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, rgba(59,130,246,0.3) 50%, transparent 50%)',
                      backgroundSize: '1px 8px',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Timeline bars */}
            <div className="nexus-timeline-bars relative">
              {/* User Research - Week 1-2 */}
              <div className="grid grid-cols-10">
                <div className="col-span-2 pr-1">
                  <a
                    href="#research"
                    className="block rounded-full py-3 px-3 text-center text-xs text-white/90 cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    User Research
                  </a>
                </div>
              </div>

              {/* Lo-Fi Wireframes - Week 2-4 */}
              <div className="grid grid-cols-10">
                <div className="col-start-2 col-span-3 px-1">
                  <a
                    href="#lofi"
                    className="block rounded-full py-3 px-3 text-center text-xs text-white/90 cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Lo-Fi Wireframes
                  </a>
                </div>
              </div>

              {/* Mid-Fi Design - Week 4-6 */}
              <div className="grid grid-cols-10">
                <div className="col-start-4 col-span-3 px-1">
                  <a
                    href="#midfi"
                    className="block rounded-full py-3 px-3 text-center text-xs text-white/90 cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Mid-Fi Design
                  </a>
                </div>
              </div>

              {/* Hi-Fi Prototypes - Week 5-8 */}
              <div className="grid grid-cols-10">
                <div className="col-start-5 col-span-4 px-1">
                  <a
                    href="#hifi"
                    className="block rounded-full py-3 px-3 text-center text-xs text-white/90 cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Hi-Fi Prototypes
                  </a>
                </div>
              </div>

              {/* Testing & Iteration - Week 7-9 */}
              <div className="grid grid-cols-10">
                <div className="col-start-7 col-span-3 px-1">
                  <a
                    href="#hifi"
                    className="block rounded-full py-3 px-3 text-center text-xs text-white/90 cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Testing & Iteration
                  </a>
                </div>
              </div>

              {/* Final Polish - Week 9-10 */}
              <div className="grid grid-cols-10">
                <div className="col-start-9 col-span-2 px-1">
                  <a
                    href="#product-walkthrough"
                    className="block rounded-full py-3 px-3 text-center text-xs text-white/90 cursor-pointer transition-opacity hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    Final Polish
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Research */}
      <Section id="research">
        <SectionLabel>03</SectionLabel>
        <SectionTitle>Research</SectionTitle>

        <div className="nexus-research-intro">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-6">Research Goals</h3>
          <p className="text-lg text-white/60 leading-relaxed">
            Students use multiple AI tools for homework but waste time switching between them. I wanted to understand how they use AI, where they get stuck, and what would make answers feel more reliable.
          </p>
        </div>

        {/* User Surveys */}
        <div className="nexus-survey-heading">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-8">User Surveys</h3>
          <p className="text-white/40 text-sm mb-12">Survey sample: n = 48 college students<Footnote id={1}>Distributed via campus channels. Mix of undergrad and grad students. 12-question survey on AI tool usage, pain points, and study habits.</Footnote></p>
        </div>

        <div className="nexus-survey-grid">
          {/* AI Tools Students Use for Studying */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">AI Tools Students Use for Studying</h4>
            <div className="space-y-4">
              {[
                { label: 'ChatGPT', value: 82, color: '#3b82f6' },
                { label: 'Claude', value: 45, color: '#3b82f6' },
                { label: 'Gemini', value: 38, color: '#60a5fa' },
                { label: 'Copilot', value: 29, color: '#93c5fd' },
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
            <p className="text-white/60 text-xs mt-4 leading-relaxed">
              Most use multiple tools but waste time switching.
            </p>
          </div>

          {/* Pain Points */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Top Pain Points</h4>
            <div className="space-y-3">
              {[
                { label: 'Conflicting answers', value: 72, color: '#2563eb' },
                { label: 'Fact-checking AI answers', value: 65, color: '#3b82f6' },
                { label: 'Tab hopping', value: 58, color: '#3b82f6' },
                { label: 'Slow research', value: 45, color: '#60a5fa' },
                { label: 'Wrong model choice', value: 38, color: '#93c5fd' },
                { label: 'Cost concerns', value: 24, color: '#bfdbfe' },
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
            <p className="text-white/60 text-xs mt-4 leading-relaxed">
              Conflicting answers and manual comparison are the top frustrations.
            </p>
          </div>

          {/* Use Cases - Pie Chart */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6">Primary Use Cases</h4>
            <div className="flex items-center gap-6">
              {/* Pie Chart */}
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Homework help 38% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#2563eb"
                    strokeWidth="20"
                    strokeDasharray="95.5 251.2"
                    strokeDashoffset="0"
                  />
                  {/* Research & fact-checking 30% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray="75.4 251.2"
                    strokeDashoffset="-95.5"
                  />
                  {/* Studying & explanations 20% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#93c5fd"
                    strokeWidth="20"
                    strokeDasharray="50.2 251.2"
                    strokeDashoffset="-170.9"
                  />
                  {/* Writing support 12% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="transparent"
                    stroke="#bfdbfe"
                    strokeWidth="20"
                    strokeDasharray="30.1 251.2"
                    strokeDashoffset="-221.1"
                  />
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {[
                  { label: 'Homework help', value: '38%', color: '#2563eb' },
                  { label: 'Research', value: '30%', color: '#3b82f6' },
                  { label: 'Studying', value: '20%', color: '#93c5fd' },
                  { label: 'Writing', value: '12%', color: '#bfdbfe' },
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
            <p className="text-white/60 text-xs mt-4 leading-relaxed">
              AI supports homework, research, studying, and writing.
            </p>
          </div>
        </div>

        {/* Key Insight */}
        <div className="nexus-research-insight" aria-label="Research key insight">
          <p className="text-[#60a5fa] text-xs font-semibold uppercase tracking-widest mb-3">Key Insight</p>
          <p className="text-white/70 leading-relaxed mb-4">
            Three main pain points:
          </p>
          <ul className="space-y-2 text-white/60 text-sm leading-relaxed">
            <li><span className="text-white/80 font-medium">Tool fatigue:</span> 82% use ChatGPT, but over half also check Claude or Gemini to verify answers.</li>
            <li><span className="text-white/80 font-medium">Conflicting answers:</span> 72% cited this as a major frustration; students don&apos;t know which response to trust.</li>
            <li><span className="text-white/80 font-medium">Manual comparison:</span> copying prompts between tabs and sifting through responses is slow and exhausting.</li>
          </ul>
        </div>

        {/* Competitive Analysis */}
        <div className="nexus-research-chapter" id="competitive-analysis" aria-labelledby="nexus-competitive-title">
          <h3 id="nexus-competitive-title" className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Competitive Analysis</h3>
          <p className="text-white/40 text-sm mb-10">Evaluating existing AI platforms</p>
          <p className="study-comparison-hint">Scroll sideways to compare all five columns →</p>
          <div className="nexus-competitive-table study-comparison-table" role="region" aria-label="AI platforms comparison" tabIndex={0}>
            {/* Comparison Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="text-white/40 text-xs uppercase tracking-wider">Platform</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Multi-Model</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Aggregated</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Output</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">Gap</div>
            </div>

            {/* ChatGPT */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="font-medium text-slate-900">ChatGPT</p>
                <p className="text-white/30 text-xs mt-1">OpenAI</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Single model</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Self-reported</span>
              </div>
              <p className="text-white/40 text-sm">Locked ecosystem</p>
            </div>

            {/* Claude */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="font-medium text-slate-900">Claude</p>
                <p className="text-white/30 text-xs mt-1">Anthropic</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Single model</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Self-reported</span>
              </div>
              <p className="text-white/40 text-sm">Single model only</p>
            </div>

            {/* Poe */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="font-medium text-slate-900">Poe</p>
                <p className="text-white/30 text-xs mt-1">Quora</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Multiple</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">◐</span>
                <span className="text-white/50 text-sm">Separate model outputs</span>
              </div>
              <p className="text-white/40 text-sm">User must compare responses manually</p>
            </div>

            {/* OpenRouter */}
            <div className="grid grid-cols-5 gap-4 py-5 border-b border-white/5 items-start">
              <div>
                <p className="font-medium text-slate-900">OpenRouter</p>
                <p className="text-white/30 text-xs mt-1">API Gateway</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">All models</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">None</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">○</span>
                <span className="text-white/50 text-sm">Raw output</span>
              </div>
              <p className="text-white/40 text-sm">Infrastructure only, no answer synthesis</p>
            </div>

            {/* Nexus (The Solution) */}
            <div className="grid grid-cols-5 gap-4 py-5 bg-[#3b82f6]/5 rounded-xl px-4 mt-4 items-start">
              <div>
                <p className="text-[#60a5fa] font-medium">Nexus</p>
                <p className="text-[#60a5fa]/50 text-xs mt-1">All-in-one</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">All models</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Aggregated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-white/50 text-sm">Consensus-backed</span>
              </div>
              <p className="text-[#60a5fa]/70 text-sm font-medium">Nexus closes this gap</p>
            </div>
          </div>

          {/* Key Finding */}
          <div className="nexus-comparison-takeaway">
            <p className="text-white/50 leading-relaxed">
              Most platforms offer either one model (ChatGPT, Claude) or many models with separate outputs (Poe, OpenRouter). None aggregate responses into one answer. Nexus fills this gap by running multiple AIs behind the scenes and surfacing only what they agree on.
            </p>
          </div>
        </div>

        {/* Affinity Mapping */}
        <div className="nexus-research-chapter" id="affinity-mapping" aria-labelledby="nexus-affinity-title">
          <h3 id="nexus-affinity-title" className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Affinity Mapping</h3>
          <p className="text-white/40 text-sm mb-6">Synthesizing Research Insights</p>

          <p className="text-white/50 leading-relaxed max-w-3xl mb-8">
            Survey and interview data revealed three themes:
          </p>

          <ul className="nexus-affinity-themes text-white/50 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
              <span><span className="text-white/80 font-medium">Confidence:</span> Students don't trust one AI. They want consensus before using an answer.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
              <span><span className="text-white/80 font-medium">Comparison:</span> Manually comparing answers across tools is exhausting.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
              <span><span className="text-white/80 font-medium">Simplicity:</span> One clear answer beats multiple conflicting ones.</span>
            </li>
          </ul>

          {/* Affinity Map Grid */}
          <div className="nexus-affinity-grid grid">

            {/* Confidence Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#60a5fa] mb-8 text-center">Confidence</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#bfdbfe',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Uses ChatGPT for homework but second-guesses answers before submitting assignments.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants to use AI for studying but needs to trust the answers are actually correct.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"ChatGPT gave me a wrong formula for my physics exam. Never trusting one AI again."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"Every answer sounds confident. How am I supposed to know which ones are actually right?"</p>
                </div>
                {/* UX Principle - Blue */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#93c5fd',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Confidence comes from consensus. If multiple AIs agree, the answer is more likely correct.</p>
                </div>
                {/* Opportunity - Orange */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fdba74',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Show which models contributed. Surface the strongest consensus-based answer.</p>
                </div>
              </div>
            </div>

            {/* Comparison Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#60a5fa] mb-8 text-center">Comparison</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#bfdbfe',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Asks the same question to multiple AIs, then tries to figure out which answer is actually correct.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants confidence that answers are accurate, not just fast. Needs reliable information for schoolwork.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"Claude said one thing, ChatGPT said another. I just picked randomly."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"I spend 20 minutes comparing answers across tools. That's longer than just Googling it."</p>
                </div>
                {/* UX Principle - Blue */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#93c5fd',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Comparison should happen automatically. Users want one clear answer, not multiple options to sort through.</p>
                </div>
                {/* Opportunity - Orange */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fdba74',
                    boxShadow: '4px 4px 12px rgba(253,186,116,0.4)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Run multiple AIs behind the scenes, compare responses, surface the strongest consensus answer.</p>
                </div>
              </div>
            </div>

            {/* Simplicity Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#60a5fa] mb-8 text-center">Simplicity</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* User Behavior - Pink */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#bfdbfe',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Opens multiple browser tabs for ChatGPT, Claude, and Google. Homework takes twice as long.</p>
                </div>
                {/* Needs/Goals - Green */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants one place to get accurate answers. No tab hopping, no mental overhead.</p>
                </div>
                {/* Pain Point - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"I have 6 tabs open just to do homework. It's exhausting."</p>
                </div>
                {/* Pain Point 2 - Yellow */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">"By the time I read 3 different AI answers, I forgot what I was even asking."</p>
                </div>
                {/* UX Principle - Blue */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#93c5fd',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Complexity should happen behind the scenes. Users just want the answer.</p>
                </div>
                {/* Opportunity - Orange */}
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fdba74',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">One input, one consolidated output. All the multi-model processing happens invisibly in the background.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <ul className="nexus-affinity-legend" aria-label="Affinity map color key">
            <li>
              <span aria-hidden="true" style={{ backgroundColor: '#bfdbfe' }} />
              User Behavior
            </li>
            <li>
              <span aria-hidden="true" style={{ backgroundColor: '#a7d89c' }} />
              Needs / Goals
            </li>
            <li>
              <span aria-hidden="true" style={{ backgroundColor: '#fef08a' }} />
              Pain Point
            </li>
            <li>
              <span aria-hidden="true" style={{ backgroundColor: '#93c5fd' }} />
              UX Principle
            </li>
            <li>
              <span aria-hidden="true" style={{ backgroundColor: '#fdba74' }} />
              Opportunity
            </li>
          </ul>

          {/* Synthesis */}
          <div className="nexus-affinity-synthesis">
            <h4 className="text-[#60a5fa] text-lg font-medium mb-4">Key Insight</h4>
            <p className="text-white/50 leading-relaxed">
              Students want one clear answer, not a choice between models. Our solution: run multiple AIs behind the scenes, find where they agree, and surface only the consensus-backed<Footnote id={2}>Responses are compared across models; answers that align are prioritized. Outliers are filtered before surfacing the final result.</Footnote> answer.
            </p>
          </div>
        </div>

        {/* User Flows */}
        <div className="nexus-research-chapter nexus-product-flow" id="core-product-flow" aria-labelledby="nexus-flow-title">
          <h3 id="nexus-flow-title">Core Product Flow</h3>
          <p>Two connected journeys: reach the workspace, then ask a question. Model comparison happens behind the scenes.</p>

          <div className="nexus-journeys">
            <section className="nexus-journey" aria-labelledby="nexus-onboarding-title">
              <header className="nexus-journey-heading">
                <span aria-hidden="true">01</span>
                <div>
                  <h4 id="nexus-onboarding-title">Onboarding</h4>
                  <p>From discovering Nexus to entering the workspace.</p>
                </div>
              </header>
              <NexusFlowSteps label="Onboarding steps" steps={[
                { label: 'Landing Page', kind: 'entry', caption: 'Discover' },
                { label: 'Sign Up', kind: 'action', caption: 'Your action' },
                { label: 'Choose Plan', kind: 'action', caption: 'Your action' },
                { label: 'Dashboard', kind: 'result', caption: 'Workspace ready' },
              ]} />
            </section>

            <section className="nexus-journey" aria-labelledby="nexus-chat-title">
              <header className="nexus-journey-heading">
                <span aria-hidden="true">02</span>
                <div>
                  <h4 id="nexus-chat-title">Main Chat Interface</h4>
                  <p>One question in; one consolidated answer out.</p>
                </div>
              </header>
              <NexusFlowSteps label="Main chat steps" steps={[
                { label: 'Dashboard', kind: 'entry', caption: 'Start here' },
                { label: 'Enter Question', kind: 'action', caption: 'Your action' },
                { label: 'Run AI Models', kind: 'processing', caption: 'AI processing' },
                { label: 'Compare Responses', kind: 'processing', caption: 'AI processing' },
                { label: 'Final Answer', kind: 'result', caption: 'Your result' },
              ]} />
              <div className="nexus-model-access" aria-label="Model access by plan">
                <p>Same journey, different model access</p>
                <dl>
                  <div><dt>Free</dt><dd>2–3 models</dd></div>
                  <div><dt>Paid</dt><dd>All models</dd></div>
                </dl>
              </div>
            </section>
          </div>
        </div>

        {/* Low Fidelity Designs */}
        <div id="lofi" className="nexus-research-chapter nexus-lofi-chapter">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Low Fidelity Designs</h3>
          <p className="text-white/40 text-sm mb-6">Early Explorations</p>

          <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
            I sketched flows around the core idea: ask once, get one answer. The challenge: hide multi-model complexity while building trust.
          </p>

          {/* Lo-Fi Wireframe Flows - Hand-drawn iPad Sketches */}
          <div className="nexus-wireframe-grid">
            {/* Onboarding Lo-Fi */}
            <div>
              <p className="text-[#60a5fa] text-sm font-medium mb-4 tracking-wide">Onboarding Flow</p>
              <div className="rounded-xl overflow-hidden bg-[#fefcf8] p-6 border border-[#e8e4dc]">
                <svg viewBox="0 0 400 480" className="w-full h-auto">
                  <defs>
                    <filter id="pencilSketch" x="-5%" y="-5%" width="110%" height="110%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                    </filter>
                  </defs>

                  {/* Row 1 Labels */}
                  <text x="15" y="16" fill="#777" fontSize="10" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">hero</text>
                  <text x="220" y="16" fill="#777" fontSize="10" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">features</text>

                  {/* Screen 1: Hero/Landing Page */}
                  <g transform="translate(10, 24)">
                    <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Nav bar */}
                    <path d="M 12 10 Q 30 8, 45 12" stroke="#555" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    <path d="M 140 9 Q 155 7, 165 13 Q 168 19, 155 21 Q 142 19, 140 9" fill="none" stroke="#666" strokeWidth="1.2" filter="url(#pencilSketch)"/>

                    {/* Hero headline */}
                    <path d="M 30 30 Q 88 26, 145 33" stroke="#444" strokeWidth="2.2" filter="url(#pencilSketch)"/>
                    <path d="M 45 42 Q 88 38, 130 45" stroke="#555" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Subtitle */}
                    <path d="M 35 54 Q 88 50, 140 56" stroke="#bbb" strokeWidth="1" filter="url(#pencilSketch)"/>

                    {/* User avatars */}
                    <circle cx="72" cy="66" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <circle cx="82" cy="66" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <circle cx="92" cy="66" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>

                    {/* Input field */}
                    <path d="M 25 76 Q 28 71, 148 73 Q 154 77, 151 84 Q 146 90, 31 88 Q 25 84, 25 76" fill="none" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch)"/>
                    <circle cx="140" cy="80" r="4" fill="none" stroke="#444" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                  </g>

                  {/* Arrow */}
                  <path d="M 193 68 Q 203 65, 207 71" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#pencilSketch)"/>
                  <path d="M 203 65 L 209 71 L 201 75" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#pencilSketch)"/>

                  {/* Screen 2: Features Section */}
                  <g transform="translate(215, 24)">
                    <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Section title */}
                    <path d="M 40 15 Q 88 11, 135 17" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    <path d="M 55 26 Q 88 22, 120 28" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>

                    {/* Three feature cards */}
                    <path d="M 15 40 Q 18 36, 52 38 Q 56 42, 54 68 Q 50 72, 18 70 Q 15 66, 15 40" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <path d="M 25 50 Q 35 48, 45 52" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>

                    <path d="M 62 40 Q 65 36, 110 38 Q 115 42, 113 68 Q 108 72, 66 70 Q 62 66, 62 40" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <path d="M 72 50 Q 88 48, 102 52" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>

                    <path d="M 120 40 Q 123 36, 162 38 Q 167 42, 165 68 Q 160 72, 125 70 Q 120 66, 120 40" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>

                    {/* Model icons row */}
                    <circle cx="50" cy="82" r="4" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <circle cx="70" cy="82" r="4" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <circle cx="90" cy="82" r="4" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <circle cx="110" cy="82" r="4" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                  </g>

                  {/* Row 2 Labels */}
                  <text x="15" y="130" fill="#777" fontSize="10" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">testimonial</text>
                  <text x="220" y="130" fill="#777" fontSize="10" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">success stories</text>

                  {/* Screen 3: Testimonial */}
                  <g transform="translate(10, 138)">
                    <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Big quote mark */}
                    <text x="18" y="30" fill="#ccc" fontSize="24" fontFamily="Georgia, serif">"</text>

                    {/* Quote lines */}
                    <path d="M 42 20 Q 100 16, 155 23" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 38 32 Q 100 28, 160 35" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 42 44 Q 100 40, 145 47" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch)"/>

                    {/* Author */}
                    <circle cx="88" cy="62" r="9" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 60 78 Q 88 74, 115 80" stroke="#666" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <path d="M 55 85" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                  </g>

                  {/* Arrow */}
                  <path d="M 193 182 Q 203 179, 207 185" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#pencilSketch)"/>
                  <path d="M 203 179 L 209 185 L 201 189" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#pencilSketch)"/>

                  {/* Screen 4: Success Stories */}
                  <g transform="translate(215, 138)">
                    <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Header */}
                    <path d="M 40 12 Q 88 8, 135 15" stroke="#444" strokeWidth="1.5" filter="url(#pencilSketch)"/>

                    {/* Story cards stacked */}
                    <path d="M 25 26 Q 28 22, 150 24 Q 155 28, 153 62 Q 148 68, 30 65 Q 25 60, 25 26" fill="none" stroke="#666" strokeWidth="1.2" filter="url(#pencilSketch)"/>

                    {/* Avatar */}
                    <circle cx="140" cy="42" r="10" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>

                    {/* Text lines */}
                    <path d="M 35 35 Q 70 32, 100 38" stroke="#555" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <path d="M 35 45 Q 80 42, 115 48" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <path d="M 35 55 Q 75 52, 105 58" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch)"/>

                    {/* Stats */}
                    <path d="M 40 72 Q 43 68, 75 70 Q 78 74, 76 82 Q 72 86, 43 84 Q 40 80, 40 72" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <path d="M 85 72 Q 88 68, 120 70 Q 123 74, 121 82 Q 117 86, 88 84 Q 85 80, 85 72" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                  </g>

                  {/* Row 3 Labels */}
                  <text x="15" y="244" fill="#777" fontSize="10" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">reviews</text>
                  <text x="220" y="244" fill="#777" fontSize="10" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">sign up</text>

                  {/* Screen 5: Reviews */}
                  <g transform="translate(10, 252)">
                    <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Header */}
                    <path d="M 30 12 Q 88 8, 145 15" stroke="#444" strokeWidth="1.5" filter="url(#pencilSketch)"/>

                    {/* Review cards row */}
                    <path d="M 12 26 Q 15 22, 52 24 Q 56 28, 54 68 Q 50 72, 16 70 Q 12 66, 12 26" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <circle cx="33" cy="38" r="5" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <path d="M 18 50 Q 33 47, 48 53" stroke="#aaa" strokeWidth="0.6" filter="url(#pencilSketch)"/>
                    <path d="M 18 58 Q 33 55, 45 61" stroke="#bbb" strokeWidth="0.5" filter="url(#pencilSketch)"/>

                    <path d="M 62 26 Q 65 22, 112 24 Q 117 28, 115 68 Q 110 72, 66 70 Q 62 66, 62 26" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <circle cx="88" cy="38" r="5" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <path d="M 68 50 Q 88 47, 108 53" stroke="#aaa" strokeWidth="0.6" filter="url(#pencilSketch)"/>

                    <path d="M 122 26 Q 125 22, 165 24 Q 170 28, 168 68 Q 163 72, 126 70 Q 122 66, 122 26" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <circle cx="145" cy="38" r="5" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <path d="M 128 50 Q 145 47, 162 53" stroke="#aaa" strokeWidth="0.6" filter="url(#pencilSketch)"/>

                    {/* Stars hint */}
                    <path d="M 60 80 Q 72 77, 88 82 Q 100 77, 115 82" stroke="#bbb" strokeWidth="0.6" filter="url(#pencilSketch)"/>
                  </g>

                  {/* Arrow */}
                  <path d="M 193 296 Q 203 293, 207 299" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#pencilSketch)"/>
                  <path d="M 203 293 L 209 299 L 201 303" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#pencilSketch)"/>

                  {/* Screen 6: Sign Up */}
                  <g transform="translate(215, 252)">
                    <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Modal box */}
                    <path d="M 20 15 Q 23 10, 155 12 Q 161 18, 159 78 Q 154 85, 25 82 Q 20 76, 20 15" fill="none" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch)"/>

                    {/* Title */}
                    <path d="M 50 26 Q 88 22, 125 29" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Form fields */}
                    <path d="M 32 40 Q 36 36, 142 38 Q 146 42, 144 50 Q 140 54, 36 52 Q 32 48, 32 40" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 32 58 Q 36 54, 142 56 Q 146 60, 144 68 Q 140 72, 36 70 Q 32 66, 32 58" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                  </g>

                  {/* Row 4 Labels */}
                  <text x="15" y="358" fill="#777" fontSize="10" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">pricing</text>

                  {/* Screen 7: Pricing */}
                  <g transform="translate(10, 366)">
                    <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch)"/>

                    {/* Pricing cards */}
                    <path d="M 15 12 Q 18 8, 52 10 Q 56 14, 54 65 Q 50 71, 18 68 Q 15 63, 15 12" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 22 20 Q 38 17, 48 22" stroke="#555" strokeWidth="1" filter="url(#pencilSketch)"/>
                    <path d="M 25 32 Q 35 30, 45 34" stroke="#aaa" strokeWidth="0.6" filter="url(#pencilSketch)"/>
                    <path d="M 25 42 Q 35 40, 45 44" stroke="#aaa" strokeWidth="0.6" filter="url(#pencilSketch)"/>
                    <path d="M 22 56 Q 35 53, 48 58" stroke="#bbb" strokeWidth="0.8" filter="url(#pencilSketch)"/>

                    <path d="M 62 12 Q 66 8, 115 10 Q 120 14, 118 65 Q 113 71, 68 68 Q 62 63, 62 12" fill="none" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch)"/>
                    <path d="M 72 20 Q 92 17, 108 22" stroke="#444" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 75 32 Q 88 30, 105 34" stroke="#666" strokeWidth="0.8" filter="url(#pencilSketch)"/>
                    <path d="M 75 42 Q 88 40, 105 44" stroke="#666" strokeWidth="0.8" filter="url(#pencilSketch)"/>

                    <path d="M 125 12 Q 128 8, 162 10 Q 167 14, 165 65 Q 160 71, 130 68 Q 125 63, 125 12" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch)"/>
                    <path d="M 132 20 Q 148 17, 158 22" stroke="#555" strokeWidth="1" filter="url(#pencilSketch)"/>

                    <text x="65" y="82" fill="#888" fontSize="7" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"pick plan"</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Product Experience Lo-Fi */}
            <div>
              <p className="text-[#60a5fa] text-sm font-medium mb-4 tracking-wide">Product Experience</p>
              <div className="rounded-xl overflow-hidden bg-[#fefcf8] p-6 border border-[#e8e4dc]">
                <svg viewBox="0 0 400 280" className="w-full h-auto">
                  <defs>
                    <filter id="pencilSketch2" x="-5%" y="-5%" width="110%" height="110%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                    </filter>
                  </defs>

                  {/* Label */}
                  <text x="15" y="18" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">chat interface</text>
                  <text x="220" y="18" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">model selector</text>

                  {/* Screen 1: Chat Interface */}
                  <g transform="translate(10, 28)">
                    <path d="M 3 2 Q 1 5, 2 118 Q 4 123, 172 121 Q 177 118, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch2)"/>

                    {/* Sidebar */}
                    <path d="M 8 8 Q 10 5, 45 7 Q 48 10, 46 115 Q 43 118, 10 116 Q 8 112, 8 8" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 15 18 Q 25 16, 38 20" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <path d="M 15 28 Q 28 26, 40 30" stroke="#bbb" strokeWidth="0.6" filter="url(#pencilSketch2)"/>
                    <path d="M 15 38 Q 28 36, 40 40" stroke="#bbb" strokeWidth="0.6" filter="url(#pencilSketch2)"/>

                    {/* Top bar */}
                    <path d="M 55 12 Q 70 10, 95 14 Q 100 18, 95 22 Q 85 24, 58 20" fill="none" stroke="#666" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 105 12 Q 118 10, 128 14 Q 132 18, 128 22 Q 120 24, 108 20" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>

                    {/* Greeting */}
                    <path d="M 70 55 Q 110 52, 150 58" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch2)"/>
                    <path d="M 85 68 Q 110 65, 135 70" stroke="#888" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    {/* Message input */}
                    <path d="M 55 90 Q 58 85, 165 87 Q 172 92, 168 105 Q 162 112, 62 108 Q 55 102, 55 90" fill="none" stroke="#444" strokeWidth="1.8" filter="url(#pencilSketch2)"/>
                    <path d="M 68 98 Q 95 95, 120 100" stroke="#ccc" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <circle cx="158" cy="98" r="5" fill="none" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    {/* Model indicator */}
                    <path d="M 85 115 Q 88 112, 135 114 Q 140 118, 135 122 Q 128 124, 90 122 Q 85 118, 85 115" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <circle cx="95" cy="118" r="3" fill="none" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <circle cx="105" cy="118" r="3" fill="none" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>

                    <text x="50" y="138" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"good afternoon"</text>
                  </g>

                  {/* Arrow */}
                  <path d="M 193 85 Q 203 82, 207 88" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#pencilSketch2)"/>
                  <path d="M 203 82 L 209 88 L 201 92" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#pencilSketch2)"/>

{/* Screen 2: Model Selector */}
                  <g transform="translate(215, 28)">
                    <path d="M 3 2 Q 1 5, 2 118 Q 4 123, 172 121 Q 177 118, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch2)"/>

                    {/* Dropdown panel */}
                    <path d="M 25 30 Q 28 25, 150 27 Q 156 32, 154 110 Q 150 116, 30 113 Q 25 108, 25 30" fill="none" stroke="#555" strokeWidth="1.5" filter="url(#pencilSketch2)"/>

                    {/* Title */}
                    <path d="M 35 40 Q 88 36, 140 42" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>

                    {/* Model options - simple circles with text */}
                    <circle cx="45" cy="55" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 55 52 Q 85 49, 110 55" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    <circle cx="45" cy="72" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 55 69 Q 85 66, 105 72" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    <circle cx="45" cy="89" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 55 86 Q 75 83, 90 89" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    {/* Fourth model option */}
                    <circle cx="45" cy="103" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 55 100 Q 95 97, 130 103" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>

                    <text x="45" y="135" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"5 models"</text>
                  </g>

                  {/* Row 2 */}
                  <text x="15" y="175" fill="#777" fontSize="11" fontFamily="Comic Sans MS, Marker Felt, cursive" fontStyle="italic">response</text>

                  {/* Screen 3: Response View */}
                  <g transform="translate(10, 185)">
                    <path d="M 3 2 Q 1 5, 2 78 Q 4 83, 172 81 Q 177 78, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#pencilSketch2)"/>

                    {/* Sidebar hint */}
                    <path d="M 8 8 Q 10 5, 45 7 Q 48 10, 46 75" fill="none" stroke="#ccc" strokeWidth="0.8" filter="url(#pencilSketch2)"/>

                    {/* Response bubble */}
                    <path d="M 55 15 Q 58 10, 165 12 Q 172 18, 168 58 Q 162 65, 62 62 Q 55 56, 55 15" fill="none" stroke="#555" strokeWidth="1.2" filter="url(#pencilSketch2)"/>
                    <path d="M 65 25 Q 110 22, 155 28" stroke="#888" strokeWidth="1" filter="url(#pencilSketch2)"/>
                    <path d="M 65 35 Q 120 32, 158 38" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <path d="M 65 45 Q 100 42, 130 48" stroke="#aaa" strokeWidth="0.8" filter="url(#pencilSketch2)"/>

                    {/* Model badges */}
                    <circle cx="72" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <circle cx="85" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#pencilSketch2)"/>
                    <circle cx="98" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#pencilSketch2)"/>

                    <text x="55" y="95" fill="#888" fontSize="8" fontFamily="Comic Sans MS, cursive" fontStyle="italic">"consolidated answer"</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Lo-Fi Description */}
          <p className="nexus-artifact-caption">
            iPad sketches to explore layouts and flows. Focus: enter question, see which models run, get one answer. Quick way to validate the one-input concept.
          </p>
        </div>

        {/* Mid-Fidelity Prototypes */}
        <div id="midfi" className="nexus-research-chapter nexus-prototype-chapter">
          <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">Mid-Fidelity Prototypes</h3>
          <p className="text-white/40 text-sm mb-6">Refining the Experience</p>

          <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
            Mid-fi wireframes to lock down layout and interactions before high-fidelity. Grayscale mockups for testing and feedback.
          </p>

          {/* Mid-Fi Wireframes - Clean Digital Mockups */}
          <div className="nexus-wireframe-grid">
            {/* Onboarding Mid-Fi */}
            <div>
              <p className="text-[#60a5fa] text-sm font-medium mb-4 tracking-wide">Onboarding Flow</p>
              <div className="rounded-xl overflow-hidden bg-[#1e1e1e] p-6 border border-[#333]">
                <svg viewBox="0 0 400 520" className="w-full h-auto">
                  <defs>
                    <marker id="cleanArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                      <path d="M 0 0 L 8 3 L 0 6 Z" fill="#666"/>
                    </marker>
                  </defs>

                  {/* Figma-style background grid */}
                  <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a2a2a" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="400" height="520" fill="url(#grid1)"/>

                  {/* Row 1 Labels */}
                  <text x="15" y="18" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Hero</text>
                  <text x="215" y="18" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Features</text>

                  {/* Screen 1: Hero */}
                  <g transform="translate(10, 25)">
                    <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Nav */}
                    <rect x="8" y="6" width="35" height="5" rx="1" fill="#fff"/>
                    <rect x="130" y="5" width="18" height="7" rx="1" fill="#333"/>
                    <rect x="152" y="5" width="18" height="7" rx="3.5" fill="#fff"/>

                    {/* Hero content */}
                    <rect x="30" y="25" width="115" height="7" rx="1" fill="#fff"/>
                    <rect x="45" y="37" width="85" height="5" rx="1" fill="#666"/>

                    {/* Subtitle */}
                    <rect x="35" y="48" width="105" height="4" rx="1" fill="#444"/>

                    {/* Avatars */}
                    <circle cx="68" cy="60" r="4" fill="#333"/>
                    <circle cx="78" cy="60" r="4" fill="#444"/>
                    <circle cx="88" cy="60" r="4" fill="#555"/>
                    <rect x="96" y="58" width="30" height="4" rx="1" fill="#444"/>

                    {/* Input */}
                    <rect x="25" y="72" width="125" height="14" rx="7" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                    <rect x="35" y="77" width="55" height="4" rx="1" fill="#555"/>
                    <circle cx="140" cy="79" r="4" fill="#fff"/>

                    {/* Model badge */}
                    <rect x="55" y="90" width="65" height="6" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                  </g>

                  {/* Arrow */}
                  <path d="M 193 75 L 202 75" stroke="#666" strokeWidth="1" markerEnd="url(#cleanArrow)"/>

                  {/* Screen 2: Features */}
                  <g transform="translate(210, 25)">
                    <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Section header */}
                    <rect x="35" y="10" width="105" height="6" rx="1" fill="#fff"/>
                    <rect x="50" y="20" width="75" height="4" rx="1" fill="#666"/>

                    {/* Three feature cards */}
                    <rect x="10" y="32" width="48" height="45" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="18" y="40" width="30" height="4" rx="1" fill="#888"/>
                    <rect x="16" y="50" width="35" height="3" rx="1" fill="#444"/>
                    <rect x="16" y="56" width="32" height="3" rx="1" fill="#444"/>
                    <rect x="16" y="68" width="36" height="6" rx="3" fill="#333"/>

                    <rect x="64" y="32" width="48" height="45" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="72" y="40" width="30" height="4" rx="1" fill="#888"/>
                    <rect x="70" y="50" width="35" height="3" rx="1" fill="#444"/>
                    <rect x="70" y="56" width="32" height="3" rx="1" fill="#444"/>

                    <rect x="118" y="32" width="48" height="45" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="126" y="40" width="30" height="4" rx="1" fill="#888"/>
                    <rect x="124" y="50" width="35" height="3" rx="1" fill="#444"/>

                    {/* Model icons */}
                    <circle cx="50" cy="88" r="5" fill="#333"/>
                    <circle cx="70" cy="88" r="5" fill="#444"/>
                    <circle cx="90" cy="88" r="5" fill="#555"/>
                    <circle cx="110" cy="88" r="5" fill="#333"/>
                  </g>

                  {/* Row 2 Labels */}
                  <text x="15" y="148" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Testimonial</text>
                  <text x="215" y="148" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Success Stories</text>

                  {/* Screen 3: Testimonial */}
                  <g transform="translate(10, 155)">
                    <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Quote mark */}
                    <text x="15" y="30" fill="#333" fontSize="24" fontFamily="Georgia, serif">"</text>

                    {/* Quote lines */}
                    <rect x="40" y="18" width="120" height="4" rx="1" fill="#888"/>
                    <rect x="35" y="28" width="130" height="4" rx="1" fill="#666"/>
                    <rect x="40" y="38" width="115" height="4" rx="1" fill="#666"/>

                    {/* Author */}
                    <circle cx="88" cy="58" r="10" fill="#333"/>
                    <rect x="60" y="72" width="55" height="5" rx="1" fill="#fff"/>
                    <rect x="55" y="80" width="65" height="4" rx="1" fill="#555"/>
                    <rect x="50" y="88" width="75" height="3" rx="1" fill="#444"/>
                  </g>

                  {/* Arrow */}
                  <path d="M 193 205 L 202 205" stroke="#666" strokeWidth="1" markerEnd="url(#cleanArrow)"/>

                  {/* Screen 4: Success Stories */}
                  <g transform="translate(210, 155)">
                    <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Header */}
                    <rect x="35" y="8" width="105" height="5" rx="1" fill="#fff"/>

                    {/* Story card */}
                    <rect x="15" y="22" width="145" height="55" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>

                    {/* Avatar */}
                    <circle cx="145" cy="42" r="15" fill="#333"/>

                    {/* Text */}
                    <rect x="25" y="32" width="70" height="5" rx="1" fill="#fff"/>
                    <rect x="25" y="42" width="90" height="3" rx="1" fill="#666"/>
                    <rect x="25" y="50" width="80" height="3" rx="1" fill="#666"/>
                    <rect x="25" y="58" width="70" height="3" rx="1" fill="#555"/>

                    {/* Stats */}
                    <rect x="25" y="82" width="50" height="12" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="32" y="86" width="35" height="4" rx="1" fill="#4ade80"/>

                    <rect x="82" y="82" width="50" height="12" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="89" y="86" width="35" height="4" rx="1" fill="#60a5fa"/>
                  </g>

                  {/* Row 3 Labels */}
                  <text x="15" y="278" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Reviews</text>
                  <text x="215" y="278" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Sign Up</text>

                  {/* Screen 5: Reviews */}
                  <g transform="translate(10, 285)">
                    <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Header */}
                    <rect x="25" y="8" width="125" height="5" rx="1" fill="#fff"/>

                    {/* Review cards */}
                    <rect x="8" y="22" width="52" height="65" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <circle cx="34" cy="35" r="8" fill="#333"/>
                    <rect x="18" y="48" width="32" height="4" rx="1" fill="#fff"/>
                    <rect x="14" y="56" width="40" height="3" rx="1" fill="#555"/>
                    <rect x="16" y="62" width="36" height="3" rx="1" fill="#555"/>
                    <rect x="18" y="70" width="32" height="3" rx="1" fill="#555"/>

                    <rect x="65" y="22" width="52" height="65" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <circle cx="91" cy="35" r="8" fill="#444"/>
                    <rect x="75" y="48" width="32" height="4" rx="1" fill="#fff"/>
                    <rect x="71" y="56" width="40" height="3" rx="1" fill="#555"/>
                    <rect x="73" y="62" width="36" height="3" rx="1" fill="#555"/>

                    <rect x="122" y="22" width="45" height="65" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <circle cx="144" cy="35" r="8" fill="#555"/>
                    <rect x="128" y="48" width="32" height="4" rx="1" fill="#fff"/>
                    <rect x="126" y="56" width="36" height="3" rx="1" fill="#555"/>

                    {/* Stars row */}
                    <rect x="55" y="92" width="65" height="4" rx="2" fill="#333"/>
                  </g>

                  {/* Arrow */}
                  <path d="M 193 335 L 202 335" stroke="#666" strokeWidth="1" markerEnd="url(#cleanArrow)"/>

                  {/* Screen 6: Sign Up */}
                  <g transform="translate(210, 285)">
                    <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Dimmed background */}
                    <rect x="0" y="0" width="175" height="100" rx="3" fill="rgba(0,0,0,0.6)"/>

                    {/* Modal */}
                    <rect x="15" y="10" width="145" height="80" rx="6" fill="#141414" stroke="#333" strokeWidth="1"/>

                    {/* Modal title */}
                    <rect x="50" y="18" width="75" height="6" rx="1" fill="#fff"/>

                    {/* Form fields */}
                    <rect x="28" y="32" width="119" height="12" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                    <rect x="34" y="36" width="40" height="4" rx="1" fill="#555"/>

                    <rect x="28" y="50" width="119" height="12" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                    <rect x="34" y="54" width="50" height="4" rx="1" fill="#555"/>

                    {/* Button */}
                    <rect x="40" y="70" width="95" height="14" rx="7" fill="#fff"/>
                    <rect x="62" y="75" width="51" height="4" rx="1" fill="#000"/>
                  </g>

                  {/* Row 4 Label */}
                  <text x="15" y="408" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Pricing</text>

                  {/* Screen 7: Pricing */}
                  <g transform="translate(10, 415)">
                    <rect x="0" y="0" width="175" height="95" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Header */}
                    <rect x="45" y="8" width="85" height="5" rx="1" fill="#fff"/>

                    {/* Pricing cards */}
                    <rect x="8" y="20" width="50" height="68" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="16" y="27" width="32" height="5" rx="1" fill="#666"/>
                    <rect x="16" y="36" width="28" height="4" rx="1" fill="#444"/>
                    <rect x="14" y="45" width="38" height="3" rx="1" fill="#333"/>
                    <rect x="14" y="51" width="38" height="3" rx="1" fill="#333"/>
                    <rect x="14" y="57" width="38" height="3" rx="1" fill="#333"/>
                    <rect x="14" y="75" width="40" height="10" rx="5" fill="#333"/>

                    <rect x="63" y="18" width="50" height="72" rx="4" fill="#141414" stroke="#60a5fa" strokeWidth="1"/>
                    <rect x="71" y="26" width="32" height="5" rx="1" fill="#fff"/>
                    <rect x="71" y="35" width="28" height="4" rx="1" fill="#60a5fa"/>
                    <rect x="69" y="44" width="38" height="3" rx="1" fill="#444"/>
                    <rect x="69" y="50" width="38" height="3" rx="1" fill="#444"/>
                    <rect x="69" y="56" width="38" height="3" rx="1" fill="#444"/>
                    <rect x="69" y="62" width="38" height="3" rx="1" fill="#444"/>
                    <rect x="69" y="77" width="40" height="10" rx="5" fill="#fff"/>

                    <rect x="118" y="20" width="50" height="68" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="126" y="27" width="32" height="5" rx="1" fill="#666"/>
                    <rect x="126" y="36" width="28" height="4" rx="1" fill="#444"/>
                    <rect x="124" y="45" width="38" height="3" rx="1" fill="#333"/>
                    <rect x="124" y="51" width="38" height="3" rx="1" fill="#333"/>
                    <rect x="124" y="75" width="40" height="10" rx="5" fill="#333"/>
                  </g>
                </svg>
              </div>
            </div>

            {/* Product Experience Mid-Fi */}
            <div>
              <p className="text-[#60a5fa] text-sm font-medium mb-4 tracking-wide">Product Experience</p>
              <div className="rounded-xl overflow-hidden bg-[#1e1e1e] p-6 border border-[#333]">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Figma-style background grid */}
                  <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a2a2a" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="400" height="300" fill="url(#grid2)"/>

                  {/* Frame labels */}
                  <text x="15" y="18" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Chat Interface</text>
                  <text x="215" y="18" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Model Selector</text>

                  {/* Screen 1: Chat Interface */}
                  <g transform="translate(10, 25)">
                    <rect x="0" y="0" width="175" height="120" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Sidebar */}
                    <rect x="0" y="0" width="40" height="120" rx="3" fill="#0d0d0d"/>
                    <rect x="6" y="8" width="28" height="6" rx="1" fill="#1a1a1a"/>
                    <rect x="8" y="20" width="24" height="3" rx="1" fill="#333"/>
                    <rect x="8" y="28" width="26" height="3" rx="1" fill="#333"/>
                    <rect x="8" y="36" width="22" height="3" rx="1" fill="#333"/>

                    {/* Top bar */}
                    <rect x="48" y="6" width="50" height="8" rx="2" fill="#1a1a1a"/>
                    <rect x="52" y="9" width="25" height="3" rx="1" fill="#666"/>
                    <rect x="105" y="6" width="28" height="8" rx="2" fill="#1a1a1a"/>
                    <rect x="140" y="6" width="28" height="8" rx="4" fill="#333"/>

                    {/* Greeting */}
                    <rect x="70" y="45" width="80" height="6" rx="1" fill="#666"/>
                    <rect x="85" y="55" width="50" height="5" rx="1" fill="#fff"/>

                    {/* Input field */}
                    <rect x="48" y="78" width="120" height="22" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="56" y="87" width="55" height="4" rx="1" fill="#444"/>
                    <circle cx="156" cy="89" r="6" fill="#60a5fa"/>

                    {/* Model indicator */}
                    <rect x="68" y="105" width="60" height="10" rx="5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                    <circle cx="82" cy="110" r="3" fill="#4ade80"/>
                    <circle cx="92" cy="110" r="3" fill="#60a5fa"/>
                    <rect x="100" y="108" width="20" height="4" rx="1" fill="#555"/>
                  </g>

                  {/* Arrow */}
                  <path d="M 193 85 L 202 85" stroke="#666" strokeWidth="1" markerEnd="url(#cleanArrow)"/>

                  {/* Screen 2: Model Selector */}
                  <g transform="translate(210, 25)">
                    <rect x="0" y="0" width="175" height="120" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Sidebar hint */}
                    <rect x="0" y="0" width="40" height="120" rx="3" fill="#0d0d0d"/>

                    {/* Dropdown panel */}
                    <rect x="50" y="25" width="115" height="90" rx="4" fill="#141414" stroke="#333" strokeWidth="1"/>

                    {/* Header */}
                    <rect x="58" y="32" width="80" height="4" rx="1" fill="#666"/>

                    {/* Model options */}
                    <g transform="translate(58, 42)">
                      <circle cx="6" cy="6" r="5" fill="#ef4444"/>
                      <rect x="16" y="3" width="45" height="4" rx="1" fill="#fff"/>
                      <rect x="68" y="2" width="30" height="8" rx="4" fill="#ef4444" fillOpacity="0.2"/>
                      <rect x="72" y="4" width="22" height="4" rx="1" fill="#ef4444"/>
                    </g>

                    <g transform="translate(58, 58)">
                      <circle cx="6" cy="6" r="5" fill="#60a5fa"/>
                      <rect x="16" y="3" width="50" height="4" rx="1" fill="#fff"/>
                      <rect x="68" y="2" width="30" height="8" rx="4" fill="#60a5fa" fillOpacity="0.2"/>
                    </g>

                    <g transform="translate(58, 74)">
                      <circle cx="6" cy="6" r="5" fill="#4ade80"/>
                      <rect x="16" y="3" width="25" height="4" rx="1" fill="#fff"/>
                      <rect x="48" y="2" width="30" height="8" rx="4" fill="#4ade80" fillOpacity="0.2"/>
                    </g>

                    {/* Selected option */}
                    <g transform="translate(58, 90)">
                      <path d="M 3 6 L 6 9 L 12 3" stroke="#4ade80" strokeWidth="1.5" fill="none"/>
                      <circle cx="22" cy="6" r="5" fill="#4ade80"/>
                      <rect x="32" y="3" width="65" height="4" rx="1" fill="#fff"/>
                      <rect x="32" y="10" width="55" height="3" rx="1" fill="#555"/>
                    </g>
                  </g>

                  {/* Row 2 */}
                  <text x="15" y="168" fill="#666" fontSize="9" fontFamily="system-ui, sans-serif">Response View</text>

                  {/* Screen 3: Response */}
                  <g transform="translate(10, 175)">
                    <rect x="0" y="0" width="175" height="110" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>

                    {/* Sidebar */}
                    <rect x="0" y="0" width="40" height="110" rx="3" fill="#0d0d0d"/>

                    {/* Response content */}
                    <rect x="48" y="12" width="118" height="65" rx="4" fill="#141414"/>
                    <rect x="56" y="20" width="100" height="4" rx="1" fill="#fff"/>
                    <rect x="56" y="28" width="95" height="3" rx="1" fill="#666"/>
                    <rect x="56" y="35" width="100" height="3" rx="1" fill="#666"/>
                    <rect x="56" y="42" width="85" height="3" rx="1" fill="#666"/>
                    <rect x="56" y="49" width="90" height="3" rx="1" fill="#666"/>
                    <rect x="56" y="56" width="70" height="3" rx="1" fill="#666"/>

                    {/* Model badges */}
                    <rect x="56" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>
                    <rect x="80" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>
                    <rect x="104" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>

                    {/* Input at bottom */}
                    <rect x="48" y="88" width="120" height="16" rx="8" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                    <rect x="56" y="94" width="45" height="4" rx="1" fill="#444"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Mid-Fi Summary */}
          <div className="nexus-iteration-notes">
            <h4 className="text-[#60a5fa] text-lg font-medium mb-4">Key Refinements</h4>
            <ul className="space-y-3 text-white/50 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
                <span><span className="text-white/70 font-medium">Model picker in the chat:</span> Dropdown right where you type. No switching to another screen.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
                <span><span className="text-white/70 font-medium">Model badges:</span> Small colored badges below each answer show which models contributed.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
                <span><span className="text-white/70 font-medium">One screen:</span> Ask and answer on the same page. No extra steps.</span>
              </li>
            </ul>
          </div>

        </div>

          {/* Figma Design */}
          <div id="hifi" className="nexus-research-chapter nexus-prototype-chapter">
            <h3 className="text-xl md:text-2xl font-semibold text-[#60a5fa] mb-2">High-Fidelity Design</h3>
            <p className="text-white/40 text-sm mb-6">Iteration & Final Design</p>

            <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
              Iteration from lo-fi to final: layout variations, visual hierarchy tests, and flow refinements. Figma snapshots from the process.
            </p>

            {/* All Figma Images Grid */}
            <div className="nexus-artifact-grid">
              <a href="/narbl/figma-iteration-1.png" target="_blank" rel="noreferrer" aria-label="Open Figma user flows and navigation maps at full size">
                <Image
                  src="/narbl/figma-iteration-1.png"
                  alt="Figma user flows and navigation maps"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </a>
              <a href="/narbl/narbl-figma.png" target="_blank" rel="noreferrer" aria-label="Open Nexus Figma Design Overview at full size">
                <Image
                  src="/narbl/narbl-figma.png"
                  alt="Nexus Figma Design Overview"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </a>
              <a href="/narbl/figma-iteration-3.png" target="_blank" rel="noreferrer" aria-label="Open Figma profile and dashboard iterations at full size">
                <Image
                  src="/narbl/figma-iteration-3.png"
                  alt="Figma profile and dashboard iterations"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </a>
              <a href="/narbl/figma-iteration-2.png" target="_blank" rel="noreferrer" aria-label="Open Figma onboarding and group creation flows at full size">
                <Image
                  src="/narbl/figma-iteration-2.png"
                  alt="Figma onboarding and group creation flows"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </a>
            </div>

            {/* Key Learnings from Iteration */}
            <div className="nexus-iteration-notes">
              <h4 className="text-[#60a5fa] text-lg font-medium mb-4">Iteration Insights</h4>
              <ul className="space-y-3 text-white/50 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
                  <span><span className="text-white/70 font-medium">Flow simplification:</span> Streamlined onboarding so users reach their first answer faster.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
                  <span><span className="text-white/70 font-medium">Visual hierarchy:</span> Tested ways to present AI sources before landing on the badge system.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
                  <span><span className="text-white/70 font-medium">Model transparency:</span> Indicators show which models were used so students know where the answer comes from.</span>
                </li>
              </ul>
            </div>
        </div>
      </Section>

      {/* Core Features */}
      <Section>
        <SectionLabel>04</SectionLabel>
        <SectionTitle>Core Features</SectionTitle>
        <p className="nexus-section-lede">
          Four features that give students one clear answer without managing multiple AI tools.
        </p>

        <div className="nexus-feature-grid">
          {/* Feature 1: One Question, Best Answer */}
          <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/20 hover:shadow-[0_18px_40px_-28px_rgba(37,99,235,0.28)]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-[#2563EB]">One Question, Best Answer</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Ask anything. Multiple models run in parallel and surface the strongest answer.
            </p>
          </div>

          {/* Feature 2: Multi-Model Comparison */}
          <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/20 hover:shadow-[0_18px_40px_-28px_rgba(37,99,235,0.28)]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-[#2563EB]">Multi-Model Comparison</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Compares responses across models and surfaces where they agree.
            </p>
          </div>

          {/* Feature 3: Model Transparency */}
          <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/20 hover:shadow-[0_18px_40px_-28px_rgba(37,99,235,0.28)]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-[#2563EB]">Model Transparency</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              See which models contributed. Full transparency.
            </p>
          </div>

          {/* Feature 4: Trusted Answers */}
          <div className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/20 hover:shadow-[0_18px_40px_-28px_rgba(37,99,235,0.28)]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-[#2563EB]">Trusted Answers</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Consensus-backed answers for research where accuracy matters.
            </p>
          </div>
        </div>

        {/* Features Summary */}
        <div className="nexus-feature-summary">
          <p className="text-white/50 leading-relaxed">
            One question, one answer. No tab hopping. No conflicting information.
          </p>
        </div>
      </Section>

      {/* Design System */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>Design System</SectionTitle>
        <p className="nexus-section-lede">
          Minimal, monochromatic system. Near-black reduces eye strain. Clean typography and subtle blue accents let the content shine.
        </p>

        {/* Design System */}
        <div className="nexus-design-grid">
          {/* Colors */}
          <div
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-30px_rgba(37,99,235,0.22)]"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
            }}
          >
            <h5 className="mb-8 text-lg font-semibold text-[#2563EB]">Colors</h5>

            {/* Background */}
            <div className="mb-8">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Background</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#000000] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#000000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0a0a0a] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#0A0A0A</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#141414] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#141414</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] shadow-lg ring-2 ring-white/5"></div>
                  <span className="text-white/50 text-[10px] font-mono">#1A1A1A</span>
                </div>
              </div>
            </div>

            {/* Primary - White/Gray */}
            <div className="mb-8">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Primary · Neutrals</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#ffffff] shadow-lg"></div>
                  <span className="text-white/50 text-[10px] font-mono">#FFFFFF</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#e5e5e5] shadow-lg"></div>
                  <span className="text-white/50 text-[10px] font-mono">#E5E5E5</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#a3a3a3] shadow-lg"></div>
                  <span className="text-white/50 text-[10px] font-mono">#A3A3A3</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#525252] shadow-lg"></div>
                  <span className="text-white/50 text-[10px] font-mono">#525252</span>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="mb-8">
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">Accent · Subtle Blue</p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#3b82f6] shadow-lg shadow-blue-500/30"></div>
                  <span className="text-white/50 text-[10px] font-mono">#3B82F6</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-[#60a5fa] shadow-lg shadow-blue-400/30"></div>
                  <span className="text-white/50 text-[10px] font-mono">#60A5FA</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg" style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)' }}></div>
                  <span className="text-white/50 text-[10px] font-mono">Blue/20%</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-lg" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}></div>
                  <span className="text-white/50 text-[10px] font-mono">Blue/10%</span>
                </div>
              </div>
            </div>

            {/* UI Elements */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4 font-medium">UI Elements</p>
              <div className="space-y-3">
                <div
                  className="h-12 rounded-full flex items-center justify-between px-4 text-xs"
                  style={{
                    background: '#ffffff',
                  }}
                >
                  <span className="text-black/70">Primary Button</span>
                  <span className="text-black text-[10px] font-medium">Try Now →</span>
                </div>
                <div
                  className="h-12 rounded-lg flex items-center justify-between px-4 text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="text-white/50">Input Field</span>
                  <span className="text-white/30 text-[10px]">Ready when you are.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-30px_rgba(37,99,235,0.22)]"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
            }}
          >
            <h5 className="mb-8 text-lg font-semibold text-[#2563EB]">Typography</h5>

            <div className="space-y-0">
              {/* Display */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Display</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter Bold · 48px</p>
                </div>
                <p className="text-3xl font-bold text-slate-900">Nexus</p>
              </div>

              {/* Heading */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Heading</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter SemiBold · 24px</p>
                </div>
                <p className="text-2xl font-semibold text-slate-900">Heading</p>
              </div>

              {/* Subheading - Italic style like "One Nexus" */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Accent</p>
                  <p className="text-white/30 text-xs mt-0.5">Serif Italic · 24px</p>
                </div>
                <p className="text-white/90 text-2xl italic" style={{ fontFamily: 'Georgia, serif' }}>One Nexus.</p>
              </div>

              {/* Body */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Body</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter Regular · 14px</p>
                </div>
                <p className="text-white/70 text-sm">Body text</p>
              </div>

              {/* Secondary */}
              <div className="flex items-center justify-between py-4 border-b border-white/5">
                <div>
                  <p className="text-white/90 text-sm font-medium">Secondary</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter Regular · 14px</p>
                </div>
                <p className="text-white/40 text-sm">Muted text</p>
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-white/90 text-sm font-medium">Caption</p>
                  <p className="text-white/30 text-xs mt-0.5">Inter Medium · 11px</p>
                </div>
                <p className="text-white/50 text-[11px] uppercase tracking-wider">MOST ACCURATE AI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Design System Rationale */}
        <div className="nexus-design-notes">
          <p className="text-[#60a5fa] text-xs font-semibold uppercase tracking-widest mb-6">Why These Choices</p>
          <ul className="text-white/70 leading-relaxed space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
              <span><strong className="font-semibold text-slate-900">Dark theme:</strong> Reduces eye strain during long sessions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
              <span><strong className="font-semibold text-slate-900">Monochromatic palette:</strong> Grays and white keep focus on the answer.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
              <span><strong className="font-semibold text-slate-900">Blue accents:</strong> Subtle highlights and emphasis. Trustworthy without being distracting.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#60a5fa]/80 mt-1 text-sm">•</span>
              <span><strong className="font-semibold text-slate-900">Inter:</strong> Clean, readable. Serif italic for the tagline adds personality.</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* Impact & Results */}
      <Section>
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Impact & Results</SectionTitle>

        <div className="nexus-impact">
          <div className="nexus-impact-grid">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-28px_rgba(37,99,235,0.22)]">
              <p className="text-4xl font-bold text-[#60a5fa] mb-2">40%<Footnote id={4}>Compared to baseline in the 3 months before launch. Measured as completed sign-ups.</Footnote></p>
              <p className="text-white/70 text-sm">More sign-ups in 3 months post-launch</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-28px_rgba(37,99,235,0.22)]">
              <p className="text-4xl font-bold text-[#60a5fa] mb-2">2x</p>
              <p className="text-white/70 text-sm">Faster onboarding after flow redesign</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-28px_rgba(37,99,235,0.22)]">
              <p className="text-4xl font-bold text-[#60a5fa] mb-2">85%</p>
              <p className="text-white/70 text-sm">Positive feedback from user testing</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-28px_rgba(37,99,235,0.22)]">
              <p className="text-4xl font-bold text-[#60a5fa] mb-2">10,000+</p>
              <p className="text-white/70 text-sm">Active users on shipped designs</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Reflection */}
      <Section>
        <SectionLabel>07</SectionLabel>
        <SectionTitle>Reflection</SectionTitle>

        <div className="nexus-reflection">
          <div className="nexus-reflection-grid">
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">What I Learned</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Collaborating daily with engineers on constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Building design systems from scratch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Designing for students who want answers fast</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">Challenges</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Communicating model transparency through UI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Handling unpredictable AI response times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Balancing input from multiple stakeholders</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#60a5fa] font-medium mb-3">Next Time</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Test with diverse student populations earlier</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Design mobile flows sooner</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#60a5fa]/80 mt-0.5 shrink-0">•</span>
                  <span>Explore study group collaboration features</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="nexus-reflection-takeaway">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="font-medium text-slate-900">Key Insight:</span> Shipped production-quality work in a fast-paced startup. Learned to collaborate with engineers and design complex tools that respect user expertise.
            </p>
          </div>
        </div>
      </Section>

      {/* Final Product Showcase */}
      <Section id="product-walkthrough">
        <SectionLabel>08</SectionLabel>
        <SectionTitle>Product Walkthrough</SectionTitle>
        <p className="nexus-section-lede">
          Final high-fidelity designs of Nexus core features.
        </p>

        <div className="nexus-walkthrough" role="region" aria-label="Nexus product screens" aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'ArrowLeft') { event.preventDefault(); goToPrevSlide() }
            if (event.key === 'ArrowRight') { event.preventDefault(); goToNextSlide() }
          }}>
          <figure>
            <a className="nexus-walkthrough-image" href={demoImages[activeSlide].src} target="_blank" rel="noreferrer" aria-label={`Open ${demoImages[activeSlide].label} at full size`}>
              <img src={demoImages[activeSlide].src} alt={demoImages[activeSlide].label}
                width={demoImages[activeSlide].width} height={demoImages[activeSlide].height} loading="lazy" decoding="async" />
            </a>
            <figcaption>
              <span aria-live="polite" aria-atomic="true">{String(activeSlide + 1).padStart(2, '0')} / {String(demoImages.length).padStart(2, '0')} <strong>{demoImages[activeSlide].label}</strong></span>
              <a href={demoImages[activeSlide].src} target="_blank" rel="noreferrer">Open full image ↗</a>
            </figcaption>
          </figure>
          <div className="nexus-walkthrough-controls">
            <button type="button" onClick={goToPrevSlide} aria-label="Previous Nexus screen">←</button>
            <div className="nexus-walkthrough-dots" role="group" aria-label="Choose a Nexus screen">
              {demoImages.map((image, index) => <button type="button" key={image.src} onClick={() => setActiveSlide(index)}
                aria-label={`Show screen ${index + 1}: ${image.label}`} aria-pressed={activeSlide === index}>
                <span aria-hidden="true" />
              </button>)}
            </div>
            <button type="button" onClick={goToNextSlide} aria-label="Next Nexus screen">→</button>
          </div>
        </div>
      </Section>

      <style>{`
        html { scroll-behavior: smooth; }

        .nexus-theme {
          background:
            radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 28%),
            radial-gradient(circle at top right, rgba(148, 163, 184, 0.14), transparent 24%),
            linear-gradient(180deg, #fafaf8 0%, #f5f5f1 100%);
        }

        .nexus-theme [class~="text-white"] { color: rgb(15 23 42) !important; }
        .nexus-theme [class~="text-white/30"] { color: rgb(100 116 139 / 0.82) !important; }
        .nexus-theme [class~="text-white/40"] { color: rgb(100 116 139 / 0.92) !important; }
        .nexus-theme [class~="text-white/50"] { color: rgb(71 85 105 / 0.92) !important; }
        .nexus-theme [class~="text-white/60"] { color: rgb(71 85 105 / 0.82) !important; }
        .nexus-theme [class~="text-white/70"] { color: rgb(30 41 59 / 0.82) !important; }
        .nexus-theme [class~="text-white/80"] { color: rgb(15 23 42 / 0.88) !important; }
        .nexus-theme [class~="text-white/90"] { color: rgb(15 23 42 / 0.96) !important; }
        .nexus-theme .text-\[\#60a5fa\],
        .nexus-theme .text-\[\#60a5fa\]\/50,
        .nexus-theme .text-\[\#60a5fa\]\/60,
        .nexus-theme .text-\[\#60a5fa\]\/70,
        .nexus-theme .text-\[\#60a5fa\]\/80 {
          color: #2563eb !important;
        }
        .nexus-theme [class~="bg-[#60a5fa]/5"] { background-color: rgba(219, 234, 254, 0.78) !important; }
        .nexus-theme [class~="border-[#60a5fa]/20"] { border-color: rgba(37, 99, 235, 0.18) !important; }
        .nexus-theme [class~="border-white/10"] { border-color: rgba(148, 163, 184, 0.24) !important; }
        .nexus-theme [class~="border-white/5"] { border-color: rgba(148, 163, 184, 0.14) !important; }
        .nexus-theme [class~="bg-white/5"] { background-color: rgba(148, 163, 184, 0.12) !important; }
        .nexus-theme [class~="bg-white/40"] { background-color: rgba(148, 163, 184, 0.36) !important; }
        .nexus-theme [class~="bg-white/60"] { background-color: rgba(37, 99, 235, 0.56) !important; }

        .nexus-theme a[href^="#"],
        .nexus-theme a[href="/"],
        .nexus-theme button {
          transition:
            transform 180ms ease,
            box-shadow 220ms ease,
            background-color 220ms ease,
            border-color 220ms ease,
            color 220ms ease,
            opacity 220ms ease;
        }

        .nexus-theme a[href^="#"]:hover,
        .nexus-theme a[href="/"]:hover,
        .nexus-theme button:hover {
          transform: translateY(-2px);
        }
      `}</style>
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

function NexusFlowSteps({ label, steps }: {
  label: string;
  steps: { label: string; kind: 'entry' | 'action' | 'processing' | 'result'; caption: string }[];
}) {
  return (
    <ol className="nexus-journey-steps" aria-label={label}>
      {steps.map((step, index) => (
        <li key={step.label} className={`nexus-journey-step nexus-journey-step--${step.kind}`}>
          <small>{step.caption}</small>
          <strong>{step.label}</strong>
          {index < steps.length - 1 && <span className="nexus-journey-arrow" aria-hidden="true">→</span>}
        </li>
      ))}
    </ol>
  )
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section
      id={id}
      className={`legacy-case-section relative z-10 border-t border-slate-200/80 px-4 py-16 md:px-8 md:py-24 ${id ? 'scroll-mt-24' : ''}`}
    >
      <div className="nexus-section-inner">
        {children}
      </div>
    </section>
  )
}

function Footnote({ id, children }: { id: number; children: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild><button type="button" className="study-footnote" aria-label={`Read research note ${id}`}>[{id}]</button></PopoverTrigger>
      <PopoverContent side="top" align="center" collisionPadding={16} className="study-footnote-content" aria-label={`Research note ${id}`}>
        {children}
      </PopoverContent>
    </Popover>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="legacy-section-number mb-4 text-sm font-mono text-[#2563EB]/70">{children}</p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="legacy-section-title mb-12 text-3xl font-bold text-[#2563EB] md:text-4xl">{children}</h2>
  )
}
