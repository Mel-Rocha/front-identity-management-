import api from './api'

export async function fetchMe() {
  const response = await api.get('/users/me/')
  return response.data
}


export async function updateUser(payload) {
  // payload: { email, first_name, last_name, phone_number, ... }
  const { data } = await api.put('/users/user-update-service/', payload)
  return data
}