import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { dataProjects } from '@/portfolio/components/dataProjects'
import DataProjectCaseStudy, { DataProjectPreview } from '@/portfolio/pages/data-project-case-study'

export const metadata: Metadata = { title: `${dataProjects['signalflow'].name} Case Study | Anusha Ramachandran`, description: dataProjects['signalflow'].description }
export default function Page() {
  return <CaseStudyExperience slug="signalflow" preview={<DataProjectPreview slug="signalflow" />}><DataProjectCaseStudy slug="signalflow" /></CaseStudyExperience>
}
