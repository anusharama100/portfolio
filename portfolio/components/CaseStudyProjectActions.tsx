"use client"

import { projectResources } from './projectResources'
import { caseStudyProjects, type CaseStudySlug } from './caseStudyProjects'

export default function CaseStudyProjectActions({ slug }: { slug: CaseStudySlug }) {
  if (slug === 'crusoe') return null
  const resources = projectResources[slug]
  const available = (['website', 'demo', 'code'] as const).filter(kind => resources[kind]?.href)
  if (!available.length) return null
  return (
    <div className="study-project-actions" role="group" aria-label={`${caseStudyProjects[slug].name} demo and code`}>
      {available.map(kind => {
        const resource = resources[kind]!
        const descriptionId = `${slug}-${kind}-description`
        const contents = <>
          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {kind === 'website' ? <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z" /></> : kind === 'demo' ? <><path d="m9 5 10 7-10 7V5Z" /></> : <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" /></>}
          </svg>
          {resource.label}
          {resource.href && <span aria-hidden="true">↗</span>}
        </>
        return <div className="study-project-action" key={kind}>
          <a className={`study-project-action-button study-project-action-${kind}${kind === 'website' || (kind === 'demo' && !resources.website?.href) ? ' is-primary' : ''}`} href={resource.href} target="_blank" rel="noreferrer" aria-describedby={descriptionId}>{contents}</a>
          <p id={descriptionId}>{resource.detail}</p>
        </div>
      })}
    </div>
  )
}
