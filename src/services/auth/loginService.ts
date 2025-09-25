import http from '@/services/http';
import axios from 'axios';

export type Login = {
    email: string,
    password: string,
}

export const loginService = {
    async login(user: Login) {
        try {
            await axios.get(import.meta.env.VITE_API_URL + '/sanctum/csrf-cookie', {
                withCredentials: true,
                withXSRFToken: true,
            })

            const { data } = await http.post('/auth/login', user);
            
            return { ok: true, data };
        } catch (error) {
            return { ok: false, error };
        }
    }
}