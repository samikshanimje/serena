import Journal from "../models/Journal.js";
import Mood from "../models/Mood.js";
import { analyzeWeeklyReportWithAI } from "../services/geminiService.js";

export const generateWeeklyReport = async (req, res) => {
  try {
    const journals = await Journal.find({
      user: req.user.id,
    }).sort({ createdAt: -1 }).limit(10);

    const moods = await Mood.find({
      user: req.user.id,
    }).sort({ createdAt: -1 }).limit(10);

    const journalText = journals
      .map(j => `${j.title}\n${j.content}`)
      .join("\n\n");

    const moodText = moods
      .map(m => `${m.mood} (${new Date(m.createdAt).toDateString()})`)
      .join("\n");

    const report = await analyzeWeeklyReportWithAI(moodText, journalText);

    res.json({
      success: true,
      report,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};