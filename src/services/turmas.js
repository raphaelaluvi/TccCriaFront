import { api } from './api';

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  if (params.escolaId) query.append('escola_id', params.escolaId);
  if (params.professorId) query.append('professor_id', params.professorId);
  return query.toString();
}

export async function listarTurmas(params = {}) {
  const query = buildQuery(params);
  const url = query ? `/turmas?${query}` : '/turmas';
  try {
    const { data } = await api.get(url);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    if (err?.response?.status === 404) return [];
    throw err;
  }
}

export async function buscarTurma(id) {
  const { data } = await api.get(`/turmas/${id}`);
  return data;
}

export async function listarCriancasDaTurma(id) {
  const { data } = await api.get(`/turmas/${id}/criancas`);
  return data?.criancas || [];
}

export async function criarTurma(payload) {
  const { data } = await api.post('/turmas/', payload);
  return data?.dados;
}

export async function atualizarTurma(id, payload) {
  const body = { ...payload };
  Object.keys(body).forEach((k) => {
    if (body[k] === '' || body[k] == null) delete body[k];
  });
  const { data } = await api.put(`/turmas/${id}`, body);
  return data?.dados;
}

export async function deletarTurma(id) {
  return api.delete(`/turmas/${id}`);
}

export async function adicionarProfessorNaTurma(turmaId, professorId) {
  return api.post(`/turmas/${turmaId}/adicionar_professor`, null, {
    params: { professor_id: professorId },
  });
}

export async function removerProfessorDaTurma(turmaId, professorId) {
  return api.post(`/turmas/${turmaId}/remover_professor`, null, {
    params: { professor_id: professorId },
  });
}

export async function adicionarCriancaNaTurma(turmaId, criancaId) {
  return api.post(`/turmas/${turmaId}/adicionar_crianca`, null, {
    params: { crianca_id: criancaId },
  });
}

export async function removerCriancaDaTurma(turmaId, criancaId) {
  return api.post(`/turmas/${turmaId}/remover_crianca`, null, {
    params: { crianca_id: criancaId },
  });
}
