import axios from "axios";

const api = axios.create({
  baseURL: "https://quizmaker-backend-dfpc.onrender.com/api", //"http://localhost:5000/api",
  withCredentials: true,
});

export default api;
