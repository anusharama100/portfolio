import type { ComponentProps } from 'react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { caseStudyOrder } from '@/portfolio/components/caseStudyProjects'

vi.mock('@/portfolio/compat', () => ({
  Link: (props: ComponentProps<'a'>) => <a {...props} />,
}))
afterEach(cleanup)

describe('Shared desktop case-study reading scale', () => {
  it.each(caseStudyOrder)('keeps %s inside one shared scale boundary', slug => {
    const { container } = render(<CaseStudyExperience slug={slug}><p>Case-study evidence</p></CaseStudyExperience>)
    const roots = container.querySelectorAll('.case-study-experience')
    expect(roots).toHaveLength(1)
    expect(roots[0]).toHaveAttribute('data-study-slug', slug)
    expect(roots[0]).toContainElement(container.querySelector('.study-back-link'))
    expect(roots[0]).toContainElement(container.querySelector('.study-original-content'))
    expect(roots[0]).toContainElement(container.querySelector('.study-footer'))
  })

  it('scales desktop layout to 80% without shrinking mobile, changing browser settings, or using a transform', () => {
    const css = readFileSync(resolve('portfolio/case-study-scale.css'), 'utf8')
    const styles = readFileSync(resolve('portfolio/styles.css'), 'utf8')
    expect(css).toContain('zoom: var(--study-reading-scale)')
    expect(css).toContain('@media screen and (min-width: 900px)')
    expect(css).toContain('--study-reading-scale: .8')
    expect(css).toContain('--study-reading-scale: 1')
    expect(css).toContain('@media print')
    expect(css).not.toMatch(/transform\s*:|body\s*\{|html\s*\{/)
    expect(styles.indexOf('@import "./case-study-scale.css"')).toBeGreaterThan(styles.indexOf('@import "./usage-cost-story.css"'))
  })
})
