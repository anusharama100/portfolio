export type ProjectSlug = 'nexus' | 'neuranote' | 'flowops'

export type VisualKind = 'image' | 'video' | 'chart'

export interface ChartDatum {
  label: string
  value: number
  note: string
}

export interface ChartSeries {
  id: string
  label: string
  description: string
  data: ChartDatum[]
}

export interface ImageVisualAsset {
  kind: 'image'
  src: string
  caption: string
}

export interface VideoVisualAsset {
  kind: 'video'
  src: string
  caption: string
}

export interface ChartVisualAsset {
  kind: 'chart'
  caption: string
  title: string
  scaleLabel: string
  maxValue: number
  series: ChartSeries[]
}

export type VisualAsset = ImageVisualAsset | VideoVisualAsset | ChartVisualAsset

export interface PresentationStop {
  /** Mirrors numbered sections on the full case study page */
  caseStudySection: string
  title: string
  summary: string
  bullets: string[]
  visuals: VisualAsset[]
  /** Ties this beat to the internship (product/UX, banking-adjacent themes) */
  internshipBridge: string
  /** Overrides the default bridge callout label in the deck UI */
  bridgeHeading?: string
}

export interface PresentationProject {
  slug: ProjectSlug
  title: string
  subtitle: string
  meta: string
  /** Tailwind text/bg hints */
  accentClass: string
  accentSoftClass: string
  caseStudyHref: string
  stops: PresentationStop[]
}

