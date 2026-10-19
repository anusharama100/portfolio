import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-crusoe'

export const metadata: Metadata = { title: "Crusoe Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="crusoe"><CaseStudyPage /></CaseStudyExperience>
}
