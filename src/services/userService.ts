import { ApiResponse, http } from "@/services/http";
import type { User } from "@/types/user";

export const userService = {
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return await http.request<User>("GET", "/me");
  },
  async verifyEmail(token: string): Promise<ApiResponse<null>> {
    return await http.request<null>("POST", "/user/verify-email", { token });
  },
  async resendVerificationEmail(): Promise<ApiResponse<null>> {
    return await http.request<null>("POST", "/user/verify-email/resend");
  },
  async refreshVerificationToken(token: string): Promise<ApiResponse<null>> {
    return await http.request<null>("POST", "/user/refresh-verification-token", { token });
  },
};
