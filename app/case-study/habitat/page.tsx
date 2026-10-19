import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-habitat'

export const metadata: Metadata = { title: "HABITat Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="habitat"><CaseStudyPage /></CaseStudyExperience>
}