export const PRESENTATION_PROJECTS: PresentationProject[] = [
  {
    slug: 'nexus',
    title: 'Nexus',
    subtitle: 'One answer backed by multiple models, designed to feel clear and trustworthy.',
    meta: 'Product design · Narb internship · Shipped with engineering (Figma, Cursor, Lovable)',
    accentClass: 'text-[#2563EB]',
    accentSoftClass: 'bg-[#DBEAFE] border-[#93C5FD]',
    caseStudyHref: '/case-study/nexus',
    stops: [
      {
        caseStudySection: '01 · Overview',
        title: 'What Nexus is',
        summary:
          'Nexus is an **AI research platform** I designed at **Narb** during my internship. For complex technical or academic work, students already use AI, but a single response often doesn’t feel reliable. Different models can give different answers, and even in my own experience, I found myself cross-checking across tools to be sure.',
        bullets: [
          'This project focuses on helping people feel confident in their decisions by giving them a clear answer first, with more detail available if they want it.',
          'Nexus does this by running multiple models in the background and combining the results into one focused response, instead of showing everything side by side.',
          'The goal is simple: reduce uncertainty and give users something they can actually act on.',
        ],
        visuals: [
          { kind: 'image', src: '/narbl/narbl-1.png', caption: 'Nexus landing page' },
          { kind: 'image', src: '/narbl/narbl-2.png', caption: 'Answer generation in progress' },
        ],
        bridgeHeading: 'LendingClub connection',
        internshipBridge:
          'When confidence is low, users create their own workflows to verify results. That adds friction and breaks the experience. In products where decisions matter, trust determines whether users stay or leave.',
      },
      {
        caseStudySection: '02 · Research',
        title: 'The problem was trust, not speed',
        summary:
          'The main issue was that people didn’t feel confident relying on a single AI answer, especially for more complex questions. Because of that, they often double-checked across different tools to be sure. I surveyed about **48 students** and ran a few usability sessions, and what stood out was how unsure people felt about the answers, not how they used the tools.',
        bullets: [
          '**What we saw:** Students were switching between **ChatGPT**, **Claude**, and other tools to compare answers.',
          '**What that meant:** The problem wasn’t access to information, it was having to figure out which answer to trust.',
          '**Design direction:** Instead of showing multiple outputs, the goal became to provide one clear answer that users can rely on and act on.',
        ],
        visuals: [
          {
            kind: 'chart',
            title: 'What the research pointed to',
            caption: 'Qualitative synthesis from the 48-student survey and usability sessions',
            scaleLabel: 'Relative signal strength',
            maxValue: 5,
            series: [
              {
                id: 'pain-points',
                label: 'Main pain points',
                description: 'This view summarizes which issues showed up most strongly in the research.',
                data: [
                  {
                    label: 'Trust in one answer',
                    value: 5,
                    note: 'The strongest issue was confidence, especially on more complex questions.',
                  },
                  {
                    label: 'Need to verify',
                    value: 4,
                    note: 'People often felt they still had to confirm the answer themselves.',
                  },
                  {
                    label: 'Speed of response',
                    value: 2,
                    note: 'Speed mattered, but it was not the main reason people kept switching tools.',
                  },
                ],
              },
              {
                id: 'behaviors',
                label: 'Observed behaviors',
                description: 'This view shows the behaviors that followed when people did not trust a single output.',
                data: [
                  {
                    label: 'Compare across tools',
                    value: 5,
                    note: 'Users regularly moved between ChatGPT, Claude, and other sources to compare answers.',
                  },
                  {
                    label: 'Re-check before acting',
                    value: 4,
                    note: 'People slowed down and spent extra effort validating what they saw.',
                  },
                  {
                    label: 'Use first answer directly',
                    value: 1,
                    note: 'This was uncommon when the question felt important or high stakes.',
                  },
                ],
              },
            ],
          },
        ],
        bridgeHeading: 'Why this matters',
        internshipBridge:
          'When people don’t feel confident in an answer, they slow down and start doing extra work to verify it. That friction adds up quickly. In products where decisions matter, like financial tools, that kind of doubt can make people leave.',
      },
      {
        caseStudySection: '03 · Decision',
        title: 'One clear answer',
        summary:
          'I initially explored showing **multiple model responses side by side** so users could compare them. In testing, this quickly became overwhelming. People still had to read through everything and figure out which answer to trust, which felt like extra work.',
        bullets: [
          '**What I changed:** I shifted to a **single aggregated answer** that combines responses from multiple models into one clear result.',
          '**How I structured it:** I prioritized a **clear answer first**, then layered in additional detail only when users choose to explore.',
          '**Why it worked:** This reduced the amount of thinking users had to do and made the experience feel much more straightforward.',
          '**The impact:** Instead of sorting through multiple answers, users could focus on one response that felt **easier to understand and act on**.',
        ],
        visuals: [],
        internshipBridge:
          'Even when the system is complex behind the scenes, the interface should feel simple. The goal is to remove effort for the user, not add to it.',
      },
      {
        caseStudySection: '04 · Decision',
        title: 'Showing where the answer comes from',
        summary:
          'A single answer isn’t enough on its own. People still want to understand where it’s coming from and whether they can rely on it.',
        bullets: [
          '**What I added:** Model attribution so users can see which models contributed to the answer.',
          '**How it’s designed:** The default view stays simple, with a clear answer upfront. If users want more detail, they can expand to see which models were used.',
          '**Why it worked:** It keeps the experience easy to use while giving users a way to verify the answer without overwhelming them.',
          '**The impact:** Users get a straightforward answer, with the option to check where it came from when they want more confidence.',
        ],
        visuals: [],
        internshipBridge:
          'Clarity should come first, but transparency should always be available. The goal is to support trust without overwhelming users with too much information upfront.',
      },
      {
        caseStudySection: '05 · Decision',
        title: 'Designing for real latency',
        summary:
          'In reality, the different models don’t finish at the same time. Waiting for everything to load meant users were staring at a **blank screen** for too long. My initial concept assumed the full answer would appear all at once, but that didn’t hold up once we accounted for real system behavior.',
        bullets: [
          '**What I changed:** I redesigned the experience to use **streaming**, where users start seeing the answer as it’s being generated instead of waiting.',
          '**Why it worked:** This made the product feel **faster and more responsive**. It also helped build trust, since users could see that the system was actively working.',
          '**The impact:** Instead of waiting with no feedback, users stay engaged and feel more confident in the process.',
          '**Key takeaway:** This was shaped closely with **engineering**. The experience had to reflect how the system actually behaves, not an ideal version of it.',
        ],
        visuals: [],
        internshipBridge:
          'Good design accounts for real constraints. Especially with live systems, the experience should match what’s actually happening behind the scenes, not hide it.',
      },
      {
        caseStudySection: '06 · Collaboration',
        title: 'Cross-functional collaboration',
        summary:
          'This project also shows how I work across design and engineering to move an idea from early concept to something that is much closer to the final product.',
        bullets: [
          '**How it started:** We began in **Figma** to explore the core flows, structure, and interaction patterns.',
          '**How it evolved:** As the product got more detailed, we moved into **Cursor** for deeper prototyping so we could think through behavior, states, and system constraints more realistically.',
          '**How I handed it off:** We shared **GitHub pages** with design system tokens so engineers had a more concrete, implementation-ready reference.',
          '**Why it mattered:** That made collaboration faster, reduced ambiguity in handoff, and helped keep the design system aligned with what was actually being built.',
        ],
        visuals: [],
        bridgeHeading: 'Why this matters',
        internshipBridge:
          'One of the most useful parts of the project was learning how to work across tools and disciplines, not just designing the interface but helping shape how it moved into implementation.',
      },
      {
        caseStudySection: '07 · Impact',
        title: 'Impact',
        summary:
          'In testing, people felt **more confident** in the answers and were **less likely to cross-check** across other tools. On the product side, we saw improvements in **onboarding and overall engagement**, along with strong positive feedback.',
        bullets: [
          '**Results:** Sign-ups **increased by 40%** over three months. Onboarding became **2× faster** after the redesign.',
          '**User signal:** **85% positive usability feedback**. **10,000+ active users** on the shipped experience.',
        ],
        visuals: [],
        internshipBridge:
          'I focus on connecting design decisions to real outcomes. It’s not just about improving the experience, but showing how those changes impact user behavior and product metrics.',
      },
      {
        caseStudySection: '08 · Reflection',
        title: 'What I’d explore next',
        summary:
          'One area I’d want to explore further is how we communicate **confidence for more complex or ambiguous questions**, where a single signal doesn’t fully capture the nuance.',
        bullets: [
          '**Next steps:** Finding clearer ways to show **why models agree or disagree**, without adding complexity back into the experience.',
          '**Expanding testing:** Including **mobile earlier** on, and working with a **broader range of students**.',
        ],
        visuals: [],
        bridgeHeading: 'Why this matters',
        internshipBridge:
          'I think it’s important to leave a project with clear next steps, not just a finished design. Documenting open questions helps guide future iterations and keeps the work grounded in real user needs.',
      },
      {
        caseStudySection: '09 · Walkthrough',
        title: 'Full walkthrough',
        summary:
          'This is a quick walkthrough of the final designs, pulled directly from my public case study. I can move through key screens or jump to specific areas depending on what’s most useful.',
        bullets: [],
        visuals: [
          { kind: 'image', src: '/narbl/narbl-1.png', caption: 'Landing page' },
          { kind: 'image', src: '/narbl/narbl-2.png', caption: 'Answer generation' },
          { kind: 'image', src: '/narbl/narbl-3.png', caption: 'Results view' },
          { kind: 'image', src: '/narbl/narbl-4.png', caption: 'Homework workflow' },
          { kind: 'image', src: '/narbl/narbl-5.png', caption: 'Social proof' },
          { kind: 'image', src: '/narbl/narbl-6.png', caption: 'Trust signals' },
          { kind: 'image', src: '/narbl/narbl-7.png', caption: 'Integrations' },
          { kind: 'image', src: '/narbl/narbl-8.png', caption: 'Value proposition' },
          { kind: 'image', src: '/narbl/narbl-9.png', caption: 'Final product overview' },
        ],
        internshipBridge: '',
      },
    ],
  },
  {
    slug: 'neuranote',
    title: 'NeuraNote',
    subtitle: 'A study tool designed around how people learn, not just how they organize notes.',
    meta: 'UX design & research · 6 weeks · Cognitive science in the interface (Figma, Lovable, Cursor)',
    accentClass: 'text-[#4F46E5]',
    accentSoftClass: 'bg-[#EEF2FF] border-[#C7D2FE]',
    caseStudyHref: '/case-study/neuranote',
    stops: [
      {
        caseStudySection: '01 · Overview',
        title: 'The idea',
        summary:
          'Most note-taking tools focus on organization. **NeuraNote focuses on memory**, helping students capture ideas, connect them visually, and review them in a way that actually supports learning.',
        bullets: [
          '**Who it’s for:** Students who take a lot of notes but still struggle to remember what matters when it counts.',
          '**What makes it different:** The product is grounded in **how people learn**, using concepts like **retrieval practice, spaced repetition, and concept mapping** instead of adding more features.',
        ],
        visuals: [
          { kind: 'image', src: '/neuranote/neuranote-1.png', caption: 'Landing page' },
          { kind: 'image', src: '/neuranote/neuranote-2.png', caption: 'Product overview' },
          { kind: 'image', src: '/neuranote/neuranote-3.png', caption: 'Learning science explained' },
        ],
        internshipBridge: '',
      },
      {
        caseStudySection: '02 · Research',
        title: 'Early insights',
        summary:
          'Early on, I saw that students often confuse **being organized** with **actually knowing the material**. Having neat notes didn’t always translate to retention.',
        bullets: [
          '**What I explored:** In early sketches, I focused on testing different ways to organize notes, like whether concepts should be shown as lists or connected visually. I also thought through how students move between quickly reviewing material and studying more deeply, so the product could support both without feeling overwhelming.',
          '**What this led to:** A direction focused on helping students actively engage with their notes in a way that improves memory, instead of just passively reviewing information.',
        ],
        visuals: [
          { kind: 'image', src: '/neuranote/lofi-sketches-1.png', caption: 'Early layout exploration' },
          { kind: 'image', src: '/neuranote/lofi-sketches-2.png', caption: 'Concept map exploration' },
        ],
        internshipBridge: '',
      },
      {
        caseStudySection: '03 · Features',
        title: 'Designing for how people learn',
        summary:
          'I designed the product around how students actually study. **What are the key ideas? How do they connect? What should I review today?** The goal was to help students learn and remember the material, not just organize their notes.',
        bullets: [
          '**Concept map:** Helps students **see relationships between ideas**, instead of keeping everything in flat notes.',
          '**Review mode:** Focuses on **active recall**, so students test what they know instead of just rereading.',
          '**Insights:** Shows progress in a **simple, clear way** so students understand how they’re doing without feeling overwhelmed.',
          '**Visual system:** A calm palette, clear typography, and reusable components keep the product readable during long study sessions.',
        ],
        visuals: [
          { kind: 'image', src: '/neuranote/neuranote-5.png', caption: 'Concept map' },
          { kind: 'image', src: '/neuranote/neuranote-6.png', caption: 'Review mode' },
          { kind: 'image', src: '/neuranote/neuranote-7.png', caption: 'Learning insights' },
        ],
        internshipBridge: '',
      },
      {
        caseStudySection: '04 · Process',
        title: 'From sketches to tested flows',
        summary:
          'This project moved from research and early sketches into **mid-fidelity wireframes, high-fidelity designs, and usability testing**.',
        bullets: [
          '**What mid-fi helped validate:** Layout, hierarchy, and how much information to show before committing to final visual decisions.',
          '**Why it worked:** It kept the experience centered on **learning, not just organization** and avoided unnecessary features.',
        ],
        visuals: [{ kind: 'image', src: '/neuranote/midfi-wireframes.png', caption: 'Mid-fidelity wireframes' }],
        internshipBridge: '',
      },
      {
        caseStudySection: '05 · Testing',
        title: 'What testing revealed',
        summary:
          'People understood the overall idea, but some were unsure how to actually use features like **concept linking** and **review**. A few users also didn’t know what to do first or how the system was supposed to help them study.',
        bullets: [
          '**What I changed:** I simplified the flow and made the next steps more clear.',
          '**Guidance:** I added onboarding support so users knew how to start instead of facing a blank state.',
          '**Interaction clarity:** I made actions like linking concepts and reviewing more obvious.',
        ],
        visuals: [{ kind: 'image', src: '/neuranote/neuranote-4.png', caption: 'Usability testing prototype' }],
        internshipBridge: '',
      },
      {
        caseStudySection: '06 · Impact',
        title: 'Projected impact',
        summary:
          'NeuraNote is a concept, but the expected impact is grounded in **learning science** and what we saw in testing.',
        bullets: [
          '**What we expect:** Around a **40% reduction in review time** by spacing content more effectively. **Faster recall** when using concept maps compared to traditional linear notes. Most testers said they **would switch** from their current note-taking tools.',
          '**What this shows:** The approach has strong potential to **improve how students study**, not just how they organize information.',
          '**Key takeaway:** AI should support how people think, not replace it. The goal is to help students engage with the material, not automate learning away.',
        ],
        visuals: [],
        internshipBridge: '',
      },
      {
        caseStudySection: '07 · Walkthrough',
        title: 'See it in motion',
        summary: '',
        bullets: [],
        visuals: [
          { kind: 'video', src: '/neuranote/neuranote-demo.mp4', caption: 'Recorded product walkthrough' },
          { kind: 'image', src: '/neuranote/neuranote-4.png', caption: 'Dashboard' },
          { kind: 'image', src: '/neuranote/neuranote-5.png', caption: 'Concept map' },
          { kind: 'image', src: '/neuranote/neuranote-6.png', caption: 'Review mode' },
          { kind: 'image', src: '/neuranote/neuranote-7.png', caption: 'Insights' },
        ],
        internshipBridge: '',
      },
    ],
  },
  {
    slug: 'flowops',
    title: 'FlowOps',
    subtitle: 'A multi-role request tool designed to make ownership, progress, and next steps clear.',
    meta: 'Product design · 2-week sprint · Enterprise workflows (Figma, Adobe CC, Cursor)',
    accentClass: 'text-[#DC2626]',
    accentSoftClass: 'bg-[#FEE2E2] border-[#FCA5A5]',
    caseStudyHref: '/case-study/flowops',
    stops: [
      {
        caseStudySection: '01 · Problem',
        title: 'The problem',
        summary:
          'I designed FlowOps because a lot of internal tools make simple tasks feel more complicated than they should. Requests were spread across **email, Slack, and spreadsheets**, so it was hard to track what was going on and who was responsible.',
        bullets: [
          '**What that caused:** Confusion around ownership, delays in getting things done, and issues being noticed too late.',
          '**Who it affected:** Requesters, agents, and managers were all involved in the same request, but each person needed a different view.',
        ],
        visuals: [],
        internshipBridge: '',
      },
      {
        caseStudySection: '02 · Goals',
        title: 'What success needed to look like',
        summary:
          'Before designing, I defined what a good outcome should be: **clear ownership, easy-to-see progress, faster decisions, and a reliable history of requests**.',
        bullets: [
          '**What guided the design:** Reduce delays, help people make decisions faster, and make the system easy to follow without needing extra context.',
        ],
        visuals: [],
        internshipBridge: '',
      },
      {
        caseStudySection: '03 · Workflow',
        title: 'Building a clear workflow',
        summary:
          'The main challenge was making it easy to follow a request from start to finish.',
        bullets: [
          '**What I designed:** A workflow where status is always visible, ownership is clear, and you can see what has happened so far.',
          '**How it works:** Statuses reflect real steps like “in progress,” “needs info,” or “reassigned,” so it is always clear what needs attention.',
        ],
        visuals: [{ kind: 'image', src: '/flowops2.png', caption: 'Request detail view' }],
        internshipBridge: '',
      },
      {
        caseStudySection: '04 · Roles',
        title: 'Designing for four roles',
        summary:
          'The same request needed to work for different roles: **requesters, agents, managers, and admins**. Each person uses the system differently, so the goal was to show the right information without making it feel overwhelming.',
        bullets: [
          '**Requester:** Submit requests and track status easily.',
          '**Agent:** Handle and resolve requests quickly with enough context.',
          '**Manager:** See priorities, ownership, and approvals.',
          '**Admin:** Manage workflows and system rules.',
          '**What I focused on:** Showing the right information for each role, making actions and next steps clear, and avoiding unnecessary complexity.',
          '**Key design decisions:** Clear defaults, strong confirmations for important actions, and layouts that show a lot of information but still feel easy to scan.',
        ],
        visuals: [
          { kind: 'image', src: '/flowops-permission-matrix.png', caption: 'Permission matrix across roles' },
          { kind: 'image', src: '/flowops-role-approver.png', caption: 'Approver dashboard' },
          { kind: 'image', src: '/flowops-role-agent.png', caption: 'Agent dashboard' },
          { kind: 'image', src: '/flowops-role-admin.png', caption: 'Admin dashboard' },
        ],
        internshipBridge: '',
      },
      {
        caseStudySection: '05 · Testing',
        title: 'What testing changed',
        summary:
          'Some steps still felt unclear, especially when a request changed hands. Requesters didn’t always understand what was happening or why.',
        bullets: [
          '**What I changed:** I made rejection reasons required so there was always clear feedback, simplified the wording, and improved progress indicators so status was easier to scan.',
          '**The result:** The flow was easier to follow, ownership changes felt clearer, and users understood what was happening without needing to ask.',
        ],
        visuals: [],
        internshipBridge: '',
      },
      {
        caseStudySection: '06 · Impact',
        title: 'What this was designed to improve',
        summary:
          'Even as a short project, the goal was to show how the system could improve: **faster decisions, fewer delays, clearer progress, and stronger ownership**.',
        bullets: [
          '**What this would measure:** Time to complete requests, fewer stalled requests, clearer handoffs between people, and overall satisfaction across roles.',
          '**What I learned:** In complex tools like this, clarity is the most important thing, and the system should handle the complexity so users don’t have to.',
        ],
        visuals: [],
        internshipBridge: '',
      },
      {
        caseStudySection: '07 · Walkthrough',
        title: 'Final walkthrough',
        summary:
          'This is a quick walkthrough of the final designs. I can move through the dashboard, detail view, team queue, or workflow screen depending on what’s most useful.',
        bullets: [],
        visuals: [
          { kind: 'image', src: '/flowops1.png', caption: 'Dashboard overview' },
          { kind: 'image', src: '/flowops2.png', caption: 'Request detail view' },
          { kind: 'image', src: '/flowops3.png', caption: 'Team queue' },
          { kind: 'image', src: '/flowops4.png', caption: 'Workflow view' },
          { kind: 'image', src: '/flowops-permission-matrix.png', caption: 'Permission matrix' },
          { kind: 'image', src: '/flowops-role-approver.png', caption: 'Approver dashboard' },
          { kind: 'image', src: '/flowops-role-agent.png', caption: 'Agent dashboard' },
          { kind: 'image', src: '/flowops-role-admin.png', caption: 'Admin dashboard' },
        ],
        internshipBridge: '',
      },
    ],
  },
]
