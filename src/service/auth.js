import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/users/login-service/', { email, password });
  return response.data;
};

export const register = async (payload) => {
  const response = await api.post('/users/register-service/', payload);
  return response.data;
};

export const recoverPassword = async (email) => {
  const response = await api.post('/users/recover-password-service/', { email });
  return response.data;
};
