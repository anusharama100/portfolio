import { dataProjects, dataProjectSlugs } from './dataProjects'

export const caseStudyProjects = {
  ...dataProjects,
  crusoe: {
    name: 'Crusoe', category: 'Cloud infrastructure · Product design internship',
    headline: 'Give a new cloud customer a useful first step.',
    description: 'I audited first-run Console experiences and designed a reusable empty-state system with product, engineering, brand, and writing. The main story follows the research, design tradeoffs, and implementation handoff; two supporting projects explore usability and cost investigation.',
    image: '/images/crusoe/final-instances-empty.png', imageAlt: 'Designed Crusoe Instances empty state', tone: 'blue',
    meta: [['Role', 'Product Design Intern'], ['Timeline', '2026 internship'], ['Responsibility', 'Audit → design → handoff'], ['Team', 'Product, engineering, brand, writing']],
    summary: [['Problem', 'First-run screens offered actions without enough resource context.'], ['My contribution', 'Audit, reusable guidance, product variants, and state specifications.'], ['Delivery', 'Initial pattern and a separately labeled proposed V2.']],
  },
  trace: {
    name: 'Trace', category: 'Independent build · Product design + engineering',
    headline: 'From research evidence to a decision you can inspect.',
    description: 'I designed and built a research workspace that connects observations, findings, and product decisions. This case study follows the product framing, interface iteration, data model, and verification behind the working React and TypeScript application.',
    image: '/trace/trace-evidence.jpg', imageAlt: 'Trace evidence library with source-linked observations and tag filters', tone: 'purple',
    meta: [['Role', 'Product designer + frontend engineer'], ['Status', 'Working independent build'], ['Stack', 'React, TypeScript, IndexedDB'], ['Data', 'Local to your browser']],
    summary: [['Problem', 'A decision can outlive the evidence that informed it.'], ['Built', 'Linked records, validation, durable local storage, undo, and import/export.'], ['Scope', 'Single-user workspace with browser-local persistence and clearly marked sample data.']],
  },
  krokos: {
    name: 'Krokos Bio', category: 'Biotechnology · Website redesign',
    headline: 'Making botanical science feel human.',
    description: 'Krokos Bio grows botanical ingredients from plant cells. I remade its website to bring a complex scientific story into a warmer, more approachable experience—preserving the company’s message, logo, and earthy identity.',
    image: '/krokos/redesign-home-screen.jpg', imageAlt: 'Krokos Bio homepage design with navigation, editorial typography, and Explore action', tone: 'green',
    meta: [['Role', 'Website redesign'], ['Scope', 'Visual design, content hierarchy, responsive web'], ['Tools', 'Figma, Claude Code, Lovable'], ['Platform', 'Squarespace'], ['Launch', 'October 2026']],
    summary: [['The brief', 'Modernize the experience without losing the existing company copy, logo, and warm botanical color direction.'], ['My contribution', 'Rebuilt the visual hierarchy, page narrative, scientific explanations, and responsive layouts, then adapted the design to Squarespace.'], ['The outcome', 'A live homepage and Press redesign, connected to the company’s existing contact and newsletter destinations.']],
  },
  tonipr: {
    name: 'ToniPR', category: 'AI-powered platform · UI/UX design internship',
    headline: 'One conversation. A complete content system.',
    description: 'ToniPR is an AI-assisted interview product that turns one short conversation into reusable marketing content. Working with the founder and engineering, I designed the complete customer journey—from discovering the product to reviewing finished work.',
    image: '/tonipr/previews/dashboard-overview.jpg', imageAlt: 'ToniPR signed-in dashboard overview with interview credits, start interview, and content formats', tone: 'rose',
    meta: [['Role', 'End-to-end product designer'], ['Timeline', 'March–May 2026'], ['Product', 'ToniPR by TunePact'], ['Team', 'Founder + engineering'], ['Scope', 'Brand web, product UX, AI interaction']],
    summary: [['The challenge', 'Founders had expertise to share, but consistent content demanded time, writing confidence, or agency support.'], ['My contribution', 'Partnered with the founder and engineering to connect discovery, onboarding, interview interactions, and content review in one service journey.'], ['The delivery', 'Interface designs and a frontend prototype spanning setup, interview states, and content review.']],
  },
  nexus: {
    name: 'Nexus', category: 'AI learning experience · Internship project',
    headline: 'Make a multi-model workflow easier to follow.',
    description: 'I translated research with 48 users into a unified question-to-answer experience at Narb, focusing on the main task, model attribution, and continuity between sessions.',
    image: '/narbl/narbl-9.png?v=5', imageAlt: 'Nexus multi-model answer experience', tone: 'blue',
    meta: [['Role', 'Product Designer'], ['Timeline', '10 weeks'], ['Research', '48 survey respondents'], ['Scope', 'Research, product UX, and visual system'], ['Tools', 'Figma, Cursor, Lovable']],
    summary: [['The challenge', 'Students spent time switching between AI tools and comparing confident but conflicting answers.'], ['My contribution', 'Translated research with 48 students into a unified question-to-answer experience and a clear visual system.'], ['The design direction', 'A unified question flow with visible model controls and conversation history. Outcome improvements have not been verified.']],
  },
  neuranote: {
    name: 'NeuraNote', category: 'Learning & productivity · Concept project',
    headline: 'A learning system disguised as a note-taking app.',
    description: 'I designed a calmer study space that turns scattered notes into connected concepts, useful review moments, and material that feels easy to return to.',
    image: '/landing/project-neuranote.png', imageAlt: 'NeuraNote learning dashboard', tone: 'purple',
    meta: [['Role', 'UX Designer & Researcher'], ['Timeline', '6 weeks'], ['Platform', 'Web application'], ['Focus', 'Memory, review, and comprehension']],
    summary: [['The challenge', 'Collecting notes was easier than connecting ideas, remembering material, and returning to review.'], ['My contribution', 'Combined research, concept mapping, AI-assisted notes, and review rituals in a calmer learning system.'], ['The design direction', 'A research-informed concept and working browser prototype. Improvements in retention or recall have not been measured.']],
  },
  flowops: {
    name: 'FlowOps', category: 'Enterprise platform · Concept project',
    headline: 'Make complex requests easier to move forward.',
    description: 'I designed an enterprise request system that clarifies roles, approvals, handoffs, and status without flattening the complexity real operations teams need.',
    image: '/landing/project-flowops.png', imageAlt: 'FlowOps operational request management dashboard', tone: 'peach',
    meta: [['Role', 'Product Designer'], ['Timeline', '2 weeks'], ['Deliverable', 'High-fidelity prototype'], ['Focus', 'Workflow and decision clarity'], ['Tools', 'Figma, Adobe Creative Suite']],
    summary: [['The challenge', 'Internal requests got lost, approvals stalled, and ownership was difficult to track across roles.'], ['My contribution', 'Designed role-specific views, request states, approval handoffs, priority scoring, and SLA visibility.'], ['The design direction', 'An end-to-end prototype with explicit success criteria. Operational improvements are proposed, not production results.']],
  },
  habitat: {
    name: 'HABITat', category: 'Mobile behavior design · Team design sprint',
    headline: 'Turn consistency into a world worth growing.',
    description: 'I designed a habit experience for college students that uses progress, small rewards, and a growing habitat to make returning feel encouraging rather than punitive.',
    image: '/habitat/habitat-hero.png', imageAlt: 'HABITat mobile habit tracking experience', tone: 'green',
    meta: [['Role', 'UX Designer'], ['Timeline', '4-week sprint'], ['Team', '4 designers'], ['Recognition', 'Most User-Centered Design'], ['Tools', 'Figma, FigJam']],
    summary: [['The challenge', 'College students needed support building consistency without the pressure of punitive habit tracking.'], ['My contribution', 'Connected research, user flows, prototyping, and small rewards in a collaborative habit-building experience.'], ['Recognition', 'Awarded Most User-Centered Design. The full story includes research, iteration, and the final walkthrough.']],
  },
  spotify: {
    name: 'Spotify Threads', category: 'Music memory · Independent concept',
    headline: 'Rediscover music through the life around it.',
    description: 'I reimagined music discovery around mood, memory, and the personal context attached to what people play, not another feed of disconnected recommendations.',
    image: '/spotify/spotify-1.png', imageAlt: 'Spotify Threads listening memory mobile interface', tone: 'rose',
    meta: [['Role', 'UX Designer'], ['Timeline', '2 weeks'], ['Platform', 'Mobile · iOS'], ['Focus', 'Listening memory and meaningful discovery']],
    summary: [['The challenge', 'Saved music lost the mood, memory, and personal context that made it meaningful in the first place.'], ['My contribution', 'Explored listening memories, emotional clusters, and contextual playback through research and interaction design.'], ['The design direction', 'A mobile concept that makes rediscovery personal. Research sessions and prototype evidence are included below.']],
  },
} as const

export type CaseStudySlug = keyof typeof caseStudyProjects
export const caseStudyOrder: CaseStudySlug[] = ['crusoe', 'trace', 'tonipr', 'krokos', 'nexus', 'neuranote', 'habitat', 'flowops', 'spotify', ...dataProjectSlugs]
// Keep older case-study routes available without inserting them into selected work.
export const featuredCaseStudyOrder: CaseStudySlug[] = ['crusoe', 'trace', 'tonipr', 'krokos', 'nexus', 'neuranote', 'habitat']
