"use client"

export type KrokosSiteVersion = 'before' | 'after'

export const originalKrokosSections = [
  { file: 'opening', label: 'Opening', height: 610, alt: 'Original Krokos homepage opening with botanical photography and a Learn How action' },
  { file: 'newsletter', label: 'Newsletter', height: 790, alt: 'Original Krokos newsletter sign-up immediately after the opening' },
  { file: 'plant-science', label: 'Plant science', height: 526, alt: 'Complete original Power of Plants section with the scientific explanation and plant imagery' },
  { file: 'supply-chain', label: 'Supply-chain problem', height: 526, alt: 'Complete original botanical-sourcing problem, including the field photograph and both explanatory paragraphs' },
  { file: 'approach', label: 'Approach', height: 718, alt: 'Complete original Our Approach section, including its headline, explanation, and three circular process photographs' },
  { file: 'benefits', label: 'Benefits', height: 860, alt: 'Complete original Why Plant Cell Culture section, with all four benefits and the botanical ingredient photograph' },
  { file: 'saffron', label: 'Saffron focus', height: 684, alt: 'Complete original What We’re Building section, including both paragraphs and the entire saffron photograph' },
  { file: 'team', label: 'Founding team', height: 526, alt: 'Complete original Founding Team section with the heading and both founder profiles' },
  { file: 'contact', label: 'Contact', height: 644, alt: 'Complete original Contact Us section, including all form fields and the Submit button' },
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
            <img src={`/krokos/original-sections/${section.file}.jpg`} alt={section.alt} width={1280} height={section.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
          </figure>
        )) : (
          <img src="/krokos/redesign-landing-full.jpg" alt="Full published Krokos Bio redesign, from the navigation and opening through the science, approach, saffron, team, contact, and footer" width={1280} height={8259} decoding="async" />
        )}
      </div>
      <figcaption className="krokos-scrollthrough-note">
        {before
          ? 'Archived sections, cropped at section boundaries. The benefits section joins two overlapping captures. These are separate captures, not a continuous full-page screenshot.'
          : 'Full published homepage capture. This is a static design preview; links and controls pictured inside the frame are not interactive.'}
      </figcaption>
    </figure>
  )
}
