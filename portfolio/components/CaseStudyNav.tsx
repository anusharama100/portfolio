"use client"

import { useEffect, useState } from 'react'
import { Link } from '@/portfolio/compat'

interface CaseStudyNavProps {
  showBackButton: boolean
}

export default function CaseStudyNav({ showBackButton }: CaseStudyNavProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  const isVisible = showBackButton || isFullscreen

  return (
    <nav className={`case-study-nav fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-8 flex justify-between items-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Link
        href="/"
        className="inline-flex items-center gap-2 min-h-[44px] min-w-[44px] text-white/40 hover:text-white transition-colors text-sm tracking-wide touch-manipulation"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>Back</span>
      </Link>
      <button
        onClick={toggleFullscreen}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center p-3 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5 touch-manipulation"
        title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen (hide browser tabs for screen share)'}
      >
        {isFullscreen ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </button>
    </nav>
  )
}
