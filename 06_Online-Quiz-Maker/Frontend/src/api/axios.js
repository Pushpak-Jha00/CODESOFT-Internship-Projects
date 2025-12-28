import axios from "axios";

const api = axios.create({
  baseURL: "https://quizmaker-backend-nkk4.onrender.com/api",
  withCredentials: true,
});

export default api;
