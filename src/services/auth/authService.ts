import http from "@/services/http";
import type { ApiResponse } from "@/services/http";
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
}

export const authService = {
  async register(user: UserRegistration): Promise<ApiResponse<User>> {
    return await http.post("/auth/register", user);
  },
  async login(user: Login): Promise<ApiResponse<AccessToken>> {
      return await http.post("/auth/login", user);
  },
  async logout(): Promise<ApiResponse<null>> {
    return await http.post("/auth/logout");
  },
};
