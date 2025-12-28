import { create } from "zustand";
import api from "../api/axios.js";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true, // ✅ IMPORTANT: start as true

  login: async (data) => {
    set({ loading: true });
    const res = await api.post("/auth/login", data);
    set({ user: res.data.user, loading: false });
  },

  register: async (data) => {
    set({ loading: true });
    const res = await api.post("/auth/register", data);
    set({ user: res.data.user, loading: false });
  },

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null, loading: false });
  },
}));
