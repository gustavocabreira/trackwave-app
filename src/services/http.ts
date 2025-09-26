import axios from "axios";
import router from "@/router";

export type ValidationErrors = Record<string, string[]>;
export type ApiResponse<T> = {ok: boolean, data: T | null, errors: ValidationErrors | null};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (err.response && err.response.status === 401) {
      await router.push({ name: "LoginIndex" });
    }

    return Promise.reject(err);
  }
);

export const http = {
  async request<T>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string, payload?: any): Promise<ApiResponse<T>> {
    try {
      const { data } = await client.request({method, url, data: payload});

      return {
        ok: true,
        data,
        errors: null,
      };
    } catch (error: any) {
      
      const errors = error?.response?.data ?? {
        message: error.message ?? "Unknown error",
        errors: {},
      };
      
      return { ok: false, data: null, errors };
    }
  },
};
