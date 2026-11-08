import type { CaseStudySlug } from './caseStudyProjects'

type Resource = { href?: string; label: string; detail: string }
type ProjectResources = { demo: Resource; code: Resource }
const studySource = (slug: string) => `https://github.com/anushaxrama/portfolio/blob/main/portfolio/pages/case-study-${slug}.tsx`

// Only enable destinations that are public and have been checked. A recording
// or captured screenshot is not a substitute for an interactive demo.
export const projectResources: Record<Exclude<CaseStudySlug, 'crusoe'>, ProjectResources> = {
  krokos: {
    demo: { label: 'Live demo', href: 'https://krokos.bio/', detail: 'Published website · Explore the redesign.' },
    code: { label: 'GitHub', detail: 'Prototype source · Public access pending.' },
  },
  tonipr: {
    demo: { label: 'Live demo', href: 'https://anushaxrama.github.io/toniPR/dashboard.html', detail: 'Frontend prototype · No AI or payment backend.' },
    code: { label: 'GitHub', href: 'https://github.com/anushaxrama/toniPR', detail: 'HTML, CSS, and JavaScript prototype source.' },
  },
  nexus: {
    demo: { label: 'Live site', href: 'https://narb.cc/nexus', detail: 'Published Nexus website · Not a standalone demo.' },
    code: { label: 'GitHub', href: studySource('nexus'), detail: 'Case-study UI source, not the Nexus application.' },
  },
  neuranote: {
    demo: { label: 'Live demo', detail: 'Interactive demo · Not published yet.' },
    code: { label: 'GitHub', href: 'https://github.com/anushaxrama/neuranote', detail: 'React and TypeScript application source.' },
  },
  flowops: {
    demo: { label: 'Live demo', detail: 'Interactive demo · Not published yet.' },
    code: { label: 'GitHub', href: 'https://github.com/anushaxrama/flowops', detail: 'Next.js and TypeScript prototype source.' },
  },
  habitat: {
    demo: { label: 'Live demo', href: 'https://www.figma.com/proto/lad3NB43v9a2ABRfClBtIY/S2K24-Fellowship-Team-3?node-id=30-325&starting-point-node-id=30%3A325&page-id=0%3A1&scaling=scale-down&content-scaling=fixed', detail: 'Interactive Figma prototype · Open access.' },
    code: { label: 'GitHub', href: studySource('habitat'), detail: 'Case-study UI source; the app is a Figma prototype.' },
  },
  spotify: {
    demo: { label: 'Live demo', detail: 'Interactive concept · Not published yet.' },
    code: { label: 'GitHub', detail: 'Prototype source · Public access pending.' },
  },
}
