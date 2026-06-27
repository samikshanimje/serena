import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

/* ---------------- CHAT ---------------- */

export async function generateChatResponse(userMessage) {
  const prompt = `
  You are Serena, an AI Mental Wellness Copilot.
  
  Rules:
  
  - Be warm and empathetic.
  - Never diagnose diseases.
  - Use the user's previous history if provided.
  - Notice emotional patterns.
  - Give personalized advice.
  - Explain WHY you are recommending something.
  
  IMPORTANT:
  
  If you notice a trend such as:
  - increasing stress
  - repeated placement anxiety
  - reduced motivation
  - burnout signs
  - recurring negative thoughts
  
  then proactively mention it.
  
  End every response with ONE small actionable step the user can do today.
  
  User Context:
  
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