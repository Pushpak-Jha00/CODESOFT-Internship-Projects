import api from "./axios.js";

// Get candidate applications
export const getMyApplications = async () => {
  const res = await api.get("/applications/my-applications");
  return res.data;
};

// Get dashboard summary (optional)
export const getApplicationSummary = async () => {
  const res = await api.get("/applications/summary");
  return res.data;
};
