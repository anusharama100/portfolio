import type { Metadata } from 'next'
import TraceApp from '@/portfolio/trace/TraceApp'
export const metadata: Metadata = { title: 'Trace — Evidence to decision', description: 'An editable research workspace designed and built by Anusha Ramachandran.' }
export default function Page() { return <TraceApp /> }
