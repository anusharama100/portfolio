import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import { dataProjects } from '@/portfolio/components/dataProjects'
import DataProjectCaseStudy, { DataProjectPreview } from '@/portfolio/pages/data-project-case-study'

export const metadata: Metadata = { title: `${dataProjects['atlasiq'].name} Case Study | Anusha Ramachandran`, description: dataProjects['atlasiq'].description }
export default function Page() {
  return <CaseStudyExperience slug="atlasiq" preview={<DataProjectPreview slug="atlasiq" />}><DataProjectCaseStudy slug="atlasiq" /></CaseStudyExperience>
}
