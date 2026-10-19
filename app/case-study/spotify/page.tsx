import type { Metadata } from 'next'
import CaseStudyExperience from '@/portfolio/components/CaseStudyExperience'
import CaseStudyPage from '@/portfolio/pages/case-study-spotify'

export const metadata: Metadata = { title: "Spotify Threads Case Study | Anusha Ramachandran" }

export default function Page() {
  return <CaseStudyExperience slug="spotify"><CaseStudyPage /></CaseStudyExperience>
}
