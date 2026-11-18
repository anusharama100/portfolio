import type { CaseStudySlug } from './caseStudyProjects'

type Resource = { href?: string; label: string; detail: string }
type ProjectResources = { website?: Resource; demo: Resource; code: Resource }

export const traceWorkspaceUrl = 'https://www.anusharamachandran.com/lab/trace/'

// Only enable destinations that are public and have been checked. A recording
// or captured screenshot is not a substitute for an interactive demo.
export const projectResources: Record<Exclude<CaseStudySlug, 'crusoe'>, ProjectResources> = {
  marketpulse: {
    demo: { label: 'Demo', detail: 'Reproducible local application; no hosted demo.' },
    code: { label: 'View source', href: 'https://github.com/anusharama100/marketpulse', detail: 'Application, architecture, and recorded verification.' },
  },
  atlasiq: {
    demo: { label: 'Demo', detail: 'Reproducible local application; no hosted demo.' },
    code: { label: 'View source', href: 'https://github.com/anusharama100/atlasiq', detail: 'Pipeline, dashboard, SQL, and recorded verification.' },
  },
  signalflow: {
    demo: { label: 'Demo', detail: 'Reproducible local application; no hosted demo.' },
    code: { label: 'View source', href: 'https://github.com/anusharama100/signalflow', detail: 'Pipeline, dashboard, and recorded verification.' },
  },
  'patient-journey': {
    demo: { label: 'Demo', detail: 'No hosted demo.' },
    code: { label: 'Source', detail: 'Source repository remains private.' },
  },
  'diabetes-readmission': {
    demo: { label: 'Demo', detail: 'No hosted demo.' },
    code: { label: 'Source', detail: 'Source repository remains private.' },
  },
  trace: {
    demo: { label: 'Try Trace', href: traceWorkspaceUrl, detail: 'Working workspace · No sign-in. Edits stay in your browser.' },
    code: { label: 'View source', href: 'https://github.com/anusharama100/portfolio/tree/main/portfolio/trace', detail: 'Application code, architecture notes, and test instructions.' },
  },
  krokos: {
    website: { label: 'View the product website', href: 'https://krokos.bio/', detail: 'Published Krokos Bio website.' },
    demo: { label: 'Live demo', detail: 'No separate demo is linked.' },
    code: { label: 'GitHub', detail: 'Prototype source · Public access pending.' },
  },
  tonipr: {
    website: { label: 'View the product website', href: 'https://tonipr.com/', detail: 'Published ToniPR website.' },
    demo: { label: 'Live demo', href: 'https://anushaxrama.github.io/toniPR/dashboard.html', detail: 'Frontend prototype · No AI or payment backend.' },
    code: { label: 'GitHub', href: 'https://github.com/anusharama100/toniPR', detail: 'HTML, CSS, and JavaScript prototype source.' },
  },
  nexus: { demo: { label: 'Demo', detail: 'Public application unavailable.' }, code: { label: 'GitHub', detail: 'Application source is not available.' } },
  neuranote: {
    demo: { label: 'Live demo', href: '/demos/neuranote/index.html#/dashboard', detail: 'Interactive prototype · Local study tools; notes stay in your browser.' },
    code: { label: 'GitHub', href: 'https://github.com/anusharama100/portfolio/tree/main/demos/neuranote', detail: 'React and TypeScript application source.' },
  },
  flowops: {
    demo: { label: 'Live demo', detail: 'Interactive demo · Not published yet.' },
    code: { label: 'GitHub', href: 'https://github.com/anushaxrama/flowops', detail: 'Next.js and TypeScript prototype source.' },
  },
  habitat: {
    demo: { label: 'Open Figma prototype', href: 'https://www.figma.com/proto/lad3NB43v9a2ABRfClBtIY/S2K24-Fellowship-Team-3?node-id=30-325&starting-point-node-id=30%3A325&page-id=0%3A1&scaling=scale-down&content-scaling=fixed', detail: 'Interactive Figma prototype · Open access.' },
    code: { label: 'GitHub', detail: 'Design concept, not a coded application.' },
  },
  spotify: {
    demo: { label: 'Live demo', detail: 'Interactive concept · Not published yet.' },
    code: { label: 'GitHub', detail: 'Prototype source · Public access pending.' },
  },
}
