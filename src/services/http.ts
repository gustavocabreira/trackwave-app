import axios from 'axios';
import router from '@/router';

import type { Error } from '@/types/error';

export type ApiSuccess<T> = {
  ok: true;
  data: T;
  error: null;
};

export type ApiError = {
  ok: false;
  data: null;
  errors: Error;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
});

client.interceptors.request.use(async (config) => {
  await axios.get(import.meta.env.VITE_API_URL + "/sanctum/csrf-cookie", {
    withCredentials: true,
    withXSRFToken: true,
  });

  return config;
});

client.interceptors.response.use(
  (response) => {
    return {
      ok: true,
      data: response.data,
      error: null,
    } as ApiResponse<any>;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      return router.push({ name: 'LoginIndex' });
    }

    const errors = err?.response?.data as Error;

    return { ok: false, data: null, errors } as ApiResponse<any>;
  }
);

export default client;