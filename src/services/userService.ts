import http from "@/services/http";
import type { Error } from "@/types/error";
import type { User } from "@/types/user";

export const authService = {
    async getCurrentUser(): Promise<{ok: boolean, data: User, error: Error}> {
        try {
            const { data } = await http.get("/me");
            return { ok: true, data };
        } catch (error) {
            const errors = error.response.data.errors as Error;

            return { ok: false, errors };
        }
    }
}