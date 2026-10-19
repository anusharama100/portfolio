import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import KrokosScrollableSite, { originalKrokosSections } from '@/portfolio/components/KrokosScrollableSite'
import { KrokosHomepageComparison } from '@/portfolio/pages/case-study-krokos'

afterEach(() => { cleanup(); vi.restoreAllMocks() })

function jpegDimensions(file: string) {
  const bytes = readFileSync(file)
  for (let offset = 2; offset < bytes.length;) {
    const marker = bytes[offset + 1]
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) }
    }
    offset += 2 + bytes.readUInt16BE(offset + 2)
  }
  throw new Error(`Missing JPEG dimensions: ${file}`)
}

describe('Krokos native scroll-through comparison', () => {
  it('uses each complete capture’s actual proportions without stretching or clipping it', () => {
    for (const section of originalKrokosSections) {
      expect(jpegDimensions(resolve(`public/krokos/original-sections/${section.file}.jpg`))).toEqual({
        width: 1280, height: section.height,
      })
    }
    const styles = readFileSync(resolve('portfolio/krokos-case-study.css'), 'utf8')
    expect(styles).toContain('.krokos-site-scroll img { display: block; width: 100%; height: auto; }')
  })

  it.each(['before', 'after'] as const)('makes the %s capture keyboard-scrollable without video or timed controls', version => {
    const { container } = render(<KrokosScrollableSite version={version} />)
    const label = version === 'before' ? 'Original site' : 'Redesign'
    const frame = screen.getByRole('region', { name: `${label} page captures` })
    expect(frame).toHaveAttribute('tabindex', '0')
    expect(frame).toHaveAccessibleDescription(/Scroll inside the frame at your own pace/)
    expect(screen.getByLabelText(`${label} scroll-through`)).toBeInTheDocument()
    expect(container.querySelector('video,source,track,iframe')).toBeNull()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    const styles = readFileSync(resolve('portfolio/krokos-case-study.css'), 'utf8')
    expect(styles).toContain('height: clamp(420px, calc(88svh / var(--study-reading-scale, 1)), 1200px)')
    expect(styles).toContain('overflow: auto; overscroll-behavior-y: contain')
    expect(styles).toContain('.krokos-site-scroll:focus-visible')
    for (const img of frame.querySelectorAll('img')) {
      expect(existsSync(resolve('public', img.getAttribute('src')!.slice(1)))).toBe(true)
      expect(img).toHaveAttribute('width', '1280')
    }
  })

  it('shows real archived sections in order and discloses that they are separate captures', () => {
    render(<KrokosScrollableSite version="before" />)
    const frame = screen.getByRole('region', { name: 'Original site page captures' })
    expect(within(frame).getAllByRole('img')).toHaveLength(9)
    expect([...frame.querySelectorAll('figcaption')].map(caption => caption.textContent)).toEqual(
      originalKrokosSections.map((section, index) => `${String(index + 1).padStart(2, '0')} ${section.label}`),
    )
    expect(screen.getByText(/separate captures, not a continuous full-page screenshot/)).toBeInTheDocument()
    expect(within(frame).getAllByRole('img').map(img => img.getAttribute('height'))).toEqual([
      '610', '790', '526', '526', '718', '860', '684', '526', '644',
    ])
    // Use section-boundary crops, with complete taller content retained by joining its overlap.
    const preparation = readFileSync(resolve('scripts/prepare-krokos-scrollthrough.mjs'), 'utf8')
    expect(preparation).toContain('crop=1280:610:0:0')
    expect(preparation).toContain("['plant-science', '0038', 212, 592]")
    expect(preparation).toContain("['supply-chain', '0054', 110, 592]")
    expect(preparation).toContain('vstack=inputs=2')
    expect(screen.getByText(/benefits section joins two overlapping captures/)).toBeInTheDocument()
    expect(within(frame).getByRole('img', { name: /all form fields and the Submit button/ })).toBeInTheDocument()
  })

  it('uses one complete redesigned page rather than an animated pan or cropped hero', () => {
    render(<KrokosScrollableSite version="after" />)
    const frame = screen.getByRole('region', { name: 'Redesign page captures' })
    expect(within(frame).getAllByRole('img')).toHaveLength(1)
    expect(within(frame).getByRole('img')).toHaveAttribute('src', '/krokos/redesign-landing-full.jpg')
    expect(within(frame).getByRole('img')).toHaveAttribute('height', '8259')
    expect(screen.getByText(/links and controls pictured inside the frame are not interactive/)).toBeInTheDocument()
  })

  it('starts each version at the top without moving the outer case-study page', () => {
    const scroll = vi.spyOn(window, 'scrollTo')
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    const { container } = render(<KrokosHomepageComparison />)
    const original = screen.getByRole('region', { name: 'Original site page captures' })
    original.scrollTop = 600
    fireEvent.click(screen.getByRole('button', { name: '02 Redesign' }))
    const redesign = screen.getByRole('region', { name: 'Redesign page captures' })
    expect(redesign).not.toBe(original)
    expect(redesign.scrollTop).toBe(0)
    expect(screen.getByRole('button', { name: '02 Redesign' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: 'Open redesign full-page capture' })).toHaveAttribute('href', '/krokos/redesign-landing-full.jpg')
    fireEvent.click(screen.getByRole('button', { name: '01 Original site' }))
    expect(screen.getByRole('region', { name: 'Original site page captures' }).scrollTop).toBe(0)
    expect(container.querySelectorAll('.krokos-site-scroll')).toHaveLength(1)
    expect(container.querySelector('video')).toBeNull()
    expect(scroll).not.toHaveBeenCalled()
    expect(scrollIntoView).not.toHaveBeenCalled()
  })
})
