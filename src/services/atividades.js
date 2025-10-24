import { api } from './api';

export async function listarAtividadesPorCrianca(criancaId) {
  const { data } = await api.get(`/atividades/crianca/${criancaId}`);
  return data;
}

export async function proximaAtividade({ crianca_id, nivel, historia, subtema }) {
  return api.post('/atividades/proxima', { crianca_id, nivel, historia, subtema });
}

export async function listarExerciciosDaAtividade(atividadeId) {
  const { data } = await api.get(`/atividades/${atividadeId}/exercicios`);
  return data;
}

export async function concluirAtividade(atividadeId) {
  const { data } = await api.post(`/atividades/concluir_atividade/${atividadeId}`);
  return data;
}

export async function refazerAtividade(atividadeId) {
  const { data } = await api.post(`/atividades/refazer/${atividadeId}`);
  return data;
}

