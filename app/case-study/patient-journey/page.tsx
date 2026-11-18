import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { dataProjects } from '@/portfolio/components/dataProjects'
import DataProjectCaseStudy, { DataProjectPreview } from '@/portfolio/pages/data-project-case-study'

export const metadata: Metadata = { title: `${dataProjects['patient-journey'].name} Case Study | Anusha Ramachandran`, description: dataProjects['patient-journey'].description }
export default function Page() {
  return <CaseStudyExperience slug="patient-journey" preview={<DataProjectPreview slug="patient-journey" />}><DataProjectCaseStudy slug="patient-journey" /></CaseStudyExperience>
}
