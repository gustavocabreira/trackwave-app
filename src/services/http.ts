import axios from 'axios';
import router from '@/router';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return router.push({ name: 'LoginIndex' });
    }

    return Promise.reject(error);
  }
);

export default client;