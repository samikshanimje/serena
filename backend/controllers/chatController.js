import Chat from "../models/Chat.js";
import Journal from "../models/Journal.js";
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
    // Get AI reply
    const journalContext = recentJournals
  .map(
    (j) =>
      `Title: ${j.title}
Mood: ${j.mood}
Summary: ${j.aiAnalysis?.summary || j.content}`
  )
  .join("\n\n");

const prompt = `
Previous Journal History:

${journalContext}

Current User Message:

${message}

Respond naturally while considering the user's previous journals whenever relevant.
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