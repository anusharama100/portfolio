# Trace

A small research workspace that keeps observations, insights, and decisions connected. Designed and built by Anusha Ramachandran as an independent product and frontend engineering project.

[Try the workspace](https://www.anusharamachandran.com/lab/trace/) · [Read the design decisions](https://www.anusharamachandran.com/case-study/trace/)

## What works

- Create studies and capture observations with source labels and tags.
- Search, filter, sort, and select observations to form an insight. Switch between a compact log and card view without losing selection.
- Attach insights to a decision and record its rationale and an alternative.
- Accept a decision only when it has ready insights with supporting evidence.
- Flag an accepted decision when its linked evidence changes.
- Edit and delete records, update dependent links, and undo changes.
- Persist a workspace in IndexedDB and move it through validated JSON exports and imports. Export observations as CSV.

The initial study is fictional sample data. Work is saved in the current browser, with JSON export and import for portable backups. Export a copy before clearing site data.

## Code map

| File | Responsibility |
| --- | --- |
| `domain.ts` | Types, runtime validation, reference integrity, acceptance rules, review flags, search, deletion cleanup |
| `storage.ts` | IndexedDB transactions and portable file exports |
| `seed.ts` | Clearly marked, fictional sample study |
| `TraceApp.tsx` | Workspace state, forms, keyboard interactions, undo, storage feedback |
| `EvidenceLibrary.tsx` | Evidence log, card view, visible-record selection, source and connection metadata |
| `StudyOverview.tsx` | Study brief, record counts, decisions and actionable review filters |
| `TracePrimitives.tsx` | Native dialog wrapper, source links, status labels and record references |
| `trace.css` | Scoped desktop and mobile interface styles |
| `../../test/trace-domain.test.ts` | Data integrity, acceptance, import and deletion rules |
| `../../test/trace-app.test.tsx` | Selection, synthesis, review filters, acceptance and persistence feedback |

## Run locally

From the repository root, with Node 22 or newer:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000/lab/trace/`.

```sh
npm test -- test/trace-domain.test.ts test/trace-app.test.tsx
npm run build
```

The application is part of the portfolio's static Next.js export. Its domain and storage modules have no framework dependency.

## Decisions and limits

**Local storage first.** A visitor can edit real records immediately without account setup. The tradeoff is device-local data, no shared editing, and browser storage quotas. The UI shows save failures and offers an export rather than claiming a failed write succeeded.

**References, not copied summaries.** Insights point to observations, and decisions point to insights. Editing a source can therefore flag a previously accepted decision for review. This is a review prompt, not an automated assessment of research quality.

**Validate at the boundary.** Imports are treated as unknown data. Schema version, record limits, identifiers, dates, statuses, and cross-study references are checked before replacing the workspace. User text renders as plain React text. CSV exports escape quoted content and neutralize common spreadsheet formula prefixes.

**Recovery is part of the workflow.** Deletes update the graph; the last ten workspace snapshots support session undo. Export/import provides a portable backup. Undo is not durable audit history.

**Next step.** A shared service would need authentication, authorization, server-side validation, a database, and a conflict strategy. None of those are represented as completed work in this frontend build. Customer research and a structured usability study would come before any claim of improved decision quality or time saved.
