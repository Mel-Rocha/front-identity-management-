import api from './api' // a instância axios com interceptor de token

/**
 * Busca opções de escolha do backend.
 * @param {string} type - tipo da escolha: 'currency', 'language', 'timezone', 'country'
 * @returns {Promise<Array>} lista de opções
 */
export async function fetchChoices(type) {
  try {
    const response = await api.get('/users/choices/', {
      params: { type }
    });
    return response.data; // o backend deve retornar um array de valores
  } catch (err) {
    console.error(`Erro ao buscar choices para ${type}:`, err);
    return [];
  }
}
