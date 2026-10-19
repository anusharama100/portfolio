import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-tonipr'
import ToniDesignScrollThrough from '@/portfolio/components/ToniDesignScrollThrough'

export const metadata: Metadata = { title: "ToniPR Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="tonipr" preview={<ToniDesignScrollThrough />}><CaseStudyPage /></CaseStudyExperience>
}
