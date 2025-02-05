import axios from 'axios';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    ...(API_SECRET_KEY ? { 'x-api-key': API_SECRET_KEY } : {}),
  },
});

export default axiosInstance;
