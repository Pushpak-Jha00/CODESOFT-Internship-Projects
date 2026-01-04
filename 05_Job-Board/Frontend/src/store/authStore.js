import { create } from "zustand";
import api from "../api/axios.js";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  isLoading: false,

  register: async (data) => {
    set({ loading: true });
    try {
      await api.post("/auth/register", data);
      set({ loading: false });
      return true;
    } catch (error) {
      set({ loading: false });
      throw error.response.data.message;
    }
  },

  login: async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    set({
      token: res.data.token,
      user: res.data.user,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  loadUser: async () => {
  set({ isLoading: true });
  try {
    const res = await api.get("/auth/me");
    set({ user: res.data, isLoading: false });
  } catch {
    set({ user: null, token: null, isLoading: false });
  }
}
}));
