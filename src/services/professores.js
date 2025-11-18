import { api } from './api';

export async function listarProfessoresDaEscola(escolaId) {
  const { data } = await api.get(`/escolas/${escolaId}/professores`);
  return data?.dados || [];
}

export async function cadastrarProfessor(payload) {
  const body = { ...payload };
  const { data } = await api.post('/professores/', body);
  return data?.dados;
}

export async function atualizarProfessor(id, payload) {
  const body = { ...payload };
  Object.keys(body).forEach((key) => {
    if (body[key] === '' || body[key] == null) delete body[key];
  });
  const { data } = await api.put(`/professores/${id}`, body);
  return data?.dados;
}

export async function deletarProfessor(id) {
  return api.delete(`/professores/${id}`);
}

export async function listarTurmasDoProfessor(id) {
  try {
    const { data } = await api.get(`/professores/${id}/turmas`);
    return data?.turmas || [];
  } catch (err) {
    if (err?.response?.status === 404) return [];
    throw err;
  }
}
