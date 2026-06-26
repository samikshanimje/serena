import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

console.log("Gemini Key:", process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function generateResponse(userMessage) {
  const prompt = `
You are Serena, an AI mental wellness companion.

Rules:
- Be empathetic.
- Keep responses concise (100-150 words).
- Never diagnose diseases.
- Encourage healthy habits.
- Speak warmly and positively.

User:
${userMessage}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
