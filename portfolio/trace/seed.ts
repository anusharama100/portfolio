import { validateWorkspace, type Workspace } from './domain'
export function sampleWorkspace(): Workspace {
  const at = '2026-11-01T10:00:00.000Z'
  const observed = [
    ['e1', 'The first action needs an explanation', 'I can see the create button, but I do not know what I need before I use it.', 'Sample session 01', ['Comprehension', 'Getting started']],
    ['e2', 'Requirements appear too late', 'I only learned about the setup requirements after opening the form.', 'Sample session 02', ['Comprehension']],
    ['e3', 'People want to try before committing', 'I would rather see an example before choosing a plan.', 'Sample session 03', ['Trust', 'Getting started']],
    ['e4', 'Help is hard to find in context', 'I opened the documentation in another tab and lost track of where I was.', 'Sample session 02', ['Navigation']],
    ['e5', 'A status needs a next step', 'It says pending. Should I wait or do something else?', 'Sample session 04', ['Feedback']],
    ['e6', 'Unclear recovery after an interruption', 'I want to know whether my work was saved before I try again.', 'Sample session 05', ['Trust', 'Feedback']],
    ['e7', 'The summary helps orientation', 'A short overview makes it easier to decide where to start.', 'Sample session 01', ['Navigation']],
    ['e8', 'Repeated setup feels avoidable', 'I had to choose the same options again after going back.', 'Sample session 06', ['Getting started']],
  ] as const
  return validateWorkspace({
    version: 1, updatedAt: at,
    studies: [{ id: 'study-sample', title: 'Getting started', description: 'Illustrative onboarding research. All observations are fictional sample data for exploring Trace.', createdAt: at }],
    evidence: observed.map(([id, title, body, source, tags]) => ({ id, studyId: 'study-sample', title, body, source, tags: [...tags], createdAt: at, updatedAt: at })),
    insights: [
      { id: 'i1', studyId: 'study-sample', title: 'Explain the commitment before asking for action', summary: 'The sample observations connect unclear requirements with hesitation at the first action.', evidenceIds: ['e1', 'e2', 'e3'], status: 'ready', createdAt: at, updatedAt: at },
      { id: 'i2', studyId: 'study-sample', title: 'Recovery needs to preserve confidence', summary: 'Status and interruption messages need a clear next step and an explanation of what was saved.', evidenceIds: ['e5', 'e6'], status: 'draft', createdAt: at, updatedAt: at },
      { id: 'i3', studyId: 'study-sample', title: 'Keep help near the task', summary: 'The sample sessions suggest making a short explanation available without leaving the current task.', evidenceIds: ['e4', 'e7'], status: 'ready', createdAt: at, updatedAt: at },
    ],
    decisions: [
      { id: 'd1', studyId: 'study-sample', title: 'Put requirements beside the first action', rationale: 'A short explanation before the form lets someone judge readiness without starting and abandoning setup.', alternative: 'A full tutorial would add another step before people can try the product.', insightIds: ['i1'], status: 'accepted', reviewedAt: at, createdAt: at, updatedAt: at },
      { id: 'd2', studyId: 'study-sample', title: 'Offer contextual help in the workspace', rationale: 'Keep the task and its explanation together. Use a nearby link for deeper documentation.', alternative: 'Sending everyone to an external help center interrupts the task.', insightIds: ['i3'], status: 'proposed', createdAt: at, updatedAt: at },
    ],
  })
}
