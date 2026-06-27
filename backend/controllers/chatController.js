import Chat from "../models/Chat.js";
import Journal from "../models/Journal.js";
import Mood from "../models/Mood.js";
import {
  generateChatResponse,
  detectRisk,
} from "../services/geminiService.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const risk = await detectRisk(message);

    // Save user's message
    await Chat.create({
      user: req.user.id,
      role: "user",
      message,
    });
    const recentJournals = await Journal.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);


      const recentMoods = await Mood.find({
        user: req.user.id,
      })
      .sort({ createdAt: -1 })
      .limit(10);

      const recentChats = await Chat.find({
        user: req.user.id,
      })
      .sort({ createdAt: -1 })
      .limit(8);


    // Get AI reply
    const journalContext = recentJournals
  .map(
    (j) =>
      `Title: ${j.title}
Mood: ${j.mood}
Summary: ${j.aiAnalysis?.summary || j.content}`
  )
  .join("\n\n");


  const moodContext = recentMoods
  .map(
    (m) =>
      `${m.createdAt.toDateString()} - Mood: ${m.mood}${
        m.note ? ` | Note: ${m.note}` : ""
      }`
  )
  .join("\n");

  const chatContext = recentChats
  .reverse()
  .map((c) => `${c.role}: ${c.message}`)
  .join("\n");

  const prompt = `
  You are Serena, a personalized AI wellness companion.
  
  The following information belongs to the same user.
  
  ========== MOOD HISTORY ==========
  ${moodContext}
  
  ========== JOURNAL HISTORY ==========
  ${journalContext}
  
  ========== RECENT CONVERSATIONS ==========
  ${chatContext}
  
  ========== CURRENT MESSAGE ==========
  ${message}
  
  Instructions:
  
  - Use the user's history naturally.
  - Don't repeat old information unless relevant.
  - If you notice patterns, mention them.
  - Explain WHY you're giving a recommendation.
  - Be warm and conversational.
  `;
  if (risk.risk === "high") {
    return res.json({
      success: true,
      emergency: true,
      reply:
        "I'm really sorry you're going through such a difficult time. You don't have to face it alone. Please consider reaching out to someone you trust, such as a close friend, family member, or a qualified mental health professional. I'm here to listen, but I can't provide the help that a trained person can in a crisis.",
      risk,
    });
  }
const aiReply = await generateChatResponse(prompt);

    // Save AI reply
    await Chat.create({
      user: req.user.id,
      role: "assistant",
      message: aiReply,
    });

    res.json({
      success: true,
      reply: aiReply,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user.id,
    }).sort({
      createdAt: 1,
    });

    res.json({
      success: true,
      chats,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};