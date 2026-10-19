"use client"

import { useEffect, useState, useRef } from 'react'
import { Link } from '@/portfolio/compat'
import { Image } from '@/portfolio/compat'

const ACCENT = '#22c55e' // Green - Crusoe alignment

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const lastPos = useRef({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const move = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`
        ringRef.current.style.top = `${e.clientY}px`
      }
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-cursor-hover]')) setHovering(true)
    }
    const handleOut = (e: MouseEvent) => {
      if (!(e.relatedTarget as HTMLElement)?.closest('[data-cursor-hover]')) setHovering(false)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [visible])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] hidden md:block"
      style={{ visibility: visible ? 'visible' : 'hidden' }}
    >
      <div
        ref={dotRef}
        className="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 0,
          top: 0,
          transition: 'width 0.1s, height 0.1s, background-color 0.1s, box-shadow 0.1s',
          backgroundColor: hovering ? ACCENT : 'rgba(255,255,255,0.9)',
          boxShadow: hovering ? `0 0 16px ${ACCENT}80` : '0 0 4px rgba(255,255,255,0.5)',
          width: hovering ? 20 : 8,
          height: hovering ? 20 : 8,
        }}
      />
      {hovering && (
        <div
          ref={ringRef}
          className="absolute rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: lastPos.current.x,
            top: lastPos.current.y,
            width: 32,
            height: 32,
            borderColor: `${ACCENT}60`,
          }}
        />
      )}
    </div>
  )
}

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  )
}

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'principles', label: 'Principles' },
  { id: 'iteration', label: 'Iteration' },
  { id: 'walkthrough', label: 'Follow the Journey' },
  { id: 'figma-process', label: 'From Sketch to Ship' },
  { id: 'solution', label: 'What We Shipped' },
  { id: 'design-system', label: 'Design' },
  { id: 'impact', label: 'The Results' },
  { id: 'about-me', label: 'The Fit' },
  { id: 'company-research', label: 'Company Research' },
  { id: 'why-crusoe', label: 'Why Crusoe' },
]

const NEXUS_IMAGES = [
  { src: '/narbl/narbl-1.png', label: '1. Student lands on Nexus: one place, no tab hopping', why: 'Design decision: One entry point. No switching. The landing sets the promise.' },
  { src: '/narbl/narbl-3.png', label: '2. Asks one question. Nexus runs multiple models in parallel', why: 'Design decision: Single input. Complexity happens behind the scenes. User never sees the juggling.' },
  { src: '/narbl/narbl-4.png', label: '3. Models compare and surface the strongest answer', why: 'Design decision: Consensus is the product. We show the best answer, not a list to compare.' },
  { src: '/narbl/narbl-5.png', label: '4. Success stories help students trust the results', why: 'Design decision: Social proof builds trust. Real students, real results.' },
  { src: '/narbl/narbl-6.png', label: '5. Trusted by top students who need accuracy', why: 'Design decision: Accuracy matters for STEM. We leaned into that.' },
  { src: '/narbl/narbl-7.png', label: '6. Seamless integrations for homework and research', why: 'Design decision: Fit into existing workflows. No new habits required.' },
  { src: '/narbl/narbl-8.png', label: '7. Why choose Nexus: one answer, backed by many', why: 'Design decision: One answer. Backed by many. That\'s the differentiator.' },
  { src: '/narbl/narbl-9.png?v=5', label: '8. The final experience, ready for the next question', why: 'Design decision: The chat is the core. Model selector visible. Ready for the next question.' },
]

const FIGMA_IMAGES = [
  { src: '/narbl/figma-iteration-1.png', label: 'User flows & navigation maps' },
  { src: '/narbl/narbl-figma.png', label: 'Nexus Figma design overview' },
  { src: '/narbl/figma-iteration-3.png', label: 'Profile & dashboard iterations' },
  { src: '/narbl/figma-iteration-2.png', label: 'Onboarding & group creation flows' },
]

const ITERATION_INSIGHTS = [
  'Flow simplification: Streamlined onboarding so users reach their first answer faster.',
  'Visual hierarchy: Tested ways to present AI sources before landing on the badge system.',
  'Model transparency: Indicators show which models were used so students know where the answer comes from.',
]

const PAIN_POINT_DATA = [
  { label: 'Conflicting answers', value: 72, quote: '"ChatGPT said X, Claude said Y. I had to Google it myself to figure out who was right."', detail: 'Students reported getting different answers for the same question across tools, leading to confusion and extra verification work.' },
  { label: 'Fact-checking AI answers', value: 65, quote: '"I never trust one answer. I always run it through at least two models before I believe it."', detail: 'Lack of trust drives manual cross-checking, especially for STEM and research-heavy subjects.' },
  { label: 'Tab hopping', value: 58, quote: '"I have ChatGPT, Claude, and Gemini open. Copy, paste, compare. Every. Single. Time."', detail: 'Switching between tabs and copying prompts adds friction and breaks focus.' },
]

const TOOL_USAGE_DATA = [
  { name: 'ChatGPT', pct: 85, detail: 'Most common first choice. Students often use it alone, then switch to others when unsure.' },
  { name: 'Claude', pct: 72, detail: 'Popular for coding and longer explanations. Often used as a second check against ChatGPT.' },
  { name: 'Gemini', pct: 58, detail: 'Used for Google integration and as a third opinion when the first two disagree.' },
  { name: 'Poe', pct: 35, detail: 'Multi-model access appreciated, but separate outputs mean students still compare manually.' },
  { name: 'Other', pct: 18, detail: 'Perplexity, Copilot, and niche tools. Usually for specific use cases.' },
]

const SURVEY_QA = [
  { q: 'How often do you cross-check answers across different AI tools?', responses: ['"Almost every time for homework. Maybe 80% of the time."', '"Only for math and science. Humanities I trust more."', '"Daily. I don\'t trust a single model for anything important."'] },
  { q: 'What\'s your biggest frustration when using AI for homework?', responses: ['"Copy-pasting the same prompt into 3 different tabs."', '"When they disagree, I have to figure out who\'s right."', '"The time it takes. Sometimes faster to just Google."'] },
  { q: 'Which AI tools do you use regularly?', responses: ['"ChatGPT and Claude. Sometimes Gemini if I need another opinion."', '"Mainly ChatGPT. I\'ll check Claude for coding."', '"Poe for multi-model, but the answers are separate. Still have to compare."'] },
  { q: 'How do you feel when AI answers conflict?', responses: ['"Annoyed. I have to do the work myself anyway."', '"Uncertain. I usually ask a TA or check the textbook."', '"I just pick one and hope. Not ideal."'] },
]

function CrusoeConnection({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-cursor-hover
      className="mt-6 p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]"
      style={{ borderColor: ACCENT, backgroundColor: `${ACCENT}08` }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>Crusoe Connection</p>
      <p className="text-white/80 text-sm leading-relaxed">{children}</p>
    </div>
  )
}

const TYPING_PHRASES = [
  'One question, one answer you can trust.',
  'Multiple AI models, invisible.',
  'Trust the consensus.',
  'Making multi-model AI invisible.',
]

function TypingEffect() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const phrase = TYPING_PHRASES[phraseIndex]

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < phrase.length) {
          setDisplayText(phrase.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2500)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length)
        }
      }
    }, isDeleting ? 35 : 70)
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phrase])

  return (
    <span>
      {displayText}
      <span className="inline-block w-0.5 h-[1em] ml-0.5 align-middle animate-pulse" style={{ backgroundColor: ACCENT }} />
    </span>
  )
}

function SubtlePageBackground() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Gradient base - smooth flow, no banding */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, #0a0a0a 0%, #0b0d0a 25%, #0a0a0a 50%, #090b09 75%, #0a0a0a 100%)
          `,
        }}
      />
      {/* Flowing gradient orbs - stronger, more visible, create flow */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[100%] h-[80%] rounded-full blur-[150px] opacity-[0.08]"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.05) 40%, transparent 70%)` }}
      />
      <div
        className="absolute top-[30%] -right-1/4 w-[70%] h-[70%] rounded-full blur-[120px] opacity-[0.06]"
        style={{ background: `radial-gradient(ellipse 60% 80% at 30% 50%, rgba(34,197,94,0.2) 0%, transparent 60%)` }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[60%] rounded-full blur-[140px] opacity-[0.05]"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 80%, rgba(34,197,94,0.15) 0%, transparent 60%)` }}
      />
      <div
        className="absolute top-1/2 left-0 w-[50%] h-[50%] rounded-full blur-[100px] opacity-[0.04]"
        style={{ background: `radial-gradient(circle at 20% 50%, rgba(34,197,94,0.12) 0%, transparent 70%)` }}
      />
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      {/* Mouse-following soft glow */}
      <div
        className="absolute w-[80vmax] h-[80vmax] rounded-full transition-all duration-700 ease-out"
        style={{
          left: `calc(${mouse.x * 100}% - 40vmax)`,
          top: `calc(${mouse.y * 100}% - 40vmax)`,
          background: `radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 60%)`,
          filter: 'blur(50px)',
        }}
      />
      {/* Subtle floating dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 7 + 3) % 100}%`,
              top: `${(i * 11 + 5) % 100}%`,
              width: 2,
              height: 2,
              opacity: 0.04 + (i % 3) * 0.01,
              animation: `float ${15 + (i % 10)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const FLOAT_PARTICLES = [
  { id: 0, x: 25, y: 20, size: 1.5, duration: 18, delay: 0 },
  { id: 1, x: 60, y: 35, size: 2, duration: 22, delay: 1 },
  { id: 2, x: 45, y: 60, size: 1, duration: 20, delay: 2 },
  { id: 3, x: 75, y: 45, size: 2.5, duration: 25, delay: 0.5 },
  { id: 4, x: 35, y: 75, size: 1.2, duration: 19, delay: 1.5 },
  { id: 5, x: 85, y: 25, size: 1.8, duration: 21, delay: 2.5 },
  { id: 6, x: 55, y: 80, size: 1.3, duration: 23, delay: 0.8 },
  { id: 7, x: 70, y: 55, size: 2.2, duration: 17, delay: 1.2 },
  { id: 8, x: 40, y: 40, size: 1.6, duration: 24, delay: 2 },
  { id: 9, x: 90, y: 65, size: 1.1, duration: 19, delay: 0.3 },
  { id: 10, x: 30, y: 50, size: 2.1, duration: 26, delay: 1.8 },
  { id: 11, x: 65, y: 15, size: 1.4, duration: 20, delay: 0.6 },
]

function FlowingLinesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base - flows with page background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 70% 30%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.05) 45%, transparent 70%),
            radial-gradient(ellipse 70% 90% at 85% 75%, rgba(34,197,94,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 15% 55%, rgba(34,197,94,0.08) 0%, transparent 65%)
          `,
        }}
      />
      {/* Animated blob */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          left: '60%',
          top: '20%',
          backgroundColor: ACCENT,
          animation: 'heroBlob 8s ease-in-out infinite',
        }}
      />
      {/* Grid with more visible lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Big floating orbs */}
      {[
        { x: 75, y: 15, size: 120, delay: 0 },
        { x: 85, y: 70, size: 80, delay: 2 },
        { x: 25, y: 50, size: 100, delay: 1 },
        { x: 60, y: 85, size: 60, delay: 0.5 },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            backgroundColor: ACCENT,
            opacity: 0.15,
            animation: `heroOrbFloat ${10 + i * 2}s ease-in-out ${orb.delay}s infinite`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      {/* Floating particles */}
      {FLOAT_PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size * 2}px`,
            height: `${p.size * 2}px`,
            backgroundColor: ACCENT,
            opacity: 0.5,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 12px ${ACCENT}60`,
          }}
        />
      ))}
      {/* SVG flowing lines */}
      <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] max-w-2xl h-[90%] opacity-60" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="crusoeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.8" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
          <filter id="crusoeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 0 80 C 80 40, 120 120, 200 60 C 280 0, 320 100, 400 80"
          fill="none"
          stroke="url(#crusoeLineGrad)"
          strokeWidth="1.5"
          strokeDasharray="8 16"
          style={{ animation: 'flowDash 4s linear infinite' }}
        />
        <path
          d="M 0 180 C 100 140, 180 220, 280 160 C 340 120, 360 200, 400 180"
          fill="none"
          stroke="rgba(34,197,94,0.4)"
          strokeWidth="1"
          strokeDasharray="6 14"
          style={{ animation: 'flowDash 5s linear infinite 0.5s' }}
        />
        <path
          d="M 0 280 C 60 240, 140 300, 220 260 C 300 220, 360 280, 400 260"
          fill="none"
          stroke="rgba(34,197,94,0.25)"
          strokeWidth="0.8"
          strokeDasharray="5 12"
          style={{ animation: 'flowDash 6s linear infinite 1s' }}
        />
        <circle cx="100" cy="70" r="6" fill={ACCENT} filter="url(#crusoeGlow)" style={{ animation: 'heroPulse 2.5s ease-in-out infinite' }} />
        <circle cx="250" cy="150" r="5" fill={ACCENT} filter="url(#crusoeGlow)" style={{ animation: 'heroPulse 2.5s ease-in-out infinite 0.8s' }} />
        <circle cx="350" cy="220" r="6" fill={ACCENT} filter="url(#crusoeGlow)" style={{ animation: 'heroPulse 2.5s ease-in-out infinite 1.6s' }} />
      </svg>
    </div>
  )
}

