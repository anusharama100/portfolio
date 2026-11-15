"use client"

import { useState, type ReactNode } from 'react'
import { projectResources } from '@/portfolio/components/projectResources'

const journeys = [
  { label: 'Onboarding', title: 'A short introduction, then a first habit.', description: 'Introduce the habitat, create an account, and bring the user into their own space.', steps: ['Welcome', 'Create account', 'Set up profile', 'Home'], decision: 'Keep the first visit focused on understanding the experience and getting started.' },
  { label: 'Create a habit', title: 'Make the commitment specific.', description: 'Give the habit a name and a frequency before adding it to the daily routine.', steps: ['Home', 'Add habit', 'Name habit', 'Set frequency', 'Save'], decision: 'Daily, weekly, and custom options let the routine fit the person.' },
  { label: 'Track progress', title: 'Connect a small action to visible progress.', description: 'Complete a habit, see the streak change, and discover the reward attached to a milestone.', steps: ['View habits', 'Mark complete', 'Update streak', 'Reach milestone', 'Unlock animal'], decision: 'The reward follows a completed action, keeping the habitat connected to the habit.' },
  { label: 'Shared habits', title: 'Build a routine with someone else.', description: 'Invite a friend, share a habit, and see each person’s progress in the same place.', steps: ['Friends', 'Invite friend', 'Share habit', 'View progress', 'Send reminder'], decision: 'Shared progress and reminders add a social reason to return.' },
] as const

const finalScreens = [
  { label: 'Daily overview', title: 'Make today’s habits easy to find.', src: '/habitat/home-screen.jpeg', alt: 'HABITat home screen with a calendar, individual habits, and shared habits', width: 638, height: 1320, description: 'The calendar, habit streaks, and shared routines sit together on the home screen.', reasoning: 'A single daily overview brings the next action and existing progress into the same view.' },
  { label: 'Your habitat', title: 'Give progress a place to live.', src: '/habitat/profile-screen.jpeg', alt: 'HABITat profile showing collected animals, individual habits, and shared habits', width: 264, height: 576, description: 'Collected animals make the habitat a personal record of the habits someone has maintained.', reasoning: 'The collection connects a practical tracking task with a visible reward.' },
  { label: 'Shared progress', title: 'Show both sides of a shared routine.', src: '/habitat/shared-habits.jpeg', alt: 'Shared tennis habit showing individual streaks and a reminder for a friend', width: 716, height: 610, description: 'A shared-habit detail shows each person’s streak and whether a friend has logged the habit today.', reasoning: 'Keep the social context beside the reminder, so the action has a clear purpose.' },
] as const

const midfiScreens = [
  { src: '/midfi-profile.png', title: 'Profile', description: 'A home for personal progress.', width: 858, height: 1798 },
  { src: '/midfi-habits.png', title: 'Habit list', description: 'Scan routines and streaks.', width: 848, height: 1800 },
  { src: '/midfi-signin.png', title: 'Account entry', description: 'A focused way to get started.', width: 848, height: 1800 },
  { src: '/midfi-calendar.png', title: 'Calendar', description: 'Connect habits to the day.', width: 854, height: 1800 },
] as const

function Section({ number, title, id, children }: { number: string; title: string; id: string; children: ReactNode }) {
  return (
    <section className="legacy-case-section habitat-section" id={id} aria-labelledby={id + '-title'}>
      <div>
        <p className="legacy-section-number">{number}</p>
        <h2 className="legacy-section-title" id={id + '-title'}>{title}</h2>
        {children}
      </div>
    </section>
  )
}

