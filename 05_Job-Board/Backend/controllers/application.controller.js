import Application from "../models/Application.js";
import Job from "../models/Job.js";

// APPLY FOR JOB (Candidate)
export const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user.id
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied for this job"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required"
      });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user.id,
      resume: req.file.path
    });

    res.status(201).json({
      message: "Job applied successfully",
      application
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANDIDATE: MY APPLICATIONS
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id
    })
      .populate("job", "title company location")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EMPLOYER: JOB APPLICATIONS
export const getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // ✅ Check job ownership
    const job = await Job.findOne({
      _id: jobId,
      createdBy: req.user.id
    });

    if (!job) {
      return res.status(403).json({
        message: "Not authorized to view applications"
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate("candidate", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// CANDIDATE DASHBOARD SUMMARY
export const getApplicationSummary = async (req, res) => {
  try {
    const total = await Application.countDocuments({
      candidate: req.user.id
    });

    res.json({
      totalApplications: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

