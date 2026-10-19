import type { ComponentProps } from 'react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { caseStudyOrder, caseStudyProjects } from '@/portfolio/components/caseStudyProjects'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
}))
afterEach(cleanup)

describe('Case-study metadata capitalization', () => {
  it.each(caseStudyOrder)('keeps the %s metadata labels capitalized without changing their values', slug => {
    const { container } = render(<CaseStudyExperience slug={slug}><p>Project details</p></CaseStudyExperience>)
    const labels = [...container.querySelectorAll('.study-meta dt')].map(label => label.textContent)
    const values = [...container.querySelectorAll('.study-meta dd')].map(value => value.textContent)
    expect(labels).toEqual(caseStudyProjects[slug].meta.map(([label]) => label))
    expect(labels.every(label => /^[A-Z]/.test(label!))).toBe(true)
    expect(values).toEqual(caseStudyProjects[slug].meta.map(([, value]) => value))
  })

  it('does not force the shared labels to lowercase', () => {
    const css = readFileSync(resolve('portfolio/case-studies.css'), 'utf8')
    const rule = css.match(/\.study-meta dt\s*\{([^}]+)\}/)?.[1]
    expect(rule).toContain('text-transform: none')
    expect(rule).not.toContain('text-transform: lowercase')
  })
})