function HabitatJourneys() {
  const [selected, setSelected] = useState(0)
  const journey = journeys[selected]
  return (
    <div className="habitat-journeys">
      <div className="habitat-options" role="group" aria-label="Choose a HABITat journey">
        {journeys.map((item, index) => (
          <button key={item.label} id={'habitat-journey-' + index} type="button" aria-pressed={index === selected} aria-controls="habitat-journey-panel" onClick={() => setSelected(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="habitat-journey-panel" id="habitat-journey-panel" role="region" aria-labelledby={'habitat-journey-' + selected}>
        <h3>{journey.title}</h3>
        <p>{journey.description}</p>
        <ol className="habitat-flow-steps" aria-label={journey.label + ' steps'}>
          {journey.steps.map(step => <li key={step}>{step}</li>)}
        </ol>
        <p className="habitat-journey-note"><strong>Design focus</strong>{journey.decision}</p>
      </div>
    </div>
  )
}

function HabitatFinalScreens() {
  const [selected, setSelected] = useState(0)
  const screen = finalScreens[selected]
  return (
    <div className="habitat-final-screens">
      <div className="habitat-options habitat-screen-options" role="group" aria-label="Choose a HABITat final screen">
        {finalScreens.map((item, index) => (
          <button key={item.label} id={'habitat-screen-' + index} type="button" aria-pressed={index === selected} aria-controls="habitat-screen-panel" onClick={() => setSelected(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="habitat-screen-panel" id="habitat-screen-panel" role="region" aria-labelledby={'habitat-screen-' + selected}>
        <a className="habitat-final-image" data-layout={screen.width > screen.height ? 'landscape' : 'phone'} href={screen.src} target="_blank" rel="noreferrer" aria-label={'Open ' + screen.label.toLowerCase() + ' full image'}>
          <img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} loading="lazy" />
        </a>
        <div className="habitat-screen-copy">
          <p className="habitat-kicker">Final design · {String(selected + 1).padStart(2, '0')} / 03</p>
          <h3>{screen.title}</h3>
          <p>{screen.description}</p>
          <div className="habitat-design-note"><h4>The design decision</h4><p>{screen.reasoning}</p></div>
          <a className="habitat-text-link" href={screen.src} target="_blank" rel="noreferrer">Open full image <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  )
}

export default function HabitatCaseStudy() {
  return (
    <main className="habitat-case">
      <Section number="01" title="Overview" id="case-study-content">
        <div className="habitat-overview">
          <div className="habitat-prose">
            <h3 className="habitat-lead">A small daily action should feel worth returning to.</h3>
            <p>HABITat is a habit-building concept for college students. Completing routines grows a personal collection of animals; shared habits let friends follow progress together.</p>
            <p>Across a four-week sprint, our team connected student research, user flows, wireframes, and a high-fidelity Figma prototype.</p>
          </div>
          <aside className="habitat-brief" aria-label="Project scope">
            <h3>The scope</h3>
            <dl>
              <div><dt>Audience</dt><dd>College students building routines</dd></div>
              <div><dt>My contribution</dt><dd>Research synthesis, user flows, and prototyping with a team of four designers</dd></div>
              <div><dt>Deliverable</dt><dd>Interactive mobile concept in Figma</dd></div>
            </dl>
          </aside>
        </div>
        <div className="study-callout habitat-design-question">
          <p className="habitat-kicker">The design question</p>
          <p>How might habit tracking feel clear, rewarding, and easy to return to?</p>
        </div>
      </Section>

      <Section number="02" title="Design Process" id="habitat-process">
        <p className="habitat-section-intro">Four weeks, from understanding motivation to presenting the prototype.</p>
        <ol className="habitat-process">
          {[
            ['Week 1', 'Research', 'Survey students and review existing habit apps.'],
            ['Week 2', 'Define', 'Synthesize themes and explore the habitat metaphor.'],
            ['Week 3', 'Prototype', 'Map journeys, create wireframes, and gather usability feedback.'],
            ['Week 4', 'Refine', 'Develop the safari visual direction and present the final prototype.'],
          ].map(([week, title, body]) => <li key={week}><span>{week}</span><h3>{title}</h3><p>{body}</p></li>)}
        </ol>
      </Section>

      <Section number="03" title="Research" id="habitat-research">
        <p className="habitat-section-intro">We asked college students what made habits difficult to maintain and what would encourage them to keep going.</p>
        <div className="habitat-research-grid">
          <div className="habitat-research-responses">
            <p className="habitat-kicker">What students asked for</p>
            <blockquote>“If I feel rewarded by it”</blockquote>
            <blockquote>“Food and rewards both in the app and real life. Include a system to share with friends.”</blockquote>
            <p className="habitat-caption">Selected responses to our survey about habit incentives.</p>
          </div>
          <div className="habitat-research-findings">
            <h3>Three recurring barriers</h3>
            <ul>
              <li><strong>Daily effort</strong><p>Logging a habit could feel like another task to remember.</p></li>
              <li><strong>Limited incentive</strong><p>A checked box alone did not give students much reason to return.</p></li>
              <li><strong>Disconnected progress</strong><p>Students wanted rewards and ways to share the experience with friends.</p></li>
            </ul>
          </div>
        </div>
      </Section>

      <Section number="04" title="Synthesis" id="habitat-synthesis">
        <p className="habitat-section-intro">The research became three design priorities, each connected to a visible part of the experience.</p>
        <div className="habitat-priorities">
          {[
            ['01', 'Make progress tangible', 'Students wanted to feel rewarded.', 'Connect habit milestones to collectible animals.'],
            ['02', 'Make room for friends', 'Shared goals appeared in the survey responses.', 'Show each person’s progress and provide a reminder action.'],
            ['03', 'Keep the routine clear', 'Daily logging needed to feel manageable.', 'Bring the calendar, habits, and streaks into one overview.'],
          ].map(([number, title, insight, response]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{insight}</p><div><h4>Design response</h4><p>{response}</p></div></article>)}
        </div>
      </Section>

      <Section number="05" title="User Flows" id="habitat-journeys">
        <p className="habitat-section-intro">Choose a journey to follow its steps, from the first visit to a shared routine.</p>
        <HabitatJourneys />
      </Section>

      <Section number="06" title="Prototyping" id="habitat-prototype">
        <div className="habitat-prototype-intro">
          <div className="habitat-prose"><h3>Connect the screens before polishing them.</h3><p>The Figma prototype links account entry, habit creation, progress, shared habits, and rewards. It gave the team a way to walk through the transitions between screens.</p></div>
          <a className="habitat-prototype-link" href={projectResources.habitat.demo.href} target="_blank" rel="noreferrer">Explore the Figma prototype <span aria-hidden="true">↗</span></a>
        </div>
        <details className="habitat-prototype-map">
          <summary>View the complete interaction map <span aria-hidden="true">+</span></summary>
          <figure><a href="/habitat/habitat-figma.png" target="_blank" rel="noreferrer" aria-label="Open HABITat Figma interaction map full size"><img src="/habitat/habitat-figma.png" alt="Original Figma canvas showing the connected HABITat screens and prototype interactions" width={1652} height={1360} loading="lazy" /></a><figcaption>Original Figma interaction map. Select the image to inspect it at full size.</figcaption></figure>
        </details>
      </Section>

      <Section number="07" title="Mid-Fidelity Prototypes" id="habitat-wireframes">
        <p className="habitat-section-intro">The earlier screens established the layout for account entry, habit tracking, and personal progress.</p>
        <div className="habitat-wireframes">
          {midfiScreens.map(screen => <figure key={screen.src}>
            <a href={screen.src} target="_blank" rel="noreferrer" aria-label={'Open ' + screen.title.toLowerCase() + ' wireframe full size'}><img src={screen.src} alt={'HABITat mid-fidelity ' + screen.title.toLowerCase() + ' design'} width={screen.width} height={screen.height} loading="lazy" /></a>
            <figcaption><h3>{screen.title}</h3><p>{screen.description}</p></figcaption>
          </figure>)}
        </div>
      </Section>

      <Section number="08" title="Solution" id="habitat-solution">
        <p className="habitat-section-intro">A daily overview, a growing habitat, and shared progress form the core of the final concept. Choose a screen to explore the design.</p>
        <HabitatFinalScreens />
        <div className="habitat-reward-note">
          <img src="/habitat/reward-tiger.jpeg" alt="Tiger reward earned through a HABITat habit milestone" width={216} height={210} loading="lazy" />
          <div><h3>A reward tied to the routine.</h3><p>Animals are unlocked through habit milestones. The collection gives the progress a visible, personal expression.</p></div>
        </div>
      </Section>

      <Section number="09" title="Outcome & Feedback" id="habitat-outcome">
        <div className="habitat-outcomes">
          <article className="habitat-award"><span className="habitat-kicker">Team recognition</span><h3>Most User-Centered Design</h3><p>Awarded among the Design Innovation teams.</p></article>
          <article><span className="habitat-kicker">Delivered</span><h3>A connected mobile prototype</h3><p>Four core journeys, a safari visual direction, and an interactive Figma presentation.</p></article>
          <article><span className="habitat-kicker">Evidence</span><h3>Concept and usability feedback</h3><p>The prototype and participant feedback show the direction; they do not establish long-term retention.</p></article>
        </div>
        <blockquote className="study-callout habitat-feedback"><p>“I actually want to open this app every day. The animals make me feel like I’m working toward something real, not just checking boxes.”</p><cite>Usability testing participant</cite></blockquote>
      </Section>

      <Section number="10" title="Reflection" id="habitat-reflection">
        <div className="habitat-reflection">
          <div><h3>Connect the reward to the behavior.</h3><p>The habitat is most useful when it makes a completed habit meaningful. The tracking task still needs to stay clear and easy to reach.</p></div>
          <div><h3>Test what happens after the first week.</h3><p>I would next test returning after missed days, different habit types, and whether the reward remains motivating over time.</p></div>
        </div>
        <div className="habitat-team"><h3>The team</h3><p>Deepa Bhat · Anusha Ramachandran · Vaishnavi Chandrapati · Aaron Foronda</p></div>
      </Section>

      <Section number="11" title="Product Walkthrough" id="habitat-walkthrough">
        <div className="habitat-walkthrough-intro"><p className="habitat-section-intro">Play the recorded prototype walkthrough, or open Figma to explore the interactions yourself.</p><a className="habitat-text-link" href={projectResources.habitat.demo.href} target="_blank" rel="noreferrer">Try the interactive prototype <span aria-hidden="true">↗</span></a></div>
        <video className="habitat-walkthrough" controls playsInline preload="none" poster="/habitat/habitat-hero.png" aria-label="HABITat product walkthrough">
          <source src="/habitat/habitat-demo.mp4" type="video/mp4" />
          Your browser does not support this video. <a href="/habitat/habitat-demo.mp4">Open the recorded walkthrough.</a>
        </video>
      </Section>
    </main>
  )
}
