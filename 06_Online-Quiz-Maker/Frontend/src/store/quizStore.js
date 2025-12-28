import api from "../api/axios.js";
import { create } from "zustand";

export  const useQuizStore = create((set) => ({
  quizzes: [],
  myQuizzes: [],
  currentQuiz: null,
  loading: false,
  error: null,

  // Public quizzes
  fetchQuizzes: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/quizzes");
      set({ quizzes: res.data.quizzes, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load quizzes",
        loading: false,
      });
    }
  },

  // Single quiz
  fetchQuizById: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await api.get(`/quizzes/${id}`);
      set({ currentQuiz: res.data.quiz, loading: false });
    } catch {
      set({ error: "Failed to load quiz", loading: false });
    }
  },

  // My quizzes
  fetchMyQuizzes: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/quizzes/my");
      set({ myQuizzes: res.data.quizzes, loading: false });
    } catch {
      set({ error: "Failed to load your quizzes", loading: false });
    }
  },

  // Create quiz
  createQuiz: async (quizData) => {
    try {
      set({ loading: true, error: null });
      await api.post("/quizzes", quizData);
      set({ loading: false });
    } catch {
      set({ error: "Failed to create quiz", loading: false });
    }
  },

  resetQuizState: () => {
    set({
      quizzes: [],
      myQuizzes: [],
      currentQuiz: null,
      error: null,
    });
  },
}));
