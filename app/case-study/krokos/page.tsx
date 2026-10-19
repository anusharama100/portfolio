import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-krokos'

export const metadata: Metadata = { title: "Krokos Bio Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="krokos"><CaseStudyPage /></CaseStudyExperience>
}
