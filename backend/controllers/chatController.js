import Chat from "../models/Chat.js";
import { generateResponse } from "../services/geminiService.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Save user's message
    await Chat.create({
      user: req.user.id,
      role: "user",
      message,
    });

    // Get AI reply
    const aiReply = await generateResponse(message);

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