"use client"

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from '@/portfolio/compat'
import { caseStudyOrder, caseStudyProjects, type CaseStudySlug } from './caseStudyProjects'
import { collectStudySections } from './caseStudySections'

export default function CaseStudyExperience({ slug, children, preview }: { slug: CaseStudySlug; children: ReactNode; preview?: ReactNode }) {
  const project = caseStudyProjects[slug]
  const isProjectCollection = slug === 'crusoe'
  const content = useRef<HTMLDivElement>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const nextSlug = caseStudyOrder[(caseStudyOrder.indexOf(slug) + 1) % caseStudyOrder.length] ?? 'crusoe'
  const next = caseStudyProjects[nextSlug]

  useEffect(() => {
    const root = content.current
    if (!root) return
    const update = () => {
      // Preserve existing section deep links without displaying a section menu.
      collectStudySections(root, slug)
      // Old openings are replaced by the complete shared introduction above.
      root.querySelectorAll<HTMLElement>('.editorial-case-cover, .crusoe-case-hero, .case-study-nav, .crusoe-case-nav').forEach(el => { el.hidden = true })
    }
    update()
    const mutations = new MutationObserver(update)
    mutations.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['open'] })
    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => {
      mutations.disconnect()
      document.removeEventListener('fullscreenchange', onFullscreen)
    }
  }, [slug])

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch { setFullscreen(false) }
  }

  return (
    <div data-study-slug={slug} className={`case-study-experience study-tone-${project.tone}${isProjectCollection ? ' study-project-collection' : ''}`}>
      <Link href="/#projects" className="study-back-link" aria-label="Back to selected work">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
        <span>Back to work</span>
      </Link>
      <div className="study-intro">
        <div className="study-intro-art" aria-hidden="true">
          <img src="/landing/editorial-flow.jpg" alt="" width={1376} height={768} decoding="async" />
        </div>
        <nav className="study-header" aria-label="Portfolio navigation">
          <Link href="/" className="study-brand" aria-label="Anusha Ramachandran, home"><img src="/landing/ar-logo-final.png" alt="AR monogram" width={38} height={38} /><span>Anusha Ramachandran</span></Link>
          <div className="study-header-actions">
            <Button asChild variant="link"><a href="mailto:anusharama100@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a></Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={fullscreen ? 'M8 3v5H3m13-5v5h5M8 21v-5H3m13 5v-5h5' : 'M3 8V3h5m8 0h5v5M3 16v5h5m8 0h5v-5'} /></svg>
            </Button>
          </div>
        </nav>

        <header className="study-cover" id="study-top">
          <div className="study-width">
            <p className="study-eyebrow"><span>selected work / {String(caseStudyOrder.indexOf(slug) + 1).padStart(2, '0')}</span><span>{project.category}</span></p>
            <h1>{project.name}</h1>
            <p className="study-headline">{project.headline}</p>
            <p className="study-description">{project.description}</p>
            <dl className="study-meta">{project.meta.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </div>
          {!isProjectCollection && (preview ? <div className="study-preview-slot study-width">{preview}</div> : <figure className="study-product-stage study-width">
            <img src={project.image} alt={project.imageAlt} fetchPriority="high" />
            <figcaption><span>{project.name} / product preview</span><a href="#study-summary">Read the overview <span aria-hidden="true">↓</span></a></figcaption>
          </figure>)}
        </header>
      </div>

      {!isProjectCollection && <section className="study-summary study-width" id="study-summary" aria-labelledby="study-summary-title">
        <div className="study-summary-heading"><h2 id="study-summary-title">The project at a glance.</h2></div>
        <div className="study-summary-grid">{project.summary.map(([title, body], index) => <article key={title}><span className="study-eyebrow">0{index + 1} / {title}</span><p>{body}</p></article>)}</div>
      </section>}

      <div className="study-original-content" ref={content}>{children}</div>

      <footer className="study-footer">
        <div className="study-width">
          <p className="study-eyebrow">next case study / {next.category}</p>
          <Link href={`/case-study/${nextSlug}`} className="study-next"><div><h2>{next.name}</h2><p>{next.headline}</p></div><span aria-hidden="true">↗</span></Link>
          <div className="study-footer-bottom"><Link href="/#projects">← All selected work</Link><a href="mailto:anusharama100@gmail.com">Let’s make something meaningful ↗</a><a href="#study-top">Back to top ↑</a></div>
        </div>
      </footer>
    </div>
  )
}
