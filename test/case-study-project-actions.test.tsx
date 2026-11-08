import type { ComponentProps } from 'react'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { caseStudyOrder, caseStudyProjects } from '@/portfolio/components/caseStudyProjects'
import { projectResources } from '@/portfolio/components/projectResources'

vi.mock('@/portfolio/compat', () => ({ Link: (props: ComponentProps<'a'>) => <a {...props} /> }))
afterEach(cleanup)

describe('Case study demo and source links', () => {
  it.each(caseStudyOrder.filter(slug => slug !== 'crusoe'))('puts %s resources before the description, metadata, and preview', slug => {
    const { container } = render(<CaseStudyExperience slug={slug}><p>Original case-study content</p></CaseStudyExperience>)
    const actions = screen.getByRole('group', { name: `${caseStudyProjects[slug].name} demo and code` })
    expect(container.querySelector('.study-cover .study-headline')!.nextElementSibling).toBe(actions)
    expect(actions.nextElementSibling).toHaveClass('study-description')
    for (const kind of ['demo', 'code'] as const) {
      const resource = projectResources[slug][kind]
      if (resource.href) {
        const link = within(actions).getByRole('link', { name: new RegExp(`^${resource.label}`) })
        expect(link).toHaveAttribute('href', resource.href)
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noreferrer')
        expect(link).toHaveAccessibleDescription(resource.detail)
      } else {
        expect(within(actions).getByRole('button', { name: new RegExp(`^${resource.label}`) })).toBeDisabled()
      }
    }
  })

  it('uses HABITat’s actual public Figma flow and never labels recorded media as a live demo', () => {
    const href = projectResources.habitat.demo.href!
    const url = new URL(href)
    expect(url.pathname).toBe('/proto/lad3NB43v9a2ABRfClBtIY/S2K24-Fellowship-Team-3')
    expect(url.searchParams.get('starting-point-node-id')).toBe('30:325')
    expect(url.searchParams.has('fuid')).toBe(false)
    for (const resource of Object.values(projectResources)) {
      expect(resource.demo.href ?? '').not.toMatch(/\.(mp4|webm|jpe?g|png)(\?|$)/)
      expect(resource.demo.href ?? '').not.toMatch(/localhost|127\.0\.0\.1/)
    }
  })

  it('does not add demo or code controls to Crusoe', () => {
    const { container } = render(<CaseStudyExperience slug="crusoe"><p>Crusoe projects</p></CaseStudyExperience>)
    expect(container.querySelector('.study-project-actions')).toBeNull()
  })
})
