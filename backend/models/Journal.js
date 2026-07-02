import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    mood: {
      type: String,
      default: "",
    },

    aiAnalysis: {
      emotion: String,
      stress: Number,
      gratitude: Number,
      confidence: Number,
      summary: String,
      recommendation: String,
      positiveMoments: [String],
      concerns: [String],
      positiveSignals: [String],
      recommendedActivity: String,
      reflection: String,
      wellnessTip: String,
      encouragement: String,
    },

    tags: {
      type: [String],
      default: [],
    },

    pinned: {
      type: Boolean,
      default: false,
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Journal", journalSchema);