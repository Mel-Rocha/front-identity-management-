// src/services/auth.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email, password) {
  const response = await axios.post(`${API_BASE_URL}/users/login-service/`, { email, password });
  return response.data; // aqui você pode devolver o token, usuário, etc.
}

export const recoverPassword = async (email) => {
  const { data } = await axios.post(`${API_BASE_URL}/users/recover_password-service/`, { email })
  return data
}


export const register = async (username, email, password) => {
  const res = await axios.post(`${API_BASE_URL}/users/signup-service/`, { username, email, password })
  return res.data
}