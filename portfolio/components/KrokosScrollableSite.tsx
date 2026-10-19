"use client"

export type KrokosSiteVersion = 'before' | 'after'

export const originalKrokosSections = [
  { file: 'opening', label: 'Opening', alt: 'Original Krokos homepage opening with botanical photography and a Learn How action' },
  { file: 'newsletter', label: 'Newsletter', alt: 'Original Krokos newsletter sign-up immediately after the opening' },
  { file: 'plant-science', label: 'Plant science', alt: 'Original Power of Plants section with the scientific explanation and plant imagery' },
  { file: 'supply-chain', label: 'Supply-chain problem', alt: 'Original botanical-sourcing problem followed by the plant-cell-culture approach heading' },
  { file: 'approach', label: 'Approach & benefits', alt: 'Original plant-to-culture sequence and benefits of plant cell culture' },
  { file: 'saffron', label: 'Saffron focus', alt: 'Original What We’re Building section introducing the saffron application' },
  { file: 'team-contact', label: 'Team & contact', alt: 'Original Krokos team profiles followed by the contact form' },
] as const

export default function KrokosScrollableSite({ version }: { version: KrokosSiteVersion }) {
  const before = version === 'before'
  const label = before ? 'Original site' : 'Redesign'

  return (
    <figure className="krokos-scrollthrough" aria-label={`${label} scroll-through`}>
      <header className="krokos-scrollthrough-header">
        <strong>{before ? 'Before · Original site' : 'After · Redesign'}</strong>
        <span aria-hidden="true">Scroll to explore ↓</span>
      </header>
      <p id="krokos-scrollthrough-help" className="krokos-scrollthrough-help">Scroll inside the frame at your own pace. You can also focus the frame and use the arrow keys.</p>
      <div className="krokos-site-scroll" role="region" aria-label={`${label} page captures`} aria-describedby="krokos-scrollthrough-help" tabIndex={0}>
        {before ? originalKrokosSections.map((section, index) => (
          <figure className="krokos-archived-section" key={section.file}>
            <figcaption><span>{String(index + 1).padStart(2, '0')}</span> {section.label}</figcaption>
            <img src={`/krokos/original-sections/${section.file}.jpg`} alt={section.alt} width={1280} height={800} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
          </figure>
        )) : (
          <img src="/krokos/redesign-landing-full.jpg" alt="Full published Krokos Bio redesign, from the navigation and opening through the science, approach, saffron, team, contact, and footer" width={1280} height={8259} decoding="async" />
        )}
      </div>
      <figcaption className="krokos-scrollthrough-note">
        {before
          ? 'Archived sections from the original-site recording, in page order. These are separate captures, not a continuous full-page screenshot.'
          : 'Full published homepage capture. This is a static design preview; links and controls pictured inside the frame are not interactive.'}
      </figcaption>
    </figure>
  )
}
