import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { dataProjects } from '@/portfolio/components/dataProjects'
import DataProjectCaseStudy, { DataProjectPreview } from '@/portfolio/pages/data-project-case-study'

export const metadata: Metadata = { title: `${dataProjects['diabetes-readmission'].name} Case Study | Anusha Ramachandran`, description: dataProjects['diabetes-readmission'].description }
export default function Page() {
  return <CaseStudyExperience slug="diabetes-readmission" preview={<DataProjectPreview slug="diabetes-readmission" />}><DataProjectCaseStudy slug="diabetes-readmission" /></CaseStudyExperience>
}
