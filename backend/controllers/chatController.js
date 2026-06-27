import Chat from "../models/Chat.js";
import Journal from "../models/Journal.js";
import Mood from "../models/Mood.js";
import { generateChatResponse } from "../services/geminiService.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

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

  const prompt = `
  User Mood History:
  
  ${moodContext}
  
  User Journal History:
  
  ${journalContext}
  
  Current User Message:
  
  ${message}
  
  Answer naturally.
  
  Use BOTH the mood history and journal history whenever relevant.
  
  If you make recommendations, explain WHY based on the user's history.
  `;

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