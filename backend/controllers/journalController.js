import Journal from "../models/Journal.js";


import { analyzeJournalWithAI } from "../services/geminiService.js";

export const createJournal = async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    // Save journal first
    const journal = await Journal.create({
      user: req.user.id,
      title,
      content,
      mood,
    });

    // Generate AI insights
    try {
      const analysis = await analyzeJournalWithAI(title, content);

      journal.aiAnalysis = analysis;

      await journal.save();
    } catch (aiError) {
      console.log("AI Analysis Failed:", aiError.message);
    }

    res.status(201).json({
      success: true,
      journal,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      journals,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};