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

export const getLatestJournal = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      journal,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, mood, tags, pinned, favorite } = req.body;

    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    if (journal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const needsReanalysis = 
      (title !== undefined && title !== journal.title) || 
      (content !== undefined && content !== journal.content);

    if (title !== undefined) journal.title = title;
    if (content !== undefined) journal.content = content;
    if (mood !== undefined) journal.mood = mood;
    if (tags !== undefined) journal.tags = tags;
    if (pinned !== undefined) journal.pinned = pinned;
    if (favorite !== undefined) journal.favorite = favorite;

    if (needsReanalysis) {
      try {
        const analysis = await analyzeJournalWithAI(journal.title, journal.content);
        journal.aiAnalysis = analysis;
      } catch (aiError) {
        console.log("AI Re-analysis Failed:", aiError.message);
      }
    }

    await journal.save();

    res.json({
      success: true,
      journal,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;

    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    if (journal.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Journal.deleteOne({ _id: id });

    res.json({
      success: true,
      message: "Journal entry deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};