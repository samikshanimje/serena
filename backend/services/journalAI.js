import { generateResponse } from "./geminiService.js";

export async function analyzeJournal(title, content) {
  const prompt = `
You are an AI wellness assistant.

Analyze the journal below.

Return ONLY valid JSON.

Schema:

{
  "emotion":"",
  "stress":0,
  "gratitude":0,
  "confidence":0,
  "summary":"",
  "recommendation":"",
  "positiveMoments":[],
  "concerns":[]
}

Journal Title:
${title}

Journal:
${content}
`;

  const response = await generateResponse(prompt);

  return JSON.parse(response);
}