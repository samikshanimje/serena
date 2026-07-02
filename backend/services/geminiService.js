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

Return ONLY valid JSON matching this schema exactly. Do not include markdown code block syntax (like \`\`\`json) in your response, just return the plain JSON object.

Schema:
{
  "emotion": "detected emotion",
  "stress": 0, // rating from 0 to 10
  "gratitude": 0, // rating from 0 to 10
  "confidence": 0, // rating from 0 to 10
  "summary": "one-sentence description of the user's focus",
  "recommendation": "existing recommendations",
  "positiveMoments": ["moment 1", "moment 2"],
  "concerns": ["concern 1", "concern 2"],
  "positiveSignals": ["positive sign 1", "positive sign 2"],
  "recommendedActivity": "what the user should do right now",
  "reflection": "a deep reflection prompt or self-discovery question",
  "wellnessTip": "a physical or mental wellness tip based on the text",
  "encouragement": "a warm and motivating sentence"
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

export async function generateChatTitle(firstMessage) {
  const prompt = `
Generate a very short conversation title (3-6 words).

Only return the title.

Message:

${firstMessage}
`;

  const result = await model.generateContent(prompt);

  return result.response.text().trim();
}

export async function detectRisk(message) {
  const prompt = `
Analyze the following message.

Return ONLY JSON.

{
  "risk":"low",
  "reason":""
}

Risk levels:
- low
- medium
- high

Message:

${message}
`;

  const result = await model.generateContent(prompt);

  const text = result.response
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
}

export async function analyzeWeeklyReportWithAI(moodText, journalText) {
  const prompt = `
You are an AI wellness weekly report generator.

Based on the user's weekly mood check-ins and journal logs, compile a structured wellness report.

Return ONLY valid JSON matching this schema exactly. Do not include markdown code block tags in your response.

Schema:
{
  "moodSummary": "a paragraph summarizing the user's emotional state, streaks, and fluctuations",
  "journalSummary": "a paragraph tracing key themes, thoughts, and cognitive states from their writing",
  "achievements": ["milestone 1", "milestone 2"],
  "stressTriggers": ["trigger 1", "trigger 2"],
  "positiveHabits": ["habit 1", "habit 2"],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "actionPlan": "a short paragraph setting out concrete actions they should focus on next week"
}

Mood History:
${moodText}

Journal History:
${journalText}
`;

  const result = await model.generateContent(prompt);

  const text = result.response
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
}