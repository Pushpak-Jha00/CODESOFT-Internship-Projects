import Job from "../models/Job.js";

// CREATE JOB (Employer)
export const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, salary, description } = req.body;

    if (!title || !company || !location || !jobType || !description) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      salary,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Job posted successfully",
      job
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    res.status(500).json({ message: "Failed to post job" });
  }
};


// GET ALL JOBS WITH SEARCH & FILTER
export const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, jobType } = req.query;

    let query = {};

    // Search by title or company
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } }
      ];
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by job type
    if (jobType) {
      query.jobType = jobType;
    }

    const jobs = await Job.find(query)
      .populate("createdBy", "name companyName")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE JOB
export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("createdBy", "name companyName");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EMPLOYER DASHBOARD - MY JOBS
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      createdBy: req.user.id   // ✅ FIXED
    });

    res.json(jobs);
  } catch (error) {
    console.error("GET MY JOBS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch employer jobs"
    });
  }
};

