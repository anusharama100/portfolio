import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-flowops'

export const metadata: Metadata = { title: "FlowOps Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="flowops"><CaseStudyPage /></CaseStudyExperience>
}
