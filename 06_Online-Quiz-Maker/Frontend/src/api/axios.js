import axios from "axios";

const api = axios.create({
  baseURL: "https://quizmaker-backend-dfpc.onrender.com/api",
  withCredentials: true,
});

export default api;
