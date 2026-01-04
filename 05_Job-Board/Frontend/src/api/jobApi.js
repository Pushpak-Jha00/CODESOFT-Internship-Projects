import api from "./axios";

export const fetchJobs = async (params = {}) => {
  const res = await api.get("/jobs", { params });
  return res.data;
};

export const fetchSingleJob = async (id) => {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
};

export const applyJob = async (jobId, formData) => {
  const res = await api.post(
    `/applications/apply/${jobId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};
