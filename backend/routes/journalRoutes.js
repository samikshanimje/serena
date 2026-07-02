import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createJournal,
  getJournals,
  getLatestJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";

const router = express.Router();

router.post("/", authMiddleware, createJournal);
router.get("/latest", authMiddleware, getLatestJournal);
router.get("/", authMiddleware, getJournals);
router.put("/:id", authMiddleware, updateJournal);
router.delete("/:id", authMiddleware, deleteJournal);

export default router;