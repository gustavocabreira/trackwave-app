import { http } from "@/services/http";
import type { ApiResponse } from "@/services/http";
import axios from "axios";
import type { User } from "@/types/user";

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

export type AccessToken = {
  access_token: string;
};

export const authService = {
  async register(user: UserRegistration): Promise<ApiResponse<User>> {
    await axios.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie", {
      withCredentials: true,
      withXSRFToken: true,
    });

    return await http.request<User>("POST", "/auth/register", user);
  },
  async login(user: Login): Promise<ApiResponse<AccessToken>> {
    await axios.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie", {
      withCredentials: true,
      withXSRFToken: true,
    });

    return await http.request<AccessToken>("POST", "/auth/login", user);
  },
  async logout(): Promise<ApiResponse<null>> {
    return await http.request<null>("POST", "/auth/logout");
  },
  async loginWithGoogle(): Promise<{ data: { access_token: string } }> {
    return new Promise((resolve, reject) => {
      const popup = window.open(`${import.meta.env.VITE_API_URL}/api/auth/google`, 'google-login', 'width=500,height=600');

      const handle = (event: MessageEvent) => {
        if (event.origin !== import.meta.env.VITE_API_URL) {
          return;
        }

        window.removeEventListener('message', handle);
        popup?.close();

        if (event.data.error) {
          reject(new Error(event.data.error));
        } else if (event.data.token) {
          resolve({ data: {
              access_token: event.data.token 
            }
          })
        }
      };

      window.addEventListener('message', handle);

      const interval = setInterval(() => {
        if (popup?.closed) {
          clearInterval(interval);
          window.removeEventListener('message', handle);
          reject(new Error('The window was closed.'));
        }
      }, 500);
    })

  }
};