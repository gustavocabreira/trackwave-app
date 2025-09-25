import http from '@/services/http';

export type UserRegistration = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export const registerService = {
    async register(user: UserRegistration) {
        try {
            const { data } = await http.post('/auth/register', user);
            return { ok: true, data };
        } catch (error) {
            return { ok: false, error };
        }
    }
}