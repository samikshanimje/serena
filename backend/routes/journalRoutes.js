import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createJournal,
  getJournals,
  getLatestJournal,
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/", authMiddleware, createJournal);
router.get("/latest", authMiddleware, getLatestJournal);

router.get("/", authMiddleware, getJournals);

export default router;