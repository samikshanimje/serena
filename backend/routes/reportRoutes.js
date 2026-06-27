import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateWeeklyReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/weekly", authMiddleware, generateWeeklyReport);

export default router;