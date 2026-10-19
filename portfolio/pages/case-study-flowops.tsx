"use client"

import { useState } from 'react'
import { Image } from '@/portfolio/compat'
import EditorialCaseStudyCover from '@/portfolio/components/EditorialCaseStudyCover'
import FlowOpsFlows from '@/portfolio/components/FlowOpsFlows'

const demoImages = [
  { src: '/flowops1.png', label: 'Request Dashboard', height: 1414, detail: 'Overview of all requests with status and SLA indicators' },
  { src: '/flowops2.png', label: 'Request Detail View', height: 1410, detail: 'Full request details with timeline and actions' },
  { src: '/flowops3.png', label: 'Agent Triage Queue', height: 1410, detail: 'Priority-sorted queue for agent efficiency' },
  { src: '/flowops4.png', label: 'Workflow Management', height: 1412, detail: 'Workflow configuration and management' },
]

export default function FlowOpsCaseStudy() {
  const [activeSlide, setActiveSlide] = useState(0)
  const goToPrevSlide = () => setActiveSlide(prev => (prev - 1 + demoImages.length) % demoImages.length)
  const goToNextSlide = () => setActiveSlide(prev => (prev + 1) % demoImages.length)
  const currentImage = demoImages[activeSlide]

  return (
    <main className="case-study-vibe case-study-flowops relative min-h-screen bg-black text-white">
      <EditorialCaseStudyCover
        accent="orange"
        eyebrow="FlowOps · B2B workflow system"
        headline="Make complex requests easier to move forward."
        description="I designed an enterprise request system that clarifies roles, approvals, handoffs, and status without flattening the complexity real operations teams need."
        meta={[
          ['Role', 'Product Designer'],
          ['Timeline', '2 weeks'],
          ['Deliverable', 'High-fidelity prototype'],
          ['Focus', 'Workflow and decision clarity'],
        ]}
      />

      {/* Problem & Context */}
      <Section id="case-study-content">
        <SectionLabel>01</SectionLabel>
        <SectionTitle>Problem & Context</SectionTitle>
        <div className="flowops-overview">
          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-10">
            Internal requests get lost. Approvals stall. Nobody knows who owns what.
          </p>

          {/* The Real Problem */}
          <div className="flowops-pain-grid">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-3">The Pain</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Requests submitted via email, Slack, and spreadsheets. No single source of truth. Approvals buried in inboxes.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-3">Who Suffers</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Employees waiting weeks for equipment. Managers drowning in approval requests. IT teams triaging without context.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-3">Why It's Hard</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Multiple roles with conflicting needs. Compliance requirements. SLA contracts with real penalties. Scale across departments.
              </p>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="flowops-problem" role="group" aria-label="FlowOps design challenge">
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] mb-6">Design Challenge</p>

            <p className="text-xl md:text-2xl lg:text-[1.7rem] text-white/90 leading-relaxed font-light">
              How might we design a system where{' '}
              <span className="text-[#ef4444]">request ownership is always clear</span>,{' '}
              <span className="text-[#ef4444]">approvals never stall invisibly</span>, and{' '}
              <span className="text-[#ef4444]">every user sees exactly what they need</span>{' '}
              to do their job, without drowning in stuff they don't?
            </p>
          </div>
        </div>
      </Section>

      {/* Goals & Success Criteria */}
      <Section>
        <SectionLabel>02</SectionLabel>
        <SectionTitle>Goals & Success Criteria</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Before jumping into screens, I mapped out what success actually looks like (and what I intentionally left out of scope).
        </p>

        <div className="flowops-goal-grid">
          {/* Primary Goals */}
          <div className="flowops-goals-card rounded-2xl p-8">
            <h4 className="text-[#ef4444] text-sm font-medium mb-6">Design Goals</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm">Eliminate ambiguity around request ownership and status</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm">Support 4 distinct user roles without duplicating workflows</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm">Make high-volume request triage fast and reliable</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm">Surface SLA deadlines and bottlenecks before they become crises</p>
              </div>
            </div>
          </div>

          {/* Out of Scope */}
          <div className="flowops-scope-card rounded-2xl p-8">
            <h4 className="text-white/50 text-sm font-medium mb-6">Deliberately Out of Scope</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white/30 text-xs">×</span>
                </div>
                <p className="text-white/40 text-sm">Integrations with external ticketing systems</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white/30 text-xs">×</span>
                </div>
                <p className="text-white/40 text-sm">Custom workflow builder for admins</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white/30 text-xs">×</span>
                </div>
                <p className="text-white/40 text-sm">Multi-language/internationalization</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white/30 text-xs">×</span>
                </div>
                <p className="text-white/40 text-sm">Mobile-native experience (responsive web only)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="study-callout p-5 rounded-xl bg-white/[0.02] border border-white/10 max-w-3xl">
          <p className="text-white/70 text-sm leading-relaxed">
            <span className="text-[#ef4444] font-medium">Why scope matters:</span> By keeping the scope tight, I could really dig into the core problem (request clarity and role-based workflows) instead of building a shallow version of everything.
          </p>
        </div>
      </Section>

      {/* Users & Roles */}
      <Section>
        <SectionLabel>03</SectionLabel>
        <SectionTitle>Users & Roles</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Enterprise systems fail when they treat all users the same. I designed for four distinct roles with <strong className="text-white/70">different goals, different constraints, and sometimes conflicting needs</strong>.
        </p>

        <div className="flowops-role-list">
          {/* Requester */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">Requester</h3>
              <p className="text-white/40 text-sm">Employee</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Goal</p>
                <p className="text-white/60 text-sm">Get their request resolved quickly with minimal friction</p>
              </div>
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Constraint</p>
                <p className="text-white/60 text-sm">Limited visibility into process; doesn't know who to escalate to</p>
              </div>
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Conflict</p>
                <p className="text-white/60 text-sm">Wants speed; system needs completeness for triage</p>
              </div>
            </div>
          </div>

          {/* Approver */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">Approver</h3>
              <p className="text-white/40 text-sm">Manager</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Goal</p>
                <p className="text-white/60 text-sm">Make informed decisions fast; avoid becoming a bottleneck</p>
              </div>
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Constraint</p>
                <p className="text-white/60 text-sm">High volume; limited time; needs context at a glance</p>
              </div>
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Conflict</p>
                <p className="text-white/60 text-sm">Requesters want quick approval; compliance needs thorough review</p>
              </div>
            </div>
          </div>

          {/* Agent */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">Agent</h3>
              <p className="text-white/40 text-sm">IT/Operations</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Goal</p>
                <p className="text-white/60 text-sm">Efficiently triage and resolve requests within SLA</p>
              </div>
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Constraint</p>
                <p className="text-white/60 text-sm">Handles many requests; needs to prioritize by urgency and SLA</p>
              </div>
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Conflict</p>
                <p className="text-white/60 text-sm">SLA pressure vs. thoroughness; internal notes vs. transparency</p>
              </div>
            </div>
          </div>

          {/* Admin */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg">Admin</h3>
              <p className="text-white/40 text-sm">Operations Lead</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Goal</p>
                <p className="text-white/60 text-sm">Configure system to match org needs; ensure compliance</p>
              </div>
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Constraint</p>
                <p className="text-white/60 text-sm">Must balance flexibility with simplicity for end users</p>
              </div>
              <div>
                <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Conflict</p>
                <p className="text-white/60 text-sm">Power-user needs vs. keeping UI simple for others</p>
              </div>
            </div>
          </div>
        </div>

        {/* Affinity Mapping */}
        <div className="flowops-chapter" id="flowops-affinity">
          <h3 className="text-xl md:text-2xl font-semibold text-[#ef4444] mb-2">Affinity Mapping</h3>
          <p className="text-white/40 text-sm mb-6">Synthesizing Research Insights</p>

          <p className="text-white/50 leading-relaxed max-w-3xl mb-8">
            I mapped user pain points and requirements to identify patterns across three key themes:
          </p>

          <div className="flowops-affinity-themes">
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Request Clarity:</span> Users need to know exactly where their request stands and who's responsible.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">Role Separation:</span> Different users need different views. One size definitely doesn't fit all.
            </p>
            <p className="text-white/50 leading-relaxed">
              <span className="text-white/80 font-medium">SLA Visibility:</span> Urgency must be visible without requiring manual checks.
            </p>
          </div>

          {/* Affinity Map Grid */}
          <div className="flowops-affinity-grid">

            {/* Request Clarity Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#ef4444] mb-8 text-center">Request Clarity</h4>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fecaca',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Submits request then constantly asks "any update?" via Slack.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Self-service status tracking without bothering anyone.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Status updates buried in email threads, easy to miss.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fdba74',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Real-time status dashboard with clear ownership indicators.</p>
                </div>
              </div>
            </div>

            {/* Role Separation Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#ef4444] mb-8 text-center">Role Separation</h4>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fecaca',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">Managers approve via email, losing context and history.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Quick decisions with full context, not hunting for details.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">Same interface for all roles means irrelevant clutter.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fdba74',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Role-specific dashboards showing only what matters.</p>
                </div>
              </div>
            </div>

            {/* SLA Visibility Column */}
            <div>
              <h4 className="text-2xl font-bold text-[#ef4444] mb-8 text-center">SLA Visibility</h4>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fecaca',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">User Behavior</p>
                  <p className="text-gray-700 leading-snug">SLA breaches discovered only when customer complains.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#a7d89c',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Needs / Goals</p>
                  <p className="text-gray-700 leading-snug">Proactive alerts before deadlines become crises.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fef08a',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Pain Point</p>
                  <p className="text-gray-700 leading-snug">No visibility into which requests are at risk.</p>
                </div>
                <div
                  className="aspect-square p-3 text-xs flex flex-col"
                  style={{
                    backgroundColor: '#fdba74',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <p className="font-bold text-gray-800 mb-1">Opportunity</p>
                  <p className="text-gray-700 leading-snug">Color-coded SLA badges on every request surface.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flowops-affinity-legend" role="group" aria-label="Affinity map color key">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fecaca' }}></div>
              <span className="text-white/40 text-xs">User Behavior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#a7d89c' }}></div>
              <span className="text-white/40 text-xs">Needs / Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fef08a' }}></div>
              <span className="text-white/40 text-xs">Pain Point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fdba74' }}></div>
              <span className="text-white/40 text-xs">Opportunity</span>
            </div>
          </div>

          {/* Synthesis */}
          <div className="flowops-note-block">
            <h4 className="text-[#ef4444] text-lg font-medium mb-4">Key Insight</h4>
            <p className="text-white/50 leading-relaxed">
              The research revealed a core tension: <strong className="text-white/70">requesters want speed, approvers want context, agents want efficiency, and admins want control</strong>. A single universal interface would fail all of them. This shaped the decision to build role-specific experiences from the start.
            </p>
          </div>
        </div>

        {/* User Flows */}
        <div className="flowops-chapter" id="flowops-role-flows">
          <h3>User Flows</h3>
          <p>Core journeys mapped from research insights</p>
          <FlowOpsFlows type="roles" />
        </div>

        {/* Low Fidelity Designs */}
        <div className="flowops-chapter" id="flowops-lofi">
          <h3 className="text-xl md:text-2xl font-semibold text-[#ef4444] mb-2">Low Fidelity Designs</h3>
          <p className="text-white/40 text-sm mb-6">Early Explorations</p>

          <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
            I started with rough sketches to explore layouts for the key screens: <span className="text-white/70">request dashboard</span>, <span className="text-white/70">detail view</span>, <span className="text-white/70">triage queue</span>, and <span className="text-white/70">approval workflow</span>. These wireframes helped establish information hierarchy before committing to visual design.
          </p>

          {/* Lo-Fi Wireframe Sketches - Scrollable on mobile */}
          <p className="study-diagram-hint">Scroll sideways to explore the full wireframe →</p>
          <div className="flowops-wireframe study-diagram-scroll" role="region" aria-label="FlowOps early wireframe" tabIndex={0}>
            <svg viewBox="0 0 800 400" className="w-[800px] md:w-full h-auto" style={{ minWidth: '600px' }}>
              <defs>
                {/* Simplified filter - reduced octaves for better performance */}
                <filter id="roughFlowOps" x="-5%" y="-5%" width="110%" height="110%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
              </defs>

              {/* Screen 1: Dashboard */}
              <g transform="translate(20, 30)">
                <text x="70" y="-10" textAnchor="middle" className="text-[10px]" fill="#666">Dashboard</text>
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughFlowOps)"/>
                {/* Sidebar */}
                <path d="M 10 15 Q 12 60, 10 110" stroke="#666" strokeWidth="1.5" fill="none"/>
                <path d="M 30 15 Q 28 60, 32 110" stroke="#666" strokeWidth="1.5" fill="none"/>
                <circle cx="20" cy="28" r="8" fill="none" stroke="#333" strokeWidth="1.5"/>
                <path d="M 12 45 Q 18 43, 28 46" stroke="#888" strokeWidth="1"/>
                <path d="M 12 58 Q 20 56, 28 59" stroke="#888" strokeWidth="1"/>
                <path d="M 12 71 Q 18 69, 28 72" stroke="#888" strokeWidth="1"/>
                {/* Table rows */}
                <rect x="40" y="20" width="90" height="12" fill="none" stroke="#333" strokeWidth="1" rx="2"/>
                <path d="M 45 26 Q 70 24, 120 27" stroke="#aaa" strokeWidth="0.8"/>
                <rect x="40" y="38" width="90" height="20" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                <rect x="40" y="62" width="90" height="20" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                <rect x="40" y="86" width="90" height="20" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                {/* Status badges */}
                <circle cx="125" cy="48" r="4" fill="#22c55e" stroke="none"/>
                <circle cx="125" cy="72" r="4" fill="#f59e0b" stroke="none"/>
                <circle cx="125" cy="96" r="4" fill="#ef4444" stroke="none"/>
              </g>

              <path d="M 170 90 Q 185 88, 205 90" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowFlowOps)"/>
              <defs><marker id="arrowFlowOps" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M 0 0 L 8 3 L 0 6 Z" fill="#555"/></marker></defs>

              {/* Screen 2: Detail View */}
              <g transform="translate(215, 30)">
                <text x="70" y="-10" textAnchor="middle" className="text-[10px]" fill="#666">Detail View</text>
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughFlowOps)"/>
                {/* Header */}
                <rect x="10" y="12" width="80" height="10" fill="none" stroke="#333" strokeWidth="1.5" rx="2"/>
                <rect x="100" y="12" width="30" height="10" fill="#ef4444" stroke="none" rx="2"/>
                {/* Status bar */}
                <path d="M 10 32 Q 70 30, 130 33" stroke="#22c55e" strokeWidth="3"/>
                {/* Content sections */}
                <rect x="10" y="42" width="60" height="30" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                <path d="M 15 52 Q 40 50, 60 53" stroke="#ccc" strokeWidth="0.6"/>
                <path d="M 15 60 Q 35 58, 55 61" stroke="#ccc" strokeWidth="0.6"/>
                <rect x="75" y="42" width="55" height="30" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                {/* Timeline */}
                <path d="M 15 82 L 15 108" stroke="#888" strokeWidth="1"/>
                <circle cx="15" cy="85" r="3" fill="#3b82f6"/>
                <circle cx="15" cy="95" r="3" fill="#8b5cf6"/>
                <circle cx="15" cy="105" r="3" fill="#22c55e"/>
                <path d="M 22 85 Q 50 83, 80 86" stroke="#ccc" strokeWidth="0.6"/>
                <path d="M 22 95 Q 45 93, 70 96" stroke="#ccc" strokeWidth="0.6"/>
                <path d="M 22 105 Q 55 103, 85 106" stroke="#ccc" strokeWidth="0.6"/>
              </g>

              <path d="M 365 90 Q 380 88, 400 90" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowFlowOps)"/>

              {/* Screen 3: Triage Queue */}
              <g transform="translate(410, 30)">
                <text x="70" y="-10" textAnchor="middle" className="text-[10px]" fill="#666">Triage Queue</text>
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughFlowOps)"/>
                {/* Filters */}
                <rect x="10" y="12" width="30" height="8" fill="none" stroke="#888" strokeWidth="1" rx="2"/>
                <rect x="45" y="12" width="30" height="8" fill="none" stroke="#888" strokeWidth="1" rx="2"/>
                <rect x="80" y="12" width="30" height="8" fill="none" stroke="#888" strokeWidth="1" rx="2"/>
                {/* Priority cards */}
                <rect x="10" y="28" width="120" height="25" fill="none" stroke="#ef4444" strokeWidth="1.5" rx="3"/>
                <text x="18" y="38" fontSize="6" fill="#ef4444">CRITICAL</text>
                <path d="M 18 45 Q 60 43, 100 46" stroke="#aaa" strokeWidth="0.6"/>
                <rect x="10" y="58" width="120" height="25" fill="none" stroke="#f59e0b" strokeWidth="1.5" rx="3"/>
                <text x="18" y="68" fontSize="6" fill="#f59e0b">HIGH</text>
                <path d="M 18 75 Q 55 73, 90 76" stroke="#aaa" strokeWidth="0.6"/>
                <rect x="10" y="88" width="120" height="25" fill="none" stroke="#3b82f6" strokeWidth="1" rx="3"/>
                <text x="18" y="98" fontSize="6" fill="#3b82f6">MEDIUM</text>
                <path d="M 18 105 Q 50 103, 85 106" stroke="#aaa" strokeWidth="0.6"/>
              </g>

              <path d="M 560 90 Q 575 88, 595 90" stroke="#555" strokeWidth="2" fill="none" markerEnd="url(#arrowFlowOps)"/>

              {/* Screen 4: Approval Modal */}
              <g transform="translate(605, 30)">
                <text x="70" y="-10" textAnchor="middle" className="text-[10px]" fill="#666">Approval</text>
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughFlowOps)"/>
                {/* Modal overlay effect */}
                <rect x="15" y="15" width="110" height="90" fill="#f5f5f5" stroke="#333" strokeWidth="1.5" rx="4"/>
                {/* Modal content */}
                <rect x="25" y="25" width="60" height="8" fill="none" stroke="#333" strokeWidth="1" rx="2"/>
                <path d="M 25 42 Q 60 40, 110 43" stroke="#aaa" strokeWidth="0.6"/>
                <path d="M 25 52 Q 55 50, 95 53" stroke="#aaa" strokeWidth="0.6"/>
                <path d="M 25 62 Q 70 60, 105 63" stroke="#aaa" strokeWidth="0.6"/>
                {/* Action buttons */}
                <rect x="25" y="78" width="40" height="15" fill="#22c55e" stroke="none" rx="3"/>
                <text x="45" y="88" textAnchor="middle" fontSize="7" fill="white">Approve</text>
                <rect x="70" y="78" width="40" height="15" fill="#ef4444" stroke="none" rx="3"/>
                <text x="90" y="88" textAnchor="middle" fontSize="7" fill="white">Reject</text>
              </g>

              {/* Row 2: Additional screens */}
              {/* Form Builder */}
              <g transform="translate(120, 200)">
                <text x="70" y="-10" textAnchor="middle" className="text-[10px]" fill="#666">New Request Form</text>
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughFlowOps)"/>
                {/* Form fields */}
                <text x="15" y="22" fontSize="6" fill="#666">Request Type</text>
                <rect x="10" y="28" width="120" height="14" fill="none" stroke="#888" strokeWidth="1" rx="2"/>
                <text x="15" y="55" fontSize="6" fill="#666">Title</text>
                <rect x="10" y="60" width="120" height="14" fill="none" stroke="#888" strokeWidth="1" rx="2"/>
                <text x="15" y="87" fontSize="6" fill="#666">Description</text>
                <rect x="10" y="92" width="120" height="20" fill="none" stroke="#888" strokeWidth="1" rx="2"/>
              </g>

              {/* Admin Config */}
              <g transform="translate(320, 200)">
                <text x="70" y="-10" textAnchor="middle" className="text-[10px]" fill="#666">Admin Config</text>
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughFlowOps)"/>
                {/* Tabs */}
                <rect x="10" y="12" width="35" height="10" fill="#ef4444" stroke="none" rx="2"/>
                <rect x="48" y="12" width="35" height="10" fill="none" stroke="#888" strokeWidth="0.8" rx="2"/>
                <rect x="86" y="12" width="35" height="10" fill="none" stroke="#888" strokeWidth="0.8" rx="2"/>
                {/* Config list */}
                <rect x="10" y="30" width="120" height="18" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                <rect x="10" y="52" width="120" height="18" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                <rect x="10" y="74" width="120" height="18" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                {/* Add button */}
                <rect x="10" y="98" width="50" height="14" fill="#ef4444" stroke="none" rx="3"/>
                <text x="35" y="108" textAnchor="middle" fontSize="7" fill="white">+ Add</text>
              </g>

              {/* SLA Dashboard */}
              <g transform="translate(520, 200)">
                <text x="70" y="-10" textAnchor="middle" className="text-[10px]" fill="#666">SLA Dashboard</text>
                <rect width="140" height="120" fill="none" stroke="#444" strokeWidth="2" rx="3" filter="url(#roughFlowOps)"/>
                {/* Metrics */}
                <rect x="10" y="15" width="38" height="35" fill="none" stroke="#22c55e" strokeWidth="1.5" rx="3"/>
                <text x="29" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#22c55e">85%</text>
                <text x="29" y="44" textAnchor="middle" fontSize="5" fill="#666">On Track</text>
                <rect x="52" y="15" width="38" height="35" fill="none" stroke="#f59e0b" strokeWidth="1.5" rx="3"/>
                <text x="71" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f59e0b">12%</text>
                <text x="71" y="44" textAnchor="middle" fontSize="5" fill="#666">At Risk</text>
                <rect x="94" y="15" width="38" height="35" fill="none" stroke="#ef4444" strokeWidth="1.5" rx="3"/>
                <text x="113" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ef4444">3%</text>
                <text x="113" y="44" textAnchor="middle" fontSize="5" fill="#666">Breached</text>
                {/* Chart placeholder */}
                <rect x="10" y="58" width="120" height="50" fill="none" stroke="#aaa" strokeWidth="0.8" rx="2"/>
                <path d="M 20 95 Q 50 75, 80 85 Q 100 70, 120 78" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
              </g>
            </svg>
          </div>

          <p className="text-white/50 text-sm leading-relaxed max-w-2xl mt-6">
            These rough sketches helped establish the core layout patterns: sidebar navigation, data tables for list views, modal dialogs for actions, and prominent SLA indicators. Quick iterations let me test information hierarchy before investing in visual polish.
          </p>
        </div>
      </Section>

      {/* Information Architecture */}
      <Section>
        <SectionLabel>04</SectionLabel>
        <SectionTitle>Information Architecture</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          The core design challenge was figuring out how to <strong className="text-white/70">organize complex data hierarchies</strong> so each user sees exactly what they need. Nothing more, nothing less.
        </p>

        <div className="flowops-architecture-grid">
          {/* Navigation Structure */}
          <div
            className="rounded-2xl p-8 border border-[#ef4444]/20"
            style={{ background: 'linear-gradient(145deg, #fffaf7 0%, #f7ebe2 100%)' }}
          >
            <h4 className="text-[#ef4444] text-sm font-medium mb-6">Role-Adaptive Navigation</h4>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                <p className="text-white/80 text-sm font-medium">Requester</p>
                <p className="text-white/40 text-xs">My Requests → New Request → Drafts</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                <p className="text-white/80 text-sm font-medium">Approver</p>
                <p className="text-white/40 text-xs">Pending Approvals → Team Requests → SLA Dashboard</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                <p className="text-white/80 text-sm font-medium">Agent</p>
                <p className="text-white/40 text-xs">Triage Queue → My Assignments → All Requests</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                <p className="text-white/80 text-sm font-medium">Admin</p>
                <p className="text-white/40 text-xs">Configuration → SLA Policies → User Management → Audit Log</p>
              </div>
            </div>
          </div>

          {/* Content Hierarchy */}
          <div
            className="rounded-2xl p-8 border border-[#ef4444]/20"
            style={{ background: 'linear-gradient(145deg, #fffaf7 0%, #f7ebe2 100%)' }}
          >
            <h4 className="text-[#ef4444] text-sm font-medium mb-6">Request Detail Hierarchy</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-[#ef4444] font-mono text-xs mt-0.5">L1</span>
                <div>
                  <p className="text-white/80 font-medium">Identity & Status</p>
                  <p className="text-white/40 text-xs">Ticket ID, title, current state, SLA indicator</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#ef4444] font-mono text-xs mt-0.5">L2</span>
                <div>
                  <p className="text-white/80 font-medium">Context & Actions</p>
                  <p className="text-white/40 text-xs">Available transitions, primary CTA based on role</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#ef4444] font-mono text-xs mt-0.5">L3</span>
                <div>
                  <p className="text-white/80 font-medium">Details & History</p>
                  <p className="text-white/40 text-xs">Form data, timeline, comments, internal notes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#ef4444] font-mono text-xs mt-0.5">L4</span>
                <div>
                  <p className="text-white/80 font-medium">Metadata & Audit</p>
                  <p className="text-white/40 text-xs">Timestamps, actors, field-level change history</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Decision */}
        <div className="study-callout p-5 rounded-xl bg-white/[0.02] border border-white/10 max-w-3xl">
          <p className="text-white/70 text-sm leading-relaxed">
            <span className="text-[#ef4444] font-medium">Design Decision:</span> Instead of one massive interface showing everything, I designed contextual views that surface relevant info based on what the user is actually trying to do. This reduces cognitive load while still giving access to full details when needed.
          </p>
        </div>
      </Section>

      {/* Key Workflows */}
      <Section>
        <SectionLabel>05</SectionLabel>
        <SectionTitle>Key Workflows</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          I mapped four critical end-to-end flows to understand where users struggle and where the system needs to provide clarity.
        </p>

        <FlowOpsFlows type="workflows" />
      </Section>

      {/* Interaction & UX Decisions */}
      <Section>
        <SectionLabel>06</SectionLabel>
        <SectionTitle>Interaction & UX Decisions</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Every UI choice had a reason behind it. Here's how I thought through the major interaction decisions, focusing on <strong className="text-white/70">decision clarity</strong> over pixel perfection.
        </p>

        <div className="flowops-decisions">
          {/* Decision 1 */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Decision</p>
              <p className="text-white/80 font-medium">Tables over cards</p>
            </div>
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Why</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Agents process 50+ requests a day. Tables let them sort, filter, and bulk-select, which is critical for high-volume triage. Cards look prettier but hide data density. For productivity, tables win every time.
              </p>
            </div>
          </div>

          {/* Decision 2 */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Decision</p>
              <p className="text-white/80 font-medium">SLA badges on every surface</p>
            </div>
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Why</p>
              <p className="text-white/50 text-sm leading-relaxed">
                SLA breaches cost money. Users shouldn't have to click into a request to know it's urgent. Green/amber/red badges on lists, details, and dashboards make urgency impossible to miss.
              </p>
            </div>
          </div>

          {/* Decision 3 */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Decision</p>
              <p className="text-white/80 font-medium">Modals for actions, not pages</p>
            </div>
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Why</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Approvers review requests one after another. Navigating to a new page breaks their flow. Modals keep the request visible while they make their call: approve, reject, or ask for more info.
              </p>
            </div>
          </div>

          {/* Decision 4 */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Decision</p>
              <p className="text-white/80 font-medium">Required rejection reasons</p>
            </div>
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Why</p>
              <p className="text-white/50 text-sm leading-relaxed">
                A flat "Rejected" with no explanation frustrates requesters and leads to repeat submissions. Making reasons mandatory adds friction for approvers, but that's intentional. It encourages them to actually think before hitting reject.
              </p>
            </div>
          </div>

          {/* Decision 5 */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Decision</p>
              <p className="text-white/80 font-medium">Role-specific navigation</p>
            </div>
            <div>
              <p className="text-[#ef4444] text-xs font-medium uppercase tracking-wider mb-2">Why</p>
              <p className="text-white/50 text-sm leading-relaxed">
                A universal dashboard sounds flexible but creates confusion. Requesters don't need triage queues; agents don't need draft management. Each role sees only what's relevant to their job.
              </p>
            </div>
          </div>
        </div>

        {/* Error/Empty/Success States */}
        <h4 className="text-white font-semibold mb-6">Error States, Empty States, Confirmations</h4>
        <div className="flowops-state-grid">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gray-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-white/80 text-sm font-medium">Empty States</p>
            <p className="text-white/40 text-xs mt-2">Not just "no data" but includes a clear next action ("Create your first request")</p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white/80 text-sm font-medium">Error States</p>
            <p className="text-white/40 text-xs mt-2">Specific error messages with recovery paths, not generic "Something went wrong"</p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white/80 text-sm font-medium">Confirmations</p>
            <p className="text-white/40 text-xs mt-2">Toast notifications for actions; clear feedback without blocking flow</p>
          </div>
        </div>
      </Section>

      {/* Accessibility & Edge Cases */}
      <Section>
        <SectionLabel>07</SectionLabel>
        <SectionTitle>Accessibility & Edge Cases</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          This section doesn't get enough love, but it signals real design maturity. Enterprise software serves diverse users in all kinds of contexts.
        </p>

        <div className="flowops-accessibility-grid">
          {/* Accessibility */}
          <div>
            <h4 className="text-white font-semibold mb-6">Accessibility</h4>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <p className="text-white/80 text-sm font-medium mb-1">Color independence</p>
                <p className="text-white/40 text-xs">Status badges use icons + text labels, never color alone</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <p className="text-white/80 text-sm font-medium mb-1">Keyboard navigation</p>
                <p className="text-white/40 text-xs">Full keyboard support with visible focus states; ⌘K command palette</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <p className="text-white/80 text-sm font-medium mb-1">Screen reader support</p>
                <p className="text-white/40 text-xs">ARIA labels, live regions for status changes</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <p className="text-white/80 text-sm font-medium mb-1">WCAG AA contrast</p>
                <p className="text-white/40 text-xs">All text and interactive elements meet contrast requirements</p>
              </div>
            </div>
          </div>

          {/* Edge Cases */}
          <div>
            <h4 className="text-white font-semibold mb-6">Edge Cases</h4>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <p className="text-white/80 text-sm font-medium mb-1">Permission boundaries</p>
                <p className="text-white/40 text-xs">Graceful handling when users attempt actions outside their role</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <p className="text-white/80 text-sm font-medium mb-1">Concurrent edits</p>
                <p className="text-white/40 text-xs">Warnings when data has changed since page load</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <p className="text-white/80 text-sm font-medium mb-1">SLA edge cases</p>
                <p className="text-white/40 text-xs">Blocked time excluded, business hours respected, timezone handling</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <p className="text-white/80 text-sm font-medium mb-1">Permission-based visibility</p>
                <p className="text-white/40 text-xs">Internal notes hidden from requesters; admin tools hidden from agents</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Validation & Iteration */}
      <Section>
        <SectionLabel>08</SectionLabel>
        <SectionTitle>Validation & Iteration</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Design isn't about nailing it on the first try. It's about learning and improving as you go. Here's what I discovered through walkthroughs and iteration.
        </p>

        <div className="flowops-validation-stack">
          {/* What I Tested */}
          <div
            className="rounded-2xl p-8 border border-[#ef4444]/20"
            style={{ background: 'linear-gradient(145deg, #fffaf7 0%, #f7ebe2 100%)' }}
          >
            <h4 className="text-[#ef4444] text-sm font-medium mb-6">What I Tested</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/80 text-sm font-medium mb-2">Walkthrough with product managers</p>
                <p className="text-white/50 text-xs">Validated workflow complexity and approval logic made sense to stakeholders</p>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium mb-2">Self-testing role flows</p>
                <p className="text-white/50 text-xs">Switched between roles to ensure each experience was coherent end-to-end</p>
              </div>
            </div>
          </div>

          {/* What Confused Users */}
          <div
            className="rounded-2xl p-8 border border-white/10"
            style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f4f1ee 100%)' }}
          >
            <h4 className="text-white/50 text-sm font-medium mb-6">What Caused Confusion</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-xs">!</span>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Initial design had too many status options</p>
                  <p className="text-white/40 text-xs mt-1">Consolidated from 12 states to 8 after feedback that "Pending Review" and "Awaiting Approval" felt redundant</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-xs">!</span>
                </div>
                <div>
                  <p className="text-white/70 text-sm">SLA badges weren't prominent enough</p>
                  <p className="text-white/40 text-xs mt-1">Increased badge size and added to list views after agents missed at-risk items in initial design</p>
                </div>
              </div>
            </div>
          </div>

          {/* What I Changed */}
          <div
            className="rounded-2xl p-8 border border-emerald-500/20"
            style={{ background: 'linear-gradient(145deg, #f6fcf8 0%, #e8f5ec 100%)' }}
          >
            <h4 className="text-emerald-400 text-sm font-medium mb-6">What I Changed</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/80 text-sm font-medium mb-2">Added bulk actions to agent queue</p>
                <p className="text-white/50 text-xs">Originally single-select only; bulk assign/close reduces repetitive clicks</p>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium mb-2">Made rejection reasons mandatory</p>
                <p className="text-white/50 text-xs">Was optional; made required after seeing requesters frustrated by unexplained rejections</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Outcomes & Metrics */}
      <Section>
        <SectionLabel>09</SectionLabel>
        <SectionTitle>Outcomes & Metrics</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Product designers think in outcomes. While this is a concept project, I defined expected success metrics to validate the design direction.
        </p>

        <div className="flowops-outcome-grid">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-3xl font-bold text-[#ef4444] mb-2">↓</p>
            <p className="text-white/70 text-sm font-medium">Time to triage</p>
            <p className="text-white/40 text-xs mt-1">Priority scoring surfaces urgent items instantly</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-3xl font-bold text-[#ef4444] mb-2">↓</p>
            <p className="text-white/70 text-sm font-medium">Stalled approvals</p>
            <p className="text-white/40 text-xs mt-1">"Needs Info" state prevents invisible blocking</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-3xl font-bold text-[#ef4444] mb-2">↑</p>
            <p className="text-white/70 text-sm font-medium">SLA visibility</p>
            <p className="text-white/40 text-xs mt-1">At-risk items surface before breach</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <p className="text-3xl font-bold text-[#ef4444] mb-2">↑</p>
            <p className="text-white/70 text-sm font-medium">Accountability</p>
            <p className="text-white/40 text-xs mt-1">Every action logged; ownership always clear</p>
          </div>
        </div>

        <div className="study-callout p-5 rounded-xl bg-white/[0.02] border border-white/10 max-w-3xl">
          <p className="text-white/70 text-sm leading-relaxed">
            <span className="text-[#ef4444] font-medium">Note:</span> These are projected outcomes based on the design's intent. In a production context, I would measure actual time-to-resolution, SLA breach rates, and user satisfaction scores.
          </p>
        </div>
      </Section>

      {/* Reflection & What's Next */}
      <Section>
        <SectionLabel>10</SectionLabel>
        <SectionTitle>Reflection & What's Next</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          Every project teaches something. Here's what I'm taking forward.
        </p>

        <div className="legacy-reflection-content max-w-4xl">
          <div className="flowops-reflection-grid">
            <div>
              <h3 className="text-[#ef4444] font-medium mb-4">What I Learned</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                <li>Designing for competing user needs is harder than designing for one persona</li>
                <li>"Flexible" often just means "confusing." Constraints can actually improve UX</li>
                <li>Enterprise users value speed and clarity over visual polish</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#ef4444] font-medium mb-4">What I'd Improve</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                <li>User testing with actual IT operations teams</li>
                <li>Reporting dashboard for SLA trends over time</li>
                <li>Mobile-responsive agent views for field technicians</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#ef4444] font-medium mb-4">How This Changed My Approach</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                <li>I now map user roles and conflicts before any wireframes</li>
                <li>I design for edge cases early, not as an afterthought</li>
                <li>I document decisions, not just screens</li>
              </ul>
            </div>
          </div>

          <div className="study-callout p-6 bg-white/[0.03] rounded-xl border border-[#ef4444]/20">
            <p className="text-white/80 text-base leading-relaxed">
              <span className="text-[#ef4444] font-medium">Key takeaway:</span> Enterprise software succeeds when it handles complexity invisibly. The goal isn't to strip out features. It's to show the right features to the right user at the right time. FlowOps taught me that product design at scale is really about systems, not just screens.
            </p>
          </div>
        </div>
      </Section>

      {/* Design System */}
      <Section>
        <SectionLabel>11</SectionLabel>
        <SectionTitle>Design System</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          A scalable component library ensuring consistency across all screens and user roles.
        </p>

        <div className="flowops-design-grid">
          {/* Colors */}
          <div
            className="rounded-2xl p-6 border border-[#ef4444]/20"
            style={{ background: 'linear-gradient(145deg, #fffaf7 0%, #f7ebe2 100%)' }}
          >
            <h4 className="text-[#ef4444] text-sm font-medium mb-6">Color Palette</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ef4444]"></div>
                <div>
                  <p className="text-white/80 text-sm">Primary</p>
                  <p className="text-white/40 text-xs">#EF4444</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500"></div>
                <div>
                  <p className="text-white/80 text-sm">Success</p>
                  <p className="text-white/40 text-xs">#22C55E</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500"></div>
                <div>
                  <p className="text-white/80 text-sm">Warning</p>
                  <p className="text-white/40 text-xs">#F59E0B</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500"></div>
                <div>
                  <p className="text-white/80 text-sm">Info</p>
                  <p className="text-white/40 text-xs">#3B82F6</p>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div
            className="rounded-2xl p-6 border border-[#ef4444]/20"
            style={{ background: 'linear-gradient(145deg, #fffaf7 0%, #f7ebe2 100%)' }}
          >
            <h4 className="text-[#ef4444] text-sm font-medium mb-6">Typography</h4>
            <div className="space-y-4">
              <div>
                <p className="text-white text-2xl font-bold">Heading 1</p>
                <p className="text-white/40 text-xs">24px / Bold</p>
              </div>
              <div>
                <p className="text-white text-lg font-semibold">Heading 2</p>
                <p className="text-white/40 text-xs">18px / Semibold</p>
              </div>
              <div>
                <p className="text-white text-base">Body Text</p>
                <p className="text-white/40 text-xs">14px / Regular</p>
              </div>
              <div>
                <p className="text-white text-sm text-white/60">Caption</p>
                <p className="text-white/40 text-xs">12px / Regular</p>
              </div>
            </div>
          </div>

          {/* Components */}
          <div
            className="rounded-2xl p-6 border border-[#ef4444]/20"
            style={{ background: 'linear-gradient(145deg, #fffaf7 0%, #f7ebe2 100%)' }}
          >
            <h4 className="text-[#ef4444] text-sm font-medium mb-6">Components</h4>
            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-xs mb-2">Buttons</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-[#ef4444] text-white text-xs rounded-md">Primary</button>
                  <button className="px-3 py-1.5 bg-white/10 text-white text-xs rounded-md border border-white/20">Secondary</button>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-2">Status Badges</p>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded">Active</span>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded">Pending</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded">Urgent</span>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-2">Input</p>
                <div className="px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white/40 text-xs">
                  Placeholder text...
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badges Full */}
        <div className="flowops-badge-system">
          <h4 className="text-white font-semibold mb-4">Status Badge System</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Request Status</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-md text-xs bg-gray-600 text-white">Draft</span>
                <span className="px-3 py-1.5 rounded-md text-xs bg-blue-600 text-white">Submitted</span>
                <span className="px-3 py-1.5 rounded-md text-xs bg-amber-600 text-white">Pending</span>
                <span className="px-3 py-1.5 rounded-md text-xs bg-purple-600 text-white">Triaged</span>
                <span className="px-3 py-1.5 rounded-md text-xs bg-cyan-600 text-white">In Progress</span>
                <span className="px-3 py-1.5 rounded-md text-xs bg-emerald-600 text-white">Resolved</span>
                <span className="px-3 py-1.5 rounded-md text-xs bg-green-700 text-white">Closed</span>
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">SLA Indicators</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-md text-xs bg-emerald-500 text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/80"></span>
                  On Track
                </span>
                <span className="px-3 py-1.5 rounded-md text-xs bg-amber-500 text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/80"></span>
                  At Risk
                </span>
                <span className="px-3 py-1.5 rounded-md text-xs bg-red-500 text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/80"></span>
                  Breached
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Product Walkthrough */}
      <Section>
        <SectionLabel>12</SectionLabel>
        <SectionTitle>Final Product</SectionTitle>
        <p className="text-white/50 leading-relaxed max-w-3xl mb-12">
          The complete FlowOps design, from dashboard to detail views. This showcases all the role-specific experiences and the full request lifecycle.
        </p>

        <div
          className="flowops-product-gallery"
          role="region"
          aria-label="FlowOps final product screens"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'ArrowLeft') { event.preventDefault(); goToPrevSlide() }
            if (event.key === 'ArrowRight') { event.preventDefault(); goToNextSlide() }
          }}
        >
          <figure>
            <a href={currentImage.src} target="_blank" rel="noreferrer" aria-label={`Open ${currentImage.label} at full size`}>
              <Image src={currentImage.src} alt={currentImage.label} width={2880} height={currentImage.height} />
            </a>
            <figcaption aria-live="polite">
              <span>{String(activeSlide + 1).padStart(2, '0')} / 04</span>
              <div><strong>{currentImage.label}</strong><p>{currentImage.detail}</p></div>
              <a href={currentImage.src} target="_blank" rel="noreferrer">Open full image ↗</a>
            </figcaption>
          </figure>
          <div className="flowops-gallery-controls">
            <button type="button" onClick={goToPrevSlide} aria-label="Previous FlowOps screen">←</button>
            <div role="group" aria-label="Choose a FlowOps screen">
              {demoImages.map((image, index) => (
                <button key={image.src} type="button" onClick={() => setActiveSlide(index)} aria-pressed={activeSlide === index}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{image.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={goToNextSlide} aria-label="Next FlowOps screen">→</button>
          </div>
        </div>
      </Section>

    </main>
  )
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="legacy-case-section">
      <div className="flowops-section-inner">{children}</div>
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="legacy-section-number text-[#ef4444]/60 text-sm font-mono mb-4">{children}</p>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="legacy-section-title text-3xl md:text-4xl font-bold text-white mb-12">{children}</h2>
}
