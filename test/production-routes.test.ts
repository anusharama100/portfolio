import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { caseStudyOrder } from '@/portfolio/components/caseStudyProjects'

describe('Production static-site entry points', () => {
  it.each(caseStudyOrder)('renders %s through the shared case-study wrapper', slug => {
    const page = readFileSync(resolve(`app/case-study/${slug}/page.tsx`), 'utf8')
    expect(page).toContain('CaseStudyExperience')
    expect(page).toContain(`slug="${slug}"`)
    expect(page).toContain(`@/portfolio/pages/case-study-${slug}`)
    expect(page).toContain('export const metadata')
  })
  it('preserves the existing static hosting output and the reviewed native media', () => {
    expect(readFileSync(resolve('next.config.js'), 'utf8')).toContain("output: 'export'")
    expect(readFileSync(resolve('render.yaml'), 'utf8')).toContain('staticPublishPath: out')
    expect(readFileSync(resolve('app/layout.tsx'), 'utf8')).toContain("import '../portfolio/styles.css'")
    expect(existsSync(resolve('public/krokos/redesign-landing-full.jpg'))).toBe(true)
    expect(existsSync(resolve('public/tonipr/previews/landing-solution.jpg'))).toBe(true)
  })
})
