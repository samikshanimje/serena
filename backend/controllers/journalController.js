import Journal from "../models/Journal.js";

export const createJournal = async (req, res) => {
  try {
    const journal = await Journal.create({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
      mood: req.body.mood,
    });

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