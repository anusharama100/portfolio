import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-neuranote'

export const metadata: Metadata = { title: "NeuraNote Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="neuranote"><CaseStudyPage /></CaseStudyExperience>
}
