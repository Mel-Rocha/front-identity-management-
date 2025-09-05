// src/services/api.js
import axios from 'axios'
import {getToken} from "@/services/auth.js";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;