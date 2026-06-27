import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authMiddleware from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
console.log(process.env.MONGO_URI);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({
      success: true,
      message: "Welcome to Serena 🌸",
      user: req.user,
    });
  });
app.use("/api/moods", moodRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/reports", reportRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🌸 Serena Backend Running",
  });
});





const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});