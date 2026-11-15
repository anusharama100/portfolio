// Offline portfolio demo helpers. No provider requests or API credentials.
const words = (text: string) => text.toLowerCase().match(/[a-z][a-z-]{3,}/g) ?? [];
const stopWords = new Set("about after again also because been before being between both could does each from have into just more most note notes only other over same some such than that their them then there these they this those through very what when where which while will with would your learning".split(" "));

export async function extractConcepts(content: string): Promise<string[]> {
  const counts = new Map<string, number>();
  for (const word of words(content)) {
    if (!stopWords.has(word)) counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([word]) => word);
}

export async function summarizeNote(content: string): Promise<string> {
  const sentences = content.trim().match(/[^.!?]+[.!?]*/g) ?? [content];
  return sentences.slice(0, 3).join(" ").trim().split(/\s+/).slice(0, 100).join(" ");
}

export async function generateReviewQuestions(concepts: string[], previousQuestions: string[] = []) {
  return concepts.map(concept => ({
    question: `How would you explain "${concept}" in your own words?`,
    concept,
    hint: `Describe ${concept}, give an example, and connect it to another idea in your notes.`,
  })).filter(item => !previousQuestions.includes(item.question)).slice(0, 3);
}

export async function provideFeedback(_question: string, answer: string, concept: string): Promise<{
  feedback: string; understanding: "strong" | "developing" | "needs_work"; suggestions: string[];
}> {
  return {
    feedback: `Reflection saved for this session. Compare your explanation of ${concept} with your notes; this demo does not assess correctness.`,
    understanding: "developing",
    suggestions: [answer.trim().split(/\s+/).length < 20 ? "Try adding a concrete example." : "Check your example against the original note.", "Explain how this relates to another concept."],
  };
}

export async function generateInsights(concepts: {name: string; strength: number; lastReviewed: string}[], reflections: string[] = []) {
  return {
    summary: `You have ${concepts.length} concepts and ${reflections.length} saved reflections to revisit. These are demo suggestions, not a measurement of understanding.`,
    strengths: ["Capturing ideas in notes", "Making time to reflect"],
    focusAreas: concepts.slice(0, 2).map(item => `Revisit ${item.name} with an example`),
    encouragement: "Choose one idea and explain it without looking at your notes.",
  };
}

export async function suggestConnections(concepts: string[]) {
  return concepts.slice(0, -1).map((from, i) => ({
    from, to: concepts[i + 1],
    explanation: `Study prompt: how might ${from} relate to ${concepts[i + 1]}? Check the relationship in your notes.`,
  }));
}

export async function generateExplanationPrompt(concept: string): Promise<string> {
  return `How would you teach ${concept} to someone new to the subject? Include one example from your notes.`;
}
