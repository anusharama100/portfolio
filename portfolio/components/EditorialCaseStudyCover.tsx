"use client"

type EditorialCaseStudyCoverProps = {
  accent: 'blue' | 'purple' | 'orange' | 'green' | 'mint'
  eyebrow: string
  headline: string
  description: string
  meta: Array<[label: string, value: string]>
}

export default function EditorialCaseStudyCover({
  accent,
  eyebrow,
  headline,
  description,
  meta,
}: EditorialCaseStudyCoverProps) {
  return (
    <header className={`editorial-case-cover editorial-case-cover-${accent}`}>
      <div className="editorial-case-circle editorial-case-circle-one" aria-hidden="true"><i /></div>
      <div className="editorial-case-circle editorial-case-circle-two" aria-hidden="true"><i /></div>

      <div className="editorial-case-cover-inner">
        <div className="editorial-case-cover-copy">
          <p className="editorial-case-eyebrow">{eyebrow}</p>
          <h1>{headline}</h1>
          <p className="editorial-case-lede">{description}</p>
        </div>

        <div className="editorial-case-meta" aria-label={`${eyebrow} project details`}>
          {meta.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <a className="editorial-case-link" href="#case-study-content">
          Read the case study <span aria-hidden="true">↓</span>
        </a>
      </div>
    </header>
  )
}
