import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { dataProjects } from '@/portfolio/components/dataProjects'
import DataProjectCaseStudy, { DataProjectPreview } from '@/portfolio/pages/data-project-case-study'

export const metadata: Metadata = { title: `${dataProjects['marketpulse'].name} Case Study | Anusha Ramachandran`, description: dataProjects['marketpulse'].description }
export default function Page() {
  return <CaseStudyExperience slug="marketpulse" preview={<DataProjectPreview slug="marketpulse" />}><DataProjectCaseStudy slug="marketpulse" /></CaseStudyExperience>
}
