import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "https://quizmaker-backend-dfpc.onrender.com/api", //"http://localhost:5000/api",
=======
  baseURL: "https://quizmaker-backend-dfpc.onrender.com/api",
>>>>>>> 2627244c9b7167b082e6c49c4abe9fca988ece30
  withCredentials: true,
});

export default api;
