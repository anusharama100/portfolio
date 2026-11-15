'use client'

import { useState } from 'react'
import { sampleWorkspace } from '@/portfolio/trace/seed'
import { recordReference } from '@/portfolio/trace/TracePrimitives'

const sample = sampleWorkspace()
const examples = [
  {
    kind: 'evidence',
    label: 'Observation',
    record: sample.evidence[0]!,
    description:
      'The original note stays separate from the interpretation. It retains its source, tags, and timestamps.',
    rule: 'A source is required. Saving an observation does not automatically make it an insight.',
  },
  {
    kind: 'insights',
    label: 'Insight',
    record: sample.insights[0]!,
    description:
      'This finding connects three observations. The original records remain inspectable instead of being copied into a new summary.',
    rule: 'An insight can remain a draft. Marking it ready requires at least one supporting observation.',
  },
  {
    kind: 'decisions',
    label: 'Decision',
    record: sample.decisions[0]!,
    description:
      'The choice records why this direction was selected and what alternative was considered. Its supporting insight links back to the observations.',
    rule: 'Acceptance requires ready insights with evidence. Later edits to linked sources flag the decision for review.',
  },
] as const

function EvidenceFigure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption: string
}) {
  return (
    <figure className="refined-figure">
      <a href={src} target="_blank" rel="noreferrer">
        <img src={src} alt={alt} loading="lazy" />
      </a>
      <figcaption>
        {caption}
        <span aria-hidden="true">Open full size ↗</span>
      </figcaption>
    </figure>
  )
}

function ModelExample() {
  const [active, setActive] = useState(0)
  const item = examples[active]!
  const body =
    'body' in item.record
      ? item.record.body
      : 'summary' in item.record
        ? item.record.summary
        : item.record.rationale
  return (
    <div className="trace-case-model">
      <div
        className="trace-case-model-options"
        role="group"
        aria-label="Explore the Trace record model"
      >
        {examples.map((example, index) => (
          <button
            key={example.kind}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <small>0{index + 1}</small>
            <strong>{example.label}</strong>
            <span>{index < 2 ? '→' : '↗'}</span>
          </button>
        ))}
      </div>
      <div className="trace-case-model-detail" aria-live="polite">
        <div>
          <span className="trace-case-reference">
            {recordReference(item.kind, item.record.id)}
          </span>
          <h4>{item.record.title}</h4>
          <blockquote>{body}</blockquote>
          <span className="trace-case-sample">
            Fictional sample record from the working app.
          </span>
        </div>
        <div>
          <p>{item.description}</p>
          <strong>Implemented rule</strong>
          <p>{item.rule}</p>
        </div>
      </div>
    </div>
  )
}

