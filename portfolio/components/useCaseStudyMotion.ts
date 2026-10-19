import { useEffect, type RefObject } from 'react'

/** One-time, paint-only reveals. Content is never hidden while waiting for JavaScript. */
export function useCaseStudyMotion(root: RefObject<HTMLElement | null>, project: string) {
  useEffect(() => {
    if (!root.current || typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-case-revealed', 'true')
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.08 })

    const selectors = [
      '[data-study-reveal]',
      '.crusoe-project-panel > .crusoe-project-heading',
      '.crusoe-project-panel .crusoe-clean-heading',
      '.crusoe-story-before',
      '.crusoe-clean-audit-layout',
      '.crusoe-story-comparison',
      '.crusoe-story-future',
      '.crusoe-decision-explorer',
      '.crusoe-journey-dossier',
      '.crusoe-he-output-grid',
      '.crusoe-project-panel .crusoe-cost-figure',
    ].join(', ')
    root.current.querySelectorAll(selectors).forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [root, project])
}
