import { api } from './api';

export async function getProgressoGeral(criancaId) {
  try {
    const { data } = await api.get(`/progresso/geral/${criancaId}`);
    return data;
  } catch (err) {
    if (err?.response?.status === 404) return null;
    throw err;
  }
}

export async function getProgressoAtividade(atividadeId) {
  const { data } = await api.get(`/progresso/atividade/${atividadeId}`);
  return data;
}

export async function getDiagnostico(criancaId, nivel) {
  const { data } = await api.get('/progresso/diagnostico/' + criancaId, {
    params: nivel != null ? { nivel } : undefined,
  });
  return data;
}

