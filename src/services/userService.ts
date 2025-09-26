import { ApiResponse, http } from "@/services/http";
import type { User } from "@/types/user";

export const userService = {
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return await http.request<User>("GET", "/me");
  },
};
