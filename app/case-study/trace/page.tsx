import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-trace'

export const metadata: Metadata = { title: "Trace Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="trace"><CaseStudyPage /></CaseStudyExperience>
}
