import { http } from "@/services/http";
import type { User } from "@/types/user";

export const userService = {
  async getCurrentUser() {
    return await http.request<User>("GET", "/me");
  },
  async verifyEmail(token: string) {
    return await http.request<null>("POST", "/user/verify-email", { token });
  },
  async resendVerificationEmail() {
    return await http.request<null>("POST", "/user/verify-email/resend");
  },
  async refreshVerificationToken(token: string) {
    return await http.request<null>("POST", "/user/refresh-verification-token", { token });
  },
};