export default function CrusoeCaseStudy() {
  const [activeSection, setActiveSection] = useState('hero')
  const [iterationVersion, setIterationVersion] = useState<'v1' | 'v2' | 'v3'>('v1') // V1 first by default
  const [barAnimated, setBarAnimated] = useState(false)
  const [walkthroughIndex, setWalkthroughIndex] = useState(0)
  const [figmaIndex, setFigmaIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [fidelityLevel, setFidelityLevel] = useState<'lofi' | 'midfi' | 'hifi'>('lofi') // Lo-Fi first by default
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(null)
  const [selectedPainPoint, setSelectedPainPoint] = useState<number | null>(null)
  const [expandedQA, setExpandedQA] = useState<number | null>(null)
  const [selectedToolIndex, setSelectedToolIndex] = useState<number | null>(null)
  const [navExpanded, setNavExpanded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Auto-advance Product walkthrough on mobile (every 4s)
  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      setWalkthroughIndex((i) => (i + 1) % NEXUS_IMAGES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isMobile])

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Animate bars when research section is visible
  useEffect(() => {
    const el = document.getElementById('research')
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setBarAnimated(true),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <main className="min-h-screen text-white crusoe-cursor-context relative">
      <CustomCursor />
      <SubtlePageBackground />
      {/* Sticky Nav - Collapsible */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between gap-4 px-4 md:px-6">
          <button
            data-cursor-hover
            onClick={() => setNavExpanded(!navExpanded)}
            className="flex items-center gap-2 min-h-[44px] px-4 py-3 rounded-full text-xs font-medium transition-all duration-300 touch-manipulation bg-white/5 hover:bg-white/10 text-white/80"
          >
            <span>{navExpanded ? 'Close' : (SECTIONS.find((s) => s.id === activeSection)?.label ?? 'Intro')}</span>
            <svg className={`w-4 h-4 transition-transform duration-200 ${navExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            data-cursor-hover
            onClick={toggleFullscreen}
            className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-white/50 hover:text-white/80 hover:bg-white/5 transition-all duration-300 touch-manipulation"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        </div>
        {navExpanded && (
          <div className="px-4 md:px-6 pb-3 pt-1 overflow-x-auto scrollbar-hide">
            <div className="min-w-max flex flex-wrap gap-2 justify-center">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setNavExpanded(false)}
                  data-cursor-hover
                  className={`shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center px-4 py-3 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 touch-manipulation ${
                    activeSection === s.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center px-4 pt-32 pb-20 md:px-6 md:pt-24 overflow-hidden"
      >
        <FlowingLinesBackground />
        {/* Gradient fade at bottom - soft blend, extends green further */}
        <div
          className="absolute bottom-0 left-0 right-0 h-3/4 pointer-events-none z-[1]"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(10,10,10,0.12) 75%, rgba(10,10,10,0.4) 90%, #0a0a0a 100%)`,
          }}
        />
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>
            Interactive Case Study
          </p>
          <p className="text-white/40 text-sm mb-2">Anusha Ramachandran</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Nexus</h1>
          <p className="text-lg md:text-2xl text-white/60 italic mb-12 font-serif min-h-[3rem]">
            <TypingEffect />
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-white/40 uppercase tracking-wider mb-1">Role</p>
              <p className="text-white/90">Product Designer</p>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-wider mb-1">Context</p>
              <p className="text-white/90">Internship @ narb.</p>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-wider mb-1">Duration</p>
              <p className="text-white/90">10 weeks</p>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-wider mb-1">Tools</p>
              <p className="text-white/90">Figma, Cursor, Lovable</p>
            </div>
          </div>
          <p className="text-white/60 text-sm mt-6 leading-relaxed">
            Scroll through the story. Click to dig deeper.
          </p>
          <p className="mt-16 text-white/40 text-sm flex items-center justify-center gap-2 animate-subtle-pulse">
            <span>Scroll to explore</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </p>
        </div>
      </section>

      {/* Problem */}
      <section
        id="problem"
        className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]"
      >
        <FadeIn>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">The Problem</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            As a student myself, I find myself needing to double check answers through multiple models, especially for harder subjects. One AI might give me a wrong formula for physics or a shaky explanation for calculus. Students rely on AI for homework and research, but we don&apos;t trust a single model&apos;s answer. We copy prompts between ChatGPT, Claude, and Gemini, then manually compare responses. It&apos;s slow, exhausting, and creates a trust gap. Which answer is actually right?
          </p>
          <div
            className="rounded-xl p-8 border transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]"
            style={{
              background: `linear-gradient(145deg, ${ACCENT}15 0%, ${ACCENT}05 100%)`,
              borderColor: `${ACCENT}40`,
            }}
          >
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Design Challenge</p>
            <p className="text-xl text-white/90 leading-relaxed mb-4">
              How might we give students one accurate answer by aggregating and comparing responses from multiple AI models?
            </p>
            <p className="text-white/50 text-sm">
              This question drove every design decision. One answer. Many models behind the scenes. Trust through consensus.
            </p>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* Research */}
      <section
        id="research"
        className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]"
      >
        <FadeIn>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Research</h2>
          <p className="text-white/50 text-sm mb-8">I needed to understand the problem before designing. Here&apos;s what I learned and how it shaped the product.</p>
          <div className="rounded-xl p-6 bg-white/[0.03] border border-white/10 mb-8">
            <h3 className="text-sm font-semibold mb-3" style={{ color: ACCENT }}>How I Researched This Problem</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2"><span className="text-white/50">1.</span> Surveyed 48 college students on AI usage, cross-checking habits, and friction points</li>
              <li className="flex items-start gap-2"><span className="text-white/50">2.</span> Mapped the competitive landscape (ChatGPT, Claude, Poe, OpenRouter) to find the gap</li>
              <li className="flex items-start gap-2"><span className="text-white/50">3.</span> Validated the trust gap with quantitative data before designing</li>
            </ul>
          </div>
          <p className="text-white/70 leading-relaxed mb-6">
            To validate the problem and understand how students actually use AI for homework and research, I ran a survey with 48 college students. I asked about their current workflows: which tools they use, how often they cross-check answers across models, and where they run into friction. The goal was to quantify the trust gap and identify the biggest pain points.
          </p>

          {/* Interactive Pain Points Bar Chart */}
          <p className="text-white/50 text-sm mb-4">Top pain points: click a bar to explore</p>
          <div className="space-y-4 mb-8">
            {PAIN_POINT_DATA.map((item, i) => (
              <div key={i} className="group">
                <button
                  data-cursor-hover
                  onClick={() => setSelectedPainPoint(selectedPainPoint === i ? null : i)}
                  className="w-full flex items-center gap-4 text-left transition-all duration-300"
                >
                  <span className="text-white/60 text-sm w-36 md:w-40 shrink-0">{item.label}</span>
                  <div className="flex-1 h-9 bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:bg-white/[0.08] transition-colors">
                    <div
                      className="h-full rounded-lg transition-all duration-1000 ease-out"
                      style={{
                        width: barAnimated ? `${item.value}%` : '0%',
                        backgroundColor: selectedPainPoint === i ? ACCENT : `${ACCENT}99`,
                      }}
                    />
                  </div>
                  <span className="text-white/60 text-sm w-12 text-right">{item.value}%</span>
                </button>
                {selectedPainPoint === i && (
                  <div className="mt-3 ml-0 pl-0 md:ml-40 md:pl-0 rounded-lg p-4 bg-white/[0.04] border border-white/10 transition-all duration-200">
                    <p className="text-white/80 text-sm italic mb-2">{item.quote}</p>
                    <p className="text-white/50 text-xs">{item.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Tool Usage Bar Chart */}
          <p className="text-white/50 text-sm mb-4">Tools students use: click a bar to explore</p>
          <div className="space-y-4 mb-12">
            {TOOL_USAGE_DATA.map((t, i) => (
              <div key={i} className="group">
                <button
                  data-cursor-hover
                  onClick={() => setSelectedToolIndex(selectedToolIndex === i ? null : i)}
                  className="w-full flex items-center gap-4 text-left transition-all duration-300"
                >
                  <span className="text-white/60 text-sm w-20 shrink-0">{t.name}</span>
                  <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:bg-white/[0.08] transition-colors">
                    <div
                      className="h-full rounded-lg transition-all duration-1000 ease-out"
                      style={{
                        width: barAnimated ? `${t.pct}%` : '0%',
                        backgroundColor: selectedToolIndex === i ? ACCENT : `${ACCENT}99`,
                      }}
                    />
                  </div>
                  <span className="text-white/60 text-sm w-12 text-right">{t.pct}%</span>
                </button>
                {selectedToolIndex === i && (
                  <div className="mt-3 ml-0 md:ml-24 rounded-lg p-4 bg-white/[0.04] border border-white/10 transition-all duration-200">
                    <p className="text-white/60 text-sm">{t.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Survey Q&A - Expandable */}
          <p className="text-white/50 text-sm mb-4">Sample questions & responses from the survey</p>
          <div className="space-y-3 mb-12">
            {SURVEY_QA.map((qa, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  data-cursor-hover
                  onClick={() => setExpandedQA(expandedQA === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-white/80 text-sm font-medium">{qa.q}</span>
                  <span className="text-white/40 text-xs shrink-0">{expandedQA === i ? '−' : '+'}</span>
                </button>
                {expandedQA === i && (
                  <div className="px-4 pb-4 pt-0 border-t border-white/5">
                    <ul className="space-y-2 mt-3">
                      {qa.responses.map((r, j) => (
                        <li key={j} className="text-white/60 text-sm italic pl-4 border-l-2" style={{ borderColor: `${ACCENT}40` }}>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Competitive Gap */}
          <div className="rounded-xl p-6 bg-white/[0.03] border border-white/10">
            <h3 className="text-lg font-semibold mb-4" style={{ color: ACCENT }}>Competitive Gap</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              {[
                { name: 'ChatGPT', desc: 'Single model, locked' },
                { name: 'Claude', desc: 'Single model' },
                { name: 'Poe', desc: 'Multi-model, separate outputs' },
                { name: 'OpenRouter', desc: 'API only, no synthesis' },
                { name: 'Nexus', desc: 'Aggregated, consensus-backed', highlight: true },
              ].map((c, i) => (
                <div
                  key={i}
                  data-cursor-hover
                  className={`p-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    c.highlight ? 'border-2' : 'bg-white/5'
                  }`}
                  style={c.highlight ? { borderColor: ACCENT, backgroundColor: `${ACCENT}10` } : {}}
                >
                  <p className={`font-medium ${c.highlight ? '' : ''}`} style={c.highlight ? { color: ACCENT } : {}}>{c.name}</p>
                  <p className="text-white/50 text-xs mt-1">{c.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm mt-4">
              None aggregate responses into one answer. Nexus fills this gap.
            </p>
          </div>
          <div className="mt-8 p-4 rounded-lg border-l-4" style={{ borderColor: ACCENT, backgroundColor: `${ACCENT}08` }}>
            <p className="text-white/70 text-sm">
              <strong className="text-white/90">Design insight:</strong> The research told me to prioritize one unified answer, make model transparency visible but not overwhelming, and cut tab hopping entirely. That became the backbone of every screen.
            </p>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* Design Principles */}
      <section
        id="principles"
        className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]"
      >
        <FadeIn>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Design Principles</h2>
          <p className="text-white/50 text-sm mb-8">These three principles guided every design decision. Click expand to see the reasoning behind each.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                theme: 'Confidence',
                quote: '"ChatGPT gave me a wrong formula for my physics exam. Never trusting one AI again."',
                principle: 'Confidence comes from consensus. If multiple AIs agree, the answer is more likely correct.',
                designDecision: 'We surfaced consensus in the answer itself. Model badges show who contributed. No guessing.',
                icon: '✓',
              },
              {
                theme: 'Comparison',
                quote: '"I spend 20 minutes comparing answers across tools. That\'s longer than just Googling it."',
                principle: 'Comparison should happen automatically. Users want one clear answer, not multiple options to sort through.',
                designDecision: 'One answer. Always. Models run in parallel behind the scenes. The user never compares manually.',
                icon: '⇄',
              },
              {
                theme: 'Simplicity',
                quote: '"I have 6 tabs open just to do homework. It\'s exhausting."',
                principle: 'Complexity should happen behind the scenes. Users just want the answer.',
                designDecision: 'One place. One input. One output. Tabs, prompts, and model switching all hidden.',
                icon: '◉',
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl bg-white/[0.03] border text-left transition-all duration-300 hover:border-white/20 ${
                  expandedPrinciple === i ? 'border-white/30' : 'border-white/10'
                }`}
                style={expandedPrinciple === i ? { boxShadow: `0 0 0 1px ${ACCENT}40` } : {}}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0" style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}>
                    {card.icon}
                  </div>
                  <button
                    data-cursor-hover
                    onClick={(e) => { e.stopPropagation(); setExpandedPrinciple(expandedPrinciple === i ? null : i); }}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 touch-manipulation ${
                      expandedPrinciple === i
                        ? 'text-white/60 bg-white/5'
                        : 'text-white/90 bg-white/10 hover:bg-white/15 border border-white/20 animate-subtle-pulse'
                    }`}
                    style={expandedPrinciple !== i ? { color: ACCENT, borderColor: `${ACCENT}60` } : {}}
                  >
                    {expandedPrinciple === i ? '▲ collapse' : '▼ expand'}
                  </button>
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: ACCENT }}>{card.theme}</h3>
                {expandedPrinciple === i ? (
                  <>
                    <p className="text-white/60 italic text-sm mb-4">&quot;{card.quote}&quot;</p>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">{card.principle}</p>
                    <p className="text-white/50 text-xs pt-3 border-t border-white/10">
                      <span style={{ color: ACCENT }}>Design decision:</span> {card.designDecision}
                    </p>
                  </>
                ) : (
                  <p className="text-white/50 text-sm">Click expand to read more</p>
                )}
              </div>
            ))}
          </div>
        </div>
        </FadeIn>
      </section>

      {/* Key Iteration - Model Selector */}
      <section
        id="iteration"
        className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]"
      >
        <FadeIn>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Key Iteration: Model Selector</h2>
          <p className="text-white/50 text-sm mb-6">The hardest design question: how do we show which models contributed without overwhelming the user? Click each version to see what we tried and why.</p>
          <p className="text-white/40 text-xs mb-8">Click to explore each iteration</p>

          {/* Version tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {(['v1', 'v2', 'v3'] as const).map((v) => (
              <button
                key={v}
                data-cursor-hover
                onClick={() => setIterationVersion(v)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 border touch-manipulation ${
                  iterationVersion === v
                    ? 'text-black border-transparent shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)] hover:shadow-[0_0_24px_-5px_rgba(34,197,94,0.5)]'
                    : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border-white/20 hover:border-white/40 hover:shadow-[0_0_20px_-8px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 animate-subtle-pulse'
                }`}
                style={iterationVersion === v ? { backgroundColor: ACCENT } : { borderColor: `${ACCENT}40` }}
              >
                {v === 'v1' ? 'V1: Full Panel' : v === 'v2' ? 'V2: Expand to Reveal' : 'V3: Model Selector ✓'}
              </button>
            ))}
          </div>

          {/* Mockup + description */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Mockup area */}
            <div className="rounded-xl overflow-hidden bg-[#111] border border-white/10 p-4 min-h-[320px]">
              {iterationVersion === 'v1' && (
                <div className="flex gap-2 h-full">
                  <div className="w-1/3 bg-[#1a1a1a] rounded-lg p-3">
                    <p className="text-white/40 text-xs mb-2">Sidebar</p>
                    <div className="space-y-2">
                      {['GPT-4', 'Claude', 'Gemini'].map((m, i) => (
                        <div key={i} className="p-2 rounded bg-white/5 text-xs">{m}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 bg-[#1a1a1a] rounded-lg p-3">
                    <p className="text-white/40 text-xs mb-2">Response area</p>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/10 rounded w-full" />
                      <div className="h-2 bg-white/10 rounded w-3/4" />
                      <div className="h-2 bg-white/10 rounded w-5/6" />
                    </div>
                    <p className="text-white/30 text-xs mt-4">Separate model responses</p>
                  </div>
                </div>
              )}
              {iterationVersion === 'v2' && (
                <div className="space-y-4">
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <p className="text-white/40 text-xs mb-2">Chat</p>
                    <div className="h-3 bg-white/10 rounded w-2/3 mb-4" />
                    <div className="space-y-2">
                      <div className="h-2 bg-white/10 rounded w-full" />
                      <div className="h-2 bg-white/10 rounded w-4/5" />
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2 text-white/50 text-xs cursor-pointer">
                        <span>▼</span>
                        <span>Which models contributed?</span>
                      </div>
                      <div className="mt-2 flex gap-1">
                        {['GPT-4', 'Claude', 'Gemini'].map((m, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-white/10">{m}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-white/30 text-[10px] mt-2">User had to click to reveal</p>
                  </div>
                </div>
              )}
              {iterationVersion === 'v3' && (
                <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-3">
                  <p className="text-white/40 text-xs mb-2">Chat</p>
                  <div className="h-3 bg-white/10 rounded w-2/3 mb-4" />
                  <div className="text-white/40 text-xs mb-3">Send a message...</div>
                  {/* Model selector bar - collapsed state */}
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex -space-x-1">
                      <span className="w-5 h-5 rounded-full bg-blue-500/80 flex items-center justify-center text-[10px] font-bold">G</span>
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">+2</span>
                    </div>
                    <span className="text-white/80 text-xs flex-1">5 models selected</span>
                    <span className="text-white/40 text-xs">▾</span>
                  </div>
                  {/* Dropdown preview - what users see when they click */}
                  <div className="rounded-lg border border-white/10 overflow-hidden text-left">
                    <p className="text-white/50 text-[10px] px-2 py-1 bg-white/5">Choose one or more intermediary models</p>
                    <div className="p-2 space-y-1">
                      <p className="text-amber-400/80 text-[10px] font-medium">Premium</p>
                      {['Claude Sonnet 4', 'Gemini 2.5 Pro', 'GPT-5'].map((m, i) => (
                        <div key={i} className="flex items-center gap-2 py-1 text-[10px] text-white/40">
                          <span className="w-3 h-3 rounded border border-white/30" />
                          {m} <span className="text-white/30">Upgrade</span>
                        </div>
                      ))}
                      <p className="text-white/50 text-[10px] font-medium mt-2">Free</p>
                      {['Gemini 2.0 Flash', 'DeepSeek v3', 'GPT-4o Mini'].map((m, i) => (
                        <div key={i} className="flex items-center gap-2 py-1 text-[10px] text-white/70">
                          <span className="w-3 h-3 rounded flex items-center justify-center" style={{ backgroundColor: ACCENT }}>✓</span>
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              {iterationVersion === 'v1' && (
                <>
                  <h3 className="text-lg font-semibold mb-2">V1: Full Panel</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Sidebar showed each model&apos;s response separately. Users had to read through multiple blocks.
                  </p>
                  <p className="text-white/40 text-sm">
                    <strong className="text-red-400/80">Why it failed:</strong> Too much cognitive load. Defeated the &quot;one answer&quot; promise.
                  </p>
                </>
              )}
              {iterationVersion === 'v2' && (
                <>
                  <h3 className="text-lg font-semibold mb-2">V2: Expand to Reveal</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Below each response, a &quot;Which models contributed?&quot; link let users expand to see the model badges.
                  </p>
                  <p className="text-white/40 text-sm">
                    <strong className="text-amber-400/80">Why it failed:</strong> Transparency was hidden behind a click. Most users never expanded it. We wanted model visibility to be immediate, with no extra step.
                  </p>
                </>
              )}
              {iterationVersion === 'v3' && (
                <>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: ACCENT }}>V3: Model Selector ✓</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Shows &quot;5 models selected&quot; with model icons. Click to open dropdown: Premium models at top (locked), free models below with checkmarks for selected ones.
                  </p>
                  <p className="text-white/70 text-sm mb-4">
                    <strong style={{ color: ACCENT }}>Shipped:</strong> One-tap visibility into which models are running. Premium vs free clearly separated. No friction to see or change selection.
                  </p>
                  <p className="text-white/50 text-xs pt-3 border-t border-white/10">
                    <span style={{ color: ACCENT }}>Design insight:</span> Transparency had to be immediate. No clicks. No hidden panels. The user sees trust at a glance.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* Follow the Journey - Product Walkthrough */}
      <section id="walkthrough" className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]">
        <FadeIn>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Follow the Journey</h2>
          <p className="text-white/50 text-sm mb-6">Click through to follow one student&apos;s path, from landing to trusted answer. Each screen has a design note explaining why it matters.</p>
          <div className="rounded-xl overflow-hidden bg-[#111] border border-white/10">
            <div className="relative aspect-[16/10]">
              <Image
                src={NEXUS_IMAGES[walkthroughIndex].src}
                alt={NEXUS_IMAGES[walkthroughIndex].label}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="p-4 bg-[#0a0a0a] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-white/80 text-sm font-medium">{NEXUS_IMAGES[walkthroughIndex].label}</p>
                {'why' in NEXUS_IMAGES[walkthroughIndex] && (
                  <p className="text-white/40 text-xs mt-1">{NEXUS_IMAGES[walkthroughIndex].why}</p>
                )}
              </div>
              <div className="hidden md:flex gap-2">
                <button
                  data-cursor-hover
                  onClick={() => setWalkthroughIndex((i) => (i - 1 + NEXUS_IMAGES.length) % NEXUS_IMAGES.length)}
                  className="min-h-[44px] min-w-[44px] px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 touch-manipulation"
                >
                  ← Prev
                </button>
                <button
                  data-cursor-hover
                  onClick={() => setWalkthroughIndex((i) => (i + 1) % NEXUS_IMAGES.length)}
                  className="min-h-[44px] min-w-[44px] px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 touch-manipulation"
                  style={{ backgroundColor: ACCENT, color: '#000' }}
                >
                  Next →
                </button>
              </div>
            </div>
            <div className="hidden md:flex gap-2 p-2 overflow-x-auto scrollbar-hide">
              {NEXUS_IMAGES.map((img, i) => (
                <button
                  key={i}
                  data-cursor-hover
                  onClick={() => setWalkthroughIndex(i)}
                  className={`shrink-0 w-20 h-12 md:w-16 md:h-10 min-h-[44px] rounded overflow-hidden border-2 transition-all duration-300 hover:scale-110 touch-manipulation ${
                    walkthroughIndex === i ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img.src} alt={img.label} width={80} height={48} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* From Sketch to Ship - Design Process */}
      <section id="figma-process" className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]">
        <FadeIn>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">From Sketch to Ship</h2>
          <p className="text-white/50 text-sm mb-3">Watch the idea take shape.</p>
          <p className="text-white/60 text-sm mb-4">Lo-fi to validate structure. Mid-fi to test flows. Hi-fi to ship. Each stage answered a different question: layout first, then interaction, then polish.</p>
          <p className="text-white/40 text-xs mb-4">Click each stage to explore the design evolution</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {(['lofi', 'midfi', 'hifi'] as const).map((level) => (
              <button
                key={level}
                data-cursor-hover
                onClick={() => setFidelityLevel(level)}
                className={`min-h-[44px] px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300 border touch-manipulation ${
                  fidelityLevel === level
                    ? 'text-black border-transparent shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)]'
                    : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 hover:shadow-[0_0_20px_-8px_rgba(255,255,255,0.2)] hover:-translate-y-0.5'
                }`}
                style={fidelityLevel === level ? { backgroundColor: ACCENT } : {}}
              >
                {level === 'lofi' ? 'Lo-Fi' : level === 'midfi' ? 'Mid-Fi' : 'Hi-Fi Figma'}
              </button>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden bg-[#0a0a0a] overflow-x-hidden">
            <div className="relative min-h-[520px] md:min-h-0 md:aspect-[16/9] bg-[#0a0a0a]">
              {fidelityLevel === 'lofi' && (
                <div className="absolute inset-0 flex items-start md:items-center justify-center p-4 md:p-6 overflow-auto overscroll-contain">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl min-w-0 py-4 md:py-0">
                    <div className="rounded-xl overflow-hidden bg-[#fefcf8] p-4 md:p-6 border border-[#e8e4dc] min-w-0">
                      <p className="text-[#555] text-xs font-semibold mb-4 uppercase tracking-wider">Onboarding</p>
                      <svg viewBox="0 0 400 480" className="w-full h-auto">
                        <defs>
                          <filter id="crusoePencilSketch" x="-5%" y="-5%" width="110%" height="110%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                          </filter>
                        </defs>
                        <text x="15" y="16" fill="#777" fontSize="10" fontStyle="italic">hero</text>
                        <text x="220" y="16" fill="#777" fontSize="10" fontStyle="italic">features</text>
                        <g transform="translate(10, 24)">
                          <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 12 10 Q 30 8, 45 12" stroke="#555" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 140 9 Q 155 7, 165 13 Q 168 19, 155 21 Q 142 19, 140 9" fill="none" stroke="#666" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 30 30 Q 88 26, 145 33" stroke="#444" strokeWidth="2.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 45 42 Q 88 38, 130 45" stroke="#555" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 35 54 Q 88 50, 140 56" stroke="#bbb" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <circle cx="72" cy="66" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <circle cx="82" cy="66" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <circle cx="92" cy="66" r="4" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <path d="M 25 76 Q 28 71, 148 73 Q 154 77, 151 84 Q 146 90, 31 88 Q 25 84, 25 76" fill="none" stroke="#555" strokeWidth="1.5" filter="url(#crusoePencilSketch)"/>
                          <circle cx="140" cy="80" r="4" fill="none" stroke="#444" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                        </g>
                        <path d="M 193 68 Q 203 65, 207 71" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#crusoePencilSketch)"/>
                        <path d="M 203 65 L 209 71 L 201 75" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#crusoePencilSketch)"/>
                        <g transform="translate(215, 24)">
                          <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 40 15 Q 88 11, 135 17" stroke="#444" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 55 26 Q 88 22, 120 28" stroke="#888" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 15 40 Q 18 36, 52 38 Q 56 42, 54 68 Q 50 72, 18 70 Q 15 66, 15 40" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <path d="M 25 50 Q 35 48, 45 52" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 62 40 Q 65 36, 110 38 Q 115 42, 113 68 Q 108 72, 66 70 Q 62 66, 62 40" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <path d="M 72 50 Q 88 48, 102 52" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 120 40 Q 123 36, 162 38 Q 167 42, 165 68 Q 160 72, 125 70 Q 120 66, 120 40" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <circle cx="50" cy="82" r="4" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <circle cx="70" cy="82" r="4" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <circle cx="90" cy="82" r="4" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <circle cx="110" cy="82" r="4" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                        </g>
                        <text x="15" y="130" fill="#777" fontSize="10" fontStyle="italic">testimonial</text>
                        <text x="220" y="130" fill="#777" fontSize="10" fontStyle="italic">success stories</text>
                        <g transform="translate(10, 138)">
                          <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <text x="18" y="30" fill="#ccc" fontSize="24" fontFamily="Georgia, serif">&quot;</text>
                          <path d="M 42 20 Q 100 16, 155 23" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 38 32 Q 100 28, 160 35" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 42 44 Q 100 40, 145 47" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <circle cx="88" cy="62" r="9" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 60 78 Q 88 74, 115 80" stroke="#666" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <path d="M 55 85" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                        </g>
                        <path d="M 193 182 Q 203 179, 207 185" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#crusoePencilSketch)"/>
                        <path d="M 203 179 L 209 185 L 201 189" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#crusoePencilSketch)"/>
                        <g transform="translate(215, 138)">
                          <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 40 12 Q 88 8, 135 15" stroke="#444" strokeWidth="1.5" filter="url(#crusoePencilSketch)"/>
                          <path d="M 25 26 Q 28 22, 150 24 Q 155 28, 153 62 Q 148 68, 30 65 Q 25 60, 25 26" fill="none" stroke="#666" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <circle cx="140" cy="42" r="10" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <path d="M 35 35 Q 70 32, 100 38" stroke="#555" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <path d="M 35 45 Q 80 42, 115 48" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 35 55 Q 75 52, 105 58" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 40 72 Q 43 68, 75 70 Q 78 74, 76 82 Q 72 86, 43 84 Q 40 80, 40 72" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <path d="M 85 72 Q 88 68, 120 70 Q 123 74, 121 82 Q 117 86, 88 84 Q 85 80, 85 72" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                        </g>
                        <text x="15" y="244" fill="#777" fontSize="10" fontStyle="italic">reviews</text>
                        <text x="220" y="244" fill="#777" fontSize="10" fontStyle="italic">sign up</text>
                        <g transform="translate(10, 252)">
                          <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 30 12 Q 88 8, 145 15" stroke="#444" strokeWidth="1.5" filter="url(#crusoePencilSketch)"/>
                          <path d="M 12 26 Q 15 22, 52 24 Q 56 28, 54 68 Q 50 72, 16 70 Q 12 66, 12 26" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <circle cx="33" cy="38" r="5" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 18 50 Q 33 47, 48 53" stroke="#aaa" strokeWidth="0.6" filter="url(#crusoePencilSketch)"/>
                          <path d="M 18 58 Q 33 55, 45 61" stroke="#bbb" strokeWidth="0.5" filter="url(#crusoePencilSketch)"/>
                          <path d="M 62 26 Q 65 22, 112 24 Q 117 28, 115 68 Q 110 72, 66 70 Q 62 66, 62 26" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <circle cx="88" cy="38" r="5" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 68 50 Q 88 47, 108 53" stroke="#aaa" strokeWidth="0.6" filter="url(#crusoePencilSketch)"/>
                          <path d="M 122 26 Q 125 22, 165 24 Q 170 28, 168 68 Q 163 72, 126 70 Q 122 66, 122 26" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <circle cx="145" cy="38" r="5" fill="none" stroke="#777" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 128 50 Q 145 47, 162 53" stroke="#aaa" strokeWidth="0.6" filter="url(#crusoePencilSketch)"/>
                          <path d="M 60 80 Q 72 77, 88 82 Q 100 77, 115 82" stroke="#bbb" strokeWidth="0.6" filter="url(#crusoePencilSketch)"/>
                        </g>
                        <path d="M 193 296 Q 203 293, 207 299" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#crusoePencilSketch)"/>
                        <path d="M 203 293 L 209 299 L 201 303" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#crusoePencilSketch)"/>
                        <g transform="translate(215, 252)">
                          <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 20 15 Q 23 10, 155 12 Q 161 18, 159 78 Q 154 85, 25 82 Q 20 76, 20 15" fill="none" stroke="#555" strokeWidth="1.5" filter="url(#crusoePencilSketch)"/>
                          <path d="M 50 26 Q 88 22, 125 29" stroke="#444" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 32 40 Q 36 36, 142 38 Q 146 42, 144 50 Q 140 54, 36 52 Q 32 48, 32 40" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 32 58 Q 36 54, 142 56 Q 146 60, 144 68 Q 140 72, 36 70 Q 32 66, 32 58" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                        </g>
                        <text x="15" y="358" fill="#777" fontSize="10" fontStyle="italic">pricing</text>
                        <g transform="translate(10, 366)">
                          <path d="M 3 2 Q 1 5, 2 88 Q 4 93, 172 91 Q 177 88, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 15 12 Q 18 8, 52 10 Q 56 14, 54 65 Q 50 71, 18 68 Q 15 63, 15 12" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 22 20 Q 38 17, 48 22" stroke="#555" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <path d="M 25 32 Q 35 30, 45 34" stroke="#aaa" strokeWidth="0.6" filter="url(#crusoePencilSketch)"/>
                          <path d="M 25 42 Q 35 40, 45 44" stroke="#aaa" strokeWidth="0.6" filter="url(#crusoePencilSketch)"/>
                          <path d="M 22 56 Q 35 53, 48 58" stroke="#bbb" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 62 12 Q 66 8, 115 10 Q 120 14, 118 65 Q 113 71, 68 68 Q 62 63, 62 12" fill="none" stroke="#444" strokeWidth="1.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 72 20 Q 92 17, 108 22" stroke="#444" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 75 32 Q 88 30, 105 34" stroke="#666" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 75 42 Q 88 40, 105 44" stroke="#666" strokeWidth="0.8" filter="url(#crusoePencilSketch)"/>
                          <path d="M 125 12 Q 128 8, 162 10 Q 167 14, 165 65 Q 160 71, 130 68 Q 125 63, 125 12" fill="none" stroke="#888" strokeWidth="1.2" filter="url(#crusoePencilSketch)"/>
                          <path d="M 132 20 Q 148 17, 158 22" stroke="#555" strokeWidth="1" filter="url(#crusoePencilSketch)"/>
                          <text x="65" y="82" fill="#888" fontSize="7" fontStyle="italic">&quot;pick plan&quot;</text>
                        </g>
                      </svg>
                    </div>
                    <div className="rounded-xl overflow-hidden bg-[#fefcf8] p-4 md:p-6 border border-[#e8e4dc] min-w-0">
                      <p className="text-[#555] text-xs font-semibold mb-4 uppercase tracking-wider">Core Chat Interface</p>
                      <svg viewBox="0 0 400 280" className="w-full h-auto">
                        <defs>
                          <filter id="crusoePencilSketch2" x="-5%" y="-5%" width="110%" height="110%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                          </filter>
                        </defs>
                        <text x="15" y="18" fill="#777" fontSize="11" fontStyle="italic">chat interface</text>
                        <text x="220" y="18" fill="#777" fontSize="11" fontStyle="italic">model selector</text>
                        <g transform="translate(10, 28)">
                          <path d="M 3 2 Q 1 5, 2 118 Q 4 123, 172 121 Q 177 118, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 8 8 Q 10 5, 45 7 Q 48 10, 46 115 Q 43 118, 10 116 Q 8 112, 8 8" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 15 18 Q 25 16, 38 20" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 15 28 Q 28 26, 40 30" stroke="#bbb" strokeWidth="0.6" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 15 38 Q 28 36, 40 40" stroke="#bbb" strokeWidth="0.6" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 55 12 Q 70 10, 95 14 Q 100 18, 95 22 Q 85 24, 58 20" fill="none" stroke="#666" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 105 12 Q 118 10, 128 14 Q 132 18, 128 22 Q 120 24, 108 20" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 70 55 Q 110 52, 150 58" stroke="#555" strokeWidth="1.5" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 85 68 Q 110 65, 135 70" stroke="#888" strokeWidth="1.2" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 55 90 Q 58 85, 165 87 Q 172 92, 168 105 Q 162 112, 62 108 Q 55 102, 55 90" fill="none" stroke="#444" strokeWidth="1.8" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 68 98 Q 95 95, 120 100" stroke="#ccc" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="158" cy="98" r="5" fill="none" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 85 115 Q 88 112, 135 114 Q 140 118, 135 122 Q 128 124, 90 122 Q 85 118, 85 115" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="95" cy="118" r="3" fill="none" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="105" cy="118" r="3" fill="none" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <text x="50" y="138" fill="#888" fontSize="8" fontStyle="italic">&quot;good afternoon&quot;</text>
                        </g>
                        <path d="M 193 85 Q 203 82, 207 88" stroke="#666" strokeWidth="1.5" fill="none" filter="url(#crusoePencilSketch2)"/>
                        <path d="M 203 82 L 209 88 L 201 92" stroke="#666" strokeWidth="1.2" fill="none" filter="url(#crusoePencilSketch2)"/>
                        <g transform="translate(215, 28)">
                          <path d="M 3 2 Q 1 5, 2 118 Q 4 123, 172 121 Q 177 118, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 25 30 Q 28 25, 150 27 Q 156 32, 154 110 Q 150 116, 30 113 Q 25 108, 25 30" fill="none" stroke="#555" strokeWidth="1.5" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 35 40 Q 88 36, 140 42" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="45" cy="55" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 55 52 Q 85 49, 110 55" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="45" cy="72" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 55 69 Q 85 66, 105 72" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="45" cy="89" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 55 86 Q 75 83, 90 89" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="45" cy="103" r="5" fill="none" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 55 100 Q 95 97, 130 103" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch2)"/>
                          <text x="45" y="135" fill="#888" fontSize="8" fontStyle="italic">&quot;5 models&quot;</text>
                        </g>
                        <text x="15" y="175" fill="#777" fontSize="11" fontStyle="italic">response</text>
                        <g transform="translate(10, 185)">
                          <path d="M 3 2 Q 1 5, 2 78 Q 4 83, 172 81 Q 177 78, 175 5 Q 172 1, 5 3 Z" fill="none" stroke="#666" strokeWidth="1.8" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 8 8 Q 10 5, 45 7 Q 48 10, 46 75" fill="none" stroke="#ccc" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 55 15 Q 58 10, 165 12 Q 172 18, 168 58 Q 162 65, 62 62 Q 55 56, 55 15" fill="none" stroke="#555" strokeWidth="1.2" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 65 25 Q 110 22, 155 28" stroke="#888" strokeWidth="1" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 65 35 Q 120 32, 158 38" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <path d="M 65 45 Q 100 42, 130 48" stroke="#aaa" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="72" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="85" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <circle cx="98" cy="72" r="4" fill="none" stroke="#888" strokeWidth="0.8" filter="url(#crusoePencilSketch2)"/>
                          <text x="55" y="95" fill="#888" fontSize="8" fontStyle="italic">&quot;consolidated answer&quot;</text>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              {fidelityLevel === 'midfi' && (
                <div className="absolute inset-0 flex items-start md:items-center justify-center p-4 md:p-6 overflow-auto overscroll-contain">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl min-w-0 py-4 md:py-0">
                    <div className="rounded-xl overflow-hidden bg-[#1e1e1e] p-4 md:p-6 border border-[#333] min-w-0">
                      <p className="text-[#666] text-xs font-semibold mb-4 uppercase tracking-wider">Onboarding</p>
                      <svg viewBox="0 0 400 520" className="w-full h-auto">
                        <defs>
                          <marker id="crusoeCleanArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                            <path d="M 0 0 L 8 3 L 0 6 Z" fill="#666"/>
                          </marker>
                          <pattern id="crusoeGrid1" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a2a2a" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="400" height="520" fill="url(#crusoeGrid1)"/>
                        <text x="15" y="18" fill="#666" fontSize="9">Hero</text>
                        <text x="215" y="18" fill="#666" fontSize="9">Features</text>
                        <g transform="translate(10, 25)">
                          <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="8" y="6" width="35" height="5" rx="1" fill="#fff"/>
                          <rect x="130" y="5" width="18" height="7" rx="1" fill="#333"/>
                          <rect x="152" y="5" width="18" height="7" rx="3.5" fill="#fff"/>
                          <rect x="30" y="25" width="115" height="7" rx="1" fill="#fff"/>
                          <rect x="45" y="37" width="85" height="5" rx="1" fill="#666"/>
                          <rect x="35" y="48" width="105" height="4" rx="1" fill="#444"/>
                          <circle cx="68" cy="60" r="4" fill="#333"/>
                          <circle cx="78" cy="60" r="4" fill="#444"/>
                          <circle cx="88" cy="60" r="4" fill="#555"/>
                          <rect x="96" y="58" width="30" height="4" rx="1" fill="#444"/>
                          <rect x="25" y="72" width="125" height="14" rx="7" fill="#1a1a1a" stroke="#333" strokeWidth="1"/>
                          <rect x="35" y="77" width="55" height="4" rx="1" fill="#555"/>
                          <circle cx="140" cy="79" r="4" fill="#fff"/>
                          <rect x="55" y="90" width="65" height="6" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                        </g>
                        <path d="M 193 75 L 202 75" stroke="#666" strokeWidth="1" markerEnd="url(#crusoeCleanArrow)"/>
                        <g transform="translate(210, 25)">
                          <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="35" y="10" width="105" height="6" rx="1" fill="#fff"/>
                          <rect x="50" y="20" width="75" height="4" rx="1" fill="#666"/>
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
                          <circle cx="50" cy="88" r="5" fill="#333"/>
                          <circle cx="70" cy="88" r="5" fill="#444"/>
                          <circle cx="90" cy="88" r="5" fill="#555"/>
                          <circle cx="110" cy="88" r="5" fill="#333"/>
                        </g>
                        <text x="15" y="148" fill="#666" fontSize="9">Testimonial</text>
                        <text x="215" y="148" fill="#666" fontSize="9">Success Stories</text>
                        <g transform="translate(10, 155)">
                          <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <text x="15" y="30" fill="#333" fontSize="24" fontFamily="Georgia, serif">&quot;</text>
                          <rect x="40" y="18" width="120" height="4" rx="1" fill="#888"/>
                          <rect x="35" y="28" width="130" height="4" rx="1" fill="#666"/>
                          <rect x="40" y="38" width="115" height="4" rx="1" fill="#666"/>
                          <circle cx="88" cy="58" r="10" fill="#333"/>
                          <rect x="60" y="72" width="55" height="5" rx="1" fill="#fff"/>
                          <rect x="55" y="80" width="65" height="4" rx="1" fill="#555"/>
                          <rect x="50" y="88" width="75" height="3" rx="1" fill="#444"/>
                        </g>
                        <path d="M 193 205 L 202 205" stroke="#666" strokeWidth="1" markerEnd="url(#crusoeCleanArrow)"/>
                        <g transform="translate(210, 155)">
                          <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="35" y="8" width="105" height="5" rx="1" fill="#fff"/>
                          <rect x="15" y="22" width="145" height="55" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                          <circle cx="145" cy="42" r="15" fill="#333"/>
                          <rect x="25" y="32" width="70" height="5" rx="1" fill="#fff"/>
                          <rect x="25" y="42" width="90" height="3" rx="1" fill="#666"/>
                          <rect x="25" y="50" width="80" height="3" rx="1" fill="#666"/>
                          <rect x="25" y="58" width="70" height="3" rx="1" fill="#555"/>
                          <rect x="25" y="82" width="50" height="12" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                          <rect x="32" y="86" width="35" height="4" rx="1" fill="#4ade80"/>
                          <rect x="82" y="82" width="50" height="12" rx="3" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                          <rect x="89" y="86" width="35" height="4" rx="1" fill="#60a5fa"/>
                        </g>
                        <text x="15" y="278" fill="#666" fontSize="9">Reviews</text>
                        <text x="215" y="278" fill="#666" fontSize="9">Sign Up</text>
                        <g transform="translate(10, 285)">
                          <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="25" y="8" width="125" height="5" rx="1" fill="#fff"/>
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
                          <rect x="55" y="92" width="65" height="4" rx="2" fill="#333"/>
                        </g>
                        <path d="M 193 335 L 202 335" stroke="#666" strokeWidth="1" markerEnd="url(#crusoeCleanArrow)"/>
                        <g transform="translate(210, 285)">
                          <rect x="0" y="0" width="175" height="100" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="0" y="0" width="175" height="100" rx="3" fill="rgba(0,0,0,0.6)"/>
                          <rect x="15" y="10" width="145" height="80" rx="6" fill="#141414" stroke="#333" strokeWidth="1"/>
                          <rect x="50" y="18" width="75" height="6" rx="1" fill="#fff"/>
                          <rect x="28" y="32" width="119" height="12" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                          <rect x="34" y="36" width="40" height="4" rx="1" fill="#555"/>
                          <rect x="28" y="50" width="119" height="12" rx="2" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                          <rect x="34" y="54" width="50" height="4" rx="1" fill="#555"/>
                          <rect x="40" y="70" width="95" height="14" rx="7" fill="#fff"/>
                          <rect x="62" y="75" width="51" height="4" rx="1" fill="#000"/>
                        </g>
                        <text x="15" y="408" fill="#666" fontSize="9">Pricing</text>
                        <g transform="translate(10, 415)">
                          <rect x="0" y="0" width="175" height="95" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="45" y="8" width="85" height="5" rx="1" fill="#fff"/>
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
                    <div className="rounded-xl overflow-hidden bg-[#1e1e1e] p-4 md:p-6 border border-[#333] min-w-0">
                      <p className="text-[#666] text-xs font-semibold mb-4 uppercase tracking-wider">Core Chat Interface</p>
                      <svg viewBox="0 0 400 300" className="w-full h-auto">
                        <defs>
                          <pattern id="crusoeGrid2" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2a2a2a" strokeWidth="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="400" height="300" fill="url(#crusoeGrid2)"/>
                        <text x="15" y="18" fill="#666" fontSize="9">Chat Interface</text>
                        <text x="215" y="18" fill="#666" fontSize="9">Model Selector</text>
                        <g transform="translate(10, 25)">
                          <rect x="0" y="0" width="175" height="120" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="0" y="0" width="40" height="120" rx="3" fill="#0d0d0d"/>
                          <rect x="6" y="8" width="28" height="6" rx="1" fill="#1a1a1a"/>
                          <rect x="8" y="20" width="24" height="3" rx="1" fill="#333"/>
                          <rect x="8" y="28" width="26" height="3" rx="1" fill="#333"/>
                          <rect x="8" y="36" width="22" height="3" rx="1" fill="#333"/>
                          <rect x="48" y="6" width="50" height="8" rx="2" fill="#1a1a1a"/>
                          <rect x="52" y="9" width="25" height="3" rx="1" fill="#666"/>
                          <rect x="105" y="6" width="28" height="8" rx="2" fill="#1a1a1a"/>
                          <rect x="140" y="6" width="28" height="8" rx="4" fill="#333"/>
                          <rect x="70" y="45" width="80" height="6" rx="1" fill="#666"/>
                          <rect x="85" y="55" width="50" height="5" rx="1" fill="#fff"/>
                          <rect x="48" y="78" width="120" height="22" rx="4" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                          <rect x="56" y="87" width="55" height="4" rx="1" fill="#444"/>
                          <circle cx="156" cy="89" r="6" fill="#60a5fa"/>
                          <rect x="68" y="105" width="60" height="10" rx="5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
                          <circle cx="82" cy="110" r="3" fill="#4ade80"/>
                          <circle cx="92" cy="110" r="3" fill="#60a5fa"/>
                          <rect x="100" y="108" width="20" height="4" rx="1" fill="#555"/>
                        </g>
                        <path d="M 193 85 L 202 85" stroke="#666" strokeWidth="1" markerEnd="url(#crusoeCleanArrow)"/>
                        <g transform="translate(210, 25)">
                          <rect x="0" y="0" width="175" height="120" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="0" y="0" width="40" height="120" rx="3" fill="#0d0d0d"/>
                          <rect x="50" y="25" width="115" height="90" rx="4" fill="#141414" stroke="#333" strokeWidth="1"/>
                          <rect x="58" y="32" width="80" height="4" rx="1" fill="#666"/>
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
                          <g transform="translate(58, 90)">
                            <path d="M 3 6 L 6 9 L 12 3" stroke="#4ade80" strokeWidth="1.5" fill="none"/>
                            <circle cx="22" cy="6" r="5" fill="#4ade80"/>
                            <rect x="32" y="3" width="65" height="4" rx="1" fill="#fff"/>
                            <rect x="32" y="10" width="55" height="3" rx="1" fill="#555"/>
                          </g>
                        </g>
                        <text x="15" y="168" fill="#666" fontSize="9">Response View</text>
                        <g transform="translate(10, 175)">
                          <rect x="0" y="0" width="175" height="110" rx="3" fill="#0a0a0a" stroke="#444" strokeWidth="1"/>
                          <rect x="0" y="0" width="40" height="110" rx="3" fill="#0d0d0d"/>
                          <rect x="48" y="12" width="118" height="65" rx="4" fill="#141414"/>
                          <rect x="56" y="20" width="100" height="4" rx="1" fill="#fff"/>
                          <rect x="56" y="28" width="95" height="3" rx="1" fill="#666"/>
                          <rect x="56" y="35" width="100" height="3" rx="1" fill="#666"/>
                          <rect x="56" y="42" width="85" height="3" rx="1" fill="#666"/>
                          <rect x="56" y="49" width="90" height="3" rx="1" fill="#666"/>
                          <rect x="56" y="56" width="70" height="3" rx="1" fill="#666"/>
                          <rect x="56" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>
                          <rect x="80" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>
                          <rect x="104" y="65" width="20" height="6" rx="3" fill="#1a1a1a"/>
                          <rect x="48" y="88" width="120" height="16" rx="8" fill="#141414" stroke="#333" strokeWidth="0.5"/>
                          <rect x="56" y="94" width="45" height="4" rx="1" fill="#444"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              {fidelityLevel === 'hifi' && (
                <div className="absolute inset-4 md:inset-8">
                  <div className="relative w-full h-full">
                    <Image
                      src={FIGMA_IMAGES[figmaIndex].src}
                      alt={FIGMA_IMAGES[figmaIndex].label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-[#0a0a0a] border-t border-white/[0.03] flex flex-wrap items-center justify-between gap-4">
              <p className="text-white/80 text-sm font-medium">
                {fidelityLevel === 'lofi' ? 'Lo-Fi: Hand-drawn sketches' : fidelityLevel === 'midfi' ? 'Mid-Fi: Grayscale wireframes' : FIGMA_IMAGES[figmaIndex].label}
              </p>
              {fidelityLevel === 'hifi' && (
                <div className="flex gap-2">
                  <button
                    data-cursor-hover
                    onClick={() => setFigmaIndex((i) => (i - 1 + FIGMA_IMAGES.length) % FIGMA_IMAGES.length)}
                    className="min-h-[44px] min-w-[44px] px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 touch-manipulation"
                  >
                    ← Prev
                  </button>
                  <button
                    data-cursor-hover
                    onClick={() => setFigmaIndex((i) => (i + 1) % FIGMA_IMAGES.length)}
                    className="min-h-[44px] min-w-[44px] px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 touch-manipulation"
                    style={{ backgroundColor: ACCENT, color: '#000' }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
            {fidelityLevel === 'hifi' && (
              <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                {FIGMA_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    data-cursor-hover
                    onClick={() => setFigmaIndex(i)}
                    className={`shrink-0 aspect-video w-24 md:w-20 min-h-[44px] rounded-lg overflow-hidden transition-all duration-300 hover:opacity-100 touch-manipulation ${
                      figmaIndex === i
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a] opacity-100'
                        : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <Image src={img.src} alt={img.label} width={96} height={54} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6 p-6 rounded-xl bg-white/[0.03] border border-white/10">
            <h3 className="text-sm font-semibold mb-3" style={{ color: ACCENT }}>Iteration Insights</h3>
            <ul className="space-y-2">
              {ITERATION_INSIGHTS.map((insight, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ACCENT }} />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* What We Shipped - Final Solution */}
      <section
        id="solution"
        className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]"
      >
        <FadeIn>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">What We Shipped</h2>
          <p className="text-white/50 text-sm mb-6">The trust gap had a design solution. Here&apos;s what made it into the product and why we chose each element.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'One Question, Best Answer', desc: 'Multiple models run in parallel and surface the strongest answer.', why: 'Students wanted one answer, not a list. We gave them one.' },
              { title: 'Multi-Model Comparison', desc: 'Compares responses across models and surfaces where they agree.', why: 'We compare in the background. They get the best answer.' },
              { title: 'Model Transparency', desc: 'See which models contributed. Full transparency.', why: 'Badges show which models answered. No guessing.' },
              { title: 'Trusted Answers', desc: 'Consensus-backed answers for research where accuracy matters.', why: 'When models agree, students trust it. Especially for homework.' },
            ].map((f, i) => (
              <div key={i} data-cursor-hover className="p-6 rounded-xl bg-white/[0.03] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_40px_-15px_rgba(34,197,94,0.15)]">
                <h3 className="font-semibold mb-2" style={{ color: ACCENT }}>{f.title}</h3>
                <p className="text-white/60 text-sm mb-2">{f.desc}</p>
                <p className="text-white/40 text-xs border-t border-white/10 pt-2">Why: {f.why}</p>
              </div>
            ))}
          </div>
        </div>
        </FadeIn>
      </section>

      {/* Design System */}
      <section
        id="design-system"
        className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]"
      >
        <FadeIn>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Design System</h2>
          <p className="text-white/50 text-sm mb-8">Every color and type choice had a reason. Dark theme for focus. Blue for trust. Serif for warmth.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-white/60 mb-4">Colors</h3>
              <div className="flex flex-wrap gap-3">
                {['#0a0a0a', '#1a1a1a', '#333', '#666', '#60a5fa'].map((c, i) => (
                  <div key={i} data-cursor-hover className="w-12 h-12 rounded-lg border border-white/10 transition-transform duration-300 hover:scale-125 hover:shadow-lg" style={{ backgroundColor: c }} title={c} />
                ))}
              </div>
              <p className="text-white/50 text-xs mt-2">Blacks, neutrals, blue accent</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white/60 mb-4">Typography</h3>
              <p className="text-lg font-sans">DM Sans: body and headings</p>
              <p className="text-lg italic font-serif">Serif italic: tagline accent</p>
            </div>
          </div>
          <div className="mt-8 p-6 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-white/60 text-sm leading-relaxed">
              Dark theme reduces eye strain during long sessions. Monochromatic palette keeps focus on the answer. Blue accents for trust without distraction.
            </p>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* The Results - Impact */}
      <section
        id="impact"
        className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]"
      >
        <FadeIn>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">The Results</h2>
          <p className="text-white/50 text-sm mb-12">One answer. No tab hopping. Trust through consensus. The design decisions we made showed up in the numbers.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '40%', label: 'More sign-ups in 3 months post-launch' },
              { value: '2x', label: 'Faster onboarding after flow redesign' },
              { value: '85%', label: 'Positive feedback from user testing' },
              { value: '10,000+', label: 'Active users on shipped designs' },
            ].map((stat, i) => (
              <div key={i} data-cursor-hover className="p-6 rounded-xl bg-white/[0.03] border border-white/10 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_10px_30px_-10px_rgba(34,197,94,0.2)]">
                <p className="text-3xl font-bold mb-2" style={{ color: ACCENT }}>{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        </FadeIn>
      </section>

      {/* The Fit */}
      <section id="about-me" className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]">
        <FadeIn>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">The Fit</h2>
          <p className="text-white/70 leading-relaxed mb-6">
            At Nexus I tackled model trust, switching between tools, and tab hopping, hiding complexity so students could get one answer. Crusoe tackles infrastructure visibility, energy transparency, and unified monitoring so developers can build without juggling tools. Different domains, but the same design philosophy: make powerful systems invisible so people can focus on what matters.
          </p>
          <p className="text-white/70 leading-relaxed mb-6">
            What gets me excited about Crusoe is the energy-first mindset. Turning flare gas into compute instead of burning it. Building AI infrastructure that runs on renewables. That&apos;s not just smart engineering, it&apos;s the kind of work that matters. I want to be part of a team that&apos;s rethinking how we power the future!
          </p>
          <CrusoeConnection>
            Nexus gave students one answer so they could stop switching between tools. Crusoe gives developers one platform so they can stop managing infrastructure. Both hide the complexity so people can focus on what actually matters.
          </CrusoeConnection>
        </div>
        </FadeIn>
      </section>

      {/* What I Learned About Crusoe */}
      <section id="company-research" className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]">
        <FadeIn>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">What I Learned About Crusoe</h2>
          <p className="text-white/50 text-sm mb-8">From product pages, Command Center, and docs, here&apos;s what mattered most to me.</p>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>What they build</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Crusoe Cloud for GPU workloads, Managed Inference for hosted LLMs, and Command Center layered on top. Command Center brings topology, health, logs, and spend together so you are not jumping between tools.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>Who they serve</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Teams training models, running inference, and scaling workloads. They want to build, not spend time managing infrastructure.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>What stood out</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Command Center shows health, logs, and spend in one place. Crusoe can also forward metrics and logs to monitoring tools you already use (for example Datadog or Splunk), with alerts in Slack.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: ACCENT }}>Why it matters</h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Energy-smart AI: renewables where they can, plus stranded energy such as flare gas turned into useful compute so less goes to waste.
              </p>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* Why Crusoe */}
      <section
        id="why-crusoe"
        className="py-16 md:py-24 px-4 md:px-6 border-t border-white/[0.03]"
      >
        <FadeIn>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Why Crusoe</h2>
          <div data-cursor-hover className="p-6 rounded-xl border-l-4 mb-8 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]" style={{ borderColor: ACCENT, backgroundColor: `${ACCENT}08` }}>
            <p className="text-white/80 text-sm leading-relaxed italic">
              Crusoe&apos;s mission: accelerate the abundance of energy and intelligence.
            </p>
          </div>
          <p className="text-white/70 leading-relaxed mb-6">
            Crusoe prioritizes single source of truth over fragmented views, progressive disclosure of complexity, and proactive remediation. That&apos;s the same philosophy I applied to Nexus: one place, no tab hopping; complexity behind the scenes; users get what they need without managing the machinery.
          </p>
          <p className="text-white/70 leading-relaxed">
            What draws me most is the energy-first mindset. Flare gas into compute, renewable-powered AI. That&apos;s not just smart engineering. It&apos;s work that matters. I want to design tools that make infrastructure invisible and do it sustainably, and I want to be part of that.
          </p>
        </div>
        </FadeIn>
      </section>

      {/* Thank You */}
      <section id="thank-you" className="relative min-h-screen flex flex-col justify-center px-6 py-24 overflow-hidden">
        <FlowingLinesBackground />
        {/* Gradient fades - blend with sections above and below */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none z-[1]"
          style={{
            background: `linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.6) 30%, transparent 100%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none z-[1]"
          style={{
            background: `linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.5) 40%, transparent 100%)`,
          }}
        />
        <FadeIn>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Thanks for exploring</h2>
          <p className="text-white/80 leading-relaxed mb-6 text-lg">
            I&apos;m so glad you took the time to click through and dig in. This is the work I care about: hiding complexity, surfacing simplicity, and designing for people who just want to build.
          </p>
          <p className="text-xl font-medium mb-8" style={{ color: ACCENT }}>
            Let&apos;s make something great together.
          </p>
          <p className="text-white/50 text-sm italic">
            Looking forward to what&apos;s next.
          </p>
        </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/[0.03]">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/" data-cursor-hover className="text-sm hover:underline transition-all duration-300 hover:scale-110" style={{ color: ACCENT }}>
              anusharamachandran.com
            </Link>
            <a href="https://narb.cc/nexus" target="_blank" rel="noopener noreferrer" data-cursor-hover className="text-sm hover:underline transition-all duration-300 hover:scale-110" style={{ color: ACCENT }}>
              narb.cc/nexus
            </a>
          </div>
          <div className="flex justify-center gap-6 text-sm text-white/50">
            <a href="mailto:anusharama100@gmail.com" data-cursor-hover className="hover:text-white transition-all duration-300 hover:scale-110">Email</a>
            <a href="https://www.linkedin.com/in/anusha-ramachandran-45882724a" target="_blank" rel="noopener noreferrer" data-cursor-hover className="hover:text-white transition-all duration-300 hover:scale-110">LinkedIn</a>
          </div>
          <Link href="/" data-cursor-hover className="inline-block mt-8 text-white/40 hover:text-white text-sm transition-all duration-300 hover:scale-105">
            ← Back to portfolio
          </Link>
        </div>
      </footer>
    </main>
  )
}
