"use client"

import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from '@/portfolio/compat'
import { caseStudyOrder, caseStudyProjects, featuredCaseStudyOrder, type CaseStudySlug } from './caseStudyProjects'
import { collectStudySections } from './caseStudySections'
import CaseStudyProjectActions from './CaseStudyProjectActions'

export default function CaseStudyExperience({ slug, children, preview }: { slug: CaseStudySlug; children: ReactNode; preview?: ReactNode }) {
  const project = caseStudyProjects[slug]
  const isProjectCollection = slug === 'crusoe'
  const content = useRef<HTMLDivElement>(null)
  const projectOrder = featuredCaseStudyOrder.includes(slug) ? featuredCaseStudyOrder : caseStudyOrder
  const nextSlug = projectOrder[(projectOrder.indexOf(slug) + 1) % projectOrder.length] ?? 'crusoe'
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
    return () => mutations.disconnect()
  }, [slug])

  return (
    <div data-study-slug={slug} className={`case-study-experience study-tone-${project.tone}${isProjectCollection ? ' study-project-collection' : ''}`}>
      <div className="study-intro">
        <div className="study-intro-art" aria-hidden="true">
          <img src="/landing/editorial-flow.jpg" alt="" width={1376} height={768} decoding="async" />
        </div>
        <header className="study-cover" id="study-top">
          <div className="study-width">
            <p className="study-eyebrow"><span>selected work / {String(projectOrder.indexOf(slug) + 1).padStart(2, '0')}</span><span>{project.category}</span></p>
            <h1>{project.name}</h1>
            <p className="study-headline">{project.headline}</p>
            <CaseStudyProjectActions slug={slug} />
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
