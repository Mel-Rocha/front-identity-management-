// src/services/auth.js
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Armazenamento do token
export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

// Axios instance
// Axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para enviar token em todas requisições
axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Funções
export async function login(email, password) {
  const { data } = await axios.post(`${API_BASE_URL}/users/login-service/`, { email, password });
  if (data?.token) setToken(data.token);
  return data;
}

export async function recoverPassword(email) {
  const { data } = await axios.post(`${API_BASE_URL}/users/recover_password-service/`, { email });
  return data;
}

export async function register(username, email, password) {
  const { data } = await axios.post(`${API_BASE_URL}/users/signup-service/`, { username, email, password });
  return data;
}

// Função de logout
export function logout() {
  removeToken();
}
