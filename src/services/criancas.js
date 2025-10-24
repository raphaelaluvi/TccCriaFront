import { api } from './api';

export async function listarCriancasDoResponsavel(responsavelId) {
  try {
    const { data } = await api.get(`/responsaveis/${responsavelId}/criancas`);
    return data?.dados || [];
  } catch (err) {
    if (err?.response?.status === 404) return [];
    throw err;
  }
}

export async function cadastrarCrianca(payload) {
  const { data } = await api.post('/criancas/', payload);
  return data?.dados;
}

export async function deletarCrianca(id) {
  return api.delete(`/criancas/${id}`);
}

export async function atualizarCrianca(id, dados) {
  const { data } = await api.put(`/criancas/${id}`, dados);
  return data?.dados;
}

export async function buscarCrianca(id) {
  const { data } = await api.get(`/criancas/${id}`);
  return data;
}
