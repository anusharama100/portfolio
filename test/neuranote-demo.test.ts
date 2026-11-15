import { describe, expect, it } from 'vitest'
import { extractConcepts, summarizeNote, generateReviewQuestions, provideFeedback } from '../demos/neuranote/src/lib/openai'
import { projectResources } from '@/portfolio/components/projectResources'
import { existsSync } from 'node:fs'

describe('NeuraNote local demo', () => {
  it('links to the bundled application rather than a disabled placeholder', () => {
    expect(projectResources.neuranote.demo.href).toBe('/demos/neuranote/index.html#/dashboard')
    expect(existsSync('public/demos/neuranote/index.html')).toBe(true)
  })
  it('turns a note into concepts and recall prompts without a provider', async () => {
    const text = 'Memory improves through retrieval practice. Retrieval builds memory.'
    const concepts = await extractConcepts(text)
    expect(concepts.slice(0, 2)).toEqual(['memory', 'retrieval'])
    const questions = await generateReviewQuestions(concepts)
    expect(questions[0].concept).toBe('memory')
    expect((await generateReviewQuestions(concepts, [questions[0].question])).some(q => q.question === questions[0].question)).toBe(false)
    expect(await summarizeNote(text)).toContain('Memory improves')
    const feedback = await provideFeedback(questions[0].question, 'A made-up explanation', 'memory')
    expect(feedback.feedback).toContain('does not assess correctness')
  })
  it('handles blank notes without inventing concepts', async () => {
    expect(await extractConcepts('')).toEqual([])
    expect(await generateReviewQuestions([])).toEqual([])
    expect(await summarizeNote('')).toBe('')
  })
})
