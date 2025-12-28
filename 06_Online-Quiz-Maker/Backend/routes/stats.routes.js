import express from "express";
import { getPlatformStats } from "../controllers/stats.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPlatformStats);

export default router;
