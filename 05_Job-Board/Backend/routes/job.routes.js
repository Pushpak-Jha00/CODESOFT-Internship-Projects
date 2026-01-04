import express from "express";
import {
  createJob,
  getAllJobs,
  getMyJobs,
  getSingleJob
} from "../controllers/job.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { isEmployer } from "../middleware/role.middleware.js";


const router = express.Router();

// Employer routes (FIRST)
router.get("/my-jobs", protect, isEmployer, getMyJobs);

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);

// Employer posts job
router.post("/", protect, isEmployer, createJob);


export default router;
