import Mood from "../models/Mood.js";

export const addMood = async (req, res) => {
  try {
    const { mood, note } = req.body;

    const newMood = await Mood.create({
      user: req.user.id,
      mood,
      note,
    });

    res.status(201).json({
      success: true,
      mood: newMood,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      moods,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getLatestMood = async (req, res) => {
  try {
    const mood = await Mood.findOne({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      mood,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteMood = async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Mood deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};