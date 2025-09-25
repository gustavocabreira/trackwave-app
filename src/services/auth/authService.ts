import http from "@/services/http";
import axios from "axios";

export type UserRegistration = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type Login = {
  email: string;
  password: string;
};

export const authService = {
  async register(user: UserRegistration) {
    try {
      const { data } = await http.post("/auth/register", user);
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error };
    }
  },
  async login(user: Login) {
    try {
      await axios.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
      });

      const { data } = await http.post("/auth/login", user);

      return { ok: true, data };
    } catch (error) {
      return { ok: false, error };
    }
  },
  async logout() {
    try {
      await axios.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie", {
        withCredentials: true,
        withXSRFToken: true,
      });

      const { data } = await http.post("/auth/logout");

      return { ok: true, data };
    } catch (error) {
      return { ok: false, error };
    }
  },
};
