import type { ComponentProps } from 'react'
import { existsSync } from 'node:fs'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AllWorkShelf from '@/portfolio/components/AllWorkShelf'
import { caseStudyOrder, caseStudyProjects } from '@/portfolio/components/caseStudyProjects'
import { dataProjectSlugs } from '@/portfolio/components/dataProjects'

vi.mock('@/portfolio/compat', () => ({ Link: (props: ComponentProps<'a'>) => <a {...props} /> }))
afterEach(cleanup)

describe('All work collection', () => {
  it('links every project to an existing case study and preview asset', () => {
    render(<AllWorkShelf />)
    const collection = screen.getByRole('list', { name: 'All project case studies' })
    expect(within(collection).getAllByRole('link')).toHaveLength(caseStudyOrder.length)
    for (const slug of caseStudyOrder) {
      expect(collection.querySelector(`a[href="/case-study/${slug}/"]`)).not.toBeNull()
      expect(existsSync(`app/case-study/${slug}/page.tsx`)).toBe(true)
      expect(existsSync(`public${caseStudyProjects[slug].image.split('?')[0]}`)).toBe(true)
    }
  })
  it('lets visitors isolate the five data projects and return to the complete collection', () => {
    render(<AllWorkShelf />)
    fireEvent.click(screen.getByRole('button', { name: 'Data 5' }))
    const collection = screen.getByRole('list', { name: 'All project case studies' })
    expect(within(collection).getAllByRole('link').map(link => link.getAttribute('href'))).toEqual(dataProjectSlugs.map(slug => `/case-study/${slug}/`))
    expect(screen.getByRole('status')).toHaveTextContent('5 data projects')
    fireEvent.click(screen.getByRole('button', { name: 'Product & design 9' }))
    expect(within(collection).getAllByRole('link')).toHaveLength(9)
    fireEvent.click(screen.getByRole('button', { name: 'All work 14' }))
    expect(within(collection).getAllByRole('link')).toHaveLength(14)
  })
})