export default function TraceCaseStudy() {
  return (
    <main className="refined-story trace-case-story">
      <section className="refined-chapter" id="trace-framing">
        <div className="refined-heading">
          <p className="refined-kicker">01 / Product framing</p>
          <h2>Keep the reasoning attached to the work.</h2>
          <p>
            A research note, an interpretation, and a product decision answer
            different questions. When they become disconnected, a polished
            recommendation can be hard to inspect: what was actually observed,
            what did someone infer, and why did the team choose this direction?
          </p>
        </div>
        <div className="refined-note">
          <strong>The brief I set</strong>
          <p>
            Build a small research workspace where someone can move from an
            observation to an insight to a decision, then follow that chain in
            either direction without losing the source.
          </p>
        </div>
        <dl className="refined-facts">
          <div>
            <dt>Intended user</dt>
            <dd>
              A designer or researcher synthesizing a small study and
              documenting a product choice.
            </dd>
          </div>
          <div>
            <dt>My ownership</dt>
            <dd>
              Problem framing, interaction and visual design, React
              implementation, data modeling, persistence, and verification.
            </dd>
          </div>
          <div>
            <dt>Project boundary</dt>
            <dd>
              An independent, single-user frontend build. The editable sample is
              fictional; no customer study or adoption outcome is claimed.
            </dd>
          </div>
        </dl>
        <div className="refined-two">
          <article>
            <h4>The core assumption</h4>
            <p>
              Someone should be able to inspect the evidence behind a decision
              without reconstructing the whole study. I treated that as a
              product hypothesis to build and test, rather than presenting it as
              an established research finding.
            </p>
          </article>
          <article>
            <h4>What I deliberately left out</h4>
            <p>
              Automatic synthesis, confidence scores, and team accounts would
              add complexity before the central workflow was dependable. I
              concentrated on connected records, clear review states, and
              recoverable editing.
            </p>
          </article>
        </div>
      </section>

      <section className="refined-chapter" id="trace-process">
        <div className="refined-heading">
          <p className="refined-kicker">02 / Structure before screens</p>
          <h3>Define what each record means before designing a dashboard.</h3>
          <p>
            I began with the information model and its failure cases. An
            observation preserves what was heard or seen; an insight explains
            what a set of observations suggests; a decision commits to a
            direction and records an alternative.
          </p>
        </div>
        <ol className="trace-case-process">
          <li>
            <span>Frame</span>
            <strong>Choose one complete task</strong>
            <p>
              Follow a finding from its original note to a documented decision.
            </p>
          </li>
          <li>
            <span>Model</span>
            <strong>Separate evidence from interpretation</strong>
            <p>
              Define record types, relationships, and the rules for changing
              state.
            </p>
          </li>
          <li>
            <span>Build</span>
            <strong>Make the connections inspectable</strong>
            <p>
              Implement editing, source navigation, persistence, and recovery.
            </p>
          </li>
          <li>
            <span>Verify</span>
            <strong>Test the failure paths</strong>
            <p>
              Change a source, remove a dependency, reload, and import invalid
              data.
            </p>
          </li>
        </ol>
        <ModelExample />
        <p>
          <strong>Why separate types?</strong> One large document would be
          simpler to build, but would make it difficult to tell whether a
          sentence was an observation, interpretation, or commitment. Separate
          records make that distinction visible and allow the app to check the
          relationships.
        </p>
        <p>
          <strong>Why references instead of copied text?</strong> Copying a
          quote into a finding creates a second version that can drift from its
          source. IDs keep the original record authoritative and let a decision
          detect when its supporting material has changed.
        </p>
      </section>

      <section className="refined-chapter" id="trace-iteration">
        <div className="refined-heading">
          <p className="refined-kicker">03 / Interface iteration</p>
          <h3>Turn a collection of cards into a working evidence library.</h3>
          <p>
            The first build made every observation a large card and led with
            expressive headings. During my own review, the interface made
            browsing easy but comparison slower: source information was
            scattered, controls had similar visual weight, and the page title
            did not match the navigation.
          </p>
        </div>
        <div className="trace-case-comparison">
          <EvidenceFigure
            src="/trace/trace-evidence-v1.jpg"
            alt="Initial Trace build with large cards, purple controls, and an expressive heading"
            caption="Initial build · A card-first layout with equal emphasis on every observation."
          />
          <EvidenceFigure
            src="/trace/trace-evidence.png"
            alt="Refined Trace evidence library with a compact log, source columns, connections, sorting, and list and card controls"
            caption="Refined build · A scannable evidence log with explicit source and connection information."
          />
        </div>
        <div className="trace-case-decisions">
          <article>
            <span>Hierarchy</span>
            <h4>Use the language of the task.</h4>
            <p>
              “Evidence library,” “Insights,” and “Decisions” now match the
              navigation. The heading identifies the current workspace;
              supporting copy explains the action instead of competing with it.
            </p>
          </article>
          <article>
            <span>Density</span>
            <h4>Offer a log and a reading view.</h4>
            <p>
              The default list aligns observations, sources, connections, and
              update dates. Card view remains available for reading longer
              excerpts. Switching views preserves selection and filters.
            </p>
          </article>
          <article>
            <span>Visual system</span>
            <h4>Give emphasis a specific job.</h4>
            <p>
              Neutral surfaces and borders organize the page. A restrained green
              identifies actions and reviewed states; amber identifies decisions
              that need attention. Metadata and controls follow one type scale
              and spacing system.
            </p>
          </article>
        </div>
        <p>
          This iteration made sources easier to compare and reduced the visual
          weight of secondary controls. The next validation step is a synthesis
          task with designers using their own research notes.
        </p>
      </section>

      <section className="refined-chapter" id="trace-workflow">
        <div className="refined-heading">
          <p className="refined-kicker">04 / The complete workflow</p>
          <h3>Make synthesis deliberate, without making it cumbersome.</h3>
          <p>
            A person can capture an observation with its source and tags, filter
            the library, and select several notes to create an insight. Those
            sources arrive preselected in the editor, so the connection is
            carried forward rather than recreated.
          </p>
        </div>
        <EvidenceFigure
          src="/trace/trace-insight.png"
          alt="Trace insight editor showing the interpretation, selected supporting observations, and explicit draft or ready status"
          caption="Create an insight · Selected observations remain attached while the interpretation is written."
        />
        <div className="refined-two">
          <article>
            <h4>A draft can be incomplete.</h4>
            <p>
              Early synthesis should not require a polished conclusion. A draft
              can be saved without sources, but marking an insight ready
              requires supporting evidence. A decision remains proposed until
              its linked insights are ready.
            </p>
          </article>
          <article>
            <h4>Ready is a review state, not a truth score.</h4>
            <p>
              The app checks that evidence is attached. It does not decide
              whether the interpretation is sound, whether the study is
              representative, or whether a choice is correct. Those judgments
              remain with the person reviewing the work.
            </p>
          </article>
        </div>
        <div className="refined-note">
          <strong>The interaction tradeoff</strong>
          <p>
            Automatic acceptance would reduce a click but hide a meaningful
            commitment. I kept acceptance explicit and put the original
            observations beside the decision so reviewing them is part of the
            flow.
          </p>
        </div>
      </section>

      <section className="refined-chapter" id="trace-review">
        <div className="refined-heading">
          <p className="refined-kicker">05 / A decision can become stale</p>
          <h3>Changing a source should reopen the question.</h3>
          <p>
            A decision stores when its evidence was last reviewed. If a linked
            observation, insight, or the decision itself changes afterward, the
            interface flags it for review. The record stays accepted, but the
            app makes the changed foundation visible.
          </p>
        </div>
        <EvidenceFigure
          src="/trace/trace-decision.png"
          alt="Trace decision inspector showing an alternative, a changed-evidence warning, supporting insights, and original observations"
          caption="Decision inspector · Review the rationale, alternative, and evidence in one place."
        />
        <div className="refined-two">
          <article>
            <h4>Preserve context while inspecting.</h4>
            <p>
              The side panel keeps the library visible behind the record. Source
              links lead from a decision to an insight to its original
              observation. Each record keeps a consistent reference code and
              update date.
            </p>
          </article>
          <article>
            <h4>Make removal a graph change.</h4>
            <p>
              Deleting evidence updates dependent links. If an insight loses its
              final observation, it returns to draft. A decision without
              supporting evidence returns to proposed. Undo restores the
              previous workspace, including its relationships.
            </p>
          </article>
        </div>
        <p>
          <strong>Why a flag rather than a confidence score?</strong> A changed
          timestamp is something the system can detect reliably. A numerical
          confidence score would imply an assessment of research quality that
          this application does not perform.
        </p>
      </section>

      <section className="refined-chapter" id="engineering">
        <div className="refined-heading">
          <p className="refined-kicker">06 / Engineering decisions</p>
          <h3>Keep data integrity outside the React view.</h3>
          <p>
            The domain layer owns validation, acceptance rules, dependency
            cleanup, and review flags. React handles interaction and
            presentation. IndexedDB persists a validated workspace through a
            separate storage module.
          </p>
        </div>
        <div className="trace-case-architecture">
          <div>
            <span>Interface</span>
            <strong>Views, forms, native dialogs</strong>
            <p>Selection, search, filters, and keyboard interactions.</p>
          </div>
          <span aria-hidden="true">↓</span>
          <div>
            <span>Domain</span>
            <strong>Typed records and explicit rules</strong>
            <p>References, allowed statuses, acceptance, and review checks.</p>
          </div>
          <span aria-hidden="true">↓</span>
          <div>
            <span>Storage</span>
            <strong>Validated workspace snapshots</strong>
            <p>IndexedDB transactions and portable JSON exports.</p>
          </div>
        </div>
        <div className="trace-case-engineering">
          <article>
            <h4>Local storage as an intentional boundary</h4>
            <p>
              A visitor can try real editing immediately without creating an
              account. IndexedDB saves structured records in the current
              browser. The tradeoff is device-local data and no simultaneous
              team editing; exports provide a portable backup.
            </p>
          </article>
          <article>
            <h4>Validate imports before replacement</h4>
            <p>
              An imported file is treated as unknown data. The app checks the
              schema version, record limits, dates, IDs, allowed statuses, and
              relationships within each study. Only a valid file can reach the
              replacement confirmation.
            </p>
          </article>
          <article>
            <h4>Keep a failed save visible</h4>
            <p>
              The UI distinguishes saving, saved, and failed states. If storage
              fails, the current work stays on screen with retry and export
              actions. A failed initial read offers a temporary session rather
              than overwriting the saved workspace.
            </p>
          </article>
          <article>
            <h4>Use native behavior where it helps</h4>
            <p>
              Native dialogs provide keyboard focus handling and Escape
              behavior. Labeled controls, visible focus states, a study-scoped
              search shortcut, and responsive navigation support the same data
              model across devices.
            </p>
          </article>
        </div>
        <div className="trace-case-mobile">
          <EvidenceFigure
            src="/trace/trace-mobile.png"
            alt="Trace mobile evidence library with responsive controls and readable observation rows"
            caption="Mobile layout · The evidence and editing workflow remain available on a narrow screen."
          />
          <div>
            <p className="refined-kicker">Responsive design</p>
            <h4>Reflow the task, not just the sidebar.</h4>
            <p>
              On small screens, source and connection information move below the
              observation. Filters wrap into separate rows, navigation opens on
              demand, and the detail panel uses the full width.
            </p>
            <p>
              The record structure, validation rules, and stored workspace stay
              the same. Mobile is another way to perform the task, not a
              separate static mockup.
            </p>
          </div>
        </div>
        <p className="trace-case-code-links">
          <a
            href="https://github.com/anusharama100/portfolio/tree/main/portfolio/trace"
            target="_blank"
            rel="noreferrer"
          >
            Inspect the application source ↗
          </a>
          <a
            href="https://github.com/anusharama100/portfolio/blob/main/test/trace-domain.test.ts"
            target="_blank"
            rel="noreferrer"
          >
            Inspect the domain tests ↗
          </a>
        </p>
      </section>

      <section className="refined-chapter" id="trace-validation">
        <div className="refined-heading">
          <p className="refined-kicker">07 / Verification &amp; next steps</p>
          <h3>Check the whole task, including the ways it can fail.</h3>
          <p>
            I verified the implemented workflow through automated checks and
            browser use. The important question was whether relationships and
            recovery stayed correct after editing, deleting, importing, and
            reloading—not only whether the initial screen looked complete.
          </p>
        </div>
        <div
          className="trace-case-verification"
          role="region"
          aria-label="Trace verification coverage"
        >
          <table>
            <caption>
              Implemented behavior and the failure each check addresses.
            </caption>
            <thead>
              <tr>
                <th scope="col">Scenario</th>
                <th scope="col">Expected behavior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Accept an unsupported decision</th>
                <td>
                  Block acceptance and explain which supporting evidence is
                  needed.
                </td>
              </tr>
              <tr>
                <th scope="row">Edit a linked source</th>
                <td>
                  Flag the accepted decision for review while keeping its
                  evidence trail intact.
                </td>
              </tr>
              <tr>
                <th scope="row">Delete and undo</th>
                <td>
                  Update dependent records, then restore the prior graph through
                  undo.
                </td>
              </tr>
              <tr>
                <th scope="row">Reload after editing</th>
                <td>Recover the saved workspace from IndexedDB.</td>
              </tr>
              <tr>
                <th scope="row">Import invalid or cross-study references</th>
                <td>Reject the file before replacing saved work.</td>
              </tr>
              <tr>
                <th scope="row">Filter, sort, and switch views</th>
                <td>
                  Change the presentation while preserving the selected records
                  and underlying data.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="refined-note">
          <strong>Working result</strong>
          <p>
            A deployed research workspace with editable records, inspectable
            source relationships, review tracking, persistence, and recovery.
            The public demo and source are available at the top of this case
            study.
          </p>
        </div>
        <div className="refined-two">
          <article>
            <h4>Next product validation</h4>
            <p>
              Observe designers completing a synthesis task with their own
              notes. Check whether they understand the three record types, can
              trace a decision to its sources, and notice when a decision needs
              review. That study would determine whether the structure helps in
              real work.
            </p>
          </article>
          <article>
            <h4>Next engineering boundary</h4>
            <p>
              A shared service would need authentication, authorization,
              server-side validation, a database, and a strategy for conflicting
              edits. I would establish that collaboration model before
              presenting this local application as a team product.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
