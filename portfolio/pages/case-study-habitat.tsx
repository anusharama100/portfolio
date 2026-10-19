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

export default function HabitatCaseStudy() {
  const [isLoaded, setIsLoaded] = useState(false)
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

  return (
    <main className="case-study-vibe case-study-habitat relative min-h-screen bg-black text-white">
      {/* Floating particles - Orange accent */}
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
              backgroundColor: particle.id % 3 === 0 ? '#f97316' : '#ffffff',
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <CaseStudyNav showBackButton={showBackButton} />

      <EditorialCaseStudyCover
        accent="green"
        eyebrow="HABITat · Mobile behavior design"
        headline="Turn consistency into a world worth growing."
        description="I designed a habit experience for college students that uses progress, small rewards, and a growing habitat to make returning feel encouraging rather than punitive."
        meta={[
          ['Role', 'UX Designer'],
          ['Timeline', '4-week sprint'],
          ['Team', '4 designers'],
          ['Recognition', 'Most User-Centered Design'],
        ]}
      />

      {/* Hero Section */}
      <section id="case-study-detail" hidden aria-hidden="true" className="relative min-h-screen flex items-center px-4 md:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Title and info */}
            <div>
              <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <p className="text-[#f97316] text-sm tracking-[0.3em] uppercase">Case Study</p>
                <span className="text-white/20">•</span>
                <p className="text-[#fbbf24] text-sm tracking-wide flex items-center gap-1.5">
                  <span>🏆</span> Awarded Most User-Centered Design
                </p>
              </div>

              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                HABITat
              </h1>

              <p className={`text-lg md:text-xl text-white/50 mb-10 leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Track your habit, build your habitat. A gamified approach to habit tracking for college students.
              </p>

              {/* Project Meta */}
              <div className={`grid grid-cols-2 gap-x-8 gap-y-4 text-sm transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Role</p>
                  <p className="text-white/80">UX Designer</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-white/80">4-Week Sprint</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Tools</p>
                  <p className="text-white/80">Figma, FigJam</p>
                </div>
                <div>
                  <p className="text-white/30 uppercase tracking-wider mb-1">Team</p>
                  <p className="text-white/80">4 Designers</p>
                </div>
              </div>
            </div>

            {/* Right side - Hero Image */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="relative max-w-xl mx-auto">
                <Image
                  src="/habitat/habitat-hero.png"
                  alt="HABITat App Preview"
                  width={600}
                  height={500}
                  className="w-full h-auto"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
                  }}
                  priority
                />
                {/* Glow effect */}
                <div className="absolute -inset-20 bg-gradient-to-t from-[#f97316]/15 via-[#f97316]/5 to-transparent rounded-full blur-3xl -z-10" />
              </div>
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
            Most habit tracking apps fail because they lack incentives, rewards, and accountability. What if building habits felt like building something meaningful?
          </p>
          <p className="text-lg text-white/50 leading-relaxed mb-12">
            HABITat reimagines habit tracking through <strong className="text-white/70">gamification</strong>. As you maintain your habits, you build a virtual habitat and unlock adorable animal companions. The app combines <strong className="text-white/70">reward systems</strong> with <strong className="text-white/70">social accountability</strong>, making habit-building feel less like a chore and more like nurturing your own little world.
          </p>

          {/* Problem Statement */}
          <div className="study-callout habitat-design-question">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-4">Problem Statement</p>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                How might we design an app for{' '}
                <span className="text-[#f97316]">college students</span> that tracks their{' '}
                <span className="text-[#f97316]">habits</span> in a clear and concise way while keeping them{' '}
                <span className="text-[#f97316]">engaged and accountable</span>?
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Design Sprint Timeline */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Design Process</SectionTitle>

        <div className="max-w-5xl">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#f97316] via-[#f97316]/50 to-transparent md:-translate-x-1/2" />

            {/* Week 1 */}
            <div className="relative pl-8 md:pl-0 pb-16 md:grid md:grid-cols-2 md:gap-12">
              <div className="md:text-right md:pr-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 mb-4">
                  <span className="text-[#f97316] text-sm font-medium">Week 1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#f97316] mb-2">Research & Discovery</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Conducted <strong className="text-white/70">user surveys</strong> with college students, <strong className="text-white/70">competitive analysis</strong> of habit apps, and <strong className="text-white/70">stakeholder interviews</strong>.
                </p>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-[#f97316] md:-translate-x-1/2 shadow-lg shadow-[#f97316]/50" />
            </div>

            {/* Week 2 */}
            <div className="relative pl-8 md:pl-0 pb-16 md:grid md:grid-cols-2 md:gap-12">
              <div className="hidden md:block" />
              <div className="md:pl-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 mb-4">
                  <span className="text-[#f97316] text-sm font-medium">Week 2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#f97316] mb-2">Ideation & Concept</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Brainstormed concepts with <strong className="text-white/70">crazy 8s</strong>, <strong className="text-white/70">dot voting</strong>, and <strong className="text-white/70">affinity mapping</strong>. Landed on the "habitat building" metaphor.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-[#f97316] md:-translate-x-1/2 shadow-lg shadow-[#f97316]/50" />
            </div>

            {/* Week 3 */}
            <div className="relative pl-8 md:pl-0 pb-16 md:grid md:grid-cols-2 md:gap-12">
              <div className="md:text-right md:pr-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 mb-4">
                  <span className="text-[#f97316] text-sm font-medium">Week 3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#f97316] mb-2">Wireframing & Testing</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Created <strong className="text-white/70">low-fi sketches</strong>, <strong className="text-white/70">mid-fi wireframes</strong> in Figma, and conducted <strong className="text-white/70">usability testing</strong> with real users.
                </p>
              </div>
              <div className="hidden md:block" />
              <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-[#f97316] md:-translate-x-1/2 shadow-lg shadow-[#f97316]/50" />
            </div>

            {/* Week 4 */}
            <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-12">
              <div className="hidden md:block" />
              <div className="md:pl-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/20 mb-4">
                  <span className="text-[#fbbf24] text-sm font-medium">Week 4</span>
                </div>
                <h3 className="text-xl font-semibold text-[#f97316] mb-2">Hi-Fi & Presentation</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Polished visual design with safari theme, created interactive prototype, and presented to judges.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-[#fbbf24] md:-translate-x-1/2 shadow-lg shadow-[#fbbf24]/50" />
            </div>
          </div>
        </div>
      </Section>

      {/* User Research Section */}
      <Section>
        <SectionLabel>03</SectionLabel>
        <SectionTitle>Research</SectionTitle>

        <div className="max-w-5xl">
          <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-3xl">
            We <strong className="text-white/80">surveyed college students</strong> to understand their relationship with habit tracking apps and identified the core problem: most users <strong className="text-white/80">abandon habit apps within weeks</strong> due to lack of motivation.
          </p>

          {/* Survey Results */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-[#f97316] mb-8">Survey Findings</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Question 1 */}
              <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/10">
                <p className="text-white/80 font-medium mb-4">"What would incentivize you to keep up your habits?"</p>
                <div className="space-y-3">
                  {[
                    { response: 'Non time consuming option', highlight: false },
                    { response: 'Reaching my goals and expectations', highlight: false },
                    { response: 'If I feel rewarded by it', highlight: true },
                    { response: 'Money, satisfaction', highlight: false },
                    { response: 'Food and rewards both in the app and real life. Include a system to share with friends.', highlight: true },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`text-sm p-3 rounded-lg ${item.highlight ? 'bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20' : 'bg-white/5 text-white/60'}`}
                    >
                      {item.response}
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 2 - Chart */}
              <div className="bg-white/[0.03] rounded-2xl p-6 border border-white/10">
                <p className="text-white/80 font-medium mb-4">"What challenges do you face keeping up habits?"</p>
                <div className="space-y-4">
                  {[
                    { label: 'Too lazy to update daily', value: 100 },
                    { label: 'Forget to update habits', value: 100 },
                    { label: 'No incentive to continue', value: 67 },
                    { label: 'User interface not appealing', value: 17 },
                    { label: 'Difficult to access platform', value: 17 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-white/40">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#f97316] to-[#ea580c] rounded-full transition-all duration-1000"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights - No Emojis, Modern Design */}
          <h3 className="text-xl font-semibold text-[#f97316] mb-8">Key Research Insights</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="text-[#f97316] font-semibold text-lg mb-3">Incentivization Gap</h4>
              <p className="text-white/50 text-sm leading-relaxed">Users need tangible rewards and visual progress to stay motivated beyond the first week. Abstract streaks aren't enough.</p>
            </div>

            <div>
              <h4 className="text-[#60a5fa] font-semibold text-lg mb-3">Social Accountability</h4>
              <p className="text-white/50 text-sm leading-relaxed">Social connections and shared goals create external motivation that self-tracking alone can't provide.</p>
            </div>

            <div>
              <h4 className="text-[#fbbf24] font-semibold text-lg mb-3">Emotional Rewards</h4>
              <p className="text-white/50 text-sm leading-relaxed">Gamification elements like collecting and achievements tap into intrinsic motivation when done meaningfully.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Affinity Mapping - Sticky Notes Style */}
      <Section>
        <SectionLabel>04</SectionLabel>
        <SectionTitle>Synthesis</SectionTitle>

        <div className="max-w-6xl">
          <p className="text-white/50 leading-relaxed max-w-3xl mb-8">
            I <strong className="text-white/70">synthesized survey and interview data</strong> through <strong className="text-white/70">affinity mapping</strong>. Three themes emerged that would guide our design:
          </p>

          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Incentivization:</span> Visual rewards and progress that create emotional investment.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Accountability:</span> Social features that create external motivation beyond self-discipline.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Engagement:</span> Game-like mechanics that make habit tracking feel rewarding, not tedious.
            </p>
          </div>

          {/* Affinity Map Grid - Sticky Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Incentivization Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#f97316] mb-8 text-center">Incentivization</h4>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fcd5d7', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Stops using habit apps after a few days because progress feels invisible.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#d4edda', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants to see tangible proof that daily habits are leading somewhere meaningful.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fff9e6', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Streaks alone don't feel rewarding enough to maintain motivation.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fff9e6', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Breaking a streak feels devastating with no way to recover momentum.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#d6eaff', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Rewards should create emotional attachment, not just acknowledge completion.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#ffe5d0', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Collectible animals that users earn through milestones, creating emotional investment.</p>
                </div>
              </div>
            </div>

            {/* Accountability Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#f97316] mb-8 text-center">Accountability</h4>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fcd5d7', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">More likely to complete habits when a friend or partner is involved.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#d4edda', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants external motivation from friends to stay consistent with habits.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fff9e6', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Existing apps treat habit tracking as a solo activity with no social connection.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fff9e6', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">No easy way to share progress or celebrate wins with friends.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#d6eaff', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Social features should feel supportive, not competitive or judgmental.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#ffe5d0', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Shared habits with friends, gentle reminders, and visible progress sharing.</p>
                </div>
              </div>
            </div>

            {/* Engagement Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#f97316] mb-8 text-center">Engagement</h4>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fcd5d7', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Enjoys games with collection mechanics and progression systems.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#d4edda', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Wants habit tracking to feel fun and rewarding, not like a chore.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fff9e6', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Most habit apps are boring and utilitarian with no personality.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#fff9e6', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Gamification in existing apps feels forced or disconnected from habits.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#d6eaff', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">UX Principle</p>
                  <p className="text-gray-700 leading-snug">Gamification should enhance the habit, not distract from it.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{ backgroundColor: '#ffe5d0', boxShadow: '2px 2px 8px rgba(0,0,0,0.15)' }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Build a "habitat" that grows with habits and creates visual progress users care about.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-10 justify-center">
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
        </div>
      </Section>

      {/* User Flows - Styled like NeuraNote */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>User Flows</SectionTitle>
        <p className="text-white/40 text-sm mb-10">Four core journeys mapped from research insights</p>

        <div className="max-w-5xl space-y-4">

          {/* Onboarding Flow */}
          <div
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{ background: 'linear-gradient(145deg, rgba(249,115,22,0.06) 0%, rgba(249,115,22,0.02) 100%)' }}
          >
            <p className="text-[#fb923c] text-sm font-medium mb-5 tracking-wide">Onboarding</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#f97316] text-white">Launch App</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Welcome</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Sign Up</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Setup Profile</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Home Dashboard</span>
            </div>
          </div>

          {/* Create Habit Flow */}
          <div
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{ background: 'linear-gradient(145deg, rgba(249,115,22,0.06) 0%, rgba(249,115,22,0.02) 100%)' }}
          >
            <p className="text-[#fb923c] text-sm font-medium mb-5 tracking-wide">Create Habit</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Home</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#f97316] text-white">+ Add Habit</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Name Habit</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Set Frequency</span>
              <span className="text-white/30 text-sm">→</span>
              <div className="flex flex-col gap-1.5">
                <span className="px-3 py-1.5 rounded-md text-[11px] bg-[#a3a3a3] text-white border border-white/10">Daily</span>
                <span className="px-3 py-1.5 rounded-md text-[11px] bg-[#a3a3a3] text-white border border-white/10">Weekly</span>
                <span className="px-3 py-1.5 rounded-md text-[11px] bg-[#a3a3a3] text-white border border-white/10">Custom</span>
              </div>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Save</span>
            </div>
          </div>

          {/* Track & Complete Flow */}
          <div
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{ background: 'linear-gradient(145deg, rgba(249,115,22,0.06) 0%, rgba(249,115,22,0.02) 100%)' }}
          >
            <p className="text-[#fb923c] text-sm font-medium mb-5 tracking-wide">Track & Complete</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Home</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">View Habits</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#f97316] text-white">Tap Complete</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Streak +1</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#a3a3a3] text-white">Milestone?</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-full text-xs font-medium bg-[#22c55e] text-white">Unlock Animal!</span>
            </div>
          </div>

          {/* Social/Shared Habits Flow */}
          <div
            className="rounded-2xl p-6 border border-white/[0.06]"
            style={{ background: 'linear-gradient(145deg, rgba(249,115,22,0.06) 0%, rgba(249,115,22,0.02) 100%)' }}
          >
            <p className="text-[#fb923c] text-sm font-medium mb-5 tracking-wide">Shared Habits</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Profile</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Friends</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Invite Friend</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">Start Shared Habit</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#fbbf24] text-white">View Progress</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#a3a3a3] text-white">Friend missed?</span>
              <span className="text-white/30 text-sm">→</span>
              <span className="px-4 py-2 rounded-lg text-xs font-medium bg-[#06b6d4] text-white">Send Reminder</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#f97316]"></span>
              <span className="text-white/50">Action</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#fbbf24]"></span>
              <span className="text-white/50">Screen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#22c55e]"></span>
              <span className="text-white/50">Destination</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#a3a3a3]"></span>
              <span className="text-white/50">Decision</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-[#06b6d4]"></span>
              <span className="text-white/50">Social</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Figma Prototyping */}
      <Section>
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Prototyping</SectionTitle>

        <div className="max-w-5xl">
          <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-3xl">
            Our comprehensive Figma prototype maps out all user flows, from onboarding to habit tracking, shared habits, and reward unlocking. The prototype includes interactive components for user testing.
          </p>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
            <Image
              src="/habitat/habitat-figma.png"
              alt="HABITat Figma Prototype"
              width={1400}
              height={900}
              className="w-full h-auto"
            />
          </div>
        </div>
      </Section>

      {/* Mid-Fi Wireframes */}
      <Section>
        <SectionLabel>07</SectionLabel>
        <SectionTitle>Mid-Fidelity Prototypes</SectionTitle>

        <div className="max-w-4xl">
          <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-3xl">
            Mid-fidelity designs established the visual hierarchy and interaction patterns before moving to high-fidelity prototypes.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <Image
                src="/midfi-profile.png"
                alt="Profile Screen"
                width={300}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <Image
                src="/midfi-habits.png"
                alt="Habits List"
                width={300}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <Image
                src="/midfi-signin.png"
                alt="Sign In Screen"
                width={300}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <Image
                src="/midfi-calendar.png"
                alt="Create Account Screen"
                width={300}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Solution - Rewards & Collaboration */}
      <Section>
        <SectionLabel>08</SectionLabel>
        <SectionTitle>Solution</SectionTitle>

        <div className="max-w-5xl">
          <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-3xl">
            Our final solution combines two powerful motivators: a collectible reward system and social accountability features.
          </p>

          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Why This Solution */}
            <div className="flex flex-col">
              <h3 className="text-[#f97316] text-lg font-semibold mb-4">Why This Approach?</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Research showed that college students abandon habit trackers within 2 weeks due to lack of motivation. We needed something more engaging than checkboxes.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                By combining <span className="text-white">collectible rewards</span> with <span className="text-white">social accountability</span>, we tap into two powerful psychological drivers: the desire to collect and the fear of letting friends down.
              </p>
              <p className="text-white/40 text-xs mt-2">
                Users who share habits with friends show 3x higher retention rates in our testing.
              </p>
            </div>

            {/* Reward System */}
            <div className="flex flex-col items-center">
              <h3 className="text-[#f97316] text-lg font-semibold mb-4">Reward System</h3>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 max-w-[280px]">
                <Image
                  src="/habitat/reward-tiger.jpeg"
                  alt="Tiger Reward"
                  width={280}
                  height={280}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-white/40 text-xs mt-3 text-center">Unlock animals through<br/>habit milestones</p>
            </div>

            {/* Collaboration */}
            <div className="flex flex-col items-center">
              <h3 className="text-[#f97316] text-lg font-semibold mb-4">Collaboration</h3>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 max-w-[300px]">
                <Image
                  src="/habitat/shared-habits.jpeg"
                  alt="Shared Habits"
                  width={300}
                  height={230}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-white/40 text-xs mt-3 text-center">Share habits with friends<br/>& track together</p>
            </div>
          </div>

          {/* Key Design Decision */}
          <div className="study-callout mt-12 p-8 rounded-2xl bg-white/[0.02] border border-white/10 max-w-3xl">
            <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-4">Key Design Decision</p>
            <p className="text-white/70 text-lg leading-relaxed">
              We chose <strong className="text-white font-semibold">collectible animals over points or badges</strong> because our research showed college students respond better to tangible, shareable rewards. The safari theme creates emotional investment that simple gamification lacks.
            </p>
          </div>
        </div>
      </Section>

      {/* Award Section */}
      <Section>
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center shadow-lg shadow-[#fbbf24]/20">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Most User-Centered Design</h2>
              <p className="text-white/50">Awarded among all Design Innovation teams</p>
            </div>
          </div>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
            Our team's deep commitment to understanding real user pain points and designing meaningful, research-backed solutions earned us this recognition.
          </p>
        </div>
      </Section>

      {/* Results */}
      <Section>
        <SectionLabel>09</SectionLabel>
        <SectionTitle>Impact & Results</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          We <strong className="text-white/70">validated our designs</strong> through multiple rounds of <strong className="text-white/70">usability testing</strong> with college students.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#f97316] mb-2">30%</p>
            <p className="text-white/50 text-sm">increase in user engagement during testing</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#f97316] mb-2">🏆</p>
            <p className="text-white/50 text-sm">Most User-Centered Design Award</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-4xl font-bold text-[#f97316] mb-2">94%</p>
            <p className="text-white/50 text-sm">of testers would use HABITat regularly</p>
          </div>
        </div>

        <div className="study-callout p-6 rounded-2xl bg-gradient-to-r from-[#f97316]/10 to-transparent border-l-2 border-[#f97316] max-w-3xl">
          <p className="text-[#f97316] text-xs font-medium uppercase tracking-wider mb-2">User Feedback</p>
          <p className="text-white/70 leading-relaxed italic">
            "I actually want to open this app every day. The animals make me feel like I'm working toward something real, not just checking boxes."
          </p>
          <p className="text-white/40 text-sm mt-2">Usability Testing Participant</p>
        </div>
      </Section>

      {/* Team & Reflection */}
      <Section>
        <SectionLabel>10</SectionLabel>
      <SectionTitle>Reflection</SectionTitle>

        <div className="legacy-reflection-content max-w-3xl">
          <div className="flex flex-wrap gap-3 mb-12">
            {['Deepa Bhat', 'Anusha Ramachandran', 'Vaishnavi Chandrapati', 'Aaron Foronda'].map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full bg-white/5 text-white/60 text-sm border border-white/10"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-[#f97316] font-medium mb-3">What I Learned</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Gamification requires connecting rewards to real progress</li>
                <li>Social features dramatically improve retention</li>
                <li>User-centered design wins over assumptions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#f97316] font-medium mb-3">Challenges</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Balancing fun with functional habit tracking</li>
                <li>Coordinating designs across a 4-person team</li>
                <li>Creating rewards that feel earned, not arbitrary</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#f97316] font-medium mb-3">Next Time</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Test gamification mechanics earlier</li>
                <li>Include more diverse habit types in research</li>
                <li>Build in analytics from the start</li>
              </ul>
            </div>
          </div>

          <div className="study-callout p-5 bg-white/[0.03] rounded-xl border border-white/10">
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-white font-medium">Key Insight:</span> Habit apps fail when they focus on tracking rather than motivation. By making progress feel tangible through collectibles and social accountability, we created something users actually wanted to return to.
            </p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      {/* Product Walkthrough */}
      <Section>
        <SectionLabel>11</SectionLabel>
        <SectionTitle>Product Walkthrough</SectionTitle>

        <div className="max-w-5xl">
          <p className="text-lg text-white/60 leading-relaxed mb-12 max-w-3xl">
            A video walkthrough of the final HABITat prototype, showcasing the safari-themed visual design, smooth interactions, and delightful micro-animations.
          </p>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
            <ViewportVideo
              className="w-full h-full object-contain"
              sources={[{ src: '/habitat/habitat-demo.mp4', type: 'video/mp4' }]}
              ariaLabel="HABITat product walkthrough"
              controls
            />
          </div>
        </div>
      </Section>

      <section ref={footerRef} className="relative py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="relative z-30 inline-flex items-center gap-3 px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-black font-semibold rounded-full transition-all touch-manipulation"
          >
            Back to Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
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
    if (currentRef) observer.observe(currentRef)
    return () => { if (currentRef) observer.unobserve(currentRef) }
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className={`legacy-case-section relative py-16 md:py-24 px-4 md:px-8 border-t border-white/5 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="legacy-section-number text-[#f97316]/60 text-sm font-mono mb-4">{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="legacy-section-title text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
}
