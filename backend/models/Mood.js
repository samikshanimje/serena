import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mood: {
      type: String,
      required: true,
      enum: [
        "Happy",
        "Calm",
        "Sad",
        "Angry",
        "Tired",
      ],
    },

    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Mood", moodSchema);