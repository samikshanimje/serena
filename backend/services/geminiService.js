import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

/* ---------------- CHAT ---------------- */

export async function generateChatResponse(userMessage) {
  const prompt = `
  You are Serena, an AI mental wellness companion.
  
  Rules:
  
  - Be empathetic.
  - Never diagnose diseases.
  - Encourage healthy habits.
  - Keep responses under 180 words.
  - If previous journal history is provided, use it.
  - If you make a recommendation, ALWAYS explain WHY.
  
  Format:
  
  💜 Response
  
  ...
  
  💡 Why I'm suggesting this
  
  - Reason 1
  - Reason 2
  - Reason 3 (if available)
  
  Current Context:
  
  ${userMessage}
  `;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

/* ---------------- JOURNAL ANALYSIS ---------------- */

export async function analyzeJournalWithAI(title, content) {
  const prompt = `
You are an AI journal analysis engine.

Analyze this journal.

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

Title:
${title}

Journal:
${content}
`;

  const result = await model.generateContent(prompt);

  const text = result.response
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
}