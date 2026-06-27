import express from "express";

import {
  addMood,
  deleteMood,
  getLatestMood,
  getMoods,
} from "../controllers/moodController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addMood);

router.get("/", authMiddleware, getMoods);

router.get("/latest", authMiddleware, getLatestMood);

router.delete("/:id", authMiddleware, deleteMood);

export default router;