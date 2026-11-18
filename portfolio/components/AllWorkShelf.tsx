"use client"

import { useEffect, useRef, useState } from 'react'
import { Link } from '@/portfolio/compat'
import { ArrowLeft, ArrowRight, ArrowUpRight } from './LandingIcons'
import { caseStudyOrder, caseStudyProjects } from './caseStudyProjects'
import { dataProjectSlugs } from './dataProjects'

type WorkFilter = 'all' | 'data' | 'product'
const dataSlugs = new Set<string>(dataProjectSlugs)
const browseOrder = [...dataProjectSlugs, ...caseStudyOrder.filter(slug => !dataSlugs.has(slug))]

export default function AllWorkShelf() {
  const [filter, setFilter] = useState<WorkFilter>('all')
  const [edges, setEdges] = useState({ start: true, end: false })
  const track = useRef<HTMLUListElement>(null)
  const projects = browseOrder.filter(slug => filter === 'all' || (filter === 'data' ? dataSlugs.has(slug) : !dataSlugs.has(slug)))
  useEffect(() => {
    const list = track.current
    if (!list) return
    list.scrollLeft = 0
    const update = () => setEdges({ start: list.scrollLeft <= 2, end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 2 })
    update()
    list.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { list.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [filter])
  const move = (direction: number) => {
    const list = track.current
    if (!list) return
    const card = list.firstElementChild as HTMLElement | null
    const step = (card?.getBoundingClientRect().width ?? list.clientWidth) + parseFloat(getComputedStyle(list).columnGap || '0')
    list.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <section className="all-work-shelf" id="all-work" aria-labelledby="all-work-title">
    <div className="all-work-heading"><div><p className="all-work-eyebrow">The full collection</p><h2 id="all-work-title">All work</h2><p>Design, engineering, and data. Choose a project to explore the story.</p></div><div className="all-work-arrows" role="group" aria-label="Browse all work"><button type="button" aria-label="Previous projects" disabled={edges.start} onClick={() => move(-1)}><ArrowLeft size={20} /></button><button type="button" aria-label="Next projects" disabled={edges.end} onClick={() => move(1)}><ArrowRight size={20} /></button></div></div>
    <div className="all-work-toolbar"><div className="all-work-filters" role="group" aria-label="Filter all work">{(['all', 'data', 'product'] as const).map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value === 'all' ? 'All work' : value === 'data' ? 'Data' : 'Product & design'}<span>{value === 'all' ? browseOrder.length : value === 'data' ? dataProjectSlugs.length : browseOrder.length - dataProjectSlugs.length}</span></button>)}</div><p id="all-work-help">Scroll to explore <span aria-hidden="true">↔</span></p></div>
    <ul className="all-work-track" ref={track} aria-label="All project case studies" aria-describedby="all-work-help" tabIndex={0} onKeyDown={event => { if (event.target === event.currentTarget && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1) } }}>
      {projects.map(slug => { const project = caseStudyProjects[slug]; return <li key={slug}><Link href={`/case-study/${slug}/`} className={`all-work-card all-work-card-${project.tone}`}><div className="all-work-image">{slug === 'habitat' ? <svg viewBox="68 55 458 366" role="img" aria-label={project.imageAlt}><image href={project.image} width="593" height="421" /></svg> : <img src={project.image} alt={project.imageAlt} loading="lazy" />}</div><div className="all-work-card-copy"><p>{dataSlugs.has(slug) ? 'Data & analytics' : project.category.split(' · ')[0]}</p><div><h3>{project.name}</h3><ArrowUpRight size={20} /></div><p className="all-work-card-description">{project.headline}</p><span className="all-work-card-action">View case study <span aria-hidden="true">↗</span></span></div></Link></li> })}
    </ul>
    <p className="all-work-count" role="status">{projects.length} {filter === 'data' ? 'data projects' : filter === 'product' ? 'product & design projects' : 'projects'} to explore</p>
  </section>
}
