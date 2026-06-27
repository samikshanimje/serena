import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: false,
      default: "",
    },

    googleId: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    streak: {
      type: Number,
      default: 0,
    },

    moodScore: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);