import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-nexus'

export const metadata: Metadata = { title: "Nexus Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="nexus"><CaseStudyPage /></CaseStudyExperience>
}
