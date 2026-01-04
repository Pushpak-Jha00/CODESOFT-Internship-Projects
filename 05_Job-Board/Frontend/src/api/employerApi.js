import api from "./axios.js";

// Post a new job
export const postJob = async (data) => {
  const res = await api.post("/jobs", data);
  return res.data;
};

// Get employer jobs
export const getMyJobs = async () => {
  const res = await api.get("/jobs/my-jobs");
  console.log("res ", res);
  
  return res.data;
};

// Get applicants for a job
export const getApplicants = async (jobId) => {
  const res = await api.get(`/applications/job/${jobId}`);
  return res.data;
};
