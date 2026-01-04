import express from "express";
import {
  applyForJob,
  getMyApplications,
  getJobApplications,
  getApplicationSummary,
} from "../controllers/application.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { isEmployer } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Candidate apply for job
router.post("/apply/:jobId", protect, upload.single("resume"), applyForJob);

// Candidate dashboard
router.get("/my-applications", protect, getMyApplications);

// Employer dashboard
router.get("/job/:jobId", protect, isEmployer, getJobApplications);

router.get("/summary", protect, getApplicationSummary);

export default router;
